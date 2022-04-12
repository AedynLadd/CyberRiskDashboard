import {Box, Stack } from '@mui/material'
import React, { useState, useEffect } from 'react'
import YesNoQuestion from './Types/YesNoQuestion'
import ListQuestion from './Types/ListQuestion'

import { boolean, array } from './Common/Defaults'
import CheckboxList from './Types/CheckboxList'


export default function Governance({answers, update}) {
    const [q12, setQ12] = useState({
        number: 12,
        text: "Does your organization have an approved and communicated cybersecurity governance framework?",
        trueLabel: "Yes",
        falseLabel: "No",
        answer: boolean(answers[12])
    })

    const [q12_1, setQ12_1] = useState({
        number: 12.1,
        text: "Provide a list of the security policies.",
        answer: array(answers[12.1])
    })

    const [q12_2, setQ12_2] = useState({
        number: 12.2,
        text: "For each policy, check if its cybersecurity roles and responsibilities are applied internally and/or externally:",
        answer: array(answers[12.2]),
        values: array(answers[12.1])
    })

    const [q12_3, setQ12_3] = useState({
        number: 12.3,
        text: "Does your organization review the Security Governance Framework at least once a year?",
        trueLabel: "Yes",
        falseLabel: "No",
        answer: boolean(answers[12.3])
    })

    const [q13, setQ13] = useState({
        number: 13,
        text: "List the legal and regulatory policies for this organization.",
        answer: array(answers[13])
    })

    const [q13_1, setQ13_1] = useState({
        number: 13.1,
        text: "For each legal policy, check if it is applied in your organization:",
        answer: array(answers[13.1]),
        values: array(answers[13])
    })

    const [q14, setQ14] = useState({
        number: 14,
        text: "Does your organization Governance and Risk Management Processes address cybersecurity risks?",
        trueLabel: "Yes",
        falseLabel: "No",
        answer: boolean(answers[14])
    })

    useEffect(() =>{
        update({
            [q12.number]: q12.answer,
            [q12_1.number]: q12_1.answer,
            [q12_2.number]: q12_2.answer,
            [q12_3.number]: q12_3.answer,
            [q13.number]: q13.answer,
            [q13_1.number]: q13_1.answer,
            [q13.number]: q14.answer
        })
    }, [q12, q12_1, q12_2, q12_3, q13, q13_1, q14])

    useEffect(() =>{
        const newQ12_2 = {...q12_2}
        newQ12_2.values = q12_1.answer
        setQ12_2(newQ12_2)
        newQ12_2.answer = new Array(q12_1.answer.length).fill(false)
    }, [q12_1])

    useEffect(() =>{
        const newQ13_1 = {...q13_1}
        newQ13_1.values = q13.answer
        setQ13_1(newQ13_1)
        newQ13_1.answer = new Array(q13.answer.length).fill(false)
    }, [q13])

    return (
        <div>
            <Stack spacing={2}>
                <YesNoQuestion question={q12} update={setQ12} /><br/>
                { q12.answer ? 
                    <Box sx={{pl: 5}}>
                        <ListQuestion question={q12_1} update ={setQ12_1} /><br/>
                        <CheckboxList question={q12_2} update ={setQ12_2} /><br/>
                        <YesNoQuestion question={q12_3} update ={setQ12_3} /><br/>
                    </Box> : null }
                <ListQuestion question={q13} update={setQ13} /><br/>
                <CheckboxList question={q13_1} update ={setQ13_1} /><br/>
                <YesNoQuestion question={q14} update={setQ14} /><br/>
            </Stack>
        </div>
    )
}
