import type { NextApiRequest, NextApiResponse } from "next"
import { Entry } from "@prisma/client"
import prisma from "../../../lib/prisma"

type ResponseError = { error: string }

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Entry[] | ResponseError>
) {
  const id = <string>req.query.id

  if (req.method === "DELETE") {
    handleDELETE(<string>id, res)
  } else {
    throw new Error("HTTP method not supported")
  }
}

// DELETE /api/entries/:id
async function handleDELETE(id: string, res: NextApiResponse) {
  try {
    const entry = await prisma.entry.delete({
      where: { id },
    })
    res.status(200).json(entry)
  } catch (error) {
    res.status(500).json({ error: "Error deleting entry" })
  }
}
