

// eslint-disable-next-line no-var
declare var self: SharedWorkerGlobalScope
// MessageEvent

const state: any[] = []

const taskMap = new Map()

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
    // x.postMessage({
    //   type: 'upload-start',
    //   message: Date.now(),
    // })
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
