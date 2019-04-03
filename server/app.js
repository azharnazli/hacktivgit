require('dotenv').config()

const express = require('express')
const app = express()
const port = 3000
const routes = require('./routes')
const cors = require('cors')

app.use(cors())
app.use(express.urlencoded({extended : false}))
app.use(express.json())

// ROUTE
app.use(routes)



app.listen(port, ()=> {
  console.log(`listening on port : ${port}`)
})