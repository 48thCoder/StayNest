const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email'],
    },
    password: {
      type: String,
      required: function () {
        return this.authProvider === 'local';
      },
      minlength: [6, 'Password must be at least 6 characters'],
      select: false,
    },
    role: {
      type: String,
      enum: ['user', 'owner', 'admin'],
      default: 'user',
    },
    phone: {
      type: String,
      trim: true,
      validate: {
        validator: function (v) {
          if (!v && this.authProvider === 'google') return true;
          return /^[6-9]\d{9}$/.test(v);
        },
        message: 'Please provide a valid 10-digit mobile number',
      },
    },
    authProvider: {
      type: String,
      enum: ['local', 'google'],
      default: 'local',
    },
    googleId: {
      type: String,
    },
    avatar: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre('save', async function () {
  if (!this.isModified('password')) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.generateToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

module.exports = mongoose.model('User', userSchema);
