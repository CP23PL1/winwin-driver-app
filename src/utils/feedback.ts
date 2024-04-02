import { FeedbackCategory } from '@/apis/drivers/type'

import HeartTick from 'assets/svgs/heart-tick.svg'
import Map from 'assets/svgs/map.svg'
import Scooter from 'assets/svgs/scooter.svg'
import Suit from 'assets/svgs/suit.svg'

class FeedbackUtil {
  getFeedbackLabel(feedback: FeedbackCategory) {
    switch (feedback) {
      case 'manner':
        return 'มารยาท'
      case 'driving':
        return 'การขับขี่'
      case 'service':
        return 'การบริการ'
      case 'vehicle':
        return 'ยานพาหนะ'
    }
  }

  feedbackImage(feedback: FeedbackCategory) {
    switch (feedback) {
      case 'manner':
        return require('../../assets/feedback/emoji_star_1.png')
      case 'driving':
        return require('../../assets/feedback/emoji_star_2.png')
      case 'service':
        return require('../../assets/feedback/emoji_star_3.png')
      case 'vehicle':
        return require('../../assets/feedback/emoji_star_4.png')
    }
  }

  getFeedbackImageByRating(rating: number) {
    if (rating >= 4.5) {
      return require('../../assets/feedback/emoji_star_5.png')
    } else if (rating >= 4) {
      return require('../../assets/feedback/emoji_star_4.png')
    } else if (rating >= 3) {
      return require('../../assets/feedback/emoji_star_3.png')
    } else if (rating >= 2) {
      return require('../../assets/feedback/emoji_star_2.png')
    } else {
      return require('../../assets/feedback/emoji_star_1.png')
    }
  }

  getFeedbackImageByCategory(category: FeedbackCategory) {
    switch (category) {
      case 'manner':
        return Suit
      case 'driving':
        return Map
      case 'service':
        return HeartTick
      case 'vehicle':
        return Scooter
    }
  }
}

export const feedbackUtil = new FeedbackUtil()
