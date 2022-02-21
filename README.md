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



# pick

创建一个从 `object` 中选中的属性的对象。

```js
/**
 * @param {object} value 来源对象
 * @param {props} (...(string|string[])) 要被忽略的属性。（注：单独指定或指定在数组中。）
 * @returns {object} //返回一个新对象
 */

var object = { 'a': 1, 'b': '2', 'c': 3 };
this.$T.pick(object, ['a', 'c']);
// => { 'a': 1, 'c': 3 }
```

# omit

反向版_.pick; 这个方法一个对象，这个对象由忽略属性之外的object自身和继承的可枚举属性组成。（注：可以理解为删除object对象的属性）。

```js
/**
 * @param {object} value 来源对象
 * @param {props} (...(string|string[])) 要被忽略的属性。（注：单独指定或指定在数组中。）
 * @returns {object} //返回一个新对象
 */

var object = { 'a': 1, 'b': '2', 'c': 3 };
this.$T.omit(object, ['a', 'c']);
// => { 'b': '2' }
```


# find
`find(collection, [predicate=_.identity], [fromIndex=0])`
遍历 collection（集合）元素，返回 predicate（断言函数）第一个返回真值的第一个元素。predicate（断言函数）调用3个参数： (value, index|key, collection)。

```js
/**
 * @param {Array|Object} collection  一个用来迭代的集合
 * @param {Array|Function|Object|string} [predicate=_.identity] 每次迭代调用的函数
 * @param {number} [fromIndex=0] 开始搜索的索引位置
 * @returns {*} 返回匹配元素，否则返回 undefined
 */

var users = [
  { 'user': 'barney',  'age': 36, 'active': true },
  { 'user': 'fred',    'age': 40, 'active': false },
  { 'user': 'pebbles', 'age': 1,  'active': true }
];
 
this.$T.find(users, function(o) { return o.age < 40; });
// => object for 'barney'
 
// The `_.matches` iteratee shorthand.
this.$T.find(users, { 'age': 1, 'active': true });
// => object for 'pebbles'
 
// The `_.matchesProperty` iteratee shorthand.
this.$T.find(users, ['active', false]);
// => object for 'fred'
 
// The `_.property` iteratee shorthand.
this.$T.find(users, 'active');
// => object for 'barney'
```


# findIndex
`findIndex(array, [predicate=_.identity], [fromIndex=0])`
该方法类似_.find，区别是该方法返回第一个通过 predicate 判断为真值的元素的索引值（index），而不是元素本身。

```js
/**
 * @param {Array|Object} collection  一个用来迭代的集合
 * @param {Array|Function|Object|string} [predicate=_.identity] 每次迭代调用的函数
 * @param {number} [fromIndex=0] 开始搜索的索引位置
 * @returns {number} 返回找到元素的 索引值（index），否则返回 -1。
 */

var users = [
  { 'user': 'barney',  'active': false },
  { 'user': 'fred',    'active': false },
  { 'user': 'pebbles', 'active': true }
];
 
this.$T.findIndex(users, function(o) { return o.user == 'barney'; });
// => 0
 
// The `_.matches` iteratee shorthand.
this.$T.findIndex(users, { 'user': 'fred', 'active': false });
// => 1
 
// The `_.matchesProperty` iteratee shorthand.
this.$T.findIndex(users, ['active', false]);
// => 0
 
// The `_.property` iteratee shorthand.
this.$T.findIndex(users, 'active');
// => 2
```




# findKey
`findKey(object, [predicate=_.identity])`
这个方法类似`find` 。 除了它返回最先被 predicate 判断为真值的元素 key，而不是元素本身。

```js
/**
 * @param {Array|Object} collection  一个用来迭代的集合
 * @param {Array|Function|Object|string} [predicate=_.identity] 每次迭代调用的函数
 * @returns  返回匹配元素，否则返回 undefined
 */

var users = {
  'barney':  { 'age': 36, 'active': true },
  'fred':    { 'age': 40, 'active': false },
  'pebbles': { 'age': 1,  'active': true }
};
 
this.$T.findKey(users, function(o) { return o.age < 40; });
// => 'barney' (iteration order is not guaranteed)
 
// The `_.matches` iteratee shorthand.
this.$T.findKey(users, { 'age': 1, 'active': true });
// => 'pebbles'
 
// The `_.matchesProperty` iteratee shorthand.
this.$T.findKey(users, ['active', false]);
// => 'fred'
 
// The `_.property` iteratee shorthand.
this.$T.findKey(users, 'active');
// => 'barney'
```


# keys
`keys(object)`
创建一个 `object` 的自身可枚举属性名为数组。

```js
/**
 * @param {Object} object  要检索的对象
 * @returns {Array} 返回包含属性名的数组
 */

function Foo() {
  this.a = 1;
  this.b = 2;
}
 
Foo.prototype.c = 3;
 
this.$T.keys(new Foo);
// => ['a', 'b'] (iteration order is not guaranteed)
 
this.$T.keys('hi');
// => ['0', '1']
```


# keysIn
`keysIn(object)`
创建一个 `object` 自身 和 继承的可枚举属性名为数组。

