import React, { useState, useEffect } from 'react'
import {Box, Stack} from '@mui/material'

import TextQuestion from './types/TextQuestion'
import YesNoQuestion from './Types/YesNoQuestion'
import SingleSelect from './Types/SingleSelect'
import MultiSelect from './Types/MultiSelect'
import ListQuestion from './Types/ListQuestion'
import FileQuestion from './Types/FileQuestion'

import { boolean, string, array } from './Common/Defaults'

export default function RiskAssessment({answers, update}) {

    const [q14, setQ14] = useState({
        number: 14,
        text: "Identify your organization's critical assets:",
        answer: array(answers[14])
    })

    const [q15, setQ15] = useState({
        number: 15,
        text: "Identify the vulnerability  for each asset",
        selectOptions: [
            {value: 'fried', label: 'Fries'},
            {value: 'mashed', label: 'Mashed'},
            {value: 'baked', label: 'Baked'}
        ],
        answer: string(answers[15])
    })

    useEffect(() => {
        update({
            [q14.number]: q14.answer
        })
    }, [q14])
    
    return (
        <div>
            <Stack spacing={2}>
                <ListQuestion question={q14} update={setQ14} />
            </Stack>
        </div>
    )
}
