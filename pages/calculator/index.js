'use client';
import useSWR from 'swr';
import React, { useState } from "react";
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Card from "@mui/material/Card";
import Drawer from '@mui/material/Drawer';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';
import FormGroup from '@mui/material/FormGroup';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

export default function Calculator(props) {
    const [openDrawer, setOpenDrawer] = useState(false);

    const [grossAnnualIncome, setGrossAnnualIncome] = useState(0);
    const [netOperatingExpenses, setNetOperatingExpenses] = useState(0);
    const [currentMarketValue, setCurrentMarketValue] = useState(0);
    const [purchasePrice, setPurchasePrice] = useState(0);
    const [annualRentReceived, setAnnualRentReceived] = useState(0);

    const [netOperatingIncome, setNetOperatingIncome] = useState(0);
    const [capRate, setCapRate] = useState(0);
    const [roi, setRoi] = useState(0);
    const [rentalYeild, setRentalYeild] = useState(0);
    const [grossRentMultipler, setGrossRentMultipler] = useState(0);
    const [cashOnCashReturn, setCashOnCashReturn] = useState(0);

    const onChangeHandler = (val, method) => {
        const reg = /^\d+$/;
        if (reg.test(val)) {
            method(val);
        }
    };

    const calculate = () => {
        if (grossAnnualIncome && netOperatingExpenses) {
            const res = grossAnnualIncome - netOperatingExpenses;
            setNetOperatingIncome(res);
        }

        if (netOperatingIncome && currentMarketValue) {
            const res = netOperatingIncome / currentMarketValue;
            setCapRate(res);
        }

        if (annualRentReceived && currentMarketValue) {
            const res = annualRentReceived * 100 / currentMarketValue;
            setRentalYeild(res);
        }

        if (currentMarketValue && netOperatingIncome) {
            const res = currentMarketValue / netOperatingIncome;
            setGrossRentMultipler(res);
        }

        if (purchasePrice && grossAnnualIncome) {
            const res = grossAnnualIncome / purchasePrice;
            setCashOnCashReturn(res);
        }

        if (purchasePrice && currentMarketValue) {
            const res = (currentMarketValue - purchasePrice) * 100 / purchasePrice;
            setRoi(res);
        }

        setOpenDrawer(true);
    };

    const reset = () => {
        setGrossAnnualIncome(0);
        setNetOperatingExpenses(0);
        setCurrentMarketValue(0);
        setPurchasePrice(0);
        setAnnualRentReceived(0);

        setNetOperatingIncome(0);
        setCapRate(0);
        setRoi(0);
        setRentalYeild(0);
        setGrossRentMultipler(0);
        setCashOnCashReturn(0);
    };

    return (<>
        <AppBar component="nav" position="sticky" top="0">
            <Toolbar>
                <Typography
                    variant="h6"
                    component="div"
                    sx={{ flexGrow: 1, display: { xs: 'block', sm: 'block' } }}
                >
                    Real Estate Calculator
                </Typography>
            </Toolbar>
        </AppBar>
        <Box>
            <Card sx={{ minHeight: "50vh", borderRadius: '8px 8px 0 0' }}>
                <Box p="1rem">
                    <Typography variant="h6"
                        component="div">
                        Please enter following details
                    </Typography>
                </Box>
                <Divider />
                <FormGroup>
                    <Box p="1rem">
                        <TextField
                            id="netOperatingIncome"
                            label="Gross/Total Operating Income"
                            variant="standard"
                            fullWidth
                            type="tel"
                            value={grossAnnualIncome}
                            onChange={(e) => { onChangeHandler(e?.target?.value, setGrossAnnualIncome) }} />
                    </Box>
                    <Box p="1rem">
                        <TextField
                            id="netOperatingExpenses"
                            label="Net Operating Expenses"
                            variant="standard"
                            fullWidth
                            type="tel"
                            value={netOperatingExpenses}
                            onChange={(e) => { onChangeHandler(e?.target?.value, setNetOperatingExpenses) }} />
                    </Box>
                    <Box p="1rem">
                        <TextField
                            id="currentMarketValue"
                            label="Current market value/Selling Price"
                            variant="standard"
                            fullWidth
                            type="tel"
                            value={currentMarketValue}
                            onChange={(e) => { onChangeHandler(e?.target?.value, setCurrentMarketValue) }} />
                    </Box>
                    <Box p="1rem">
                        <TextField
                            id="purchasePrice"
                            label="Purchase Price"
                            variant="standard"
                            fullWidth
                            type="tel"
                            value={purchasePrice}
                            onChange={(e) => { onChangeHandler(e?.target?.value, setPurchasePrice) }} />
                    </Box>

                    <Box p="1rem">
                        <TextField
                            id="annualRentReceived"
                            label="Annual rent received"
                            variant="standard"
                            fullWidth
                            type="tel"
                            value={annualRentReceived}
                            onChange={(e) => { onChangeHandler(e?.target?.value, setAnnualRentReceived) }} />
                    </Box>

                    <Box p="1rem">
                        <Box display="flex" gap="1rem">
                            <Box flex="1">
                                <Button variant="outlined" color="error" fullWidth onClick={reset}>
                                    Clear
                                </Button>

                            </Box>
                            <Box flex="1">

                                <Button variant="contained" color="success" fullWidth onClick={calculate}>
                                    Calculate
                                </Button>

                            </Box>
                        </Box>
                    </Box>
                </FormGroup>
            </Card>
        </Box>
        <Drawer anchor="bottom" open={openDrawer} onClose={() => setOpenDrawer(false)}>
            <Card sx={{ minHeight: "50vh", borderRadius: '8px 8px 0 0' }}>
                <Box p="1rem">
                    <Typography variant="h6"
                        component="div">
                        Your Real estate ratios are:-
                    </Typography>
                </Box>
                <Divider />
                <Box>
                    <Box p="1rem">
                        <Card>
                            <List>
                                <ListItem disablePadding>
                                    <ListItemButton>
                                        <ListItemText primary="Return on Investment" />
                                        <ListItemText  sx={{textAlign: "right"}}>{roi}</ListItemText>
                                    </ListItemButton>
                                </ListItem>
                                <ListItem disablePadding>
                                    <ListItemButton component="a" href="#simple-list">
                                        <ListItemText primary="Cap Rate" />
                                        <ListItemText  sx={{textAlign: "right"}}>{capRate}</ListItemText>
                                    </ListItemButton>
                                </ListItem>
                                <ListItem disablePadding>
                                    <ListItemButton component="a" href="#simple-list">
                                        <ListItemText primary="Rental Yeild" />
                                        <ListItemText  sx={{textAlign: "right"}}>{rentalYeild}</ListItemText>
                                    </ListItemButton>
                                </ListItem>
                                <ListItem disablePadding>
                                    <ListItemButton component="a" href="#simple-list">
                                        <ListItemText primary="Gross Rent Multiplier" />
                                        <ListItemText sx={{textAlign: "right"}}>{grossRentMultipler}</ListItemText>
                                    </ListItemButton>
                                </ListItem>
                                <ListItem disablePadding>
                                    <ListItemButton component="a" href="#simple-list">
                                        <ListItemText primary="Cash on Cash return" />
                                        <ListItemText sx={{textAlign: "right"}} >{cashOnCashReturn}</ListItemText>
                                    </ListItemButton>
                                </ListItem>
                            </List>
                        </Card>
                    </Box>
                    <Box p="1rem">
                        <Button variant="contained" color="success" fullWidth onClick={() => setOpenDrawer(false)}>
                            Close
                        </Button>
                    </Box>
                </Box>
            </Card>
        </Drawer>
    </>
    );
}
