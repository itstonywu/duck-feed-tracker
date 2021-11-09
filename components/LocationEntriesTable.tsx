import { Table, Tr, Th, Td, Thead, Tbody } from "@chakra-ui/react"
import { format } from "date-fns"
import { Entry } from "@/lib/db"

interface Props {
  entries: Entry[]
}

const LocationEntriesTable: React.FunctionComponent<Props> = ({ entries }) => {
  return (
    <Table bg="white" borderRadius={8}>
      <Thead>
        <Tr borderTopLeftRadius={8} borderTopRightRadius={8}>
          <Th>Type</Th>
          <Th>Amount</Th>
          <Th>Number of Ducks</Th>
          <Th>Date Added</Th>
        </Tr>
      </Thead>
      <Tbody>
        {entries.map(({ id, type, amount, numberOfDucks, createdAt }) => (
          <Tr key={id}>
            <Td>{type}</Td>
            <Td>{amount}</Td>
            <Td>{numberOfDucks}</Td>
            <Td>{format(createdAt, "PPpp")}</Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  )
}

export default LocationEntriesTable
