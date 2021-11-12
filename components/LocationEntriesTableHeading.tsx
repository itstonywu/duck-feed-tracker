import React from "react"
import {
  Flex,
  Heading,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from "@chakra-ui/react"

import { Location } from "@/lib/db"
import AddEntryModal from "./AddEntryModal"

interface Props {
  location: Location
}

const LocationEntriesTableHeading: React.FunctionComponent<Props> = ({
  location,
}) => {
  return (
    <>
      <Breadcrumb>
        <BreadcrumbItem>
          <BreadcrumbLink>{location.name}</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <Flex justifyContent="space-between">
        <Heading mb={8}>Entries</Heading>
        <AddEntryModal locationId={location.id} />
      </Flex>
    </>
  )
}

export default LocationEntriesTableHeading
