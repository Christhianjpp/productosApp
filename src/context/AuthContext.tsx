import React, { createContext, useEffect, useReducer } from "react"
import cafeApi from '../api/cafeApi';
import { Usuario, LoginResponse, LoginData, RegisterData } from '../interfaces/appInterfaces';
import { authReducer, AuthState } from './authReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';


type AuthContextProps = {
    errorMessage: string;
    token: string | null;
    user: Usuario | null;
    status: 'cheking' | 'authenticated' | 'not-authenticated';
    singIn: (loginData: LoginData) => void;
    singUp: (obj: RegisterData) => void;
    logOut: () => void;
    removeError: () => void;
}

const authInicialState: AuthState = {
    status: 'cheking',
    token: null,
    user: null,
    errorMessage: ''
}

export const AuthContext = createContext({} as AuthContextProps)

export const AuthProvider = ({ children }: any) => {


    const [state, dispatch] = useReducer(authReducer, authInicialState)


    useEffect(() => {
        checkToken()
    }, [])

    const checkToken = async () => {

        const token = await AsyncStorage.getItem('token')

        // No token; no autenticado 
        if (!token) return dispatch({ type: 'notAuthenticated' })

        // Hay token

        const resp = await cafeApi.get('/auth')

        if (resp.status !== 200) {
            return dispatch({ type: 'notAuthenticated' })
        }

        await AsyncStorage.setItem('token', resp.data.token)

        dispatch({
            type: 'signUp',
            payload: {
                token: resp.data.token,
                user: resp.data.usuario
            }
        })


    }

    const singIn = async ({ correo, password }: LoginData) => {
        try {
            const { data } = await cafeApi.post<LoginResponse>('/auth/login', { correo, password })
            dispatch({
                type: 'signUp',
                payload: {
                    token: data.token,
                    user: data.usuario
                }
            })
            await AsyncStorage.setItem('token', data.token)

        } catch (error: any) {

            console.log('error', error.response.data.msg || 'Información incorrecta')
            dispatch({
                type: 'addError',
                payload: error.response.data.msg || 'Información incorrecta'
            })
        }
    }

    const singUp = async ({ correo, nombre, password }: RegisterData) => {
        try {
            const { data } = await cafeApi.post<LoginResponse>('usuarios', { nombre, correo, password })
            dispatch({
                type: 'signUp',
                payload: {
                    token: data.token,
                    user: data.usuario
                }
            })
            await AsyncStorage.setItem('token', data.token)


        } catch (error: any) {
            console.log('error', error.response.data.errors[0].msg || 'Información incorrecta')
            dispatch({
                type: 'addError',
                payload: error.response.data.errors[0].msg || 'Información incorrecta'
            })

        }


    }
    const logOut = async () => {
        console.log('logOut')
        await AsyncStorage.removeItem('token')
        dispatch({ type: 'logout' })
    }
    const removeError = () => {
        dispatch({ type: 'removeError' })
    }

    return (
        <AuthContext.Provider value={{
            ...state,
            singIn,
            singUp,
            logOut,
            removeError,

        }}>
            {children}
        </AuthContext.Provider>
    )
}