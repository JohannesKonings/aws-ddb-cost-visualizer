import React, { useEffect } from 'react';
import { MetricTableName } from './../types';
import { getCloudWatchMetricList } from './../sdk/cloudWatchMetrics';
import CovizTable from './CovizTable';

interface AwsProfilesProps {
    selectedAwsProfile: string;
}

const AwsDdbMetrics = ({ selectedAwsProfile }: AwsProfilesProps) => {
    const [metricTableNames, setMetricTableNames] = React.useState([] as MetricTableName[]);

    const headCells = [{
        id: 'metricName',
        label: 'Metric Name'
    }]

    const rowData = metricTableNames.map((metricTableName) => {
        return { id: metricTableName.tableName, cellData: [metricTableName.tableName] }
    })

    useEffect(() => {
        (async () => {
            const cloudWatchMetricList: MetricTableName[] = await getCloudWatchMetricList(selectedAwsProfile)
            setMetricTableNames(cloudWatchMetricList);

        })();
    }, [selectedAwsProfile]);

    return (<div><h1>Tables</h1><CovizTable headCells={headCells} rowData={rowData} /></div>);
}

export default AwsDdbMetrics


