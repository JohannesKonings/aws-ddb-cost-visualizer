import { CloudWatchClient, ListMetricsCommand } from '@aws-sdk/client-cloudwatch';
import { fromIni } from '@aws-sdk/credential-provider-ini'; //'@aws-sdk/credential-providers';
import { MetricTableName } from './../types';

export const getCloudWatchMetricList = async (awsProfileName: string): Promise<MetricTableName[]> => {
  const credentials = fromIni({
    profile: awsProfileName,
  });
  console.log('credentials:', credentials);

  const cloudWatchClient = new CloudWatchClient({
    credentials: fromIni({ profile: awsProfileName }),
    region: 'eu-central-1',
  });
  console.log('cloudWatchClient:', cloudWatchClient);
  const params = {
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
      return { tableName: metric.Dimensions[0].Value };
    });
    return metricTableNames;
  } catch (err) {
    console.log('Error', err);
    return [];
  }
};
