import { View, Text,Image } from 'react-native'



const Banner = () => {
  return (
    <View className=''>
      <Image className='w-full h-80 rounded-3xl  my-4' source={require("../../assets/images/Banner.png")} />
    </View>
  )
}

export default Banner