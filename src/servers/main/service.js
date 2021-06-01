const axios = require('axios').default

function getBirds() {
  return axios.get('http://localhost:5001/birds')
}

module.exports = {
  getBirds,
}
