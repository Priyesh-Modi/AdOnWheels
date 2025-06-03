const mongoose = require('mongoose');

const adSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    budget: { type: Number, required: true, min: 1 },
    adminPrice: { type: Number, default: null },
    status: {
        type: String,
        enum: ['Pending Approval', 'Price Sent', 'Approved', 'Rejected', 'Ready for Publishing'],
        default: 'Pending Approval',
    },
    advertiserId: { type: mongoose.Schema.Types.ObjectId, ref: 'Advertiser' },
    createdAt: { type: Date, default: Date.now },
});

const Ad = mongoose.model('Ad', adSchema);

module.exports = Ad;
