import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator, TouchableOpacity, TextInput, Button } from 'react-native';
import axios from 'axios';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import MasonryList from 'react-native-masonry-list';
import { Calendar } from 'react-native-calendars';
import Logo from '@/components/Logo';


const CalendarScreen = ({ route, navigation }) => {
  const [itemData, setItemData] = useState(null);
  const [contactMessage, setContactMessage] = useState('');

  const { id } = route.params.item;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://164.92.74.136/api/items/${id}`);
        console.log('API Response:', response.data);
        // Create a new object with only the required fields and no circular references
        const cleanItemData = {
          title: response.data.data.attributes.title,
          // Add other required fields here
        };
        setItemData(cleanItemData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [id]);

  const handleContactPress = () => {
    // Logic to handle contacting action here
    // You can use the contactMessage state to get the user's input message
    console.log('Contacting...', contactMessage);
  };

  if (!itemData) {
    return <ActivityIndicator size="large" style={styles.loadingIndicator} />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <MaterialIcons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Logo navigation={navigation}/>
        <TouchableOpacity>
           <MaterialIcons name="calendar-today" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
      <Text style={styles.profileName}>{itemData.title}</Text>
      {/* Calendar component */}
      <Calendar
        style={styles.calendar}
      />
      {/* Input for contacting */}
      <TextInput
        style={styles.input}
        placeholder="Type your message..."
        value={contactMessage}
        onChangeText={(text) => setContactMessage(text)}
      />
      {/* Contact button */}
      <Button title="Contactar" onPress={handleContactPress} />
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
   backButton: {
     marginRight: 10,
   },
   profileImage: {
     width: '100%',
     height: 300, // Adjust the height as per your requirement
     resizeMode: 'cover',
   },
   profileDetails: {
     padding: 20,
   },
   profileName: {
     fontSize: 35,
     fontWeight: 'bold',
     marginBottom: 10,
     color: '#fff',
   },
   profileDescription: {
     fontSize: 16,
     color: '#666',
   },
   loadingIndicator: {
     flex: 1,
     justifyContent: 'center',
     alignItems: 'center',
   },
   imageContainer: {
     borderRadius: 8,
   },
   masonryListContainer: {
     backgroundColor: '#000',
   },
   calendar: {
     // Add styles for the calendar component here
     // For example, you can set width, height, background color, etc.
     backgroundColor: 'white',
     marginVertical: 20,
   },
   input: {
     borderWidth: 1,
     borderColor: 'gray',
     borderRadius: 8,
     padding: 10,
     marginVertical: 10,
     color: 'white',
   },
 });

export default CalendarScreen;
