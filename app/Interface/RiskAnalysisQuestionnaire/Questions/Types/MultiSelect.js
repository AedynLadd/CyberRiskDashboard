import React from 'react'
import { Box, Chip, MenuItem, Select } from '@mui/material'

import QuestionLabel from '../Common/QuestionLabel'

export default function MultiSelect({question, update}) {
    function handleSelectChange(e) {
        const newQuestion = {...question}
        newQuestion.answer = e.target.value
        update(newQuestion)
    }

    function labelForValue(value) {
        return question.selectOptions.filter(x => x.value === value)[0].label;
    }

    const defaultValue = question.answer ? question.answer : []

    return (
        <>
            <QuestionLabel question={question} />
            <Select
                sx={{minWidth: 300, m: 1}}
                multiple
                displayEmpty
                onChange={handleSelectChange}
                value={defaultValue}
                renderValue={(selected) => (
                    <Box sx={{display: "flex", flexWrap: "wrap", gap: 0.5}}>
                        {selected.map((value) => (
                            <Chip
                                key={value}
                                label={labelForValue(value)}
                            />
                        ))}
                    </Box>
                )}
            >
                <MenuItem disabled value="">
                    <em>Select multiple</em>
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
