import { View, Text, StyleSheet, Button } from 'react-native'
import React, { useEffect } from 'react'
import { Link, useRouter } from 'expo-router'
import services from '../utils/services'

export default function Home() {

  const router = useRouter()
  // check user if already authenitcated
  useEffect(() => {

    checkUserAuth()
  }, [])



  const checkUserAuth = async () => {
    const result = await services.getData('login')
    if (result !== 'true') {
      router.replace('/login')


    }
  }

  return (



    <View style={styles.container} >
      <Text style={styles.text}>Home</Text>


    </View>

  )
}

const styles = StyleSheet.create({
  text: {
    fontSize: 20
  },
  container: {
    marginTop: 20
  }
})