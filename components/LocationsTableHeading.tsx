import React from "react"
import { Flex, Heading } from "@chakra-ui/react"

import AddLocationModal from "./AddLocationModal"

const LocationsTableHeading: React.FunctionComponent = () => (
  <Flex justifyContent="space-between">
    <Heading mb={8}>Locations</Heading>
    <AddLocationModal>+ Add Location</AddLocationModal>
  </Flex>
)

export default LocationsTableHeading
