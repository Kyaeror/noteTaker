const express = require(`express`)
const app = express()
const fs = require(`fs`)
const { v4: uuidv4 } = require("uuid")
const PORT = process.env.PORT || 3000
const data = `${__dirname}/Develop/db/db.json`
const indexHTML = `${__dirname}/Develop/public/index.html`
const notesHTML = `${__dirname}/Develop/public/notes.html`

app.use(express.static(`${__dirname}/Develop/public`))
app.use(express.json())

app.get(`/` , (req, res) => {
    res.sendFile(indexHTML)
})

app.get(`/notes` , (req, res) => {
    res.sendFile(notesHTML)
})

app.route(`/api/notes`)
.get((req, res) => {
    const notesData = JSON.parse(fs.readFileSync(data))
    res.json(notesData)
}).post((req, res) => {
    const notesData = JSON.parse(fs.readFileSync(data))
    const newNote = req.body
    newNote.id = uuidv4()
    notesData.push(newNote)
    fs.writeFileSync(data, JSON.stringify(notesData))
    res.json(newNote)
})

app.delete(`api/notes/:id` ,(req,res) => {
    const notesData = JSON.parse(fs.readFileSync(data))
    const noteID = req.params.id
    const filteredNotes = notesData.filter(note => note.id !== noteID)
    fs.writeFileSync(data, JSON.stringify(filteredNotes))
    res.json({message: `Successfully deleted!`})
})

app.listen(PORT)