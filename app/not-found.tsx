import Link from "next/link";

export default function NotFound() {
  return (
    <div className="page-width py-24 text-center">
      <h1 className="display text-5xl">Page not found</h1>
      <p className="mt-4">This page is not in the KAIJU catalog.</p>
      <Link href="/" className="btn btn-primary mt-8">
        Back to home
      </Link>
    </div>
  );
}
