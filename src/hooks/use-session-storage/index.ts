import { useCallback, useEffect, useState } from "react";

type StoredValue<T> = T | null;

type SetStoredValueCallback<T> = (prevValue: StoredValue<T>) => StoredValue<T>;

type SetStoredValueArg<T> = StoredValue<T> | SetStoredValueCallback<T>;

type SetStoredValue<T> = (newValue: SetStoredValueArg<T>) => void;

type RemoveValue = () => void;

type UseSessionStorageReturnType<T> = [StoredValue<T>, SetStoredValue<T>, RemoveValue];


export const useSessionStorage = <T extends object | string | number>(
    key: string,
    initValue: StoredValue<T> = null
): UseSessionStorageReturnType<T> => {
    const [value, setValue] = useState<StoredValue<T>>(initValue);

    //get from session storage and parse to Provided type
    const getItem = useCallback(() => {
        const storedValue = sessionStorage.getItem(key);
        if (!storedValue) {
            setValue(null);
            return;
        }
        const parsedValue: StoredValue<T> = JSON.parse(storedValue);
        setValue(parsedValue);
    }, [key]);

    //set to session storage
    //newItem can be value or callback func
    const setItem: SetStoredValue<T> = useCallback((newItem) => {
        if (newItem === undefined) return;
        setValue((prev) => {
            if (typeof newItem === 'function') {
                const newValue: StoredValue<T> = newItem(prev);
                sessionStorage.setItem(key, JSON.stringify(newValue));
                return newValue;
            }
            sessionStorage.setItem(key, JSON.stringify(newItem));
            return newItem;
        });
    }, [key]);

    //remove item from session storage
    const removeItem: RemoveValue = useCallback(() => {
        setValue(null);
        sessionStorage.removeItem(key);
    }, [key]);

    //check if item with provided key in session storage
    useEffect(() => {
        getItem();
    }, [getItem]);

    return [value, setItem, removeItem];
};