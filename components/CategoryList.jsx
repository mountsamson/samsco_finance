import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import Colors from '../utils/Colors'
import { useRouter } from 'expo-router'

export default function CategoryList({ categoryList }) {

    const router = useRouter()
    const onCategoryClick = (category) => {
        router.push({
            pathname: '/category-details',
            params: {
                categoryId: category.id
            }
        })

    }
    return (
        <View style={{
            marginTop: 20,



        }}>
            <Text style={{
                fontFamily: 'outfit-bold',
                fontSize: 25,
                marginBottom: 10


            }}>Latest Budget</Text>
            <View>
                {categoryList && categoryList?.map((category, index) => (
                    <TouchableOpacity key={index} style={styles.container}
                        onPress={() => onCategoryClick(category)} >
                        <View style={styles.iconContainer}>
                            <Text style={[styles.iconText, { backgroundColor: category?.color }]} >
                                {category.icon}
                            </Text>
                        </View>
                        <View style={styles.subContainer}>
                            <View>
                                <Text style={styles.categoryText}>{category.name}</Text>
                                <Text style={styles.itemCount}>{category.CategoryItems?.length} Items</Text>
                            </View>
                        </View>
                        <Text style={styles.totalAmountText}>$5000</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    iconContainer: {
        justifyContent: 'center',
        alignItems: 'baseline',



    },
    iconText: {
        fontSize: 35,
        padding: 16,
        borderRadius: 16,

    },
    container: {
        marginBottom: 10,
        display: 'flex',
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
        backgroundColor: Colors.WHITE,
        padding: 10,
        borderRadius: 15
    },
    categoryText: {
        fontSize: 20,
        fontFamily: 'outfit-bold',
    },

    textCount: {
        fontFamily: 'outfit',

    },
    subContainer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: "60%",


    },

    totalAmountText: {
        fontFamily: 'outfit-bold',
        fontSize: 20,
        color: 'green',

    }
})