import {
  CloudWatchClient,
  ListMetricsCommand,
  GetMetricDataCommand,
  ListMetricsCommandInput,
  GetMetricDataCommandInput,
  GetMetricDataCommandOutput,
  MetricDataQuery,
} from '@aws-sdk/client-cloudwatch';
import { fromIni } from '@aws-sdk/credential-provider-ini'; //'@aws-sdk/credential-providers';
import { MetricTableName } from './types';

const getCloudWatchClient = async (awsProfileName: string): Promise<CloudWatchClient> => {
  const credentials = fromIni({
    profile: awsProfileName,
  });
  const cloudWatchClient = new CloudWatchClient({
    credentials: fromIni({ profile: awsProfileName }),
    region: 'eu-central-1',
  });

  return cloudWatchClient;
};

export const getCloudWatchMetricList = async (awsProfileName: string): Promise<MetricTableName[]> => {
  const cloudWatchClient = await getCloudWatchClient(awsProfileName);

  const params: ListMetricsCommandInput = {
    Dimensions: [
      {
        Name: 'TableName',
      },
    ],
    MetricName: 'ConsumedReadCapacityUnits',
    Namespace: 'AWS/DynamoDB',
  };

  try {
    const data = await cloudWatchClient.send(new ListMetricsCommand(params));
    const metricTableNames = data.Metrics.map((metric) => {
      return { tableName: metric.Dimensions.map((dimension) => dimension.Value).join('-') };
    });
    return metricTableNames;
  } catch (err) {
    console.log('Error', err);
    return [];
  }
};

export const getCloudWatchMetricData4Table = async (tableNameValue: string, awsProfileName: string) => {
  const cloudWatchClient = await getCloudWatchClient(awsProfileName);

  const params: GetMetricDataCommandInput = {
    StartTime: new Date('2022-01-01T00:00:00Z'), //new Date(new Date().getDate() - 7),
    EndTime: new Date('2022-01-31T23:59:59'), //new Date(),
    MetricDataQueries: [
      {
        Id: 'id',
        MetricStat: {
          Metric: {
            Namespace: 'AWS/DynamoDB',
            MetricName: 'ConsumedReadCapacityUnits',
            Dimensions: [{ Name: 'TableName', Value: tableNameValue }],
          },
          Period: 86400,
          Stat: 'Sum',
        },
      },
    ],
    ScanBy: 'TimestampAscending',
  };

  try {
    const data: GetMetricDataCommandOutput = await cloudWatchClient.send(new GetMetricDataCommand(params));
    const metricDataTotalPerResult = data.MetricDataResults.map((metricData) => {
      return {
        name: metricData.Id,
        number: metricData.Values.reduce((a, b) => a + b, 0),
      };
    });
    const metricDataTotal = metricDataTotalPerResult.reduce((a, b) => {
      return {
        name: 'Total',
        number: a.number + b.number,
      };
    });

    return metricDataTotal.number;
  } catch (err) {
    console.log('Error', err);
    return 0;
  }
};

export const getCloudWatchMetricDataTotal = async (
  metricNames: MetricTableName[],
  awsProfileName: string,
): Promise<number> => {
  const cloudWatchClient = await getCloudWatchClient(awsProfileName);

  const metricDataQueries: MetricDataQuery[] = metricNames.map((metricName, i) => {
    return {
      Id: 'id' + i,
      MetricStat: {
        Metric: {
          Namespace: 'AWS/DynamoDB',
          MetricName: 'ConsumedReadCapacityUnits',
          Dimensions: [{ Name: 'TableName', Value: metricName.tableName }],
        },
        Period: 86400,
        Stat: 'Sum',
      },
    };
  });

  const params: GetMetricDataCommandInput = {
    StartTime: new Date('2022-01-01T00:00:00Z'), //new Date(new Date().getDate() - 7),
    EndTime: new Date('2022-01-31T23:59:59'), //new Date(),
    MetricDataQueries: metricDataQueries,
    ScanBy: 'TimestampAscending',
  };

  try {
    const data: GetMetricDataCommandOutput = await cloudWatchClient.send(new GetMetricDataCommand(params));
    const metricTotalPerTable = data.MetricDataResults.map((metric) => {
      return {
        tableName: metric.Id,
        total: metric.Values.reduce((a, b) => a + b, 0),
      };
    });
    const metricTotal = metricTotalPerTable.reduce((a, b) => {
      return {
        tableName: 'Total',
        total: a.total + b.total,
      };
    });
    return metricTotal.total;
  } catch (err) {
    console.log('Error', err);
    return 0;
  }
};
