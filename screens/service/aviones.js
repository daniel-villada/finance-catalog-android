import React, { useState, useRef } from 'react';
import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  Image,
  Dimensions,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Animated,
  ScrollView,
  Linking
} from 'react-native';

// Install These Packages
import SlidingUpPanel from 'rn-sliding-up-panel';
import Carousel from 'react-native-snap-carousel';

// From Expo
import { MaterialIcons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

const Aviones = ({ route, navigation }) => {
  const navigateToHome = () => {
    navigation.navigate('Home');
  };

  const handleCotizarServicio = () => {
    const phoneNumber = '+525532647592'; // Replace with the phone number you want to contact on WhatsApp
    const whatsappUrl = `https://wa.me/${phoneNumber}`;
    Linking.openURL(whatsappUrl);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <MaterialIcons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={navigateToHome}>
          <Image source={require('../../assets/3.png')} style={styles.headerLogo} />
        </TouchableOpacity>
        <TouchableOpacity>
        </TouchableOpacity>
      </View>
      <ImageBackground
         source={require('../../assets/1-L.jpeg')}
         style={styles.coverImage}
       >
         {/* Top Overlay */}
         <View style={styles.topOverlay}>
           <Text style={styles.overlayText}>Transporte Privado</Text>
           <Text style={styles.overlayText}>Jets privados, helicópteros y terrestre</Text>
         </View>

         {/* Bottom Overlay */}
         <View style={styles.bottomOverlay}>
             <Text style={styles.overlayText}>Hawker 800 $3300.00 US por hora</Text>
             <Text style={styles.overlayText}>Hawker 700 $3000.00 US por hora</Text>
             <Text style={styles.overlayText}>Gulfstream GLF4 $6000.00 US por hora</Text>
             <Text style={styles.overlayText}>Agusta A109 $3400.00 US por hora</Text>
             <TouchableOpacity style={styles.loginButton} onPress={handleCotizarServicio}>
               <Text style={styles.loginButtonText}>COTIZAR SERVICIO</Text>
             </TouchableOpacity>
         </View>
       </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    flexDirection: 'row',
    paddingTop: 30,
    paddingHorizontal: 14,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerLogo: {
    width: 82,
    height: 82,
    borderRadius: 50,
  },
  coverImage: {
   width: '100%',
   height: '85%',
   position: 'relative',
 },
 topOverlay: {
   position: 'absolute',
   top: 0,
   left: 0,
   right: 0,
   height: 80, // Set the height as needed
   backgroundColor: 'rgba(0, 0, 0, 0.5)',
   justifyContent: 'center',
   alignItems: 'flex-start',
 },
 bottomOverlay: {
   position: 'absolute',
   bottom: 0,
   left: 0,
   right: 0,
   height: 250, // Set the height as needed
   backgroundColor: 'rgba(0, 0, 0, 0.6)',
   justifyContent: 'center',
   alignItems: 'flex-start',
 },
 overlayText: {
   color: '#fff',
   fontSize: 18,
   fontWeight: 'bold',
   marginLeft: 15
 },
 loginButton: {
     backgroundColor: '#fafafa', // Set the background color to "#FFF"
     borderRadius: 5,
     height: 52,
     marginTop: 25,
     width: '100%',
     alignItems: 'center',
     justifyContent: 'center',
 },
 loginButtonText: {
     fontSize: 16,
     fontWeight: 'bold',
     color: '#000',
 },

});

export default Aviones;
