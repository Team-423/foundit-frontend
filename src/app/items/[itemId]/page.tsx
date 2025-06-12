//path: /items/:itemId
import { notFound } from "next/navigation";
import ItemDetailsClient from "./ItemDetailsClient";
import type { Item } from "../../../types/item";

type ItemViewPageProps = {
  params: Promise<{ itemId: string }>;
};

export default async function ItemViewPage({ params }: ItemViewPageProps) {
  const { itemId } = await params;

  const res = await fetch(
    `https://foundit-backend-dg0o.onrender.com/api/items/${itemId}`,
    { cache: "no-store" }
  );

  if (!res.ok) return notFound();

  const item: { itemById: Item } = await res.json();
  const { itemById } = item;

  return <ItemDetailsClient item={itemById} />;
}
