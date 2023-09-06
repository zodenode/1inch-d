import React, { useState } from 'react';
import {
  IconButton,
  Box,
  CloseButton,
  Flex,
  Icon,
  useColorModeValue,
  Text,
  Drawer,
  DrawerContent,
  Container,
  Button,
  VStack,
  Heading,
  useDisclosure,
  BoxProps,
  FlexProps,
} from '@chakra-ui/react';

import {
  FiHome,
  FiTrendingUp,
  FiCompass,
  FiStar,
  FiSettings,
  FiMenu,
} from 'react-icons/fi';
import { IconType } from 'react-icons';
import NFTList  from './nft-list'
import GasPrice from './gas-price'
import EVMBlockTraces from './evm-traces'
interface LinkItemProps {
  name: string;
  icon: IconType;
}

const LinkItems: Array<LinkItemProps> = [
  { name: 'Home', icon: FiHome },
  { name: 'NFT API', icon: FiTrendingUp },
  { name: 'Gas Price API', icon: FiCompass },
  { name: 'Traces API', icon: FiStar },
  
];

const Home: React.FC<{ onSelectComponent: (name: string) => void }> = ({ onSelectComponent }) => {
  return (
    <Container centerContent>
      <VStack spacing={4} align="center">
        <Heading>Welcome to the 1inch.io Demo Application</Heading>
        <Text>
          1inch.io is a leading decentralized exchange aggregator that sources liquidity from various exchanges to provide users with the best trade rates. By using our new APIs, developers can effortlessly integrate this powerful tool into their applications, ensuring users get the most value from their trades.
        </Text>
        <VStack spacing={2} width="100%" align="stretch">
          <Button onClick={() => onSelectComponent('NFT API')}>NFT API</Button>
          <Button onClick={() => onSelectComponent('Gas Price API')}>Gas Price API</Button>
          <Button onClick={() => onSelectComponent('Traces API')}>Traces API</Button>
        </VStack>
      </VStack>
    </Container>
  );
};

export default function SimpleSidebar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedComponent, setSelectedComponent] = useState<string | null>(null);

  return (
    <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
      <SidebarContent onClose={onClose}   setSelectedComponent={setSelectedComponent} display={{ base: 'none', md: 'block' }} />
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full">
        <DrawerContent>
          <SidebarContent   setSelectedComponent={setSelectedComponent} onClose={onClose} />
        </DrawerContent>
      </Drawer>

      <MobileNav display={{ base: 'flex', md: 'none' }} onOpen={onOpen} />

      <Box ml={{ base: 0, md: 60 }} p="4">
        {selectedComponent === 'Home' && <Home onSelectComponent={setSelectedComponent}/>}
        {selectedComponent === 'NFT API' && <NFTList address={""}/>}
        {selectedComponent === 'Gas Price API' && <GasPrice/>}
        {selectedComponent === 'Traces API' && <EVMBlockTraces/>}
       
      </Box>
    </Box>
  );
}

interface SidebarProps extends BoxProps {
  onClose: () => void;
  setSelectedComponent: React.Dispatch<React.SetStateAction<string | null>>;
}

const SidebarContent: React.FC<SidebarProps> = ({ onClose,setSelectedComponent, ...rest }) => {
  return (
    <Box
      bg={useColorModeValue('white', 'gray.900')}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
      {...rest}>
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          1inch Demo
        </Text>
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        <NavItem key={link.name} icon={link.icon} onSelectComponent={setSelectedComponent}>
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
}

interface NavItemProps extends FlexProps {
  icon: IconType;
  onSelectComponent: (name: string) => void;
}

const NavItem: React.FC<NavItemProps> = ({ icon, children, onSelectComponent, ...rest }) => {
  return (
    <Box
      as="a"
      href="#"
      onClick={(e) => {
        e.preventDefault();
        onSelectComponent(children as string);
      }}
      style={{ textDecoration: 'none' }}
      _focus={{ boxShadow: 'none' }}>
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: 'cyan.400',
          color: 'white',
        }}
        {...rest}>
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: 'white',
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Box>
  );
}

interface MobileProps extends FlexProps {
  onOpen: () => void;
}

const MobileNav: React.FC<MobileProps> = ({ onOpen, ...rest }) => {
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 24 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue('white', 'gray.900')}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
      justifyContent="flex-start"
      {...rest}>
      <IconButton
        variant="outline"
        onClick={onOpen}
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Text fontSize="2xl" ml="8" fontFamily="monospace" fontWeight="bold">
        Logo
      </Text>
    </Flex>
  );
}
