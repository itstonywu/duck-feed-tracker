import { Location, Entry } from "@prisma/client"
import prisma from "@/lib/prisma"

export type { Entry }
export type { Location }
export type EntryWithLocation = Entry & { location: Location }
export type ResponseError = { error: string }

export const getAllLocations = async (): Promise<Location[]> => {
  return await prisma.location.findMany({
    orderBy: {
      createdAt: "desc",
    },
  })
}

export const createLocation = async (name: string): Promise<Location> => {
  return await prisma.location.create({ data: { name } })
}

export const getLocationById = async (id: string): Promise<Location | null> => {
  return await prisma.location.findUnique({
    where: { id },
  })
}

export const getAllEntriesFromLocation = async (
  locationId: string
): Promise<Entry[]> => {
  return await prisma.entry.findMany({
    where: { locationId },
    orderBy: {
      createdAt: "desc",
    },
  })
}

export const getAllEntries = async (): Promise<EntryWithLocation[]> => {
  return await prisma.entry.findMany({
    include: {
      location: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  })
}

export const createEntry = async ({
  amount,
  numberOfDucks,
  type,
  locationId,
}: {
  amount: number
  numberOfDucks: number
  type: string
  locationId: string
}): Promise<Entry> => {
  return prisma.entry.create({
    data: {
      amount,
      numberOfDucks,
      type,
      location: { connect: { id: locationId } },
    },
  })
}

export const deleteEntry = async (id: string): Promise<Entry> => {
  return await prisma.entry.delete({ where: { id } })
}
