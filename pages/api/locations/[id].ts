import type { NextApiRequest, NextApiResponse } from "next"
import { Location, Entry } from "@prisma/client"
import prisma from "@/lib/prisma"

type ResponseError = { error: string }
type Data = (Location & { entries: Entry[] }) | null
type ResponseType = Data | ResponseError

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

// GET /api/locations
const handleGET = async (id: string, res: NextApiResponse<ResponseType>) => {
  try {
    const location = await prisma.location.findUnique({
      where: { id },
      include: {
        entries: true,
      },
    })
    res.status(200).json(location)
  } catch (error) {
    res.status(500).json({ error: "Error fetching location data" })
  }
}
