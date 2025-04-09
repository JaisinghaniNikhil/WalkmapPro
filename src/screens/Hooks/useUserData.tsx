import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useUserData = () => {
  const [userData, setUserData] = useState({ height: '170', weight: '70' });

  useEffect(() => {
    const fetchUserData = async () => {
      setUserData({
        height: await AsyncStorage.getItem('userHeight') || '170',
        weight: await AsyncStorage.getItem('userWeight') || '70',
      });
    };
    fetchUserData();
  }, []);

  return { userData };
};

export default useUserData;