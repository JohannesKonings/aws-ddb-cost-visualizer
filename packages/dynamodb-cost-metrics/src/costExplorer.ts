import {
  Context,
  CostExplorerClient,
  GetCostAndUsageCommand,
  GetCostAndUsageCommandInput,
  GetCostAndUsageCommandOutput,
} from '@aws-sdk/client-cost-explorer';
import { fromIni } from '@aws-sdk/credential-provider-ini'; //'@aws-sdk/credential-providers';

export const getCostforService = async (serviceCode: string, awsProfileName: string): Promise<string> => {
  const postExplorerClient = new CostExplorerClient({
    credentials: fromIni({ profile: awsProfileName }),
    region: 'us-east-1',
  });

  const params: GetCostAndUsageCommandInput = {
    Granularity: 'MONTHLY',
    TimePeriod: {
      // Start: '2021-11-01',
      // End: '2021-12-01',
      Start: '2022-01-01',
      End: '2022-02-01',
    },
    Metrics: ['UnblendedCost'],
    // Filter: { Dimensions: { Key: 'SERVICE', Values: ['Amazon DynamoDB'] } },

    Filter: {
      And: [
        { Dimensions: { Key: 'SERVICE', Values: ['Amazon DynamoDB'] } },
        // { Dimensions: { Key: 'USAGE_TYPE', Values: ['EUC1-ReadRequestUnits'] } },
        { Dimensions: { Key: 'RECORD_TYPE', Values: ['Credit'] } },
      ],
    },
    GroupBy: [
      //   // {
      //   //   Type: 'DIMENSION',
      //   //   Key: 'SERVICE',
      //   // },
      {
        Type: 'DIMENSION',
        Key: 'USAGE_TYPE',
      },
      //   {
      //     Type: 'DIMENSION',
      //     Key: 'RECORD_TYPE',
      //   },
    ],
  };

  try {
    const data: GetCostAndUsageCommandOutput = await postExplorerClient.send(new GetCostAndUsageCommand(params));

    if (data.ResultsByTime) {
      const priceGroups = data.ResultsByTime.map((item) => {
        return item.Groups;
      });
      const filteredPriceGroupRead = priceGroups[0].filter((item) => {
        return item.Keys[0] === 'EUC1-ReadRequestUnits';
      });

      const price = filteredPriceGroupRead[0].Metrics.UnblendedCost.Amount;
      return price;
    } else {
      return '0';
    }
  } catch (err) {
    console.log('Error', err);
    return '0';
  }
};
