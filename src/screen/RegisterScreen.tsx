import React, { useEffect } from 'react'
import { Text, View, KeyboardAvoidingView, Platform, TextInput, Keyboard, Alert, TouchableOpacity } from 'react-native';
import { loginStyles } from '../theme/loginTheme';
import { WhiteLogo } from '../components/WhiteLogo';
import { useForm } from '../hooks/useForm';
import { StackScreenProps } from '@react-navigation/stack';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

interface Props extends StackScreenProps<any, any> { }


export const RegisterScreen = ({ navigation }: Props) => {

    const { singUp, errorMessage, removeError } = useContext(AuthContext)

    const { email, password, name, onChange } = useForm({
        name: 'test 4',
        email: 'testa4@test.com',
        password: '123456'
    })

    const onRegister = () => {
        singUp({
            correo: email,
            password,
            nombre: name
        })
        Keyboard.dismiss()
    }


    useEffect(() => {
        if (errorMessage.length === 0) return
        Alert.alert('Registro incorrecto', errorMessage, [{
            text: 'Ok', onPress: removeError
        }])


    }, [errorMessage])


    return (
        <>

            <KeyboardAvoidingView
                style={{ flex: 1, backgroundColor: "#5856D6" }}
                behavior={(Platform.OS === 'ios') ? 'padding' : 'height'}
            >


                <View style={loginStyles.formContainer}>


                    {/* Keyboard avoid view */}
                    <WhiteLogo />


                    <Text style={loginStyles.title}>Register</Text>
                    <Text style={loginStyles.label}>Nombre</Text>
                    <TextInput
                        placeholder='Ingrese su Email:'
                        placeholderTextColor="rgba(225,225,225,0.4)"
                        keyboardType='email-address'
                        underlineColorAndroid='white'
                        style={[
                            loginStyles.inputFiltd,
                            (Platform.OS === 'ios') && loginStyles.inputFildIOS
                        ]}
                        selectionColor='white'

                        onChangeText={(value) => onChange(value, 'name')}
                        value={name}
                        onSubmitEditing={onRegister}

                        autoCapitalize='words'
                        autoCorrect={false}
                    />
                    <Text style={loginStyles.label}>Email</Text>
                    <TextInput
                        placeholder='Ingrese su Email:'
                        placeholderTextColor="rgba(225,225,225,0.4)"
                        keyboardType='email-address'
                        underlineColorAndroid='white'
                        style={[
                            loginStyles.inputFiltd,
                            (Platform.OS === 'ios') && loginStyles.inputFildIOS
                        ]}
                        selectionColor='white'

                        onChangeText={(value) => onChange(value, 'email')}
                        value={email}
                        onSubmitEditing={onRegister}

                        autoCapitalize='none'
                        autoCorrect={false}
                    />
                    <Text style={loginStyles.label}>Contraseña:</Text>
                    <TextInput
                        placeholder='**********'
                        placeholderTextColor="rgba(225,225,225,0.4)"
                        underlineColorAndroid='white'
                        secureTextEntry
                        style={[
                            loginStyles.inputFiltd,
                            (Platform.OS === 'ios') && loginStyles.inputFildIOS
                        ]}
                        selectionColor='white'

                        //Todo: onchage, value
                        onChangeText={(value) => onChange(value, 'password')}
                        value={password}
                        onSubmitEditing={onRegister}

                        autoCapitalize='none'
                        autoCorrect={false}
                    />

                    {/* Boton login */}
                    <View style={loginStyles.buttonContainer}>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            style={loginStyles.button}
                            onPress={onRegister}
                        >
                            <Text style={loginStyles.buttonText}>Crear cuenta</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Crear una nueva cuenta  */}
                    {/* <View style={loginStyles.newUserContainer}>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={() => navigation.replace('LoginScreen')}

                        >
                            <Text style={loginStyles.buttonText}>Login</Text>
                        </TouchableOpacity>
                    </View> */}
                    <View

                        style={loginStyles.buttonViewReturn}

                    >

                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={() => navigation.replace('LoginScreen')}

                        >
                            <Text style={loginStyles.buttonText}>Login</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAvoidingView>

        </>
    )
}
