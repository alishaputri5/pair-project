const Controller = require("../controllers/controller")

const router = require("express").Router()

router.get("/", Controller.showHome)

router.get('/register', Controller.registerPage)
router.post('/register', Controller.handleRegisterPage)

router.get("/login", Controller.loginPage)
router.post("/login", Controller.handleLoginPage)

// validation
router.use((req, res, next) => {
  console.log('Time:', Date.now())
  console.log(req.session)
  next()
})


router.use((req, res, next) => {
  if (!req.session.user) {
      const error = "please login first"
      res.redirect("/")
    } else {
      next()
      }
    })
    
    const president = (req, res, next) => {
      if (req.session.role !== "President") {
    const error = "Voter only!"
    return res.redirect("/?error=President only!")
  } else {
    next()
  }
}
    
    

router.get("/election", Controller.renderElection)

router.get("/presidentProfile",president, Controller.presidentProfile)

router.get("/parties", Controller.showParties)

router.get("/:PresidentId/partiesEdit", Controller.partyEdit)


module.exports = router