import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import {} from '@react-navigation/native'
import styles from '../styles';

const main = ({navigation}:any) => {
  return (
    <View style={styles.container1}>
      <View style={styles.mover}>
        <Image 
          source={require('../../assets/icons/mainlogo.png')} 
          style={styles.mainimg}
          resizeMode='contain'
        />
        <Text style={styles.btext}>WALKMAP PRO</Text>
      </View>
      <View style={styles.quotecont}>
        <Text style={styles.quote}>Empowering You To Take Control Of Your Health Journey</Text>
      </View>
      <View style={styles.btncont}>
        <TouchableOpacity style={styles.btn1} onPress={() => navigation.navigate('login')} >
          <Text style={styles.btn1text}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn2} onPress={() => navigation.navigate('signup')}>
          <Text style={styles.btn2text}>Signup</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default main;

