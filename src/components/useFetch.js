import { useState, useEffect } from 'react';

const useFetch = (url, token = '') => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortCont = new AbortController();

    fetch(url, {
      signal: abortCont.signal,
      headers: {"Authorization": "Bearer " + localStorage.getItem("token")}
    })
    .then(res => {
      if (!res.ok) {
        throw Error('could not fetch the data for that resource');
      }
      return res.json();
    })
    .then(data => {
      setIsPending(false);
      setData(data.result);
      setError(null);
    })
    .catch(err => {
      setIsPending(false);
      setError(err.message);
    })
  }, [url])

  return { data, isPending, error };
}

export default useFetch;