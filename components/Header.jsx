import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import Colors from '../utils/Colors'
import { Ionicons } from '@expo/vector-icons'
import { client } from '../utils/KindeConfig'

export default function Header() {
    const [user, setUser] = useState()

    useEffect(() => {
        getUserData()
    }, [])

    //used to get user data


    const getUserData = async () => {
        const user = await client.getUserDetails()
        setUser(user)
    }

    const handleLogout = async () => {
        const loggedOut = await client.logout();
        if (loggedOut) {
            await services.storeData('login', 'false')
            router.replace('/login')
            // User was authenticated
        }


    }
    return (
        <View style={{
            display: "flex",
            flexDirection: 'row',
            gap: 8,

        }}>
            <Image source={{ uri: user?.picture }}
                style={{
                    width: 50,
                    height: 50,
                    borderRadius: 99,

                }} />
            <View style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '85%'
            }}>
                <View>
                    <Text style={{ color: Colors.WHITE, fontSize: 16, fontFamily: 'outfit' }}>Welcome</Text>
                    <Text style={{ color: Colors.WHITE, fontSize: 20, fontFamily: 'outfit' }}> {user?.given_name} </Text>
                    <Text style={{ color: Colors.WHITE, fontSize: 20, fontFamily: 'outfit-bold', marginTop: 5 }}> SamsCo AI Finance</Text>
                </View>
                <TouchableOpacity onPress={() => handleLogout}>
                    <Ionicons name="log-out" size={24} color="white" />
                </TouchableOpacity>
            </View>
        </View>
    )
}