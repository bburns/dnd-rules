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


// export function getTree(items) {

//   // get dictionary of parent lists and dictionary of items
//   const parents = {}
//   const itemDict = {}
//   for (let item of items) {
//     const parentId = item.parentId || 'none'
//     parents[parentId] = parents[parentId] || []
//     parents[parentId].push(item)
//     itemDict[item.id] = item
//   }

//   // build tree
//   const tree = []
//   // const parentIds = Object.keys(parents) // eg none, 
//   // for (let parentId of parentIds) {
//   // }


// }
