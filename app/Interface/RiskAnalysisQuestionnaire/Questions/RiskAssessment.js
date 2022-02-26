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

    const [sampleList, setList] = useState({
        number: 4,
        text: "Who's in your family?",
        answer: array(answers[4])
    })

    return (
        <div>
        </div>
    )
}
