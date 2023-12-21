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
          req.session.id = foundUser.id

          return res.redirect("/login?=berhasil")
        } else {
          const error = "Invalid Username / Password"
          return res.redirect(`/login?error=${error}`)
        } 

      } else {
        const error = "Invalid Username / Password"
        return res.redirect(`/login?error=${error}`)
      }
    } catch (error) {
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

  static async handleRegisterPage(req, res) {
    try {
      const {user, password, role} = req.body
      await User.create({user, password, role})
      res.redirect("/register")
    } catch (error) {
      res.send(error)
    }
  }
  

  static async renderElection(req, res) {
    try {
      // let data = await Party.findAll()
      let candidates = await PresidentCandidate.findAll()

      res.render("electionPage", {candidates})

      res.send(data)
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
      let data = await Party.findAll({
        include: {
          model: PresidentCandidate
        }
      })
      res.send(data)
    } catch (error) {
      res.send(error)
    }
  }

  static async partyEdit(req, res) {
    try {
      const {id} = req.session
      let partiesByPresident = await Party.findAll({
        include: {
          model: PresidentCandidate,
        },
        where: {
          PresidentId: id
        }
      })
      res.render(partiesByPresident)
    } catch (error) {
      res.send(error)
    }
  }

  static async showVoterParties(req, res) {
    try {
      let data = await Party.findAll({
        include: {
          model: VoterParty,
          include: Voter
        }
      })
      res.render("voterPartiesList")
    } catch (error) {
      res.send(error)
    }
  }
}

module.exports = Controller