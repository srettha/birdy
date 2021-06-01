const axios = require('axios').default

async function getBirds() {
  const response = await axios.get('http://localhost:5001/birds')

  return response.data.birds
}

module.exports = {
  getBirds,
}
