const Query = {
  statsCount(parent, {severity, locationKeywords}, { db }, info) {
    console.log('____________________________')
    const threshold = severity ? severity : 0
    const collections = db.people
    const output = []
    for (let i = 0; i < locationKeywords.length; i++) {
      var item = locationKeywords[i]
      const tmp = collections.filter(c => c.location.description.includes(item))
      const result = tmp.filter(c => c.severity >= threshold)
      output.push(result.length)
    }
    return output
  }
};

export { Query as default };
