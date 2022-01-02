import typeOf from "./typeOf";

const localStorage = {
  /**
   * 保存数据
   * @param {String} key 键名
   * @param {String,Object,Array,Number,Boolean} value 值
   * @param {Number} exp 选填
   * @example this.$T.storage.set(key, value, exp);
   */

  set: function (key, value, exp) {
    var obj = new Object(),
      expires = exp || null;

    obj.time = new Date().getTime();
    obj.type = typeOf(value); //记录数据类型

    if (typeOf(value) === "array" || typeOf(value) === "object") {
      obj.value = JSON.stringify(value);
    } else {
      obj.value = value;
    }

    // expires 类型
    if (expires === null) {
      delete obj.expires;
    } else if (typeOf(expires) === "object") {
      obj.expires = expires.getTime() - obj.time;
    } else if (typeOf(expires) === "number") {
      if ((expires | 0) !== expires) {
        throw new Error("expires must be integer number!");
      }

      // expires 小于 365、366 则，按天算。否则按时间戳算
      if (expires <= getYearDays() && expires > 0) {
        obj.expires = expires * 1000 * 60 * 60 * 24;
      } else if (expires > getYearDays()) {
        obj.expires = expires;
      } else if (expires <= 0) {
        this.removeItem(key);
      }
    }
    localStorage.setItem(key, JSON.stringify(obj));
  },

  /**
   * 读取数据
   * @param {String} key 键名
   * @example this.$T.storage.get(key);
   */
  get: function (key) {
    try {
      var obj = JSON.parse(localStorage.getItem(key));
    } catch (e) {
      return localStorage.getItem(key);
    }

    if (obj === "null" || obj === null) return null;
    var expires = obj.expires,
      now = new Date().getTime(),
      time = obj.time;

    if (now - time >= expires || now < time) {
      localStorage.removeItem(key);
      return null;
    } else {
      let value = obj.value;
      switch (obj.type) {
        case "boolean":
          return value;
        case "number":
          return parseFloat(value);
        case "array":
          try {
            const arr = JSON.parse(value);
            return typeOf(arr) === "array" ? arr : [];
          } catch (e) {
            return [];
          }
        case "object":
          try {
            const obj = JSON.parse(value);
            return typeOf(obj) === "object" ? obj : {};
          } catch (e) {
            return {};
          }
        default:
          return value;
      }
    }
  },
  getAll: function () {
    let obj = {};
    for (var i = 0; i < localStorage.length; i++) {
      var key = localStorage.key(i);
      obj[key] = this.get(key);
    }
    return obj;
  },
  remove: function (key) {
    return localStorage.removeItem(key);
  },
  clear: function () {
    return localStorage.clear();
  },
};

function getYearDays() {
  return new Date().getFullYear() % 4 === 0 ? 366 : 365;
}

export default localStorage;
