// library fns


// eg groupBy(rules, 'parentId')
export function groupBy(arr, key) {
  
  const groupDict = {}
  const itemDict = {}
  arr.forEach(el => {
    const keyValue = el[key] || 'none' // eg parentId = 'basic'
    groupDict[keyValue] = groupDict[keyValue] || []
    groupDict[keyValue].push(el) // add element to a list for each parentId
    itemDict[el.id] = el
  })

  const groups = []
  const keyValues = Object.keys(groupDict)
  for (let keyValue of keyValues) {
    const values = groupDict[keyValue]
    const item = itemDict[keyValue]
    const group = { [key]: keyValue, values, ...item }
    groups.push(group)
  }
  return groups
}
