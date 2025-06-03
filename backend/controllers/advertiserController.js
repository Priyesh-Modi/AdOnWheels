const Advertiser = require("../models/advertiser");
const Proposal = require("../models/Proposal");

exports.createAd = async (req, res) => {
  try {
    const { title, description, startDate, endDate, budget } = req.body;

    if (!title || !description || !startDate || !endDate || !budget) {
      return res.status(400).json({
        success: false,
        message:
          "All fields (title, description, startDate, endDate, budget) are required.",
      });
    }

    if (new Date(startDate) >= new Date(endDate)) {
      return res.status(400).json({
        success: false,
        message: "Start date must be earlier than end date.",
      });
    }

    if (!req.user || !req.user.id) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized access. Please log in again.",
      });
    }

    const advertiser = await Advertiser.findById(req.user.id);
    if (!advertiser) {
      return res
        .status(404)
        .json({ success: false, message: "Advertiser not found." });
    }

    const newAd = { title, description, startDate, endDate, budget };
    advertiser.ads.push(newAd);

    await advertiser.save();
    res
      .status(201)
      .json({ success: true, message: "Ad created successfully.", ad: newAd });
  } catch (error) {
    console.error("Error in createAd:", error.message);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};

exports.getAllAds = async (req, res) => {
  try {
    const advertiser = await Advertiser.findById(req.user.id);
    if (!advertiser) {
      return res
        .status(404)
        .json({ success: false, message: "Advertiser not found." });
    }
    res.status(200).json({ success: true, ads: advertiser.ads });
  } catch (error) {
    console.error("Error in getAllAds:", error.message);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};

exports.getAdById = async (req, res) => {
  try {
    const { adId } = req.params;

    if (!adId) {
      return res
        .status(400)
        .json({ success: false, message: "Ad ID is required." });
    }

    const advertiser = await Advertiser.findById(req.user.id);
    if (!advertiser) {
      return res
        .status(404)
        .json({ success: false, message: "Advertiser not found." });
    }

    const ad = advertiser.ads.id(adId);
    if (!ad) {
      return res.status(404).json({ success: false, message: "Ad not found." });
    }

    res.status(200).json({ success: true, ad });
  } catch (error) {
    console.error("Error in getAdById:", error.message);

    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid Ad ID format. Please provide a valid ID.",
      });
    }

    res.status(500).json({ success: false, message: "Internal server error." });
  }
};

exports.getProposals = async (req, res) => {
  try {
    const proposals = await Proposal.find({ advertiserId: req.user.id });
    if (!proposals || proposals.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No proposals found." });
    }

    res.status(200).json({ success: true, proposals });
  } catch (error) {
    console.error("Error in getProposals:", error.message);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};

exports.updateProposal = async (req, res) => {
  try {
    const { proposalId } = req.params;
    const { status } = req.body;

    if (!["Approved", "Rejected"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status. Use "Approved" or "Rejected".',
      });
    }

    const proposal = await Proposal.findOne({
      _id: proposalId,
      advertiserId: req.user.id,
    });
    if (!proposal) {
      return res.status(404).json({
        success: false,
        message:
          "Proposal not found or you are not authorized to update this proposal.",
      });
    }

    proposal.status = status;
    await proposal.save();

    res.status(200).json({
      success: true,
      message: `Proposal ${status.toLowerCase()} successfully.`,
      proposal,
    });
  } catch (error) {
    console.error("Error in updateProposal:", error.message);

    if (error.name === "CastError") {
      return res
        .status(400)
        .json({ success: false, message: "Invalid proposal ID format." });
    }

    res.status(500).json({ success: false, message: "Internal server error." });
  }
};

exports.respondToPrice = async (req, res) => {
  try {
    const { adId } = req.params;
    const { status } = req.body;

    if (!["Approved", "Rejected"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status. Use "Approved" or "Rejected".',
      });
    }

    const advertiser = await Advertiser.findById(req.user.id);
    if (!advertiser) {
      return res
        .status(404)
        .json({ success: false, message: "Advertiser not found." });
    }

    const ad = advertiser.ads.id(adId);
    if (!ad) {
      return res.status(404).json({ success: false, message: "Ad not found." });
    }

    ad.status = status === "Approved" ? "Ready for Publishing" : "Rejected";

    await advertiser.save();

    res.status(200).json({
      success: true,
      message: `Ad ${status.toLowerCase()} successfully.`,
      ad,
    });
  } catch (error) {
    console.error("Error in respondToPrice:", error.message);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};

exports.getStats = async (req, res) => {
  try {
    // Fetch the advertiser and ensure they exist
    const advertiser = await Advertiser.findById(req.user.id);

    if (!advertiser) {
      return res
        .status(404)
        .json({ success: false, message: "Advertiser not found." });
    }

    // Return the advertiser object
    res.status(200).json(advertiser);
  } catch (error) {
    console.error("Error in getStats:", error.message);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};

exports.updateAd = async (req, res) => {
  const advertiserId = req.user.id; // Advertiser's ID
  const adId = req.params.adId; // Specific Ad's ID
  const { title, description, startDate, endDate, budget } = req.body;

  try {
    const updatedAdvertiser = await Advertiser.findOneAndUpdate(
      { _id: advertiserId, "ads._id": adId }, // Match advertiser and ad ID
      {
        $set: {
          "ads.$.title": title,
          "ads.$.description": description,
          //   "ads.$.startDate": new Date(startDate),
          //   "ads.$.endDate": new Date(endDate),
          "ads.$.budget": budget,
        },
      },
      { new: true } // Return the updated document
    );

    if (!updatedAdvertiser) {
      return res.status(404).json({ message: "Advertiser or Ad not found" });
    }

    res
      .status(200)
      .json({ message: "Ad updated successfully", data: updatedAdvertiser });
  } catch (error) {
    console.error("Error updating ad:", error.message);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};
