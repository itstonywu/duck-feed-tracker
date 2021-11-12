import React from "react"
import { Table, Tr, Th, Td, Thead, Tbody } from "@chakra-ui/react"
import { format, parseISO } from "date-fns"

import { EntryWithLocation } from "@/lib/db"
import DeleteEntryButton from "./DeleteEntryButton"

interface Props {
  entries: (EntryWithLocation & { createdAt: string })[]
}

const EntriesTable: React.FunctionComponent<Props> = ({ entries }) => {
  return (
    <Table bg="white" borderRadius={8}>
      <Thead>
        <Tr borderTopLeftRadius={8} borderTopRightRadius={8}>
          <Th>Type</Th>
          <Th>Amount</Th>
          <Th>Number of Ducks</Th>
          <Th>Location</Th>
          <Th>Date Added</Th>
          <Th></Th>
        </Tr>
      </Thead>
      <Tbody>
        {entries.map(
          ({ id, type, amount, numberOfDucks, createdAt, location }) => (
            <Tr key={id}>
              <Td>{type}</Td>
              <Td>{amount}</Td>
              <Td>{numberOfDucks}</Td>
              <Td>{location.name}</Td>
              <Td>{format(parseISO(createdAt), "PPpp")}</Td>
              <Td>
                <DeleteEntryButton entryId={id} />
              </Td>
            </Tr>
          )
        )}
      </Tbody>
    </Table>
  )
}

export default EntriesTable
