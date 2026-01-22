import { IndexBook } from "@/assets/imgs";

export default function StoryCard({ title }: { title: string }) {
  return (
    <div className="w-[164px] h-[343px] relative rounded-2xl overflow-hidden bg-gray-50">
      <img
        src={IndexBook}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/40" />
      <div className="absolute top-8 left-10">
        <h3 className="text-white text-2xl font-medium leading-9">{title}</h3>
      </div>
    </div>
  );
}
