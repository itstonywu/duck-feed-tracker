import type { NextPage } from "next"
import useSWR from "swr"

import { EntryWithLocation } from "@/lib/db"
import DashboardShell from "@/components/DashboardShell"
import EntriesTable from "@/components/EntriesTable"
import EntriesTableSkeleton from "@/components/EntriesTableSkeleton"
import EntriesTableHeading from "@/components/EntriesTableHeading"
import fetcher from "@/utils/fetcher"

const Entries: NextPage = () => {
  const { data } = useSWR<(EntryWithLocation & { createdAt: string })[]>(
    "/api/entries",
    fetcher
  )

  if (!data) {
    return (
      <DashboardShell>
        <EntriesTableHeading />
        <EntriesTableSkeleton />
      </DashboardShell>
    )
  }

  return (
    <DashboardShell>
      <EntriesTableHeading />
      <EntriesTable entries={data} />
    </DashboardShell>
  )
}

export default Entries
