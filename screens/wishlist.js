import React, {useCallback} from "react";
import {Dimensions, FlatList, Image, StyleSheet, Text, TouchableOpacity, View,} from "react-native";
import {MaterialIcons} from "@expo/vector-icons";
import useWishlist from "@/hooks/useWishlist";
import {Button} from "native-base";
import {getImageUrlByItem} from "@/helpers";
import Logo from "@/components/Logo";
import FastImage from "react-native-fast-image";

const {width, height} = Dimensions.get("window");

const Wishlist = ({navigation}) => {

    const {wishlistCollection, clearWishlist} = useWishlist()


    const navigateToProfile = (item) => {
        const params = {
            id: item.id,
            title: item.attributes.title,
            image:
                item.attributes.image.formats?.medium?.url || item.attributes.image.url,
        };

        navigation.navigate("Profile", {item: params});
    };


    const renderListEmptyComponent = useCallback(() => {
        return (
            <Text style={styles.noImagesText}>No images to display</Text>
        )
    }, [])

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={styles.backButton}
                >
                    <MaterialIcons name="arrow-back" size={24} color="white"/>
                </TouchableOpacity>
                <Logo navigation={navigation}/>
                <TouchableOpacity>
                    {/* Add any other header elements here */}
                </TouchableOpacity>
            </View>
            <Text style={styles.profileName}>Tus Likes</Text>
            <FlatList
                data={wishlistCollection}
                ListEmptyComponent={renderListEmptyComponent}
                renderItem={({item}) => {
                    return (
                        <TouchableOpacity activeOpacity={0.6} onPress={() => navigateToProfile(item)} style={{position: "relative"}}>
                            <FastImage source={{uri: getImageUrlByItem(item)}}
                                             style={[styles.galleryCard, {
                                                 backgroundColor: '#000000c0',
                                                 opacity: 0.7
                                             }]}/>
                            <View style={{
                                position: "absolute",
                                alignSelf: "center",
                                alignItems: "center",
                                justifyContent: "center",
                                height: "100%",
                                zIndex: 9999
                            }}>
                                <Text style={styles.title}>{item.attributes?.title}</Text>
                            </View>
                        </TouchableOpacity>
                    );
                }}
                style={{flex: 1}}
                keyExtractor={(item) => item.id.toString()}
                numColumns={3}
                contentContainerStyle={styles.galleryContainer}
            />

            <Button variant="primary" mb={10} onPress={clearWishlist}>
                Borrar todo
            </Button>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000",
    },
    header: {
        flexDirection: "row",
        paddingTop: 30,
        paddingHorizontal: 14,
        alignItems: "center",
        justifyContent: "space-between",
    },
    headerLogo: {
        width: 82,
        height: 82,
        borderRadius: 50,
    },
    profileName: {
        fontSize: 35,
        fontWeight: "bold",
        marginBottom: 10,
        color: "#fff",
    },
    backButton: {
        marginRight: 10,
    },
    galleryContainer: {
        paddingTop: 10,
        paddingBottom: 56,
        paddingHorizontal: 10,
        justifyContent: "center",
    },
    galleryCard: {
        width: width / 3 - 20,
        height: width / 3 - 20,
        margin: 5,
        borderRadius: 10,
        backgroundColor: "#1C1C1E",
        justifyContent: "center",
        alignItems: "center",
    },
    galleryImage: {
        width: "100%",
        height: "100%",
        borderRadius: 10,
    },
    imageContainer: {
        flex: 1,
        position: "relative",
        width: "100%",
        height: "100%",
        borderRadius: 25,
        overflow: "hidden",
    },
    title: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "center",
    },
});

export default Wishlist;
