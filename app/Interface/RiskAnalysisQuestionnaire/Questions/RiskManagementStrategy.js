import React, { useState, useEffect } from 'react'
import {Stack} from '@mui/material'

import YesNoQuestion from './Types/YesNoQuestion'
import SingleSelect from './Types/SingleSelect'
import MultiSelect from './Types/MultiSelect'

import { boolean, string, array } from './Common/Defaults'


export default function RiskManagementStrategy({answers, update}) {
    const [q17, setQ17] = useState({
        number: 17,
        text: "What are your risk management strategies?",
        selectOptions: [
            {value: 'acceptance', label: 'Risk acceptance'},
            {value: 'transference', label: 'Risk transference'},
            {value: 'avoidance', label: 'Risk avoidance'},
            {value: 'riduction', label: 'Risk reduction'}
        ],
        answer: array(answers[17])
    })

    const [q18, setQ18] = useState({
        number: 18,
        text: "Do you have a documented security risk assessment process, including risk acceptance criteria and risk assessment criteria?",
        trueLabel: "Yes",
        falseLabel: "No",
        answer: boolean(answers[18])
    })

    const [q19, setQ19] = useState({
        number: 19,
        text: "Are your Risk Management Processes established, managed, and agreed to by organizational stakeholders?",
        trueLabel: "Yes",
        falseLabel: "No",
        answer: boolean(answers[19])
    })

    const [q20, setQ20] = useState({
        number: 20,
        text: "What would you say is your risk tolerance?",
        selectOptions: [
            {value: 'high', label: 'High'},
            {value: 'medium', label: 'Medium'},
            {value: 'low', label: 'Low '}
        ],
        answer: string(answers[20])
    })

    const [q21, setQ21] = useState({
        number: 21,
        text: "Are the significant financial losses identified if an asset is damaged/misused/becomes unavailable?",
        trueLabel: "Yes",
        falseLabel: "No",
        answer: boolean(answers[21])
    })

    const [q22, setQ22] = useState({
        number: 22,
        text: "Do you currently have documented risk mitigation strategies?",
        trueLabel: "Yes",
        falseLabel: "No",
        answer: boolean(answers[22])
    })

    useEffect(() => {
        update({
            [q17.number]: q17.answer,
            [q18.number]: q18.answer,
            [q19.number]: q19.answer,
            [q20.number]: q20.answer,
            [q21.number]: q21.answer,
            [q22.number]: q22.answer
        })
    }, [q17, q18, q19, q20, q21, q22])
    
    return (
        <div>
            <Stack spacing={2}>
                <MultiSelect question={q17} update={setQ17} />
                <YesNoQuestion question={q18} update={setQ18} />
                <YesNoQuestion question={q19} update={setQ19} />
                <SingleSelect question={q20} update={setQ20} />
                <YesNoQuestion question={q21} update={setQ21} />
                <YesNoQuestion question={q22} update={setQ22} />
            </Stack>
        </div>
    )
}
