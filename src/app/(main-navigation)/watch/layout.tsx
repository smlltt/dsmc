import { PageTitle } from "@/components/molecules/page-title";
import type { PropsWithChildren } from "react";

const WatchLayout = async ({ children }: PropsWithChildren) => {
  return (
    <div>
      <PageTitle>{"Choose a movie to watch"}</PageTitle>
      {children}
    </div>
  );
};

export default WatchLayout;
