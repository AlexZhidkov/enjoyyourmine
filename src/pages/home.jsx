import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';

const Package = ({ title, description }) => (
    <React.Fragment>
        <CardContent>
            <Typography sx={{ fontSize: 65, fontWeight: 700 }} color="text.secondary" gutterBottom>
                {title}
            </Typography>
            <Typography>
                {description}
            </Typography>
        </CardContent>
        <CardActions>
            <Button>Select</Button>
        </CardActions>
    </React.Fragment>
);

export const Home = () => {
    return (
        <div>
            <h1>EnjoyYourMine Workshop Packages</h1>
            <Grid2 container spacing={2}>
                <Grid2 item xs={12} sm={12} md={4}>
                    <Card variant="outlined">
                        <Package title="Bronze" description="14 workshops and classes" />
                    </Card>
                </Grid2>
                <Grid2 item xs={12} sm={12} md={4}>
                    <Card variant="outlined">
                        <Package title="Silver" description="21 workshops and classes" />
                    </Card>
                </Grid2>
                <Grid2 item xs={12} sm={12} md={4}>
                    <Card variant="outlined">
                        <Package title="Gold" description="28 workshops and classes" />
                    </Card>
                </Grid2>
            </Grid2>
        </div>
    );
}