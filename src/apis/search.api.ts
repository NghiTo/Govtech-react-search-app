import { axiosInstance } from "../config/axiosInstance";

export const getResult = async () => {
  const res = await axiosInstance.get(
    "/yuhong90/b5544baebde4bfe9fe2d12e8e5502cbf/raw/44deafab00fc808ed7fa0e59a8bc959d255b9785/queryResult.json"
  );
  return res.data;
};

export const getSuggestion = async () => {
  const res = await axiosInstance.get(
    "/yuhong90/b5544baebde4bfe9fe2d12e8e5502cbf/raw/e026dab444155edf2f52122aefbb80347c68de86/suggestion.json"
  );
  return res.data;
};
