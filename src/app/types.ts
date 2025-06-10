export interface Item {
  _id: string;
  name: string;
  description: string;
  location: string;
  category: string;
  brand: string;
  colour: string;
  type: "lost" | "found";
  dateFound: string;
  image: string;
  user: string;
}

export interface FilterOption {
  id: string;
  name: string;
}

export interface CurrentFilters {
  location: FilterOption;
  category: FilterOption;
  brand: FilterOption;
  colour: FilterOption;
}
