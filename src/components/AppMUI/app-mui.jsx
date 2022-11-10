import React from "react";
import AppHeader from "../Header/Header";
import { Container } from '@mui/material';
import { AppBar } from "@mui/material";

const AppMUI = () => {
    return (
        <>
        <Container>
           {/*  <AppBar/> */}
             <AppHeader /> 
            <p>Work?</p>
        </Container>
        </>
    );
};

export default AppMUI;