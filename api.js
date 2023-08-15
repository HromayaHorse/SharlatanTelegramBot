const axios = require('axios')

class Prediction {
  getRandomPrediction() {
    try {
      return axios.get('https://dwarfishlife.com/api/magicball');
    } catch (e) {
      throw Error('something went wrong');
    }
  }
}
module.exports = Prediction;