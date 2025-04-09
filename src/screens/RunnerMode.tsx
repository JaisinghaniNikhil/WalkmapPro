import React, { useState, useEffect } from 'react';
import { Text, View, ScrollView, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { accelerometer, setUpdateIntervalForType, SensorTypes } from 'react-native-sensors';
import HomeHeader from './components/HomeHeader';
import VLine from './components/Vline';
import styles from '../styles';

setUpdateIntervalForType(SensorTypes.accelerometer, 100);

const ACCELERATION_THRESHOLD = 1.8; 
const SPEED_DECAY_RATE = 0.94; 
const STEP_TIME_THRESHOLD = 800; 

const RunnerMode = () => {
  const [currentSpeed, setCurrentSpeed] = useState(0);
  const [highestSpeed, setHighestSpeed] = useState(0);
  const [averageSpeed, setAverageSpeed] = useState(0);
  const [speedHistory, setSpeedHistory] = useState<number[]>([]);
  const [prevTime, setPrevTime] = useState(Date.now());
  const [prevVelocity, setPrevVelocity] = useState(0);
  const [lastStepTime, setLastStepTime] = useState(0);
  const [distance, setDistance] = useState(0);


  useEffect(() => {
    const subscription = accelerometer.subscribe(({ x, y, z }) => {
      const totalAcceleration = Math.sqrt(x ** 2 + y ** 2 + z ** 2) - 9.81;
  
      const currentTime = Date.now();
      const timeDiff = (currentTime - prevTime) / 1000; // Convert ms to seconds
  
      let newVelocity = prevVelocity;
  
      // ✅ Filter out small shakes & avoid unnatural spikes
      if (Math.abs(totalAcceleration) > ACCELERATION_THRESHOLD && Math.abs(totalAcceleration) < 10) {
        if (currentTime - lastStepTime > STEP_TIME_THRESHOLD) {
          newVelocity += totalAcceleration * timeDiff; 
          setLastStepTime(currentTime); 
        }
      } else {
        newVelocity *= SPEED_DECAY_RATE;
      }
  
      if (newVelocity < 0.5) {  // ✅ Ignore very small speeds (reducing shake effect)
        newVelocity = 0;
      }
  
      const speedKmh = newVelocity * 3.6;
      setCurrentSpeed(speedKmh);
  
      // ✅ Ensure distance only increases when speed is reasonable
      if (speedKmh > 0.5) {
        const speedMs = speedKmh / 3.6; // Convert to m/s
        const distanceIncrement = speedMs * timeDiff; // Distance = Speed × Time
        setDistance((prevDistance) => prevDistance + distanceIncrement);
      }
  
      setSpeedHistory((prevSpeeds) => {
        const updatedSpeeds = [...prevSpeeds, speedKmh];
  
        setHighestSpeed(Math.max(...updatedSpeeds));
  
        const avgSpeed = updatedSpeeds.reduce((a, b) => a + b, 0) / updatedSpeeds.length;
        setAverageSpeed(avgSpeed);
  
        return updatedSpeeds;
      });
  
      setPrevVelocity(newVelocity);
      setPrevTime(currentTime);
    });
  
    return () => subscription.unsubscribe(); // Cleanup on unmount
  }, [prevVelocity, prevTime, lastStepTime]);

  return (
    <View style={styles.container5}>
      <ScrollView>
        <HomeHeader />
        <VLine />

        <View style={styles.speedContainer}>
          <LinearGradient colors={['#ff9800', '#ff5722']} style={styles.speedCircle}>
            <Image source={require('../../assets/icons/running.png')} style={styles.runningIcon} />
            <Text style={styles.speedText}>Current Speed</Text>
            <View style={styles.innerSpeedCircle}>
              <Text style={styles.speedValue}>{currentSpeed.toFixed(2)}</Text>
              <Text style={styles.speedUnit}>Km/hr</Text>
            </View>
          </LinearGradient>
        </View>

        <View style={styles.metricsContainer1}>
          <View style={styles.glassBox}>
            <Text style={styles.metricLabel}>🚀 Highest Speed</Text>
            <Text style={styles.metricValue1}>{highestSpeed.toFixed(2)}</Text>
            <Text style={styles.metricUnit1}>Km/hr</Text>
          </View>

          <View style={styles.glassBox}>
            <Text style={styles.metricLabel}>⚡ Average Speed</Text>
            <Text style={styles.metricValue1}>{averageSpeed.toFixed(2)}</Text>
            <Text style={styles.metricUnit1}>Km/hr</Text>
          </View>
        </View>

        <View style={styles.distanceContainer}>
          <View style={styles.glassBox}>
            <Text style={styles.metricLabel}>📍 Distance</Text>
            <Text style={styles.metricValue1}>{distance.toFixed(2)}</Text>
            <Text style={styles.metricUnit1}>Kms</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default RunnerMode;
