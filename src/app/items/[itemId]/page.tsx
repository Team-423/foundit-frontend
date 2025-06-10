//path: /items/:itemId
import { notFound } from "next/navigation";
import Link from "next/link";

type Item = {
  title: string;
  description: string;
  lost: boolean;
  author: { username: string } | string;
  location: string;
  address?: string;
  img_url?: string;
  _id?: string;
};

type ItemViewPageProps = {
  params: { itemId: string };
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

  return (
    <main className="max-w-2xl mx-auto mt-10 p-4 border rounded-xl shadow space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-center">Item Details: {itemById.title}</h1>
      </header>

      <article className="space-y-4">
        <section>
          <h2 className="block font-medium">Description</h2>
          <p className="w-full border p-2 rounded bg-gray-50">{itemById.description}</p>
        </section>
        
        <section>
          <h2 className="block font-medium">Status</h2>
          <p className="w-full border p-2 rounded bg-gray-50">
            {itemById.lost ? "Lost" : "Found"}
          </p>
        </section>

        <section>
          <h2 className="block font-medium">Author</h2>
          <address className="not-italic w-full border p-2 rounded bg-gray-50">
            {typeof itemById.author === "string"
              ? itemById.author
              : itemById.author.username}
          </address>
        </section>

        {itemById.address && (
          <section>
            <h2 className="block font-medium">Location</h2>
            <address className="not-italic w-full border p-2 rounded bg-gray-50">
              {itemById.address}
            </address>
          </section>
        )}

        {itemById.img_url && (
          <figure className="w-full border p-2 rounded bg-gray-50">
            <img
              src={itemById.img_url}
              alt={`Image of ${itemById.title}`}
              className="w-full rounded"
            />
            <figcaption className="text-center text-gray-500">
              {itemById.title}
            </figcaption>
          </figure>
        )}
      </article>

      <nav>
        <Link href={`/items/${itemById._id}/claim`}>
          <button className="w-full bg-[#5a189a] text-white py-2 px-4 rounded hover:bg-[#3c096c]">
            Claim
          </button>
        </Link>
      </nav>
    </main>
  );
}