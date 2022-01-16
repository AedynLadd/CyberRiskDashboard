import React, { useState, useEffect } from 'react'

import TextQuestion from './types/TextQuestion'

export default function SampleQuestions() {
    const [sampleTextQuestion, setSample] = useState({
        number: 1,
        text: "What is your name?",
        answer: ''
    })

    function onTextUpdate(newSample) {
        setSample(newSample)
    }

    useEffect(() => console.log(sampleTextQuestion.answer), [sampleTextQuestion])

    return (
        <div>
            <h2>Sample Questions</h2>
            <TextQuestion question={sampleTextQuestion} update={onTextUpdate} />
        </div>
    )
}
