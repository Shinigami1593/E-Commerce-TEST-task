interface ErrorMessageProps {
  message: string;
}

export default function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <p role="alert" className="text-center text-sm text-red-700">
      {message}
    </p>
  );
}