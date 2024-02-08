import React, { forwardRef } from 'react'

import { View } from 'react-native-ui-lib'
import DefaultSelectDropdown, { SelectDropdownProps } from 'react-native-select-dropdown'
import { Feather } from '@expo/vector-icons'

export type SelectDropdownRef = DefaultSelectDropdown

const SelectDropdown = forwardRef<DefaultSelectDropdown, SelectDropdownProps>((props, ref) => {
  const disabled = props.disabled
  return (
    <DefaultSelectDropdown
      {...props}
      ref={ref}
      buttonStyle={{
        borderColor: 'rgba(253, 168, 75, .5)',
        borderWidth: 1,
        backgroundColor: 'transparent',
        width: '100%',
        borderRadius: 25,
        opacity: !disabled ? 1 : 0.25,
      }}
      buttonTextStyle={{
        color: '#000000',
        fontSize: 16,
        textAlign: 'left',
        fontFamily: 'NotoSansThaiBold',
      }}
      dropdownStyle={{
        borderRadius: 15,
      }}
      rowTextStyle={{
        fontFamily: 'NotoSansThai',
      }}
      dropdownIconPosition="right"
      renderDropdownIcon={() => (
        <View paddingR-5>
          <Feather
            name="chevron-down"
            size={24}
            style={{
              color: 'rgba(253, 168, 75, .5)',
            }}
          />
        </View>
      )}
    />
  )
})

export default SelectDropdown
