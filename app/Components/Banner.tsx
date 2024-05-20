import { View, Text, Image,StyleSheet} from "react-native";
import PagerView from "react-native-pager-view";

const Banner = () => {
  return (
    <View>
      <PagerView style={styles.pagerView} initialPage={0} useNext={false}>
        <View key="1">
          <Image
            className="w-full h-80 rounded-xl  my-4"
            source={require("../../assets/images/Banner-1.jpg")}
          />
        </View>
        <View key="2">
        <Image
            className="w-full h-80 rounded-xl  my-4"
            source={require("../../assets/images/Banner-3.jpg")}
          />
      </View>
      <View key="3">
        <Image
            className="w-full h-80 rounded-xl  my-4"
            source={require("../../assets/images/Banner-2.jpg")}
          />
      </View>
      </PagerView>
    </View>
  );
};

export default Banner;

const styles = StyleSheet.create({
  pagerView: {
    flex: 1,
  },
});
