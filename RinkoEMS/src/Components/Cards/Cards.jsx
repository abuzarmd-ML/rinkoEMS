import * as React from 'react';
import Paper from '@mui/material/Paper';

const Cards = ({ height = 200, children,width='100%' }) => {

    return (
        <Paper
            sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                height,
                width
            }}
        >

            {children}
        </Paper>
    )
}

export default Cards