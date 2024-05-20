import { SafeAreaView, ScrollView, StyleSheet, View } from "react-native";
import React from "react";
import Banner from "../Components/Banner";
import Products from "../Components/ProductsHorizontal";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import ProductsVertical from '../Components/ProductsVertical'

const Index = () => {
  return (
    <SafeAreaView>
      <ScrollView>
        <View>
          <Header />
          <Banner />
          <Products />
          <ProductsVertical />
          <Footer />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Index;

const styles = StyleSheet.create({});
