// library fns


// eg groupBy(rules, 'parentId')
export function groupBy(arr, key) {
  const d = {}
  const d2 = {}
  arr.forEach(el => {
    const keyValue = el[key] || 'none' // eg parentId = 'basic'
    d[keyValue] = d[keyValue] || []
    d[keyValue].push(el) // add element to a list for each parentId
    d2[el.id] = el
  })
  const ret = []
  for (let keyValue of Object.keys(d)) {
    const group = { [key]: keyValue, values: d[keyValue], ...d2[keyValue] }
    ret.push(group)
  }
  return ret
}
