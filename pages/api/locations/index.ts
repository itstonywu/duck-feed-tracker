import type { NextApiRequest, NextApiResponse } from "next"
import { Location } from "@prisma/client"
import prisma from "@/lib/prisma"

type ResponseError = { error: string }

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    handleGET(res)
  } else if (req.method === "POST") {
    const { name } = req.body
    handlePOST(name, res)
  } else {
    res.status(405)
    res.end()
  }
}

// GET /api/locations
const handleGET = async (res: NextApiResponse<Location[] | ResponseError>) => {
  try {
    const locations = await prisma.location.findMany()
    res.status(200).json(locations)
  } catch (error) {
    res.status(500).json({ error: "Error fetching locations" })
  }
}

// POST /api/locations
const handlePOST = async (
  name: string,
  res: NextApiResponse<Location | ResponseError>
) => {
  try {
    const location = await prisma.location.create({
      data: {
        name,
      },
    })
    res.status(200).json(location)
  } catch (error) {
    res.status(500).json({ error: "Error creating location" })
  }
}
