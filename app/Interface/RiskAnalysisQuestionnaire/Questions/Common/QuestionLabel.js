import React from 'react'

export default function QuestionLabel({question}) {
    return (
        <>
            <h3>
                Q{question.number}. {question.text}
            </h3>
        </>
    )
}
