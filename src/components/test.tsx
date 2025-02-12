"use client";

import { useEffect, useState } from "react";

export default function Test() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  console.log({ movies });

  useEffect(() => {
    async function fetchMovies() {
      try {
        const response = await fetch("/api/movies");
        if (!response.ok) {
          throw new Error("Failed to fetch movies");
        }
        const data = await response.json();
        setMovies(data);
      } catch (error) {
        console.log({ error });
        setError(error);
      } finally {
        setLoading(false);
      }
    }

    fetchMovies();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error:</div>;

  return (
    <div>
      <h1>Movies</h1>
    </div>
  );
}
