# vet-tools
VUE一些常用的工具函数，[Github](https://github.com/frankeyi/vet-tools)

## Using npm:
```shell
npm install vet-tools --save
#or
yarn add vet-tools --save
```
## In main.js:
```js
//方法一：按需引入
import { storage, uuid, dom, toTree ...} from "vet-tools"

//方法二：添加实例 property
import * as tools from "vet-tools"
Vue.prototype.$T = tools
```
# typeOf

判断数据类型

```js
/**
 * 判断数据类型
 * @param {*} value 要判断的值
 * @returns {*}
 */

this.$T.typeOf([])
// => array

this.$T.typeOf({})
// => object

this.$T.typeOf("")
// => string

this.$T.typeOf(1)
// => number

this.$T.typeOf(true)
// => boolean

this.$T.typeOf(new Date())
// => date

this.$T.typeOf(Null)
// => null

this.$T.typeOf(function() {})
// => function

this.$T.typeOf(/^[\u4e00-\u9fa5]*$/)
// => regExp
```
# uuid

生成唯一标识符

```js
/**
 * 生成唯一标识符
 * @param {Number} len 生成字符串长度  默认生成 xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
 * @param {Number} radix 最长62
 * @returns {String}
 */

this.$T.uuid()
// => EE7487D6-AB4F-4EA7-AEBA-695DDD68986D

this.$T.uuid(20)
// => ahb9lgbekO6SsovNyqju
```

# random

产生一个包括 lower 与 upper 之间的数。 如果只提供一个参数返回一个 0 到提供数之间的数。 如果 floating 设为 true，或者 lower 或 upper 是浮点数，结果返回浮点数。

```js
/**
 * 生成范围随机数
 * @param {Number} [lower=1] 上限
 * @param {Number} [upper=1] 下限
 * @param {boolean} [floating=false] 指定是否返回浮点数
 * @returns {Number}
 */

this.$T.random(1000, 9999);
// => 9614

this.$T.random(1000, 9999, true),
// => 9614.202384238808
```

# clone

创建一个浅拷贝

```js
/**
 * 创建一个浅拷贝
 * @param {*} value 要拷贝的值
 * @returns {*}
 */
var objects = [{ a: 1 }, { b: 2 }]
var shallow = this.$T.clone(objects)
console.log(shallow[0] === objects[0])
// => true
```


# Storage

通过 localStorage 实现的浏览器本地存储的 JavaScript 封装 API，特点是可以自动区分数据类型和设置数据有效期。

### set

```js
/**
 * 保存数据
 * @param {String} key 键名
 * @param {String,Object,Array,Number,Boolean} value 需要保存的值
 * @param {Number} exp 到期时间（选填)，exp 小于 365、366 则，按天算。否则按时间戳算
 * @example this.$T.storage.set(key, value, exp);
 */

//example

//String
this.$T.storage.set("name", "xiao yi")

//Object
this.$T.storage.set("info", { sex: "boy", weight: "100kg" })

//Array
this.$T.storage.set("keyName", [1, 2, 3])

//Number
this.$T.storage.set("age", 18)

//Boolean
this.$T.storage.set("marriage", false)
```

### get

```js
/**
 * 读取数据
 * @param {String} key 键名
 * @example this.$T.storage.get(key);
 */

this.$T.storage.get("name")
// => xiao yi

// tip 你可以通过 getAll 获取所有数据
this.$T.storage.getAll();
```

### remove

```js
/**
 * 删除数据
 * @param {String} key 键名
 * @example this.$T.storage.remove(key);
 */

this.$T.storage.remove("keyName")

// 你可以通过 clear 清除所有数据
this.$T.storage.clear();
```



# Cookie

### set

```js
/**
 * 保存数据
 * @param {String} key 键名
 * @param {String,Object,Array} value 需要保存的值
 * @param {Number} seconds 到期时间（秒)，默认为24小时
 */

//String
this.$T.cookie.set("name", "xiao yi")

//Object
this.$T.cookie.set("name", { name: "xiao yi" })

//Array
this.$T.cookie.set("name", [1, 2, 3])
```

### get

```js
/**
 * 读取数据
 * @param {String} key 键名
 * @param {Boolen} isJson 是否是JSON数据
 */

//String
this.$T.cookie.set("name", "xiao yi")
this.$T.cookie.get("name")
// => xiao yi

//Object
this.$T.cookie.set("name2", { name: "xiao yi" })
this.$T.cookie.get("name2", true)
// => { name: "xiao yi" }

//Array
this.$T.cookie.set("name3", [1, 2, 3])
this.$T.cookie.get("name3", true)
// => [1, 2, 3]

//你还可以用getJSON来获取JSON数据

this.$T.cookie.getJSON("name2")
// => { name: "xiao yi" }

this.$T.cookie.getJSON("name3", true)
// => [1, 2, 3]

// 可以通过getAll获取所有cookie
this.$T.cookie.getAll() 
```

### remove

```js
/**
 * 删除数据
 * @param {String} key 键名
 */

this.$T.cookie.remove("keyName")

//你可以通过 clear 清除所有数据
this.$T.cookie.clear();
```

# toTree

数据转换为树形（递归）

```js
/**
 * 数据转换为树形（递归）
 * @param {Array} list 基础数组
 * @param {String} sonId 子级属性名
 * @param {String} parentId 父级属性名
 * @returns {Array}
 */
let list = [
	{
		id: 1,
		name: "一级",
		parentId: 0
	},
	{
		id: 2,
		name: "二级",
		parentId: 1
	}
]
this.$T.toTree(list, "id", "parentId")
// =>
// {
// 	id: 1,
// 	name: "一级",
// 	parentId: 0,
// 	children: [
// 		{
// 			id: 2,
// 			name: "二级",
// 			parentId: 1,
//          children:[]
// 		}
// 	]
// }
```

# zeroFill

数字补零

```js
/**
 * 补零
 * @param {Number,String} num 数字
 * @param {Number} len 几位数
 * @returns {String}
 */

this.$T.zeroFill(5, 2)
// => '05'

this.$T.zeroFill(5, 3)
// => '005'
```


# FindComponent

### component.findParent

```js
/**
 * 向上找到最近的指定组件
 * @param {Object} context 指定组件
 * @param {String} componentName 组件名
 * @returns
 */

this.$T.component.findParent(context, componentName)
// => component
```

### component.findParents

```js
/**
 * 向上找到所有的指定组件
 * @param {Object} context 指定组件
 * @param {String} componentName 组件名
 * @returns
 */

this.$T.component.findParents(context, componentName)
// => [component]
```

### component.findChild

```js
/**
 * 向下找到最近的指定组件
 * @param {Object} context 指定组件
 * @param {String} componentName 组件名
 * @returns
 */

this.$T.component.findChild(context, componentName)
// => component
```

### component.findChilds

```js
/**
 * 向下找到所有指定的组件
 * @param {Object} context 指定组件
 * @param {String} componentName 组件名
 * @returns
 */

this.$T.component.findChilds(context, componentName)
// => [component]
```

### component.findBrothers

```js
/**
 * 找到指定组件的兄弟组件
 * @param {Object} context 指定组件
 * @param {String} componentName 组件名
 * @returns
 */

this.$T.component.findBrothers(context, componentName)
// => [component]
```


# Dom

### hasClass

检查样式是否存在

```js
/**
 * 检查样式是否存在
 * @param {Object} el 目标dom
 * @param {String} cls 样式名
 * @returns {Boolean}
 */

this.$T.dom.hasClass(this.$refs.button, "red");
// => true or false
```

### addClass

添加样式

```js
/**
 * 添加样式
 * @param {Object} el 目标dom
 * @param {String} cls 样式名
 * @returns
 */

this.$T.dom.addClass(this.$refs.button, "red");
```

### removeClass

删除样式

```js
/**
 * 删除样式
 * @param {Object} el 目标dom
 * @param {String} cls 样式名
 * @returns
 */

this.$T.dom.removeClass(this.$refs.button, "red");
```

### getStyle

获取所有样式属性和值

```js
/**
 * 删除样式
 * @param {Object} el 目标dom
 * @param {String} name 样式属性名
 * @returns {CSSStyleDeclaration,Strine}
 */

this.$T.dom.getStyle(this.$refs.button, "width");
// => 100px

//如果没有传入样式属性名，返回所有样式的集合
this.$T.dom.getStyle(this.$refs.button);
// => [CSSStyleDeclaration]
```

### setStyle

给 dom 设置样式
第二个参数可以传入一个对象，这时 value 忽略。

```js
/**
 *
 * @param {Object} el 目标dom
 * @param {String,Object} name 样式
 * @param {String} value 样式值
 * @returns
 */

this.$T.dom.setStyle(this.$refs.button, "width", "100px");

//第二个参数可以传入一个对象，这时value忽略
this.$T.dom.setStyle(this.$refs.button, {
  width: "100px",
  height: "100px",
});
```

