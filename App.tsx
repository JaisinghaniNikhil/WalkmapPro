import { Image, PermissionsAndroid, Platform } from 'react-native'
import React, { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import signup from './src/screens/signup'
import login from './src/screens/login'
import main from './src/screens/main'
import BottomTabNavigator from './src/BottomTabNavigator'

const Stack = createNativeStackNavigator();

const requestHighSamplingPermission = async () => {
  if (Platform.OS === 'android' && Platform.Version >= 33) {
    try {
      const HIGH_SAMPLING_PERMISSION = "android.permission.HIGH_SAMPLING_RATE_SENSORS"; // Manually define

      const granted = await PermissionsAndroid.request(HIGH_SAMPLING_PERMISSION as any);

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("HIGH_SAMPLING_RATE_SENSORS permission granted");
      } else {
        console.log("Permission denied");
      }
    } catch (err) {
      console.warn(err);
    }
  }
};

const MainAppStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="BottomTabs" component={BottomTabNavigator} />
    </Stack.Navigator>
  );
};

const AuthStack = () => {
  return (
    <Stack.Navigator initialRouteName="main">
      <Stack.Screen 
        name="main" component={main} options={{ headerShown: false }} />
      <Stack.Screen
        name="login"
        component={login}
        options={{
          headerTitle: "",
          headerStyle: { backgroundColor: '#0F172A' },
          headerTintColor: '#fff',
        }}
      />
      <Stack.Screen
        name="signup"
        component={signup}
        options={{
          headerTitle: "",
          headerStyle: { backgroundColor: '#0F172A' },
          headerTintColor: '#fff',
        }}
      />
      <Stack.Screen name="home" component={MainAppStack} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

const App = () => {
  useEffect(() => {
    requestHighSamplingPermission();  // Request permission when app starts
  }, []);

  return (
    <NavigationContainer>
      <AuthStack />
    </NavigationContainer>
  );
};

export default App;
