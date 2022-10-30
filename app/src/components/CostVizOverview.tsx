import * as React from 'react';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

import { OverviewData } from 'dynamodb-cost-metrics';

interface CovizOverviewProps {
  overviewData: OverviewData;
}

const CovizOverview = ({ overviewData }: CovizOverviewProps) => {
  return (
    <Card sx={{ minWidth: 400 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Overview
        </Typography>
        <Typography variant="h5" component="div">
          {overviewData.name}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Consumed Read
        </Typography>
        <Typography variant="body1">{overviewData.numberAsText}</Typography>
      </CardContent>
      <CardContent>
        <Typography variant="h5" component="div">
          price
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Consumed Read
        </Typography>
        <Typography variant="body1">{overviewData.priceAsString}</Typography>
      </CardContent>
    </Card>
  );
};

export default CovizOverview;
