import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';

const Item = styled(Box)(({ theme }) => ({

    padding: theme.spacing(1),
    textAlign: 'center',

}));

export default function AttendanceInput() {
    return (
        <Card variant="outlined">
            <CardContent>
                <Typography gutterBottom variant="h4" component="h3" >
                    Weekely Attendence
                </Typography>
                <Typography gutterBottom variant="p" component="h4">
                    Breakdown of hours logged per day this week
                </Typography>
                <br />

                <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={3} md={2}>
                            {/* <div> */}
                                <Typography gutterBottom variant="p" component="p">
                                    Date Range
                                </Typography>
                                <Typography gutterBottom variant="p" component="h5">
                                    Aprl 10 - Aprl 16
                                </Typography>
                            {/* </div> */}
                        </Grid>
                        <Grid item xs={9}>
                            <Grid container item spacing={1}>
                                <Grid item xs>
                                    <Item>
                                        <Typography gutterBottom variant="p" component="p">
                                            Monday
                                        </Typography>
                                        <TextField id="outlined-basic" variant="outlined" />
                                    </Item>
                                </Grid>
                                <Grid item xs>
                                    <Item>
                                        <Typography gutterBottom variant="p" component="p">
                                            Monday
                                        </Typography>
                                        <TextField id="outlined-basic" variant="outlined" />
                                    </Item>
                                </Grid>
                                <Grid item xs>
                                    <Item>
                                        <Typography gutterBottom variant="p" component="p">
                                            Monday
                                        </Typography>
                                        <TextField id="outlined-basic" variant="outlined" />
                                    </Item>
                                </Grid>
                                <Grid item xs>
                                    <Item>
                                        <Typography gutterBottom variant="p" component="p">
                                            Monday
                                        </Typography>
                                        <TextField id="outlined-basic" variant="outlined" />
                                    </Item>
                                </Grid>
                                <Grid item xs>
                                    <Item>
                                        <Typography gutterBottom variant="p" component="p">
                                            Monday
                                        </Typography>
                                        <TextField id="outlined-basic" variant="outlined" />
                                    </Item>
                                </Grid>
                                <Grid item xs>
                                    <Item>
                                        <Typography gutterBottom variant="p" component="p">
                                            Monday
                                        </Typography>
                                        <TextField id="outlined-basic" variant="outlined" />
                                    </Item>
                                </Grid>
                                <Grid item xs>
                                    <Item>
                                        <Typography gutterBottom variant="p" component="p">
                                            Monday
                                        </Typography>
                                        <TextField id="outlined-basic" variant="outlined" />
                                    </Item>
                                </Grid>
                            </Grid>
                        </Grid>



                    </Grid>
                </Box>

            </CardContent>
        </Card>
    );
}