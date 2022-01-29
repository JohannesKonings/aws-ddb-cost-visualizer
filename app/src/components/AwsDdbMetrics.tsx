import React, { useEffect } from 'react';
import { CloudWatchClient, ListMetricsCommand } from "@aws-sdk/client-cloudwatch";
import { fromIni } from '@aws-sdk/credential-provider-ini'; //'@aws-sdk/credential-providers';

interface AwsProfilesProps {
    selectedAwsProfile: string;
}

const AwsDdbMetrics = ({ selectedAwsProfile }: AwsProfilesProps) => {

    useEffect(() => {
        (async () => {
            console.log('profile:', selectedAwsProfile);
            const credentials = fromIni({
                profile: selectedAwsProfile
            }
            );
            console.log('credentials:', credentials);

            const cloudWatchClient = new CloudWatchClient({
                credentials: fromIni({ profile: selectedAwsProfile }),
                region: 'eu-central-1'

            })
            console.log('cloudWatchClient:', cloudWatchClient);
            const params = {
                Dimensions: [
                    {
                        Name: "BackgroundData-5jbqaffk2nbtpfifi4j4avsqfm-prod",
                    },
                ],
                MetricName: "ConsumedReadCapacityUnits",
                Namespace: "AWS/DynamoDB",
            };

            try {
                const data = await cloudWatchClient.send(new ListMetricsCommand(params));
                console.log("Success. Metrics:", JSON.stringify(data.Metrics));
                return data;
            } catch (err) {
                console.log("Error", err);
            }

        })();
    }, [selectedAwsProfile]);

    return (<h1>{selectedAwsProfile}</h1>);
}

export default AwsDdbMetrics
