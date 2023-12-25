import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CancelIcon from '@mui/icons-material/Cancel';
import { useFirebase } from '../Context/Firebase';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import {
    getFirestore,
    onSnapshot,
    doc,
    updateDoc,
    collection,
    getDocs
} from 'firebase/firestore';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import AOS from 'aos';
import 'aos/dist/aos.css';


export default function CancelTicket() {

    const firebase = useFirebase();
    const db = getFirestore();
    const navigate = useNavigate();

    const handleCancelTicket = () => {

        const searchID = window.localStorage.getItem("PayID");
        const trainID = window.localStorage.getItem("TrainID");

        window.localStorage.removeItem("PayID");
        window.localStorage.removeItem("TrainID");


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
                if (element.id == searchID) {
                    console.log('element.Trains : ', element);
                    element.Trains.forEach((ele) => {
                        if (ele.TrainNumber === trainID) {
                            ele.SearchIsPaid = false;
                        }
                    })
                    myListOfBook = element;
                }
            })
            console.log('myListOfBook...', myListOfBook);
            const docRef = doc(db, path, searchID);
            updateDoc(docRef, {
                ...myListOfBook
            })
                .then(() => {
                    console.log('Booked..');
                })
                .catch((error) => {
                    console.error('Error booked : ', error);
                });
        })
        navigate("/booklist");
    };

    const handleIgnore = () => {
        navigate("/booklist");
    }

    React.useEffect(() => {
        const searchID = window.localStorage.getItem("PayID");
        const trainID = window.localStorage.getItem("TrainID");

        if (searchID === null || trainID === null) {
            navigate("/booklist");
        }
    }, []);

    const theme = createTheme({
        typography: {
            fontFamily: 'Quicksand',
            body1: {
                fontWeight: '600',
                fontSize: 'medium'
            },
        },
    });

    React.useEffect(() => {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
        });
    }, []);

    return (
        <>
            <ThemeProvider theme={theme}>
                <Card data-aos="fade-up" sx={{ maxWidth: 345, margin: 'auto', marginTop: '6%', marginBottom: '6%', textAlign: 'center', paddingTop: '20px' }}>
                    <CancelIcon sx={{ fontSize: 80, color: 'error' }} />
                    <CardContent>
                        <Typography variant="h5" component="div" style={{ fontWeight: 'bold' }}>
                            Are You Sure?
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Do you really want cancel the ticket? This process cannot be undone.
                        </Typography>
                    </CardContent>
                    <CardActions sx={{ justifyContent: 'center' }}>
                        <Button style={{ fontWeight: 'bold' }} onClick={handleIgnore} variant="outlined" color='info'>Ignore</Button>
                        <Button style={{ fontWeight: 'bold' }} onClick={handleCancelTicket} variant="contained" color='error'>Cancel ticket</Button>
                    </CardActions>
                </Card>
                <Typography style={{ margin: 'auto', marginTop: "4%", marginBottom: "4%", width: '90%', fontWeight: 'bold' }} variant="h4">
                    Policies
                </Typography>
                <Box data-aos="fade-up" sx={{ display: 'flex', flexGrow: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Grid container spacing={2} sx={{ flex: 1, alignItems: 'center' }} style={{ margin: '4em', marginTop: 0, padding: '2em', border: '1px solid black', width: 'auto', borderRadius: '2em', backgroundColor: 'rgb(255, 254, 232)' }}>
                        <Grid item xs={12}>
                            <Grid container spacing={2}>
                                <Grid item xs={3}>
                                    1. Cancellation Fee:
                                </Grid>
                                <Grid item xs={7}>
                                    A cancellation fee will be applicable based on the time of cancellation. The closer to the departure date, the higher the cancellation fee.
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container spacing={2}>
                                <Grid item xs={3}>
                                    2. Time Constraints:
                                </Grid>
                                <Grid item xs={7}>
                                    Tickets can only be canceled within a specified time frame before the scheduled departure. Cancellations after this period may not be eligible for a refund.
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container spacing={2}>
                                <Grid item xs={3}>
                                    3. Refund Policy:
                                </Grid>
                                <Grid item xs={7}>
                                    The refund amount will be subject to the cancellation fee and the time of cancellation. Some tickets may be non-refundable.
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container spacing={2}>
                                <Grid item xs={3}>
                                    4. Cancellation Channels:
                                </Grid>
                                <Grid item xs={7}>
                                    Specify the acceptable channels for cancellation, such as online platforms, authorized agents, or designated counters. Each channel may have its own set of rules.
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container spacing={2}>
                                <Grid item xs={3}>
                                    5. Documentation:
                                </Grid>
                                <Grid item xs={7}>
                                    Customers may be required to provide certain documentation or details for the cancellation process, such as booking reference number, identification, or the credit/debit card used for booking.
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container spacing={2}>
                                <Grid item xs={3}>
                                    6. Partial Cancellations:
                                </Grid>
                                <Grid item xs={7}>
                                    In case of partial cancellations (cancelling only a portion of the booked tickets), specific rules and conditions may apply.
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container spacing={2}>
                                <Grid item xs={3}>
                                    7. Seasonal Variations:
                                </Grid>
                                <Grid item xs={7}>
                                    During peak seasons or special events, there may be additional restrictions on cancellations or different terms and conditions. This should be clearly communicated.
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container spacing={2}>
                                <Grid item xs={3}>
                                    8. Force Majeure:
                                </Grid>
                                <Grid item xs={7}>
                                    Specify the conditions under which cancellations can be made due to unforeseen circumstances like natural disasters, strikes, or other force majeure events.
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container spacing={2}>
                                <Grid item xs={3}>
                                    9. Voucher or Credit Options:
                                </Grid>
                                <Grid item xs={7}>
                                    Instead of a refund, customers may be offered a voucher or credit for future travel. Detail the terms and conditions associated with these alternatives.
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container spacing={2}>
                                <Grid item xs={3}>
                                    10. Communication:
                                </Grid>
                                <Grid item xs={7}>
                                    Outline the process for informing customers about the cancellation, including notification methods and timelines. This can include emails, SMS, or notifications through the booking platform.
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>
            </ThemeProvider>
        </>
    );
}