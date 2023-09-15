import React, {useMemo, useState} from "react";
import {ActivityIndicator, Linking, StyleSheet, Text, TextInput, TouchableOpacity,} from "react-native";
import {MaterialIcons} from "@expo/vector-icons";
import {API_URL} from "@/env"
import MasonryList from "react-native-masonry-list";
import {Calendar} from "react-native-calendars";
import {useTypeSafeQuery} from "@/hooks/useTypeSafeQuery";
import {FormProvider, useForm} from "react-hook-form";
import FieldSubscriber from "@/components/Forms/FieldSubscriber";
import {Button, View} from "native-base";
import Logo from "@/components/Logo";
import useWishlist from "@/hooks/useWishlist";
import {useToast} from "@/hooks/useToast";


const CalendarForm = ({title, navigation}) => {

    const [isLoading, setIsLoading] = useState(false)

    const formMethods = useForm({
        defaultValues: {
            location: "",
            date: new Date(),
            schedule: ""
        }
    })

    const {handleSubmit} = formMethods

    const sendWhatsAppMessage = (data) => {
        setIsLoading(true)
        const message = encodeURIComponent(`Me interesa ${title} el ${data.date} en ${data.location} a las ${data.schedule}`);
        const phoneNumber = "+525532647592";

        const url = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${message}`;

        Linking.openURL(`whatsapp://send?text=${message}&phone=${phoneNumber}`).catch(() => {
            Linking.openURL(url).finally(() => {
                setIsLoading(false)
            })
        }).then(() => {
            setIsLoading(false)
        })
    };

    return (
        <FormProvider {...formMethods}>
            <View style={styles.calendarContainer}>
                <FieldSubscriber name="date">
                    {({field}) => {
                        return (
                            <Calendar
                                style={styles.calendar}
                                theme={{
                                    backgroundColor: "#000",
                                    calendarBackground: "#000",
                                    textSectionTitleColor: "#fff",
                                    selectedDayBackgroundColor: "#fff",
                                    selectedDayTextColor: "#000",
                                    todayTextColor: "#fff",
                                    dayTextColor: "#fff",
                                    textDisabledColor: "#666",
                                    dotColor: "#fff",
                                    selectedDotColor: "#fff",
                                    arrowColor: "#fff",
                                    monthTextColor: "#fff",
                                    textMonthFontWeight: "bold",
                                    textDayHeaderFontWeight: "bold",
                                }}
                                onDayPress={(val) => field.onChange(val.dateString)}
                                markedDates={{
                                    [field.value]: {selected: true, disableTouchEvent: true, selectedDotColor: 'orange'}
                                }}
                            />
                        )
                    }}
                </FieldSubscriber>


                <FieldSubscriber isRequired name="location" _view={{
                    w: "90%",
                    mb: 5
                }}>
                    {({field}) => {
                        return (
                            <TextInput
                                style={styles.input}
                                placeholder="Ubicacion"
                                placeholderTextColor="#fff"
                                ref={field.ref}
                                value={field.value}
                                onChangeText={field.onChange}
                            />
                        )
                    }}
                </FieldSubscriber>

                <FieldSubscriber isRequired name="schedule" _view={{
                    w: "90%",
                    alignSelf: "center",
                    mb: 5
                }}>
                    {({field}) => {
                        return (
                            <TextInput
                                style={styles.input}
                                placeholder="Horario"
                                placeholderTextColor="#fff"
                                ref={field.ref}
                                value={field.value}
                                onChangeText={field.onChange}
                            />
                        )
                    }}
                </FieldSubscriber>

                <Button
                    variant="primary"
                    w="90%"
                    alignSelf="center"
                    isLoading={isLoading}
                    onPress={handleSubmit(sendWhatsAppMessage)}
                >
                    Contactar
                </Button>
            </View>
        </FormProvider>
    )
}


const Profile = ({route, navigation}) => {
    const {id} = route.params.item;
    const [viewMode, setViewMode] = useState("masonry"); // 'masonry' or 'calendar'
    const {data: profile, isLoading} = useTypeSafeQuery({
        queryKey: ['getCatalogById', id],
        queryParams: {
            id
        }
    });

    const {addWishlistItemById} = useWishlist()

    const toast = useToast()


    const itemData = useMemo(() => profile?.attributes, [profile])

    if (isLoading && !itemData) {
        return <ActivityIndicator size="large" style={styles.loadingIndicator}/>;
    }

    const images =
        itemData?.image && itemData.image.data
            ? itemData.image.data.map((imageData) => ({
                uri: `${API_URL}${imageData.attributes.url}`,
            }))
            : [];

    const toggleViewMode = () => {
        setViewMode((prevMode) =>
            prevMode === "masonry" ? "calendar" : "masonry"
        );
    };


    const handleAddToWishlist = () => {
        addWishlistItemById(profile.id, profile)
        navigation.navigate('Wishlist');
    }

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
                <TouchableOpacity onPress={toggleViewMode}>
                    <MaterialIcons
                        name={viewMode === "masonry" ? "calendar-today" : "view-module"}
                        size={24}
                        color="#fff"
                    />
                </TouchableOpacity>
            </View>
            <View style={styles.header}>
                <Text style={styles.profileName}>{itemData.title}</Text>
                {/* Button Add To  whislist */}
                <TouchableOpacity
                    style={styles.button}
                    onPress={handleAddToWishlist}
                >
                    <MaterialIcons name="favorite" size={28} color="#fff"/>
                </TouchableOpacity>
            </View>
            {viewMode === "masonry" ? (
                images.length > 0 ? (
                    <MasonryList
                        images={images}
                        containerWidth={styles.container.width}
                        columns={2}
                        spacing={2}
                        imageContainerStyle={styles.imageContainer}
                        listContainerStyle={styles.masonryListContainer}
                    />
                ) : (
                    <Text style={styles.noImagesText}>No images to display</Text>
                )
            ) : (
                <>
                    <CalendarForm title={itemData.title}/>
                </>
            )}
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
    input: {
        backgroundColor: "#1C1C1E",
        color: "#fff",
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 8,
        fontSize: 16,
        opacity: 0.6,
        height: 52,
    },
    backButton: {
        marginRight: 10,
    },
    profileImage: {
        width: "100%",
        height: 300, // Adjust the height as per your requirement
        resizeMode: "cover",
    },
    profileDetails: {
        padding: 20,
    },
    profileName: {
        fontSize: 35,
        fontWeight: "bold",
        marginBottom: 10,
        color: "#fff",
    },
    profileDescription: {
        fontSize: 16,
        color: "#666",
    },
    loadingIndicator: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    imageContainer: {
        borderRadius: 8,
    },
    masonryListContainer: {
        backgroundColor: "#000",
    },
    calendarContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        marginBottom: 15,
    },
    calendarText: {
        fontSize: 24,
        color: "#fff",
    },
    calendar: {
        marginBottom: 25,
        width: "100%",
    },
    noImagesText: {
        color: "#fff",
        fontSize: 16,
        textAlign: "center",
        marginTop: 20,
    },
});

export default Profile;
