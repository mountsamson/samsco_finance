import { View, Text, StyleSheet, Button } from 'react-native'
import React, { useEffect } from 'react'
import { Link, useRouter } from 'expo-router'
import services from './../../utils/services'
import { client } from '../../utils/KindeConfig'
import { supabase } from '../../utils/SupabaseConfig'
import Header from '../../components/Header'
import colors from '../../utils/Colors'
import PieChartGraph from '../../components/PieChartGraph'
import { Ionicons } from '@expo/vector-icons'

export default function Home() {

  const router = useRouter()
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
    const user = await client.getUserDetails()
    const { data, error } = await supabase.from('Category')
      .select("*")
      .eq('created_by', user.email)

    console.log("Data", data)
  }
  return (


    <View style={{
      marginTop: 20,
      flex: 1,

    }}>
      <View style={styles.container} >



        <Header />
        <PieChartGraph />


      </View>
      <Link href={'/add-new-category'} style={styles.addBtnContainer}>
        <Ionicons name="add-circle" size={64} color={colors.PRIMARY} />

      </Link>
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