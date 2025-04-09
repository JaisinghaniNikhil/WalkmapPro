import { useEffect } from 'react';
import { accelerometer } from 'react-native-sensors';

interface StepCounterProps {
  setStepCount: React.Dispatch<React.SetStateAction<number>>;
}

const StepCounter: React.FC<StepCounterProps> = ({ setStepCount }) => {
  useEffect(() => {
    let lastAcceleration = { x: 0, y: 0, z: 0 }; 
    let stepThreshold = 1.8;
    let stepDetected = false;
    let stepDelay = 500;
    let lastStepTime = Date.now();

    const subscription = accelerometer.subscribe(({ x, y, z }) => {
      const accelerationChange =
        Math.abs(x - lastAcceleration.x) +
        Math.abs(y - lastAcceleration.y) +
        Math.abs(z - lastAcceleration.z);

      const currentTime = Date.now();

      if (accelerationChange > stepThreshold && !stepDetected) {
        if (currentTime - lastStepTime > stepDelay) {
          setStepCount((prev: number) => prev + 1);
          lastStepTime = currentTime;
        }
        stepDetected = true;
      } else if (accelerationChange < stepThreshold) {
        stepDetected = false;
      }

      lastAcceleration = { x, y, z };
    });

    return () => subscription.unsubscribe();
  }, [setStepCount]);

  return null;
};

export default StepCounter;