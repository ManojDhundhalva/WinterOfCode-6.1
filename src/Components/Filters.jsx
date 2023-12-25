import { useState, useEffect } from "react";
import DatePicker from "react-datetime";
import moment from "moment";
import "react-datetime/css/react-datetime.css";
import { useSearchTrain } from "../Context/SearchTrain";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import {
    Card,
    CardContent,
    Typography,
    Select,
    MenuItem,
    FormControl,
    InputLabel
} from '@mui/material';
import '../CSS/Filter.css';
import AOS from 'aos';
import 'aos/dist/aos.css';

function Filters() {

    const SearchTrain = useSearchTrain();
    const yesterday = moment().subtract(1, "day");
    const currentDate = moment().format("DD-MM-YYYY");
    const [selectedDate, setSelectedDate] = useState(currentDate);
    const [selectedValue, setSelectedValue] = useState("All Classes");
    const [selectedValueCatagories, setSelectedValueCatagories] = useState("GENERAL");

    const handleSelectChange = (event) => {
        const selectedOption = event.target.value;
        setSelectedValue(selectedOption);
    };
    const handleSelectChangeONCatagories = (event) => {
        const selectedOption = event.target.value;
        setSelectedValueCatagories(selectedOption);
    };

    const disPastDate = (current) => {
        return current.isAfter(yesterday);
    };
    const handleDateChange = (date) => {
        const formattedDate = moment(date).format("DD-MM-YYYY");
        setSelectedDate(formattedDate);
    };

    useEffect(() => {
        SearchTrain.setCatagoriesContext(selectedValueCatagories);
        SearchTrain.setAllClassesContext(selectedValue);
        SearchTrain.setDateSelectedContext(selectedDate);
    }, [selectedValueCatagories, selectedValue, selectedDate]);

    useEffect(() => {
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
                fontSize: 'large',
            },
        },
    });
    return (
        <>
            <div data-aos="fade-up">
                <ThemeProvider theme={theme}>
                    <CardContent>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={4}>
                                <Card style={{ border: '2px solid rgba(2, 62, 138, 1)' }} sx={{ height: '8em', backgroundColor: 'white', boxShadow: '4px 4px 4px rgba(60, 60, 60, 0.1)', borderRadius: '0.5em' }}>
                                    <CardContent>
                                        <Typography variant="h5" component="div" style={{ fontWeight: 'bold' }}>
                                            Date
                                        </Typography>
                                        <div style={{ position: 'absolute', width: 'auto' }} className="mt-2 mx-3">
                                            <DatePicker
                                                dateFormat="DD-MM-YYYY"
                                                timeFormat={false}
                                                isValidDate={disPastDate}
                                                value={selectedDate}
                                                onChange={handleDateChange}
                                                inputProps={{ readOnly: true }}
                                                fullWidth
                                            />
                                        </div>
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <Card style={{ border: '2px solid #023e8a' }} sx={{ backgroundColor: 'white', boxShadow: '4px 4px 4px rgba(60, 60, 60, 0.1)', borderRadius: '0.5em' }}>
                                    <CardContent>
                                        <Typography variant="h5" component="div" style={{ fontWeight: 'bold' }}>
                                            All Classes
                                        </Typography>
                                        <FormControl fullWidth>
                                            <Select
                                                labelId="class-label"
                                                value={selectedValue}
                                                onChange={handleSelectChange}
                                            >
                                                <MenuItem value="All Classes">All Classes</MenuItem>
                                                <MenuItem value="Second Sitting (2S)">Second Sitting (2S)</MenuItem>
                                                <MenuItem value="AC 3 Tier (3A)">AC 3 Tier (3A)</MenuItem>
                                                <MenuItem value="AC Chair car (CC)">AC Chair car (CC)</MenuItem>
                                                <MenuItem value="Exec. Chair Car (EC)">Exec. Chair Car (EC)</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <Card style={{ border: '2px solid #023e8a' }} sx={{ backgroundColor: 'white', boxShadow: '4px 4px 4px rgba(60, 60, 60, 0.1)', borderRadius: '0.5em' }}>
                                    <CardContent>
                                        <Typography variant="h5" component="div" style={{ fontWeight: 'bold' }}>
                                            Categories
                                        </Typography>
                                        <FormControl fullWidth>
                                            <Select
                                                labelId="category-label"
                                                value={selectedValueCatagories}
                                                onChange={handleSelectChangeONCatagories}
                                            >
                                                <MenuItem value="GENERAL">GENERAL</MenuItem>
                                                <MenuItem value="LADIES">LADIES</MenuItem>
                                                <MenuItem value="LOWER BERTH/SR.CITIZEN">LOWER BERTH/SR.CITIZEN</MenuItem>
                                                <MenuItem value="PERSON WITH DISABILITY">PERSON WITH DISABILITY</MenuItem>
                                                <MenuItem value="DUTY PASS">DUTY PASS</MenuItem>
                                                <MenuItem value="TATKAL">TATKAL</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </CardContent>
                                </Card>
                            </Grid>
                        </Grid>
                    </CardContent>
                </ThemeProvider>
            </div>
        </>
    )
}

export default Filters;