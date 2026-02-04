import { AlertCircle } from "lucide-react";

interface FormErrorAlertProps {
  message: string;
}

export function FormErrorAlert({ message }: FormErrorAlertProps) {
  return (
    <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
      <AlertCircle size={20} strokeWidth={1.75} />
      <span>{message}</span>
    </div>
  );
}
