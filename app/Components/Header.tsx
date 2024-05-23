import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";



const Header = () => {
  const navigation = useNavigation();
  return (
    <View className="mt-10 mx-3 border-solid border border-slate-400 rounded-2xl">
      <View className="flex flex-row justify-between align-middle mx-4 my-4">
        <Image source={require("../../assets/images/Header-img.png")} />
        <TouchableOpacity onPress={() => navigation.navigate('Home')} className="bg-black p-2 rounded-xl" >
          <Text className="text-white">Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;

