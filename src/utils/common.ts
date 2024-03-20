class CommonUtil {
  formatCurrency(value: number) {
    const nf = new Intl.NumberFormat('th-TH', {
      currency: 'THB',
      style: 'currency',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })
    return nf.format(value)
  }

  formatPhoneNumber(value: string) {
    return value.replace(/\+66/g, '0')
  }
}

export const commonUtil = new CommonUtil()
