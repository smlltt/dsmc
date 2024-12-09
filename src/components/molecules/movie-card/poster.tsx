import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import Image from "next/image";
import type { JSX } from "react";
import { RiCloseCircleLine } from "react-icons/ri";
import { createTypedIcon } from "@/lib/utils";

const TypedRiCloseCircleLine = createTypedIcon(RiCloseCircleLine);

export const Poster = ({ url }: { url: string | null }) => (
  <div className="w-32">
    <AspectRatio className="w-32" ratio={2 / 3}>
      {url ? (
        <Image
          className="h-full w-full object-cover"
          src={`https://image.tmdb.org/t/p/original${url}`}
          alt="poster"
          fill
          sizes="128px"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-slate-700">
          <TypedRiCloseCircleLine size={32} className="text-slate-500" />
        </div>
      )}
    </AspectRatio>
  </div>
);
