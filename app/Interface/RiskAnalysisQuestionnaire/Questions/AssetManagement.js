import React, { useState, useEffect } from 'react'
import {Box, Stack} from '@mui/material'

import TextQuestion from './types/TextQuestion'
import YesNoQuestion from './Types/YesNoQuestion'
import SingleSelect from './Types/SingleSelect'
import ListQuestion from './Types/ListQuestion'

import { boolean, string, array } from './Common/Defaults'

export default function AssetManagement({answers, update}) {
    const [q2, setQ2] = useState({
        number: 2,
        text: "Is your organization's data stored in CSV files?",
        trueLabel: "No",
        falseLabel: "Yes",
        answer: boolean(answers[2])
    })

    const [q2_1, setQ2_1] = useState({
        number: 2.1,
        text: "Please specify where your organization's data is stored:",
        subtext:"(Where data pertaining to logs is stored)",
        selectOptions: [
            {value: 'sql', label: 'SQL Database Instances'},
            {value: 'mySql', label: 'MySQL Database Instances'},
            {value: 'postgresSql', label: 'PostgreSQL Database Instances'},
            {value: 'oracle', label: 'Oracle Database Instances'},
            {value: 'mongoDB', label: 'MongoDB Database Instances'}
        ],
        answer: array(answers[2.1])
    })

    const [q2_2, setQ2_2] = useState({
        number: 2.2,
        text: "Provide Username for the database engine if applicable:",
        subtext:" (provide credentials for a user with reading privileges)",
        answer: string(answers[2.2])
    })

    const [q2_3, setQ2_3] = useState({
        number: 2.3,
        text: "Provide Password for the database engine if applicable:",
        subtext:" (provide credentials for a user with reading privileges)",
        answer: string(answers[2.3])
    })

    const [q3, setQ3] = useState({
        number: 3,
        text: "Provide a list of physical devices present within your organization.",
        answer: array(answers[3])
    })

    const [q4, setQ4] = useState({
        number: 4,
        text: "Provide a list of Software platforms and applications allowed within the organization.",
        answer: array(answers[4])
    })

    const [q5, setQ5] = useState({
        number: 5,
        text: "Identify the Cybersecurity roles and responsibilities for the entire workforce and third-party stakeholders.",
        answer: array(answers[5])
    });

    useEffect(()=> {
        update({
            [q2.number]: q2.answer,
            [q2_1.number]: q2_1.answer,
            [q2_2.number]: q2_2.answer,
            [q2_3.number]: q2_3.answer,
            [q3.number]: q3.answer,
            [q4.number]: q4.answer,
            [q5.number]: q5.answer
        })
    }, [q2, q2_1, q2_2, q2_3, q3, q4, q5])

    return (
        <div>
            <Stack spacing={2}>
            <YesNoQuestion question={q2} update={setQ2} />
            { q2.answer ? <Box sx={{pl: 5}}>
                <SingleSelect question={q2_1} update={setQ2_1} />
                <TextQuestion question={q2_2} update={setQ2_2} />
                <TextQuestion question={q2_3} update={setQ2_3} />
                </Box> : null }
            <ListQuestion question={q3} update={setQ3} />
            <ListQuestion question={q4} update={setQ4} />
            <ListQuestion question={q5} update={setQ5} />
            </Stack>
        </div>
    )
}
