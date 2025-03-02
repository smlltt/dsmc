import { fetchAllMovies } from "@/lib/data/movies"; // Adjust the import path

export async function GET() {
  try {
    const movies = await fetchAllMovies();

    return Response.json(movies);
  } catch (error) {
    console.error("API Error:", error);
    Response.json({ message: "Failed to fetch movies." });
  }
}
