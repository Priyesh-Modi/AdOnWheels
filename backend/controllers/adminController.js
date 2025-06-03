const Advertiser = require('../models/advertiser');
const Publisher = require('../models/publisher');
const BodyShop = require('../models/bodyShop');
const Proposal = require('../models/Proposal');
const BodyShopTask = require('../models/bodyShopTask');
// const Ad = require('../models/ad');

// Admin sets price for an ad
exports.setPriceForAd = async (req, res) => {
    try {
        const { adId } = req.params;
        const { advertiserId, adminPrice } = req.body;

        console.log('Ad ID:', adId);
        console.log('Advertiser ID:', advertiserId);
        console.log('Admin Price:', adminPrice);

        if (!adminPrice || adminPrice <= 0) {
            return res.status(400).json({
                success: false,
                message: 'Valid admin price is required and must be greater than 0.',
            });
        }

        // Find the advertiser by ID
        const advertiser = await Advertiser.findById(advertiserId);
        if (!advertiser) {
            console.log('Advertiser not found');
            return res.status(404).json({ success: false, message: 'Advertiser not found.' });
        }

        // Find the ad by ID in the ads array
        const ad = advertiser.ads.id(adId);
        if (!ad) {
            console.log('Ad not found');
            return res.status(404).json({ success: false, message: 'Ad not found.' });
        }

        // Update the admin price and status
        ad.adminPrice = adminPrice;
        ad.status = 'Price Sent'; // Correctly update the status to "Price Sent"

        console.log('Updating advertiser data...');
        await advertiser.save(); // Save changes to the database

        res.status(200).json({
            success: true,
            message: 'Price set successfully.',
            ad,
        });
    } catch (error) {
        console.error('Error in setPriceForAd:', error.message);

        if (error.name === 'CastError') {
            return res.status(400).json({
                success: false,
                message: 'Invalid advertiser or ad ID format.',
            });
        }

        res.status(500).json({
            success: false,
            message: 'Internal server error.',
        });
    }
};


// Admin views ads by status
exports.getAdsByStatus = async (req, res) => {
    try {
        const { status } = req.query;

        const query = status ? { 'ads.status': status } : {};
        const advertisers = await Advertiser.find(query, 'name email companyName ads');

        if (!advertisers || advertisers.length === 0) {
            return res.status(404).json({ success: false, message: 'No ads found matching the given status.' });
        }

        const ads = advertisers.flatMap((advertiser) =>
            advertiser.ads
                .filter((ad) => !status || ad.status === status)
                .map((ad) => ({
                    advertiserId: advertiser._id,
                    advertiserName: advertiser.name,
                    email: advertiser.email,
                    ad,
                }))
        );

        res.status(200).json({ success: true, ads });
    } catch (error) {
        console.error('Error in getAdsByStatus:', error.message);

        res.status(500).json({ success: false, message: 'Internal server error.' });
    }
};


// Admin creates a proposal
exports.createProposal = async (req, res) => {
    try {
        const { adId, advertiserId, finalPrice } = req.body;

        if (!adId || !advertiserId || !finalPrice) {
            return res.status(400).json({
                success: false,
                message: 'All fields (adId, advertiserId, finalPrice) are required.',
            });
        }

        if (finalPrice <= 0) {
            return res.status(400).json({
                success: false,
                message: 'Final price must be greater than 0.',
            });
        }

        const advertiser = await Advertiser.findById(advertiserId);
        if (!advertiser) {
            return res.status(404).json({ success: false, message: 'Advertiser not found.' });
        }

        const ad = advertiser.ads.id(adId);
        if (!ad) {
            return res.status(404).json({ success: false, message: 'Ad not found.' });
        }

        const proposal = await Proposal.create({
            adId,
            advertiserId,
            adminId: req.user.id,
            finalPrice,
        });

        res.status(201).json({
            success: true,
            message: 'Proposal created successfully.',
            proposal,
        });
    } catch (error) {
        console.error('Error in createProposal:', error.message);

        if (error.name === 'CastError') {
            return res.status(400).json({ success: false, message: 'Invalid ad or advertiser ID format.' });
        }

        res.status(500).json({ success: false, message: 'Internal server error.' });
    }
};


// Admin views all publishers
exports.getAllPublishers = async (req, res) => {
    try {
        const publishers = await Publisher.find({}, 'name email contactNumber vehicleDetails');

        if (!publishers || publishers.length === 0) {
            return res.status(404).json({ success: false, message: 'No publishers found.' });
        }

        res.status(200).json({ success: true, publishers });
    } catch (error) {
        console.error('Error in getAllPublishers:', error.message);
        res.status(500).json({ success: false, message: 'Server error.' });
    }
};

