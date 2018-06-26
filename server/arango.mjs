// import {Database, aql} from 'arangojs' //beats me...
import arango from 'arangojs'
const Database = arango.Database
const aql = arango.aql

const db = new Database({
  url: `http://${process.env.ARANGODB_HOST || 'localhost'}:8529`
})

db.useDatabase('test')
db.useBasicAuth('root', 'password')
const collection = db.collection('countries')

import express from 'express'
export const router = express.Router()

router.get('/countries/:key', (req, res) => {
  const {key} = req.params
  collection.document(key)
  .then(doc => {
    res.send(doc)
  })
  .catch(err => {
    console.log(err);
    res.status(400).send('Invalid key')
  })

})
