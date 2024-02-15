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
}

export const commonUtil = new CommonUtil()
