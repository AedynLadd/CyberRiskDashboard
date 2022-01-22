import React from 'react'
import { Box, Divider } from '@mui/material'

import QuestionLabel from '../Common/QuestionLabel'
import Select from 'react-select'

export default function SingleSelect({question, update}) {
    function handleSelectChange(selectedOption) {
        const newQuestion = {...question}
        newQuestion.answer = selectedOption
        update(newQuestion)
    }

    const defaultValue = "value" in question.answer ? question.answer : null

    return (
        <>
            <Box>
                <QuestionLabel question={question} />
                <Select 
                    onChange={handleSelectChange}
                    defaultValue={defaultValue}
                    options={question.selectOptions}
                    placeholder="Select something"
                />
            </Box>
            <Divider variant='middle'/>
        </>
    )
}
