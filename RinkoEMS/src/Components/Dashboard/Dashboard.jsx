import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import AdminLayout from '../Layout/AdminLayout';
import Chart from './Chart';
import Deposits from './Deposits';
import Orders from './Orders';

const CardsData = [
  {
  title:'Users Info',
  info1:"Total Admin Users : 100",
  info2:'Total General User : 300',
  link:'/mamage-users'
},
{
  title:'Employee',
  info1:"Total Active Emp : 100",
  info2:'Total In-Active Emp : 300',
  link:'/mamage-users'
},
{
  title:'Clients ',
  info1:"Total  Active Client: 100",
  info2:'Total Previous Client : 300',
  link:'/mamage-users'
},
{
  title:'Sites',
  info1:"Total Active Sites : 100",
  info2:'Total In-Active sites : 300',
  link:'/mamage-users'
},
{
  title:'Attendance ',
  info1:"Total Employee: 700",
  info2:'Complete Attendance : 300',
  info2:'Pending Attendance : 300',
  link:'/mamage-users'
},
{
  title:'Salary',
  info1:"Total Active Sites : 100",
  info2:'Total In-Active sites : 300',
  link:'/mamage-users'
},
]

const drawerWidth = 240;
export default function Dashboard() {
 

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
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              {/* Chart */}
              {/* <Grid item xs={12} md={8} lg={9}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                  }}
                >
                  <Chart />
                </Paper>
              </Grid> */}
              {/* Recent Deposits */}
              {CardsData.map((data)=>{
                return (
                  <Grid item xs={12} md={4} lg={3}>
                  <Paper
                    sx={{
                      p: 2,
                      display: 'flex',
                      flexDirection: 'column',
                      height: 200,
                    }}
                  >
                    <Deposits cardsDetails = {data}/>
                  </Paper>
                </Grid>
                )
              })}
              {/* <Grid item xs={12} md={4} lg={3}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 200,
                  }}
                >
                  <Deposits />
                </Paper>
              </Grid> */}
              {/* Recent Orders */}
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  <Orders />
                </Paper>
              </Grid>
            </Grid>
            {/* <Copyright sx={{ pt: 4 }} /> */}
          </Container>
        </Box>
        </AdminLayout>
  );
}