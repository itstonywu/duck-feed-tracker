import type { NextApiRequest, NextApiResponse } from "next"
import { Entry } from "@prisma/client"
import prisma from "@/lib/prisma"

type ResponseError = { error: string }

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    handlePOST(req, res)
  } else if (req.method === "GET") {
    handleGET(res)
  } else {
    res.status(405)
    res.end()
  }
}

// POST /api/entries
const handlePOST = async (
  req: NextApiRequest,
  res: NextApiResponse<Entry | ResponseError>
) => {
  const { amount, numberOfDucks, type, locationId } = req.body
  try {
    const entry = await prisma.entry.create({
      data: {
        amount,
        numberOfDucks,
        type,
        location: { connect: { id: locationId } },
      },
    })
    res.status(200).json(entry)
  } catch (error) {
    res.status(500).json({ error: "Error creating entry" })
  }
}

// GET /api/entries
const handleGET = async (res: NextApiResponse<Entry[] | ResponseError>) => {
  try {
    const entries = await prisma.entry.findMany()
    res.status(200).json(entries)
  } catch (error) {
    res.status(500).json({ error: "Error deleting entry" })
  }
}
