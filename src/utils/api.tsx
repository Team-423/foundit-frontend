import axios from "axios";

interface QuestionAndAnswer {
  question: string;
  answer: string;
}

interface GetQandAResponse {
  questions: QuestionAndAnswer[];
}

interface ItemImgResponse {
  itemById: {
    img_url: string;
  };
}

const itemsApi = axios.create({
  baseURL: "https://foundit-backend-dg0o.onrender.com/api/items",
});

export const getQandA = async (item_id: string) => {
  const { data } = await itemsApi.get<GetQandAResponse>(`/${item_id}/QandA`);
  return data.questions;
};

export const getItemImgById = async (item_id: string) => {
  const { data } = await itemsApi.get<ItemImgResponse>(`/${item_id}`);
  return data.itemById.img_url;
};
