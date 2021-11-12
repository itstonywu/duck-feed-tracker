import type { NextApiRequest, NextApiResponse } from "next"
import { Entry, ResponseError, getAllEntriesFromLocation } from "@/lib/db"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const locationId = <string>req.query.locationId
    handleGET(locationId, res)
  } else {
    res.status(405)
    res.end()
  }
}

// GET /api/locations/:locationId/entries
const handleGET = async (
  locationId: string,
  res: NextApiResponse<Entry[] | ResponseError>
) => {
  try {
    const entries = await getAllEntriesFromLocation(locationId)
    res.status(200).json(entries)
  } catch (error) {
    res.status(500).json({ error: "Error fetching entries for location" })
  }
}
