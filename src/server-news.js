const express = require('express')
const cors = require('cors')
const router = require('./router-news')
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())
app.use('/news', router)

app.listen(5500, err => {
	if (err) return err
	console.log('http://localhost:5500');
})
