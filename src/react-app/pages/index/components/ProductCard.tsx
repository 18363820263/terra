export default function ProductCard({
  title,
  subtitle,
  description,
  image,
}: {
  title: string;
  subtitle: string;
  description: string;
  image: string;
}) {
  return (
    <div className="flex flex-col rounded-2xl overflow-hidden">
      <div className="relative p-10 bg-gray-900 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 w-[50%] h-full bg-gradient-to-r from-blue-600 to-transparent"></div>
        <div className="relative flex flex-col items-start gap-6">
          <div className="flex flex-col items-start gap-2">
            <h3 className="text-white text-2xl font-medium leading-9">
              {title}
            </h3>
            <p className="text-white/70 text-base font-light leading-6">
              {subtitle}
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-between p-10 bg-gray-50 flex-1">
        <p className="text-gray-400 text-base font-light leading-6">
          {description}
        </p>
        <div className="w-10 h-2 bg-blue-600 mt-6" />
      </div>
    </div>
  );
}
