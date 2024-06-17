import { View, Text, StyleSheet } from 'react-native'
import { useEffect, useState } from 'react'
import PieChart from 'react-native-pie-chart'
import Colors from '../utils/Colors'
import { MaterialCommunityIcons } from '@expo/vector-icons'

export default function PieChartGraph({ categoryList }) {
    const widthAndHeight = 150
    const [values, setValues] = useState([1])
    const [sliceColor, setSliceColor] = useState([Colors.GRAY])

    useEffect(() => {
        categoryList && updatePieChart();
    }, [categoryList])

    const updatePieChart = () => {

        setSliceColor([]);
        setValues([]);

        categoryList.forEach((item, index) => {
            let itemTotalCost = 0;
            item.CategoryItems?.forEach((item_) => {
                itemTotalCost = itemTotalCost + item_.cost

            })
            setSliceColor(sliceColor => [...sliceColor, Colors.COLOR_LIST[index]])
            setValues(values => [...values, item.itemTotalCost])
        })
        console.log(values)

    }

    return (


        < View style={styles.container} >
            <Text style={{
                fontSize: 20,
                fontFamily: 'outfit'
            }}>Total Estimate : <Text style={{ fontFamily: "outfit-bold" }}>0$</Text></Text>
            <View style={styles.subContainer}>
                <PieChart
                    widthAndHeight={widthAndHeight}
                    series={values}
                    sliceColor={sliceColor}
                    coverRadius={0.65}
                    coverFill={'#FFF'}
                />

                {categoryList.length == 0 ? <View style={styles.chartNameContainer}>
                    <MaterialCommunityIcons name='checkbox-blank-circle' size={24} color={Colors.GRAY} />
                    <Text>NA</Text>
                </View>
                    : <View>
                        {categoryList.map((category, index) => (
                            <View key={index} style={styles.chartNameContainer}>
                                <MaterialCommunityIcons name='checkbox-blank-circle' size={24} color={Colors.COLOR_LIST[index]} />
                                <Text>{category.name}</Text>

                            </View>
                        ))}
                    </View>}

            </View>

        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        margin: 20,
        backgroundColor: Colors.WHITE,
        padding: 20,
        borderRadius: 15,
        elevation: 1

    },

    subContainer: {
        marginTop: 10,
        display: 'flex',
        flexDirection: 'row',
        gap: 40
    },
    chartNameContainer: {
        flexDirection: 'row',
        gap: 5,
        alignItems: 'center'
    }
})

