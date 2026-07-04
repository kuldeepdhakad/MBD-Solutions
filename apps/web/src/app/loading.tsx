export default function Loading() {
  return (
    <div
      className="flex min-h-[50vh] items-center justify-center pt-28"
      role="status"
      aria-label="Loading page"
    >
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-accent border-t-transparent" />
    </div>
  );
}
