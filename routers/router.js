const Controller = require("../controllers/controller")

const router = require("express").Router()

router.get("/", Controller.showHome)



// validation
router.use((req, res, next) => {
  console.log('Time:', Date.now())
  console.log(req.session)
  next()
})

router.use((req, res, next) => {
  // if (!req.session.User.id) {
  //   const error = "please login first"
  // } else {
  // }
  next()
})

router.get("/login", Controller.loginPage)


router.get("/election", Controller.renderElection)


module.exports = router