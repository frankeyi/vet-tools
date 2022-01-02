import { isArray, isObject } from "lodash";
var cookie = {
  set: function (key, value, seconds = 60 * 60 * 24 * 1, path = "/") {
    if (isArray(value) || isObject(value)) value = JSON.stringify(value);
    var date = new Date();
    date.setTime(date.getTime() - 8 * 3600 * 1000 + seconds * 1000);
    document.cookie = `${key}=${value};expires=${date};path=${path}`;
  },
  get: function (key, isJson = false) {
    var arr = document.cookie.split("; ");
    for (var i = 0; i < arr.length; i++) {
      if (arr[i].split("=")[0] == key) {
        return isJson ? JSON.parse(arr[i].split("=")[1]) : arr[i].split("=")[1];
      }
    }
    return undefined;
  },
  getJSON: function (key) {
    return this.get(key, true);
  },
  getAll: function () {
    var arr = document.cookie.split("; ");

    if (arr.length == 1 && arr[0] == "") return undefined;

    let obj = {};
    for (var j = 0; j < arr.length; j++) {
      obj[arr[j].split("=")[0]] = arr[j].split("=")[1];
    }
    return obj;
  },
  remove: function (key) {
    return this.set(key, "", -1);
  },
  clear: function () {
    var arr = document.cookie.split("; ");
    for (var i = 0; i < arr.length; i++) {
      this.remove(arr[i].split("=")[0], -1);
    }
  },
};

export default cookie;
