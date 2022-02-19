/**
 * 数据转换为树形（递归）
 * @param {Array} list 基础数组
 * @param {String} id 子级id名,默认'id'
 * @param {String} parentId 父级id名,默认'parentId'
 * @param {String} children 树形数据子数据的属性名,默认'children'
 * @returns {Array}
 */
function toTree(list, id = "id", parentId = "parentId", children = "children") {
  let obj = {}; // 用来储存{key: obj}格式的对象
  let tree = []; // 用来储存最终树形结构数据的数组
  // 将数据变换成{key: obj}格式，方便下面处理数据
  for (let i = 0; i < list.length; i++) {
    obj[list[i][id]] = list[i];
  }
  // 根据pid来将数据进行格式化
  for (let j = 0; j < list.length; j++) {
    // 判断父级是否存在
    let haveParent = obj[list[j][parentId]];
    if (haveParent) {
      // 如果有没有父级children字段，就创建一个children字段
      !haveParent[children] && (haveParent[children] = []);
      // 在父级里插入子项
      haveParent[children].push(list[j]);
    } else {
      // 如果没有父级直接插入到最外层
      tree.push(list[j]);
    }
  }
  return tree;
}

export default toTree;
