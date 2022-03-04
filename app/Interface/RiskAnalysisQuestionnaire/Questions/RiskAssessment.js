import React, { useState, useEffect } from 'react'
import {Stack} from '@mui/material'

import YesNoQuestion from './Types/YesNoQuestion'
import AssetQuestion from './Types/AssetQuestion'

import { boolean, array } from './Common/Defaults'

export default function RiskAssessment({answers, update}) {

    const [q15, setQ15] = useState({
        number: 15,
        text: "Identify your organization’s valuable assets:",
        subtext: "Add them and update them.",
        answer: array(answers[15])
    })

    const [q16, setQ16] = useState({
        number: 16,
        text: "To obtain your cyber threat intelligence, do you use information sharing forums and other sources?",
        falseLabel: "No",
        trueLabel: "Yes",
        answer: boolean(answers[16])
    })

    useEffect(() => {
        update({
            [q15.number]: q15.answer,
            [q16.number]: q16.answer
        })
    }, [q15, q16])
    
    return (
        <div>
            <Stack spacing={2}>
                <AssetQuestion question={q15} update={setQ15} />   
                <YesNoQuestion question={q16} update={setQ16} />
            </Stack>
        </div>
    )
}
