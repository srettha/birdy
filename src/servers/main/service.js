const axios = require('axios').default

class Birdy {
  constructor(url = 'http://localhost:5001') {
    this.url = url
  }

  getBirds() {
    return axios.get(`${this.url}/birds`)
  }
}

module.exports = Birdy
