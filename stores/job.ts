import { createStore } from 'zustand-x'

const jobStore = createStore('job')({
  isConnected: false,
})

export default jobStore
