import { Box, Typography } from '@mui/material'
import React from 'react'

export default function QuestionLabel({question}) {
    return (
        <Box sx={{ paddingBottom: 2 }}>
            <Typography variant="h5" sx={{marginBottom: 1}}>
                Q{question.number}. {question.text}
            </Typography>
            <Typography variant="subtitle2" sx={{marginLeft: 3}}>
                {question.subtext}
            </Typography>
        </Box>
    )
}
