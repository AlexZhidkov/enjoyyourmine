import React from 'react';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import CardActionArea from '@mui/material/CardActionArea';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const getFacilitatorUrl = (facilitator) => {
    return 'https://enjoyyourmine.com/our-presenters/#' + facilitator.toLowerCase().replace(/ /g, "-");
}

const WorkshopCard = ({ id, title, facilitator, description, onSelected }) => (
    <React.Fragment>
        <CardHeader
            avatar={
                <CardActionArea href={getFacilitatorUrl(facilitator)} target='_blank'>
                    <Avatar sx={{ bgcolor: '#f3b013' }} aria-label="presenter" alt={facilitator} src={"/avatars/" + facilitator + ".jpg"}>
                        {facilitator}
                    </Avatar>
                </CardActionArea>
            }
            title={title}
            subheader={
                <CardActionArea href={getFacilitatorUrl(facilitator)} target='_blank'>
                    {facilitator}
                </CardActionArea>
            }
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

export const SelectedWorkshopCard = ({ index, title, facilitator, description, onSelected }) => (
    <React.Fragment>
        <CardHeader
            avatar={
                <CardActionArea href={getFacilitatorUrl(facilitator)} target='_blank'>
                    <Avatar sx={{ bgcolor: '#f3b013' }} aria-label="presenter" alt={facilitator} src={"/avatars/" + facilitator + ".jpg"}>
                        {facilitator}
                    </Avatar>
                </CardActionArea>
            }
            title={title}
            subheader={
                <CardActionArea href={getFacilitatorUrl(facilitator)} target='_blank'>
                    {facilitator}
                </CardActionArea>
            }
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

export const AvailableWorkshops = ({ workshops, onSelectWorkshop }) => {
    workshops.sort((a, b) => a.title.localeCompare(b.title));
    const categories = workshops.map(workshop => workshop.category).filter((value, index, self) => self.indexOf(value) === index);
    categories.sort();
    return (
        <>
            {categories.map((category, index) => (
                <Accordion key={category}>
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
