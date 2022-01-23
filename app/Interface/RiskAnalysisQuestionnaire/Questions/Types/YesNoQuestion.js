import { Stack, Switch, Typography } from '@mui/material'
import React from 'react'

import QuestionLabel from '../Common/QuestionLabel'

export default function YesNoQuestion({question, update}) {

    const falseLabel = question.falseLabel ? question.falseLabel : "No";
    const trueLabel = question.trueLabel ? question.trueLabel : "Yes";

    function handleChange(e) {
        const newQuestion = {...question}
        newQuestion.answer = e.target.checked
        update(newQuestion)
    }

    return (
        <>
            <QuestionLabel question={question} />
            <Stack direction="row" alignItems="center" sx={{m: 1}}>
                <Typography>{falseLabel}</Typography>
                <Switch checked={question.answer} onChange={handleChange} />
                <Typography>{trueLabel}</Typography>
            </Stack>
        </>
    )
}
