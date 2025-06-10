import ItemCard from "./itemCard";
import { Item } from "../types";

interface ItemsListProps {
  items: Item[];
}

export default function ItemsList({ items }: ItemsListProps) {
  if (!items || items.length === 0) {
    return (
      <div className="text-center py-8 text-gray-600 text-lg">
        No items to display.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {items.map((item) => (
        <ItemCard key={item._id} item={item} />
      ))}
    </div>
  );
}
