import Link from "next/link";
import { Item } from "../types";

interface ItemCardProps {
  item: Item;
}

export default function ItemCard({ item }: ItemCardProps) {
  return (
    <Link href={`/items/${item._id}`} className="block">
      <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
        {item.image ? (
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-48 object-cover"
          />
        ) : (
          <div className="w-full h-48 bg-gray-200 flex items-center justify-center text-gray-500 text-sm">
            No Image Available
          </div>
        )}
        <div className="p-4">
          <h3 className="text-xl font-semibold text-gray-800 mb-2 truncate">
            {item.name}
          </h3>
          <p className="text-gray-600 text-sm mb-1">
            <span className="font-medium">Type:</span> {item.type}
          </p>
          <p className="text-gray-600 text-sm mb-1">
            <span className="font-medium">Category:</span> {item.category}
          </p>
          <p className="text-gray-600 text-sm mb-1">
            <span className="font-medium">Location:</span> {item.location}
          </p>
          <p className="text-gray-600 text-sm text-right mt-2 text-blue-600 hover:underline">
            View Details
          </p>
        </div>
      </div>
    </Link>
  );
}
