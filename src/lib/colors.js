function hsv_to_rgb(h, s, v) {
  var r, g, b, i, f, p, q, t;
  i = Math.floor(h * 6);
  f = h * 6 - i;
  p = v * (1 - s);
  q = v * (1 - f * s);
  t = v * (1 - (1 - f) * s);
  switch (i % 6) {
    case 0: r = v, g = t, b = p; break;
    case 1: r = q, g = v, b = p; break;
    case 2: r = p, g = v, b = t; break;
    case 3: r = p, g = q, b = v; break;
    case 4: r = t, g = p, b = v; break;
    case 5: r = v, g = p, b = q; break;
  }
  return [
    Math.round(r * 255),
    Math.round(g * 255),
    Math.round(b * 255)
  ];
}

/*
function get_rainbow_steps(length) {
  var colors = [];
  var step = 1/length;
  for (var i = 0; i < length; i++) {
    var h = i * step;
    var [r,g,b] = hsv_to_rgb(h, 1, 1);
    var solid = `rgba(${r},${g},${b},1)`;
    colors.push(solid);
  }
  return colors
}
*/

function get_green_steps(length, brightness=.3) {
  var colors = [];
  var step = 1/length;
  for (var i = length-1; i >= 0; i--) {
    var v = ((i * step) * (1-brightness)) + brightness;
    var [r,g,b] = hsv_to_rgb(.2222, 1, v);
    var solid = `rgba(${r},${g},${b},1)`;
    colors.push(solid);
  }
  return stagger_array(colors);
}

function get_grey_steps(length, brightness=0) {
  var colors = [];
  var step = 1/length;
  for (var i = length-1; i >= 0; i--) {
    var v = ((i * step) * (1-brightness)) + brightness;
    var [r,g,b] = hsv_to_rgb(.57, .3, v);
    var solid = `rgba(${r},${g},${b},1)`;
    colors.push(solid);
  }
  return stagger_array(colors);
}

function get_zipped_colors(f0, f1, length, brightness=0) {
  var length0 = Math.ceil(length/2);
  var length1 = Math.floor(length/2);
  var colors0 = f0(length0, brightness);
  var colors1 = f1(length1, brightness).reverse();
  var zipped_colors = [];
  for (var i = 0; i < colors0.length; i++) {
    zipped_colors.push(colors0[i]);
    if (i < colors1.length) {
      zipped_colors.push(colors1[i]);
    }
  }
  return zipped_colors;
}

function stagger_array(a) {
  var new_array = [];
  var half_length = Math.ceil(a.length/2);
  var first_half = a.slice(0, half_length);
  var second_half = a.slice(half_length, a.length);
  for (var i = 0; i < half_length; i++) {
    new_array.push(first_half[i]);
    if (i < second_half.length) {
      new_array.push(second_half[i]);
    }
  }
  return new_array;
}

export function get_bar_green(length) {
  return get_zipped_colors(get_green_steps, get_grey_steps, length, .5);
}

export function get_pie_green(length) {
  return get_zipped_colors(get_green_steps, get_grey_steps, length, .2);
}