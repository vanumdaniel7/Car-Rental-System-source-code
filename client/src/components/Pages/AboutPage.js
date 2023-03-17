import { Flex, Text } from "@chakra-ui/react";
import Navbar from "../Navbar/Navbar";

const AboutPage = () => {
    return (
        <>
            <Navbar/>
            <Flex px = "20px" flexDirection = "column" justifyContent = {["center", "center", "left"]} width = "100%" height = "calc(100vh - 62px)">
                <Text textAlign = "center" fontWeight = "bold" fontSize = {["35px", "40px", "40px"]} color = "#39424e" position = "relative" top = {["-100px", "-100px", "50px"]}>Car Rental System</Text>
                <Text textAlign = "center" fontSize = "17px"  position = "relative" top = {["-70px", "-70px", "90px"]}>A full stack website by Vanum Daniel Priyan</Text>
                <Text textAlign = "center" position = "relative" top = {["-60px", "-60px", "100px"]}>Tech Stack Used: PostgreSQL, ExpressJS, ReactJS, NodeJS</Text>
            </Flex>
        </>
    )
}

export default AboutPage;