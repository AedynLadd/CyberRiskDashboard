import React, { useState, useEffect } from 'react'
import {List, Stack} from '@mui/material'

import TextQuestion from './types/TextQuestion'
import YesNoQuestion from './Types/YesNoQuestion'
import SingleSelect from './Types/SingleSelect'

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
    function onTextUpdate(newSample) {
        setText(newSample)
    }

    const [sampleYesNo, setYesNo] = useState({
        number: 2,
        text: "Do you like patates?",
        answer: true
    })
    function onYesNoUpdate(newSample) {
        setYesNo(newSample)
    }

    const [sampleSelect, setSelect] = useState({
        number: 3,
        text: "Are you a dog or a cat person",
        selectOptions: [
            {value: 'dog', label: 'Dog'},
            {value: 'cat', label: 'Cat'}
        ],
        answer: {}
    })
    function onSelectUpdate(newSample) {
        setSelect(newSample)
    }
    
    useEffect(() => {
        const singleSelectValue = "value" in sampleSelect.answer ? sampleSelect.answer.value : ''
        console.log("Text: " + sampleText.answer)
        console.log("YesNo: " + sampleYesNo.answer)
        console.log("SingleSelect: " + singleSelectValue)

        console.log("-----------------------------")
    }, [sampleText, sampleYesNo, sampleSelect])
    
    return (
        <div>
            <Stack spacing={2}>
                <TextQuestion question={sampleText} update={onTextUpdate} />
                <YesNoQuestion question={sampleYesNo} update={onYesNoUpdate} />
                <SingleSelect question={sampleSelect} update={onSelectUpdate} />
            </Stack>
        </div>
    )
}
