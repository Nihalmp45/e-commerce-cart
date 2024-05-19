import React from "react";
import { Button, Image, Text, TouchableOpacity, View } from "react-native";

const Header = () => {
  return (
    <View className="mt-6 mx-3 border-solid border border-slate-400 rounded-2xl">
      <View className="flex flex-row justify-between align-middle mx-4 my-4">
        <Image  source={require("../../assets/images/Header-img.png")} />
        <TouchableOpacity className='bg-black p-2 rounded-xl'>
          <Text className="text-white">Contact</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;
