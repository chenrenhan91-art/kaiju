import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ideas } from "@/lib/catalog";

export function generateStaticParams() {
  return ideas.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const idea = ideas.find((i) => i.slug === slug);
  return { title: idea?.title ?? "Idea" };
}

const bodies: Record<string, string[]> = {
  "keeping-a-small-vanity-clear": [
    "A dressing table collects bottles, earrings, and hair ties because nothing has a default place. One lipstick grid, one brush well, and one lidded box usually replace the scatter.",
    "Put the box where you actually undress. If jewelry lives in a bedroom drawer you never open, it will keep landing next to the sink.",
  ],
  "why-solid-wood-still-makes-sense": [
    "Solid walnut, cherry, and rosewood take oil, show age, and can be refreshed. A veneer box that chips at the corner is harder to live with after two years.",
    "Grain will not match the photograph exactly. That is the point of a hardwood lid.",
  ],
  "a-quiet-place-for-everyday-jewelry": [
    "Separate rings from chains. Give necklaces a long tray so they stay flat. Keep everyday pairs in the top row of an earring box.",
    "The goal is not a perfect collection. It is being able to put pieces back in ten seconds.",
  ],
};

export default async function IdeaPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const idea = ideas.find((i) => i.slug === slug);
  if (!idea) notFound();
  return (
    <article className="page-width py-12 max-w-3xl">
      <Link href="/ideas" className="text-sm underline">
        Wooden Living Ideas
      </Link>
      <h1 className="display text-4xl md:text-5xl mt-4">{idea.title}</h1>
      <div className="relative aspect-[16/9] bg-cream-2 mt-8">
        <Image src={idea.image} alt="" fill className="object-cover" />
      </div>
      <div className="mt-8 grid gap-4 leading-relaxed">
        {(bodies[slug] ?? [idea.excerpt]).map((p) => (
          <p key={p}>{p}</p>
        ))}
      </div>
    </article>
  );
}
