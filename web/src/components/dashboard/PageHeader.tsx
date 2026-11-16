export function PageHeader({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl dark:text-gray-50">{title}</h1>
        {description && (
          <p className="mt-2 text-gray-500 dark:text-gray-400">{description}</p>
        )}
      </div>
      {action}
    </div>
  );
}
