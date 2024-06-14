import { View, Text, StyleSheet, TextInput, ToastAndroid } from 'react-native'
import React, { useState } from 'react'
import Colors from '../utils/Colors'
import ColorPicker from '../components/ColorPicker'
import { MaterialIcons } from '@expo/vector-icons'
import { Foundation } from '@expo/vector-icons'
import { TouchableOpacity } from 'react-native'
import { supabase } from '../utils/SupabaseConfig'
import { client } from '../utils/KindeConfig'
import { useRouter } from 'expo-router'

export default function AddNewCategory() {
    const [selectedIcon, setSelectedIcon] = useState('IC')
    const [selectedColor, setSelectedColor] = useState(Colors.PRIMARY)
    const [categoryName, setCategoryName] = useState()
    const [totalBudget, setTotalBudget] = useState()

    const router = useRouter()
    const onCreateCategory = async () => {
        const user = await client.getUserDetails()
        const { data, error } = await supabase.from('Category')
            .insert([{
                name: categoryName,
                assigned_budget: totalBudget,
                icon: selectedIcon,
                color: selectedColor,
                created_by: user.email,

            }]).select()

        console.log(data)
        if (data) {
            router.replace({
                pathname: '/category-details',
                params: {
                    categoryId: data[0].id

                }
            })
            ToastAndroid.show('Category Created', ToastAndroid.SHORT)
        }
    }


    return (
        <View style={{ marginTop: 20, padding: 20 }}>
            <View style={
                styles.container
            }>
                <TextInput
                    style={[styles.iconInput, { backgroundColor: selectedColor }]}
                    maxLength={2}
                    onChangeText={(value) => setSelectedIcon(value)}

                > {selectedIcon}</TextInput>
                <ColorPicker
                    selectedColor={selectedColor}
                    setSelectedColor={(color) => setSelectedColor(color)}
                />
            </View>
            {/* Add Category Name and Total Budget Section */}
            <View style={styles.inputView}>
                <MaterialIcons name="local-offer" size={24} color={Colors.GRAY} />
                <TextInput style={{ width: '100%', fontSize: 17 }} placeholder='Category Name'
                    onChangeText={(v) => setCategoryName(v)} />
            </View>

            <View style={styles.inputView}>
                <Foundation name="dollar" size={24} color={Colors.GRAY} />
                <TextInput
                    style={{ width: '100%', fontSize: 17 }}
                    placeholder='Total Budget'
                    keyboardType='numeric'
                    onChangeText={(v) => setTotalBudget(v)}


                />
            </View>

            <TouchableOpacity style={styles.button} disabled={!categoryName || !totalBudget} onPress={() => onCreateCategory()}>
                <Text style={{
                    textAlign: 'center',
                    fontSize: 16,
                    color: Colors.WHITE
                }}>Create</Text>

            </TouchableOpacity>

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
    },
    inputView: {
        borderWidth: 1,
        displayy: 'flex',
        flexDirection: 'row',
        gap: 5,
        padding: 15,
        borderRadius: 10,
        borderColor: Colors.GRAY,
        backgroundColor: Colors.WHITE,
        alignItems: 'center',
        marginTop: 20,


    },
    button: {
        backgroundColor: Colors.PRIMARY,
        padding: 15,
        borderRadius: 15,
        marginTop: 30,

    },
})