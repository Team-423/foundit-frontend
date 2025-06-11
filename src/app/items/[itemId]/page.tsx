//path: /items/:itemId
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

type Item = {
  item_name: string;
  description: string;
  lost: boolean;
  author: { username: string } | string;
  location: string;
  address?: string;
  img_url?: string;
  created_at: string;
  material?: string;
  brand?: { brand_name: string; _id: string };
  category?: { category_name: string; _id: string };
  colour?: { colour: string; _id: string };
  size?: string;
  _id?: string;
};

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

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-xl shadow-lg p-8">
        <header>
          <h1 className="text-3xl font-extrabold text-[#1e6091] text-center mb-8">
            {itemById.item_name}
          </h1>
        </header>

        <article className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <section>
            <h2 className="block text-gray-700 font-medium mb-2">
              Description
            </h2>
            <p className="w-full p-4 border border-gray-200 rounded-lg shadow-sm bg-white">
              {itemById.description}
            </p>
          </section>

          <section>
            <h2 className="block text-gray-700 font-medium mb-2">Author</h2>
            <address className="not-italic w-full p-4 border border-gray-200 rounded-lg shadow-sm bg-white">
              {typeof itemById.author === "string"
                ? itemById.author
                : itemById.author.username}
            </address>
          </section>

          {itemById.created_at && (
            <section>
              <h2 className="block text-gray-700 font-medium mb-2">
                Posted Date
              </h2>
              <p className="w-full p-4 border border-gray-200 rounded-lg shadow-sm bg-white">
                {new Date(itemById.created_at).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </section>
          )}

          {itemById.material && (
            <section>
              <h2 className="block text-gray-700 font-medium mb-2">Material</h2>
              <p className="w-full p-4 border border-gray-200 rounded-lg shadow-sm bg-white">
                {itemById.material}
              </p>
            </section>
          )}

          {itemById.brand && (
            <section>
              <h2 className="block text-gray-700 font-medium mb-2">Brand</h2>
              <p className="w-full p-4 border border-gray-200 rounded-lg shadow-sm bg-white">
                {itemById.brand.brand_name}
              </p>
            </section>
          )}

          {itemById.colour && (
            <section>
              <h2 className="block text-gray-700 font-medium mb-2">Colour</h2>
              <p className="w-full p-4 border border-gray-200 rounded-lg shadow-sm bg-white">
                {itemById.colour.colour}
              </p>
            </section>
          )}

          {itemById.size && (
            <section>
              <h2 className="block text-gray-700 font-medium mb-2">Size</h2>
              <p className="w-full p-4 border border-gray-200 rounded-lg shadow-sm bg-white">
                {itemById.size}
              </p>
            </section>
          )}

          {itemById.address && (
            <section>
              <h2 className="block text-gray-700 font-medium mb-2">Location</h2>
              <address className="not-italic w-full p-4 border border-gray-200 rounded-lg shadow-sm bg-white">
                {itemById.address}
              </address>
            </section>
          )}

          {itemById.img_url && (
            <section className="md:col-span-2">
              <figure className="w-full">
                <Image
                  src={itemById.img_url}
                  alt={`Image of ${itemById.item_name}`}
                  className="w-full rounded-lg object-cover shadow-md"
                  width={300}
                  height={300}
                  priority
                />
              </figure>
            </section>
          )}
        </article>

        <nav className="mt-8 flex justify-center">
          <Link href={`/items/${itemById._id}/claim`}>
            <button className="bg-[#38A3A5] px-6 py-3 rounded-lg text-white font-medium text-lg shadow-md hover:bg-[#2d8a8c] transition-colors">
              Claim
            </button>
          </Link>
        </nav>
      </div>
    </div>
  );
}
