const hexToRgb = hex => {
  let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null
}

export const transformColor = (hexColor, incrementTone) => {
  const colorRGBObject = hexToRgb(hexColor)
  let red = colorRGBObject.r + incrementTone
  let green = colorRGBObject.g + incrementTone
  let blue = colorRGBObject.b + incrementTone
  red = red < 0 ? 0 : (red > 255 ? 255 : red)
  green = green < 0 ? 0 : (green > 255 ? 255 : green)
  blue = blue < 0 ? 0 : (blue > 255 ? 255 : blue)
  return `rgb(${red},${green},${blue})`
}