import * as tools from "./lib";

tools.storage.prefix = "eee";
tools.storage.storageType = sessionStorage;
tools.storage.set("name", "http://xiaoyi");
tools.storage.set("arr", [1, 2, 3]);
console.log(tools.storage.get("name"), tools.storage.get("arr"));
// console.log(tools.zeroFill(1, 3));
