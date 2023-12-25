import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


function Temp() {

    const navigate = useNavigate();

    useEffect(() => {
        navigate("/booklist");
    }, []);

    return (
        <h1>temp</h1>
    )
}

export default Temp;