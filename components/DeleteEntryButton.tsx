import React from "react"
import useSWR, { useSWRConfig } from "swr"
import { Button } from "@chakra-ui/button"

import { Entry } from "@/lib/db"
import fetcher from "@/utils/fetcher"

interface Props {
  entryId: string
}

const deleteEntry = async (id: string) => {
  await fetch(`/api/entries/${id}`, {
    method: "DELETE",
  })
}

const DeleteEntryButton: React.FunctionComponent<Props> = ({ entryId }) => {
  const { mutate } = useSWRConfig()
  const { data } = useSWR<Entry[]>("/api/entries", fetcher)

  const handleOnClick = () => {
    const filteredEntries = data?.filter((entry) => entry.id !== entryId)
    deleteEntry(entryId)
    mutate(`/api/entries`, filteredEntries, false)
  }

  return <Button onClick={handleOnClick}>Delete</Button>
}

export default DeleteEntryButton
