import React, { useState, useEffect } from 'react'
import {Box, Stack} from '@mui/material'

import YesNoQuestion from './Types/YesNoQuestion'
import MultiSelect from './Types/MultiSelect'
import ListQuestion from './Types/ListQuestion'

import { boolean, array } from './Common/Defaults'


export default function AccessControl({answers, update}) {
    const [q27, setQ27] = useState({
        number: 27,
        text: "Does your organization apply the “Least Privilege Principle” for their assets and users?",
        trueLabel: "Yes",
        falseLabel: "No",
        answer: boolean(answers[27])
    })

    const [q28, setQ28] = useState({
        number: 28,
        text: "Does your organization apply the “Need to Know” principle for their assets and users?",
        trueLabel: "Yes",
        falseLabel: "No",
        answer: boolean(answers[28])
    })

    const [q29, setQ29] = useState({
        number: 29,
        text: "Who has last accessed the assets?",
        answer: array(answers[29])
    })

    const [q30, setQ30] = useState({
        number: 30,
        text: "What are the user authentication algorithms used to authenticate user passwords when accessing assets?",
        answer: array(answers[30])
    })

    const [q31, setQ31] = useState({
        number: 31,
        text: "Are accesses periodically reviewed in order to ensure correct updates for assets?",
        trueLabel: "Yes",
        falseLabel: "No",
        answer: boolean(answers[31])
    })

    const [q32, setQ32] = useState({
        number: 32,
        text: "What type of remote access solution does your organization use?",
        answer: array(answers[32])
    })

    const [q33, setQ33] = useState({
        number: 33,
        text: "Do you utilize multi-factor authentication?",
        trueLabel: "Yes",
        falseLabel: "No",
        answer: boolean(answers[33])
    })

    const [q34, setQ34] = useState({
        number: 34,
        text: "Which authentication factors are used when accessing systems?",
        selectOptions: [
            {value: 'passwordBased', label: 'Password-based'},
            {value: 'tokenBased', label: 'Token-based'},
            {value: 'biometric', label: 'Biometric'},
            {value: 'remote', label: 'Remote'},
        ],
        answer: array(answers[34])
    })

    const [q35, setQ35] = useState({
        number: 35,
        text: "Do you have technology that alerts you in case of unauthorized access attempts from outside?",
        trueLabel: "Yes",
        falseLabel: "No",
        answer: boolean(answers[35])
    })

    const [q35_1, setQ35_1] = useState({
        number: 35.1,
        text: "Provide a list of the technologies used to alert you in case of unauthorized access attempts from outside.",
        answer: array(answers[35.1])
    })

    const [q36, setQ36] = useState({
        number: 36,
        text: "Do you have a process that covers the entire life cycle of user access management in your network?",
        trueLabel: "Yes",
        falseLabel: "No",
        answer: boolean(answers[36])
    })

    useEffect(() => {
        update({
            [q27.number]: q27.answer,
            [q28.number]: q28.answer,
            [q29.number]: q29.answer,
            [q30.number]: q30.answer,
            [q31.number]: q31.answer,
            [q32.number]: q32.answer,
            [q33.number]: q33.answer,
            [q34.number]: q34.answer,
            [q35.number]: q35.answer,
            [q35_1.number]: q35_1.answer,
            [q36.number]: q36.answer
        })
    }, [q27, q28, q29, q30, q31, q32, q33, q34, q35, q35_1, q36])
    
    return (
        <div>
            <Stack spacing={2}>
                <YesNoQuestion question={q27} update={setQ27} />
                <YesNoQuestion question={q28} update={setQ28} />
                <ListQuestion question={q29} update={setQ29} />
                <ListQuestion question={q30} update={setQ30} />
                <YesNoQuestion question={q31} update={setQ31} />
                <ListQuestion question={q32} update={setQ32} />
                <YesNoQuestion question={q33} update={setQ33} />
                <MultiSelect question={q34} update={setQ34} />
                <YesNoQuestion question={q35} update={setQ35} />
                { q35.answer ? 
                    <Box sx={{pl: 5}}>
                        <ListQuestion question={q35_1} update={setQ35_1} />
                    </Box> : null }
                <YesNoQuestion question={q36} update={setQ36} />
            </Stack>
        </div>
    )
}
