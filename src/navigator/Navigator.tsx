import { createStackNavigator } from '@react-navigation/stack';
import { LoginScreen } from '../screen/LoginScreen';
import { RegisterScreen } from '../screen/RegisterScreen';
import { ProtectedScreen } from '../screen/ProtectedScreen';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { ProductsNavigator } from './ProductsNavigator';

const Stack = createStackNavigator();

export const Navigator = () => {

    const { status } = useContext(AuthContext)

    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                cardStyle: {
                    backgroundColor: 'white'
                }
            }}
        >
            {
                (status === 'authenticated')
                    ? (
                        <>
                            <Stack.Screen name="ProductsNavigator" component={ProductsNavigator} />
                            <Stack.Screen name="ProtectedScreen" component={ProtectedScreen} />
                        </>
                    )
                    : (
                        <>
                            <Stack.Screen name="LoginScreen" component={LoginScreen} />
                            <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
                        </>

                    )
            }

        </Stack.Navigator>
    );
}