import * as React from 'react';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

export default function Alerts(props) {

    const [isError, setIsError] = React.useState(false)

    const { type, message,error } = props

    React.useEffect(()=>{
        if(error){
            setIsError(true)
            const timer = setTimeout(()=>{
                setIsError(false)
            },10000)

            return ()=>clearTimeout(timer)
        }

    },[error])

    if (!isError) return null

    return (
        <Stack sx={{ width: '100%' }} spacing={2}>

            <Alert variant="outlined" severity={type}>
                {message}
            </Alert>
        </Stack>
    );
}