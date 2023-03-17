import { Box, Flex, Text, useToast } from "@chakra-ui/react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { userActions } from "../../Store";
import ChangeProfileForm from "./ChangeProfileForm";
import RechargeBalance from "./RechargeBalance";

const ProfileCard = () => {
    const toast = useToast();
    const dispatch = useDispatch();
    const userData = useSelector(state => state.user);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await fetch("http://localhost:3000/auth/profile", {
                    method: "GET",
                    mode: "cors",
                    headers: {
                        "Content-Type": "application/json",
                        "authorization": localStorage.getItem("token")
                    }
                });
                const res = await result.json();
                if(res.status === "success") {
                    const data = {
                        name: res.data.name,
                        email: res.data.email,
                        dateJoined: res.data.datejoined,
                        balance: res.data.balance
                    };
                    dispatch(userActions.setProfileData(data));
                }
                toast({
                    position: "top",
                    title: res.title,
                    description: res.info,
                    status: res.status,
                    duration: 10000,
                    isClosable: true
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
        <Flex position = "relative" borderWidth = "1px" borderRadius = "5px" shadow = "md" flexDirection = {["column"]} width = {["100%", "100%", "758px"]} height = {["150px"]}>
            <Text width = "250px" overflow = "hidden" height = "35px" position = "relative" top = "15px" left = "15px" fontWeight = "700" fontSize = "21px">{userData.name}</Text>
            <Text width = "fit-content" position = "relative" top = "20px" left = "15px" fontSize = "15px">{userData.email}</Text>
            <Text width = "fit-content" position = "relative" top = "35px" left = "15px" fontWeight = "100" fontSize = "14px">Joined on {userData.dateJoined}</Text>
            <Text width = "fit-content" position = "relative" top = "40px" left = "15px" fontWeight = "100" fontSize = "14px">Balance: {userData.balance}</Text>
            <Box width = "fit-content" height = "fit-content" position = "absolute" right={["20px", "20px"]} top="105px">
                <RechargeBalance/>
            </Box>
            <Box width = "fit-content" height = "fit-content" position = "absolute" right={["20px", "20px"]} top="20px">
                <ChangeProfileForm/>
            </Box>
        </Flex>
    )
}

export default ProfileCard;