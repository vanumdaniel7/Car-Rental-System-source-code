import { useToast, Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption, TableContainer, Show } from '@chakra-ui/react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../../Store';
import ReturnDetails from "./ReturnDetails";

const ReturnedList = () => {
    const toast = useToast();
    const dispatch = useDispatch();
    const returnedCars = useSelector(state => state.user.returnedCars);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await fetch("http://localhost:3000/auth/return", {
                    method: "GET",
                    mode: "cors",
                    headers: {
                        "Content-Type": "application/json",
                        "authorization": localStorage.getItem("token")
                    }
                });
                const res = await result.json();
                console.log(res);
                if(res.status === "success") {
                    dispatch(userActions.getReturnedCars(res.data));
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
                console.log(err);
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
    }, [dispatch, toast]);
    return (
        <TableContainer>
            <Table variant = 'simple'>
                <TableCaption>Returned Cars</TableCaption>
                <Thead>
                    <Tr>
                        <Th textAlign = "center">Car Name</Th>
                        <Show above = "510px"><Th textAlign = "center">Date Rented</Th></Show>
                        <Show above = "620px"><Th textAlign = "center">Type</Th></Show>
                        <Th textAlign = "center">Options</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {
                        returnedCars.map(item => 
                            <Tr key = {item.rentid}>
                                <Td textAlign = "center">{item.carname}</Td>
                                <Show above = "510px"><Td textAlign = "center">{item.rentedon}</Td></Show>
                                <Show above = "620px"><Td textAlign = "center">{item.cartype}</Td></Show>
                                <Td textAlign = "center"><ReturnDetails details = {item}/></Td>
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

export default ReturnedList;