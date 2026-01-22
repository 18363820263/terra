export default function AdvantageCard({
  title,
  description,
  comparison,
  icon,
}: {
  title: string;
  icon: React.ReactNode;
  description: string;
  comparison: { label: string; value: string }[];
}) {
  return (
    <div className="flex flex-col items-start gap-6 p-10 rounded-2xl bg-gray-50">
      <div className="flex items-center justify-center w-[69px] h-[54px] px-4 rounded-lg bg-blue-600">
        <span>{icon}</span>
      </div>
      <div className="flex flex-col items-start gap-2 w-full text-left">
        <h3 className="text-gray-950 text-2xl font-medium leading-9">
          {title}
        </h3>
        <p className="text-gray-400 text-base font-light leading-6">
          {description}
        </p>
      </div>
      <div className="h-px w-full bg-gray-200" />
      <div className="flex flex-col items-start gap-3 w-full">
        {comparison.map((item, index) => (
          <div key={index} className="flex items-start justify-between w-full">
            <span className="text-gray-400 text-base font-light leading-6 text-left">
              {item.label}
            </span>
            <span className="text-gray-950 text-base font-light leading-6 text-right">
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
