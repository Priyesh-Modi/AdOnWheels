const Publisher = require('../models/publisher');
const Advertiser = require('../models/advertiser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


exports.getAdOpportunities = async (req, res) => {
    try {
        console.log(`Fetching ad opportunities for publisher ID: ${req.user.id}`);

        const ads = await Advertiser.aggregate([
            { $unwind: '$ads' }, // Unwind the ads array
            { $match: { 'ads.status': 'Ready for Publishing' } }, // Filter by "Ready for Publishing" status
            {
                $project: {
                    _id: 0,
                    adId: '$ads._id', // Send adId from the ads array
                    title: '$ads.title',
                    description: '$ads.description',
                    startDate: '$ads.startDate',
                    endDate: '$ads.endDate',
                    budget: '$ads.budget',
                    adminPrice: '$ads.adminPrice',
                    advertiserId: '$_id', // The Advertiser ID
                    advertiserName: '$name',
                },
            },
        ]);

        console.log('Matching Ads:', ads);

        if (!ads || ads.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No ad opportunities found for this publisher.',
            });
        }

        res.status(200).json({ success: true, ads });
    } catch (error) {
        console.error('Error in getAdOpportunities:', error.message);
        res.status(500).json({
            success: false,
            message: 'An error occurred while fetching ad opportunities. Please try again later.',
        });
    }
};



exports.updateAdStatus = async (req, res) => {
    try {
        const { adAssignmentId } = req.params; // This corresponds to ads._id in the Advertiser schema
        const { status } = req.body;

        // Validate status
        if (!status || !['Accepted', 'Declined'].includes(status)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid status value. Allowed values are "Accepted" or "Declined".',
            });
        }

        // Update the ad's status within the Advertiser schema
        const updatedAd = await Advertiser.updateOne(
            { 'ads._id': adAssignmentId }, // Locate the ad by its ID
            {
                $set: {
                    'ads.$.status': status, // Update the status
                    'ads.$.updatedAt': Date.now(), // Update the timestamp
                },
            }
        );

        // Check if any document was modified
        if (updatedAd.modifiedCount === 0) {
            return res.status(404).json({
                success: false,
                message: 'Ad not found or status already updated.',
            });
        }

        // Success response
        res.status(200).json({
            success: true,
            message: `Ad status updated to "${status.toLowerCase()}".`,
        });
    } catch (error) {
        console.error('Error in updateAdStatus:', error.message);

        if (error.name === 'CastError') {
            return res.status(400).json({
                success: false,
                message: 'Invalid ad ID format. Please provide a valid ID.',
            });
        }

        res.status(500).json({
            success: false,
            message: 'An error occurred while updating the ad status. Please try again later.',
        });
    }
};



exports.getPaymentDetails = async (req, res) => {
    try {
        const publisher = await Publisher.findById(req.user.id);

        if (!publisher) {
            return res.status(404).json({
                success: false,
                message: 'No publisher found for the logged-in user.',
            });
        }

        const payments = publisher.adAssignments.filter((ad) => ad.status === 'Accepted');

        if (!payments || payments.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No payments found for the logged-in publisher.',
            });
        }

        res.status(200).json({
            success: true,
            message: 'Payments retrieved successfully.',
            payments,
        });
    } catch (error) {
        console.error('Error in getPaymentDetails:', error.message);

        res.status(500).json({
            success: false,
            message: 'An error occurred while retrieving payment details. Please try again later.',
        });
    }
};


exports.respondToAdOpportunity = async (req, res) => {
    try {
        const { adId } = req.params;
        const { status } = req.body;

        if (!['Accepted', 'Declined'].includes(status)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid status value. Use "Accepted" or "Declined".',
            });
        }

        // Find and update the ad in the Advertiser collection
        const updatedAd = await Advertiser.updateOne(
            { 'ads._id': adId }, // Match the ad by ID
            { 
                $set: { 
                    'ads.$.status': status, 
                    'ads.$.updatedAt': new Date() 
                } 
            }
        );

        if (updatedAd.modifiedCount === 0) {
            return res.status(404).json({
                success: false,
                message: 'Ad not found or already updated.',
            });
        }

        res.status(200).json({
            success: true,
            message: `Ad ${status.toLowerCase()} successfully.`,
        });
    } catch (error) {
        console.error('Error in respondToAdOpportunity:', error.message);
        res.status(500).json({
            success: false,
            message: 'Internal server error.',
        });
    }
};








