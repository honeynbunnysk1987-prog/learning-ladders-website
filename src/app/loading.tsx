export default function Loading() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-rung bg-royal font-display text-lg font-bold text-white animate-wiggle">
          LL
        </div>
        <p className="text-sm font-semibold text-royal-900/50">Loading...</p>
      </div>
    </div>
  );
}
