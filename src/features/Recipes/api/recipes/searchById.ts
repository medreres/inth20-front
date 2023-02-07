import { API_URL } from "../index";
import { Recipe } from "../../interface/index";
import axios from "axios";

export default async function searchById(id: string) {
  return axios.get(API_URL + "/lookup.php?i=" + id).then(({ data }) => data.meals[0] as Recipe);
}
