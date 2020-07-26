const { v4: uuidv4 } = require('uuid')
const path = require('path')
const fs = require('fs')
const port = 33002;
const { connect } = require('@holochain/hc-web-client')
const holochainConnection = connect({ url: `ws://localhost:${port}` })
const net = require('net')
const client = new net.Socket()

function base64_encode(file) {
    var bitmap = fs.readFileSync(file);
    return `data:image/png;base64, ${Buffer.from(bitmap).toString('base64')}`
}

let startedConductor = false
const tryConnection = () => {
  client.connect(
    { port },
    () => {
      client.end()
      if (!startedConductor) {
        console.log('starting ui, connect to:' + port)
        startedConductor = true
        const noteId = '222160da-f21c-4326-87c3-b597263630c7'
        holochainConnection.then(({ callZome }) => {
          callZome('a23de7fe-bff7-4e6e-87f0-f4c44d038888', 'notes', 'create_note')({ base: '', note_input: { uuid: noteId, title: 'Rudys Note 2', content: 'Get this from demo again', order: 1 } }).then((result) => {
            const res = JSON.parse(result)
            console.log('ok_demo_setup_Rudy', res)
            callZome('e1289ae4-0611-4c5c-b1fa-5b4ed0b8c67a', 'tasks', 'create_task')({ base: noteId, task_input: { uuid: uuidv4(), title: 'Rudys Task', "done":false } }).then((result) => {
              const res = JSON.parse(result)
              console.log('ok_demo_setup_Rudy_task', res)
            })
          })
          // Broadcast Origins
          callZome('57c01ed8-30ae-4fca-b6f9-40192821fed2', 'origins', 'create_origin')({ base: '', origin_input : { uuid:uuidv4(), content: '<h1>Rudy wrote this</h1><p>in the Broadcast network</p>' }})
          .then((result) => {
            console.log(JSON.parse(result))
          }).catch(err =>{console.log(err)})
          callZome('57c01ed8-30ae-4fca-b6f9-40192821fed2', 'origins', 'create_origin')({ base: '', origin_input : { uuid:uuidv4(), content: '<h1>Rudy wrote this</h1>Another origin in 57c01ed8-30ae-4fca-b6f9-40192821fed2' }})
          .then((result) => {
            console.log(JSON.parse(result))
          }).catch(err =>{console.log(err)})
          callZome('57c01ed8-30ae-4fca-b6f9-40192821fed2', 'origins', 'create_origin')({ base: '', origin_input : { uuid:uuidv4(), content: '<h1>Rudy wrote this</h1>3rd origin in 57c01ed8-30ae-4fca-b6f9-40192821fed2' }})
          .then((result) => {
            console.log(JSON.parse(result))
          }).catch(err =>{console.log(err)})
        })
      }
    }
  )
}

tryConnection()

client.on('error', (err) => {
  console.log(err)

  console.log('Waiting for Holochain to configure and boot')
  setTimeout(tryConnection, 5000)
})