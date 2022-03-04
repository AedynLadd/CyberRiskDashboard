import React, { useState, useEffect } from 'react'
import {Box, Stack} from '@mui/material'

import YesNoQuestion from './Types/YesNoQuestion'
import MultiSelect from './Types/MultiSelect'
import ListQuestion from './Types/ListQuestion'

import { boolean, array } from './Common/Defaults'


export default function AccessControl({answers, update}) {
    const [q23, setQ23] = useState({
        number: 23,
        text: "Does your organization apply the “Least Privilege Principle” for their assets and users?",
        trueLabel: "Yes",
        falseLabel: "No",
        answer: boolean(answers[23])
    })

    const [q24, setQ24] = useState({
        number: 24,
        text: "Does your organization apply the “Need to Know” principle for their assets and users?",
        trueLabel: "Yes",
        falseLabel: "No",
        answer: boolean(answers[24])
    })

    const [q25, setQ25] = useState({
        number: 25,
        text: "Who has last accessed the assets?",
        answer: array(answers[25])
    })

    const [q26, setQ26] = useState({
        number: 26,
        text: "What are the user authentication algorithms used to authenticate user passwords when accessing assets?",
        answer: array(answers[26])
    })

    const [q27, setQ27] = useState({
        number: 27,
        text: "Are accesses periodically reviewed in order to ensure correct updates for assets?",
        trueLabel: "Yes",
        falseLabel: "No",
        answer: boolean(answers[27])
    })

    const [q28, setQ28] = useState({
        number: 28,
        text: "What type of remote access solution does your organization use?",
        answer: array(answers[28])
    })

    const [q29, setQ29] = useState({
        number: 29,
        text: "Do you utilize multi-factor authentication?",
        trueLabel: "Yes",
        falseLabel: "No",
        answer: boolean(answers[29])
    })

    const [q30, setQ30] = useState({
        number: 30,
        text: "Which authentication factors are used when accessing systems?",
        selectOptions: [
            {value: 'passwordBased', label: 'Password-based'},
            {value: 'tokenBased', label: 'Token-based'},
            {value: 'biometric', label: 'Biometric'},
            {value: 'remote', label: 'Remote'},
        ],
        answer: array(answers[30])
    })

    const [q31, setQ31] = useState({
        number: 31,
        text: "Do you have technology that alerts you in case of unauthorized access attempts from outside?",
        trueLabel: "Yes",
        falseLabel: "No",
        answer: boolean(answers[31])
    })

    const [q31_1, setQ31_1] = useState({
        number: 31.1,
        text: "Provide a list of the technologies used to alert you in case of unauthorized access attempts from outside.",
        answer: array(answers[31.1])
    })

    const [q32, setQ32] = useState({
        number: 32,
        text: "Do you have a process that covers the entire life cycle of user access management in your network?",
        trueLabel: "Yes",
        falseLabel: "No",
        answer: boolean(answers[32])
    })

    useEffect(() => {
        update({
            [q23.number]: q23.answer,
            [q24.number]: q24.answer,
            [q25.number]: q25.answer,
            [q26.number]: q26.answer,
            [q27.number]: q27.answer,
            [q28.number]: q28.answer,
            [q29.number]: q29.answer,
            [q30.number]: q30.answer,
            [q31.number]: q31.answer,
            [q31_1.number]: q31_1.answer,
            [q32.number]: q32.answer
        })
    }, [q23, q24, q25, q26, q27, q28, q29, q30, q31, q31_1, q32])
    
    return (
        <div>
            <Stack spacing={2}>
                <YesNoQuestion question={q23} update={setQ23} />
                <YesNoQuestion question={q24} update={setQ24} />
                <ListQuestion question={q25} update={setQ25} />
                <ListQuestion question={q26} update={setQ26} />
                <YesNoQuestion question={q27} update={setQ27} />
                <ListQuestion question={q28} update={setQ28} />
                <YesNoQuestion question={q29} update={setQ29} />
                <MultiSelect question={q30} update={setQ30} />
                <YesNoQuestion question={q31} update={setQ31} />
                { q31.answer ? 
                    <Box sx={{pl: 5}}>
                        <ListQuestion question={q31_1} update={setQ31_1} />
                    </Box> : null }
                <YesNoQuestion question={q32} update={setQ32} />
            </Stack>
        </div>
    )
}
