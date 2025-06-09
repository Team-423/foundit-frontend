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

const itemsApi = axios.create({
  baseURL: "https://foundit-backend-dg0o.onrender.com/api/items",
});

export const getCategories = async (): Promise<string[]> => {
  const { data } = await itemsApi.get<CategoriesResponse>("/categories");
  return data.categories.map((category) => category.category_name).sort();
};

export const getLocations = async (): Promise<string[]> => {
  const { data } = await itemsApi.get<LocationsResponse>("/locations");
  return data.locations.map((location) => location.location_name).sort();
};

export const getBrands = async (): Promise<string[]> => {
  const { data } = await itemsApi.get<BrandsResponse>("/brands");
  return data.brands.map((brand) => brand.brand_name).sort();
};

export const getColours = async (): Promise<string[]> => {
  const { data } = await itemsApi.get<ColoursResponse>("/colours");
  return data.colours.map((colour) => colour.colour).sort();
};
