import { driversApi } from '@/apis/drivers'
import { DriverRating, FeedbackCategory } from '@/apis/drivers/type'
import FeedbackReactIcon from '@/components/feedback/FeedbackReactIcon'
import { feedbackUtil } from '@/utils/feedback'

import { useQuery } from '@tanstack/react-query'
import { Stack } from 'expo-router'
import React, { useMemo } from 'react'
import { FlatList } from 'react-native-gesture-handler'
import { Card, Colors, Image, Text, View } from 'react-native-ui-lib'

const placeholderData: DriverRating[] = [
  {
    category: 'driving',
    rating: 5,
    totalFeedbacks: 1,
  },
  {
    category: 'manner',
    rating: 5,
    totalFeedbacks: 1,
  },
  {
    category: 'service',
    rating: 5,
    totalFeedbacks: 1,
  },
  {
    category: 'vehicle',
    rating: 5,
    totalFeedbacks: 1,
  },
]

export default function MyFeedback() {
  const { data: ratings, isLoading } = useQuery({
    queryKey: ['my-ratings'],
    queryFn: driversApi.getMyDriverRatings,
    placeholderData,
  })

  const totalRatings = useMemo(() => {
    if (!ratings) return 0
    let sumRatings = 0
    let sumFeedbacks = 0
    for (const item of ratings) {
      sumRatings += item.rating
      sumFeedbacks += item.totalFeedbacks
    }
    return sumFeedbacks === 0 ? 0 : sumRatings / sumFeedbacks
  }, [ratings])

  const renderItem = (item: DriverRating) => {
    return (
      <Card flex center padding-10 paddingV-20 gap-10>
        <FeedbackReactIcon
          category={item.category as FeedbackCategory}
          svgProps={{ width: 50, height: 50 }}
        />
        <View center>
          <Text h4B color={Colors.$textDefault}>
            {(item.rating / item.totalFeedbacks).toLocaleString('en-US', {
              maximumFractionDigits: 2,
              minimumFractionDigits: 2,
            })}
          </Text>
          <Text caption color={Colors.$textNeutral}>
            ({item.totalFeedbacks})
          </Text>
        </View>
        <Text caption>{feedbackUtil.getFeedbackLabel(item.category)}</Text>
      </Card>
    )
  }

  return (
    <View flex centerV padding-20 gap-10>
      <Stack.Screen
        options={{
          headerShown: true,
          title: 'คะแนนของฉัน',
          headerTitleStyle: { fontFamily: 'NotoSansThai' },
          headerTitleAlign: 'center',
        }}
      />
      <Card center padding-20>
        <Image
          source={feedbackUtil.getFeedbackImageByRating(totalRatings)}
          style={{ width: 80, height: 80, marginBottom: 10 }}
        />
        <Text body>คะแนนรวม</Text>
        <Text h1B>
          {totalRatings.toLocaleString('en-US', {
            maximumFractionDigits: 2,
            minimumFractionDigits: 2,
          })}
        </Text>
      </Card>
      <FlatList
        style={{ width: '100%' }}
        data={ratings}
        keyExtractor={(item) => item.category}
        contentContainerStyle={{ gap: 10 }}
        columnWrapperStyle={{ gap: 10 }}
        numColumns={2}
        renderItem={({ item }) => renderItem(item)}
      />
    </View>
  )
}
