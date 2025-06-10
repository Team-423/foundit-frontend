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
