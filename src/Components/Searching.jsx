import { useState, useEffect } from 'react';
import * as React from 'react';
import { useSearchTrain } from "../Context/SearchTrain";
import { Button } from '@mui/material';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import TrainBox from './TrainBox'
import trains from './AllTrainDetail';
import { useFirebase } from '../Context/Firebase';

import {
    getFirestore,
    collection,
    getDocs,
    query,
    where,
    addDoc,
    onSnapshot
} from 'firebase/firestore';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function Searching() {

    const [isSearch, setIsSearch] = useState(false);
    const [bookList, setBookList] = useState([]);
    const [TrainbookingList, setTrainbookingList] = useState([]);
    const [FromText, setFromText] = useState('');
    const [ToText, setToText] = useState('');
    const [DateText, setDateText] = useState('');
    const [TrainID, setTrainID] = useState('');

    const SearchTrain = useSearchTrain();
    const firebase = useFirebase();
    const db = getFirestore();

    const printall = () => {
        console.log(SearchTrain.FromTextContext);
        console.log(SearchTrain.ToTextContext);
        console.log(SearchTrain.DateSelectedContext);

        const setPath = 'User/' + firebase.UserID + '/SearchList';
        const setColRef = collection(db, setPath);
        const query1 = where('SearchFromText', '==', SearchTrain.FromTextContext);
        const query2 = where('SearchToText', '==', SearchTrain.ToTextContext);
        const query3 = where('SearchDateText', '==', SearchTrain.DateSelectedContext);
        const combinedQuery = query(setColRef, query1, query2, query3);

        onSnapshot(combinedQuery, (snapshot) => {
            let Upperbooks = [];
            snapshot.forEach((doc) => {
                Upperbooks.push({ ...doc.data(), id: doc.id });
            });
            console.log('books::::', Upperbooks);
            if (Upperbooks.length === 0) {
                addDoc(setColRef, {
                    SearchFromText: SearchTrain.FromTextContext,
                    SearchToText: SearchTrain.ToTextContext,
                    SearchDateText: SearchTrain.DateSelectedContext,
                    SearchCatagories: SearchTrain.CatagoriesContext,
                    SearchAllClasses: SearchTrain.AllClassesContext,
                    Trains: trains
                }).then(() => {
                    console.log('added searchList');
                    onSnapshot(combinedQuery, (snapshot) => {
                        let books = [];
                        snapshot.forEach((doc) => {
                            books.push({ ...doc.data(), id: doc.id });
                        });
                        setTrainbookingList(books[0].Trains);
                        console.log('books1234::::', books[0]);
                    })
                });
            } else {
                setTrainID(Upperbooks[0].id);
                setTrainbookingList(Upperbooks[0].Trains);
                console.log('books1234::::', Upperbooks[0]);
            }
        })

        setIsSearch(true);
        setFromText(SearchTrain.FromTextContext);
        setToText(SearchTrain.ToTextContext);
        setDateText(SearchTrain.DateSelectedContext);
    };
    useEffect(() => {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
        });
    }, []);


    return (
        <>
            <div data-aos="fade-up" className='d-flex justify-content-center mt-5'>
                <Button
                    style={{
                        fontFamily: 'Quicksand',
                        fontWeight: 'bold',
                        fontSize: 'large',
                        backgroundColor: '#2A386B',
                        color: 'white'
                    }}

                    variant="contained"
                    disabled={!SearchTrain.isFromTo}
                    onClick={printall}
                    disableElevation
                >
                    Search
                </Button>
            </div>

            {isSearch &&
                TrainbookingList.map((row, index) => (
                    <TrainBox
                        key={index}
                        data={{ FromText, ToText, DateText, row, TrainID }}
                    />
                ))
            }
        </>
    );
}