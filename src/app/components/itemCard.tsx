import Link from "next/link";
import { Item } from "../items/page";
import Image from "next/image";

interface ItemCardProps {
  item: Item;
}

export default function ItemCard({ item }: ItemCardProps) {
  const timeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (seconds < 60) return `${seconds} seconds ago`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes} minutes ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} hours ago`;
    const days = Math.floor(hours / 24);
    return `${days} days ago`;
  };

  return (
    <Link href={`/items/${item._id}`} className="block">
      <div className="bg-white p-6 border border-gray-200 hover:border-blue-500 transform hover:scale-102 transition-all duration-200 flex">
        <div className="flex-none w-48 h-48 mr-6">
          {item.img_url ? (
            <Image
              src={item.img_url}
              alt={item.item_name}
              className="w-full h-full object-contain rounded-md"
              width={100}
              height={100}
            />
          ) : (
            <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400 text-base rounded-md">
              No Image Available
            </div>
          )}
        </div>
        <div className="flex-1">
          <h3 className="text-2xl font-semibold mb-3 text-[#1e6091] hover:text-[#2c7cb0] transition-colors">
            {item.item_name}
          </h3>
          <p className="text-gray-700 text-base mb-2">
            <span className="font-medium">
              {item.author.username} posted {timeAgo(item.created_at)}
            </span>
          </p>
          {item.lost && (
            <p className="text-gray-700 text-base">
              This item was lost in {item.location.location_name}
            </p>
          )}
          {item.found && (
            <p className="text-gray-700 text-base">
              This item was found in {item.location.location_name}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}
