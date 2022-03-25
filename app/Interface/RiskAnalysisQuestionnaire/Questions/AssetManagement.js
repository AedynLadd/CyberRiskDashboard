import React, { useState, useEffect } from 'react'
import {Box, Stack} from '@mui/material'

import TextQuestion from './types/TextQuestion'
import SingleSelect from './Types/SingleSelect'
import ListQuestion from './Types/ListQuestion'
import FileQuestion from './Types/FileQuestion'

import { string, array } from './Common/Defaults'
import UserLoginQuestion from './Types/UserLoginQuestion'
import CSVTable from './Types/Tables/CSVTable'
import MSSQLTable from './Types/Tables/MSSQLTable'
import MYSQLTable from './Types/Tables/MYSQLTable'
import MonogoDB from './Types/Tables/MonogoDB' 
import CSVNetwork from './Types/Tables/NetworkTables/CSVNetwork'
import MSSQLNetwork from './Types/Tables/NetworkTables/MSSQLNetwork'
import MYSQLNetwork from './Types/Tables/NetworkTables/MYSQLNetwork'
import MonogoNetwork from './Types/Tables/NetworkTables/MonogoNetwork'
export default function AssetManagement({answers, update}) {
    const [q1, setQ1] = useState({
        number: 1,
        text: "What is the name of your organization?",
        answer: string(answers[1])
    })

    const [q2, setQ2] = useState({
        number: 2,
        text: "Please specify where your organization's data is stored:",
        subtext:"(Where data pertaining to logs and user data is stored)",
        selectOptions: [
            {value: 'csv', label: 'CSV file'},
            {value: 'sql', label: 'SQL Database Instances'},
            {value: 'mySql', label: 'MySQL Database Instances'},
            {value: 'postgresSql', label: 'PostgreSQL Database Instances'},
            {value: 'oracle', label: 'Oracle Database Instances'},
            {value: 'mongoDB', label: 'MongoDB Database Instances'}
        ],
        answer: array(answers[2])
    })

    const [q2_1] = useState({
        number: 2.1,
        text: "Where applicable, map the field to its corresponding field in your organization's data structure as pertaining to network data:",
        subtext: "(network data are typically logs of user interactions with the network)" 
    })

    const [q2_2] = useState({
        number: 2.2,
        text: "Where applicable, map the field to its corresponding field in your organizations data structure as pertaining to network data:",
        subtext: "(program data typically list users work computer account details)"
 
    })

    const [q2_3, setQ2_3] = useState({
        number: 2.3,
        text: "Provide user login for the database engine if applicable:",
        subtext:" (provide credentials for a user with reading privileges)",
        answer: string(answers[2.3])
    })

    const [q3, setQ3] = useState({
        number: 3,
        text: "Provide a list of physical devices present within your organization.",
        answer: string(answers[3])
    })
    
    const [q4, setQ4] = useState({
        number: 4,
        text: "Provide a list of Software platforms and applications allowed within the organization.",
        answer: array(answers[4])
    })

    const [q5, setQ5] = useState({
        number: 5,
        text: "Provide your employee directories.",
        answer: string(answers[5])
    })


    const [q5_1, setQ5_1] = useState({
        number: 6,
        text: "Identify the Cybersecurity roles and responsibilities for the entire workforce and third-party stakeholders.",
        answer: array(answers[6])
    });

    useEffect(()=> {
        update({
            [q1.number]: q1.answer,
            [q2.number]: q2.answer,
            [q2_1.number]: q2_1.answer,
            [q2_2.number]: q2_2.answer,
            [q2_3.number]: q2_3.answer,
            [q3.number]: q3.answer,
            [q4.number]: q4.answer,
            [q5.number]: q5.answer,
            [q5_1.number]: q5_1.answer
        })
    }, [q1, q2, q2_1, q2_2, q2_3, q3, q4, q5, q5_1])

    return (
        <div>
            <Stack spacing={2}>
            <TextQuestion question={q1} update={setQ1} />
            <SingleSelect question={q2} update={setQ2} />
            {(() => {
                switch(q2.answer){
                    case 'csv':
                        return <Box sx={{pl: 5}}>
                            <CSVTable question={q2_1} /> 
                            <CSVNetwork question={q2_2} />
                        </Box>
                    case 'sql':
                        return <Box sx={{pl: 5}}>
                            <MSSQLTable question={q2_1} />
                            <MSSQLNetwork question={q2_2} />
                        </Box>
                    case 'mySql':
                        return <Box sx={{pl: 5}}>
                            <MYSQLTable question={q2_1} />
                            <MYSQLNetwork question={q2_2} />
                        </Box>
                    case 'postgresSql':
                        return <Box sx={{pl: 5}}>
                            <MSSQLTable question={q2_1} />
                            <MSSQLNetwork question={q2_2} />
                        </Box>
                    case 'oracle':
                        return <Box sx={{pl: 5}}>
                            <MSSQLTable question={q2_1} />
                            <MSSQLNetwork question={q2_2} />
                        </Box>
                    case 'mongoDB':
                        return <Box sx={{pl: 5}}>                        
                            <MonogoDB question={q2_1} />
                            <MonogoNetwork question={q2_2} />
                        </Box>
                } 
            })()}          
            <UserLoginQuestion question={q2_3} update={setQ2_3} />
            <FileQuestion question={q3} update={setQ3} />
            <FileQuestion question={q4} update={setQ4} />
            <FileQuestion question={q5} update={setQ5} />
            <ListQuestion question={q5_1} update={setQ5_1} />
            </Stack>
        </div>
    )
}
