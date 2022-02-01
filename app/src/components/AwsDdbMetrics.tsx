import React, { useEffect } from 'react';
import { DetailData, MetricTableName } from './../types';
import { getCloudWatchMetricList } from './../sdk/cloudWatchMetrics';
import CovizTable from './CovizTable';
import CovizDetail from './CovizDetail';

import Grid from '@mui/material/Grid';

interface AwsProfilesProps {
  selectedAwsProfile: string;
}

const AwsDdbMetrics = ({ selectedAwsProfile }: AwsProfilesProps) => {
  const [metricTableNames, setMetricTableNames] = React.useState([] as MetricTableName[]);
  const [selectedRow, setSelectedRow] = React.useState('');
  const [detailData, setDetailData] = React.useState({} as DetailData);

  useEffect(() => {
    (async () => {
      const cloudWatchMetricList: MetricTableName[] = await getCloudWatchMetricList(selectedAwsProfile);
      setMetricTableNames(cloudWatchMetricList);
    })();
  }, [selectedAwsProfile]);

  //   console.log(e.target.innerText);
  //   const metricTable = e.target.innerText
  //   const cloudWatchMetricData = await getCloudWatchMetricData(metricTable, awsProfileName);
  //   console.log("cloudWatchMetricData", cloudWatchMetricData);

  const headCells = [
    {
      id: 'metricName',
      label: 'Metric Name',
    },
  ];

  const rowData = metricTableNames.map((metricTableName) => {
    return { id: metricTableName.tableName, cellData: [metricTableName.tableName] };
  });
  const sortedRowData = rowData.sort((a, b) => {
    return a.cellData[0].localeCompare(b.cellData[0]);
  });

  useEffect(() => {
    (async () => {
      const detailData = { name: selectedRow, number: 0 };
      setDetailData(detailData);
    })();
  }, [selectedRow]);

  return (
    <div>
      <h1>Tables</h1>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <CovizTable headCells={headCells} rowData={sortedRowData} setSelectedRow={setSelectedRow} />
        </Grid>
        <Grid item xs={4}>
          {selectedRow && <CovizDetail detailData={detailData} />}
        </Grid>
      </Grid>
    </div>
  );
};

export default AwsDdbMetrics;
