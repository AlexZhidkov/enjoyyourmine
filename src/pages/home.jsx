import React from 'react';
import { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Unstable_Grid2';

const PackageCard = ({ title, description, selected, onChangeSelection }) => (
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
            {selected === title ? <Button disabled>Selected</Button> : <Button onClick={() => onChangeSelection(title)}>Select</Button>}
        </CardActions>
    </React.Fragment>
);

const WorkshopCard = ({ index, title, facilitator, description, actionText, onSelected }) => (
    <React.Fragment>
        <CardContent>
            <Typography sx={{ fontSize: 20 }} color="text.secondary" gutterBottom>
                {title}
            </Typography>
            <Typography sx={{ fontWeight: 'bold' }}>
                {facilitator}
            </Typography>
            <Typography>
                {description}
            </Typography>
        </CardContent>
        <CardActions>
            <Button onClick={() => onSelected(index)}>{actionText}</Button>
        </CardActions>
    </React.Fragment>
);

export const Home = () => {
    const [selectedPackage, setSelectedPackage] = useState(null);

    const onSelectPackage = (title) => {
        setSelectedPackage(title);
    };

    const packages = [
        { title: "Bronze", description: "14 workshops and classes" },
        { title: "Silver", description: "21 workshops and classes" },
        { title: "Gold", description: "28 workshops and classes" }
    ];

    const workshops = [
        { title: "Improving your Financial Wellbeing", facilitator: "Grace", description: "" },
        { title: "Money Matters", facilitator: "Rob Glenn", description: "" },
        { title: "Money Mindset Mastery", facilitator: "Alfie", description: "Unlock the power of a positive money mindset and learn how to overcome limiting beliefs to achieve financial success." }
    ];

    const [availableWorkshops, setAvailableWorkshops] = useState(workshops);
    const [selectedWorkshops, setSelectedWorkshops] = useState([]);

    const onSelectWorkshop = (index) => {
        setSelectedWorkshops([
            ...selectedWorkshops,
            availableWorkshops[index]
        ]);
        setAvailableWorkshops(availableWorkshops.filter((workshop, i) => i !== index));
    };

    const onRemoveWorkshop = (index) => {
        setAvailableWorkshops([
            ...availableWorkshops,
            selectedWorkshops[index]
        ]);
        setSelectedWorkshops(selectedWorkshops.filter((workshop, i) => i !== index));
    };

    return (
        <>
            <h1>EnjoyYourMine Workshop Packages</h1>
            <Grid container spacing={2}>
                {packages.map((workshopsPackage) => (
                    <Grid key={workshopsPackage.title} xs={12} sm={12} md={4}>
                        <Card variant="outlined">
                            <PackageCard
                                title={workshopsPackage.title}
                                description={workshopsPackage.description}
                                selected={selectedPackage}
                                onChangeSelection={onSelectPackage}
                            />
                        </Card>
                    </Grid>
                ))}
            </Grid>

            <h1>Workshops</h1>
            <Grid container spacing={2}>
                <Grid key="Selected" xs={12} sm={12} md={6}>
                    <h2>Selected - {selectedWorkshops.length}</h2>
                    {selectedWorkshops.map((workshop, index) => (
                        <Card key={index} variant="outlined">
                            <WorkshopCard
                                index={index}
                                title={workshop.title}
                                facilitator={workshop.facilitator}
                                description={workshop.description}
                                actionText="Remove"
                                onSelected={onRemoveWorkshop} />
                        </Card>
                    ))}
                </Grid>
                <Grid key="Available" xs={12} sm={12} md={6}>
                    <h2>Available</h2>
                    {availableWorkshops.map((workshop, index) => (
                        <Card key={index} variant="outlined">
                            <WorkshopCard
                                index={index}
                                title={workshop.title}
                                facilitator={workshop.facilitator}
                                description={workshop.description}
                                actionText="Select"
                                onSelected={onSelectWorkshop} />
                        </Card>
                    ))}
                </Grid>
            </Grid>
        </>
    );
}