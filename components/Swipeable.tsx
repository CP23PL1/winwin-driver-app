import Swipeable from 'react-native-gesture-handler/Swipeable'

function SwipeableCustom {
    return (
        <Swipeable renderLeftActions={leftSwipeActions} onSwipeableOpen={() => onPick()}>
              <View row centerV>
                <View
                  left
                  backgroundColor="#ff8303"
                  paddingV-10
                  paddingH-10
                  style={{ borderRadius: 10 }}
                >
                  <AntDesign name="right" size={24} color="black" />
                </View>
                <View paddingL-10>
                  <Text center bodyB>
                    เลื่อนเมื่อส่งผู้โดยสารแล้ว
                  </Text>
                </View>
              </View>
            </Swipeable>
    )
}

export default SwipeableCustom;