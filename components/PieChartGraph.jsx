import { View, Text, StyleSheet } from 'react-native';
import { useEffect, useState } from 'react';
import PieChart from 'react-native-pie-chart';
import Colors from '../utils/Colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function PieChartGraph({ categoryList }) {
    const widthAndHeight = 150;
    const [values, setValues] = useState([1]);
    const [sliceColor, setSliceColor] = useState([Colors.GRAY]);
    const [totalCalculatedEstimate, setTotalCalculatedEstimate] = useState(0);

    useEffect(() => {
        if (categoryList) {
            updatePieChart();
        }
    }, [categoryList]);

    const updatePieChart = () => {
        let totalEstimate = 0;
        let otherCost = 0;

        setSliceColor([]);
        setValues([]);

        categoryList.forEach((item, index) => {
            if (index < 4) {
                let itemTotalCost = 0;
                item.CategoryItems?.forEach((item_) => {
                    itemTotalCost += item_.cost;
                    totalEstimate += item_.cost;
                });
                setSliceColor((sliceColor) => [...sliceColor, Colors.COLOR_LIST[index]]);
                setValues((values) => [...values, itemTotalCost]);
            } else {
                item.CategoryItems?.forEach((item_) => {
                    otherCost += item_.cost;
                    totalEstimate += item_.cost;
                });
            }
        });

        setTotalCalculatedEstimate(totalEstimate);
        setSliceColor((sliceColor) => [...sliceColor, Colors.COLOR_LIST[4]]);
        setValues((values) => [...values, otherCost]);
    };

    return (
        <View style={styles.container}>
            <Text style={{ fontSize: 20, fontFamily: 'outfit' }}>
                Total Estimate: <Text style={{ fontFamily: 'outfit-bold' }}>${totalCalculatedEstimate}</Text>
            </Text>
            <View style={styles.subContainer}>
                <PieChart
                    widthAndHeight={widthAndHeight}
                    series={values}
                    sliceColor={sliceColor}
                    coverRadius={0.65}
                    coverFill={'#FFF'}
                />
                {categoryList?.length === 0 ? (
                    <View style={styles.chartNameContainer}>
                        <MaterialCommunityIcons name='checkbox-blank-circle' size={24} color={Colors.GRAY} />
                        <Text>NA</Text>
                    </View>
                ) : (
                    <View>
                        {categoryList?.map((category, index) => (
                            <View key={index} style={styles.chartNameContainer}>
                                <MaterialCommunityIcons
                                    name='checkbox-blank-circle'
                                    size={24}
                                    color={index < 4 ? Colors.COLOR_LIST[index] : Colors.COLOR_LIST[4]}
                                />
                                <Text>{index < 4 ? category.name : 'Other'}</Text>
                            </View>
                        ))}
                    </View>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        margin: 20,
        backgroundColor: Colors.WHITE,
        padding: 20,
        borderRadius: 15,
        elevation: 1,
    },
    subContainer: {
        marginTop: 10,
        display: 'flex',
        flexDirection: 'row',
        gap: 40,
    },
    chartNameContainer: {
        flexDirection: 'row',
        gap: 5,
        alignItems: 'center',
    },
});
