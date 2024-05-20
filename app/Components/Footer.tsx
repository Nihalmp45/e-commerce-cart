import { View, Text,TouchableOpacity } from 'react-native'
import React from 'react'

const Footer = () => {
  return (
    <View className="mt-4 mx-3 mb-4 border-solid border border-slate-400 rounded-2xl">
      <View className="flex flex-row justify-between align-middle mx-4 my-4">
        <Text className='mt-2 text-slate-400 text-xs'>Terms & conditions</Text>
        <TouchableOpacity className='bg-black p-2 rounded-xl'>
          <Text className="text-white">Career</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Footer