import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const useTargets = () => {
  const [stepTarget, setStepTarget] = useState(1000);
  const [calorieTarget, setCalorieTarget] = useState(50);

  useEffect(() => {
    const fetchTarget = async () => {
      try {
        const userId = await AsyncStorage.getItem('userId');
        if (!userId) {
          console.error('❌ No user ID found, using default values');
          return;
        }

        const storedStepTarget = await AsyncStorage.getItem(`stepTarget_${userId}`);
        const storedCalorieTarget = await AsyncStorage.getItem(`calorieTarget_${userId}`);

        if (storedStepTarget && storedCalorieTarget) {
          console.log('✅ Using stored targets:', storedStepTarget, storedCalorieTarget);
          setStepTarget(parseInt(storedStepTarget, 10));
          setCalorieTarget(parseInt(storedCalorieTarget, 10));
        } else {
          console.log('🌐 Fetching target from backend...');
          const response = await axios.get(`http://192.168.1.108:5001/target/${userId}`);

          if (response.data.success && response.data.target) {
            const fetchedStepTarget = response.data.target.stepTarget?.toString() || '1000';
            const fetchedCalorieTarget = response.data.target.calorieTarget?.toString() || '50';

            setStepTarget(parseInt(fetchedStepTarget, 10));
            setCalorieTarget(parseInt(fetchedCalorieTarget, 10));

            await AsyncStorage.setItem(`stepTarget_${userId}`, fetchedStepTarget);
            await AsyncStorage.setItem(`calorieTarget_${userId}`, fetchedCalorieTarget);
          }
        }
      } catch (error) {
        console.error('❌ Error fetching target:', error);
      }
    };

    fetchTarget();
  }, []);

  return { stepTarget, calorieTarget };
};

export default useTargets;
