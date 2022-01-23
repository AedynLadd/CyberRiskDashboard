import { Box, List } from '@mui/material';
import React from 'react';
import QuestionLabel from '../Common/QuestionLabel';

export default function ListQuestion({question, update}) {
    return (
        <>
            <QuestionLabel question={question} />
            <Box sx={{m: 1}}>
                <List>

                </List>
            </Box>
        </>
    );
}
