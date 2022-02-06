import React from 'react';
import FileSelector from '../Common/FileSelector';
import QuestionLabel from '../Common/QuestionLabel';

export default function FileQuestion({question, update}) {
    
    const handleFileSelected = filePath => {
        const newQuestion = {...question}
        newQuestion.answer = filePath
        update(newQuestion)
    }

    return (
        <>
            <QuestionLabel question={question} />
            <FileSelector
                onFileSelect={handleFileSelected}
                initialValue={question.answer}
                showSelection={true}
            />
        </>
    );
}
