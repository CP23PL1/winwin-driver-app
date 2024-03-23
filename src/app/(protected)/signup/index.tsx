import { View, Text, Image, Colors, Button } from 'react-native-ui-lib'
import { MaterialCommunityIcons, Entypo } from '@expo/vector-icons'
import { router } from 'expo-router'

export default function SignupScreen() {
  return (
    <View flex backgroundColor="#8D8D97">
      <View flexG center>
        <View absB>
          <Image
            width={350}
            height={350}
            resizeMode="contain"
            source={require('../../../../assets/driver.png')}
          />
        </View>
      </View>
      <View padding-30 br50 gap-20 backgroundColor="white">
        <View gap-5>
          <Text h4B>คุณยังไม่ได้เป็นสมาชิกของซุ้มวินใด</Text>
          <Text caption>
            กรุณาเลือกหรือเข้าร่วมซุ้มวินตามความต้องการของคุณ
            เราจะทำให้ประสบกรณ์รับผู้โยสารของคุณดีขึ้น!
          </Text>
        </View>
        <View gap-15>
          <Button
            borderRadius={10}
            outline
            backgroundColor="white"
            onPress={() => router.push('/signup/join-service-spot')}
          >
            <View flex row center gap-10>
              <MaterialCommunityIcons name="map-marker" size={24} color={Colors.$iconPrimary} />
              <Text flex primary>
                เข้าร่วมซุ้มวินที่มีอยู่
              </Text>
              <Entypo name="chevron-thin-right" size={20} color={Colors.$iconPrimary} />
            </View>
          </Button>
          <Button
            borderRadius={10}
            outline
            backgroundColor="white"
            onPress={() => router.push('/signup/new-service-spot')}
          >
            <View flex row center gap-10>
              <MaterialCommunityIcons
                name="map-marker-plus"
                size={24}
                color={Colors.$iconPrimary}
              />
              <Text flex primary>
                ลงทะเบียนซุ้มวินใหม่
              </Text>
              <Entypo name="chevron-thin-right" size={20} color={Colors.$iconPrimary} />
            </View>
          </Button>
        </View>
      </View>
    </View>
  )
}
