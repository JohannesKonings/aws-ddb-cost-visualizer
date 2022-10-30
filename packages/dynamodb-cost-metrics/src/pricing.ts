import { PricingClient, DescribeServicesCommand } from '@aws-sdk/client-pricing';
import { fromIni } from '@aws-sdk/credential-provider-ini'; //'@aws-sdk/credential-providers';

export const getPriceforService = async (serviceCode: string, awsProfileName: string): Promise<number> => {
  const pricingClient = new PricingClient({
    credentials: fromIni({ profile: awsProfileName }),
    region: 'us-east-1',
  });

  const params = {
    ServiceCode: serviceCode,
  };

  try {
    const data = await pricingClient.send(new DescribeServicesCommand(params));
    console.log('data:', data);
    // return data.Services[0].ServicePrice;
    return 0;
  } catch (err) {
    console.log('Error', err);
    return 0;
  }
};
