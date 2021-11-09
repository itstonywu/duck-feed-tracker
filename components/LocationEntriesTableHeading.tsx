import {
  Flex,
  Heading,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from "@chakra-ui/react"

interface Props {
  location: string
}

const LocationEntriesTableHeading: React.FunctionComponent<Props> = ({
  location,
}) => (
  <>
    <Breadcrumb>
      <BreadcrumbItem>
        <BreadcrumbLink>{location}</BreadcrumbLink>
      </BreadcrumbItem>
    </Breadcrumb>
    <Flex justifyContent="space-between">
      <Heading mb={8}>Entries</Heading>
    </Flex>
  </>
)

export default LocationEntriesTableHeading
