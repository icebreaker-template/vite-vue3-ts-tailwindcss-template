import OSS from 'ali-oss'

export function getInitConfig() {
  return {
    // yourRegion填写Bucket所在地域。以华东1（杭州）为例，yourRegion填写为oss-cn-hangzhou。
    region: import.meta.env.VITE_OSS_REGION,
    // @ts-ignore
    authorizationV4: true,
    // 从STS服务获取的临时访问密钥（AccessKey ID和AccessKey Secret）。
    accessKeyId: 'yourAccessKeyId',
    accessKeySecret: 'yourAccessKeySecret',
    // 从STS服务获取的安全令牌（SecurityToken）。
    stsToken: 'yourSecurityToken',
    // 填写Bucket名称，例如examplebucket。
    bucket: import.meta.env.VITE_OSS_BUCKET,
  }
}

export function initClient() {
  const client = new OSS(getInitConfig());
  return client
}
