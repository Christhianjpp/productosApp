import React, { useContext, useEffect } from 'react'
import { View, Text, TextInput, Platform, KeyboardAvoidingView, Keyboard, TouchableOpacity, Alert } from 'react-native';
import { Background } from '../components/Background';
import { WhiteLogo } from '../components/WhiteLogo';
import { loginStyles } from '../theme/loginTheme';
import { useForm } from '../hooks/useForm';
import { StackScreenProps } from '@react-navigation/stack';
import { AuthContext } from '../context/AuthContext';


interface Props extends StackScreenProps<any, any> { }

export const LoginScreen = ({ navigation }: Props) => {

    const { singIn, errorMessage, removeError } = useContext(AuthContext)


    const { email, password, onChange } = useForm({
        email: 'test1@test.com',
        password: ''
    })

    useEffect(() => {
        if (errorMessage.length === 0) return

        Alert.alert('Login incorrecto', errorMessage, [{
            text: 'Ok', onPress: removeError
        }])

    }, [errorMessage])

    const onLogin = () => {
        singIn({ correo: email, password })
        console.log({ email, password })
        Keyboard.dismiss()
    }

    return (
        <>
            {/* Background */}
            <Background />


            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={(Platform.OS === 'ios') ? 'padding' : 'height'}
            >


                <View style={loginStyles.formContainer}>


                    {/* Keyboard avoid view */}
                    <WhiteLogo />


                    <Text style={loginStyles.title}>Login</Text>
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
                        onSubmitEditing={onLogin}

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
                        onSubmitEditing={onLogin}

                        autoCapitalize='none'
                        autoCorrect={false}
                    />

                    {/* Boton login */}
                    <View style={loginStyles.buttonContainer}>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            style={loginStyles.button}
                            onPress={onLogin}
                        >
                            <Text style={loginStyles.buttonText}>Login</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Crear una nueva cuenta  */}
                    <View style={loginStyles.newUserContainer}>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={() => navigation.replace('RegisterScreen')}

                        >
                            <Text style={loginStyles.buttonText}>Nueva Cuenta</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </KeyboardAvoidingView>

        </>
    )
}
