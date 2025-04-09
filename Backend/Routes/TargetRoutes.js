const express = require('express');
const Target = require('../Models/target')

const router = express.Router();


router.get('/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        console.log('Fetching target for userId:', userId);

        const target = await Target.findOne({ userId });

        if (!target) {
            return res.status(404).json({ success: false, message: 'No target found for this user.' });
        }

        res.json({ success: true, target });
    } catch (error) {
        console.error('Error fetching target:', error);
        res.status(500).json({ success: false, message: 'Internal server error.' });
    }
});


router.post('/', async (req, res) => {
    try {
        const { userId, stepTarget, calorieTarget } = req.body;

        let target = await Target.findOne({ userId });
        if (target) {
            target.stepTarget = stepTarget;
            target.calorieTarget = calorieTarget;
        } else {
            target = new Target({ userId, stepTarget, calorieTarget });
        }

        await target.save();
        res.json({ success: true, message: "Target saved successfully!" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error saving target", error });
    }
});

module.exports = router;
