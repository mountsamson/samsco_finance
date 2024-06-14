import { View, Text, StyleSheet, Button, ActivityIndicator, RefreshControl, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import { Link, useRouter } from 'expo-router'
import services from './../../utils/services'
import { client } from '../../utils/KindeConfig'
import { supabase } from '../../utils/SupabaseConfig'
import Header from '../../components/Header'
import colors from '../../utils/Colors'
import PieChartGraph from '../../components/PieChartGraph'
import { Ionicons } from '@expo/vector-icons'
import CategoryList from '../../components/CategoryList'
import { useState } from 'react'
import { ScrollView } from 'react-native'

export default function Home() {

  const router = useRouter()
  const [categoryList, setCategoryList] = useState()
  const [loading, setLoading] = useState(false)
  // check user if already authenitcated
  useEffect(() => {

    checkUserAuth()
    getCategoryList()
  }, [])



  const checkUserAuth = async () => {
    const result = await services.getData('login')
    if (result !== 'true') {
      router.replace('/login')


    }



  }
  const handleLogout = async () => {
    const loggedOut = await client.logout();
    if (loggedOut) {
      await services.storeData('login', 'false')
      router.replace('/login')
      // User was authenticated
    };
  }

  const getCategoryList = async () => {
    setLoading(true)
    const user = await client.getUserDetails()
    const { data, error } = await supabase.from('Category')
      .select("*, CategoryItems(*)")
      .eq('created_by', user.email)

    console.log("Data", data)
    setCategoryList(data);
    data && setLoading(false)
  }
  return (


    <View style={{
      marginTop: 20,
      flex: 1,

    }}>
      <ScrollView refreshControl={<RefreshControl
        onRefresh={() => getCategoryList()}
        refreshing={loading}
      />}>
        <View style={styles.container} >



          <Header />
        </View>
        <View style={{
          padding: 20,
          marginTop: -76
        }}>
          <PieChartGraph />
          <CategoryList categoryList={categoryList} />
        </View>



      </ScrollView>
      <TouchableOpacity style={styles.addBtnContainer} onPress={() => router.push('/add-new-category')}>
        <Ionicons name="add-circle" size={64} color={colors.PRIMARY} />


      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({

  container: {

    padding: 20,
    backgroundColor: colors.PRIMARY,
    height: 150,

  },
  addBtnContainer: {
    position: 'absolute',
    bottom: 16,
    right: 16,


  }
})