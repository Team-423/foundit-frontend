export type Item = {
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
