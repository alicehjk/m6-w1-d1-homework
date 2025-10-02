const mongoose = require('mongoose');
const Inventory = mongoose.model('Inventory');

// Create a new inventory item
exports.addInventory = async (req, res) => {
  try {
    const inventory = new Inventory({
      prodname: req.body.prodname,
      qty: req.body.qty,
      price: req.body.price,
      status: req.body.status,
    });

    const saved = await inventory.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({
      message: 'Failed to create inventory',
      error: err.message,
    });
  }
};

// Get inventory by ID
exports.getInventoryById = async (req, res) => {
  try {
    const item = await Inventory.findById(req.params.id).select('-__v');
    if (!item) {
      return res.status(404).json({ message: `No inventory found with id ${req.params.id}` });
    }
    res.json(item);
  } catch (err) {
    res.status(500).json({
      message: `Error retrieving inventory with id ${req.params.id}`,
      error: err.message,
    });
  }
};

// Get all inventory items
exports.listInventories = async (req, res) => {
  try {
    const items = await Inventory.find().select('-__v');
    res.json(items);
  } catch (err) {
    res.status(500).json({
      message: 'Error fetching inventories',
      error: err.message,
    });
  }
};

// Delete inventory by ID
exports.removeInventory = async (req, res) => {
  try {
    const deleted = await Inventory.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: `No inventory found with id ${req.params.id}` });
    }
    res.status(204).end();
  } catch (err) {
    res.status(500).json({
      message: `Error deleting inventory with id ${req.params.id}`,
      error: err.message,
    });
  }
};

// Update inventory by ID
exports.updateInventory = async (req, res) => {
  try {
    const updated = await Inventory.findByIdAndUpdate(
      req.body._id,
      {
        prodname: req.body.prodname,
        qty: req.body.qty,
        price: req.body.price,
        status: req.body.status,
      },
      { new: true, runValidators: true } // return updated doc
    ).select('-__v');

    if (!updated) {
      return res.status(404).json({ message: `No inventory found with id ${req.body._id}` });
    }

    res.json(updated);
  } catch (err) {
    res.status(500).json({
      message: `Error updating inventory with id ${req.body._id}`,
      error: err.message,
    });
  }
};
