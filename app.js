const express = require('express')
const Controller = require('./controllers/controller')
const app = express()
const port = 3000

app.use(express.urlencoded({extended : true}))
app.set('view engine', 'ejs')

app.get('/', Controller.loginPage)
// app.get('/', Controller.handleLoginPage)
app.get('/register', Controller.registerPage)


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
