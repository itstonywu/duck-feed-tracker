import { Flex, Link, Box } from "@chakra-ui/layout"
import NextLink from "next/link"

const Nav: React.FunctionComponent = () => {
  return (
    <Box bg="white" w="full" mb={8}>
      <Flex
        alignItems="center"
        justifyContent="left"
        pt={4}
        pb={4}
        maxW="1250px"
        margin="0 auto"
        px={8}
      >
        <NextLink href="/" passHref>
          <Link mr={4}>Locations</Link>
        </NextLink>
        <NextLink href="/entries" passHref>
          <Link>Entries</Link>
        </NextLink>
      </Flex>
    </Box>
  )
}

export default Nav
