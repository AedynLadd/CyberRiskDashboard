import React from "react";
import { useState } from "react";
import '@fontsource/roboto/400.css';
import Paper from "@mui/material/Paper";
import { createTheme } from "@mui/material/styles";
import { dark } from "@mui/material/styles/createPalette";
import { Button, Stack, Step, StepContent, StepLabel, Stepper, ThemeProvider } from "@mui/material";

import AssetManagement from "./Questions/AssetManagement";
import BusinessEnvironment from "./Questions/BusinessEnvironment";
import Governance from "./Questions/Governance";
import RiskAssessment from "./Questions/RiskAssessment";
import RiskManagementStrategy from "./Questions/RiskManagementStrategy";
import AccessControl from "./Questions/AccessControl";
import Other from "./Questions/Other";

import SampleQuestions from "./Questions/SampleQuestions";
import BackNextButtons from "./Questions/Common/BackNextButtons";

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
        palette: dark,
        spacing: 6
    })

    const [activeStep, setActiveStep] = useState(0)

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1)
    }
    
    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1)
    }

    return (
         <ThemeProvider theme={theme}>
            <Paper elevation={0}>
                <h1>Risk Analysis Questionnaire</h1>
                <Stepper activeStep={activeStep} orientation="vertical">
                    <Step>
                        <StepLabel>Sample Questions</StepLabel>
                        <StepContent TransitionProps={{ unmountOnExit: false }}>
                            <SampleQuestions key={'SampleQuestions'}/>
                            <BackNextButtons handleBack={handleBack} handleNext={handleNext} isFirstStep={true} />
                        </StepContent>
                    </Step>

                    <Step>
                        <StepLabel>Asset Management</StepLabel>
                        <StepContent TransitionProps={{ unmountOnExit: false }}>
                            <AssetManagement key={'AssetManagement'}/>
                            <BackNextButtons handleBack={handleBack} handleNext={handleNext} isFirstStep={true} />
                        </StepContent>
                    </Step>

                    <Step>
                        <StepLabel>Business Environment</StepLabel>
                        <StepContent TransitionProps={{ unmountOnExit: false }}>
                            <BusinessEnvironment key={'BusinessEnvironment'}/>
                            <BackNextButtons handleBack={handleBack} handleNext={handleNext} />
                        </StepContent>
                    </Step>
                    
                    <Step>
                        <StepLabel>Governance</StepLabel>
                        <StepContent TransitionProps={{ unmountOnExit: false }}>
                            <Governance key={'Governance'}/>
                            <BackNextButtons handleBack={handleBack} handleNext={handleNext} />
                        </StepContent>
                    </Step>
                    
                    <Step>
                        <StepLabel>Risk Assessment</StepLabel>
                        <StepContent TransitionProps={{ unmountOnExit: false }}>
                            <RiskAssessment key={'RiskAssessment'}/>
                            <BackNextButtons handleBack={handleBack} handleNext={handleNext} />
                        </StepContent>
                    </Step>
                    
                    <Step>
                        <StepLabel>Risk Management Strategy</StepLabel>
                        <StepContent TransitionProps={{ unmountOnExit: false }}>
                            <RiskManagementStrategy key={'RiskManagementStrategy'}/>
                            <BackNextButtons handleBack={handleBack} handleNext={handleNext} />
                        </StepContent>
                    </Step>
                    
                    <Step>
                        <StepLabel>Access Control</StepLabel>
                        <StepContent TransitionProps={{ unmountOnExit: false }}>
                            <AccessControl key={'AccessControl'}/>
                            <BackNextButtons handleBack={handleBack} handleNext={handleNext} />
                        </StepContent>
                    </Step>
                    
                    <Step>
                        <StepLabel>Other</StepLabel>
                        <StepContent TransitionProps={{ unmountOnExit: false }}>
                            <Other key={'Other'}/>
                            <BackNextButtons handleBack={handleBack} handleNext={handleNext} isLastStep={true} />
                        </StepContent>
                    </Step>
                </Stepper>
                
            </Paper>
        </ThemeProvider>
    )
}