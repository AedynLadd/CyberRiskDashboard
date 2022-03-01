import {Box, Stack } from '@mui/material'
import React, { useState, useEffect } from 'react'
import YesNoQuestion from './Types/YesNoQuestion'
import ListQuestion from './Types/ListQuestion'

import { boolean, array } from './Common/Defaults'
import CheckboxList from './Types/CheckboxList'


export default function Governance({answers, update}) {
    const [q11, setQ11] = useState({
        number: 11,
        text: "Does your organization have an approved and communicated cybersecurity governance framework?",
        trueLabel: "Yes",
        falseLabel: "No",
        answer: boolean(answers[11])
    })

    const [q11_1, setQ11_1] = useState({
        number: 11.1,
        text: "Provide a list of the security policies.",
        answer: array(answers[11.1])
    })

    const [q11_2, setQ11_2] = useState({
        number: 11.2,
        text: "For each policy, check if its cybersecurity roles and responsibilities are applied internally and/or externally?",
        answer: array(answers[11.2]),
        values: array(answers[11.1])
    })

    const [q11_3, setQ11_3] = useState({
        number: 11.3,
        text: "Does your organization review the Security Governance Framework at least once a year?",
        trueLabel: "Yes",
        falseLabel: "No",
        answer: boolean(answers[11.3])
    })

    const [q12, setQ12] = useState({
        number: 12,
        text: "List the legal and regulatory policies for this organization.",
        answer: array(answers[4])
    })

    const [q13, setQ13] = useState({
        number: 13,
        text: "Does your organization Governance and Risk Management Processes address cybersecurity risks?",
        trueLabel: "Yes",
        falseLabel: "No",
        answer: boolean(answers[13])
    })

    useEffect(() =>{
        update({
            [q11.number]: q11.answer,
            [q11_1.number]: q11_1.answer,
            [q11_2.number]: q11_2.answer,
            [q11_3.number]: q11_3.answer,
            [q12.number]: q12.answer,
            [q13.number]: q13.answer
        })
    }, [q11, q11_1, q11_2, q11_3, q12, q13])

    useEffect(() =>{
        const newQ11_2 = {...q11_2}
        newQ11_2.values = q11_1.answer
        setQ11_2(newQ11_2)
        newQ11_2.answer = new Array(q11_1.answer.length).fill(false)
    }, [q11_1])

    return (
        <div>
            <Stack spacing={2}>
                <YesNoQuestion question={q11} update={setQ11} />
                { q11.answer ? 
                    <Box sx={{pl: 5}}>
                        <ListQuestion question={q11_1} update ={setQ11_1} />
                        <CheckboxList question={q11_2} update ={setQ11_2} />
                        <YesNoQuestion question={q11_3} update ={setQ11_3} />
                    </Box> : null }
                <ListQuestion question={q12} update={setQ12} />
                <YesNoQuestion question={q13} update={setQ13} />
            </Stack>
        </div>
    )
}
