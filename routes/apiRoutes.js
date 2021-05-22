// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on table-data, waitinglist, etc.

const path = require('path');
const notesDB = require('../db/db.json');
const {v4: uuidv4} = require('uuid');
const fs = require('fs');

// ROUTING

module.exports = (app) => {
  // API GET Requests
  // Below code handles when users "visit" a page.
  // In each of the below cases when a user visits a link
  // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
  // ---------------------------------------------------------------------------

  app.get('/api/notes', (req, res) => {
      const allNotes = fs.readFileSync((path.join(__dirname, '../db/db.json')), 'utf8');

      res.send(allNotes);
    });


  // API POST Requests
  // Below code handles when a user submits a form and thus submits data to the server.
  // In each of the below cases, when a user submits form data (a JSON object)
  // ...the JSON is pushed to the appropriate JavaScript array
  // (ex. User fills out a reservation request... this data is then sent to the server...
  // Then the server saves the data to the tableData array)
  // ---------------------------------------------------------------------------

  app.post('/api/notes', (req, res) => {
    // Note the code here. Our "server" will respond to requests and let users know if they have a table or not.
    // It will do this by sending out the value "true" have a table
    // req.body is available since we're using the body parsing middleware
    let newNote = req.body;
    newNote.id = createId();

    let notesArr = JSON.parse(fs.readFileSync((path.join(__dirname, '../db/db.json')), 'utf8'));
    notesArr.push(newNote);

    fs.writeFile((path.join(__dirname, '../db/db.json')), JSON.stringify(notesArr, null, 2), (err) => {err? console.error(err) : 
        console.log("Successfully wrote db.json")});
    res.json(newNote);

  });
  function createId() {
    const uniqueId = uuidv4();
    return uniqueId;
  }

  // I added this below code so you could clear out the table while working with the functionality.
  // Don"t worry about it!
// TODO : Replace with delete route
  app.post('/api/clear', (req, res) => {
    // Empty out the arrays of data
    tableData.length = 0;
    waitListData.length = 0;

    res.json({ ok: true });
  });
};