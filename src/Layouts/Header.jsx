import { Box, Center, Image, Text, Flex, Heading } from "@chakra-ui/react";
import Colors from "../colors.json";
import Logo from "../Assets/logo32.png";
function Header() {
  return (
    <Box
      bgGradient={`linear(to-b, ${Colors.DodgerBlue}, ${Colors.Byzantine})`}
      w="100%"
      h="5em"
    >
      <Flex align="center" justify="center" height="100%">
        <Image src={Logo} alt="logo" mr="-.5%" ml="3em"></Image>
        <Heading size="xl">jazdeo.xyz</Heading>
        <Heading size="xl" ml="41%">
          Dowiedz się więcej
        </Heading>
        <Heading size="xl" ml="4%" mr="4%">
          Niezalogowany
        </Heading>
      </Flex>
    </Box>
  );
}
export default Header;
