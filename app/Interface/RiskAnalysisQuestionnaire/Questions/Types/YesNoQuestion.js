import { Box, Divider } from '@mui/material'
import React from 'react'

import QuestionLabel from '../Common/QuestionLabel'

export default function YesNoQuestion({question, update}) {
    function handleChange(e) {
        const newQuestion = {...question}
        newQuestion.answer = e.target.checked
        update(newQuestion)
    }

    return (
        <>
            <Box>
                <QuestionLabel question={question} />
                <input type="checkbox" onChange={handleChange} checked={question.answer}></input>
            </Box>
            <Divider variant='middle'/>
        </>
    )
}
