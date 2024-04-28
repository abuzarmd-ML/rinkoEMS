import * as React from 'react';
import Link from '@mui/material/Link';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Title from './Title';

function preventDefault(event) {
  event.preventDefault();
}

export default function CardContents({cardsDetails}) {
  return (
    <React.Fragment>
      <Title>{cardsDetails.title}</Title>
       <Divider sx={{backgroundColor:'blue',mb:1}}/>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
      {cardsDetails.info1}
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
      {cardsDetails.info2}
      </Typography>
      <div>
        <Link color="primary" href={cardsDetails.link}>
          Add or Edit info details
        </Link>
      </div>
    </React.Fragment>
  );
}