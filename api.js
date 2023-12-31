const axios = require('axios');

const TRACE_BASE_URL = 'https://api.1inch.dev/traces/v1.0/chain/';
const mySecret = process.env['1INCH_API_KEY']; // Replace with your API Key

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function getSyncedInterval(chain) {
  const url = `${TRACE_BASE_URL}${chain}/synced-interval`;
  const response = await axios.get(url, {
    headers: {
      'Authorization': `Bearer ${mySecret}`
    }
  });
  return response.data;
}

async function getBlockTraceByNumber(chain, blockNumber) {
  await delay(1000);
  const url = `${TRACE_BASE_URL}${chain}/block-trace/${blockNumber}`;
  const response = await axios.get(url, {
    headers: {
      'Authorization': `Bearer ${mySecret}`
    }
  });
  return response.data;
}

async function getBlockTraceByNumberAndTxHash(chain, blockNumber, txHash) {
  await delay(1000);
  const url = `${TRACE_BASE_URL}${chain}/block-trace/${blockNumber}/tx-hash/${txHash}`;
  const response = await axios.get(url, {
    headers: {
      'Authorization': `Bearer ${mySecret}`
    }
  });
  return response.data;
}

module.exports = {
  getSyncedInterval,
  getBlockTraceByNumber,
  getBlockTraceByNumberAndTxHash
};
