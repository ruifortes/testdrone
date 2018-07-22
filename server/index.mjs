import Path from 'path'
import express from 'express'
import bodyParser from 'body-parser'
// import mysql from 'mysql'
import {router as arangoRouter} from './arango'

// const DIRNAME = (typeof __dirname !== 'undefined') ? __dirname : Path.dirname(new URL(import.meta.url).pathname)

const DIRNAME = process.cwd()
console.log(DIRNAME);
const app = express()

// var connection = mysql.createConnection({
//   host     : process.env.MYSQL_HOST || 'localhost',
//   user     : process.env.MYSQL_USER || 'ralpi_admin',
//   database : process.env.MYSQL_DATABASE || 'ralpi_mdb',
//   password : process.env.MYSQL_PASSWORD || 'rmrsf71'
// })
// 
// connection.connect()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(bodyParser.text())

app.use('/', express.static(Path.resolve(DIRNAME, '../client/build')))

app.use('/api' ,arangoRouter)

app.get('/test', (req, res) => {
  res.json({version: '1.4.0'})
})

// app.get('/test', (req, res) => {
//   connection.query('select * from _countries', (err, ret) => {
//     if (err) throw err
//     console.log(ret)
//     res.json(ret)
//   })
// })

app.listen(8080, '0.0.0.0', function() {
  console.log('Server ready!')
})