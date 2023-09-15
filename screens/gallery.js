import React, {useCallback, useMemo} from 'react';
import {
    ActivityIndicator,
    Dimensions,
    FlatList,
    RefreshControl,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import FastImage from "react-native-fast-image";
import Carousel from 'react-native-snap-carousel';
import Logo from '@/components/Logo';
import {MaterialIcons} from '@expo/vector-icons';
import {useTypeSafeInfiniteQuery} from "@/hooks/useTypeSafeInfinityQuery";
import {getImageUrlByItem} from "@/helpers";

const {width, height} = Dimensions.get('window');

const Gallery = ({navigation}) => {


    const {data: resources, fetchNextPage, refetch, isRefetching, isLoading, isFetching} = useTypeSafeInfiniteQuery({
        queryKey: ['getCatalogInfinity',],
    });


    const filteredItems = useMemo(() => {
        if (!resources) {
            return [];
        }
        // @ts-ignore
        return resources.pages?.map((page) => page.data).flat() || [];
    }, [resources]);

    const navigateToCatalog = () => {
        navigation.navigate('Catalog');
    };

    const navigateToProfile = (item) => {
        navigation.navigate('Profile', {item});
    };



    const renderCarouselItem = useCallback(
        ({item}) => (
            <View style={styles.carouselItem}>
                <FastImage
                    style={styles.image}
                    resizeMode={FastImage.resizeMode.cover}
                    source={{
                        uri: getImageUrlByItem(item),
                        priority: FastImage.priority.normal,
                    }}
                />
            </View>
        )
        , [])

    const renderItem = useCallback(({item}) => (
        <TouchableOpacity onPress={() => navigateToProfile(item)}>
            <View style={styles.galleryCard}>
                <View style={styles.imageContainer}>
                    {item.attributes.image && item.attributes.image.data.length > 0 ? (
                        <Carousel
                            data={item.attributes.image.data}
                            renderItem={renderCarouselItem}
                            sliderWidth={width / 3 - 20}
                            itemWidth={width / 3 - 20}
                            loop
                            useScrollView={false}
                        />
                    ) : (
                        <FastImage
                            style={styles.galleryImage}
                            resizeMode="cover"
                            source={{
                                uri: getImageUrlByItem(item), priority: FastImage.priority.normal,
                            }}
                        />
                    )}
                </View>
            </View>
        </TouchableOpacity>
    ), [navigateToProfile]);

    const keyExtractor = useCallback((item) => item?.id, []);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <MaterialIcons name="arrow-back" size={24} color="white"/>
                </TouchableOpacity>
                <Logo navigation={navigation}/>
                <TouchableOpacity onPress={navigateToCatalog}>
                    <MaterialIcons name="view-carousel" size={24} color="#fff"/>
                </TouchableOpacity>
            </View>
            {isLoading ? ( // If loading, show the loading spinner
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#fff"/>
                </View>
            ) : (
                // If not loading, show the FlatList
                <>
                    <FlatList
                        data={filteredItems}
                        renderItem={renderItem}
                        keyExtractor={keyExtractor}
                        numColumns={3}
                        onEndReached={fetchNextPage}
                        contentContainerStyle={styles.galleryContainer}
                        initialNumToRender={20}
                        refreshControl={
                            <RefreshControl
                                refreshing={isRefetching || isFetching}
                                onRefresh={refetch}
                                tintColor="white"
                            />
                        }
                        maxToRenderPerBatch={20}
                        onEndReachedThreshold={0.1}
                    />
                </>
            )}
            <View style={styles.endTextContainer}>
                <TouchableOpacity onPress={fetchNextPage}>
                    <Text style={styles.noMoreCardsText}>Más contenido</Text>
                </TouchableOpacity>
            </View>
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
    endTextContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        paddingVertical: 8,
        alignItems: 'center',
    },
    endText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
    },
    backButton: {
        marginRight: 10,
    },
    galleryContainer: {
        paddingTop: 10,
        paddingBottom: 56,
        paddingHorizontal: 10,
        justifyContent: 'center',
    },
    galleryCard: {
        width: width / 3 - 20,
        height: width / 3 - 20,
        margin: 5,
        borderRadius: 10,
    },
    galleryImage: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
    },
    contentContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 45,
    },
    imageContainer: {
        flex: 1,
        position: 'relative',
        width: '100%',
        height: '100%',
        borderRadius: 25,
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    noMoreCardsText: {
        fontWeight: 'bold',
        fontSize: 18,
        color: 'white',
    },
    card: {
        width: width * 0.75,
        height: height * 0.65,
        backgroundColor: '#fff',
        borderRadius: 25,
        shadowColor: 'rgba(0,0,0,0.5)',
        shadowOffset: {
            width: 10,
            height: 1,
        },
        shadowOpacity: 0.5,
    },
    overlay: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        padding: 16,
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
    },
    arrowContainer: {
        position: 'absolute',
        top: '50%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        paddingHorizontal: 16,
    },
    arrowButton: {
        padding: 8,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingBottom: 56,
    },
    button: {
        padding: 12,
        backgroundColor: '#fff',
        borderRadius: 8,
        marginHorizontal: 8,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
    },
    carouselItem: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    loadingContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default Gallery;
