import { View, ScrollView, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Provider } from 'react-native-paper';
import styles from '../styles';
import HomeHeader from './components/HomeHeader';
import VLine from './components/Vline';
import StepCounter from './components/StepCounter';
import TargetBox from './components/TargetBox';
import Metrics from './components/Metrics';
import useUserData from './Hooks/useUserData';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Home = () => {
  const { userData } = useUserData();
  const [stepCount, setStepCount] = useState(0);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const loadUserId = async () => {
      const id = await AsyncStorage.getItem('userId');
      if (id) setUserId(id);
    };
    loadUserId();
  }, []);

  const resetMetrics = async () => {
    if (!userId) return;
    setStepCount(0);

    try {
      await AsyncStorage.setItem(`${userId}_stepCount`, JSON.stringify(0));
      await AsyncStorage.setItem(`${userId}_calories`, '0');
      await AsyncStorage.setItem(`${userId}_distance`, '0.00');
      await AsyncStorage.setItem(`${userId}_fitcoins`, JSON.stringify(0));
    } catch (error) {
      console.error('Error resetting metrics:', error);
    }
  };

  return (
    <Provider>
      <SafeAreaView style={styles.container4}>
        <ScrollView contentContainerStyle={{ paddingBottom: 50 }}>
          <HomeHeader />
          <VLine />
          <TargetBox />
          <Text style={{
            fontSize: 20,
            color: 'white',
            fontFamily: 'Aclonica-Regular',
            marginLeft: 40,
            marginTop: 30,
            marginBottom: 20
          }}>
            Metrics
          </Text>
          <StepCounter setStepCount={setStepCount} />
          <Metrics stepCount={stepCount} setStepCount={setStepCount} userData={userData} />

          {/* ✅ Reset Button */}
          <View style={{ alignItems: 'center', marginTop: 30, marginBottom: 40 }}>
            <TouchableOpacity onPress={resetMetrics} style={styles.resetButton}>
              <Text style={styles.resetButtonText}>Reset</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </Provider>
  );
};

export default Home;