const express = require('express')
const axios = require('axios')
const cors = require('cors')
const path = require('path');

const app = express()
const PORT = 5000; 

const BASE_URL = 'https://api.1inch.dev'

const {
  getSyncedInterval,
  getBlockTraceByNumber,
  getBlockTraceByNumberAndTxHash
} = require('./api');


app.use(cors()) // To handle CORS issues when making requests to the front end


// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'org/dist/org')));

/** 

NFT API

*/

app.get('/fetchNfts', async (req, res) => {
  const address = req.query.address || "0xd8da6bf26964af9d7eed9e03e53415d37aa96045";
  const limit = req.query.limit || 50;
  const offset = req.query.offset || 0;
  const chainIds = req.query.chainIds || 1;

  try {
    const constructedUrl = `${BASE_URL}/nft/v1/byaddress?address=${address}&chainIds=${chainIds}&limit=${limit}&offset=${offset}`;

    const response = await axios.get(constructedUrl, {
      headers: {
        Authorization: 'Bearer t8QR94g31WPWC4tFYjM7xnO0WHewKxSb' // Make sure you replace your API Key here
      }
    });

    // Send the data from the API back to the client
    res.json(response.data);

  } catch (error) {
    console.error("Axios Error: ", error.response);
    res.status(500).json({ error: 'Failed to fetch NFTs :(' });
  }
})


/** 

GAS PRICE API

*/

app.get('/gas-price', async (req, res) => {
  try {
    const response = await axios.get(`${BASE_URL}/gas-price/v1.4/1`, {
      headers: {
        Authorization: 'Bearer t8QR94g31WPWC4tFYjM7xnO0WHewKxSb'  // Make sure you replace your API Key here
      }
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching gas prices' });
  }
});

/** 

TRACES API

*/


app.get('/synced-interval/:chain', async (req, res) => {
  try {
    const data = await getSyncedInterval(req.params.chain);
    res.json(data);
  } catch (error) {
    res.status(500).send('Error fetching synced interval.');
  }
});

app.get('/block-trace/:chain/:blockNumber', async (req, res) => {
  try {
    const data = await getBlockTraceByNumber(req.params.chain, req.params.blockNumber);
    res.json(data);
  } catch (error) {
    res.status(500).send('Error fetching block trace.');
  }
});

app.get('/block-trace/:chain/:blockNumber/:txHash', async (req, res) => {
  try {
    const data = await getBlockTraceByNumberAndTxHash(req.params.chain, req.params.blockNumber, req.params.txHash);
    res.json(data);
  } catch (error) {
    res.status(500).send('Error fetching transaction trace.');
  }
});

app.get('*', (req,res) => {
          res.sendFile(path.join(__dirname,"oneinchapp/dist/oneinchapp/", 'index.html'))

console.log("PATH ", path.join(__dirname,"org/dist/org/", 'index.html'))
})


app.listen(PORT, console.log(`Localhost active on port: ${PORT}`));