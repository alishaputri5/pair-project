const {Party, PresidentCandidate, PresidentProfile, User, Voter, VoterParty} = require("../models")
const bcryptjs = require("bcryptjs")
const session = require("express-session")

class Controller {

  static async showHome(req, res) {
    try {
      res.render("home")
    } catch (error) {
      res.send(error)
    }
  }
  static async loginPage(req, res) {
    try {
      res.render('loginPage')
    } catch (error) {
      console.log(error);
      res.send(error)
    }
  }
  
  static async handleLoginPage(req, res) {
    try {
      const {user, password} = req.body
      let foundUser = await User.findOne({where: {user: user}})
      // console.log(foundUser)

      if (foundUser) {
        const isValidPassword = bcryptjs.compareSync(password, foundUser.password)

        if (isValidPassword) {
          req.session.user = foundUser.user
          req.session.role = foundUser.role
          req.session.userId = foundUser.id

          // console.log(req.session)

          // return res.redirect("/")
          if(foundUser.role === "President") {
            return res.redirect(`/presidentForm/${foundUser.id}`)
          } else {
            return res.redirect(`/voterForm/${foundUser.id}`)
          }
        } else {
          const error = "Invalid Username / Password"
          return res.redirect(`/login?error=${error}`)
        } 

      } else {
        const error = "Invalid Username / Password"
        return res.redirect(`/login?error=${error}`)
      }
    } catch (error) {
      console.log(error)
      res.send(error)
    }
  }

  static async registerPage(req, res) {
    try {
      res.render('registerPage')
    } catch (error) {
      console.log(error);
      res.send(error)
    }
  }

  static formAddProfilePresident(req, res) {
    try {
      res.render('formProfilePresident')
    } catch (error) {
      console.log(error);
      res.send(error)
    }
  }
  // static async handleLoginPage(req, res) {
  //   try {
  //     res.redirect()
  //   } catch (error) {
  //     res.send(error)
  //   }
  // }

  static async handleRegisterPage(req, res) {
    try {
      const {user, password, role} = req.body
      await User.create({user, password, role})
      res.redirect("/register")
    } catch (error) {
      res.send(error)
    }
  }
  
// test===========================================
  static async renderElection(req, res) {
    try {
      // let data = await Party.findAll()
      let candidates = await PresidentCandidate.findAll()

      res.render("electionPage", {candidates})

      // res.send(data)
    } catch (error) {
      res.send(error)
    }
  }

  static async handleElection(req,res) {
    try {
      // pakai chaining ?
      console.log(req.body)
      // console.log(req.body.cekbox?.length)
      res.redirect("/election")
    } catch (error) {
      res.send(error)
    }
  }

  static async presidentProfile(req, res) {
    try {
      res.send("president")
    } catch (error) {
      res.send(error)
    }
  }

  static async showParties(req, res) {
    try {
      // res.render("")
      res.send("allo")
    } catch (error) {
      res.send(error)
    }
  }

  // PRESIDENT ============================
  static async renderPresidentForm(req, res) {
    try {
      const {userId} = req.params
      let president = await PresidentCandidate.findOne({
        where: {
          UserId: userId
        }
      })
      console.log(president)
      if (!president) {
        return res.render("presidentForm", {userId})
      } else {
        return res.redirect("/presidentHome")
      }
    } catch (error) {
      res.send(error)
    }
  }

  static async handlePresidentForm(req, res) {
    try {
      console.log(req.body)
      console.log(req.params)
      console.log(req.session)

      // let president = PresidentCandidate.findByPk()
      const {namePresident} = req.body
      const {userId} = req.params

      await PresidentCandidate.create({namePresident, UserId: userId})
      res.redirect("/presidentHome")
    } catch (error) {
      res.send(error)
    }
  }

  static async showPresidentHome(req, res) {
    try {
      res.render("presidentHome")
    } catch (error) {
      res.send(error)
    }
  }

  static async renderAddPresidentProfile(req, res) {
    try {
      // console.log(req.session)

      res.render("addFormProfilePresident")
    } catch (error) {
      res.send(error)
    }
  }

  static async handleAddPresidentProfile(req,res) {
    try {
      // console.log(req.body, "<<<<<<<<<<<<<<<<<<")
      const {name,age,gender,visionMission,imageUrl} = req.body
      let president = await PresidentCandidate.findOne({where: {UserId: req.session.userId}})

      await PresidentProfile.create({name,age,gender,visionMission,imageUrl})
      let createdPresidentProfile = await PresidentProfile.findOne({
        where: {name,age,gender,visionMission,imageUrl}})
      // console.log(createdPresidentProfile.id)
      await PresidentCandidate.update({PresidentProfileId: createdPresidentProfile.id},{
        where:{id: president.id}
      })
      res.redirect("/presidentHome")
    } catch (error) {
      res.send(error)
    }
  }
  
  static async presidentProfile(req, res) {
    try {
      let president = await PresidentCandidate.findOne({
        where: {UserId: req.session.userId},
        include: {model: PresidentProfile}
      })
      
      res.render("/presidentProfile", {president})
    } catch (error) {
      res.send(error)
    }
  }

  static async renderEditProfile(req, res) {
    try {
      const {userId} = req.session

      let presidentProfile = await PresidentCandidate.findOne({
        include: {model: PresidentProfile},
        where: {UserId: userId}
      })

      // console.log(presidentProfile.PresidentProfile)

      res.render("editPresidentProfile", {presidentProfile})
    } catch (error) {
      res.send(error)
    }
  }

  static async handleEditProfile(req, res) {
    try {
      // console.log(req.body)
      const {name,age,gender,visionMission,imageUrl} = req.body
      // console.log(req.params)
      const {profileId} = req.params

      await PresidentProfile.update({name,age,gender,visionMission,imageUrl},{where: {id:profileId}})
      res.redirect("/presidentHome")
    } catch (error) {
      res.send(error)
    }
  }

  static async renderPresidentParties(req, res) {
    try {
      let parties = await Party.findAll({
        where: {PresidentId: null}
      })
      // console.log(parties)
      res.render("presidentParties", {parties})
    } catch (error) {
      res.send(error)
    }
  }

  static async choosenPartyPresident(req,res) {
    try {
      // console.log(req.params)
      const userId = req.session.userId
      const {partyId} = req.params
      let president = await PresidentCandidate.findOne({
        include: {model:User, where: {id:userId}}
      })
      await Party.update({PresidentId: president.id}, {where: {id: partyId}})
      res.redirect("/president/parties")
    } catch (error) {
      res.send(error)
    }
  }

  static async deleteParty(req,res) {
    try {
      // console.log(req.params)
      res.redirect("/")
    } catch (error) {
      res.send(error)
    }
  }

  static async resultCount(req,res) {
    try {
      res.render("resultCount")
    } catch (error) {
      res.send(error)
    }
  }


}

module.exports = Controller