const lib = require("./deflate");

export function compress(s: string) {
  //UTF8
  s = unescape(encodeURIComponent(s));
  return lib.encode64(lib.zip_deflate(s, 9));
}
