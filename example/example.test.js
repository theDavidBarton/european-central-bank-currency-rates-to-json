const nock = require('nock')
const mock = require('./example.mock.xml')
const exampleUsage = require('./example.js')

// fetched url from ../src/transformRatesToJSON.js
nock('https://cors-anywhere.herokuapp.com')
  .get('/https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml')
  .reply(200, mock)

describe('example provided for usage', function() {
  test('', async function() {
    console.log(exampleUsage())
  })
})
