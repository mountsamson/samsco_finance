import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { router, useLocalSearchParams } from 'expo-router'
import { useEffect, useState } from 'react'
import CourseInfo from '../components/CourseDetail/CourseInfo'
import { supabase } from '../utils/SupabaseConfig'
import CourseItemList from '../components/CourseDetail/CourseItemList'
import Colors from '../utils/Colors'

export default function CategoryDetails() {
  const { categoryId } = useLocalSearchParams()
  const [categoryData, setCategoryData] = useState([])

  useEffect(() => {
    console.log(categoryId)
    categoryId && getCategoryDetail()
  }, [categoryId])

  const getCategoryDetail = async () => {
    const { data, error } = await supabase.from('Category')
      .select('*, CategoryItems(*)')
      .eq('id', categoryId)
    setCategoryData(data[0])

    console.log("Cat: " + data)
  }

  return (
    <View style={{ padding: 20, marginTop: 20, flex: 1, backgroundColor: Colors.WHITE }}>
      <TouchableOpacity onPress={() => router.back()}>
        <Ionicons name="arrow-back-circle" size={44} color="black" />
      </TouchableOpacity>
      <CourseInfo categoryData={categoryData} />

      <CourseItemList categoryData={categoryData} />

      <TouchableOpacity style={styles.floatingBtn} onPress={() => router.push('/add-new-category-item')} >

        <Ionicons name="add-circle" size={60} color={Colors.PRIMARY} />
      </TouchableOpacity>

    </View>
  )
}

const styles = StyleSheet.create({

  floatingBtn: {
    position: 'absolute',
    bottom: 40,
    right: 16,


  }
})