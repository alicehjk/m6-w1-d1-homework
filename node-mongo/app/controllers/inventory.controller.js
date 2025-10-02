const Inventory = require('../models/inventory.model');

// Create new inventory item
exports.createInventory = async (req, res) => {
    try {
        const inventory = new Inventory(req.body);
        await inventory.save();
        res.status(201).json(inventory);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get inventory item by ID
exports.getInventory = async (req, res) => {
    try {
        const inventory = await Inventory.findById(req.params.id);
        if (!inventory) {
            return res.status(404).json({ error: 'Inventory item not found' });
        }
        res.json(inventory);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all inventory items
exports.inventories = async (req, res) => {
    try {
        const inventory = await Inventory.find();
        res.json(inventory);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update inventory item
exports.updateInventory = async (req, res) => {
    try {
        const inventory = await Inventory.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!inventory) {
            return res.status(404).json({ error: 'Inventory item not found' });
        }
        res.json(inventory);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete inventory item
exports.deleteInventory = async (req, res) => {
    try {
        const inventory = await Inventory.findByIdAndDelete(req.params.id);
        if (!inventory) {
            return res.status(404).json({ error: 'Inventory item not found' });
        }
        res.json({ message: 'Inventory item deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
