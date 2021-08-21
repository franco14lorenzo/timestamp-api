// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
const { response } = require('express');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

/* app.get('/api/:timestamp', (req, res) => {
  let timestamp = req.params.timestamp
  if (timestamp.match(/\d{5,}/)){
    timestamp = +timestamp
    let unix = timestamp
    let utc = new Date(timestamp).toUTCString()
    if (utc === "Invalid Date"){
      res.json({"error": "Invalid Date"})
    }else{
      res.json({"unix": unix, "utc": utc})
    }
  } else{
    let unix = new Date(timestamp).valueOf()
    let utc = new Date(timestamp).toUTCString()
    if (utc === "Invalid Date"){
      res.json({"error": "Invalid Date"})
    }else{
      res.json({"unix": unix, "utc": utc})
    }
  }
}) */

app.get('/api/:timestamp', (req, res) => {
  let timestamp = req.params.timestamp
  if (timestamp.match(/\d{5,}/)){
    timestamp = +timestamp
  }
    let date = new Date(timestamp)
    if(date.toUTCString() == "Invalid Date"){
      res.json({"error": date.toUTCString()})
    }
    res.json({"unix": date.valueOf(), "utc": date.toUTCString()})
})

app.get('/api/', (req, res) => {
  
  res.json({
    "unix": new Date().valueOf(),
    "utc": new Date().toUTCString()
  })
})

// listen for requests :) 

const listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
