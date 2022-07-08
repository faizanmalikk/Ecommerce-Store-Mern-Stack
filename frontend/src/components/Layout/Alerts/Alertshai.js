
import React,{ useState } from 'react'
import { Alert, Box, IconButton, styled, Typography, useMediaQuery } from '@mui/material';
import { CloseOutlined } from '@mui/icons-material'

const StyledBox = styled(Box)({

    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    zIndex: '200',
    position: 'fixed',
    bottom: '0px',
    margin: '0 auto',
    left: '50%',
    transform: 'translate(-50%,0)',
    textAlign: 'center'

})
const Alertshai = ({ severity, text }) => {
    const [open, setOpen] = useState(true);
    const isLargerThan445 = useMediaQuery('(max-width: 445px)')

    setTimeout(() => {
        setOpen(false)
    }, 3000);

    return (

        <>
            <StyledBox >
                <Box display={open == false || isLargerThan445 == true ? 'none' : 'flex'}>
                    <Alert severity={severity} color={severity} sx={{ borderRadius: '100px', mb: 2 }}
                        action={
                            <IconButton
                                aria-label="close"
                                color="inherit"
                                sx={{ fontSize: { xs: '18px', sm: '22px' }, marginTop: '-4px' }}
                                onClick={() => {
                                    setOpen(false);
                                }}
                            >
                                <CloseOutlined fontSize="inherit" />
                            </IconButton>
                        }

                    >
                        <Typography sx={{ fontSize: { xs: '14px', sm: '14px' } }} >
                            {text}

                        </Typography>
                    </Alert>
                </Box>
            </StyledBox>
        </>

    );
}




export default Alertshai