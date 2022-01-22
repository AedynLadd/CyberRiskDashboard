import React from 'react'
import { Button, Box } from '@mui/material'

export default function BackNextButtons({handleBack, handleNext, isFirstStep, isLastStep}) {

    return (
        <Box sx={{ mb: 2 }}>
            <div>
                <Button
                    variant="contained"
                    onClick={handleBack}
                    disabled={isFirstStep}
                    sx={{ mt: 1, mr: 1 }}
                >
                    Back
                </Button>
                <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 1, mr: 1 }}
                >
                    { isLastStep ? 'Finish' : 'Continue' }
                </Button>
            </div>  
        </Box>
    )
}
