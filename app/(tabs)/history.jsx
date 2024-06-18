import { Text, View, StyleSheet, ScrollView, RefreshControl, TouchableOpacity } from 'react-native'
import { useState, useEffect } from 'react'
import { router } from 'expo-router'
import CourseItemList from '../../components/CourseDetail/CourseItemList'
import { client } from '../../utils/KindeConfig'

export default function History({ categoryData }) {

    const [categoryList, setCategoryList] = useState()
    const [loading, setLoading] = useState(false)
    // check user if already authenitcated
    useEffect(() => {


        getCategoryList()
    }, [])

    const historyData = async () => {
        const { data, error } = await supabase
            .from('CategoryItems')
            .select('*')
    }

    const getCategoryList = async () => {
        setLoading(true)
        const user = await client.getUserDetails()
        const { data, error } = await supabase
            .from('CategoryItems')
            .select('*')

        console.log("Data", data)
        setCategoryList(data);
        data && setLoading(false)

    }





    return (

        <View style={styles.container}>
            <ScrollView refreshControl={<RefreshControl
                onRefresh={() => getCategoryList()}
                refreshing={loading}
            />}>
                <TouchableOpacity >
                    <CourseItemList categoryData={historyData} />
                </TouchableOpacity>
            </ScrollView>
        </View>


    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        paddingTop: 100

    },
})
