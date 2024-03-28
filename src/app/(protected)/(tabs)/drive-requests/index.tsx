import { driversApi } from '@/apis/drivers'
import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import DriveRequestList from '@/components/drive-request/DriveRequestList'
import { Colors, LoaderScreen, View } from 'react-native-ui-lib'
import { ActivityIndicator } from 'react-native'

export default function DriveRequestsScreen() {
  // const { data: driveRequests } = useQuery({
  //   queryKey: ['drive-requests'],
  //   queryFn: () => driversApi.getMyDriveRequests({ sortBy: 'createdAt:DESC', limit: 5 }),
  // })

  const {
    data: driveRequests,
    isFetching,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ['drive-requests'],
    queryFn: ({ pageParam }) =>
      driversApi.getMyDriveRequests({ page: pageParam, sortBy: 'createdAt:DESC', limit: 10 }),
    getNextPageParam: (lastPage) => {
      const nextPage = lastPage.meta.currentPage + 1
      return nextPage <= lastPage.meta.totalPages ? nextPage : undefined
    },
    initialPageParam: 0,
  })

  if (!driveRequests) {
    return <LoaderScreen />
  }

  return (
    <DriveRequestList
      data={driveRequests.pages.flatMap((page) => page.data)}
      listProps={{
        contentContainerStyle: {
          padding: 10,
        },
        snapToEnd: true,
        ListFooterComponent: () =>
          hasNextPage && (
            <View center paddingV-20>
              {isFetching && (
                <ActivityIndicator size="large" color={Colors.$backgroundPrimaryHeavy} />
              )}
            </View>
          ),
      }}
      onEndReached={() => !isFetching && fetchNextPage()}
    />
  )
}
