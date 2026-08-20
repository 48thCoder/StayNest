const mongoose = require('mongoose');

const pgSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'PG name is required'],
      trim: true,
    },
    location: {
      type: String,
      required: [true, 'Location is required'],
    },
    city: {
      type: String,
      required: [true, 'City is required'],
      lowercase: true,
      trim: true,
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
    },
    gender: {
      type: String,
      enum: ['boys', 'girls', 'coed'],
      required: [true, 'Gender target is required'],
    },
    roomTypes: [
      {
        type: String,
        enum: ['single', 'double', 'triple'],
      },
    ],
    rating: {
      type: Number,
      default: 0,
    },
    reviews: {
      type: Number,
      default: 0,
    },
    image: {
      type: String,
      required: [true, 'Main image URL is required'],
    },
    images: [{ type: String }],
    amenities: [{ type: String }],
    description: {
      type: String,
      required: [true, 'Description is required'],
    },
    rules: [{ type: String }],
    owner: {
      name: { type: String, required: true },
      phone: { type: String, required: true },
      email: { type: String, required: true },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('PG', pgSchema);
