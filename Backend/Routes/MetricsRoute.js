const express = require('express');
const router = express.Router();
const Steps = require('../Models/steps');

router.get('/get/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const today = new Date().toISOString().split('T')[0]; 

        const metrics = await Steps.findOne({ userId, date: today });

        if (!metrics) {
            return res.status(200).json({
                status: 'ok',
                metrics: { stepCount: 0, caloriesBurned: '0', distance: '0.00', fitcoins: 0 }
            });
        }

        res.status(200).json({ status: 'ok', metrics });
    } catch (error) {
        console.error('Error fetching metrics:', error);
        res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
});

router.post('/save', async (req, res) => {
    try {
      const { userId, stepCount, caloriesBurned, distance, fitcoins } = req.body;
  
      const updatedMetrics = await Steps.findOneAndUpdate(
        { userId },  // Find by userId
        { $set: { stepCount, caloriesBurned, distance, fitcoins } },
        { new: true, upsert: true }
      );
  
      res.json({ status: 'ok', metrics: updatedMetrics });
    } catch (error) {
      console.error('Error saving metrics:', error);
      res.status(500).json({ status: 'error', message: error.message });
    }
  });
  

module.exports = router;