import React, { useEffect } from 'react';
import { DetailData, MetricTableName, OverviewData } from './../types';
import {
  getCloudWatchMetricData4Table,
  getCloudWatchMetricList,
  getCloudWatchMetricDataTotal,
} from './../sdk/cloudWatchMetrics';
import { getPriceforService } from './../sdk/pricing';
import { getCostforService } from './../sdk/costExplorer';
import CostVizTable from './CostVizTable';
import CostVizDetail from './CostVizDetail';
import CostVizOverview from './CostVizOverview';

import Grid from '@mui/material/Grid';

interface AwsProfilesProps {
  selectedAwsProfile: string;
}

const AwsDdbMetrics = ({ selectedAwsProfile }: AwsProfilesProps) => {
  const [metricTableNames, setMetricTableNames] = React.useState([] as MetricTableName[]);
  const [selectedRow, setSelectedRow] = React.useState('');
  const [overviewData, setOverviewData] = React.useState({} as OverviewData);
  const [detailData, setDetailData] = React.useState({} as DetailData);

  useEffect(() => {
    (async () => {
      const cloudWatchMetricList: MetricTableName[] = await getCloudWatchMetricList(selectedAwsProfile);
      setMetricTableNames(cloudWatchMetricList);

      const overviewDataNumber = await getCloudWatchMetricDataTotal(cloudWatchMetricList, selectedAwsProfile);
      // const price = await getPriceforService('dynamodb', selectedAwsProfile);
      const priceAsString = await getCostforService('dynamodb', selectedAwsProfile);
      setOverviewData({
        name: 'Overview',
        number: overviewDataNumber,
        numberAsText: overviewDataNumber.toLocaleString(),
        priceAsString: priceAsString,
      });
    })();
  }, [selectedAwsProfile]);

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
      const detailData = { name: selectedRow, number: 0, numberAsText: '0', price: 0 };
      const cloudWatchMetricData = await getCloudWatchMetricData4Table(selectedRow, selectedAwsProfile);
      detailData.number = cloudWatchMetricData;
      detailData.numberAsText = cloudWatchMetricData.toLocaleString();
      detailData.price = 0;
      setDetailData(detailData);
    })();
  }, [selectedRow]);

  return (
    <div>
      <h1>Tables</h1>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <CostVizOverview overviewData={overviewData} />
        </Grid>
        <Grid item xs={8}>
          <CostVizTable headCells={headCells} rowData={sortedRowData} setSelectedRow={setSelectedRow} />
        </Grid>
        <Grid item xs={4}>
          {selectedRow && <CostVizDetail detailData={detailData} />}
        </Grid>
      </Grid>
    </div>
  );
};

export default AwsDdbMetrics;
