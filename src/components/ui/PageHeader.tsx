export default function PageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <section className="bg-gradient-to-b from-royal-50 to-white py-16">
      <div className="container-page text-center">
        <span className="section-eyebrow">{eyebrow}</span>
        <h1 className="mt-4 font-display text-4xl font-extrabold text-royal-900 sm:text-5xl">
          {title}
        </h1>
        {description && (
          <p className="mx-auto mt-4 max-w-2xl text-royal-900/70">{description}</p>
        )}
      </div>
    </section>
  );
}
