import React, { useState } from 'react'
import AwsDdbMetrics from './components/AwsDdbMetrics'
import AwsProfiles from "./components/AwsProfiles"

const App = () => {
    const [awsProfile, setAwsProfile] = useState('')

    return (
        <div>
            <h1>AWS DynamoDB Cost Visualizer</h1>
            <AwsProfiles setSelectedAwsProfile={setAwsProfile} />
            <AwsDdbMetrics selectedAwsProfile={awsProfile} />
        </div>
    )
}

export default App
