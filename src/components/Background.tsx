import React from 'react'
import { View } from 'react-native';

export const Background = () => {
    return (
        <View
            style={{
                position: 'absolute',
                backgroundColor: '#5856D6',
                top: -250,
                width: 850,
                height: 1000,
                transform: [
                    { rotate: '-60deg' }
                ]
            }}
        />
    )
}