// Admin assigns an ad to a publisher
exports.assignAdToPublisher = async (req, res) => {
    try {
        const { adId, publisherId, publisherPrice } = req.body;

        if (!adId || !publisherId || !publisherPrice) {
            return res.status(400).json({
                success: false,
                message: 'Ad ID, Publisher ID, and Publisher Price are required.',
            });
        }

        const updatedPublisher = await Publisher.findByIdAndUpdate(
            publisherId,
            {
                $push: {
                    adAssignments: {
                        adId,
                        payment: publisherPrice,
                    },
                },
            },
            { new: true }
        );

        if (!updatedPublisher) {
            return res.status(404).json({
                success: false,
                message: 'Publisher not found.',
            });
        }

        res.status(200).json({
            success: true,
            message: 'Ad assigned to publisher successfully.',
        });
    } catch (error) {
        console.error('Error in assignAdToPublisher:', error.message);
        res.status(500).json({
            success: false,
            message: 'Internal server error.',
        });
    }
};



// Admin views all body shops
exports.getAllBodyShops = async (req, res) => {
    try {
        const bodyShops = await BodyShop.find({}, 'name email contactNumber address');

        if (!bodyShops || bodyShops.length === 0) {
            return res.status(404).json({ success: false, message: 'No body shops found.' });
        }

        res.status(200).json({ success: true, bodyShops });
    } catch (error) {
        console.error('Error in getAllBodyShops:', error.message);
        res.status(500).json({ success: false, message: 'Server error.' });
    }
};

// Admin assigns a task to a body shop
exports.assignTaskToBodyShop = async (req, res) => {
    try {
        const { adId, bodyShopId, description } = req.body;

        if (!adId || !bodyShopId || !description) {
            return res.status(400).json({ success: false, message: 'All fields are required.' });
        }

        const task = await BodyShopTask.create({
            adId,
            bodyShopId,
            adminId: req.user.id,
            description,
        });

        res.status(201).json({ success: true, message: 'Task assigned to body shop successfully.', task });
    } catch (error) {
        console.error('Error in assignTaskToBodyShop:', error.message);
        res.status(500).json({ success: false, message: 'Server error.' });
    }
};

exports.getDashboardStats = async (req, res) => {
    try {
      const totalAds = await Advertiser.aggregate([{ $unwind: "$ads" }, { $count: "totalAds" }]);
      const totalPublishers = await Publisher.countDocuments();
      const totalBodyShops = await BodyShop.countDocuments();
      const pendingTasks = await BodyShopTask.countDocuments({ status: "Pending" });
  
      res.status(200).json({
        adsCount: totalAds[0]?.totalAds || 0,
        publishersCount: totalPublishers || 0,
        bodyShopsCount: totalBodyShops || 0,
        pendingTasks: pendingTasks || 0,
      });
    } catch (error) {
      console.error("Error fetching dashboard stats:", error.message);
      res.status(500).json({ success: false, message: "Server error" });
    }
  };
  
  exports.deleteBodyShop = async (req, res) => {
    try {
      const { bodyShopId } = req.params;

      if (!bodyShopId) {
        return res.status(400).json({ success: false, message: 'Body shop ID is required.' });
      }
  
      const bodyShop = await BodyShop.findByIdAndDelete(bodyShopId);
  
      if (!bodyShop) {
        return res.status(404).json({ success: false, message: 'Body shop not found.' });
      }
  
      res.status(200).json({ success: true, message: 'Body shop deleted successfully.' });
    } catch (error) {
      console.error('Error deleting body shop:', error.message);
  
      if (error.name === 'CastError') {
        // Invalid MongoDB ObjectId format
        return res.status(400).json({ success: false, message: 'Invalid body shop ID format.' });
      }
  
      res.status(500).json({ success: false, message: 'Internal server error. Please try again later.' });
    }
  };

exports.setPublisherPriceForAd = async (req, res) => {
    try {
        const { adId, publisherId, publisherPrice } = req.body;

        if (!publisherPrice || publisherPrice <= 0) {
            return res.status(400).json({
                success: false,
                message: 'Valid publisher price is required and must be greater than 0.',
            });
        }

        const publisher = await Publisher.findById(publisherId);
        if (!publisher) {
            return res.status(404).json({ success: false, message: 'Publisher not found.' });
        }

        const adAssignment = publisher.adAssignments.find((assignment) => assignment.adId.toString() === adId);
        if (!adAssignment) {
            publisher.adAssignments.push({
                adId,
                adminId: req.user.id,
                status: 'Pending',
                payment: publisherPrice,
            });
        } else {
            adAssignment.payment = publisherPrice;
            adAssignment.status = 'Pending';
            adAssignment.updatedAt = Date.now();
        }

        await publisher.save();

        res.status(200).json({
            success: true,
            message: 'Publisher price set successfully.',
        });
    } catch (error) {
        console.error('Error in setPublisherPriceForAd:', error.message);
        res.status(500).json({
            success: false,
            message: 'Internal server error. Please try again later.',
        });
    }
};
