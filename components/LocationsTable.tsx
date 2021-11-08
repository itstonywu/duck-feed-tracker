import { Location } from "@prisma/client"
import { Table, Tr, Th, Td, Thead, Tbody } from "@chakra-ui/react"
import { format, parseISO } from "date-fns"

interface Props {
  locations: Array<Location & { createdAt: string }>
}

const LocationsTable: React.FunctionComponent<Props> = ({ locations }) => {
  return (
    <Table bg="white" borderRadius={8}>
      <Thead>
        <Tr borderTopLeftRadius={8} borderTopRightRadius={8}>
          <Th>Name</Th>
          <Th>View Entries</Th>
          <Th>Date Added</Th>
        </Tr>
      </Thead>
      <Tbody>
        {locations.map(({ id, name, createdAt }) => (
          <Tr key={id}>
            <Td>{name}</Td>
            <Td>Link</Td>
            <Td>{format(parseISO(createdAt), "PPpp")}</Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  )
}

export default LocationsTable
