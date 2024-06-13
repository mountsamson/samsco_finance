import { View, Text, StyleSheet, TextInput } from 'react-native'
import React, { useState } from 'react'
import Colors from '../utils/Colors'
import ColorPicker from '../components/ColorPicker'

export default function AddNewCategory() {
    const [selectedIcon, setSelectedIcon] = useState('IC')
    const [selectedColor, setSelectedColor] = useState(Colors.PRIMARY)
    return (
        <View style={{ marginTop: 20, padding: 20 }}>
            <View style={
                styles.container
            }>
                <TextInput
                    style={[styles.iconInput, { backgroundColor: selectedColor }]}
                    maxLength={2}
                > {selectedIcon}</TextInput>
                <ColorPicker />
            </View>

        </View >
    )
}

const styles = StyleSheet.create({
    iconInput: {
        textAlign: 'center',
        fontSize: 30,
        padding: 20,
        borderRadius: 99,
        paddingHorizontal: 28,
        color: Colors.WHITE,

    },
    container: {
        justifyContent: "center",
        alignItems: 'center',
    }
})