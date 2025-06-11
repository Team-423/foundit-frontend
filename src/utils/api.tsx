import axios from "axios";

interface Category {
  _id: string;
  category_name: string;
  __v: number;
}

interface Location {
  _id: string;
  location_name: string;
  __v: number;
}

interface Brand {
  _id: string;
  brand_name: string;
  __v: number;
}

interface Colour {
  _id: string;
  colour: string;
  __v: number;
}

interface CategoriesResponse {
  categories: Category[];
}

interface LocationsResponse {
  locations: Location[];
}

interface BrandsResponse {
  brands: Brand[];
}

interface ColoursResponse {
  colours: Colour[];
}

interface QuestionAndAnswer {
  question: string;
  answer: string;
}

interface GetQandAResponse {
  questionAndAnswerPairs: QuestionAndAnswer[];
}

interface PatchQandAResponse {
  questionAndAnswerPairs: QuestionAndAnswer[];
}

interface ItemImgResponse {
  itemById: {
    img_url: string;
  };
}

export interface ItemResponse {
  itemById: {
    _id: string;
    item_name: string;
    description: string;
    size: string;
    material: string;
    location: { _id: string; location_name: string };
    category: { _id: string; category_name: string };
    brand: { _id: string; brand_name: string };
    colour: { _id: string; colour: string };
  };
}

const itemsApi = axios.create({
  baseURL: "https://foundit-backend-dg0o.onrender.com/api/items",
  timeout: 10000, // 10 second timeout
});

export const getCategories = async () => {
  try {
    const { data } = await itemsApi.get<CategoriesResponse>("/categories");
    return data.categories
      .map((category) => ({
        _id: category._id,
        category_name: category.category_name,
      }))
      .sort((a, b) => (a.category_name > b.category_name ? 1 : -1));
  } catch (error) {
    console.error("Error fetching categories:", error);
    return "Failed to load categories. Please try again.";
  }
};

export const getLocations = async () => {
  try {
    const { data } = await itemsApi.get<LocationsResponse>("/locations");
    return data.locations
      .map((location) => ({
        _id: location._id,
        location_name: location.location_name,
      }))
      .sort((a, b) => (a.location_name > b.location_name ? 1 : -1));
  } catch (error) {
    console.error("Error fetching locations:", error);
    return "Failed to load locations. Please try again.";
  }
};

export const getBrands = async () => {
  try {
    const { data } = await itemsApi.get<BrandsResponse>("/brands");
    return data.brands
      .map((brand) => ({
        _id: brand._id,
        brand_name: brand.brand_name,
      }))
      .sort((a, b) => (a.brand_name > b.brand_name ? 1 : -1));
  } catch (error) {
    console.error("Error fetching brands:", error);
    return "Failed to load brands. Please try again.";
  }
};

export const getColours = async () => {
  try {
    const { data } = await itemsApi.get<ColoursResponse>("/colours");
    return data.colours
      .map((colour) => ({
        _id: colour._id,
        colour: colour.colour,
      }))
      .sort((a, b) => (a.colour > b.colour ? 1 : -1));
  } catch (error) {
    console.error("Error fetching colours:", error);
    return "Failed to load colours. Please try again.";
  }
};

export const getQandA = async (item_id: string) => {
  const { data } = await itemsApi.get<GetQandAResponse>(`/${item_id}/QandA`);
  return data.questionAndAnswerPairs;
};

export const patchQandA = async (item_id: string, answers: string[]) => {
  const { data } = await itemsApi.patch<PatchQandAResponse>(
    `/${item_id}/QandA`,
    { answers }
  );
  return data.questionAndAnswerPairs;
};

export const getItemImgById = async (item_id: string) => {
  const { data } = await itemsApi.get<ItemImgResponse>(`/${item_id}`);
  return data.itemById.img_url;
};

export const getItemWithQueries = async (queries: {
  item_name?: string;
  category_id?: string;
  location_id?: string;
  colour_id?: string;
  brand_id?: string;
  type?: "lost" | "found";
}) => {
  const params = new URLSearchParams({
    ...(queries.item_name && { item_name: queries.item_name }),
    ...(queries.category_id && { category: queries.category_id }),
    ...(queries.location_id && { location: queries.location_id }),
    ...(queries.colour_id && { colour: queries.colour_id }),
    ...(queries.brand_id && { brand: queries.brand_id }),
    ...(queries.type && { type: queries.type }),
  });
  const { data } = await itemsApi.get(`?${params.toString()}`);
  return data;
};

export const getItemById = async (item_id: string) => {
  const { data } = await itemsApi.get<ItemResponse>(`/${item_id}`);
  return {
    item_name: data.itemById.item_name || "",
    description: data.itemById.description || "",
    size: data.itemById.size || "",
    material: data.itemById.material || "",
    location: {
      id: data.itemById.location?._id || "",
      name: data.itemById.location?.location_name || "",
    },
    category: {
      id: data.itemById.category?._id || "",
      name: data.itemById.category?.category_name || "",
    },
    brand: {
      id: data.itemById.brand?._id || "",
      name: data.itemById.brand?.brand_name || "",
    },
    colour: {
      id: data.itemById.colour?._id || "",
      name: data.itemById.colour?.colour || "",
    },
  };
};

interface UpdateItemData {
  item_name?: string;
  material?: string;
  description?: string;
  size?: string;
  location?: { id: string; name: string };
  category?: { id: string; name: string };
  brand?: { id: string; name: string };
  colour?: { id: string; name: string };
}

export const updateItemById = async (
  itemId: string,
  updatedData: UpdateItemData
) => {
  const formattedData = {
    ...updatedData,
    location: updatedData.location?.id,
    category: updatedData.category?.id,
    brand: updatedData.brand?.id,
    colour: updatedData.colour?.id,
  };
  const { data } = await itemsApi.patch(`/${itemId}`, formattedData);
  return data.updatedItem;
};
