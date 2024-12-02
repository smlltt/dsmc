import { PageTitle } from "@/components/molecules/page-title";
import type { PropsWithChildren } from "react";

export default async ({ children }: PropsWithChildren) => {
  return (
    <div>
      <PageTitle>{"Choose a movie to watch"}</PageTitle>
      {children}
    </div>
  );
};
