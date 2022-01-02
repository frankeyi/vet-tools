const zeroFill = function (num, len) {
  var t = (num + "").length,
    s = "";

  for (var i = 0; i < len - t; i++) {
    s += "0";
  }

  return s + num;
};

export default zeroFill;
