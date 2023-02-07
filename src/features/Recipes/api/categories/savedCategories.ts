import { Category } from '../../interface/index';
import axios from "axios";
export default async function savedCategories(id_token: string) {
  return axios
    .get("https://int20h.onrender.com/categories", {
      headers: {
        "Authorization-Google": id_token,
        "Content-Type": "application/json",
      },
    })
    .then(({ data }) => data as Category[])
    // .catch((err) => err);
}
