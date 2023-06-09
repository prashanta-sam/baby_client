import React, { useState, useEffect, useRef } from 'react';

export const InfiniteScrollExample = () => {

    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);

    const fetchData = async () => {
        setIsLoading(true);
        setError(null);
      
        try {
          const response = await fetch(`https://api.example.com/items?page=${page}`);
          const data = await response.json();
      
          setItems(prevItems => [...prevItems, ...data]);
          setPage(prevPage => prevPage + 1);
        } catch (error) {
          setError(error);
        } finally {
          setIsLoading(false);
        }
      };
      const handleScroll = () => {
        if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || isLoading) {
          return;
        }
        fetchData();
      };
      
      useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
      }, [isLoading]);

      useEffect(() => {
        fetchData();
      }, []);
  return (
        <div>
            <ul>
            {items.map(item => (
                <li key={item.id}>{item.name}</li>
            ))}
            </ul>
            {isLoading && <p>Loading...</p>}
            {error && <p>Error: {error.message}</p>}
        </div>
  )
}
