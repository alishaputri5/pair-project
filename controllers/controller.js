const {Party, PresidentCandidate, PresidentProfile, User, Voter, VoterParty} = require("../models")

class Controller {

  static async showHome(req, res) {
    try {
      res.send("alo")
    } catch (error) {
      res.send(error)
    }
  }
  static loginPage(req, res) {
    try {
      res.render('loginPage')
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
}

module.exports = Controller