```js
/**
 * @param {Object} object  要检索的对象
 * @returns {Array} 返回包含属性名的数组
 */

function Foo() {
  this.a = 1;
  this.b = 2;
}
 
Foo.prototype.c = 3;
 
this.$T.keysIn(new Foo);
// => ['a', 'b', 'c'] (iteration order is not guaranteed)
```


# size
`size(collection)`
返回`collection`（集合）的长度，如果集合是类数组或字符串，返回其 length ；如果集合是对象，返回其可枚举属性的个数。

```js
/**
 * @param {Array|Object} collection  要检查的集合
 * @returns {Number} 返回集合的长度
 */

this.$T.size([1, 2, 3]);
// => 3
 
this.$T.size({ 'a': 1, 'b': 2 });
// => 2
 
this.$T.size('pebbles');
// => 7
```

# uniq
`uniq(array)`
创建一个去重后的array数组副本。使用了SameValueZero 做等值比较。只有第一次出现的元素才会被保留。

```js
/**
 * @param {Array} array  要检查的数组
 * @returns {Array} 返回新的去重后的数组
 */

this.$T.uniq([2, 1, 2]);
// => [2, 1]
```


# camelCase
`camelCase([string=''])`
转换字符串string为驼峰写法。

```js
/**
 * @param {String} string  要转换的字符串
 * @returns {String} 返回驼峰写法的字符串
 */

this.$T.camelCase('Foo Bar');
// => 'fooBar'
 
this.$T.camelCase('--foo-bar--');
// => 'fooBar'
 
this.$T.camelCase('__FOO_BAR__');
// => 'fooBar'
```


# toLower
`toLower([string=''])`
转换整个string字符串的字符为小写，类似String#toLowerCase。

```js
/**
 * @param {String} string  要转换的字符串
 * @returns {String} 返回小写的字符串
 */

this.$T.toLower('--Foo-Bar--');
// => '--foo-bar--'
 
this.$T.toLower('fooBar');
// => 'foobar'
 
this.$T.toLower('__FOO_BAR__');
// => '__foo_bar__'
```


# toUpper
`toUpper([string=''])`
转换整个string字符串的字符为大写，类似String#toUpperCase.

```js
/**
 * @param {String} string  要转换的字符串
 * @returns {String} 返回大写的字符串
 */

this.$T.toUpper('--foo-bar--');
// => '--FOO-BAR--'
 
this.$T.toUpper('fooBar');
// => 'FOOBAR'
 
this.$T.toUpper('__foo_bar__');
// => '__FOO_BAR__'
```


# trim
`trim([string=''], [chars=whitespace])`
从string字符串中移除前面和后面的 空格 或 指定的字符。

```js
/**
 * @param {String} string  要处理的字符串
 * @param {String} chars  要移除的字符
 * @returns {String} 返回大写的字符串
 */

this.$T.trim('  abc  ');
// => 'abc'
 
this.$T.trim('-_-abc-_-', '_-');
// => 'abc'
```


# truncate
`truncate([string=''], [options=])`
截断string字符串，如果字符串超出了限定的最大值。 被截断的字符串后面会以 omission 代替，omission 默认是 "..."。

```js
/**
 * @param {String} string  要处理的字符串
 * @param {Object} [options.length=30] (number): 允许的最大长度。
                   [options.omission='...'] (string): 超出后的代替字符。
                   [options.separator] (RegExp|string): 截断点。
 * @returns {String} 返回处理后的字符串
 */

this.$T.truncate('hi-diddly-ho there, neighborino');
// => 'hi-diddly-ho there, neighbo...'
 
this.$T.truncate('hi-diddly-ho there, neighborino', {
  'length': 24,
  'separator': ' '
});
// => 'hi-diddly-ho there,...'
 
this.$T.truncate('hi-diddly-ho there, neighborino', {
  'length': 24,
  'separator': /,? +/
});
// => 'hi-diddly-ho there...'
 
this.$T.truncate('hi-diddly-ho there, neighborino', {
  'omission': ' [...]'
});
// => 'hi-diddly-ho there, neig [...]'
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
 * @param {String} id 子级id名,默认'id'
 * @param {String} parentId 父级id名,默认'parentId'
 * @param {String} children 树形数据子数据的属性名,默认'children'
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
this.$T.toTree(list, "id", "parentId","children")
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

# flatTree

树形数据结构的扁平化

```js
/**
 *
 * @param {Array} arrs 树形数据
 * @param {string} childs 树形数据子数据的属性名,常用'children'
 * @param {Array} attrArr 需要提取的公共属性数组(默认是除了childs的全部属性)
 * @returns {Array}
 */

var list = [
  {
    a: 1,
    b: 2,
    c: 1,
    children: [
      {
        a: 1,
        b: 2,
        c: 1,
        children: [
			{ a: 11, b: 21, c: 21 }
		],
      },
    ],
  },
];

this.$T.flatTree(list, "children", ["a", "b"])

// =>
// [
//     {
//         "a": 1,
//         "b": 2
//     },
//     {
//         "a": 1,
//         "b": 2
//     },
//     {
//         "a": 11,
//         "b": 21
//     }
// ]
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

