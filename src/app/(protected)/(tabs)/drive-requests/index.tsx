import { driversApi } from '@/apis/drivers'
import { useInfiniteQuery } from '@tanstack/react-query'
import DriveRequestList from '@/components/drive-request/DriveRequestList'
import { Colors, LoaderScreen, View } from 'react-native-ui-lib'
import { ActivityIndicator } from 'react-native'
import { useMemo } from 'react'
import DriveRequestListEmpty from '@/components/drive-request/DriveRequestListEmpty'
import { RefreshControl } from 'react-native-gesture-handler'

export default function DriveRequestsScreen() {
  const {
    data: driveRequests,
    refetch,
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

  const data = useMemo(() => {
    return driveRequests?.pages.flatMap((page) => page.data) ?? []
  }, [driveRequests])

  if (!driveRequests) {
    return <LoaderScreen />
  }

  return data.length <= 0 ? (
    <DriveRequestListEmpty />
  ) : (
    <DriveRequestList
      data={data}
      listProps={{
        contentContainerStyle: {
          padding: 10,
        },
        refreshControl: <RefreshControl refreshing={isFetching} onRefresh={refetch} />,
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
