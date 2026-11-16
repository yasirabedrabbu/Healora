import { HugeiconsIcon, MedicalFileIcon } from "@/components/icons";

export function EmptyState({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-xl border border-dashed border-gray-300 bg-white p-10 text-center dark:border-gray-700 dark:bg-gray-800">
      <div className="mx-auto mb-4 grid h-12 w-12 place-items-center rounded-full bg-gray-25 text-gray-400 dark:bg-gray-900">
        <HugeiconsIcon icon={MedicalFileIcon} size={24} aria-hidden />
      </div>
      <p className="font-semibold text-gray-900 dark:text-gray-50">{title}</p>
      <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">{text}</p>
    </div>
  );
}
