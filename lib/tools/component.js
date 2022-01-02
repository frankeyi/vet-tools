const component = {
  /**
   * 向上找到最近的指定组件
   * @param {Object} context 从那个组件开始查找
   * @param {String} componentName
   * @returns 返回
   */
  findParent: function(context, componentName) {
    let parent = context.$parent;
    let name = parent.$options.name;

    while (parent && (!name || [componentName].indexOf(name) < 0)) {
      parent = parent.$parent;
      if (parent) name = parent.$options.name;
    }
    return parent;
  },

  /**
   * 向上找到所有的指定组件
   * @param {Object} context
   * @param {String} componentName
   * @returns
   */
  findParents: function(context, componentName) {
    let parents = [];
    const parent = context.$parent;

    if (parent) {
      if (parent.$options.name === componentName) parents.push(parent);
      return parents.concat(this.findParents(parent, componentName));
    } else {
      return [];
    }
  },

  /**
   * 向下找到最近的指定组件
   * @param {Object} context
   * @param {String} componentName
   * @returns
   */
  findChild: function(context, componentName) {
    const childrens = context.$children;
    let children = null;

    if (childrens.length) {
      for (const child of childrens) {
        const name = child.$options.name;
        if (name === componentName) {
          children = child;
          break;
        } else {
          children = this.findChild(child, componentName);
          if (children) break;
        }
      }
    }
    return children;
  },

  /**
   * 向下找到所有指定的组件
   * @param {Object} context
   * @param {String} componentName
   * @returns
   */
  findChilds: function(context, componentName) {
    return context.$children.reduce((components, child) => {
      if (child.$options.name === componentName) components.push(child);
      const foundChilds = this.findChilds(child, componentName);
      return components.concat(foundChilds);
    }, []);
  },

  /**
   * 找到指定组件的兄弟组件
   * @param {Object} context
   * @param {String} componentName
   * @param {Boolean} exceptMe //是否把本身除外
   * @returns
   */
  findBrothers: function(context, componentName, exceptMe = true) {
    let res = context.$parent.$children.filter((item) => {
      return item.$options.name === componentName;
    });
    let index = res.findIndex((item) => item._uid === context._uid);
    if (exceptMe) res.splice(index, 1);
    return res;
  },
};

export default component;
