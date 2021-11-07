import type { NextApiRequest, NextApiResponse } from "next"
import {
  LocationWithEntries,
  getLocationAndEntries,
  ResponseError,
} from "@/lib/db"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const id = <string>req.query.id
    handleGET(id, res)
  } else {
    res.status(405)
    res.end()
  }
}

// GET /api/locations/:id
const handleGET = async (
  id: string,
  res: NextApiResponse<LocationWithEntries | ResponseError>
) => {
  try {
    const location = await getLocationAndEntries(id)
    res.status(200).json(location)
  } catch (error) {
    res.status(500).json({ error: "Error fetching location data" })
  }
}
