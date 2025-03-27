import OSS from 'ali-oss'
import axios from 'axios'

const cacheKey = 'oss-token'
export async function getToken(): Promise<{ data: any }> {
  const t = localStorage.getItem(cacheKey)
  let cache = (() => {
    try {
      return JSON.parse(typeof t === 'string' ? t : '')
    }
    catch {

    }
  })()

  if (cache) {
    // 没有过期
    if (Date.now() < new Date(cache.Expiration).valueOf()) {
      return {
        data: cache,
      }
    }
  }

  const res = await axios.get('/api/sts')
  cache = res.data
  localStorage.setItem(cacheKey, JSON.stringify(cache))

  return {
    data: cache,
  }
}

export async function getInitConfig() {
  const res = await getToken()
  // res.data.AccessKeyId
  // res.data.AccessKeySecret
  // res.data.SecurityToken
  // res.data.Expiration
  return {
    // yourRegion填写Bucket所在地域。以华东1（杭州）为例，yourRegion填写为oss-cn-hangzhou。
    region: import.meta.env.VITE_OSS_REGION,
    // @ts-ignore
    authorizationV4: true,
    // 从STS服务获取的临时访问密钥（AccessKey ID和AccessKey Secret）。
    accessKeyId: res.data.AccessKeyId,
    accessKeySecret: res.data.AccessKeySecret,
    // 从STS服务获取的安全令牌（SecurityToken）。
    stsToken: res.data.SecurityToken,
    // 填写Bucket名称，例如examplebucket。
    bucket: import.meta.env.VITE_OSS_BUCKET,
  }
}

export async function initClient() {
  const config = await getInitConfig()
  const client = new OSS(config)
  return client
}
