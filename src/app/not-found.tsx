import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] items-center justify-center bg-royal-50 px-5 py-24">
      <div className="text-center">
        <p className="font-display text-8xl font-extrabold text-royal">404</p>
        <h1 className="mt-4 font-display text-2xl font-bold text-royal-900">
          Looks Like This Rung Is Missing
        </h1>
        <p className="mt-2 text-royal-900/60">
          The page you&apos;re looking for doesn&apos;t exist or has moved.
        </p>
        <Link href="/" className="btn-primary mt-8 inline-flex">
          Back to Home
        </Link>
      </div>
    </section>
  );
}
