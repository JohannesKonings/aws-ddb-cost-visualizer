import * as React from 'react';

interface AwsProfilesProps {
    selectedAwsProfile: string;
}

const AwsDdbMetrics = ({ selectedAwsProfile }: AwsProfilesProps) => {

    return (<h1>{selectedAwsProfile}</h1>);
}

export default AwsDdbMetrics
