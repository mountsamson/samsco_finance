import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { Tabs } from 'expo-router'
import FontAwesome from '@expo/vector-icons/FontAwesome'


export default class TabLayout extends Component {
    render() {
        return (
            <Tabs>
                <Tabs.Screen
                    name="index"
                    options={{
                        title: 'Home',
                        tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
                    }}
                />

            </Tabs>
        )
    }
}
