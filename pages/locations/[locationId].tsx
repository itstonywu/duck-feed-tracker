import {
  getAllLocations,
  getLocationAndEntries,
  LocationWithEntries,
} from "@/lib/db"
import { useState } from "react"
import {
  GetStaticPaths,
  GetStaticProps,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from "next"
import { Location } from "@prisma/client"
import { ParsedUrlQuery } from "querystring"
import { serialize, deserialize } from "superjson"
import DashboardShell from "@/components/DashboardShell"
import LocationEntriesTable from "@/components/LocationEntriesTable"
import LocationEntriesTableHeading from "@/components/LocationEntriesTableHeading"

const LocationEntries = ({
  locationAndEntries,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const locationData: LocationWithEntries = deserialize(locationAndEntries)

  return (
    <DashboardShell>
      <LocationEntriesTableHeading location={locationData!.name} />
      <LocationEntriesTable entries={locationData!.entries} />
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
  const data = await getLocationAndEntries(locationId)
  const serializedData = serialize(data)

  return {
    props: {
      locationAndEntries: serializedData,
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
