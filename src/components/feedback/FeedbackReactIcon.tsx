import React from 'react'

import HeartTick from 'assets/svgs/heart-tick.svg'
import Map from 'assets/svgs/map.svg'
import Scooter from 'assets/svgs/scooter.svg'
import Suit from 'assets/svgs/suit.svg'
import { FeedbackCategory } from '@/apis/drivers/type'
import { SvgProps } from 'react-native-svg'

type Props = {
  category: FeedbackCategory
  svgProps?: SvgProps
}

export default function FeedbackReactIcon({ category, svgProps }: Props) {
  switch (category) {
    case 'manner':
      return <Suit {...svgProps} />
    case 'driving':
      return <Map {...svgProps} />
    case 'service':
      return <HeartTick {...svgProps} />
    case 'vehicle':
      return <Scooter {...svgProps} />
  }
}
