import React from "react";
import { TouchableOpacity, Image, StyleSheet } from "react-native";

const Logo = ({navigation}) => {
    const navigateToHome = () => {
        navigation.navigate("Home");
    }
    return(
        <TouchableOpacity onPress={navigateToHome}>
        <Image
            source={require('@/assets/3.png')}
            style={styles.headerLogo}
        />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    headerLogo: {
        width: 80,
        height: 80,
        borderRadius: 50,
    },
})
export default Logo;