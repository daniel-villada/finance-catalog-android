import React, {useRef} from 'react';
import {Dimensions, FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Carousel from 'react-native-snap-carousel'
import {Button} from "native-base";
import useWebApi from "@/hooks/useWebApi";
import Logo from '@/components/Logo';

const Home = ({navigation}) => {
    const {auth} = useWebApi()

    const navigateToTransfer = () => {
        navigation.navigate('Transfer'); // Navigate to the "Transfer" component
    };

    const {width, height} = Dimensions.get('window')
    const carouselRef = useRef(null)

    const Service = [
        {
            key: '1',
            title: "Transporte",
            image: require('../assets/2-s.jpeg'),
            imageLarge: require('../assets/1-L.jpeg'),
        },
        {
            key: '2',
            title: "BetRegal",
            image: require('../assets/1-s.jpeg'),
            imageLarge: require('../assets/2-L.jpeg'),
        },
        {
            key: '3',
            title: "AlquimiaPay",
            image: require('../assets/3-s.jpeg'),
            imageLarge: require('../assets/3-L.jpeg'),
        },
        {
            key: '4',
            title: "Estrategias Fiscales",
            image: require('../assets/4-s.jpeg'),
            imageLarge: require('../assets/4-L.jpeg'),
        },
        {
            key: '5',
            title: "Crypto",
            image: require('../assets/5-s.jpeg'),
            imageLarge: require('../assets/5-L.jpeg'),
        },
    ];

    const handleCarouselItemPress = (item) => {
        if (item.title === 'Transporte') {
            navigation.navigate('Aviones');
        } else if (item.title === 'BetRegal') {
            navigation.navigate('Betregal');
        } else if (item.title === 'AlquimiaPay') {
            navigation.navigate('Alquima');
        } else if (item.title === 'Estrategias Fiscales') {
            navigation.navigate('Fiscales');
        }
        else if (item.title === 'Crypto') {
          navigation.navigate('Crypto');
        }
    };

    const renderCarouselItem = ({item}) => {
        return (
            <TouchableOpacity style={styles.carouselItem} onPress={() => handleCarouselItemPress(item)}>
                <Image style={styles.carouselItemImage} source={item.imageLarge}/>
                <Text style={styles.carouselItemText}>{item.title}</Text>
            </TouchableOpacity>
        );
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Logo navigation={navigation}/>
            </View>

            <View style={{paddingTop: 30, paddingHorizontal: 14}}>

                <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                    <View>
                        <Text style={{fontSize: 16, color: '#fff'}}>Exclusividad al alcance de tus dedos:</Text>
                        <Text style={{fontSize: 12, color: '#fff', opacity: 0.6}}>Servicios / Networking /
                            Privacidad</Text>
                    </View>
                </View>

                <Button variant="primary" my={4} onPress={navigateToTransfer}>
                    REVISTA
                </Button>
                {/* <Button mb={4} onPress={auth.logout}>
                    Logout
                </Button> */}
                <Text style={{fontSize: 16, color: '#fff', marginBottom: 16}}>Otros servicios:</Text>
                <FlatList
                    inverted
                    horizontal
                    data={Service}
                    renderItem={({item}) => {
                        return (
                            <TouchableOpacity onPress={() => handleCarouselItemPress(item)}>
                                <View style={styles.AddUser}>
                                    <Image style={styles.AddUserIconbg} source={item.image}/>
                                    <Text style={{color: '#fff'}}>{item.title}</Text>
                                </View>
                            </TouchableOpacity>
                        );
                    }}
                />
                <View style={styles.carouselContainer}>
                    <Carousel
                        ref={carouselRef}
                        data={Service}
                        renderItem={renderCarouselItem}
                        sliderWidth={width}
                        itemWidth={width * 0.7}
                        layout={'default'}
                    />
                </View>
            </View>

        </ScrollView>

    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        paddingTop: 0
    },
    header: {
        paddingTop: 30,
        paddingHorizontal: 14,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerLogo: {
        width: 82,
        height: 82,
        borderRadius: 50,
    },
    carouselItem: {
        width: '100%',
        height: 300,
        borderRadius: 8,
        overflow: 'hidden',
        backgroundColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
    },
    carouselItemImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    carouselItemText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
        position: 'absolute',
        bottom: 16,
        left: 16,
    },
    carouselContainer: {
       // height: 700, // Adjust this height to make the Carousel larger
        marginBottom: 50,
    },
    AddUser: {
        height: 140,
        width: 100,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#0c0c0c',
        borderRadius: 10,
        marginRight: 14,
        marginBottom: 15
    },
    AddUserIconbg: {
        width: 70,
        height: 70,
        backgroundColor: '#000',
        borderRadius: 10,
        marginBottom: 10,
        justifyContent: 'center'
    },
    ProfileImage: {
        width: 55,
        height: 55,
        borderRadius: 40
    },
    ProfileImageNotification: {
        height: 12,
        width: 12,
        backgroundColor: '#4853ef',
        borderRadius: 6,
        position: 'absolute',
        right: 6,
        borderWidth: 2,
        borderColor: '#000',
    },
    PanelHandle: {
        height: 6,
        width: 50,
        backgroundColor: '#666',
        borderRadius: 6,
        alignSelf: 'center',
        marginTop: 6
    },
    PanelItemContainer: {
        borderWidth: 0.4,
        borderColor: '#666',
        padding: 14,
        borderRadius: 6,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20
    },
    PanelImage: {
        width: 30,
        height: 30,
        backgroundColor: '#000',
        borderRadius: 40
    },
    PanelButton: {
        padding: 14,
        width: 200,
        justifyContent: 'center',
        backgroundColor: '#1c1c1c',
        borderRadius: 10
    },
    PanelButtonText: {
        fontSize: 16,
        color: '#fff',
        alignSelf: 'center'
    },
    loginButton: {
        backgroundColor: '#fafafa', // Set the background color to "#FFF"
        borderRadius: 5,
        height: 52,
        marginTop: 25,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 25
    },
    loginButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
    }
});

export default Home;
