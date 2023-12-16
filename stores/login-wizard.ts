import { createStore } from 'zustand-x'

const loginWizardStore = createStore('loginWizard')({
  phoneNumber: '',
})

export default loginWizardStore
