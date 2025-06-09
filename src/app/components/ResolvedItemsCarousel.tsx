import Image from "next/image";

interface Item {
  item_name: string;
  img: string;
}

export default function ResolvedItemsCarousel() {
  const items: Item[] = [
    { item_name: "Fork", img: "/images/logo/found-it-logo.png" },
    { item_name: "Spoon", img: "/images/logo/found-it-logo.png" },
    { item_name: "Nice Slacks", img: "/images/logo/found-it-logo.png" },
    { item_name: "Trilby hat", img: "/images/logo/found-it-logo.png" },
    { item_name: "Something nice", img: "/images/logo/found-it-logo.png" },
  ];

  return (
    <>
      {/* Carousel Container */}
      <div className="p-2">
        {/* Section Title */}
        <h2 className="text-2xl font-bold mb-6 text-center">
          Success Stories:
        </h2>

        {/* Scrolling Container */}
        <div className="flex overflow-x-auto scroll-smooth snap-x snap-mandatory space-x-6 pb-4 no-scrollbar">
          {/* Item Cards */}
          {items.map((item, index) => (
            <div
              key={index}
              className="min-w-[200px] max-w-[250px] min-h-[15rem] flex-shrink-0 bg-[#ADBDC2] rounded-4xl border shadow-md p-4 text-center snap-start"
            >
              {/* Item Title */}
              <h3 className="mt-4 mb-0 font-semibold text-lg">
                {item.item_name}
              </h3>

              {/* Item Image */}
              <Image
                className="object-contain w-full h-auto mb-[1rem]"
                src={item.img}
                alt={item.item_name}
                width={200}
                height={180}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
