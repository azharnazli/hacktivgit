const axios = require('axios')
const User = require('../models/users')
const {
  OAuth2Client
} = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENT_ID);

let ax = axios.create({
  baseURL: `https://api.github.com`
})

ax.defaults.headers.common['Authorization'] = `token ${process.env.GITHUB_TOKEN}`

class UserController {

  static showUser(req, res) {
    ax
      .get(`/user/repos`)
      .then(({
        data
      }) => {
        res.status(200).json(data)
      })
      .catch(err => {
        res.status(500).json(err.message)
      })
  }

  static showRepo(req, res) {
    ax
      .get(`/users/${req.body.username}/repos`)
      .then(({
        data
      }) => {
        res.status(200).json(data)
      })
      .catch(err => {
        res.status(500).json(err.message)
      })
  }

  static getStars(req, res) {
    ax
      .get(`/user/starred`)
      .then(({
        data
      }) => {
        if (!req.query.search) {
          res.status(200).json(data)
        } else {
          let repo = []
          data.forEach(el => {
            if (el.owner.login == req.query.search) {
              repo.push(el)
            }
          })
          res.status(200).json(repo)
        }
      })
      .catch(err => {
        res.status(500).json(err.message)
      })
  }

  static createRepo(req, res) {
    ax
      .post(`/user/repos`, {
        name: req.body.repoName
      })
      .then(({
        data
      }) => {
        res.status(201).json(data)
      })
      .catch(err => {
        res.status(500).json(err.message)
      })
  }

  static unstar(req, res) {
    ax
      .delete(`/user/starred/${req.params.owner}/${req.params.repo}`)
      .then(({
        data
      }) => {
        res.status(200).json(data)
      })
      .catch(err => {
        res.status(500).json(err.message)
      })
  }

  static login(req, res) {
    let payload;
    client.verifyIdToken({
        idToken: req.body.token,
        audience: process.env.CLIENT_ID
      })
      .then(ticket => {
        payload = ticket.getPayload()
        const newEmail = payload.email
        return User.findOne({
          email: newEmail
        })
      })
      .then((newUser) => {
        if (newUser) {
          res.status(200).json(newUser)
        } else {
          return User.create({
            name: payload.name,
            email: payload.email,
            avatar: payload.picture,
            password: 1234,
          })
        }
      })
      .then((newUser)=> {
        res.status(201).json(newUser)
      })
      .catch(err => {
        res.status(500).json(err.message)
      })
  }

}

module.exports = UserController