interface Result {
  label: string;
  value: string;
}

export default function ResultDisplay({ results }: { results: Result[] }) {
  if (results.length === 0) return null;

  return (
    <div className="mt-4 space-y-1 text-sm text-muted-foreground">
      {results.map((r, idx) => (
        <div
          key={idx}
          className="flex items-center justify-between border-b py-1"
        >
          <span>{r.label}</span>
          <span>{r.value}</span>
        </div>
      ))}
    </div>
  );
}
