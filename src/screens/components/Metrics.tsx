import { useEffect, useState } from 'react';
import { View, Text, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../../styles';

interface UserData {
  height?: string;
  weight?: string;
}

interface MetricsProps {
  stepCount: number;
  userData: UserData;
  setStepCount: (value: number) => void;
}

interface MetricCardProps {
  title: string;
  value: string | number;
  unit: string;
  icon: 'shoe' | 'calories' | 'distance' | 'dollar'; 
  colors: string[];
}

const iconMap: Record<'shoe' | 'calories' | 'distance' | 'dollar', any> = {
  shoe: require('../../../assets/icons/shoe.png'),
  calories: require('../../../assets/icons/calories.png'),
  distance: require('../../../assets/icons/distance.png'),
  dollar: require('../../../assets/icons/dollar.png'),
};

const gradientMap: Record<'shoe' | 'calories' | 'distance' | 'dollar', string[]> = {
  shoe: ['#6a11cb', '#2575fc'],
  calories: ['#ffb347', '#ffcc33'],
  distance: ['#434343', '#000000'],
  dollar: ['#FFD700', '#DAA520'],
};

const Metrics: React.FC<MetricsProps> = ({ stepCount, userData, setStepCount }) => {
  const [userId, setUserId] = useState<string | null>(null);
  const [storedMetrics, setStoredMetrics] = useState({
    stepCount: 0,
    caloriesBurned: '0',
    distance: '0.00',
    fitcoins: 0,
  });

  useEffect(() => {
    const loadUserIdAndMetrics = async () => {
      const id = await AsyncStorage.getItem('userId');
      if (id) {
        setUserId(id);
        await fetchStoredMetrics(id);
      }
    };
    loadUserIdAndMetrics();
  }, []);

  useEffect(() => {
    if (userId && stepCount !== storedMetrics.stepCount) {
      calculateAndStoreMetrics();
    }
  }, [stepCount, userId]);

  const fetchStoredMetrics = async (id: string) => {
    try {
      const stepCount = await AsyncStorage.getItem(`${id}_stepCount`);
      const calories = await AsyncStorage.getItem(`${id}_calories`);
      const distance = await AsyncStorage.getItem(`${id}_distance`);
      const fitcoins = await AsyncStorage.getItem(`${id}_fitcoins`);

      const metrics = {
        stepCount: stepCount ? JSON.parse(stepCount) : 0,
        caloriesBurned: calories || '0',
        distance: distance || '0.00',
        fitcoins: fitcoins ? JSON.parse(fitcoins) : 0,
      };

      setStoredMetrics(metrics);
      setStepCount(metrics.stepCount); // update main step count
    } catch (error) {
      console.error('Error fetching metrics:', error);
    }
  };

  const calculateAndStoreMetrics = async () => {
    const heightCm = Number(userData.height) || 170;
    const weightKg = Number(userData.weight) || 70;

    const strideLength = (heightCm * 0.414) / 100;
    const distanceMeters = stepCount * strideLength;
    const distanceKm = parseFloat((distanceMeters / 1000).toFixed(2)); 
    const caloriesBurned = Number((0.57 * weightKg * distanceKm).toFixed(2));
    const fitCoins = Math.floor(stepCount / 100);

    const updatedMetrics = {
      stepCount,
      caloriesBurned: caloriesBurned.toFixed(2),
      distance: distanceKm.toFixed(2),
      fitcoins: fitCoins,
    };

    setStoredMetrics(updatedMetrics);

    if (userId) {
      try {
        await AsyncStorage.setItem(`${userId}_stepCount`, JSON.stringify(stepCount));
        await AsyncStorage.setItem(`${userId}_calories`, updatedMetrics.caloriesBurned);
        await AsyncStorage.setItem(`${userId}_distance`, updatedMetrics.distance);
        await AsyncStorage.setItem(`${userId}_fitcoins`, JSON.stringify(fitCoins));
      } catch (error) {
        console.error('Error saving metrics:', error);
      }
    }
  };

  return (
    <View style={styles.metricsContainer}>
      <MetricCard title="Walking" value={storedMetrics.stepCount} unit="Steps" icon="shoe" colors={gradientMap.shoe} />
      <MetricCard title="Calories" value={storedMetrics.caloriesBurned} unit="Kcal" icon="calories" colors={gradientMap.calories} />
      <MetricCard title="Distance" value={storedMetrics.distance} unit="Kms" icon="distance" colors={gradientMap.distance} />
      <MetricCard title="FitCoins" value={storedMetrics.fitcoins} unit="Coins" icon="dollar" colors={gradientMap.dollar} />
    </View>
  );
};

const MetricCard: React.FC<MetricCardProps> = ({ title, value, unit, icon, colors }) => (
  <LinearGradient colors={colors} style={styles.metricCard}>
    <Text style={styles.metricTitle}>{title}</Text>
    <Text style={styles.metricValue}>{value}</Text>
    <Text style={styles.metricUnit}>{unit}</Text>
    <Image source={iconMap[icon] || iconMap['shoe']} style={styles.metricIcon} />
  </LinearGradient>
);

export default Metrics;
