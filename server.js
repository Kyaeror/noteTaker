const express = require(`express`)
const app = express()

app.set(`view engine`, `ejs`)

app.get(`/`, (req, res) => {
    console.log(`Here`)
    res.render(`index`)
})

app.get(`/notes`, (req, res) => {
    res.render(`notes`)
})

app.listen(5000)