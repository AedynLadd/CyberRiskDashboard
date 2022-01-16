import React from 'react'

import QuestionLabel from '../Common/QuestionLabel'

export default function TextQuestion({question, update}) {
    function handleChange(e) {
        const newQuestion = {...question}
        newQuestion.answer = e.target.value
        update(newQuestion)
    }

    return (
        <div>
            <QuestionLabel question={question} />
            <input type="text" onChange={handleChange} value={question.answer}></input>
        </div>
    )
}
