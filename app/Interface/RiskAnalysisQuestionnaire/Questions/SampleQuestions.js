import React, { useState, useEffect } from 'react'
import {Box, Stack} from '@mui/material'

import TextQuestion from './types/TextQuestion'
import YesNoQuestion from './Types/YesNoQuestion'
import SingleSelect from './Types/SingleSelect'
import MultiSelect from './Types/MultiSelect'
import ListQuestion from './Types/ListQuestion'
import FileQuestion from './Types/FileQuestion'

import { boolean, string, array } from './Common/Defaults'

/*
Text Input (Regular HTML text box -> String)
File Input (OS File explorer -> Path)
Select 1 of many (dropdown -> String) https://reactjs.org/docs/forms.html#the-select-tag
List of Strings (Custom component that adds entries. Optional: Load from file -> Array[String])
Y/N (checkbox/radio button/toggle -> boolean)
If Y/N -> Next Question (on trigger either yes/no -> Show imbedded question)
MultiSelect. (dropdown -> Array[String]) https://www.npmjs.com/package/react-dropdown
*/

export default function SampleQuestions({answers, update}) {
    const [sampleText, setText] = useState({
        number: 1,
        text: "What is your name?",
        answer: string(answers[1])
    })

    const [sampleYesNo, setYesNo] = useState({
        number: 2,
        text: "Do you like patates?",
        falseLabel: "Ewwwww",
        trueLabel: "Yummy!",
        answer: boolean(answers[2])
    })

    const [sampleSelect, setSelect] = useState({
        number: 2.1,
        text: "What's your favorite patates?",
        selectOptions: [
            {value: 'fried', label: 'Fries'},
            {value: 'mashed', label: 'Mashed'},
            {value: 'baked', label: 'Baked'}
        ],
        answer: string(answers[2.1])
    })

    const [sampleMulti, setMulti] = useState({
        number: 3,
        text: "Who are your friends?",
        selectOptions: [
            {value: 'dog', label: 'Zaytoun'},
            {value: 'cat', label: 'Leo'},
            {value: 'bird', label: 'Picanta'},
            {value: 'fish', label: 'Nemo'},
            {value: 'fox', label: 'Malooun'}
        ],
        answer: array(answers[3])
    })

    const [sampleList, setList] = useState({
        number: 4,
        text: "Who's in your family?",
        answer: array(answers[4])
    })

    const [sampleFile, setFile] = useState({
        number: 5,
        text: "Pick a file",
        answer: string(answers[5])
    });

    useEffect(() => {
        update({
            [sampleText.number]: sampleText.answer,
            [sampleYesNo.number]: sampleYesNo.answer,
            [sampleSelect.number]: sampleSelect.answer,
            [sampleMulti.number]: sampleMulti.answer,
            [sampleList.number]: sampleList.answer,
            [sampleFile.number]: sampleFile.answer
        })
    }, [sampleText, sampleYesNo, sampleSelect, sampleMulti, sampleList, sampleFile])
    
    return (
        <div>
            <Stack spacing={2}>
                <TextQuestion question={sampleText} update={setText} />
                <YesNoQuestion question={sampleYesNo} update={setYesNo} />
                { sampleYesNo.answer ? <Box sx={{pl: 5}}><SingleSelect question={sampleSelect} update={setSelect} /></Box> : null }
                <MultiSelect question={sampleMulti} update={setMulti} />
                <ListQuestion question={sampleList} update={setList} />
                <FileQuestion question={sampleFile} update={setFile} />
            </Stack>
        </div>
    )
}
