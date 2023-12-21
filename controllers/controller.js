const {Party, PresidentCandidate, PresidentProfile, User, Voter, VoterParty} = require("../models")

class Controller {

  static async showHome(req, res) {
    try {
      res.send("allo")
    } catch (error) {
      res.send(error)
    }
  }
}

module.exports = Controller