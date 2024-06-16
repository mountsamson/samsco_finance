import { View, Text, StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import { Ionicons } from '@expo/vector-icons'
import Colors from '../../utils/Colors'
import { useState } from 'react'


export default function CourseInfo({ categoryData }) {
    const [totalCost, setTotalCost] = useState()
    const [percentageTotal, setPercentageTotal] = useState()


    useEffect(() => {
        categoryData && calculateTotalPercentage()
    }, [categoryData])
    const calculateTotalPercentage = () => {
        let total = 0
        categoryData.CategoryItems?.forEach(item => {
            total += item.cost
        })
        setTotalCost(total)
        const percentage = (total / categoryData.assigned_budget) * 100
        setPercentageTotal(percentage)

    }

    return (
        <View>
            <View style={styles.container}>
                <View style={styles.iconContainer}>
                    <Text style={[styles.textIcon,
                    {
                        backgroundColor: categoryData.color

                    }]} >{categoryData.icon}</Text>
                </View>
                <View style={{ flex: 1, marginLeft: 20 }}>
                    <Text style={styles.categoryName}>{categoryData?.name}</Text>
                    <Text style={styles.categoryItemText}>{categoryData?.CategoryItems?.length} Item</Text>

                </View>
                <Ionicons name="trash" size={24} color="red" />
            </View>
            {/* Progress Bar */}
            <View style={styles.amountContainer}>
                <Text style={{ fontFamily: 'outfit-bold ' }}>${totalCost}</Text>
                <Text style={{ fontFamily: 'outfit' }}>Total Budget: ${categoryData.assigned_budget}</Text>
            </View>
            <View style={styles.progressBarMainContainer}>
                <View style={[styles.progressBarSubContainer, { width: percentageTotal + '%' }]}></View>

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',

    },
    textIcon: {
        fontSize: 20,
        padding: 20,
        borderRadius: 13
    },
    iconContainer: {
        justifyContent: 'center',
        alignItems: 'baseline'
    },
    categoryName: {
        fontFamily: 'outfit-bold',
        fontSize: 24

    },

    categoryItemText: {
        fontFamily: 'outfit',
        fontSize: 16,


    },
    amountContainer: {
        display: "flex",
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginTop: 15


    },
    progressBarMainContainer: {
        width: '100%',
        height: 15,
        backgroundColor: Colors.GRAY,
        borderRadius: 99,
        marginTop: 8

    },
    progressBarSubContainer: {
        width: '40%',
        backgroundColor: Colors.PRIMARY,
        borderRadius: 99,
        height: 15

    },

})