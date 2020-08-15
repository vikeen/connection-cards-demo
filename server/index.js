const express = require('express')
const app = express()
const port = 8080

app.set('view engine', 'html');

app.use(express.static('public'))

app.listen(port, () => {
    console.log(`listening at http://localhost:${port}`)
})
