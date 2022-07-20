import { useState, useEffect } from 'react';

function useDebounce(value, delay) {
    const [debounceValue, setDebounceValue] = useState(value);

    useEffect(() => {
        const handlerTimeout = setTimeout(() => {
            setDebounceValue(value);
        }, delay);
        return () => clearTimeout(handlerTimeout)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value]);

    return debounceValue;
}

export default useDebounce;