const styles = {
  'el-rate': '.el-rate{display: inline-block; vertical-align: text-top;}',
  'el-upload': '.el-upload__tip{line-height: 1.2;}'
} as any

function addCss (cssList: any, el: any) {
  const css = styles[el.config.tag]
  css && cssList.indexOf(css) === -1 && cssList.push(css)
  if (Array.isArray(el.children)) {
    el.children.forEach((el2: any) => addCss(cssList, el2))
  }
}

export function makeUpCss (conf: any[]) {
  const cssList = [] as any
  conf.forEach((el: any) => addCss(cssList, el))
  return cssList.join('\n')
}
