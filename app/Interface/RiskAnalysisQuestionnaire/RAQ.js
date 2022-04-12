import React from "react";
import { useState, useEffect } from "react";
import '@fontsource/roboto/400.css';
import Paper from "@mui/material/Paper";
import { createTheme } from "@mui/material/styles";
import {
    Box,
    CircularProgress,
    Step,
    StepContent,
    StepLabel,
    Stepper,
    ThemeProvider
} from "@mui/material";

import AssetManagement from "./Questions/AssetManagement";
import BusinessEnvironment from "./Questions/BusinessEnvironment";
import Governance from "./Questions/Governance";
import RiskAssessment from "./Questions/RiskAssessment";
import RiskManagementStrategy from "./Questions/RiskManagementStrategy";
import AccessControl from "./Questions/AccessControl";
import Other from "./Questions/Other";

import BackNextButtons from "./Questions/Common/BackNextButtons";
import Intro from "./Questions/Intro";

/*
Text Input (Regular HTML text box -> String)
File Input (OS File explorer -> Path)
Select 1 of many (dropdown -> String) https://www.npmjs.com/package/react-dropdown https://reactjs.org/docs/forms.html#the-select-tag
List of Strings (Custom component that adds entries. Optional: Load from file -> Array[String])
Y/N (checkbox/radio button/toggle -> boolean)
If Y/N -> Next Question (on trigger either yes/no -> Show imbedded question)
MultiSelect. (dropdown -> Array[String]) https://www.npmjs.com/package/react-dropdown
*/

export default function RAQ() {
    const theme = createTheme({
        palette: {
            mode: 'light'
        }
    })

    const [activeStep, setActiveStep] = useState(0)
    const [loading, setLoading] = useState(true);

    // const [sampleQuestions, setSampleQuestions] = useState({});
    const [assetManagement, setAssetManagement] = useState({});
    const [businessEnvironment, setBusinessEnvironment] = useState({});
    const [governance, setGovernance] = useState({});
    const [riskAssessment, setRiskAssessment] = useState({});
    const [riskManagementStrategy, setRiskManagementStrategy] = useState({});
    const [accessControl, setAccessControl] = useState({});
    const [other, setOther] = useState({});

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1)
    }
    
    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1)
    }

    const handleFinish = () => {
        const answers = {
            'assetManagement': assetManagement,
            'businessEnvironment': businessEnvironment,
            'governance': governance,
            'riskAssessment': riskAssessment,
            'riskManagementStrategy': riskManagementStrategy,
            'accessControl': accessControl,
            'other': other
        }

        electron.fileSystemApi.writeConfig(answers).then(() => {
            electron.windowApi.closeRAQ()
        })

        setLoading(true)
    }

    useEffect(() => {
        electron.fileSystemApi.readConfig().then(config => {
            // setSampleQuestions(config.sampleQuestions)
            setAssetManagement(config.assetManagement)
            setBusinessEnvironment(config.businessEnvironment)
            setGovernance(config.governance)
            setRiskAssessment(config.riskAssessment)
            setRiskManagementStrategy(config.riskManagementStrategy)
            setAccessControl(config.accessControl)
            setOther(config.other)

            setLoading(false)
        })
        .catch(() => {
            setLoading(false)
        });
    }, [])

    return (
        <Paper elevation={0}>
            <h1>Risk Analysis Questionnaire</h1>
            { loading ? 
                <Box sx={{ display: 'flex' }}>
                    <CircularProgress />
                </Box> 
                :
                <Stepper activeStep={activeStep} orientation="vertical">
                    <Step>
                        <StepLabel>Home</StepLabel>
                        <StepContent TransitionProps={{ unmountOnExit: false }}>
                            <Intro></Intro>
                            <BackNextButtons handleBack={handleBack} handleNext={handleNext} isFirstStep={true} />
                        </StepContent>
                    </Step>
                    <Step>
                        <StepLabel>Asset Management</StepLabel>
                        <StepContent TransitionProps={{ unmountOnExit: false }}>
                            <AssetManagement key={'AssetManagement'}
                                answers={assetManagement}
                                update={setAssetManagement}
                            />
                            <BackNextButtons handleBack={handleBack} handleNext={handleNext} isFirstStep={true} />
                        </StepContent>
                    </Step>

                    <Step>
                        <StepLabel>Business Environment</StepLabel>
                        <StepContent TransitionProps={{ unmountOnExit: false }}>
                            <BusinessEnvironment key={'BusinessEnvironment'}
                                answers={businessEnvironment}
                                update={setBusinessEnvironment}
                            />
                            <BackNextButtons handleBack={handleBack} handleNext={handleNext} />
                        </StepContent>
                    </Step>
                
                    <Step>
                        <StepLabel>Governance</StepLabel>
                        <StepContent TransitionProps={{ unmountOnExit: false }}>
                            <Governance key={'Governance'}
                                answers={governance}
                                update={setGovernance}
                            />
                            <BackNextButtons handleBack={handleBack} handleNext={handleNext} />
                        </StepContent>
                    </Step>
                    
                    <Step>
                        <StepLabel>Risk Assessment</StepLabel>
                        <StepContent TransitionProps={{ unmountOnExit: false }}>
                            <RiskAssessment key={'RiskAssessment'}
                                answers={riskAssessment}
                                update={setRiskAssessment}
                            />
                            <BackNextButtons handleBack={handleBack} handleNext={handleNext} />
                        </StepContent>
                    </Step>
                    
                    <Step>
                        <StepLabel>Risk Management Strategy</StepLabel>
                        <StepContent TransitionProps={{ unmountOnExit: false }}>
                            <RiskManagementStrategy key={'RiskManagementStrategy'}
                                answers={riskManagementStrategy}
                                update={setRiskManagementStrategy}
                            />
                            <BackNextButtons handleBack={handleBack} handleNext={handleNext} />
                        </StepContent>
                    </Step>
                    
                    <Step>
                        <StepLabel>Access Control</StepLabel>
                        <StepContent TransitionProps={{ unmountOnExit: false }}>
                            <AccessControl key={'AccessControl'}
                                answers={accessControl}
                                update={setAccessControl}
                            />
                            <BackNextButtons handleBack={handleBack} handleNext={handleNext} />
                        </StepContent>
                    </Step>
                    
                    <Step>
                        <StepLabel>Other</StepLabel>
                        <StepContent TransitionProps={{ unmountOnExit: false }}>
                            <Other key={'Other'}
                                answers={other}
                                update={setOther}
                            />
                            <BackNextButtons handleBack={handleBack} handleNext={handleFinish} isLastStep={true} />
                        </StepContent>
                    </Step>
                </Stepper>
            }
            
        </Paper>
    )
}