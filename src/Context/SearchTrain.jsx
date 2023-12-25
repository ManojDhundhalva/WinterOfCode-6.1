import { createContext, useContext, useState, useEffect } from "react";

const SerachTrainContext = createContext(null);
export const useSearchTrain = () => { return useContext(SerachTrainContext); }


export const SearchTrainProvider = (props) => {

    const [FromTextContext, setFromTextContext] = useState('');
    const [ToTextContext, setToTextContext] = useState('');
    const [isFromTo, setIsFormTo] = useState(false);

    const [DateSelectedContext, setDateSelectedContext] = useState('');
    const [AllClassesContext, setAllClassesContext] = useState('');
    const [CatagoriesContext, setCatagoriesContext] = useState('');

    return (
        <SerachTrainContext.Provider
            value={{
                FromTextContext,
                setFromTextContext,
                ToTextContext,
                setToTextContext,
                isFromTo,
                setIsFormTo,
                DateSelectedContext,
                setDateSelectedContext,
                AllClassesContext,
                setAllClassesContext,
                CatagoriesContext,
                setCatagoriesContext
            }}>
            {props.children}
        </SerachTrainContext.Provider>
    )
}