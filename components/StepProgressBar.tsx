import React from 'react'
import { View, Text } from 'react-native-ui-lib'

type Props = {
  step: string
}

const StepProgressBar = (props: Props) => {
  const step = props.step

  if (step == 'one') {
    return (
      <View row paddingV-10>
        <View center backgroundColor="#FDA84B" width={40} height={40} style={{ borderRadius: 25 }}>
          <Text color="white">1</Text>
        </View>
        <View row center width={30} paddingH-5>
          <View flex height={1} backgroundColor={'#ACACAC'} />
        </View>
        <View
          center
          width={40}
          height={40}
          style={{ borderRadius: 25, borderColor: '#ACACAC', borderWidth: 1 }}
        >
          <Text color="#ACACAC">2</Text>
        </View>
        <View row center width={30} paddingH-5>
          <View flex height={1} backgroundColor={'#ACACAC'} />
        </View>
        <View
          center
          width={40}
          height={40}
          style={{ borderRadius: 25, borderColor: '#ACACAC', borderWidth: 1 }}
        >
          <Text color="#ACACAC">3</Text>
        </View>
        <View row center width={30} paddingH-5>
          <View flex height={1} backgroundColor={'#ACACAC'} />
        </View>
        <View
          center
          width={40}
          height={40}
          style={{ borderRadius: 25, borderColor: '#ACACAC', borderWidth: 1 }}
        >
          <Text color="#ACACAC">4</Text>
        </View>
        <View row center width={30} paddingH-5>
          <View flex height={1} backgroundColor={'#ACACAC'} />
        </View>
        <View
          center
          width={40}
          height={40}
          style={{ borderRadius: 25, borderColor: '#ACACAC', borderWidth: 1 }}
        >
          <Text color="#ACACAC">5</Text>
        </View>
      </View>
    )
  }
  if (step == 'two') {
    return (
      <View row paddingV-10>
        <View center backgroundColor="#FDA84B" width={40} height={40} style={{ borderRadius: 25 }}>
          <Text color="white">1</Text>
        </View>
        <View row center width={30} paddingH-5>
          <View flex height={1} backgroundColor={'#FDA84B'} />
        </View>
        <View center width={40} height={40} backgroundColor="#FDA84B" style={{ borderRadius: 25 }}>
          <Text color="white">2</Text>
        </View>
        <View row center width={30} paddingH-5>
          <View flex height={1} backgroundColor={'#ACACAC'} />
        </View>
        <View
          center
          width={40}
          height={40}
          style={{ borderRadius: 25, borderColor: '#ACACAC', borderWidth: 1 }}
        >
          <Text color="#ACACAC">3</Text>
        </View>
        <View row center width={30} paddingH-5>
          <View flex height={1} backgroundColor={'#ACACAC'} />
        </View>
        <View
          center
          width={40}
          height={40}
          style={{ borderRadius: 25, borderColor: '#ACACAC', borderWidth: 1 }}
        >
          <Text color="#ACACAC">4</Text>
        </View>
        <View row center width={30} paddingH-5>
          <View flex height={1} backgroundColor={'#ACACAC'} />
        </View>
        <View
          center
          width={40}
          height={40}
          style={{ borderRadius: 25, borderColor: '#ACACAC', borderWidth: 1 }}
        >
          <Text color="#ACACAC">5</Text>
        </View>
      </View>
    )
  }
  if (step == 'three') {
    return (
      <View row paddingV-10>
        <View center backgroundColor="#FDA84B" width={40} height={40} style={{ borderRadius: 25 }}>
          <Text color="white">1</Text>
        </View>
        <View row center width={30} paddingH-5>
          <View flex height={1} backgroundColor={'#FDA84B'} />
        </View>
        <View
          center
          width={40}
          height={40}
          backgroundColor={'#FDA84B'}
          style={{ borderRadius: 25 }}
        >
          <Text color="white">2</Text>
        </View>
        <View row center width={30} paddingH-5>
          <View flex height={1} backgroundColor={'#FDA84B'} />
        </View>
        <View
          center
          width={40}
          height={40}
          backgroundColor={'#FDA84B'}
          style={{ borderRadius: 25 }}
        >
          <Text color="white">3</Text>
        </View>
        <View row center width={30} paddingH-5>
          <View flex height={1} backgroundColor={'#ACACAC'} />
        </View>
        <View
          center
          width={40}
          height={40}
          style={{ borderRadius: 25, borderColor: '#ACACAC', borderWidth: 1 }}
        >
          <Text color="#ACACAC">4</Text>
        </View>
        <View row center width={30} paddingH-5>
          <View flex height={1} backgroundColor={'#ACACAC'} />
        </View>
        <View
          center
          width={40}
          height={40}
          style={{ borderRadius: 25, borderColor: '#ACACAC', borderWidth: 1 }}
        >
          <Text color="#ACACAC">5</Text>
        </View>
      </View>
    )
  }
  if (step == 'four') {
    return (
      <View row paddingV-10>
        <View center backgroundColor="#FDA84B" width={40} height={40} style={{ borderRadius: 25 }}>
          <Text color="white">1</Text>
        </View>
        <View row center width={30} paddingH-5>
          <View flex height={1} backgroundColor={'#FDA84B'} />
        </View>
        <View
          center
          width={40}
          height={40}
          backgroundColor={'#FDA84B'}
          style={{ borderRadius: 25 }}
        >
          <Text color="white">2</Text>
        </View>
        <View row center width={30} paddingH-5>
          <View flex height={1} backgroundColor={'#FDA84B'} />
        </View>
        <View
          center
          width={40}
          height={40}
          backgroundColor={'#FDA84B'}
          style={{ borderRadius: 25 }}
        >
          <Text color="white">3</Text>
        </View>
        <View row center width={30} paddingH-5>
          <View flex height={1} backgroundColor={'#FDA84B'} />
        </View>
        <View
          center
          width={40}
          height={40}
          backgroundColor={'#FDA84B'}
          style={{ borderRadius: 25 }}
        >
          <Text color="white">4</Text>
        </View>
        <View row center width={30} paddingH-5>
          <View flex height={1} backgroundColor={'#ACACAC'} />
        </View>
        <View
          center
          width={40}
          height={40}
          style={{ borderRadius: 25, borderColor: '#ACACAC', borderWidth: 1 }}
        >
          <Text color="#ACACAC">5</Text>
        </View>
      </View>
    )
  }
  if (step == 'five') {
    return (
      <View row paddingV-10>
        <View center backgroundColor="#FDA84B" width={40} height={40} style={{ borderRadius: 25 }}>
          <Text color="white">1</Text>
        </View>
        <View row center width={30} paddingH-5>
          <View flex height={1} backgroundColor={'#FDA84B'} />
        </View>
        <View
          center
          width={40}
          height={40}
          backgroundColor={'#FDA84B'}
          style={{ borderRadius: 25 }}
        >
          <Text color="white">2</Text>
        </View>
        <View row center width={30} paddingH-5>
          <View flex height={1} backgroundColor={'#FDA84B'} />
        </View>
        <View
          center
          width={40}
          height={40}
          backgroundColor={'#FDA84B'}
          style={{ borderRadius: 25 }}
        >
          <Text color="white">3</Text>
        </View>
        <View row center width={30} paddingH-5>
          <View flex height={1} backgroundColor={'#FDA84B'} />
        </View>
        <View
          center
          width={40}
          height={40}
          backgroundColor={'#FDA84B'}
          style={{ borderRadius: 25 }}
        >
          <Text color="white">4</Text>
        </View>
        <View row center width={30} paddingH-5>
          <View flex height={1} backgroundColor={'#FDA84B'} />
        </View>
        <View
          center
          width={40}
          height={40}
          backgroundColor={'#FDA84B'}
          style={{ borderRadius: 25 }}
        >
          <Text color="white">5</Text>
        </View>
      </View>
    )
  }
}

export default StepProgressBar
