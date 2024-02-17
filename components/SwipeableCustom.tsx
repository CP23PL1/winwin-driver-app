import Swipeable from 'react-native-gesture-handler/Swipeable'
import { Text, Button, View } from 'react-native-ui-lib'
import { AntDesign } from '@expo/vector-icons'

const SwipeableCustom = () => {
  const handleLeftSwipe = () => {}

  return (
    <View flex paddingV-10 paddingH-10 backgroundColor="#FFCC95" style={{ borderRadius: 15 }}>
      <Swipeable
        onSwipeableOpen={handleLeftSwipe}
        // Pass an empty function to prevent left swipe action rendering
        renderLeftActions={() => <View />}
      >
        <View row centerV>
          <View left backgroundColor="#ff8303" paddingV-10 paddingH-10 style={{ borderRadius: 10 }}>
            <AntDesign name="right" size={24} color="black" />
          </View>
          <View paddingL-10>
            <Text center bodyB>
              เลื่อนเมื่อรับผู้โดยสารแล้ว
            </Text>
          </View>
        </View>
      </Swipeable>
    </View>
  )
}

export default SwipeableCustom
