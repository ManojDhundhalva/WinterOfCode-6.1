import Title from './Title.jsx';
import FromTo from './FromTo.jsx';
import Filters from './Filters.jsx';
import Blocks from '../Blocks.jsx';
import Searching from './Searching.jsx';
import { useFirebase } from '../Context/Firebase.jsx';
import {
    collection,
    getFirestore,
    query,
    where,
    onSnapshot
} from 'firebase/firestore';
import '../CSS/Homepage.css';
import ExtraInfo from './ExtraInfo.jsx';

function Homepage() {

    const firebase = useFirebase();
    const db = getFirestore();
    const colRef = collection(db, 'User');

    const localEmail = window.localStorage.getItem("LocalEmail");
    const q = query(colRef, where("EmailId", "==", localEmail));
    onSnapshot(q, (snapshot) => {
        let books = [];
        snapshot.docs.forEach((doc) => {
            books.push({ id: doc.id });
        });

        if (books.length > 0) {
            firebase.setUserID(books[0].id);
        }
    });

    // eslint-disable-next-line
    const imageURL1 = "https://i.pinimg.com/originals/4b/a7/2c/4ba72cbf2a6495c267d3707d1e3fac00.jpg";
    return (
        <>
            <div className='my-hompage'>
                <Title />
                <FromTo />
                <Filters />
                <Searching />
                <ExtraInfo />
            </div>
        </>
    )
}

export default Homepage