const express = require('express')
const Controller = require('./controllers/controller')
const router = require('./routers/router')
const app = express()
const port = 3000
const session = require('express-session')

app.set("view engine", "ejs")
app.use(express.urlencoded({extended: true}))


app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'keyboard cat', // mengamankan session, tidak boleh sampai orang lain tahu
  resave: false, // menyimpan jejak user, bisa id bisa apapun. Kalau mau ngesave saat hanya ada perubahan di data session kita maka bisa pasang resave:false. False yang biasa digunakan karena untuk mengurangi memori penggunaan, jadi saat ada perubahan data saja save akan dijalankan.
  saveUninitialized: true, // jika true, kalaupun kita tidak ngesave apapun di session kita. Gunakan false untuk implementasi login session
  cookie: { 
    secure: false, // true untuk https. Karena kita masih proses development pakai false (http)
    sameSite:true }  //cookie sameSite, dipasang untuk menghindari yang namanya csrf attack
}))

app.use(router)


app.use(express.urlencoded({extended : true}))
app.set('view engine', 'ejs')


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
