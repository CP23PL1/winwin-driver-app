import { View, Text, TouchableOpacity } from 'react-native-ui-lib'
import { FontAwesome5 } from '@expo/vector-icons'
import { MaskedPlaceDetail } from '@/apis/google/type'
import { TextStyle, ViewStyle } from 'react-native'

type Props = {
  placeDetail: MaskedPlaceDetail
  color: string
  styles?: {
    row?: ViewStyle
    placeNameStyle?: TextStyle
  }
  useDivider?: boolean
}

export default function Waypoint({ placeDetail, color, styles, useDivider = true }: Props) {
  return (
    <View
      style={[
        {
          flexDirection: 'row',
          gap: 10,
        },
        styles?.row,
      ]}
    >
      <FontAwesome5 name="map-marker-alt" size={20} color={color} />
      {useDivider && (
        <View
          style={{
            width: 1,
            backgroundColor: '#6a6a6a',
            opacity: 0.2,
            height: '100%',
          }}
        />
      )}

      <View style={{ width: 0, flexGrow: 1, flex: 1 }}>
        <Text color={color} style={[{ flexShrink: 1 }, styles?.placeNameStyle]}>
          {placeDetail.name}
        </Text>
      </View>
    </View>
  )
}
