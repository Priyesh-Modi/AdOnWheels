const BodyShop = require('../models/bodyShop');
const BodyShopTask = require('../models/bodyShopTask');
const jwt = require('jsonwebtoken');


// exports.getAssignedTasks = async (req, res) => {
//     try {
//         const tasks = await BodyShopTask.find({ bodyShopId: req.user.id }).populate('adId');

//         if (!tasks || tasks.length === 0) {
//             return res.status(404).json({ 
//                 success: false, 
//                 message: 'No tasks found for the logged-in Body Shop.' 
//             });
//         }

//         res.status(200).json({ success: true, tasks });
//     } catch (error) {
//         console.error('Error in getAssignedTasks:', error);

//         res.status(500).json({ 
//             success: false, 
//             message: 'An error occurred while fetching assigned tasks. Please try again later.' 
//         });
//     }
// };

exports.getAssignedTasks = async (req, res) => {
    try {
        // Find tasks assigned to the logged-in body shop
        const tasks = await BodyShopTask.find({ bodyShopId: req.user.id })
            // .populate('advertiser') // Populating the Advertiser details
            // .populate('ad'); // Populating the specific Ad details

        if (!tasks || tasks.length === 0) {
            return res.status(404).json({ 
                success: false, 
                message: 'No tasks found for the logged-in Body Shop.' 
            });
        }

        res.status(200).json({ success: true, tasks });
    } catch (error) {
        console.error('Error in getAssignedTasks:', error);

        res.status(500).json({ 
            success: false, 
            message: 'An error occurred while fetching assigned tasks. Please try again later.' 
        });
    }
};


exports.updateTaskStatus = async (req, res) => {
    try {
        console.log('Received taskId:', req.params.taskId); 
        const { taskId } = req.params;
        const { status } = req.body;
        
        if (!status || !['Pending', 'In Progress', 'Completed'].includes(status)) {
            return res.status(400).json({ 
                success: false, 
                message: 'Invalid status value. Allowed values are "Pending", "In Progress", and "Completed".' 
            });
        }

        const task = await BodyShopTask.findOneAndUpdate(
            { _id: taskId, bodyShopId: req.user.id },
            { status: status, updatedAt: Date.now() },
            { new: true }
        );

        if (!task) {
            return res.status(404).json({ 
                success: false, 
                message: 'Task not found for the given ID and logged-in Body Shop.' 
            });
        }

        res.status(200).json({ 
            success: true, 
            message: `Task status updated to "${status}".`, 
            task 
        });
    } catch (error) {
        console.error('Error in updateTaskStatus:', error);

        if (error.name === 'CastError') {
            return res.status(400).json({ 
                success: false, 
                message: 'Invalid task ID format. Please provide a valid ID.' 
            });
        }

        res.status(500).json({ 
            success: false, 
            message: 'An error occurred while updating the task status. Please try again later.' 
        });
    }
};


exports.assignTask = async (req, res) => {
    try {
        const { adId, bodyShopId, description } = req.body;

        if (!adId || !bodyShopId || !description) {
            return res.status(400).json({
                success: false,
                message: 'All fields (adId, bodyShopId, description) are required.'
            });
        }

        const bodyShopExists = await BodyShop.findById(bodyShopId);
        if (!bodyShopExists) {
            return res.status(404).json({
                success: false,
                message: 'Body Shop not found. Please check the provided Body Shop ID.'
            });
        }

        const task = await BodyShopTask.create({
            adId,
            bodyShopId,
            adminId: req.user.id,
            description,
        });

        res.status(201).json({
            success: true,
            message: 'Task assigned to Body Shop successfully.',
            task
        });
    } catch (error) {
        console.error('Error in assignTask:', error);

        if (error.name === 'CastError') {
            return res.status(400).json({
                success: false,
                message: 'Invalid ID format. Please provide valid IDs for adId and bodyShopId.'
            });
        }

        res.status(500).json({
            success: false,
            message: 'An error occurred while assigning the task. Please try again later.'
        });
    }
};

  


