import {
  QueryClient,
  QueryClientProvider as DefaultQueryClientProvider,
  focusManager,
} from '@tanstack/react-query'
import { useOnlineManager } from './hooks/useOnlineManager'
import { useAppState } from './hooks/useAppState'
import { AppStateStatus, Platform } from 'react-native'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5, // 5 minutes
    },
  },
})

const onAppStateChange = (status: AppStateStatus) => {
  if (Platform.OS === 'web') return
  focusManager.setFocused(status === 'active')
}

function QueryClientProvider({ children }: { children: React.ReactNode }) {
  useOnlineManager()
  useAppState(onAppStateChange)
  return <DefaultQueryClientProvider client={queryClient}>{children}</DefaultQueryClientProvider>
}

export { QueryClient, QueryClientProvider }
