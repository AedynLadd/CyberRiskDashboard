import React from 'react'
import { Box, Divider, ListItem } from '@mui/material'

import QuestionLabel from '../Common/QuestionLabel'

export default function TextQuestion({question, update}) {
    function handleChange(e) {
        const newQuestion = {...question}
        newQuestion.answer = e.target.value
        update(newQuestion)
    }

    // 

    return (
        <>
            <Box>
                <QuestionLabel question={question} />
                <input type="text" onChange={handleChange} value={question.answer}></input>
            </Box>
            <Divider variant='middle'/>
        </>
    )
}
