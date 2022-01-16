import React from "react";

import AssetManagement from "./Questions/AssetManagement";
import BusinessEnvironment from "./Questions/BusinessEnvironment";
import Governance from "./Questions/Governance";
import RiskAssessment from "./Questions/RiskAssessment";
import RiskManagementStrategy from "./Questions/RiskManagementStrategy";
import AccessControl from "./Questions/AccessControl";
import Other from "./Questions/Other";

export default function RAQ() {
    return (
        <>
            <h1>Risk Analysis Questionnaire</h1>
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