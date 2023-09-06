import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  Card,
  CardHeader,
  CardBody,
  Heading,
  Text,
  Stack,
  StackDivider,
  CircularProgress,
} from '@chakra-ui/react';

const GasPrice: React.FC = () => {
  const [gasPrice, setGasPrice] = useState<any>({});
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    const fetchGasPrice = async () => {
      const response = await axios.get('/gas-price');
      console.log("Gas Price requested");
      setGasPrice(response.data);
      setCountdown(10);
    };

    fetchGasPrice();

    const intervalId = setInterval(fetchGasPrice, 10000);

    const countdownInterval = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    // Cleanup the intervals when the component is unmounted
    return () => {
      clearInterval(intervalId);
      clearInterval(countdownInterval);
    };
  }, []);

  return (
    <Card>
      <CardHeader>
        <Heading size='md'>Ethereum Gas Prices</Heading>
        <CircularProgress value={countdown * 36} size='120px' />
      </CardHeader>

      <CardBody>
        <Stack divider={<StackDivider />} spacing='4'>
          <Box>
            <Heading size='xs' textTransform='uppercase'>
              Base Fee
            </Heading>
            <Text pt='2' fontSize='sm'>
              {gasPrice.baseFee}
            </Text>
          </Box>
          {gasPrice.low && (
            <>
              <Box>
                <Heading size='xs' textTransform='uppercase'>
                  Low
                </Heading>
                <Text pt='2' fontSize='sm'>
                  {gasPrice.low.maxPriorityFeePerGas} Wei
                </Text>
              </Box>
              <Box>
                <Heading size='xs' textTransform='uppercase'>
                  Medium
                </Heading>
                <Text pt='2' fontSize='sm'>
                  {gasPrice.medium.maxPriorityFeePerGas}
                </Text>
              </Box>
              <Box>
                <Heading size='xs' textTransform='uppercase'>
                  High
                </Heading>
                <Text pt='2' fontSize='sm'>
                  {gasPrice.high.maxPriorityFeePerGas}
                </Text>
              </Box>
              <Box>
                <Heading size='xs' textTransform='uppercase'>
                  Instant
                </Heading>
                <Text pt='2' fontSize='sm'>
                  {gasPrice.instant.maxPriorityFeePerGas}
                </Text>
              </Box>
            </>
          )}
        </Stack>
      </CardBody>
    </Card>
  );
};

export default GasPrice;
