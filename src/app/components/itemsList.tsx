import ItemCard from "./itemCard";
import { Item } from "../items/page";

interface ItemsListProps {
  items: Item[];
}

export default function ItemsList({ items }: ItemsListProps) {
  if (!items || items.length === 0) {
    return <div className="text-center py-8">No items to display.</div>;
  }

  return (
    <div className="grid grid-cols-1 gap-6">
      {items.map((item) => (
        <ItemCard key={item._id} item={item} />
      ))}
    </div>
  );
}
