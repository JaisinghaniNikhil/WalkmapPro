import React, { useState } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, Alert } from 'react-native';
import styles from '../styles';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({ navigation }: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isValid, setIsValid] = useState(false);

  const validateEmail = (text: string) => {
    setEmail(text);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(text)) {
      setEmailError('Invalid Email Format');
      return false;
    } else {
      setEmailError('');
      return true;
    }
  };

  const validatePassword = (text: string) => {
    setPassword(text);
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(text)) {
      setPasswordError('Password must be at least 8 characters, include an uppercase letter, a number, and a special character');
      return false;
    } else {
      setPasswordError('');
      return true;
    }
  };

  const handleLogin = async () => {
    const valid = validateEmail(email) && validatePassword(password);
    setIsValid(valid);

    if (valid) {
      try {
        const response = await axios.post('http://192.168.1.107:5001/login', {
          email,
          password
        });

        if (response.status === 200) {
          const { id, name, age, gender, height, weight, email } = response.data.user; // 
          
          await AsyncStorage.setItem('userId', id);
          await AsyncStorage.setItem('userName', name);
          await AsyncStorage.setItem('userAge', age.toString());
          await AsyncStorage.setItem('userGender', gender);
          await AsyncStorage.setItem('userHeight', height.toString());
          await AsyncStorage.setItem('userWeight', weight.toString());
          await AsyncStorage.setItem('userEmail', email);

          Alert.alert(`Login Successful: ${name}`);
          navigation.navigate('home');
        }
      } catch (error) {
        Alert.alert('Login Failed', 'Incorrect Credentials. Please try Again');
        console.error(error);
      }
    } else {
      Alert.alert('Please Enter Complete Details');
    }
  };

  return (
    <View style={styles.container2}>
      <Text style={styles.login}>Log In</Text>

      <View style={styles.inputs}>
        <View style={styles.inputWrapper}>
          <Image source={require('../../assets/icons/user.png')} style={styles.inputIcon} />
          <TextInput
            style={styles.inputField}
            placeholder="Enter Email"
            placeholderTextColor="#888"
            value={email}
            onChangeText={validateEmail}
            
          />
        </View>
        {emailError ? <Text style={styles.errortext}>{emailError}</Text> : null}

        <View style={styles.inputWrapper}>
          <Image source={require('../../assets/icons/password.png')} style={styles.inputIcon} />
          <TextInput
            style={styles.inputField}
            placeholder="Enter Password"
            placeholderTextColor="#888"
            secureTextEntry
            value={password}
            onChangeText={validatePassword}
          />
        </View>
        {passwordError ? <Text style={styles.errortext}>{passwordError}</Text> : null}
      </View>

      

      <View style={styles.buttoncont}>
        <TouchableOpacity style={styles.button1} onPress={handleLogin}>
          <Text style={styles.buttontext}>Login</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={() => navigation.navigate('signup')}>
        <Text style={styles.redirect}>
          New Here? <Text style={styles.signupLink}>Signup</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Login;
