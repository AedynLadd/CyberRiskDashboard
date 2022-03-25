import React from 'react'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function Intro() {
  return (
      <Box ml={1}>  
        <Typography variant="subtitle1" component="div" gutterBottom>
            This Risk Assessment Questionnaire tailors your dashboard to present possible risks in your organization based on environmental data. 
            Questions about the nature of the organization and its practices will help to determine your organization's posture 
            with respect to cyber security standards set by The National Institue of Standards and Technology (NIST).
        </Typography>
      </Box>
  )
}
