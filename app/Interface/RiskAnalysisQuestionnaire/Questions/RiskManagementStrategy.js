import React, { useState, useEffect } from 'react'
import {Stack} from '@mui/material'

import YesNoQuestion from './Types/YesNoQuestion'
import SingleSelect from './Types/SingleSelect'
import MultiSelect from './Types/MultiSelect'

import { boolean, string, array } from './Common/Defaults'


export default function RiskManagementStrategy({answers, update}) {
    const [q21, setQ21] = useState({
        number: 21,
        text: "What are your risk management strategies?",
        selectOptions: [
            {value: 'acceptance', label: 'Risk acceptance'},
            {value: 'transference', label: 'Risk transference'},
            {value: 'avoidance', label: 'Risk avoidance'},
            {value: 'riduction', label: 'Risk reduction'}
        ],
        answer: array(answers[21])
    })

    const [q22, setQ22] = useState({
        number: 22,
        text: "Do you have a documented security risk assessment process, including risk acceptance criteria and risk assessment criteria?",
        trueLabel: "Yes",
        falseLabel: "No",
        answer: boolean(answers[22])
    })

    const [q23, setQ23] = useState({
        number: 23,
        text: "Are your Risk Management Processes established, managed, and agreed to by organizational stakeholders?",
        trueLabel: "Yes",
        falseLabel: "No",
        answer: boolean(answers[23])
    })

    const [q24, setQ24] = useState({
        number: 24,
        text: "What would you say is your risk tolerance?",
        selectOptions: [
            {value: 'fried', label: 'High'},
            {value: 'mashed', label: 'Medium'},
            {value: 'baked', label: 'Low '}
        ],
        answer: string(answers[24])
    })

    const [q25, setQ25] = useState({
        number: 25,
        text: "Are the significant financial losses identified if an asset is damaged/misused/becomes unavailable?",
        trueLabel: "Yes",
        falseLabel: "No",
        answer: boolean(answers[25])
    })

    const [q26, setQ26] = useState({
        number: 26,
        text: "Do you currently have documented risk mitigation strategies?",
        trueLabel: "Yes",
        falseLabel: "No",
        answer: boolean(answers[26])
    })

    useEffect(() => {
        update({
            [q21.number]: q21.answer,
            [q22.number]: q22.answer,
            [q23.number]: q23.answer,
            [q24.number]: q24.answer,
            [q25.number]: q25.answer,
            [q26.number]: q26.answer
        })
    }, [q21, q22, q23, q24, q25, q26])
    
    return (
        <div>
            <Stack spacing={2}>
                <MultiSelect question={q21} update={setQ21} />
                <YesNoQuestion question={q22} update={setQ22} />
                <YesNoQuestion question={q23} update={setQ23} />
                <SingleSelect question={q24} update={setQ24} />
                <YesNoQuestion question={q25} update={setQ25} />
                <YesNoQuestion question={q26} update={setQ26} />
            </Stack>
        </div>
    )
}
