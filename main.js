import * as tools from "./lib";
import _ from "lodash";

tools.storage.prefix = "eee";
tools.storage.set("name", "http://xiaoyi");
tools.storage.set("arr", [1, 2, 3]);
console.log(tools.storage.get("name"), tools.storage.get("arr"));

let list = [
  {
    id: 1,
    name: "一级",
    parentId: 0,
  },
  {
    id: 2,
    name: "二级",
    parentId: 1,
  },
];
console.log(tools.toTree(list, "id", "parentId", "children"));
