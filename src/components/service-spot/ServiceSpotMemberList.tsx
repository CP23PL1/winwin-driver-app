import { Driver, DriverInfo as TDriverInfo } from '@/apis/drivers/type'
import { FlashList } from '@shopify/flash-list'
import { Colors, Text, View } from 'react-native-ui-lib'
import DriverInfo from '../DriverInfo'
import { FontAwesome5 } from '@expo/vector-icons'
import { useCallback, useRef, useState } from 'react'
import { LayoutAnimation } from 'react-native'

type Mode = 'view' | 'edit'

type Props = {
  drivers: Driver[]
  mode?: Mode
  onRemoveMember?: (driverId: string) => void
}

export default function ServiceSpotMemberList({ drivers, mode = 'view', onRemoveMember }: Props) {
  const [data, setData] = useState<Driver[]>(drivers)
  const listRef = useRef<FlashList<Driver> | null>(null)

  const handleRemoveMember = useCallback(
    (driverId: string) => {
      setData((prev) => prev.filter((driver) => driver.id !== driverId))
      listRef.current?.prepareForLayoutAnimationRender()
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
      onRemoveMember?.(driverId)
    },
    [listRef.current, setData, onRemoveMember],
  )

  return (
    <FlashList
      ref={listRef}
      data={data}
      extraData={{ mode }}
      ListEmptyComponent={() => (
        <Text color={Colors.$textNeutralLight}>ไม่มีสมาชิกภายในซุ้มวินนี้</Text>
      )}
      estimatedItemSize={100}
      ItemSeparatorComponent={() => <View height={15} />}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item, extraData }) => (
        <View row centerV spread>
          <DriverInfo driver={item.info} />
          {extraData.mode === 'edit' && (
            <FontAwesome5
              name="trash-alt"
              size={18}
              color={Colors.$iconDanger}
              onPress={() => handleRemoveMember(item.id)}
            />
          )}
        </View>
      )}
    />
  )
}
