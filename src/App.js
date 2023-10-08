
import React from "react";

import { Box,VStack,Button,Container} from "@chakra-ui/react";

function App() {
  return (
    
    <Box bg={"red.100"}>
      <Container h={'100vh'} bg={"white"} >
        <VStack h={"full"} bg={"telegram.100"}>
          <Button w={"full"} colorScheme="blue">Log out</Button>
          
        </VStack>


      </Container>

    </Box>

    
  );
}

export default App;
