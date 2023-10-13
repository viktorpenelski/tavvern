import React, { useState } from "react";
import qs from "qs"


const getQuery = () => {
    if (typeof window !== undefined) {
      return new URLSearchParams(window.location.search);
    }
    return new URLSearchParams();
  };

const getQueryStringVal = (key) => {
    return getQuery().get(key);
  };

// This custom hook centralizes and streamlines handling of HTTP calls
export default function useQueryParam(key, defaultVal) {
    const [query, setQuery] = useState(getQueryStringVal(key) || defaultVal);
    const updateUrl = (newVal) => {
        setQuery(newVal);
        const query = getQuery();
        if (newVal.trim() !== "") {
            query.set(key, newVal);
        } else {
            query.delete(key);
        }

        if (typeof window !== undefined) {
            const { protocol, pathname, host } = window.location;
            const newUrl = `${protocol}//${host}${pathname}?${query.toString()}`;
            window.history.pushState({}, "", newUrl);
        }
    };

    return [query, updateUrl];
}