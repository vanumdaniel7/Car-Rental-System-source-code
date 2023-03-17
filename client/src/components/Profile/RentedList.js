import { useToast, Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption, TableContainer, Show } from '@chakra-ui/react'
import RentDetails from './RentDetails';
import { useSelector, useDispatch } from 'react-redux';
import { userActions } from "../../Store";
import { useEffect } from "react";

const RentedList = () => {
    const toast = useToast();
    const dispatch = useDispatch();
    const rentedCars = useSelector(state => state.user.rentedCars);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await fetch("http://localhost:3000/auth/rent", {
                    method: "GET",
                    mode: "cors",
                    headers: {
                        "Content-Type": "application/json",
                        "authorization": localStorage.getItem("token")
                    }
                });
                const res = await result.json();
                if(res.status === "success") {
                    dispatch(userActions.getRentedCars(res.data));
                }
                toast({
                    position: "top",
                    title: res.title,
                    description: res.info,
                    status: res.status,
                    duration: 10000,
                    isClosable: true,
                });
            } catch(err) {
                toast({
                    position: "top",
                    title: "Error",
                    description: "An error occured, please try again later",
                    status: "error",
                    duration: 10000,
                    isClosable: true,
                });
            }
        }
        fetchData();
    }, [toast, dispatch]);
    return (
        <TableContainer>
            <Table variant = "simple">
                <TableCaption>Rented Cars</TableCaption>
                <Thead>
                    <Tr>
                        <Th textAlign = "center">Car Name</Th>
                        <Show above = "475px"><Th textAlign = "center">Date Rented</Th></Show>
                        <Show above = "600px"><Th textAlign = "center">Type</Th></Show>
                        <Th textAlign = "center">Options</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {
                        rentedCars.map((rentedCar, i) => 
                            <Tr key = {i}>
                                <Td textAlign = "center">{rentedCar.carname}</Td>
                                <Show above = "475px"><Td textAlign = "center">{rentedCar.rentedon}</Td></Show>
                                <Show above = "600px"><Td textAlign = "center">{rentedCar.cartype}</Td></Show>
                                <Td textAlign = "center"><RentDetails details = {rentedCar}/></Td>
                            </Tr>
                        )
                    }
                </Tbody>
                <Tfoot>

                </Tfoot>
            </Table>
        </TableContainer>
    )
}

export default RentedList;