import { hasIn, camelCase, isNaN } from "lodash";
const dom = {
  /**
   *
   * @param {Object} el 目标dom
   * @param {String} cls 样式名
   * @returns {Boolean}
   */
  hasClass: function (el, cls) {
    if (!el || !cls) return false;
    if (cls.indexOf(" ") !== -1)
      throw new Error("className should not contain space.");
    if (el.classList) {
      return el.classList.contains(cls);
    } else {
      return (" " + el.className + " ").indexOf(" " + cls + " ") > -1;
    }
  },
  /**
   *
   * @param {Object} el 目标dom
   * @param {String} cls 样式名
   * @returns
   */
  addClass: function (el, cls) {
    if (!el || !cls) return;
    let curClass = el.className;
    const classes = (cls || "").split(" ");

    for (let i = 0, j = classes.length; i < j; i++) {
      const clsName = classes[i];
      if (!clsName) continue;

      if (el.classList) {
        el.classList.add(clsName);
      } else {
        if (!this.hasClass(el, clsName)) {
          curClass += " " + clsName;
        }
      }
    }
    if (!el.classList) {
      el.className = curClass;
    }
  },
  /**
   *
   * @param {Object} el 目标dom
   * @param {String} cls 样式名
   * @returns
   */
  removeClass: function (el, cls) {
    if (!el || !cls) return;
    const classes = cls.split(" ");
    let curClass = " " + el.className + " ";

    for (let i = 0, j = classes.length; i < j; i++) {
      const clsName = classes[i];
      if (!clsName) continue;

      if (el.classList) {
        el.classList.remove(clsName);
      } else {
        if (hasClass(el, clsName)) {
          curClass = curClass.replace(" " + clsName + " ", " ");
        }
      }
    }
    if (!el.classList) {
      el.className = trim(curClass);
    }
  },
  /**
   *
   * @param {Object} el 目标dom
   * @param {String} name 样式
   * @returns 如果nama没有传就输出所有的样式
   */
  getStyle: function (el, name = null) {
    if (!el) return null;
    name = camelCase(name);
    if (name === "float") {
      name = "cssFloat";
    }
    try {
      const styles = document.defaultView.getComputedStyle(el, "");
      return name ? styles[name] : styles;
    } catch (e) {
      return name ? el.style[name] : el.style;
    }
  },

  /**
   *
   * @param {Object} el 目标dom
   * @param {String,Object} name 样式
   * @param {String} value 样式值
   * @returns 如果nama为 object value忽略
   */
  setStyle: function (el, name, value) {
    if (!el || !name) return;

    if (typeof name === "object") {
      for (var prop in name) {
        if (hasIn(name, prop)) {
          this.setStyle(el, prop, name[prop]);
        }
      }
    } else {
      name = camelCase(name);
      if (name === "opacity" && ieVersion < 9) {
        el.style.filter = isNaN(value)
          ? ""
          : "alpha(opacity=" + value * 100 + ")";
      } else {
        el.style[name] = value;
      }
    }
  },
};

export default dom;
