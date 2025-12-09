import React, { useState, useEffect } from "react";

const useFetch = (url) => {
  const [Data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(url, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        setData(result);
        setIsLoading(false);
      } catch (err) {
        setError(err);
        console.log("Error While Fetching Data", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [url]);
  return [Data, isLoading, error];
};

export default useFetch;
