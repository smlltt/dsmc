import { MovieSearchInput } from "@/components/molecules/movie-search-input";
import { PageDefaultContentWrapper } from "@/components/molecules/page-default-content-wrapper";
import type { PropsWithChildren } from "react";

const SearchPageLayout = async ({ children }: PropsWithChildren) => {
  return (
    <PageDefaultContentWrapper className="gap-3">
      <div className="mb-8">
        <MovieSearchInput />
      </div>
      {children}
    </PageDefaultContentWrapper>
  );
};

export default SearchPageLayout;
