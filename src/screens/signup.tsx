import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, TextInput, Alert } from 'react-native';
import styles from '../styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const signup = ({ navigation }: any) => {
  const [ name, setName ] = useState('');
  const [ age, setAge ] = useState('')
  const [ gender, setGender ] = useState<string>('');
  const [ height, setHeight] = useState('');
  const [ weight, setWeight ] = useState('');
  const [ email, setEmail] = useState('');
  const [ password, setPassword ] = useState('');

  const [ nameError, setNameError ] = useState('');
  const [ ageError, setAgeError ] = useState('');
  const [ genderError, setGenderError ] = useState('');
  const [ heightError, setHeightError ] = useState('');
  const [ weightError, setWeightError ] = useState(''); 
  const [ emailError, setEmailError ] = useState('');
  const [ passwordError, setPasswordError ] = useState(''); 

  const [ isValid, setIsValid ] = useState(false);
  
  const validateName = (text:string) => {
    setName(text);
    if(name.length < 3 ){
      setNameError('Name Length should be Greater that 3');
      return false;
    }
    else{
      setNameError('');
      return true;
    }
  };
  const validateAge = (text:string) => {
    setAge(text);
    const ageNum = parseInt(text);
    if(isNaN(ageNum) || ageNum <= 18){
      setAgeError('Age Should be Greater than 18');
      return false;
    }
    else{
      setAgeError('');
      return true;
    }
  };
  const validateGender = () =>{
    if(!gender){
      setGenderError('Please Select Your Gender');
      return false;
    }
    else{
      setGenderError('');
      return true;
    }
  };

  const validateHeight = (text: string) => {
    setHeight(text);
    const heightNum = parseInt(text); 
    if (isNaN(heightNum) || heightNum < 100) {
      setHeightError('Height should be greater than 100 cm');
      return false;
    } else {
      setHeightError('');
      return true;
    }
  };

  const validateWeight = (text: string) => {
    setWeight(text);
    const weightNum = parseInt(text); 
    if (isNaN(weightNum) || weightNum < 30) {
      setWeightError('Weight should be a valid number in kg');
      return false;
    } else {
      setWeightError('');
      return true;
    }
  };

  const validateEmail = (text:string) =>{
    setEmail(text);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailRegex.test(text)){
      setEmailError('Invalid Email Format');
      return false;
    }
    else{
      setEmailError('');
      return true;
    }
  };

  const validatePassword = (text:string) =>{
    setPassword(text);
    const passwordRegex =  /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if(!passwordRegex.test(text )){
      setPasswordError('Password must be at least 8 characters, include an uppercase letter, a number, and a special character');
        return false;
    }
    else{
      setPasswordError('');
      return true;
    }
  };

  const handleSignup = async () => {
    const valid = 
      validateName(name) &&
      validateAge(age) &&
      validateGender() &&
      validateHeight(height) &&
      validateWeight(weight) &&
      validateEmail(email) &&
      validatePassword(password);
  
    setIsValid(valid);
  
    if(valid){
      try{
        const response = await axios.post('http://192.168.1.107:5001/signup',{
          name, age, gender, height, weight, email, password
        });
        
        if(response.status === 200){
          const user = response.data.user;
          await AsyncStorage.setItem('userName', user.name);
          await AsyncStorage.setItem('userAge', user.age.toString());
          await AsyncStorage.setItem('userGender', user.gender);
          await AsyncStorage.setItem('userHeight', user.height.toString());
          await AsyncStorage.setItem('userWeight', user.weight.toString());
          await AsyncStorage.setItem('userEmail', user.email);
        
          Alert.alert('Signup Successful');
          navigation.navigate('login');
        }
      } catch(error){
        Alert.alert('Signup Failed','Something Went Wrong! Please try Again');
        console.log(error);
      }
    }
    else{
      Alert.alert('Please Fill All the Details Carefully');
    }

  };

  return (
    <ScrollView contentContainerStyle={styles.container3}>
      <Text style={styles.login}>Signup</Text>

      <View style={styles.inputs}>
        <View style={styles.inputWrapper}>
          <Image source={require('../../assets/icons/name.png')} style={styles.inputIcon} />
          <TextInput 
            style={styles.inputField} 
            placeholder="Name" 
            placeholderTextColor="#888" 
            onChangeText={validateName}/>
        </View>
        { nameError ? <Text style={styles.errortext}>{nameError}</Text> : null }

        <View style={styles.inputWrapper}>
          <Image source={require('../../assets/icons/age.png')} style={styles.inputIcon} />
          <TextInput 
            style={styles.inputField} 
            placeholder="Age" 
            placeholderTextColor="#888" 
            onChangeText={validateAge}
            keyboardType="numeric"/>
        </View>
        { ageError ? <Text style={styles.errortext}>{ageError}</Text> : null }

        <View style={styles.genderContainer}>
          <Text style={styles.genderLabel}>Gender:</Text>
          <View style={styles.radioGroup}>
            {['Male', 'Female', 'Other'].map((option) => (
              <TouchableOpacity
                key={option}
                style={styles.radioButton}
                onPress={() =>  {setGender(option);
                                 setGenderError('');
                }}
              >
                <View style={[styles.radioOuterCircle, gender === option && styles.radioSelected]}>
                  {gender === option && <View style={styles.radioInnerCircle} />}
                </View>
                <Text style={styles.radioLabel}>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        { genderError ? <Text style={styles.errortext}>{genderError}</Text> : null }

        <View style={styles.inputWrapper}>
          <Image source={require('../../assets/icons/height.png')} style={styles.inputIcon} />
          <TextInput 
            style={styles.inputField} 
            placeholder="Height(in cms)" 
            placeholderTextColor="#888" 
            onChangeText={validateHeight}
             />
        </View>
        { heightError ? <Text style={styles.errortext}>{heightError}</Text> : null }

        <View style={styles.inputWrapper}>
          <Image source={require('../../assets/icons/weight.png')} style={styles.inputIcon} />
          <TextInput 
            style={styles.inputField} 
            placeholder="Weight(in kgs)" 
            placeholderTextColor="#888" 
            onChangeText={validateWeight}
            keyboardType="numeric" />
        </View>
        { weightError ? <Text style={styles.errortext}>{weightError}</Text> : null }

        <View style={styles.inputWrapper}>
          <Image source={require('../../assets/icons/user.png')} style={styles.inputIcon} />
          <TextInput 
            style={styles.inputField} 
            placeholder="Email Id" 
            placeholderTextColor="#888"
            onChangeText={validateEmail} />
        </View>
        { emailError ? <Text style={styles.errortext}>{emailError}</Text> : null }

        <View style={styles.inputWrapper}>
          <Image source={require('../../assets/icons/password.png')} style={styles.inputIcon} />
          <TextInput 
            style={styles.inputField} 
            placeholder="Password" 
            placeholderTextColor="#888" 
            onChangeText={validatePassword}
            secureTextEntry />
        </View>
        { passwordError ? <Text style={styles.errortext}>{passwordError}</Text> : null }
      </View>

      <View style={styles.buttoncont}>
        <TouchableOpacity 
          style={styles.button1}  
          onPress={handleSignup}>
          <Text style={styles.buttontext}>Signup</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={() => navigation.navigate('login')}>
        <Text style={styles.redirect}>
          Already have an account? <Text style={styles.signupLink}>Login</Text>
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default signup;