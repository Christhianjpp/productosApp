import React from 'react'
import { View, Text, StyleSheet, Button } from 'react-native';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export const ProtectedScreen = () => {

    const { logOut, user, token } = useContext(AuthContext)


    return (
        <View style={styles.container}>
            <Text style={styles.title}>Protected Screen</Text>

            <Button
                title='logout'
                color='#5856D6'
                onPress={logOut}
            />

            <Text>{JSON.stringify(user, null, 6)}</Text>
            <Text>{JSON.stringify(token, null, 6)}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        marginBottom: 20,
    }
})