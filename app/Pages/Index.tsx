import { StyleSheet, View } from 'react-native'
import React from 'react'
import Banner from '../Components/Banner'
import Products from '../Components/Products'
import Footer from '../Components/Footer'
import Header from '../Components/Header'

const Index = () => {
  return (
    <View >
      <Header />
      <Banner />
      <Products />
      <Footer />
    </View>
  )
}

export default Index

const styles = StyleSheet.create({})