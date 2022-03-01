import React from 'react'
import QuestionLabel from '../Common/QuestionLabel'
import TextInputButton from '../Common/TextInputButton'
import Asset from '../Common/Asset'
import { DEFAULT_LIKELIHOOD } from '../Common/Defaults'

export default function AssetQuestion({question, update}) {
    const assets = {}
    question.answer.forEach(asset => {
        assets[asset.name] = asset
    })

    const updateAsset = (asset) => {
        assets[asset.name] = asset
        updateQuestion()
    }

    const addAsset = (name) => {
        if (assets.hasOwnProperty(name)) {
            console.log("Cannot add a duplicate asset")
            return;
        }
        
        assets[name] = {
            name: name,
            vulnerability: {
                name: "",
                likelihood: DEFAULT_LIKELIHOOD
            }
        }
        updateQuestion()
    }

    const removeAsset = (name) => {
        delete assets[name]
        updateQuestion()
    }

    const updateQuestion = () => {
        const newQuestion = {...question}
        newQuestion.answer = Object.values(assets)
        update(newQuestion)
    }

    return (
        <div>
            <QuestionLabel question={question} />
            {
                question.answer.map(asset =>
                    <Asset key={asset.name} asset={asset} update={updateAsset} remove={removeAsset} />)
            }
            <TextInputButton
                handleAdd={addAsset}
                placeholder="Enter asset name"
                sx={{flex: 1}}
            />
        </div>
    )
}
