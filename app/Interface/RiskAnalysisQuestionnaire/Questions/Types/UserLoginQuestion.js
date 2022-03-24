import React from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import QuestionLabel from '../Common/QuestionLabel'

export default function UserLoginQuestion({question, update}) {
    function handleUsernameChange (e) {
        const newQuestion = {...question}
        newQuestion.answer = {}
        newQuestion.answer.username = e.target.value
        newQuestion.answer.passowrd = question.answer.password
        update(newQuestion)
    }

    function handlePasswordChange (e) {
        const newQuestion = {...question}
        newQuestion.answer = {}
        newQuestion.answer.username = question.answer.username
        newQuestion.answer.passowrd = e.target.value
        update(newQuestion)
    }

    return (
    <>
        <QuestionLabel question={question} />
        <Box
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
        >
            <TextField
                label="Username"
                placeholder="Username"
                type="userName"
                variant="outlined"
                value={question.answer.username}
                onChange={handleUsernameChange}

            />
            <TextField
                placeholder="Password"
                label="Password"
                type="password"
                autoComplete="current-password" 
                variant="outlined"
                value={question.answer.password}
                onChange={handlePasswordChange}
            />
        </Box>
    </>
  )
}
