class CommonUtil {
  async getBlobFromUri(uri: string): Promise<Blob> {
    const blob = (await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest()
      xhr.onload = function () {
        resolve(xhr.response)
      }
      xhr.onerror = function (e) {
        console.log(e)
        reject(new Error('Network request failed'))
      }
      xhr.responseType = 'blob'
      xhr.open('GET', uri, true)
      xhr.send(null)
    })) as Blob

    return blob
  }
  formatCurrency(value: number) {
    const nf = new Intl.NumberFormat('th-TH', {
      currency: 'THB',
      style: 'currency',
      minimumFractionDigits: 0,
    })
    return nf.format(value)
  }
}

export const commonUtil = new CommonUtil()
