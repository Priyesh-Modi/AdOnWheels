const mongoose = require('mongoose');

const bodyShopTaskSchema = new mongoose.Schema({
    adId: { type: mongoose.Schema.Types.ObjectId, ref: 'Advertiser', required: true }, // Related ad
    bodyShopId: { type: mongoose.Schema.Types.ObjectId, ref: 'BodyShop', required: true }, // Assigned BodyShop
    adminId: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin', required: true }, // Admin who assigned the task
    description: { type: String, required: true }, // Task details
    status: {
        type: String,
        enum: ['Pending', 'In Progress', 'Completed'],
        default: 'Pending',
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('BodyShopTask', bodyShopTaskSchema);
