class Adapter {

  static getBeer() {
    return fetch('http://localhost:3000/beers')
    .then(r => r.json())
  }

  static saveUpdate(thisid, data) {
    fetch(`http://localhost:3000/beers/${thisid}`, {
      method: "PATCH",
      headers:  {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({id: thisid, description: data})
    })
  }

}
