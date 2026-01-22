export function SecurityCard({
  title,
  description,
  icon
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center gap-6 p-10 rounded-2xl bg-gray-50">
      <div className="flex items-center justify-center">
          {icon}
      </div>
      <div className="flex flex-col items-center gap-2">
        <h3 className="text-gray-950 text-2xl font-medium leading-9 text-center">
          {title}
        </h3>
        <p className="text-gray-400 text-base font-light leading-6 text-center">
          {description}
        </p>
      </div>
    </div>
  );
}