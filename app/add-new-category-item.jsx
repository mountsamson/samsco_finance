import { View, Text, StyleSheet, Image, TextInput, ScrollView, KeyboardAvoidingView, ToastAndroid, Alert, ActivityIndicator } from 'react-native'
import React from 'react'
import Colors from '../utils/Colors'
import { supabase } from '../utils/SupabaseConfig'
import { useState, useEffect } from 'react'
import Ionicons from '@expo/vector-icons/Ionicons'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import { TouchableOpacity } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import { decode } from 'base64-arraybuffer'
import { useLocalSearchParams, useRouter } from 'expo-router'

const placeholder = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVYS7KEXYFAwqdRCW81e4DSR_nSLYSFStx1Q&s'

export default function AddNewCategoryItem() {
    const { categoryId } = useLocalSearchParams()
    const [image, setImage] = useState(placeholder)
    const [previeImage, setPreviewImage] = useState(placeholder)
    const [name, setName] = useState('')
    const [url, setUrl] = useState('')
    const [cost, setCost] = useState('')
    const [note, setNote] = useState('')
    const router = useRouter()
    const [loading, setLoading] = useState(false)


    useEffect(() => {
        if (!categoryId) {
            Alert.alert('Category ID is missing');
        } else {
            Alert.alert('Category ID set')
        }
    }, [categoryId]);

    const onImagePick = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: false,
            base64: true,
            quality: 0.7,
        })


        if (!result.canceled) {
            setPreviewImage(result.assets[0].uri)
            setImage(result.assets[0].base64)
        }

    }

    const onClickAdd = async () => {
        setLoading(true)
        const fileName = Date.now()
        const { data, error } = await supabase
            .storage
            .from('Images')
            .upload(fileName + '.png', decode(image), {
                contentType: 'image/png'

            });
        if (data) {
            const fileUrl = "https://svjjbvtvfywsfeupwryw.supabase.co/storage/v1/object/public/Images/" + fileName + ".png";

            console.log(fileUrl)
            const { data, error } = await supabase
                .from('CategoryItems')
                .insert([{
                    name: name,
                    cost: cost,
                    url: url,
                    image: fileUrl,
                    note: note,
                    category_id: categoryId,
                }]).select();

            console.log(data)
            ToastAndroid.show('New Item Added!!!', ToastAndroid.SHORT)
            router.replace({
                pathname: '/category-details',
                params: {
                    categoryId: categoryId
                }
            })


        }



    }
    return (
        <KeyboardAvoidingView>

            <ScrollView style={{ padding: 20, backgroundColor: Colors.WHITE }}>
                <TouchableOpacity onPress={() => onImagePick()}>
                    <Image source={{ uri: previeImage }} style={styles.image} />
                </TouchableOpacity>

                <View style={styles.textInputContainer}>
                    <Ionicons name="pricetag" size={24} color={Colors.GRAY} />
                    <TextInput
                        placeholder="Item Name"
                        style={styles.input}
                        onChangeText={(value) => setName(value)}
                    />
                </View>
                <View style={styles.textInputContainer}>
                    <FontAwesome name="dollar" size={24} color={Colors.GRAY} />
                    <TextInput
                        placeholder="Cost"
                        style={styles.input}
                        keyboardType='number-pad'
                        onChangeText={(value) => setCost(value)}
                    />
                </View>
                <View style={styles.textInputContainer}>
                    <Ionicons name="link" size={24} color={Colors.GRAY} />
                    <TextInput placeholder="Url" style={styles.input} onChangeText={(value) => setUrl(value)} />
                </View>
                <View style={styles.textInputContainer}>
                    <Ionicons name="pencil" size={24} color={Colors.GRAY} />
                    <TextInput placeholder="Note" style={styles.input} numberOfLines={3} onChangeText={(value) => setNote(value)} />
                </View>
                <TouchableOpacity style={styles.button}
                    disabled={!name || !cost || loading}
                    onPress={() => onClickAdd()}
                >
                    {loading ?
                        <ActivityIndicator color={Colors.WHITE} /> :
                        <Text style={{ textAlign: 'center', fontFamily: 'outfit-bold', color: Colors.WHITE }}>Add</Text>
                    }

                </TouchableOpacity>

            </ScrollView>
        </KeyboardAvoidingView>



    )
}

const styles = StyleSheet.create({
    image: {
        width: 150,
        height: 150,
        borderRadius: 15,
        backgroundColor: Colors.GRAY,
    },
    textInputContainer: {
        padding: 17,
        borderWidth: 1,
        display: 'flex',
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
        borderRadius: 10,
        borderColor: Colors.GRAY,
        marginTop: 10

    },
    input: {
        fontSize: 17,
        width: "100%"
    },
    button: {
        padding: 20,
        backgroundColor: Colors.PRIMARY,
        borderRadius: 99,
        marginTop: 25


    }
})