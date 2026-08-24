const { OAuth2Client } = require('google-auth-library');
const User = require('../models/User');

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
    const { email, password } = req.body;

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

    const token = user.generateToken();

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

module.exports = { register, login, getMe, googleAuth };
