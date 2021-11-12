import React from "react"
import { Flex, Heading } from "@chakra-ui/react"

const EntriesTableHeading: React.FunctionComponent = () => (
  <Flex justifyContent="space-between">
    <Heading mb={8}>All Entries</Heading>
  </Flex>
)

export default EntriesTableHeading
