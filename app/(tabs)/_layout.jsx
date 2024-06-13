import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { Tabs } from 'expo-router'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import colors from '../../utils/Colors'


export default class TabLayout extends Component {
    render() {
        return (
            <Tabs screenOptions={{
                tabBarActiveTintColor: colors.PRIMARY,
                headerShown: false
            }}>
                <Tabs.Screen
                    name="index"
                    options={{
                        title: 'Home',
                        tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
                    }}
                />
                <Tabs.Screen
                    name="history"
                    options={{
                        title: 'History',
                        tabBarIcon: ({ color }) => <FontAwesome size={28} name="history" color={color} />,
                    }}
                />
                <Tabs.Screen
                    name="profile"
                    options={{
                        title: 'Profile',
                        tabBarIcon: ({ color }) => <FontAwesome size={28} name="user" color={color} />,
                    }}
                />


            </Tabs >
        )
    }
}
