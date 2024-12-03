import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import Image from "next/image";
import { RiCloseCircleLine } from "react-icons/ri";

export const Poster = ({ url }: { url: string | null }): JSX.Element => (
  <div className="w-32">
    <AspectRatio className="w-32" ratio={2 / 3}>
      {url ? (
        <Image
          className="h-full w-full object-cover"
          src={`https://image.tmdb.org/t/p/original${url}`}
          alt="poster"
          fill
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-slate-700">
          <RiCloseCircleLine size={32} className="text-slate-500" />
        </div>
      )}
    </AspectRatio>
  </div>
);
