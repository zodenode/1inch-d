import React, { useState } from 'react';
import axios from 'axios';
import {
  Box,
  Button,
  Select,
  Input,
  FormControl,
  FormLabel,
  Textarea,
  VStack,
  Heading
} from '@chakra-ui/react';

const EVMBlockTraces = () => {
  const [chain, setChain] = useState<string>("1");
  const [blockNumber, setBlockNumber] = useState('');
  const [txHash, setTxHash] = useState('');
  const [result, setResult] = useState<string | null>(null);

  const fetchSyncedInterval = async () => {
    try {
      const response = await axios.get(`/synced-interval/${chain}`);
      setResult(response.data);
    } catch (error) {
      console.error('Error fetching synced interval.', error);
      setResult('Error fetching synced interval.');
    }
  };

  const fetchBlockTrace = async () => {
    try {
      const response = await axios.get(`/block-trace/${chain}/${blockNumber}`);
      setResult(response.data);
    } catch (error) {
      console.error('Error fetching block trace.', error);
      setResult('Error fetching block trace.');
    }
  };

  const fetchTransactionTrace = async () => {
    try {
      const response = await axios.get(`/block-trace/${chain}/${blockNumber}/${txHash}`);
      setResult(response.data);
    } catch (error) {
      console.error('Error fetching transaction trace.', error);
      setResult('Error fetching transaction trace.');
    }
  };

  const handleSubmit = () => {
    if (txHash) {
      fetchTransactionTrace();
    } else {
      fetchBlockTrace();
    }
  };

  return (
    <Box p={4}>
      <Heading mb={6}>EVM Block Traces</Heading>
      <VStack spacing={4} align="stretch">
        <FormControl>
          <FormLabel>Chain</FormLabel>
          <Select
            placeholder="Select chain"
            value={chain}
            onChange={e => setChain(e.target.value)}
          >
            {/* Here you display the human-readable name but set the value to the chain ID */}
            <option value="1">Ethereum</option>
            <option value="56">Binance Smart Chain</option>
            {/* Add other chains here */}
          </Select>
        </FormControl>
        <FormControl>
          <FormLabel>Block Number</FormLabel>
          <Input value={blockNumber} onChange={e => setBlockNumber(e.target.value)} />
        </FormControl>
        <FormControl>
          <FormLabel>Transaction Hash (Optional)</FormLabel>
          <Input value={txHash} onChange={e => setTxHash(e.target.value)} />
        </FormControl>
        <Button colorScheme="blue" onClick={handleSubmit}>Fetch Trace</Button>
        {result && (
          <Textarea value={JSON.stringify(result, null, 2)} isReadOnly={true} h="400px" />
        )}
      </VStack>
    </Box>
  );
};

export default EVMBlockTraces;