import React from "react"
import { Flex, Link } from "@chakra-ui/layout"
import NextLink from "next/link"

const Nav = () => {
  return (
    <Flex
      alignItems="center"
      justifyContent="space-between"
      pt={4}
      pb={4}
      maxW="1250px"
      w="full"
      px={8}
    >
      <Flex>
        <NextLink href="/" passHref>
          <Link mr={4}>Locations</Link>
        </NextLink>
        <NextLink href="/entries" passHref>
          <Link>Entries</Link>
        </NextLink>
      </Flex>
    </Flex>
  )
}

export default Nav
