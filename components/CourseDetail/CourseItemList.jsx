import { View, Text, StyleSheet, Image, TouchableOpacity, ToastAndroid } from 'react-native'
import React, { useState } from 'react'
import Colors from '../../utils/Colors'
import { EvilIcons } from '@expo/vector-icons'
import { supabase } from '../../utils/SupabaseConfig'
import { Linking } from 'react-native';

export default function CourseItemList({ categoryData, setUpdateRecord }) {
    const [expandItem, setExpandItem] = useState()

    const onDeleteItem = async (id) => {
        const { error } = await supabase.from('CategoryItems')
            .delete()
            .eq('id', id)

        ToastAndroid.show('Item Deleted!', ToastAndroid.SHORT)
        setUpdateRecord(true)
    }

    const openURL = (url) => {
        if (url) {
            Linking.openURL(url)
        }

    }

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Item List</Text>
            <View style={{ marginTop: 15 }}>
                {categoryData?.CategoryItems?.length > 0 ? categoryData?.CategoryItems?.map((item, index) => (
                    <>
                        <TouchableOpacity key={index} style={styles.itemContainer} onPress={() => setExpandItem(index)} >

                            <Image source={{ uri: item.image }} style={styles.image} />
                            <View style={{ flex: 1 }}>
                                <Text style={styles.name} >{item.name}</Text>
                                <Text style={styles.url} numberOfLines={2}>{item.url}</Text>
                            </View>
                            <Text style={styles.cost}>${item.cost}</Text>
                        </TouchableOpacity>
                        {expandItem == index &&
                            <View style={styles.actionItemContainer}>
                                <TouchableOpacity onPress={() => onDeleteItem(item.id)}>
                                    <EvilIcons name="trash" size={34} color="red" />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => openURL(item.url)}>
                                    <EvilIcons name="external-link" size={34} color="blue" />
                                </TouchableOpacity>
                            </View >
                        }
                        {categoryData?.CategoryItems.length - 1 != index &&
                            < View style={{ borderWidth: 0.5, marginTop: 10, borderColor: Colors.GRAY }}></View >
                        }
                    </>

                )) :

                    <Text style={styles.noitemtext}>No Item Found</Text>

                }

            </View>
        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 20,

    },
    heading: {
        fontFamily: 'outfit-bold',
        fontSize: 20

    },
    image: {
        width: 90,
        height: 90,
        borderRadius: 15

    },
    itemContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10
    },
    name: {
        fontFamily: 'outfit-bold',
        fontSize: 20

    },
    url: {
        fontFamily: 'outfit',
        color: Colors.GRAY

    },
    cost: {
        fontSize: 20,
        fontFamily: 'outfit-bold',

    },
    noitemtext: {
        fontSize: 25,
        fontFamily: 'outfit-bold',
        color: Colors.GRAY
    },
    actionItemContainer: {
        display: "flex",
        flexDirection: 'row',
        gap: 10,
        justifyContent: 'flex-end',



    }

})