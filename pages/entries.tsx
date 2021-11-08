import type { NextPage } from "next"
import useSWR from "swr"
import fetcher from "@/utils/fetcher"
import DashboardShell from "@/components/DashboardShell"
import EntriesTable from "@/components/EntriesTable"
import { EntryWithLocation } from "@/lib/db"
import EntriesTableSkeleton from "@/components/EntriesTableSkeleton"

const Entries: NextPage = () => {
  const { data } = useSWR<(EntryWithLocation & { createdAt: string })[]>(
    "/api/entries",
    fetcher
  )

  if (!data) {
    return (
      <DashboardShell>
        <EntriesTableSkeleton />
      </DashboardShell>
    )
  }

  return (
    <DashboardShell>
      <EntriesTable entries={data} />
    </DashboardShell>
  )
}

export default Entries
