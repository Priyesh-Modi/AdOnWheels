const mongoose = require('mongoose');

const publisherSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    contactNumber: { type: String, required: true },
    role: { type: String, default: 'Publisher' },
    vehicleDetails: {
        vehicleNumber: { type: String, required: true },
        vehicleType: { type: String, required: true }, // e.g., Car, Truck, etc.
        location: { type: String, required: true }, // Operating location
    },
    adAssignments: [
        {
            adId: { type: mongoose.Schema.Types.ObjectId, ref: 'Advertiser' }, // Corrected reference
            adminId: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin' },
            status: {
                type: String,
                enum: ['Pending', 'Accepted', 'Declined', 'Completed'],
                default: 'Pending',
            },
            payment: { type: Number, default: 0 }, // Payment set by admin
            assignedAt: { type: Date, default: Date.now },
            updatedAt: { type: Date, default: Date.now },
        },
    ],
    dateCreated: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Publisher', publisherSchema);
