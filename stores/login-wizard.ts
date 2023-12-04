import { create } from 'zustand'

type LoginWizardState = {
  dialCode: string
  phoneNumber: string | null
}

type LoginWizardActions = {
  getPhoneNumberWithGeo: () => string | null
  setPhoneNumber: (phoneNumber: string) => void
  reset: () => void
}

export type LoginWizardStore = LoginWizardState & LoginWizardActions

export const useLoginWizardStore = create<LoginWizardStore>((set, get) => ({
  dialCode: '+66', // Default to Thailand
  phoneNumber: null,
  getPhoneNumberWithGeo: () => {
    const dialCode = get().dialCode
    const phoneNumber = get()?.phoneNumber
    if (!phoneNumber) return null
    return `${dialCode}${phoneNumber}`
  },
  setPhoneNumber: (phoneNumber: string) => set({ phoneNumber }),
  reset: () => set({ phoneNumber: null }),
}))
