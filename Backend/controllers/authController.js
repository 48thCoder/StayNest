const { OAuth2Client } = require('google-auth-library');
const crypto = require('crypto');
const User = require('../models/User');
const { sendEmail, getPasswordResetTemplate } = require('../utils/sendEmail');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const register = async (req, res) => {
  try {
    const { name, email, password, role, phone } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'Email already registered' });
    }

    const user = await User.create({ name, email, password, role, phone });
    const token = user.generateToken();

    res.status(201).json({
      success: true,
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone,
        token,
      },
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password, rememberMe } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide email and password' });
    }

    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).json({ success: false, message: 'No account found with this email. Please sign up.' });
    }

    if (!user.password || user.authProvider === 'google') {
      return res.status(400).json({
        success: false,
        message: 'This account was created with Google. Please use "Sign in with Google".',
      });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Incorrect password. Please try again.' });
    }

    const token = user.generateToken(Boolean(rememberMe));

    res.status(200).json({
      success: true,
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone,
        token,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const googleAuth = async (req, res) => {
  try {
    const { token: googleToken, role, isSignUp, email: directEmail, name: directName, avatar: directAvatar } = req.body;

    let email = directEmail;
    let name = directName;
    let avatar = directAvatar;
    let googleId;

    if (googleToken) {
      const ticket = await client.verifyIdToken({
        idToken: googleToken,
        audience: process.env.GOOGLE_CLIENT_ID,
      });
      const payload = ticket.getPayload();
      email = payload.email;
      name = payload.name;
      avatar = payload.picture;
      googleId = payload.sub;
    }

    if (!email || !name) {
      return res.status(400).json({ success: false, message: 'Google authentication details missing' });
    }

    let user = await User.findOne({ email });

    if (!user) {
      if (!isSignUp) {
        return res.status(401).json({
          success: false,
          message: 'No account found with this Google email. Please sign up first.',
        });
      }

      user = await User.create({
        name,
        email,
        avatar: avatar || '',
        role: role || 'user',
        googleId,
        authProvider: 'google',
      });
    } else {
      if (isSignUp) {
        return res.status(400).json({
          success: false,
          message: 'An account with this email already exists. Please log in.',
        });
      }

      let shouldSave = false;
      if (avatar && !user.avatar) {
        user.avatar = avatar;
        shouldSave = true;
      }
      if (googleId && !user.googleId) {
        user.googleId = googleId;
        shouldSave = true;
      }
      if (shouldSave) {
        await user.save();
      }
    }

    const token = user.generateToken();

    res.status(200).json({
      success: true,
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone,
        avatar: user.avatar,
        token,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ success: false, message: 'Please provide an email address' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: 'No account found with this email address' });
    }

    if (user.authProvider === 'google' && !user.password) {
      return res.status(400).json({
        success: false,
        message: 'This account uses Google Sign-In. Please sign in with Google.',
      });
    }

    const otp = crypto.randomInt(100000, 1000000).toString();
    user.resetPasswordOTP = otp;
    user.resetPasswordExpire = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
    await user.save();

    console.log(`[AUTH] Password reset OTP for ${email}: ${otp}`);

    let emailSent = false;
    try {
      const emailResult = await sendEmail({
        to: user.email,
        subject: `StayNest Password Reset Code: ${otp}`,
        text: `Your StayNest password reset code is ${otp}. It expires in 10 minutes.`,
        html: getPasswordResetTemplate(user.name, otp),
      });
      emailSent = Boolean(emailResult?.sent);
    } catch (mailError) {
      console.error('[EMAIL ERROR] Failed to deliver reset email:', mailError.message);
    }

    res.status(200).json({
      success: true,
      message: emailSent
        ? `A 6-digit verification code has been sent to ${email}.`
        : 'Password reset code generated. Check your inbox or console.',
      emailSent,
      ...(process.env.NODE_ENV !== 'production' && { resetCode: otp }),
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;

    if (!email || !otp || !newPassword) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email, reset code, and new password',
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters long',
      });
    }

    const user = await User.findOne({ email }).select('+password +resetPasswordOTP +resetPasswordExpire');
    if (!user) {
      return res.status(404).json({ success: false, message: 'No account found with this email' });
    }

    if (!user.resetPasswordOTP || !user.resetPasswordExpire) {
      return res.status(400).json({
        success: false,
        message: 'No reset request found. Please request a new reset code.',
      });
    }

    if (user.resetPasswordExpire < new Date()) {
      return res.status(400).json({
        success: false,
        message: 'Reset code has expired. Please request a new one.',
      });
    }

    if (user.resetPasswordOTP !== otp.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Invalid reset code. Please check and try again.',
      });
    }

    const isSamePassword = await user.matchPassword(newPassword);
    if (isSamePassword) {
      return res.status(400).json({
        success: false,
        message: 'New password must be different from your current password.',
      });
    }

    user.password = newPassword;
    user.resetPasswordOTP = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    res.status(200).json({
      success: true,
      message: 'Password has been reset successfully. You can now log in.',
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { register, login, getMe, googleAuth, forgotPassword, resetPassword };
