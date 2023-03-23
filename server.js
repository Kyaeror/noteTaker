const express = require(`express`)
const app = express()
const fs = require(`fs`)
const PORT = process.env.PORT || 3000
const db = require(`${__dirname}/Develop/db/db.json`)

app.use(express.static(`${__dirname}/Develop/public`))
app.use(express.static(`${__dirname}/Develop/db`))
app.use(express.json())

app.get(`/api/notes`, (req, res)=> {
    res.json(db)
})

app.get(`/` , (req, res) => {
    res.sendFile(`${__dirname}/Develop/public/index.html`)
})

app.get(`/notes` , (req, res) => {
    res.sendFile(`${__dirname}/Develop/public/notes.html`)
})

app.listen(PORT)