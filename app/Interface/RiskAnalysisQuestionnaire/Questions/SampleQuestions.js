import React, { useState, useEffect } from 'react'
import {Box, Stack} from '@mui/material'

import TextQuestion from './types/TextQuestion'
import YesNoQuestion from './Types/YesNoQuestion'
import SingleSelect from './Types/SingleSelect'
import MultiSelect from './Types/MultiSelect'

/*
Text Input (Regular HTML text box -> String)
File Input (OS File explorer -> Path)
Select 1 of many (dropdown -> String) https://reactjs.org/docs/forms.html#the-select-tag
List of Strings (Custom component that adds entries. Optional: Load from file -> Array[String])
Y/N (checkbox/radio button/toggle -> boolean)
If Y/N -> Next Question (on trigger either yes/no -> Show imbedded question)
MultiSelect. (dropdown -> Array[String]) https://www.npmjs.com/package/react-dropdown
*/

export default function SampleQuestions() {
    const [sampleText, setText] = useState({
        number: 1,
        text: "What is your name?",
        answer: ''
    })

    const [sampleYesNo, setYesNo] = useState({
        number: 2,
        text: "Do you like patates?",
        falseLabel: "Ewwwww",
        trueLabel: "Yummy!",
        answer: false
    })

    useEffect(() => {

    }, [sampleYesNo]);

    const [sampleSelect, setSelect] = useState({
        number: 2.1,
        text: "Are you a dog or a cat person",
        selectOptions: [
            {value: 'dog', label: 'Dog'},
            {value: 'cat', label: 'Cat'}
        ],
        answer: ""
    })

    const [sampleMulti, setMulti] = useState({
        number: 3,
        text: "Who are your friends?",
        selectOptions: [
            {value: 'dog', label: 'Dog'},
            {value: 'cat', label: 'Cat'},
            {value: 'bird', label: 'Bird'},
            {value: 'fish', label: 'Fish'},
            {value: 'fox', label: 'Fox'}
        ],
        answer: []
    })
    
    useEffect(() => {
        console.log("MultiSelect: " + sampleMulti.answer)

        console.log("-----------------------------")
    }, [sampleMulti])
    
    return (
        <div>
            <Stack spacing={2}>
                <TextQuestion question={sampleText} update={setText} />
                <YesNoQuestion question={sampleYesNo} update={setYesNo} />
                { sampleYesNo.answer ? <Box sx={{pl: 5}}><SingleSelect question={sampleSelect} update={setSelect} /></Box> : null }
                <MultiSelect question={sampleMulti} update={setMulti} />
            </Stack>
        </div>
    )
}
