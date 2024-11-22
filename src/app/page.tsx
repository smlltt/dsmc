import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";

export default function Home() {
	return (
		<div className="grid min-h-screen grid-rows-[20px_1fr_20px] items-center justify-items-center gap-16 bg-slate-950 p-8 pb-20 font-[family-name:var(--font-geist-sans)] sm:p-20">
			<main>
				<div className="flex gap-2">
					<Input placeholder="Add a movie" />
					<Button>{"Add a movie"}</Button>
				</div>
			</main>
		</div>
	);
}
