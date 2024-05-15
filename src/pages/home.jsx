import React from 'react';
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import { db } from "../config/firebase-config";
import { collection, getDocs } from "firebase/firestore";
import { SelectedWorkshopCard, AvailableWorkshops } from "./workshop";
import { AuthContext } from "../AuthProvider";
import HomeAppBar from './homeAppBar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Unstable_Grid2';
import LinearProgress from '@mui/material/LinearProgress';

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
    let navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const preselectedPackage = queryParams.get('package');

    const [isDataLoading, setIsDataLoading] = useState(false);
    const [selectedPackage, setSelectedPackage] = useState(preselectedPackage);
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