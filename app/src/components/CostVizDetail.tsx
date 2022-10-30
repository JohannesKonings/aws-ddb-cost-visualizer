import * as React from 'react';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

import { DetailData } from 'dynamodb-cost-metrics';

interface CovizDetailProps {
  detailData: DetailData;
}

const CovizDetail = ({ detailData }: CovizDetailProps) => {
  return (
    <Card sx={{ minWidth: 400 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Metrics Detail
        </Typography>
        <Typography variant="h5" component="div">
          {detailData.name}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Consumed Read
        </Typography>
        <Typography variant="body1">{detailData.numberAsText}</Typography>
      </CardContent>
    </Card>
  );
};

export default CovizDetail;
