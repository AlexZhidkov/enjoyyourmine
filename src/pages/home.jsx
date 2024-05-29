import React from 'react';
import { useState } from 'react';
import { useLocation, useLoaderData } from "react-router-dom";
import { db, auth } from "../config/firebase-config";
import { doc, setDoc, deleteDoc } from "firebase/firestore";
import { SelectedWorkshopCard, AvailableWorkshops } from "./workshop";
import HomeAppBar from './homeAppBar';
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
            {selected?.toLowerCase() === title.toLowerCase() ? <Button disabled>Selected</Button> : <Button onClick={() => onChangeSelection(title)}>Select</Button>}
        </CardActions>
    </React.Fragment>
);

export const Home = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const preselectedPackage = queryParams.get('package');

    const loaderData = useLoaderData();
    const availableWorkshops = loaderData.availableWorkshops || [];
    const [selectedPackage, setSelectedPackage] = useState(preselectedPackage);
    const [selectedWorkshops, setSelectedWorkshops] = useState(loaderData.selectedWorkshops || []);

    const onSelectPackage = (title) => {
        setSelectedPackage(title);
    };

    const packages = [
        { title: "Bronze", description: "14 workshops and classes" },
        { title: "Silver", description: "21 workshops and classes" },
        { title: "Gold", description: "28 workshops and classes" }
    ];

    const onSelectWorkshop = (id) => {
        const index = availableWorkshops.findIndex(workshop => workshop.id === id);
        setDoc(doc(db, "users", auth.currentUser.uid, "workshops", id), availableWorkshops[index]);
        setSelectedWorkshops([
            ...selectedWorkshops,
            availableWorkshops[index]
        ]);
        availableWorkshops[index].isSelected = true;
    };

    const onRemoveWorkshop = (index) => {
        deleteDoc(doc(db, "users", auth.currentUser.uid, "workshops", selectedWorkshops[index].id));
        const availableWorkshopsIndex = availableWorkshops.findIndex(workshop => workshop.id === selectedWorkshops[index].id);
        if (availableWorkshopsIndex >= 0) {
            availableWorkshops[availableWorkshopsIndex].isSelected = false;
        }
        setSelectedWorkshops(selectedWorkshops.filter((workshop, i) => i !== index));
    };

    const createEmail = () => {
        var i = 1;
        var body = 'Hi Hazel, \n\nI would like to request the following workshops:\n';
        selectedWorkshops.forEach(workshop => {
            body += ` ${i++}. ${workshop.facilitator} - ${workshop.title}\n`;
        });
        body += `\nThanks,\n${auth.currentUser.displayName}`;
        return 'mailto:jamie@fakeemail.com?subject=Workshops Request&body=' + encodeURIComponent(body);
    };

    return (
        <>
            <HomeAppBar />
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
                    <Button variant="contained" href={createEmail()}>
                        Request Workshops
                    </Button>
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
                    <AvailableWorkshops workshops={availableWorkshops.filter(w => w.isSelected !== true)} onSelectWorkshop={onSelectWorkshop} />
                </Grid>
            </Grid>
        </>
    );
}