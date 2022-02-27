const express = require('express')
const app = express()

if (args['port'] === undefined) {
    port = 5000
} else {
    port = args['port']
}

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
  



app.use(function(req, res) {
    res.status(404).send("Endpoint does not exist")
    res.type("text/plain")
})