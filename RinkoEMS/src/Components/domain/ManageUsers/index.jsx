
import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import AdminLayout from '../../Layout/AdminLayout';
import GridContainer from '../../Container/GridContainer';
import Cards from '../../Cards/Cards';
import Title from '../../Dashboard/Title';
import Divider from '@mui/material/Divider';
import UserForm from './component/UserForm';

const ManageUsers = () => {

    return (
        <AdminLayout>
            <Box
                component="main"
                sx={{
                    backgroundColor: (theme) =>
                        theme.palette.mode === 'light'
                            ? theme.palette.grey[100]
                            : theme.palette.grey[900],
                    flexGrow: 1,
                    height: '100vh',
                    overflow: 'auto',
                }}
            >
                <Toolbar />
                <GridContainer>
                <Grid item xs={12} md={8} lg={8}>
                    <Cards  height={500}>
                     <Title  > Please enter user info </Title>
                     <Divider sx={{backgroundColor:'blue',mb:1}}/>
                     <UserForm  />
                    </Cards>
                    </Grid>
                </GridContainer>

            </Box>
        </AdminLayout>
    )

}

export default ManageUsers