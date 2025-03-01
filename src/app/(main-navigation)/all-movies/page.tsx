import { auth } from "@/auth";
import AllMoviesTable from "@/components/molecules/all-movies-table";
import { getUsers } from "@/lib/data/movies";
import { fetchUsersCount } from "@/lib/data/user";

export default async function AllMoviesPage(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
  const session = await auth();
  const [usersCount, users] = await Promise.all([
    fetchUsersCount(),
    getUsers(),
  ]);

  if (!session?.user) {
    return null;
  }

  const usersToUsernameAndId = users.map(({ id, name }) => ({
    id,
    name: name?.split(" ")[0] || "",
  }));

  return (
    <>
      <AllMoviesTable
        usersCount={usersCount}
        userId={session.user.id}
        users={usersToUsernameAndId}
      />
    </>
  );
}
