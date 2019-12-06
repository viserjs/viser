/** 计算字符长度 */
function strLen(str: string) {
  let len = 0;
  for (let i = 0; i < str.length; i++) {
    if (str.charCodeAt(i) > 0 && str.charCodeAt(i) < 128) {
      len++;
    } else {
      len += 2;
    }
  }
  return len;
}
/** 字符串过长以...呈现 */
function ellipsisString(str: string, maxWidth: number, fontSize: number) {
  const fontWidth = fontSize * 1.3; // 字号+边距
  maxWidth = maxWidth * 2; // 需要根据自己项目调整
  const width = strLen(str) * fontWidth;
  const ellipsis = '…';
  if (width > maxWidth) {
    const actualLen = Math.floor((maxWidth - 10) / fontWidth);
    const result = str.substring(0, actualLen) + ellipsis;
    return result;
  }
  return str;
}

export {
  strLen,
  ellipsisString,
};
