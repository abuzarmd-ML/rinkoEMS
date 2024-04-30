import * as React from 'react';
import Paper from '@mui/material/Paper';

const Cards = ({ height = 200, children,width='100%' , color = '#dcedc8'}) => {

    return (
        <Paper
            sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: color,
                height,
                width,
                borderRadius: 4
            }}
        >

            {children}
        </Paper>
    )
}

export default Cards