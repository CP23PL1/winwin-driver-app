import { useState, useRef } from 'react'
import { useRouter } from 'expo-router'
import { Text, Button, View } from 'react-native-ui-lib'
import Swipeable from 'react-native-gesture-handler/Swipeable'
import { AntDesign } from '@expo/vector-icons'

function Job() {
  const router = useRouter()
  const [isAccept, setIsAccept] = useState(false)
  const [mapHeight, setMapHeight] = useState('50%')
  const [infoHeight, setInfoHeight] = useState('50%')
  const [step, setStep] = useState(0)

  const accpetJob = () => {
    setIsAccept(true)
    setMapHeight('70%')
    setInfoHeight('30%')
  }

  const cancelJob = () => {
    setIsAccept(false)
    router.push('/for-user/')
  }

  const start = () => {
    setStep(1)
  }

  const onPick = () => {
    setStep(2)
  }

  const leftSwipeActions = () => {
    return <View style={{}} width={'100%'}></View>
  }
  const showProcess = () => {
    if (isAccept == false) {
      return (
        <View row absB paddingB-20 paddingH-15 width={'100%'}>
          <View flex-1 paddingH-5>
            <Button secondary onPress={() => cancelJob()}>
              <Text bodyB white>
                ไม่รับงาน
              </Text>
            </Button>
          </View>
          <View flex-1 paddingH-5>
            <Button onPress={() => accpetJob()}>
              <Text bodyB white>
                รับงาน
              </Text>
            </Button>
          </View>
        </View>
      )
    }
    if (isAccept == true && step == 0) {
      return (
        <View absB paddingB-20 paddingH-15 width={'100%'}>
          <Button onPress={() => start()}>
            <Text white bodyB>
              ถึงจุดรับแล้ว
            </Text>
          </Button>
        </View>
      )
    }
    if (isAccept == true && step == 1) {
      return (
        <View absB paddingB-20 paddingH-15 width={'100%'}>
          <View flex paddingV-10 paddingH-10 backgroundColor="#FFCC95" style={{ borderRadius: 15 }}>
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
                    เลื่อนเมื่อรับผู้โดยสารแล้ว
                  </Text>
                </View>
              </View>
            </Swipeable>
          </View>
        </View>
      )
    }
    if (isAccept == true && step == 2) {
      return (
        <View absB paddingB-20 paddingH-15 width={'100%'}>
          <View flex paddingV-10 paddingH-10 backgroundColor="#FFCC95" style={{ borderRadius: 15 }}>
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
          </View>
        </View>
      )
    }
  }
  return (
    <View backgroundColor="#FDA84B" paddingT-75 flex>
      <View height={mapHeight}></View>
      <View
        height={infoHeight}
        backgroundColor="white"
        style={{ borderTopLeftRadius: 25, borderTopRightRadius: 25 }}
      >
        {showProcess()}
      </View>
    </View>
  )
}

export default Job
