import React, { useState, useEffect } from 'react'
import {Stack} from '@mui/material'

import MultiSelect from './Types/MultiSelect'
import ListQuestion from './Types/ListQuestion'

import {string, array } from './Common/Defaults'
import SingleSelect from './Types/SingleSelect'


export default function BusinessEnvironment({answers, update}) {
    const [q5, setQ5] = useState({
        number: 5,
        text: "What would you say is your role in the supply chain?",
        selectOptions: [
            {value: 'clients', label: 'Clients'},
            {value: 'manufacturers', label: 'Manufacturers'},
            {value: 'service', label: 'Service'},
            {value: 'other', label: 'Other'},
        ],
        answer: array(answers[5])
    })

    const [q6, setQ6] = useState({
        number: 6,
        text: "What industry does your organization fall under?",
        selectOptions: [
            {value: 'aerospace', label: 'Aerospace'},          
            {value: 'automation', label: 'Automation'},
            {value: 'automotive', label: 'Automotive'},
            {value: 'chemical/biomedical', label: 'Chemical/Biomedical'},
            {value: 'cleantech', label: 'Cleantech'},
            {value: 'cybersecurity', label: 'Cybersecurity'},
            {value: 'financial', label: 'Financial'},
            {value: 'food/beverage', label: 'Food/Beverage'},
            {value: 'forestry', label: 'Forestry'},
            {value: 'information', label: 'Information '},
            {value: 'lifeScience', label: 'Life Science'},
            {value: 'mining', label: 'Mining'},
            {value: 'robotics', label: 'Robotics'},
            {value: 'tech', label: 'Tech'},
            {value: 'tourism', label: 'Tourism '},
        ],
        answer: array(answers[6])
    })

    const [q7, setQ7] = useState({
        number: 7,
        text: "List your organization’s objectives",
        answer: array(answers[7])
    })

    const [q8, setQ8] = useState({
        number: 8,
        text: "Prioritize your organizational objectives:",
        selectOptions: [
            {value: 'Very important', label: 'Very important'},
            {value: 'important', label: 'important'},
            {value: ' moderately important', label: ' moderately important'},
            {value: 'less important', label: 'less important'}
        ],
        answer: string(answers[8])
    })

    const [q9, setQ9] = useState({
        number: 9,
        text: "List your dependencies for delivery of your critical services.",
        answer: array(answers[9])
    })

    const [q10, setQ10] = useState({
        number: 10,
        text: "List your critical functions for delivery of your critical services.",
        answer: array(answers[10])
    });

    useEffect(() => {
        update({
            [q5.number]: q5.answer,
            [q6.number]: q6.answer,
            [q7.number]: q7.answer,
            [q8.number]: q8.answer,
            [q9.number]: q9.answer,
            [q10.number]: q10.answer
        })
    }, [q5, q6, q7, q8, q9, q10])
    
    return (
        <div>
            <Stack spacing={2}>
                <MultiSelect question={q5} update={setQ5} />
                <SingleSelect question={q6} update={setQ6} />
                <ListQuestion question={q7} update={setQ7} />
                <SingleSelect question={q8} update={setQ8} />
                <ListQuestion question={q9} update={setQ9} />               
                <ListQuestion question={q10} update={setQ10} />                
            </Stack>
        </div>
    )
}
