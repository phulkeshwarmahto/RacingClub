export function LoadingState() {
  return <p className="py-4 text-center text-slate-300">Loading content...</p>;
}

export function ErrorState({ message }) {
  return <p className="py-4 text-center text-rose-300">{message || "Something went wrong."}</p>;
}