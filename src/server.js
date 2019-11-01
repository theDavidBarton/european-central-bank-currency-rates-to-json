const express = require('express')

function endpointCreation() {
  try {
    const app = express()
    const port = process.env.PORT || 5000

    // serve the example.html
    app.use(express.static('src'))
    app.listen(port)

    console.log(`API is listening on ${port}\nOpen: http://localhost:${port}/example.html`)
  } catch (e) {
    console.error(e)
  }
}
endpointCreation()
