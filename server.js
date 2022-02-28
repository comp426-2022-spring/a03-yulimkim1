import minimist from 'minimist'
import express from 'express'

var args = minimist(process.argv.slice(2))

const express = require('express')
const app = express()
const port = args.port || process.env.PORT || 5000

const server = app.listen(port, () => {
    console.log('App is running on port %PORT%'.replace('%PORT%', port))
})

// coin flip functions 
function coinFlip() {
    return (Math.floor(Math.random() * 2) == 0) ? 'heads' : 'tails';
  }

function coinFlips(flips) {
    let f = [];
    for (var i = 0; i < flips; i++) {
      let flip = coinFlip();
      f[i] = flip;
    }
    return f;
  }

function countFlips(array) {
    let heads_count = 0;
    let tails_count = 0;
    for (var i = 0; i < array.length; i++) {
      if (array[i] == 'heads') {
        heads_count ++;
      } else if (array[i] == 'tails') {
        tails_count ++;
      }
    }
    if (heads_count == 0) {
      return {"tails": tails_count};
    }
    else if (tails_count == 0) {
      return {"heads": heads_count};
    }
    return {"heads": heads_count, "tails": tails_count};
  }
  
function flipACoin(call) {
    let coin_flip = coinFlip();
    let match = "";
    if (coin_flip == call) {
      match = "win";
    } else if (coin_flip != call) {
      match = "lose";
    }
    return {"call": call, "flip": coin_flip, "result": match};
  }

//endpoints
app.get('/app/', (req, res) => {
    res.status(200).end("OK")
    res.type('text/plain')
})
app.get('/app/flip/', (req, res) => {
    res.status(200).json({'flip': coinFlip()})
})
app.get('/app/flips/:number/', (req, res) => {
    res.status(200).json({'raw': coinFlips(req.params.number), 'summary': countFlips(coinFlips(req.params.number))})
})
app.get('/app/flip/call/tails/', (req, res) => {
    res.status(200).json(flipACoin('tails'))
})
app.get('/app/flip/call/heads/', (req, res) => {
    res.status(200).json(flipACoin('heads'))
})
app.use(function(req, res) {
    res.status(404).send("Endpoint does not exist")
    res.type("text/plain")
})

