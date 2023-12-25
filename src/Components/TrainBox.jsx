import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions, capitalize } from '@mui/material';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import AddIcon from '@mui/icons-material/Add';
import DirectionsSubwayIcon from '@mui/icons-material/DirectionsSubway';
//
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
//
import TableOfSchedule from './TableOfSchedule.jsx';
import { useNavigate } from 'react-router-dom';
//
import trains from './AllTrainDetail';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import RemoveIcon from '@mui/icons-material/Remove';
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';

import { useState } from 'react';
//
import {
    addDoc,
    collection,
    getFirestore,
    query,
    where,
    onSnapshot,
    deleteDoc,
    doc,
    updateDoc,
    getDocs
} from 'firebase/firestore';
import { useFirebase } from '../Context/Firebase.jsx';
import { useEffect } from 'react';
import { useSearchTrain } from '../Context/SearchTrain.jsx';
import { FormLabel } from 'react-bootstrap';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

import '../CSS/TrainBox.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));



function TrainBox(props) {
    const navigate = useNavigate();
    const { FromText = '', ToText = '', DateText = '', TrainID = '' } = props.data || {};
    const row = props.data.row;
    console.log('row', row);
    const capitalize = (str) => {
        str = str.toLowerCase();
        return str ? str.charAt(0).toUpperCase() + str.slice(1) : '';
    }

    const [open, setOpen] = React.useState(false);
    const [openAdded, setOpenAdded] = React.useState(false);
    const [openRemoved, setOpenRemoved] = React.useState(false);
    const [myVisibility, setMyVisibility] = useState('');

    const firebase = useFirebase();
    const SerachTrain = useSearchTrain();
    const path = 'User/' + firebase.UserID + '/BookList';
    const db = getFirestore();
    const colRef = collection(db, path);



    function getCurrentDateTime() {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');

        const day = String(now.getDate()).padStart(2, '0');
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const year = now.getFullYear();

        const formattedDateTime = `${hours}:${minutes}, ${day}/${month}/${year}`;
        return formattedDateTime;
    }

    const currentDateTime = getCurrentDateTime();

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const handleCloseAdded = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenAdded(false);
    };
    const handleCloseRemoved = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenRemoved(false);
    };

    const navigateToPayment = (e) => {
        e.preventDefault();
        addToBookList();
        window.localStorage.setItem("PayID", e.TrainID);
        window.localStorage.setItem("TrainID", e.TrainNumber);
        navigate("/payment");
    }

    const addToBookList = () => {

        setOpenAdded(true);
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
                if (element.id == TrainID) {
                    console.log('element.Trains : ', element);

                    element.Trains.forEach((ele) => {
                        if (ele.TrainNumber === row.TrainNumber) {
                            ele.isBooked = true;
                        }
                    })
                    myListOfBook = element;
                }

            })
            console.log('myListOfBook...', myListOfBook);
            const docRef = doc(db, path, TrainID);
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
            .catch((error) => {
                console.error('Error viewing document: ', error);
            });
    };

    const removeFromBookList = () => {

        setOpenRemoved(true);
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
                if (element.id == TrainID) {
                    console.log('element.Trains : ', element);

                    element.Trains.forEach((ele) => {
                        if (ele.TrainNumber === row.TrainNumber) {
                            ele.isBooked = false;
                        }
                    })
                    myListOfBook = element;
                }

            })
            console.log('myListOfBook...', myListOfBook);
            const docRef = doc(db, path, TrainID);
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
            .catch((error) => {
                console.error('Error viewing document: ', error);
            });
    };

    function calculateTimeDuration(startTime, endTime) {
        const [startHour, startMinute] = startTime.split(":").map(Number);
        const [endHour, endMinute] = endTime.split(":").map(Number);

        // Convert the time values to minutes
        const startTimeInMinutes = startHour * 60 + startMinute;
        const endTimeInMinutes = endHour * 60 + endMinute;

        // Calculate the time duration in minutes
        const durationInMinutes = endTimeInMinutes - startTimeInMinutes;

        // Convert the duration back to hours and minutes
        const durationHours = Math.floor(durationInMinutes / 60);
        const durationMinutes = durationInMinutes % 60;
        const formattedDuration = `${String(durationHours).padStart(2, '0')}:${String(durationMinutes).padStart(2, '0')}`;

        return formattedDuration;
    }
    useEffect(() => {
        AOS.init({
            duration: 600,
            easing: 'ease-in-out',
            once: true,
        });
    }, []);

    const theme = createTheme({
        typography: {
            fontFamily: 'Quicksand',
            body1: {
                fontWeight: 'bold',
                fontSize: 'large',
            },
        },
    });

    return (
        <>
            <div data-aos="fade-up">
                <ThemeProvider theme={theme}>
                    <Card sx={{
                        padding: '1em',
                        borderRadius: '1em',
                        maxWidth: { xs: '100%', sm: '90%' },
                        backgroundColor: '#e3f2fd',
                        boxShadow: '4px 4px 4px rgba(60, 60, 60, 0.1)',
                        margin: 'auto',
                        marginTop: 5
                    }}>
                        <CardContent>
                            <Box sx={{ flexGrow: 1 }}>
                                <Grid container spacing={1}>
                                    <Grid item xs={12} md={4}>
                                        <Typography style={{ fontWeight: 'bold' }} gutterBottom variant="h5" component="div">
                                            {row.TrainName}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} md={4} sx={{ textAlign: { xs: 'center', md: 'center' } }}>
                                        Runs on:
                                        <Box sx={{ display: 'inline-flex', gap: { xs: '2px', md: '8px' }, alignItems: 'center' }}>
                                            {row.RunsOn.Monday ?
                                                <Button style={{ fontWeight: 'bold' }} sx={{ fontSize: '0.9rem', width: '0.1%' }}>
                                                    M
                                                </Button>
                                                :
                                                <Button sx={{ fontSize: '0.9rem' }} disabled>
                                                    M
                                                </Button>
                                            } {row.RunsOn.Tuesday ?
                                                <Button style={{ fontWeight: 'bold' }} sx={{ fontSize: '0.9rem' }}>
                                                    T
                                                </Button>
                                                :
                                                <Button sx={{ fontSize: '0.9rem' }} disabled>
                                                    T
                                                </Button>
                                            } {row.RunsOn.Wednesday ?
                                                <Button style={{ fontWeight: 'bold' }} sx={{ fontSize: '0.9rem' }}>
                                                    W
                                                </Button>
                                                :
                                                <Button sx={{ fontSize: '0.9rem' }} disabled>
                                                    W
                                                </Button>
                                            } {row.RunsOn.Thursday ?
                                                <Button style={{ fontWeight: 'bold' }} sx={{ fontSize: '0.9rem' }}>
                                                    T
                                                </Button>
                                                :
                                                <Button sx={{ fontSize: '0.9rem' }} disabled>
                                                    T
                                                </Button>
                                            } {row.RunsOn.Friday ?
                                                <Button style={{ fontWeight: 'bold' }} sx={{ fontSize: '0.9rem' }}>
                                                    F
                                                </Button>
                                                :
                                                <Button sx={{ fontSize: '0.9rem' }} disabled>
                                                    F
                                                </Button>
                                            } {row.RunsOn.Saturday ?
                                                <Button style={{ fontWeight: 'bold' }} sx={{ fontSize: '0.9rem' }}>
                                                    S
                                                </Button>
                                                :
                                                <Button sx={{ fontSize: '0.9rem' }} disabled>
                                                    S
                                                </Button>
                                            } {row.RunsOn.Sunday ?
                                                <Button style={{ fontWeight: 'bold' }} sx={{ fontSize: '0.9rem' }}>
                                                    S
                                                </Button>
                                                :
                                                <Button sx={{ fontSize: '0.9rem' }} disabled>
                                                    S
                                                </Button>
                                            }
                                        </Box>
                                    </Grid>
                                    <Grid item xs={12} md={4} sx={{ textAlign: { xs: 'right', md: 'right' } }}>
                                        <React.Fragment>
                                            <Button style={{ fontWeight: 'bold' }} variant="outlined" onClick={handleClickOpen}>
                                                Train schedule
                                            </Button>
                                            <BootstrapDialog
                                                onClose={handleClose}
                                                aria-labelledby="customized-dialog-title"
                                                open={open}
                                            >
                                                <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                                                    SCHEDULE
                                                </DialogTitle>
                                                <IconButton
                                                    aria-label="close"
                                                    onClick={handleClose}
                                                    sx={{
                                                        position: 'absolute',
                                                        right: 8,
                                                        top: 8,
                                                        color: (theme) => theme.palette.grey[500],
                                                    }}
                                                >
                                                    <CloseIcon />
                                                </IconButton>
                                                <DialogContent dividers>
                                                    <TableOfSchedule data={row.Stations} />
                                                </DialogContent>
                                                <DialogActions>
                                                </DialogActions>
                                            </BootstrapDialog>
                                        </React.Fragment>

                                    </Grid>
                                </Grid>
                            </Box>
                            <Typography sx={{ marginTop: 0.5 }} variant="h6" color="text.secondary">
                                <Box sx={{ flexGrow: 1 }}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={4} style={{ fontWeight: 'bold' }}>
                                            {row.Stations[1].ArrivalTime} | {capitalize(FromText)} | {DateText}
                                        </Grid>
                                        <Grid item xs={4} sx={{ textAlign: 'center' }} style={{ fontWeight: '600' }}>
                                            <HorizontalRuleIcon />
                                            {calculateTimeDuration(row.Stations[1].ArrivalTime, row.Stations[5].DepartureTime)}
                                            <HorizontalRuleIcon />
                                        </Grid>
                                        <Grid item xs={4} sx={{ textAlign: 'right' }} style={{ fontWeight: 'bold' }}>
                                            {row.Stations[1].DepartureTime} | {capitalize(ToText)} | {DateText}
                                        </Grid>
                                    </Grid>
                                </Box>
                            </Typography>
                            <Grid container spacing={1} sx={{ marginTop: { xs: 1, md: 2 } }}>
                                <Grid item xs={12} md={1}> {/* Adjusted to full width on mobile */}
                                    <FormLabel variant="contained" size="small">
                                        Discount on
                                    </FormLabel>
                                </Grid>
                            </Grid>
                            <Button variant="outlined" size="large" className='mx-1' >
                                {row.JourneyClass.AC3Tier ?
                                    "2S"
                                    :
                                    "AC3"
                                }
                            </Button>
                            <Button variant="outlined" size="large" className='mx-1' >
                                {row.JourneyClass.AcChairCar ?
                                    "AcCC"
                                    :
                                    "ExC"
                                }
                            </Button>
                        </CardContent>
                        <CardActions>
                            {row.isBooked ? (
                                <Button style={{ fontWeight: 'bold' }} onClick={removeFromBookList} variant="outlined" endIcon={<RemoveIcon />} >
                                    Remove from BookList
                                </Button>
                            ) : (
                                <Button style={{ fontWeight: 'bold' }} onClick={addToBookList} variant="outlined" endIcon={<AddIcon />}>
                                    Add to BookList
                                </Button>
                            )}
                            <Button style={{ fontWeight: 'bold' }} onClick={navigateToPayment} variant="outlined" endIcon={<DirectionsSubwayIcon />}>
                                Book
                            </Button>
                            {/* <Snackbar open={openAdded} autoHideDuration={4000} onClose={handleCloseAdded}>
                                <Alert onClose={handleCloseAdded} severity="success" color='success' sx={{ width: '100%' }}>
                                    Added Successfully !!
                                </Alert>
                            </Snackbar>
                            <Snackbar open={openRemoved} autoHideDuration={4000} onClose={handleCloseRemoved}>
                                <Alert onClose={handleCloseRemoved} severity="success" color='success' sx={{ width: '100%' }}>
                                    Removed Successfully !!
                                </Alert>
                            </Snackbar> */}
                        </CardActions>
                    </Card>
                </ThemeProvider>
            </div >
        </>
    )
}

export default TrainBox;