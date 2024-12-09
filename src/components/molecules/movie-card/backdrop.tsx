import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import Image from "next/image";
import type { JSX } from "react";

export const Backdrop = ({ url }: { url: string | null }) => (
  <>
    {url && (
      <>
        <div className="absolute top-0 right-0 left-0 z-0 sm:hidden">
          <AspectRatio ratio={1}>
            <Image
              className="h-full w-full object-cover"
              src={`https://image.tmdb.org/t/p/original${url}`}
              alt="poster"
              fill
            />
          </AspectRatio>
        </div>
        <div className="absolute top-0 right-0 bottom-0 left-0 bg-gradient-to-b from-transparent via-background to-background sm:hidden" />
      </>
    )}
  </>
);
