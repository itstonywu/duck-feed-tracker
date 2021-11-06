import type { NextApiRequest, NextApiResponse } from "next"
import { Entry } from "@prisma/client"
import prisma from "@/lib/prisma"

type ResponseError = { error: string }

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Entry[] | ResponseError>
) {
  const id = <string>req.query.id

  if (req.method === "DELETE") {
    handleDELETE(<string>id, res)
  } else {
    res.status(405)
    res.end()
  }
}

// DELETE /api/entries/:id
const handleDELETE = async (id: string, res: NextApiResponse) => {
  try {
    const entry = await prisma.entry.delete({
      where: { id },
    })
    res.status(200).json(entry)
  } catch (error) {
    res.status(500).json({ error: "Error deleting entry" })
  }
}
