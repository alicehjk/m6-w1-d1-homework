module.exports = function(app) {
    const inventories = require('../controllers/inventory.controller.js');

    // Create new inventory
    app.post('/api/inventory', inventories.addInventory);

    // Get inventory by ID
    app.get('/api/inventory/:id', inventories.getInventoryById);

    // Get all inventories
    app.get('/api/inventories', inventories.listInventories);

    // Update inventory by ID
    app.put('/api/inventory/:id', inventories.updateInventory);

    // Delete inventory by ID
    app.delete('/api/inventory/:id', inventories.removeInventory);
}
