import React, { useEffect, useState } from 'react';
import { Button, TextField, Grid, Container, MenuItem, Typography } from '@mui/material';
import {
    getFirestore,
    collection,
    getDocs,
    updateDoc,
    doc,
} from 'firebase/firestore';
import { useFirebase } from '../Context/Firebase';
import { useNavigate } from 'react-router-dom';
import DateRangeIcon from '@mui/icons-material/DateRange';
import Alert from '@mui/material/Alert';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

import Img15 from '../images/image15.jpg';
import Img16 from '../images/image16.jpeg';
import Img17 from '../images/image17.jpeg';
import Img18 from '../images/image18.jpeg';
import Gif19 from '../images/gif19.gif';
import Gif20 from '../images/gif20.gif';
import Gif21 from '../images/gif21.gif';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import PaymentIcon from '@mui/icons-material/Payment';


const countries = [
    { value: 'us', label: 'United States' },
    { value: 'ca', label: 'Canada' },
    { value: 'in', label: 'India' }
    // Add more countries as needed
];

const PaymentForm = () => {

    let PAYDATA;

    const [cardNumber, setCardNumber] = useState('');
    const [cardNumberDisplay, setCardNumberDisplay] = useState('');
    const [isCardNumberValid, setIsCardNumberValid] = useState(false);
    const [month, setMonth] = useState('');
    const [isValidMonth, setIsValidMonth] = useState(true);
    const [isValidYear, setIsValidYear] = useState(true);
    const [year, setYear] = useState('');
    const [cvc, setCvc] = useState('');
    const [selectedCountry, setSelectedCountry] = useState('');
    const [isValidPayment, setIsValidPayment] = useState(true);

    const firebase = useFirebase();
    const db = getFirestore();
    const navigate = useNavigate();

    const handleCardNumberChange = (e) => {
        const input = e.target.value.replace(/\D/g, ''); // Remove non-numeric characters
        // setCardNumber(input);

        // Format for display
        let formattedCardNumber = '';
        for (let i = 0; i < input.length; i += 4) {
            formattedCardNumber += input.slice(i, i + 4) + ' ';
        }

        // Set the formatted number with spaces for display
        const temp = formattedCardNumber.trim();
        if (temp.length < 20) {
            setCardNumberDisplay(formattedCardNumber.trim());
        }
    };

    const handleCvcChange = (e) => {
        const input = e.target.value.replace(/\D/g, '').slice(0, 3); // Remove non-numeric characters and limit to 3 digits
        setCvc(input);
    };

    const handleMonthChange = (e) => {
        const input = e.target.value.replace(/\D/g, '').slice(0, 2); // Remove non-numeric characters and limit to 3 digits
        setMonth(input);

        const val = Number(input);
        if (val > 12) {
            setIsValidMonth(false);
        } else {
            setIsValidMonth(true);
        }
    };

    const handleYearChange = (e) => {
        const input = e.target.value.replace(/\D/g, '').slice(0, 2); // Remove non-numeric characters and limit to 3 digits
        setYear(input);

        const val = Number(input);
        if (val < 24) {
            setIsValidYear(false);
        } else {
            setIsValidYear(true);
        }
    };

    const handlePayment = () => {

        if (cardNumberDisplay.length === 19 &&
            isValidMonth &&
            isValidYear &&
            cvc.length === 3 &&
            selectedCountry != '') {
            setIsValidPayment(true);

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

                let myListOfBook;
                upperbooks.forEach((element) => {
                    if (element.id === searchID) {
                        element.Trains.forEach((ele) => {
                            if (ele.TrainNumber === trainID) {
                                ele.SearchIsPaid = true;
                            }
                        });
                        myListOfBook = element;
                    }
                });

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
            });

            navigate("/booklist");
        }
        else {
            setIsValidPayment(false);
        }
    };

    React.useEffect(() => {
        const searchID = window.localStorage.getItem("PayID");
        const trainID = window.localStorage.getItem("TrainID");

        if (searchID === null || trainID === null) {
            navigate("/booklist");
        }
    }, []);

    React.useEffect(() => {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
        });
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

    return (
        <ThemeProvider theme={theme}>
            <Container
                data-aos="fade-up"
                maxWidth="sm"
                style={{
                    backgroundColor: '#eaffff',
                    // margin: '2em auto',
                    // border: '2px solid white',
                    // backgroundColor: 'ghostwhite',
                    margin: '6% auto',
                    marginTop: '4%',
                    border: '2px solid black',
                    padding: '2em',
                    paddingTop: '6em',
                    paddingBottom: '2em',
                    borderRadius: '2em',
                }}
            >
                <Typography variant="h4" gutterBottom style={{ fontWeight: 'bold', textAlign: 'center' }}>
                    Payment Details
                </Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            label="Card Number"
                            variant="outlined"
                            fullWidth
                            value={cardNumberDisplay}
                            onChange={handleCardNumberChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <TextField
                                    label="Month"
                                    variant="outlined"
                                    color={isValidMonth ? 'info' : 'error'}
                                    fullWidth
                                    placeholder="MM"
                                    value={month}
                                    onChange={handleMonthChange}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    label="Year"
                                    variant="outlined"
                                    color={isValidYear ? 'info' : 'error'}
                                    fullWidth
                                    placeholder="YY"
                                    value={year}
                                    onChange={handleYearChange}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="CVV"
                            variant="outlined"
                            fullWidth
                            value={cvc}
                            onChange={handleCvcChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            select
                            label="Country"
                            variant="outlined"
                            fullWidth
                            value={selectedCountry}
                            onChange={(e) => setSelectedCountry(e.target.value)}
                        >
                            {countries.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    {!isValidPayment && (
                        <Grid item xs={12}>
                            <Alert severity="error">Please, Enter valid details</Alert>
                        </Grid>
                    )}
                    <Grid container justifyContent="center" style={{ marginTop: '1em' }}>
                        <Grid item xs={12} style={{ textAlign: 'center' }}>
                            <Button variant="contained" style={{ backgroundColor: '#2A386B', fontWeight: 'bold' }} onClick={handlePayment}>
                                Pay Now &nbsp;<PaymentIcon />
                            </Button>
                        </Grid>
                        <Grid item xs={12} style={{ textAlign: 'center', marginTop: '1em' }}>
                            T & C Apply
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
            <Box sx={{ flexGrow: 1 }} >
                <Grid container spacing={2} justifyContent="center">
                    <Grid container spacing={2} justifyContent="center" className='mt-5' style={{ marginBottom: '3em' }}>
                        <Grid item xs={12} md={6} lg={4} style={{ display: 'flex', justifyContent: 'center' }}>
                            <Card data-aos="fade-left" elevation={0} style={{ width: '65%' }}>
                                <CardMedia component="img" alt="green iguana" image={Gif19} />
                            </Card>
                        </Grid>
                        <Grid item xs={12} md={6} lg={5}>
                            <Container
                                data-aos="fade-left"
                                maxWidth="sm"
                                style={{
                                    backgroundColor: '#dfffff',
                                    margin: 'auto',
                                    border: '2px solid white',
                                    padding: '2em',
                                    paddingTop: '4em',
                                    paddingBottom: '2em',
                                    borderRadius: '1em',
                                }}
                            >
                                <Typography variant="h4" gutterBottom style={{ fontWeight: 'bold', textAlign: 'center' }}>
                                    Convenience
                                </Typography>
                                <List>
                                    <ListItem disablePadding>
                                        <ListItemButton>
                                            <ListItemText
                                                primary="Seamless Transactions:"
                                                secondary="Our platform offers a user-friendly interface for quick and hassle-free transactions, allowing users to send and receive money with ease."
                                            />
                                        </ListItemButton>
                                    </ListItem>
                                    <ListItem disablePadding>
                                        <ListItemButton>
                                            <ListItemText
                                                primary="24/7 Availability:"
                                                secondary="Users can initiate transactions at any time, providing flexibility and convenience for their financial activities."
                                            />
                                        </ListItemButton>
                                    </ListItem>
                                </List>
                            </Container>
                        </Grid>
                    </Grid>

                    <Grid container spacing={2} justifyContent="center" flexDirection="row-reverse" className='mt-5' style={{ marginBottom: '3em' }}>
                        <Grid item xs={12} md={6} lg={4} style={{ display: 'flex', justifyContent: 'center' }}>
                            <Card data-aos="fade-right" elevation={0} style={{ width: '65%' }}>
                                <CardMedia component="img" alt="green iguana" image={Gif21} />
                            </Card>
                        </Grid>
                        <Grid item xs={12} md={6} lg={5}>
                            <Container
                                data-aos="fade-left"
                                maxWidth="sm"
                                style={{
                                    backgroundColor: '#dfffff',
                                    margin: 'auto',
                                    border: '2px solid white',
                                    padding: '2em',
                                    paddingTop: '4em',
                                    paddingBottom: '2em',
                                    borderRadius: '1em',
                                }}
                            >
                                <Typography variant="h4" gutterBottom style={{ fontWeight: 'bold', textAlign: 'center' }}>
                                    Security
                                </Typography>
                                <List>
                                    <ListItem disablePadding>
                                        <ListItemButton>
                                            <ListItemText
                                                primary="Robust Security Measures:"
                                                secondary="We prioritize the security of financial transactions, implementing advanced encryption and authentication mechanisms to safeguard user data and funds."
                                            />
                                        </ListItemButton>
                                    </ListItem>
                                    <ListItem disablePadding>
                                        <ListItemButton>
                                            <ListItemText
                                                primary="Fraud Protection:"
                                                secondary="Our system employs sophisticated fraud detection and prevention measures to ensure the safety of every transaction."
                                            />
                                        </ListItemButton>
                                    </ListItem>
                                </List>
                            </Container>
                        </Grid>
                    </Grid>
                    <Grid container spacing={2} justifyContent="center" className='mt-5' style={{ marginBottom: '3em' }}>
                        <Grid item xs={12} md={6} lg={4} style={{ display: 'flex', justifyContent: 'center' }}>
                            <Card data-aos="fade-left" elevation={0} style={{ width: '65%' }}>
                                <CardMedia component="img" alt="green iguana" image={Gif20} />
                            </Card>
                        </Grid>
                        <Grid item xs={12} md={6} lg={5} >
                            <Container
                                data-aos="fade-left"
                                maxWidth="sm"
                                style={{
                                    backgroundColor: '#dfffff',
                                    margin: 'auto',
                                    border: '2px solid white',
                                    padding: '2em',
                                    paddingTop: '4em',
                                    paddingBottom: '2em',
                                    borderRadius: '1em',
                                }}
                            >
                                <Typography variant="h4" gutterBottom style={{ fontWeight: 'bold', textAlign: 'center' }}>
                                    Customer Support
                                </Typography>
                                <List>
                                    <ListItem disablePadding>
                                        <ListItemButton>
                                            <ListItemText
                                                primary="Responsive Support Team:"
                                                secondary="Our dedicated customer support team is available to assist users with any issues, ensuring a positive and reliable user experience."
                                            />
                                        </ListItemButton>
                                    </ListItem>
                                    <ListItem disablePadding>
                                        <ListItemButton>
                                            <ListItemText
                                                primary="Educational Resources:"
                                                secondary="We provide informative materials and guides to help users navigate the platform and understand the features available."
                                            />
                                        </ListItemButton>
                                    </ListItem>
                                </List>
                            </Container>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        </ThemeProvider>
    );
};

export default PaymentForm;
