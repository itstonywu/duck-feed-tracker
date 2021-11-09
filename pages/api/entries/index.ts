import type { NextApiRequest, NextApiResponse } from "next"
import { Entry, getAllEntries, createEntry, ResponseError } from "@/lib/db"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    handleGET(res)
  } else if (req.method === "POST") {
    handlePOST(req, res)
  } else {
    res.status(405)
    res.end()
  }
}

// GET /api/entries
const handleGET = async (res: NextApiResponse<Entry[] | ResponseError>) => {
  try {
    const entries = await getAllEntries()
    res.status(200).json(entries)
  } catch (error) {
    res.status(500).json({ error: "Error fetching entries" })
  }
}

// POST /api/entries
const handlePOST = async (
  req: NextApiRequest,
  res: NextApiResponse<Entry | ResponseError>
) => {
  try {
    const entry = await createEntry(JSON.parse(req.body))
    res.status(200).json(entry)
  } catch (error) {
    res.status(500).json({ error: "Error creating entry" })
  }
}
