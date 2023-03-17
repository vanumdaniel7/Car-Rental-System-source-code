import { Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableContainer, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, useDisclosure, Text } from "@chakra-ui/react";
const ReturnDetails = props => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <>
            <Button onClick = {onOpen} variant = "outline" colorScheme = "teal">Reciept</Button>
            <Modal isOpen = {isOpen} onClose = {onClose}>
            <ModalOverlay/>
                <ModalContent width = "90%" margin = "20px">
                    <ModalHeader>
                        <Text fontWeight = "400">Reciept</Text>
                    </ModalHeader>
                    <ModalCloseButton/>
                    <ModalBody px = {["0px", "16px"]}>
                        <TableContainer>
                            <Table variant='simple'>
                                <Thead>
                                    <Tr>
                                        <Th>Car Name</Th>
                                        <Th>{props.carname}</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    <Tr>
                                        <Td>Type</Td>
                                        <Td>{props.cartype}</Td>
                                    </Tr>
                                    <Tr>
                                        <Td>Base Amount</Td>
                                        <Td>{props.baseamount}</Td>
                                    </Tr>
                                    <Tr>
                                        <Td>Distance Travelled</Td>
                                        <Td>{parseInt(props.milemeterend) - parseInt(props.milemeterstart)}</Td>
                                    </Tr>
                                    <Tr>
                                        <Td>Rented on</Td>
                                        <Td>{props.rentedon}</Td>
                                    </Tr>
                                    <Tr>
                                        <Td>Returned on</Td>
                                        <Td>{props.returnedon}</Td>
                                    </Tr>
                                    <Tr>
                                        <Td>Per Km Charge</Td>
                                        <Td>{props.rupeeperkm}</Td>
                                    </Tr>
                                    <Tr>
                                        <Td>Per Hour Charge</Td>
                                        <Td>{props.rupeeperhour}</Td>
                                    </Tr>
                                    <Tr>
                                        <Td>Gas Consumed</Td>
                                        <Td>{props.gasconsumed}</Td>
                                    </Tr>
                                </Tbody>
                                <Tfoot>
                                    <Tr>
                                        <Th fontSize = "lg">Total Travelling Charge</Th>
                                        <Th fontSize = "lg">{props.amountpaid}</Th>
                                    </Tr>
                                </Tfoot>
                            </Table>
                        </TableContainer>
                    </ModalBody>
                    <ModalFooter>

                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default ReturnDetails;