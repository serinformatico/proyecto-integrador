import { useEffect, useState } from "react";

const useLocalStorage = (initialValue = {}) => {
    const [ items, setItems ] = useState(initialValue);

    const exist = (key) => {
        if (window.localStorage.getItem(key) === null) {
            return false;
        }

        return true;
    };

    const synchronize = (initialValue) => {
        // Se tiene que sincronizar en un nuevo objeto para evitar complicaciones al renderizar.
        const synchronizedValues = {};

        for (const property in initialValue) {
            if (!exist(property)) {
                window.localStorage.setItem(property, JSON.stringify(initialValue[property]));
            }

            synchronizedValues[property] = JSON.parse(window.localStorage.getItem(property));
        }

        setItems(synchronizedValues);
    };

    useEffect(() => {
        synchronize(initialValue);
    }, []);

    const setItemValue = (key, newValue) => {
        setItems({ ...items, [key]: newValue });
        window.localStorage.setItem(key, JSON.stringify(newValue));
    };

    const removeItem = (key) => {
        const currentItems = { ...items };
        delete currentItems[key];
        setItems(currentItems);
        window.localStorage.removeItem(key);
    };

    const clearItems = () => {
        setItems({});
        window.localStorage.clear();
    };

    return {
        items,
        setItemValue,
        removeItem,
        clearItems,
    };
};

export default useLocalStorage;