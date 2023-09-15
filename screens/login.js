import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {FormProvider, useForm} from "react-hook-form";
import InputField from "@/components/Forms/InputField";
import useWebApi from "@/hooks/useWebApi";
import {Button} from "native-base";

const Login = () => {
    const {auth, isLoading} = useWebApi()
    const formMethods = useForm({
        defaultValues: {
            identifier: "",
            password: ""
        }
    })

    const handleSubmit = async (values) => {
        return await auth.login(values)
    }

    const {formState: {isSubmitting}} = formMethods

    return (
        <FormProvider {...formMethods}>
            <View style={styles.containerView} behavior="padding">
                <View style={styles.loginScreenContainer}>
                    <View style={styles.loginFormView}>
                        <Image
                            source={require('@/assets/3.png')}
                            style={styles.logoImage}
                            resizeMode="contain"
                        />
                        <Text style={styles.logoText}>Entrar</Text>
                        <InputField name={"identifier"} hasIcon={false} bg="white" placeholder="Correo"/>
                        <InputField name={"password"} type="password" mt={2} hasIcon={false} bg="white"
                                    placeholder="Contraseña"/>

                        <Button variant="primary" isLoading={isLoading || isSubmitting} mt={6}

                                onPress={formMethods.handleSubmit(handleSubmit)}>
                            SIGUIENTE
                        </Button>
                    </View>
                </View>
            </View>
        </FormProvider>
    );
};

export default Login;

const styles = StyleSheet.create({
    containerView: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#000',
    },
    loginScreenContainer: {
        flex: 1,
        width: '80%', // Make loginFormView 80% of the screen
    },
    logoText: {
        fontSize: 40,
        fontWeight: '400',
        marginBottom: 30,
        color: '#FFF',
    },
    loginFormView: {
        flex: 1,
    },
    inputContainer: {
        width: '80%', // Make input container 80% of the screen
        marginBottom: 10,
    },
    logoImage: {
        width: 82, // Set the width of your logo image
        height: 82, // Set the height of your logo image
        marginBottom: 10,
        marginTop: 50,
    },
    loginFormTextInput: {
        width: '100%', // Make loginFormTextInput 100% of the container width
        height: 52,
        fontSize: 14,
        borderRadius: 5,
        backgroundColor: '#fafafa',
        paddingLeft: 10,
        marginTop: 5,
        marginBottom: 5,
    },
    loginButton: {
        backgroundColor: '#fafafa', // Set the background color to "#FFF"
        borderRadius: 5,
        marginTop: 25,
        height: 52,
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
