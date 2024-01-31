import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import { ProductScreen } from '../screen/ProductScreen'
import { ProductsScreen } from '../screen/ProductsScreen'


export type ProductsStackParams = {
    ProductsScreen: undefined,
    ProductScreen: { id?: string, name?: string }
}


const Stack = createStackNavigator<ProductsStackParams>()

export const ProductsNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                cardStyle: {
                    backgroundColor: 'white'
                },
                headerStyle: {
                    elevation: 0,
                    shadowColor: 'transparent'
                }
            }}
        >
            <Stack.Screen name="ProductsScreen" options={{ title: 'Products' }} component={ProductsScreen} />
            <Stack.Screen name="ProductScreen" component={ProductScreen} />
        </Stack.Navigator>
    )
}
