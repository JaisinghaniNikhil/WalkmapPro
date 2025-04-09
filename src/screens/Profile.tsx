import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TextInput } from 'react-native-paper';
import axios from 'axios';
import styles from '../styles';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';


type RootStackParamList = {
  main: undefined;
  login: undefined;
  signup: undefined;
  home: undefined;
  BottomTabs: undefined;
};

const Profile = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [userData, setUserData] = useState({
    name: '',
    age: '',
    gender: '',
    height: '',
    weight: '',
    email: '',
  });

  const [stepTarget, setStepTarget] = useState('');
  const [calorieTarget, setCalorieTarget] = useState('');

  useEffect(() => {
    getUserData();
    fetchTarget();
  }, []);

  const getUserData = async () => {
    try {
      const storedUserData = {
        name: (await AsyncStorage.getItem('userName')) || 'N/A',
        age: (await AsyncStorage.getItem('userAge')) || 'N/A',
        gender: (await AsyncStorage.getItem('userGender')) || 'N/A',
        height: (await AsyncStorage.getItem('userHeight')) || 'N/A',
        weight: (await AsyncStorage.getItem('userWeight')) || 'N/A',
        email: (await AsyncStorage.getItem('userEmail')) || 'N/A',
      };
      setUserData(storedUserData);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const fetchTarget = async () => {
    try {
      const userId = await AsyncStorage.getItem('userId');
      if (!userId) return;
      
      const response = await axios.get(`http://192.168.1.107:5001/target/${userId}`);
      if (response.data.success && response.data.target) {
        setStepTarget(response.data.target.stepTarget?.toString() || '');
        setCalorieTarget(response.data.target.calorieTarget?.toString() || '');
      }
    } catch (error) {
      console.error('Error fetching target:', error);
    }
  };

  const saveTarget = async () => {
    try {
      const userId = await AsyncStorage.getItem('userId');
      if (!userId) {
        Alert.alert('Error', 'No user found, please log in again.');
        return;
      }

      const response = await axios.post('http://192.168.1.107:5001/target', {
        userId,
        stepTarget,
        calorieTarget,
      });

      if (response.data.success) {
        Alert.alert('Success', 'Target saved successfully!');
        await AsyncStorage.setItem(`stepTarget_${userId}`, stepTarget);
        await AsyncStorage.setItem(`calorieTarget_${userId}`, calorieTarget);
      } else {
        Alert.alert('Error', response.data.message || 'Failed to save target.');
      }
    } catch (error: any) {
      console.error('Error saving target:', error.response?.data || error.message);
      Alert.alert('Error', 'Something went wrong, please try again.');
    }
  };

  const handleLogout = async () => {
    try {
      const userId = await AsyncStorage.getItem('userId');
  
      
      await AsyncStorage.multiRemove(['userId', 'userEmail', 'userName', 'userAge', 'userGender', 'userHeight', 'userWeight']);
  
      Alert.alert('Logged Out', 'You have been logged out successfully.');
  
      
      navigation.reset({
        index: 0,
        routes: [{ name: 'login' }],
      });
  
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <View style={styles.container7}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        

        <View style={styles.profileCard}>
          <View style={styles.profileDetails}>
            <Text style={styles.profileText}><Text style={styles.boldText}>Name:</Text> {userData.name}</Text>
            <Text style={styles.profileText}><Text style={styles.boldText}>Email:</Text> {userData.email}</Text>
            <Text style={styles.profileText}><Text style={styles.boldText}>Age:</Text> {userData.age}</Text>
            <Text style={styles.profileText}><Text style={styles.boldText}>Gender:</Text> {userData.gender}</Text>
            <Text style={styles.profileText}><Text style={styles.boldText}>Height:</Text> {userData.height} cm</Text>
            <Text style={styles.profileText}><Text style={styles.boldText}>Weight:</Text> {userData.weight} kg</Text>
          </View>
        </View>

        <View style={styles.inputcont}>
          <Text style={styles.theading}>Set Your Targets:</Text>
          <View style={styles.inputwrap}>
            <TextInput
              placeholder='Steps'
              mode="outlined"
              style={styles.tinput}
              keyboardType="numeric"
              placeholderTextColor="#A0AEC0"
              value={stepTarget}
              onChangeText={(text) => setStepTarget(text)}
            />

            <TextInput
              placeholder='Calories'
              mode="outlined"
              style={styles.tinput}
              keyboardType="numeric"
              placeholderTextColor="#A0AEC0"
              value={calorieTarget}
              onChangeText={(text) => setCalorieTarget(text)}
            />
          </View>

          <View style={styles.buttoncont1}>
            <TouchableOpacity style={styles.tbutton} onPress={saveTarget}>
              <Text style={styles.ttext}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.logoutContainer}>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutText}>Log Out</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </View>
  );
};

export default Profile;
