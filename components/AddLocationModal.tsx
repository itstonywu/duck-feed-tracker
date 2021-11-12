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

interface IFormInput {
  name: string
}

const saveLocation = async (name: string) => {
  await fetch("/api/locations", {
    method: "POST",
    body: JSON.stringify({ name }),
  })
}

const AddLocationModal: React.FunctionComponent = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast()
  const { register, reset, handleSubmit } = useForm<IFormInput>()
  const { mutate } = useSWRConfig()

  const onSubmit: SubmitHandler<IFormInput> = async ({ name }) => {
    // send a request to the API to update the source
    await saveLocation(name)

    // trigger a revalidation (refetch) to make sure our local data is correct
    mutate("/api/locations")

    toast({
      title: "Sucess!",
      description: "We've added a new location.",
      status: "success",
      duration: 5000,
      isClosable: true,
    })
    reset()
    onClose()
  }

  return (
    <>
      <Button onClick={onOpen} colorScheme="blue">
        Add Location +
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent as="form" onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader>Add Location</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input {...register("name")} placeholder="Location Name" />
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

export default AddLocationModal
