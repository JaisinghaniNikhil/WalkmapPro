import React, { useEffect, useState } from 'react';
import { View, Text, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../../styles';

const HomeHeader = () => {
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    const getUser = async () => {
      try {
        const name = await AsyncStorage.getItem('userName'); 
        setUserName(name || 'Guest'); 
      } catch (error) {
        console.log('Error fetching user:', error);
      }
    };
    getUser();
  }, []);

  return (
    <View style={styles.homeheader}>
      <Image
        source={require('../../../assets/icons/fuser.png')}
        style={styles.headerimg}
        resizeMode="contain"
      />
      <View style={styles.innerheader}>
        <Text style={{ fontFamily: 'Aclonica-Regular', fontSize: 20, color: 'white' }}>
          Hi {userName}
        </Text>
        <Text style={styles.belowheader1}>Be Productive Today!</Text>
      </View>
    </View>
  );
};

export default HomeHeader;
