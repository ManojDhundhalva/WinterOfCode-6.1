import {
    getFirestore,
    getDocs,
    addDoc,
    doc,
    updateDoc,
    collection,
    onSnapshot,
    deleteDoc,
    where,
    query
} from 'firebase/firestore';
import { useFirebase } from '../Context/Firebase';
import { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';

import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import PaymentIcon from '@mui/icons-material/Payment';
import CancelIcon from '@mui/icons-material/Cancel';

import { useNavigate } from 'react-router-dom';
import RemoveIcon from '@mui/icons-material/Remove';
import { Tune } from '@mui/icons-material';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

function Booklist() {
    const [expanded, setExpanded] = React.useState(false);
    const [isPaid, setIsPaid] = useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const [myList, setList] = useState([]);
    const firebase = useFirebase();
    const db = getFirestore();
    const navigate = useNavigate();

    const removeFromBookList = (e) => {
        const path = 'User/' + firebase.UserID + '/SearchList';
        const colRef = collection(db, path);

        getDocs(colRef).then((snapshot) => {
            let upperbooks = [];
            snapshot.forEach((doc) => {
                upperbooks.push({ ...doc.data(), id: doc.id });
            });
            console.log('UPPERbooks2::::', upperbooks);

            let myListOfBook;
            upperbooks.forEach((element) => {
                if (element.id === e.SearchID) {
                    console.log('element.Trains : ', element);

                    element.Trains.forEach((ele) => {
                        if (ele.TrainNumber === e.TrainNumber) {
                            ele.isBooked = false;
                            ele.SearchIsPaid = false;
                            setIsPaid(false);
                        }
                    });
                    myListOfBook = element;
                }
            });
            console.log('myListOfBook...', myListOfBook);
            const docRef = doc(db, path, e.SearchID);
            updateDoc(docRef, {
                ...myListOfBook,
            })
                .then(() => {
                    console.log('Booked..');
                })
                .catch((error) => {
                    console.error('Error booked : ', error);
                });
        });
    };

    const handleEvent = (e) => {
        window.localStorage.setItem("PayID", e.SearchID);
        window.localStorage.setItem("TrainID", e.TrainNumber);

        if (!e.SearchIsPaid) {
            navigate("/payment");
        }
        else {
            navigate("/cancelticket");
        }
    }

    useEffect(() => {
        console.log('Fetching documents...');
        if (firebase.UserID != undefined && firebase.UserID) {

            const upperPath = 'User/' + firebase.UserID + '/SearchList';
            const upppercolRef = collection(db, upperPath);
            onSnapshot(upppercolRef, (snapshot) => {
                let upperbooks = [];
                snapshot.forEach((doc) => {
                    upperbooks.push({ ...doc.data(), id: doc.id });
                });
                console.log('UPPERbooks2::::', upperbooks);

                let upperBookedList = [];
                upperbooks.forEach((element) => {
                    const temp = {
                        SearchAllClasses: element.SearchAllClasses,
                        SearchCatagories: element.SearchCatagories,
                        SearchDateText: element.SearchDateText,
                        SearchFromText: element.SearchFromText,
                        SearchToText: element.SearchToText,
                        SearchID: element.id
                    }
                    element.Trains.forEach((ele) => {
                        if (ele.isBooked === true) {
                            upperBookedList.push({ ...temp, ...ele });
                        }
                    })
                })
                setList((prevList) => [...upperBookedList]);
            })
        }

    }, [firebase.UserID]);

    const theme = createTheme({
        typography: {
            fontFamily: 'Quicksand',
            body1: {
                fontWeight: '600',
                fontSize: 'medium'
            },
        },
    });

    useEffect(() => {
        AOS.init({
            duration: 600,
            easing: 'ease-in-out',
            once: true,
        });
    }, []);

    return (
        <>
            <div data-aos="fade-up">
                <ThemeProvider theme={theme}>
                    <Typography style={{ margin: 'auto', marginTop: "4%", marginBottom: "4%", width: '90%', fontWeight: 'bold' }} variant="h4">
                        Booklist
                    </Typography>
                    {myList.length == 0 ?
                        <>
                            <Card sx={{ maxWidth: 345, margin: 'auto' }}>
                                <CardMedia
                                    sx={{ height: 350 }}
                                    image="https://dm0qx8t0i9gc9.cloudfront.net/thumbnails/image/rDtN98Qoishumwih/empty-white-paper-sheet_zJwl80Lu_thumb.jpg"
                                    title="green iguana"
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        EMPTY
                                    </Typography>
                                </CardContent>
                            </Card>
                        </>
                        :
                        <>
                            <Box sx={{ flexGrow: 1 }} style={{ margin: '4%' }}>
                                <Grid container spacing={2}>
                                    {myList.map((row, index) => (
                                        <Grid key={index} item xs={12} md={10}>
                                            <Accordion style={{ backgroundColor: 'ghostwhite' }}>
                                                <AccordionSummary
                                                    expandIcon={<ExpandMoreIcon />}
                                                    aria-controls="panel1a-content"
                                                    id="panel1a-header"
                                                >
                                                    <Typography>
                                                        <Button className='mx-2 px-4' style={{ backgroundColor: "rgb(234, 234, 255)", borderRadius: '1em', fontWeight: 'bold', fontSize: 'large', margin: "0.1em" }}>
                                                            {index + 1}
                                                        </Button>
                                                        <Button className='mx-2 px-4' style={{ backgroundColor: "rgb(234, 234, 255)", borderRadius: '1em', fontWeight: '600', fontSize: 'large', margin: "0.1em" }}>
                                                            From : {row.SearchFromText}
                                                        </Button>
                                                        <Button className='mx-2 px-4' style={{ backgroundColor: "rgb(234, 234, 255)", borderRadius: '1em', fontWeight: '600', fontSize: 'large', margin: "0.1em" }}>
                                                            To : {row.SearchToText}
                                                        </Button>
                                                        <Button className='mx-2 px-4' style={{ backgroundColor: "rgb(234, 234, 255)", borderRadius: '1em', fontWeight: '600', fontSize: 'large', margin: "0.1em" }}>
                                                            Date : {row.SearchDateText}
                                                        </Button>
                                                        <Button className='mx-2 px-4' style={{ backgroundColor: "rgb(234, 234, 255)", borderRadius: '1em', fontWeight: '600', fontSize: 'large', margin: "0.1em" }}>
                                                            Train : {row.TrainNumber}
                                                        </Button>

                                                        {row.SearchIsPaid && <Button className='mx-2 px-4' style={{ backgroundColor: "#83f28f", color: '#00ab41', borderRadius: '1em', fontWeight: '600', fontSize: 'large' }}>
                                                            Paid
                                                        </Button>}
                                                    </Typography>
                                                </AccordionSummary>
                                                <AccordionDetails>
                                                    <Box sx={{ flexGrow: 1 }} style={{ border: '2px solid black', padding: "2em", borderRadius: "2em" }}>
                                                        <Grid container spacing={2} style={{ display: 'flex', }}>
                                                            <Grid container spacing={2} style={{ flex: '1' }}>
                                                                <Grid item xs={6}>
                                                                    Train Name
                                                                </Grid>
                                                                <Grid item xs={6}>
                                                                    : &nbsp; {row.TrainName}
                                                                </Grid>
                                                            </Grid>
                                                            <Grid container spacing={2}>
                                                                <Grid item xs={6} >
                                                                    From
                                                                </Grid>
                                                                <Grid item xs={6}>
                                                                    : &nbsp; {row.SearchFromText}
                                                                </Grid>
                                                            </Grid>
                                                            <Grid container spacing={2}>
                                                                <Grid item xs={6}>
                                                                    To
                                                                </Grid>
                                                                <Grid item xs={6}>
                                                                    : &nbsp; {row.SearchToText}
                                                                </Grid>
                                                            </Grid>
                                                            <Grid container spacing={2}>
                                                                <Grid item xs={6}>
                                                                    Catagory
                                                                </Grid>
                                                                <Grid item xs={6}>
                                                                    : &nbsp;   {row.SearchCatagories}
                                                                </Grid>
                                                            </Grid>
                                                            <Grid container spacing={2}>
                                                                <Grid item xs={6}>
                                                                    Date
                                                                </Grid>
                                                                <Grid item xs={6}>
                                                                    : &nbsp;  {row.SearchDateText}
                                                                </Grid>
                                                            </Grid>
                                                            <Grid container spacing={2}>
                                                                <Grid item xs={6}>
                                                                    AllClasses
                                                                </Grid>
                                                                <Grid item xs={6}>
                                                                    : &nbsp;  {row.SearchAllClasses}
                                                                </Grid>
                                                            </Grid>
                                                            <Grid container spacing={2}>
                                                                <Grid item xs={6}>
                                                                    TrainNumber
                                                                </Grid>
                                                                <Grid item xs={6}>
                                                                    : &nbsp;   {row.TrainNumber}
                                                                </Grid>
                                                            </Grid>
                                                            <Grid container spacing={2}>
                                                                <Grid item xs={6}>
                                                                    AcChairCar
                                                                </Grid>
                                                                <Grid item xs={6}>
                                                                    : &nbsp; {row.JourneyClass.AcChairCar ? 'Yes' : 'No'}
                                                                </Grid>
                                                            </Grid>
                                                            <Grid container spacing={2}>
                                                                <Grid item xs={6}>
                                                                    AC3Tier
                                                                </Grid>
                                                                <Grid item xs={6}>
                                                                    : &nbsp; {row.JourneyClass.AC3Tier ? 'Yes' : 'No'}
                                                                </Grid>
                                                            </Grid>
                                                            <Grid container spacing={2}>
                                                                <Grid item xs={6}>
                                                                    ExecChairCar
                                                                </Grid>
                                                                <Grid item xs={6}>
                                                                    : &nbsp;  {row.JourneyClass.ExecChairCar ? 'Yes' : 'No'}
                                                                </Grid>
                                                            </Grid>
                                                            <Grid container spacing={2}>
                                                                <Grid item xs={6}>
                                                                    SecondSitting
                                                                </Grid>
                                                                <Grid item xs={6}>
                                                                    : &nbsp; {row.JourneyClass.SecondSitting ? 'Yes' : 'No'}
                                                                </Grid>
                                                            </Grid>
                                                            <Grid container spacing={2}>
                                                                <Grid item xs={6}>
                                                                    Price
                                                                </Grid>
                                                                <Grid item xs={6}>
                                                                    : &nbsp; 100Rs.
                                                                </Grid>
                                                            </Grid>
                                                            <Grid container spacing={2} className='mt-4 mx-1' alignItems="center" style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                                <Button onClick={() => { handleEvent(row) }} variant="contained" style={{ backgroundColor: !row.SearchIsPaid ? '#2A386B' : 'crimson' }} endIcon={!row.SearchIsPaid ? <PaymentIcon /> : <CancelIcon />}>
                                                                    {!row.SearchIsPaid ? 'PAY NOW' : 'Cancel Ticket'}
                                                                </Button>
                                                                <Button onClick={() => { removeFromBookList(row) }}
                                                                    variant="outlined"
                                                                    color='inherit'
                                                                    style={{ display: !row.SearchIsPaid ? 'block' : 'none' }}
                                                                >
                                                                    Remove Item <RemoveIcon />
                                                                </Button>
                                                            </Grid>
                                                        </Grid>
                                                    </Box>
                                                </AccordionDetails>
                                            </Accordion>
                                        </Grid>
                                    ))}
                                </Grid>
                            </Box>
                        </>

                    }
                </ThemeProvider>
            </div >
            <div className='mt-5'>
                &nbsp;
            </div>
            <div className='mt-5'>
                &nbsp;
            </div>
            <div className='mt-5'>
                &nbsp;
            </div>
        </>
    )
}

export default Booklist;