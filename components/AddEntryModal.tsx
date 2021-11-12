import React from "react"
import { useForm, SubmitHandler } from "react-hook-form"
import { useSWRConfig } from "swr"
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  useToast,
  useDisclosure,
} from "@chakra-ui/react"

import { Entry } from "@/lib/db"

interface Props {
  locationId: string
}

interface IFormInput {
  type: string
  amount: number
  numberOfDucks: number
  inputError: string
}

const saveEntry = async (formEntry: IFormInput & { locationId: string }) => {
  await fetch("/api/entries", {
    method: "POST",
    body: JSON.stringify(formEntry),
  })
}

const AddEntryModal: React.FunctionComponent<Props> = ({ locationId }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast()
  const { register, reset, handleSubmit } = useForm<IFormInput>()
  const { mutate } = useSWRConfig()

  const onSubmit: SubmitHandler<IFormInput> = async (formInput) => {
    const newEntry = {
      id: "",
      createdAt: new Date(),
      locationId,
      ...formInput,
    }

    mutate(
      `/api/locations/${locationId}/entries`,
      async (cache: Entry[]) => [newEntry, ...cache],
      false
    )
    saveEntry({ ...formInput, locationId: locationId })
    mutate(`/api/entries`)
    toast({
      title: "Sucess!",
      description: "We've added a new entry.",
      status: "success",
      duration: 5000,
      isClosable: true,
    })
    reset()
  }

  return (
    <>
      <Button onClick={onOpen} colorScheme="blue">
        Add Entry +
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent as="form" onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader>Add Location</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl isRequired>
              <FormLabel>Type</FormLabel>
              <Input
                {...register("type", { required: "This is required" })}
                placeholder="Victoria"
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Amount</FormLabel>
              <Input
                {...register("amount", { required: "This is required" })}
                placeholder="10"
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Number of Ducks</FormLabel>
              <Input
                {...register("numberOfDucks", { required: "This is required" })}
                placeholder="10"
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} type="submit">
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default AddEntryModal
