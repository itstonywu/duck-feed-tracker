import type { NextApiRequest, NextApiResponse } from "next"
import { Entry, deleteEntry, ResponseError } from "@/lib/db"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "DELETE") {
    const id = <string>req.query.id
    handleDELETE(<string>id, res)
  } else {
    res.status(405)
    res.end()
  }
}

// DELETE /api/entries/:id
const handleDELETE = async (
  id: string,
  res: NextApiResponse<Entry | ResponseError>
) => {
  try {
    const entry = await deleteEntry(id)
    res.status(200).json(entry)
  } catch (error) {
    res.status(500).json({ error: "Error deleting entry" })
  }
}
