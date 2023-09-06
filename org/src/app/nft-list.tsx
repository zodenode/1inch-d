import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Image,
  Center,
  Heading,
  Text,
  Stack,
  Divider,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Grid
} from '@chakra-ui/react';

type NFT = {
  id: string;
  image_url: string;
  name: string;
  description: string;
};

type NFTListProps = {
  address: string;
};

const NFTList: React.FC<NFTListProps> = ({ address }) => {
  const [nfts, setNfts] = useState<NFT[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/fetchNFTs');
        setNfts(response.data.assets);
      } catch (error) {
        console.error('Error fetching NFTs:', error);
      }
    };
    fetchData();
  }, [address]);

  return (
    <Center flexDirection="column" w="100%">
      <Heading as="h2" size="xl" mb="4">
        NFT List API Demo
      </Heading>
      
      <Grid templateColumns="repeat(3, 1fr)" gap={6} justifyContent="center">
        {nfts.map((nft) => (
          <Card maxW="sm" mt="6" key={nft.id}>
            <CardBody>
              <Image src={nft.image_url} alt={nft.name} borderRadius="lg" />
              <Stack mt="6" spacing="3">
                <Heading size="md">{nft.name}</Heading>
                <Text>{nft.description}</Text>
                {/* Example price (adjust as needed) */}
                <Text color="blue.600" fontSize="2xl">$450</Text> 
              </Stack>
            </CardBody>
            <Divider />
            <CardFooter>
              <ButtonGroup spacing="2">
                <Button variant="solid" colorScheme="blue">
                  Sell now
                </Button>
                <Button variant="ghost" colorScheme="blue">
                  Fractionalize
                </Button>
              </ButtonGroup>
            </CardFooter>
          </Card>
        ))}
      </Grid>
    </Center>
  );
};

export default NFTList;
