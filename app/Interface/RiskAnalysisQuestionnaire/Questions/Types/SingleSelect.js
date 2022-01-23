import React from 'react'
import { MenuItem, Select } from '@mui/material'

import QuestionLabel from '../Common/QuestionLabel'

export default function SingleSelect({question, update}) {
    function handleSelectChange(e) {
        const newQuestion = {...question}
        newQuestion.answer = e.target.value
        update(newQuestion)
    }

    const defaultValue = question.answer ? question.answer : ""

    return (
        <>
            <QuestionLabel question={question} />
            <Select
                sx={{minWidth: 200, m: 1}}
                displayEmpty
                onChange={handleSelectChange}
                value={defaultValue}
            >
                <MenuItem disabled value="">
                    <em>Select something</em>
                </MenuItem>
                {question.selectOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}
            </Select>
        </>
    )
}
