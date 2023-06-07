import React, { useState, useEffect } from 'react';

function ErrorBoundary(props) {
  const [error, setError] = useState(null);
  
  useEffect(() => {
    // Catch errors thrown by child components
    const handleErrors = (err) => {
      setError(err);
    };
    window.addEventListener('error', handleErrors);
    return () => {
      window.removeEventListener('error', handleErrors);
    };
  }, []);
  
  if (error) {
    return <h1>Something went wrong: {error.message}</h1>;
  }
  
  return props.children;
}

export default ErrorBoundary;