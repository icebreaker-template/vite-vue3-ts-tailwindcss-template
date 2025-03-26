// eslint-disable-next-line no-var
declare var self: SharedWorkerGlobalScope
// MessageEvent
// self.addEventListener('message', (event) => {
//   console.log('message', event)
// })

self.addEventListener('connect', (event) => {
  console.log('connect', event)
  for (const x of event.ports) {
    x.onmessage = (event) => {
      console.log('message', event)
      x.postMessage('pong')
    }
  }
})

// onconnect = (event) => {
//   console.log('connect')
// }
