import uuidv4 from 'uuid/v4';

const Mutation = {
  insertPeople(parent, {data}, { db }, info) {
    // console.log('_______________________________')
    // console.log(data.length)
      try {
        for (let i = 0; i < data.length; i++) {
          const item = data[i]
          // console.log(item)
          const collections = db.people
          const result = collections.findIndex((c) => c.ssn === item.ssn)
            if (result === -1) {
              collections.push(item)
            } else {
              collections[result] = item
            }
        }
        return true
      } catch (error) {
        return false
      }
  }
}

export { Mutation as default };
