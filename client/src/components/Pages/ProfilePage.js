import Navbar from "../Navbar/Navbar"
import ProfileCard from "../Profile/ProfileCard";
import RentedList from "../Profile/RentedList.js";
import ReturnedList from "../Profile/ReturnedList.js"
import { Flex, Tabs, TabList, TabPanels, Tab, TabPanel, Box } from "@chakra-ui/react";

const ProfilePage = () => {
    return (
        <>
            <Navbar/>
            <Flex flexDirection = "column" width = "100%" height = "fit-content" p = "10px" alignItems = "center">
                <ProfileCard/>
                <Box p = "15px" mt = "30px" width = {["100%", "100%", "100%"]} maxW = "800px" height = "fit-content" shadow = "md" borderRadius = "5px">
                    <Tabs colorScheme = "teal" width = "100%">
                        <TabList>
                            <Tab>Rented</Tab>
                            <Tab>Returned</Tab>
                        </TabList>
                        <TabPanels>
                            <TabPanel height = "fit-content">
                                <RentedList/>
                            </TabPanel>
                            <TabPanel height = "fit-content">
                                <ReturnedList/>
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                </Box>
            </Flex>
        </>
    )
}

export default ProfilePage;