import * as tools from "./lib";
import _ from "lodash";

tools.storage.prefix = "eee";
tools.storage.set("name", "http://xiaoyi");
tools.storage.set("arr", [1, 2, 3]);
console.log(tools.storage.get("name"), tools.storage.get("arr"));
// var format = (n) => {
//   let num = n.toString();
//   let len = num.length;
//   if (len <= 3) {
//     return num;
//   } else {
//     let temp = "";
//     let remainder = len % 3;
//     if (remainder > 0) {
//       // 不是3的整数倍
//       return (
//         num.slice(0, remainder) +
//         "," +
//         num.slice(remainder, len).match(/\d{3}/g).join(",") +
//         temp
//       );
//     } else {
//       // 3的整数倍
//       return num.slice(0, len).match(/\d{3}/g).join(",") + temp;
//     }
//   }
// };
// console.log(format("1000000.64"));
