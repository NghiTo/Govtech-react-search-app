import axios from "axios";

export const getResult = async () => {
  const res = await axios.get(
    "https://gist.githubusercontent.com/yuhong90/b5544baebde4bfe9fe2d12e8e5502cbf/raw/44deafab00fc808ed7fa0e59a8bc959d255b9785/queryResult.json"
  );
  return res.data;
};
