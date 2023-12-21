const Controller = require("../controllers/controller")

const router = require("express").Router()


router.get('/register', Controller.registerPage)
router.post('/register', Controller.handleRegisterPage)

router.get("/login", Controller.loginPage)
router.post("/login", Controller.handleLoginPage)

// validation
router.use((req, res, next) => {
  console.log('Time:', Date.now())
  // console.log(req.session)
  next()
})

router.get("/", Controller.showHome)

router.use((req, res, next) => {
  if (!req.session.user) {
      const errors = "please login first"
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
    
    

// router.get("/election", Controller.renderElection)

router.get("/presidentProfile",president, Controller.presidentProfile)

router.get("/presidentForm/:userId",president, Controller.renderPresidentForm)
router.post("/presidentForm/:userId",president, Controller.handlePresidentForm)


// ADD PROFILE PRESIDENT
router.get("/president/addPresidentProfile", Controller.renderAddPresidentProfile)
router.post("/president/addPresidentProfile", Controller.handleAddPresidentProfile)

router.get("/president/presidentProfile", Controller.presidentProfile)

router.get("/presidentHome", Controller.showPresidentHome)

router.get("/president/editProfile", Controller.renderEditProfile)
router.post("/president/editProfile/:profileId", Controller.handleEditProfile)

// router.get("/president/addProfile")

router.get("/president/parties", Controller.renderPresidentParties)

router.get("/president/chooseParty/:partyId", Controller.choosenPartyPresident)


const admin = (req, res, next) => {
  if (req.session.role !== "Admin") {
  const error = "Admin only!"
  return res.redirect("/?error=President only!")
} else {
next()
}
}

router.get("/president/delete/:partyId", admin, Controller.deleteParty)



router.get("/parties", Controller.showParties)

// router.get("/:PresidentId/partiesEdit", Controller.partyEdit)


module.exports = router