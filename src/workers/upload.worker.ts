// MessageEvent
// ShareWorker 方案存在的问题是没有global的window

declare let self: SharedWorkerGlobalScope
const state: any[] = []

const taskMap = new Map()

async function uploadFile(file: Blob, port: MessagePort) {
  port.postMessage({
    type: 'upload-finish',
    message: Date.now(),
    data: {
      progress: 1,
      taskId: 1,
    },
  })
}

let ptr: number
self.addEventListener('connect', (event) => {
  console.log('connect', event)

  event.ports.forEach((x) => {
    if (x.onmessage === undefined || x.onmessage === null) {
      x.onmessage = (event) => {
        console.log('message', event)
        if (event.data.type === 'add') {
          state.push(event.data.data)
          x.postMessage('pong')
          return
        }
        else if (event.data.type === 'upload-files') {
          console.log('upload-files', event.data)
          x.postMessage({
            type: 'upload-start',
            message: Date.now(),
          })
          uploadFile(event.data.blobs[0], x)
          return
        }
        x.postMessage('pong')
      }
    }
  })

  ptr = setInterval(() => {
    for (const x of event.ports) {
      x.postMessage({
        type: 'info',
        message: Date.now(),
        data: state,
      })
    }
  }, 10000)

  for (const x of event.ports) {
    x.postMessage({
      type: 'sync',
      message: Date.now(),
      data: taskMap,
    })
  }
})

// onconnect = (event) => {
//   console.log('connect')
// }
