import { Asset } from "expo-asset";
import * as FileSystem from "expo-file-system";
import * as SQLite from "expo-sqlite";

export default {
   stringifyParams: (params) => {
    let result = "?";
    for (let key in params) {
      result = result + "&" + key + "=" + params[key];
    }
  
    return result;
  },

  dateToString: (date) => {
    return date.toISOString().split("T")[0];
  },

  timeToString: (time) =>{
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  }
}

