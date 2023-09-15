import React, { useState, useEffect } from 'react'
import {Box, Button} from 'native-base'
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import ControlCard from '../components/ControlCard/controlCard'
import {MaterialIcons} from '@expo/vector-icons'
import useWebApi from "@/hooks/useWebApi";
import {useToast} from "@/hooks/useToast";
import Logo from '@/components/Logo';
import {useForm, FormProvider} from "react-hook-form";

const VALUE_TO_VALIDATE = 700

export default function Transfer({navigation}) {
    const {user} = useWebApi();
    const toast = useToast()

    const [VALUE_TO_VALIDATE, setValueToValidate] = useState(null); // State to hold the dynamic value

    const formMethods = useForm({
        defaultValues: {
            weight: 0
        }
    })

    useEffect(() => {
      fetch('http://164.92.74.136/api/codigos-del-mes/1')
        .then((response) => response.json())
        .then((data) => {
          setValueToValidate(data.data.attributes.codigo);
        })
        .catch((error) => {
          console.error('Error fetching value:', error);
        });
    }, []);


    const handleSubmit = (data) => {
        if (!user.mediaUser) {
            toast.error('Usuario invalido', 'No tienes los permisos para ejecutar esta accion');
            return;
        }
        if (data.weight === VALUE_TO_VALIDATE) {
            return navigation.navigate('Catalog')
        }

        toast.error('Saldo insuficiente', 'No tienes suficientes fondos en tu cuenta');
    }

    return (
        <FormProvider {...formMethods}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                        <MaterialIcons name="arrow-back" size={24} color="white"/>
                    </TouchableOpacity>
                    <Logo navigation={navigation}/>
                    <TouchableOpacity>
                  </TouchableOpacity>
                </View>
                <Box flex={1} backgroundColor={"#000"}>
                    <Box flex={1} px="3" py="1" justifyContent={"space-evenly"}>
                        <ControlCard
                            title="Log In Key"
                            minimumValue={10}
                            maximumValue={999}
                            step={1}
                            name="weight"
                            decimalPlaces={0}
                            onValueChange={e => console.log(e)}
                        />
                        <View style={{alignItems: 'center'}}>
                            <Text style={{fontSize: 16, color: '#fff'}}>Exclusividad al alcance de tus dedos:</Text>
                            <Text style={{fontSize: 12, color: '#fff', opacity: 0.6}}>Servicios / Networking /
                                Privacidad</Text>
                            <Logo navigation={navigation}/>
                        </View>

                        <Button
                            variant="primary"
                            onPress={formMethods.handleSubmit(handleSubmit, console.log)}
                        >
                            SIGUIENTE
                        </Button>
                    </Box>
                </Box>
            </View>
        </FormProvider>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        paddingTop: 0
    },
    header: {
        flexDirection: 'row',
        paddingTop: 30,
        paddingHorizontal: 14,
        alignItems: 'center',
        justifyContent: 'space-between',
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
