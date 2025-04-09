import { Image, View } from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './screens/Home';
import Profile from './screens/Profile';
import RunnerMode from './screens/RunnerMode';
import LiveTracking from './screens/LiveTracking';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: route.name === 'Profile', 
        headerTitleStyle: {
          fontFamily: 'Aclonica-Regular', 
          fontSize: 22,
          color: '#fff', 
        },
        headerStyle: {
          backgroundColor: '#1e1e1e', 
          elevation: 5, 
        },
        tabBarStyle: {
          backgroundColor: '#2e2d2d',
          borderTopWidth: 0,
          elevation: 5,
          height: 60,
          paddingBottom: 0,
          paddingTop: 5,
        },
        tabBarIcon: ({ focused }) => {
          const icons: Record<string, any> = {
            Home: require('../assets/icons/home.png'),
            RunnerMode: require('../assets/icons/runnermode.png'),
            LiveTracking: require('../assets/icons/livetracking.png'),
            Profile: require('../assets/icons/profile.png'),
          };

          return (
            <View
              style={{
                backgroundColor: focused ? '#1e1e1e' : 'transparent',
                padding: 15,
                borderRadius: 12,
              }}
            >
              <Image
                source={icons[route.name]}
                style={{
                  width: 35,
                  height: 35,
                  resizeMode: 'contain',
                }}
              />
            </View>
          );
        },
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="RunnerMode" component={RunnerMode} />
      <Tab.Screen name="LiveTracking" component={LiveTracking} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
