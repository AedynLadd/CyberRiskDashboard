import React from "react";

import AssetManagement from "./Questions/AssetManagement";
import BusinessEnvironment from "./Questions/BusinessEnvironment";
import Governance from "./Questions/Governance";
import RiskAssessment from "./Questions/RiskAssessment";
import RiskManagementStrategy from "./Questions/RiskManagementStrategy";
import AccessControl from "./Questions/AccessControl";
import Other from "./Questions/Other";

import SampleQuestions from "./Questions/SampleQuestions";

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
    return (
        <>
            <h1>Risk Analysis Questionnaire</h1>
            <SampleQuestions />
            <AssetManagement />
            <BusinessEnvironment />
            <Governance />
            <RiskAssessment />
            <RiskManagementStrategy />
            <AccessControl />
            <Other />
        </>
    )
}