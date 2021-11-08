import type { NextPage } from "next"
import useSWR from "swr"
import fetcher from "@/utils/fetcher"
import { Location } from "@prisma/client"
import DashboardShell from "@/components/DashboardShell"
import LocationTableSkeleton from "@/components/LocationTableSkeleton"
import LocationsTable from "@/components/LocationsTable"

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
      <LocationsTable locations={data} />
    </DashboardShell>
  )
}

export default Home
