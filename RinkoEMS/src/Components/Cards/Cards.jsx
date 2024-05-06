import * as React from 'react';
import Paper from '@mui/material/Paper';

const Cards = ({ height = 200,borderRadius=4, children,width='100%' , color = 'white'}) => {

    return (
        <Paper
            sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: color,
                height,
                width,
                borderRadius
            }}
        >

            {children}
        </Paper>
    )
}

export default Cards