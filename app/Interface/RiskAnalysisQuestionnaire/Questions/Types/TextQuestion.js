import React from 'react'
import { TextField } from '@mui/material'

import QuestionLabel from '../Common/QuestionLabel'

export default function TextQuestion({question, update}) {
    function handleChange(e) {
        const newQuestion = {...question}
        newQuestion.answer = e.target.value
        update(newQuestion)
    }


    return (
        <>
            <QuestionLabel question={question} />
            <TextField
                sx={{
                    display: "flex",
                    maxWidth: 400,
                    m: 1,
                    flexWrap: 'wrap',
                    flex: 'flex-grow'
                }}
                placeholder="Enter here"
                variant="standard"
                value={question.answer}
                onChange={handleChange}
                multiline
                minRows={1}
                maxRows={5}
            ></TextField>
        </>
    )
}
