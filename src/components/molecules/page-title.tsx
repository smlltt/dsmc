import type { PropsWithChildren } from "react";
import { Separator } from "../ui/separator";

export const PageTitle = ({ children }: PropsWithChildren) => (
  <div>
    <h2 className="font-bold font-title text-2xl text-red-600">{children}</h2>
    <Separator className="bg-slate-300" />
  </div>
);
