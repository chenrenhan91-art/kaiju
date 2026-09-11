import Image from "next/image";
import Link from "next/link";
import { ideas } from "@/lib/catalog";

export const metadata = { title: "Wooden Living Ideas" };

export default function IdeasPage() {
  return (
    <div className="page-width py-12">
      <h1 className="display text-4xl md:text-5xl">Wooden Living Ideas</h1>
      <div className="mt-10 grid md:grid-cols-3 gap-8">
        {ideas.map((idea) => (
          <Link key={idea.slug} href={`/ideas/${idea.slug}`}>
            <span className="relative block aspect-[4/3] bg-cream-2">
              <Image src={idea.image} alt="" fill className="object-cover" />
            </span>
            <span className="block mt-3 font-medium">{idea.title}</span>
            <span className="block mt-1 text-sm text-brown-soft">{idea.excerpt}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
