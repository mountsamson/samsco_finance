import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import logo from './../../assets/logo.png'

import colors from '../../utils/colors'
import { Colors } from 'react-native/Libraries/NewAppScreen'

export default function LoginScreen() {
    return (
        <View style={styles.container}>
            <Image source={logo} style={styles.bgImage} />
            <View style={styles.titleContainer}>
                <Text style={styles.title}>Personal AI Budget Planner</Text>

                <Text style={styles.description}>Stay on Track with your budget using our AI-powered app with effortless financial management.</Text>
                <TouchableOpacity style={styles.button} >
                    <Text style={{ textAlign: 'center', color: Colors.PRIMARY }}>Login/Signup</Text>
                </TouchableOpacity>
                <Text style={styles.terms}>* By login/signup you will agree to your terms and conditions</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    bgImage: {


        width: 400,
        height: 400,
        marginTop: 80,
        borderWidth: 5,
        borderRadius: 20,
        borderColor: colors.BLACK,
    },
    container: {
        display: "flex",
        alignItems: 'center',

    },

    titleContainer: {
        backgroundColor: colors.PRIMARY,
        width: '100%',
        height: '100%',
        padding: 30,
        marginTop: -10,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,

    },

    title: {

        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center',
        color: colors.WHITE,

    },
    description: {
        fontSize: 18,
        textAlign: 'center',
        color: colors.WHITE,
        marginTop: 20,

    },
    button: {
        backgroundColor: colors.WHITE,
        padding: 15,
        paddingHorizontal: 5,
        borderRadius: 100,
        marginTop: 30

    },

    terms: {
        fontSize: 15,
        marginTop: 10,
        fontSize: 13,
        color: colors.GRAY,
        textAlign: 'center'


    },
})