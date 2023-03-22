import express from 'express'
import ejs from 'ejs'
import bodyParser from 'body-parser'
import router from './routes/routes.js'

const app = express()

app.engine('html', ejs.render)
app.set('view engine', 'html')

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.use('/html_node', router)


const PORT = process.env.PORT || 3600

app.listen(PORT, console.log(`App running on port ${PORT}`))