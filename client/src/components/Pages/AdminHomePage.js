import { Box, Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import AdminNavbar from '../Admin/AdminNavbar';
import InventoryDetails from '../Admin/InventoryDetails.js';
import RentDetails from '../Admin/RentDetails.js';
import CarDetails from '../Admin/CarDetails';

const AdminHomePage = () => {
    return (
        <>
            <AdminNavbar/>
            <Box width = "100%" p = {["0px", "15px"]} py = "15px" height = "fit-content">
                <Tabs height = "max(calc(100vh - 92px), fit-content)" shadow = "md" colorScheme = "teal" width = "100%">
                    <TabList>
                        <Tab>Inventory</Tab>
                        <Tab>Rents</Tab>
                        <Tab>Cars</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                            <InventoryDetails/>
                        </TabPanel>
                        <TabPanel>
                            <RentDetails/>
                        </TabPanel>
                        <TabPanel>
                            <CarDetails/>
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Box>
        </>
    )
}

export default AdminHomePage;