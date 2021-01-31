const axios = require('axios').default;

function getServerSettings() {
  return new Promise((resolve, reject) => {
    axios.get('/api/settings').then(res => res.data)
      .then(data => resolve(data))
      .catch(err => reject(err));
  });
}

module.exports = {
  getServerSettings
};
