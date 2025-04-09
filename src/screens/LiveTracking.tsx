import React, { useEffect, useState } from "react";
import { View, Text, PermissionsAndroid, Platform, Alert, StyleSheet, TouchableOpacity } from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import Geolocation from "@react-native-community/geolocation";

type LocationCoords = { latitude: number; longitude: number };

const LiveTracking = () => {
  const [location, setLocation] = useState<LocationCoords | null>(null);
  const [tracking, setTracking] = useState(false);
  const [path, setPath] = useState<LocationCoords[]>([]);
  const [startLocation, setStartLocation] = useState<LocationCoords | null>(null);
  const [watchId, setWatchId] = useState<number | null>(null);

  useEffect(() => {
    requestLocationPermission();
  }, []);

  const requestLocationPermission = async () => {
    if (Platform.OS === "android") {
      try {
        const granted = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          PermissionsAndroid.PERMISSIONS.ACCESS_BACKGROUND_LOCATION, 
        ]);
  
        if (
          granted["android.permission.ACCESS_FINE_LOCATION"] === PermissionsAndroid.RESULTS.GRANTED &&
          granted["android.permission.ACCESS_BACKGROUND_LOCATION"] === PermissionsAndroid.RESULTS.GRANTED
        ) {
          getUserLocation();
        } else {
          Alert.alert("Location permission denied", "App needs location permission to function properly.");
        }
      } catch (err) {
        console.warn(err);
      }
    } else {
      getUserLocation();
    }
  };
  const getUserLocation = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });
      },
      (error) => {
        console.error("Error getting location:", error);
        Alert.alert("Location Error", "Unable to fetch location. Please check GPS and try again.");
      },
      {
        enableHighAccuracy: true,
        timeout: 60000, 
        maximumAge: 10000,
      }
    );
  };

  useEffect(() => {
    const watchId = Geolocation.watchPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });
      },
      (error) => {
        console.error("Tracking error:", error);
        Alert.alert("Tracking Error", "Location tracking is not working. Check GPS settings.");
      },
      {
        enableHighAccuracy: true,
        distanceFilter: 5,
        interval: 10000, 
        fastestInterval: 5000, 
      }
    );
  
    return () => Geolocation.clearWatch(watchId);
  }, []);

  const startWalking = () => {
    if (!location) {
      Alert.alert("Error", "Unable to fetch location. Please try again.");
      return;
    }

    setTracking(true);
    setPath([]);
    setStartLocation(location);

    const id = Geolocation.watchPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });
        setPath((prevPath) => [...prevPath, { latitude, longitude }]);
      },
      (error) => {
        console.error("Tracking error:", error);
      },
      { enableHighAccuracy: true, distanceFilter: 5 }
    );

    setWatchId(id);
  };

  const stopWalking = () => {
    if (!startLocation || !location) {
      Alert.alert("Error", "Tracking data is incomplete.");
      return;
    }

    setTracking(false);
    if (watchId !== null) {
      Geolocation.clearWatch(watchId);
      setWatchId(null);
    }

    
    const distance = (getDistance(startLocation, location) / 1000).toFixed(2);
    Alert.alert("Walk Completed", `Total distance: ${distance} km`);
  };

  const getDistance = (start: LocationCoords, end: LocationCoords) => {
    const R = 6371e3; 
    const lat1 = (start.latitude * Math.PI) / 180;
    const lat2 = (end.latitude * Math.PI) / 180;
    const deltaLat = ((end.latitude - start.latitude) * Math.PI) / 180;
    const deltaLon = ((end.longitude - start.longitude) * Math.PI) / 180;

    const a =
      Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
      Math.cos(lat1) * Math.cos(lat2) * Math.sin(deltaLon / 2) * Math.sin(deltaLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; 
  };

  return (
    <View style={{ flex: 1 }}>
      {location ? (
        <MapView
          style={{ flex: 1 }}
          initialRegion={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
          showsUserLocation={true}
        >
          <Marker coordinate={location} title="You are here" />
          <Polyline coordinates={path} strokeWidth={4} strokeColor="blue" />
        </MapView>
      ) : (
        <Text style={styles.loadingText}>Fetching location...</Text>
      )}

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.button, styles.startButton]} onPress={startWalking} disabled={tracking}>
          <Text style={styles.buttonText}>{tracking ? "Tracking..." : "Start"}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.stopButton, !tracking && styles.disabledButton]}
          onPress={stopWalking}
          disabled={!tracking}
        >
          <Text style={styles.buttonText}>Stop</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  loadingText: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -50 }, { translateY: -50 }],
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
  },
  buttonContainer: {
    position: "absolute",
    bottom: 30,
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "100%",
    paddingHorizontal: 20,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    width: 150,
  },
  startButton: {
    backgroundColor: "#4CAF50", 
  },
  stopButton: {
    backgroundColor: "#FF4C4C", 
  },
  disabledButton: {
    backgroundColor: "gray",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default LiveTracking;
