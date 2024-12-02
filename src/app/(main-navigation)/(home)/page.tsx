import { PageDefaultContentWrapper } from "@/components/molecules/page-default-content-wrapper";
import { Suspense } from "react";
import { MovieSearchInput } from "./movie-search-input";
import { MovieSearchResults } from "./movie-search-results";

export default async (props: {
  searchParams: Promise<{ search?: string }>;
}) => {
  const searchParams = await props.searchParams;
  const searchQuery = searchParams.search;

  return (
    <PageDefaultContentWrapper className="gap-3">
      <div className="mb-8">
        <MovieSearchInput />
      </div>
      <Suspense fallback={"loading..."}>
        {searchQuery ? (
          <MovieSearchResults searchQuery={searchQuery} />
        ) : (
          <p>{"Type something!"}</p>
        )}
      </Suspense>
    </PageDefaultContentWrapper>
  );
};
