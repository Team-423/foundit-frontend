//path: /items/:itemId
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

type Item = {
  item_name: string;
  description: string;
  lost: boolean;
  author: {
    _id: string;
    username: string;
  };
  location: { _id: string; location_name: string };
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

  console.log("Item data:", JSON.stringify(itemById, null, 2));

  return (
    <div className="min-h-screen bg-gray-50 flex items-start justify-center p-8">
      <div className="max-w-4xl w-full bg-white rounded-xl shadow-lg p-8 relative">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-extrabold text-[#1e6091] text-center flex-grow">
            {itemById.item_name}
          </h1>
          <Link href={`/items/${itemById._id}/edit`}>
            <button className="bg-gray-400 px-4 py-2 rounded-lg text-white font-medium text-sm shadow-md hover:bg-gray-500 transition-colors">
              Edit
            </button>
          </Link>
        </header>

        <article className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {itemById.img_url && (
            <section>
              <figure className="w-full h-full flex items-center justify-center">
                <Image
                  src={itemById.img_url}
                  alt={`Image of ${itemById.item_name}`}
                  className="w-full rounded-lg shadow-md"
                  width={400}
                  height={400}
                  priority
                />
              </figure>
            </section>
          )}

          <section className="space-y-4">
            <section>
              <div className="w-full p-4 border border-gray-200 rounded-lg shadow-sm bg-white space-y-2">
                <p>
                  <strong>Location:</strong> {itemById.location.location_name}
                </p>
                <p>
                  <strong>Status:</strong> {itemById.lost ? "Lost" : "Found"}
                </p>
                <p>
                  <strong>Description:</strong> {itemById.description}
                </p>
                <p>
                  <strong>Author:</strong> {itemById.author.username}
                </p>
                {itemById.created_at && (
                  <p>
                    <strong>Posted Date:</strong>{" "}
                    {new Date(itemById.created_at).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                )}
                {itemById.material && (
                  <p>
                    <strong>Material:</strong> {itemById.material}
                  </p>
                )}
                {itemById.brand && (
                  <p>
                    <strong>Brand:</strong> {itemById.brand.brand_name}
                  </p>
                )}
                {itemById.colour && (
                  <p>
                    <strong>Colour:</strong> {itemById.colour.colour}
                  </p>
                )}
                {itemById.size && (
                  <p>
                    <strong>Size:</strong> {itemById.size}
                  </p>
                )}
              </div>
            </section>
          </section>
        </article>

        <div className="mt-8 flex justify-center">
          {itemById.lost ? (
            <Link href={`/items/${itemById._id}/chat`}>
              <button className="bg-[#38A3A5] px-6 py-3 rounded-lg text-white font-medium text-lg shadow-md hover:bg-[#2d8a8c] transition-colors">
                I found this item, click to chat with {itemById.author.username}
              </button>
            </Link>
          ) : (
            <Link href={`/items/${itemById._id}/claim`}>
              <button className="bg-[#38A3A5] px-6 py-3 rounded-lg text-white font-medium text-lg shadow-md hover:bg-[#2d8a8c] transition-colors">
                Claim
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
