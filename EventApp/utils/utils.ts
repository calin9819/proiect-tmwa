import { Asset } from "expo-asset";
import * as FileSystem from "expo-file-system";
import * as SQLite from "expo-sqlite";

const stringifyParams = (params) => {
  let result = "?";
  for (let key in params) {
    result = result + "&" + key + "=" + params[key];
  }

  return result;
};

export default stringifyParams;

export const dateToString = (date) => {
  return date.toISOString().split("T")[0];
};
