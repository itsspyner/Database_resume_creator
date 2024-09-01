const express = require('express');
const fs = require('fs');
var mysql = require('mysql2');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

app.post('/jsonData', (req, res) => {

  var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "jsonData"
  });

  con.connect(function (err) {
    if (err) throw err;
    console.log("Connected successfully.");
  });

  const jsonData = req.body;
  res.send(jsonData);

  const email = "specturet@gmail.com";

  con.query('insert into resume (email,data) values (?,?)',[email,JSON.stringify(jsonData)], (err, results) => { 
    if (err) { 
        console.error('Error inserting data:', err); 
        return; 
    } 

    console.log('Data inserted successfully')
  });

  con.query("SELECT data FROM resume WHERE email = 'specturet@gmail.com'", (err, results) => { 
    if (err) { 
        console.error('Error fetching data:', err); 
        return; 
    } 
    
    if (results.length > 0) {
        const data = results[0].data;
        
        try {
            const parsedData = data;
            console.log('Query results:', parsedData);
        } catch (jsonErr) {
            console.error('Error parsing JSON data:', jsonErr);
        }
    } else {
        console.log('No results found for the given email.');
    }
});


});

app.listen(3000, () => {
  console.log("Listening in port 3000");
});                 