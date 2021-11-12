import {
  GetStaticPaths,
  GetStaticProps,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from "next"
import { ParsedUrlQuery } from "querystring"
import { serialize, deserialize } from "superjson"
import DashboardShell from "@/components/DashboardShell"
import useSWR from "swr"

import { getAllLocations, getLocationById, Location } from "@/lib/db"
import LocationEntriesTableHeading from "@/components/LocationEntriesTableHeading"
import LocationEntriesTable from "@/components/LocationEntriesTable"
import LocationTableSkeleton from "@/components/LocationTableSkeleton"
import fetcher from "@/utils/fetcher"

const LocationEntries = ({
  locationData,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const location = deserialize<Location>(locationData)
  const { data } = useSWR(`/api/locations/${location.id}/entries`, fetcher)

  return (
    <DashboardShell>
      <LocationEntriesTableHeading location={location} />
      {data ? (
        <LocationEntriesTable entries={data} />
      ) : (
        <LocationTableSkeleton />
      )}
    </DashboardShell>
  )
}

export default LocationEntries

interface IParams extends ParsedUrlQuery {
  locationId: string
}

export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext
) => {
  const { locationId } = context.params as IParams
  const rawLocationData = await getLocationById(locationId)
  const locationData = serialize(rawLocationData)

  return {
    props: {
      locationData: locationData,
    },
    revalidate: 1,
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const locations: Location[] = await getAllLocations()
  const paths = locations.map((location) => ({
    params: { locationId: location.id },
  }))

  return {
    paths,
    fallback: true,
  }
}
