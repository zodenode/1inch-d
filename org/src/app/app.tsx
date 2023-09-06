// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ChakraProvider } from "@chakra-ui/react";

import NxWelcome from './nx-welcome';

export function App() {
  return (
    <ChakraProvider>
      <NxWelcome title="org" />
    </ChakraProvider>
  );
}

export default App;
