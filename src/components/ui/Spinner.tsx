interface SpinnerProps {
  label?: string;
}

export default function Spinner({ label = "Loading..." }: SpinnerProps) {
  return (
    <div role="status" className="flex items-center gap-3 text-sm text-gray-600">
      <span className="h-5 w-5 animate-spin rounded-full border-2 border-gray-300 border-t-gray-900" />
      <span>{label}</span>
    </div>
  );
}