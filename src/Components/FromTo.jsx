import React, { useState } from 'react';
import words from './Stations.jsx';
import { useEffect } from 'react';
import { useSearchTrain } from '../Context/SearchTrain.jsx';
import SwapVertIcon from '@mui/icons-material/SwapVert';

import {
    Container,
    Card,
    Button,
    CardContent,
    Typography,
    TextField,
    List,
    ListItem,
    ListItemText,
} from '@mui/material';

import '../CSS/FromTo.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AOS from 'aos';
import 'aos/dist/aos.css';

class TrieNode {
    constructor() {
        this.children = {};
        this.isEndOfWord = false;
        this.data = null; // Store the whole object in the Trie node
    }
}

class Trie {
    constructor() {
        this.root = new TrieNode();
    }

    insert(obj) {
        let node = this.root;
        const stationName = obj.station.toLowerCase();

        for (const char of stationName) {
            if (!node.children[char]) {
                node.children[char] = new TrieNode();
            }
            node = node.children[char];
        }

        node.isEndOfWord = true;
        node.data = obj;
    }

    search(prefix) {
        let node = this.root;
        const prefixLowerCase = prefix.toLowerCase();

        for (const char of prefixLowerCase) {
            if (!node.children[char]) {
                return [];
            }
            node = node.children[char];
        }

        const suggestions = [];
        this.findSuggestions(node, prefixLowerCase, suggestions);
        return suggestions;
    }

    findSuggestions(node, prefix, suggestions) {
        if (node.isEndOfWord) {
            suggestions.push(node.data);
        }
        for (const [char, child] of Object.entries(node.children)) {
            this.findSuggestions(child, prefix + char, suggestions);
        }
    }
}

function FromTo() {

    const SerachTrain = useSearchTrain();
    const [FromText, setFromText] = useState('');
    const [ToText, setToText] = useState('');
    const [suggestionsFrom, setSuggestionsFrom] = useState([]);
    const [suggestionsTo, setSuggestionsTo] = useState([]);
    const [fromOk, setFromOk] = useState(false);
    const [toOk, setToOk] = useState(false);
    const [isEnable, setIsEnable] = useState(false);

    const trie = new Trie();

    words.forEach((word) => trie.insert(word));

    const changingFromText = (e) => {
        const input = e.target.value;
        setFromText(input);
        const filteredSuggestions = trie.search(input);
        setSuggestionsFrom(filteredSuggestions);
        setFromOk(false);
    }

    const changingToText = (e) => {
        const input = e.target.value;
        setToText(input);
        const filteredSuggestions = trie.search(input);
        setSuggestionsTo(filteredSuggestions);
        setToOk(false);
    }

    const selectThisFromCity = (selectedCity) => {
        setFromText(selectedCity.station);
        setSuggestionsFrom([]);
        setFromOk(true);
    }

    const selectThisToCity = (selectedCity) => {
        setToText(selectedCity.station);
        setSuggestionsTo([]);
        setToOk(true);
    }

    const swapText = () => {
        let temp1 = FromText;
        let temp2 = ToText;

        setToText(temp1);
        setFromText(temp2);
    }

    useEffect(() => {
        if (fromOk && toOk) {
            setIsEnable(true);
        }
        else {
            setIsEnable(false);
        }
    }, [FromText, ToText]);

    useEffect(() => {
        if (isEnable) {
            SerachTrain.setFromTextContext(FromText);
            SerachTrain.setToTextContext(ToText);
            SerachTrain.setIsFormTo(isEnable);
        }
    }, [FromText, ToText, isEnable]);

    useEffect(() => {
        setFromText(SerachTrain.FromTextContext);
        setToText(SerachTrain.ToTextContext);
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

    useEffect(() => {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
        });
    }, []);



    return (
        <div data-aos="fade-up">
            <ThemeProvider theme={theme}>
                <Container className="pt-5 pb-3 d-flex justify-content-center align-items-center my-5">
                    <Card elevation={0} style={{
                        // backgroundColor: 'rgb(252, 252, 252)',
                        // boxShadow: '4px 4px 4px rgba(60, 60, 60, 0.1)',
                        // borderRadius: '2em',
                        border: 'none',
                        width: '100%',
                        maxWidth: '38em',
                    }} variant="outlined">
                        <Typography variant="h4" component="div" align="center" className="my-2 py-3" style={{ fontWeight: "600" }}>
                            Start Your Journey
                        </Typography>
                        <CardContent>
                            <div className="mb-3 input-group-lg">
                                <label htmlFor="FromText" className="form-label fs-5">
                                    From :
                                </label>
                                <TextField
                                    type="text"
                                    id="FromText"
                                    placeholder="Your location"
                                    value={FromText}
                                    onChange={changingFromText}
                                    variant="outlined"
                                    fullWidth
                                    autoComplete="off"
                                />
                                <List>
                                    {FromText !== '' &&
                                        suggestionsFrom.map((suggestion, index) => (
                                            <ListItem
                                                key={index}
                                                style={{ marginBottom: '0.4em', backgroundColor: '#edf2f4', borderRadius: '0.5em' }}
                                                onClick={() => selectThisFromCity(suggestion)}
                                            >
                                                <ListItemText>
                                                    <div>
                                                        {suggestion.station} - {suggestion.code}
                                                    </div>
                                                    <div className='fw-semibold'>
                                                        {suggestion.state}
                                                    </div>
                                                </ListItemText>
                                            </ListItem>
                                        ))}
                                </List>
                            </div>
                            <div className="text-center">
                                <Button variant="contained" color="primary" onClick={swapText} style={{
                                    width: 'auto',
                                    height: 'auto',
                                    borderRadius: '2em',
                                    backgroundColor: '#134074',
                                    color: 'black'
                                }}>
                                    <SwapVertIcon style={{ fontSize: '40px', color: 'white' }} />
                                </Button>
                            </div>
                            <div className="mb-3 input-group-lg">
                                <label htmlFor="ToText" className="form-label fs-5">
                                    To :
                                </label>
                                <TextField
                                    type="text"
                                    id="ToText"
                                    placeholder="Destination"
                                    value={ToText}
                                    onChange={changingToText}
                                    variant="outlined"
                                    fullWidth
                                    autoComplete="off"
                                />
                                <List>
                                    {ToText !== '' &&
                                        suggestionsTo.map((suggestion, index) => (
                                            <ListItem
                                                key={index}
                                                style={{ marginBottom: '0.4em', backgroundColor: 'rgb(240,240,240)', borderRadius: '0.5em' }}
                                                onClick={() => selectThisToCity(suggestion)}
                                            >
                                                <ListItemText>
                                                    <div>
                                                        {suggestion.station} - {suggestion.code}
                                                    </div>
                                                    <div className='fw-semibold'>
                                                        {suggestion.state}
                                                    </div>
                                                </ListItemText>
                                            </ListItem>
                                        ))}
                                </List>
                            </div>
                        </CardContent>
                    </Card>
                </Container>
            </ThemeProvider>
        </div>
    );
}

export default FromTo;
