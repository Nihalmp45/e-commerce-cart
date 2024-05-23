import React from "react";
import { View, Image, StyleSheet } from "react-native";
import PagerView from "react-native-pager-view";

const Banner = () => {
  return (
    <View style={styles.container}>
      <PagerView style={styles.pagerView} initialPage={0} useNext={false}>
        <View key="1">
          <Image
            style={styles.image}
            source={require("../../assets/images/Banner-1.jpg")}
          />
        </View>
        <View key="2">
          <Image
            style={styles.image}
            source={require("../../assets/images/Banner-3.jpg")}
          />
        </View>
        <View key="3">
          <Image
            style={styles.image}
            source={require("../../assets/images/Banner-2.jpg")}
          />
        </View>
      </PagerView>
    </View>
  );
};

export default Banner;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 300,
  },
  pagerView: {
    flex: 1,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
    marginVertical: 10,
  },
});
