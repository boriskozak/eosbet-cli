const Conf = require('conf')

module.exports = new Conf({
  defaults: {
    "account": {
      "name": "",
      "authority": "active",
      "private_key": ""
    },
    "eos": {
      "chainId": "aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906",
      "httpEndpoint": "https://api1.eosasia.one"
    },
    "eosbet": {
      "contract": "eosbetdice11",
      "referrer": "yeloyeloyelo",
      "seed": ""
    },
  },
})
