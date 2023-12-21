const Controller = require("../controllers/controller")

const router = require("express").Router()

// validation
router.use((req, res, next) => {
  console.log('Time:', Date.now())
  console.log(req.session)
  next()
})

router.use((req, res, next) => {
  if (!req.session.User.id) {
    const error = "please login first"
  } else {
    next()
  }
})

router.get("/", Controller.showHome)

router.get("/president", Controller)


module.exports = router