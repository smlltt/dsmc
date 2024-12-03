import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const formatQueryPath = (
  pathname: string,
  query: Record<string, string | string[] | number | undefined | null>,
): string => {
  const queryString = new URLSearchParams(
    Object.entries(query)
      .filter(([, value]) => !!value)
      .map(([key, value]) => [key, `${value}`]),
  ).toString();
  return queryString ? `${pathname}?${queryString}` : pathname;
};
