import React, { useState, useEffect } from 'react'
import {Stack} from '@mui/material'
import FileQuestion from './Types/FileQuestion'

import {string} from './Common/Defaults'

export default function AssetManagement({answers, update}) {
    const [question2, setFile2] = useState({
        number: 2,
        text: "Provide a list of physical devices present within your organization.",
        answer: string(answers[2])
    })

    const [question3, setFile3] = useState({
        number: 3,
        text: "Provide a list of Software platforms and applications allowed within the organization.",
        answer: string(answers[3])
    })

    const [question4, setFile4] = useState({
        number: 4,
        text: "Identify the Cybersecurity roles and responsibilities for the entire workforce and third-party stakeholders.",
        answer: string(answers[4])
    });

    useEffect(()=> {
        update({
            [question2.number]: question2.answer,
            [question3.number]: question3.answer,
            [question4.number]: question4.answer
        })
    }, [question2, question3, question4])

    return (
        <div>
            <Stack spacing={2}>
                <FileQuestion question={question2} update={setFile2} />
                <FileQuestion question={question3} update={setFile3} />
                <FileQuestion question={question4} update={setFile4} />
            </Stack>
        </div>
    )
}
