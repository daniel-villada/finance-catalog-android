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

const Betregal = ({ route, navigation }) => {
  const navigateToHome = () => {
    navigation.navigate('Home');
  };

  const handleCotizarServicio = () => {
    const whatsappUrl = `https://betregal.mx?aid=529`;
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
         source={require('../../assets/2-L.jpeg')}
         style={styles.coverImage}
       >
         {/* Top Overlay */}
         <View style={styles.topOverlay}>
           <Text style={styles.overlayText}>BetRegal</Text>
           <Text style={styles.overlayText}>Bono triplica primer Depósito</Text>
         </View>

         {/* Bottom Overlay */}
         <View style={styles.bottomOverlay}>
             <Text style={styles.overlayText}>100% hasta $3000.00 MXN</Text>
             <Text style={styles.overlayText}>80% desde $3,001.00 hasta $5,000.00 MXN</Text>
             <Text style={styles.overlayText}>50% desde$5,001.00 hasta $20,000.00 MXN</Text>
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
   height: 215, // Set the height as needed
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

export default Betregal;
