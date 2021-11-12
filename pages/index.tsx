import type { NextPage } from "next"
import useSWR from "swr"

import { Location } from "@/lib/db"
import fetcher from "@/utils/fetcher"
import DashboardShell from "@/components/DashboardShell"
import LocationTableSkeleton from "@/components/LocationTableSkeleton"
import LocationsTable from "@/components/LocationsTable"
import LocationsTableHeading from "@/components/LocationsTableHeading"

const Home: NextPage = () => {
  const { data } = useSWR<Array<Location & { createdAt: string }>>(
    "/api/locations",
    fetcher
  )

  if (!data) {
    return (
      <DashboardShell>
        <LocationTableSkeleton />
      </DashboardShell>
    )
  }

  return (
    <DashboardShell>
      <LocationsTableHeading />
      <LocationsTable locations={data} />
    </DashboardShell>
  )
}

export default Home
