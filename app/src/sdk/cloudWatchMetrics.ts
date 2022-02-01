import {
  CloudWatchClient,
  ListMetricsCommand,
  GetMetricDataCommand,
  ListMetricsCommandInput,
  GetMetricDataCommandInput,
  GetMetricDataCommandOutput,
} from '@aws-sdk/client-cloudwatch';
import { fromIni } from '@aws-sdk/credential-provider-ini'; //'@aws-sdk/credential-providers';
import { MetricTableName } from './../types';

const getCloudWatchClient = async (awsProfileName: string): Promise<CloudWatchClient> => {
  const credentials = fromIni({
    profile: awsProfileName,
  });
  console.log('credentials:', credentials);

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
    console.log('Success. Metrics:', data.Metrics);
    const metricTableNames = data.Metrics.map((metric) => {
      return { tableName: metric.Dimensions.map((dimension) => dimension.Value).join('-') };
    });
    return metricTableNames;
  } catch (err) {
    console.log('Error', err);
    return [];
  }
};

export const getCloudWatchMetricData = async (tableNameValue: string, awsProfileName: string) => {
  const cloudWatchClient = await getCloudWatchClient(awsProfileName);

  const params: GetMetricDataCommandInput = {
    StartTime: new Date(new Date().getDate() - 7),
    EndTime: new Date(),
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
    console.log('Success. Metrics:', data);
    // const metricTableNames = data.Metrics.map((metric) => {
    //   return { tableName: metric.Dimensions.map((dimension) => dimension.Value).join('-') };
    // });
    // return metricTableNames;
  } catch (err) {
    console.log('Error', err);
    // return [];
  }
};
