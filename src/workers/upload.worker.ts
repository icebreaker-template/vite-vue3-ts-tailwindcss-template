// eslint-disable-next-line no-var
declare var self: SharedWorkerGlobalScope
// MessageEvent

const state: any[] = []

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
        x.postMessage('pong')
      }
    }
  })

  ptr = setInterval(() => {
    console.log('ping')
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
      type: 'upload-start',
      message: Date.now(),
    })
  }
})

// onconnect = (event) => {
//   console.log('connect')
// }
