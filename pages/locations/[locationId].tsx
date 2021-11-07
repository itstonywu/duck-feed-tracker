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
import { format } from "date-fns"

const LocationEntries = ({
  locationAndEntries,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const [locationData, setLocationData] = useState<LocationWithEntries>(
    deserialize(locationAndEntries)
  )

  return (
    <ul>
      {locationData?.entries.map((entry) => (
        <li key={entry.id}>
          {`Created at: ${format(entry.createdAt, "PPpp")}, Type: ${
            entry.type
          }`}
        </li>
      ))}
    </ul>
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
