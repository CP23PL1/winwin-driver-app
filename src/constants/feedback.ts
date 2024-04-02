export const feedbackCategoryOptions = [
  {
    value: 'manner',
    label: 'มารยาท',
  },
  {
    value: 'driving',
    label: 'การขับขี่',
  },
  {
    value: 'service',
    label: 'การบริการ',
  },
  {
    value: 'vehicle',
    label: 'ยานพาหนะ',
  },
] as const

export type FeedbackCategoryOptions = (typeof feedbackCategoryOptions)[number]
