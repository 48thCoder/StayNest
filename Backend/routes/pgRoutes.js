const express = require('express');
const router = express.Router();
const PG = require('../models/PG');
const { protect, authorize } = require('../middleware/auth');

router.get('/', async (req, res) => {
  try {
    const { city, gender, minPrice, maxPrice, search } = req.query;
    let query = {};

    if (city && city !== 'all') {
      query.city = city.toLowerCase();
    }
    if (gender && gender !== 'all') {
      query.gender = gender;
    }
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { location: { $regex: search, $options: 'i' } },
      ];
    }

    const pgs = await PG.find(query).sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: pgs.length, data: pgs });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const pg = await PG.findById(req.params.id);
    if (!pg) {
      return res.status(404).json({ success: false, message: 'PG Listing not found' });
    }
    res.status(200).json({ success: true, data: pg });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.post('/', protect, authorize('owner', 'admin'), async (req, res) => {
  try {
    const pg = await PG.create(req.body);
    res.status(201).json({ success: true, data: pg });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

router.put('/:id', protect, authorize('owner', 'admin'), async (req, res) => {
  try {
    const pg = await PG.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!pg) {
      return res.status(404).json({ success: false, message: 'PG Listing not found' });
    }
    res.status(200).json({ success: true, data: pg });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

router.delete('/:id', protect, authorize('owner', 'admin'), async (req, res) => {
  try {
    const pg = await PG.findByIdAndDelete(req.params.id);
    if (!pg) {
      return res.status(404).json({ success: false, message: 'PG Listing not found' });
    }
    res.status(200).json({ success: true, message: 'PG Listing deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;