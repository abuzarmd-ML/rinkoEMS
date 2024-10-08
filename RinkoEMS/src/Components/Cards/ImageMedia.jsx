import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';

const Item = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
 
}));

export default function ImgMediaCard() {
  return (
    <Card variant="outlined">
      <CardContent>
        <Typography gutterBottom variant="h4" component="h3" >
         Md Abuzar
        </Typography>
        <Typography gutterBottom variant="p" component="h4">
         Software Developer
        </Typography>
       <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={3}>
         <Item>
         <Typography gutterBottom variant="h3" component="h3" ali>
         75
        </Typography>
        <Typography gutterBottom variant="p" component="h4">
          Hours logged
        </Typography>
        </Item>
        </Grid>
         <Grid item xs={3}>
       <Item>
         <Typography gutterBottom variant="h3" component="h3" ali>
         10
        </Typography>
        <Typography gutterBottom variant="p" component="h4">
          Days Worked
        </Typography>
        </Item>
        </Grid>
        <Grid item xs={3}>
        <Item>
         <Typography gutterBottom variant="h3" component="h3" ali>
         25,500
        </Typography>
        <Typography gutterBottom variant="p" component="h4">
          Earnings
        </Typography>
        </Item>
        </Grid>
        <Grid item xs={3}>
        <Item>
         <Typography gutterBottom variant="h3" component="h3" ali>
         100%
        </Typography>
        <Typography gutterBottom variant="p" component="h4">
          Attendence
        </Typography>
        </Item>
        </Grid>
        
      </Grid>
    </Box> 
       
      </CardContent>
    </Card>
  );
}

