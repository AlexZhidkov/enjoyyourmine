import React from 'react';
import { useState, useEffect } from 'react';
import { db } from "../config/firebase-config";
import { collection, getDocs } from "firebase/firestore";
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Unstable_Grid2';
import LinearProgress from '@mui/material/LinearProgress';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

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

const WorkshopCard = ({ id, title, facilitator, description, onSelected }) => (
    <React.Fragment>
        <CardHeader
            avatar={
                <Avatar sx={{ bgcolor: '#f3b013' }} aria-label="presenter" alt={facilitator} src={"/avatars/" + facilitator + ".jpg"}>
                    {facilitator}
                </Avatar>
            }
            title={title}
            subheader={facilitator}
        />
        <CardContent>
            <Typography>
                {description}
            </Typography>
        </CardContent>
        <CardActions>
            <Button onClick={() => onSelected(id)}>Select</Button>
        </CardActions>
    </React.Fragment>
);

const SelectedWorkshopCard = ({ index, title, facilitator, description, onSelected }) => (
    <React.Fragment>
        <CardHeader
            avatar={
                <Avatar sx={{ bgcolor: '#f3b013' }} aria-label="presenter" alt={facilitator} src={"/avatars/" + facilitator + ".jpg"}>
                    {facilitator}
                </Avatar>
            }
            title={title}
            subheader={facilitator}
        />
        <CardContent>
            <Typography>
                {description}
            </Typography>
        </CardContent>
        <CardActions>
            <Button onClick={() => onSelected(index)}>Remove</Button>
        </CardActions>
    </React.Fragment>
);

const AvailableWorkshops = ({ workshops, onSelectWorkshop }) => {
    workshops.sort((a, b) => a.title.localeCompare(b.title));
    const categories = workshops.map(workshop => workshop.category).filter((value, index, self) => self.indexOf(value) === index);
    categories.sort();
    return (
        <>
            {categories.map((category, index) => (
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls={"panel" + index + "-content"}
                        id={"panel" + index + "-header"}
                    >
                        <Typography sx={{ fontSize: 20 }} color="text.secondary">
                            &bull; {category}
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        {workshops.filter(workshop => workshop.category === category).map((workshop) => (
                            <Card key={workshop.id} variant="outlined">
                                <WorkshopCard
                                    id={workshop.id}
                                    title={workshop.title}
                                    facilitator={workshop.facilitator}
                                    description={workshop.description}
                                    onSelected={onSelectWorkshop} />
                            </Card>
                        ))}
                    </AccordionDetails>
                </Accordion>
            ))}
        </>
    )
};

export const Home = () => {
    const [isDataLoading, setIsDataLoading] = useState(false);
    const [selectedPackage, setSelectedPackage] = useState(null);
    const [availableWorkshops, setAvailableWorkshops] = useState([]);
    const [selectedWorkshops, setSelectedWorkshops] = useState([]);

    const onSelectPackage = (title) => {
        setSelectedPackage(title);
    };

    const packages = [
        { title: "Bronze", description: "14 workshops and classes" },
        { title: "Silver", description: "21 workshops and classes" },
        { title: "Gold", description: "28 workshops and classes" }
    ];

    useEffect(() => {
        setIsDataLoading(true);
        const fetchWorkshops = async () => {
            const workshops = [];
            const querySnapshot = await getDocs(collection(db, "workshops"));
            querySnapshot.forEach((doc) => {
                workshops.push({ id: doc.id, ...doc.data() });
            });
            setAvailableWorkshops(workshops);
            setIsDataLoading(false);
        };

        fetchWorkshops();
    }, []);

    const onSelectWorkshop = (id) => {
        const index = availableWorkshops.findIndex(workshop => workshop.id === id);
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
            {isDataLoading && <LinearProgress />}
            <Grid container spacing={2}>
                <Grid key="Selected" xs={12} sm={12} md={6}>
                    <h2>Selected - {selectedWorkshops.length}</h2>
                    {selectedWorkshops.map((workshop, index) => (
                        <Card key={index} variant="outlined">
                            <SelectedWorkshopCard
                                index={index}
                                title={workshop.title}
                                facilitator={workshop.facilitator}
                                description={workshop.description}
                                onSelected={onRemoveWorkshop} />
                        </Card>
                    ))}
                </Grid>
                <Grid key="Available" xs={12} sm={12} md={6}>
                    <h2>Available</h2>
                    <AvailableWorkshops workshops={availableWorkshops} onSelectWorkshop={onSelectWorkshop} />
                </Grid>
            </Grid>
        </>
    );
}