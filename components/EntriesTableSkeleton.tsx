import React from "react"
import {
  Box,
  Skeleton,
  Table,
  Tr,
  Th,
  Td,
  Thead,
  Tbody,
} from "@chakra-ui/react"

const SkeletonRow: React.FunctionComponent<{ width: string }> = ({ width }) => {
  return (
    <Box as="tr">
      <Td>
        <Skeleton h={2} w={width} my={2} />
      </Td>
      <Td>
        <Skeleton h={2} w={width} my={2} />
      </Td>
      <Td>
        <Skeleton h={2} w={width} my={2} />
      </Td>
      <Td>
        <Skeleton h={2} w={width} my={2} />
      </Td>
      <Td>
        <Skeleton h={2} w={width} my={2} />
      </Td>
      <Td>
        <Skeleton h={2} w={width} my={2} />
      </Td>
    </Box>
  )
}

const EntriesTableSkeleton = () => {
  return (
    <Table bg="white" borderRadius={8}>
      <Thead>
        <Tr borderTopLeftRadius={8} borderTopRightRadius={8}>
          <Th>Type</Th>
          <Th>Amount</Th>
          <Th>Number of Ducks</Th>
          <Th>Location</Th>
          <Th>Date Added</Th>
        </Tr>
      </Thead>
      <Tbody>
        <SkeletonRow width="70%" />
        <SkeletonRow width="50%" />
        <SkeletonRow width="30%" />
        <SkeletonRow width="60%" />
        <SkeletonRow width="40%" />
      </Tbody>
    </Table>
  )
}

export default EntriesTableSkeleton
