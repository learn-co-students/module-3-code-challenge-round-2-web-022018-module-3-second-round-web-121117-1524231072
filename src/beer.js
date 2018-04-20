class Beer {
  constructor(data) {
    this.id = data.id
    this.name = data.name
    this.tagline = data.tagline
    this.first_brewed = data.first_brewed
    this.description = data.description
    Beer.all.push(this)
  }


  static allBeer() {
    Adapter.getBeer()
    .then(json => {
      json.forEach(beer => {
        let newBeer = new Beer(beer)
      })
      Beer.renderBeer()
    })
  }

  static renderBeer() {
    let beerList = document.getElementById('list-group')
    Beer.all.forEach(beer => {
      beerList.innerHTML += (`<li class="list-group-item" id='${beer.id}'>${beer.name}</li>`)
    })
    Beer.renderBeerDetail()
  }

  static renderBeerDetail() {
    let detail = document.getElementById('beer-detail')
    let allBeers = document.getElementById('list-group')


    allBeers.addEventListener('click', e => {
      e.preventDefault()
      let thisBeer = parseInt(e.target.id)
      console.log(thisBeer)

      let eachBeer = Beer.all.find(beer => {
        return beer.id === thisBeer
      })

      detail.innerHTML = (`
        <h1>${eachBeer.name}</h1>
        <h3>${eachBeer.tagline}</h3>
        <form id="beerform">
        <textarea id="textarea" name='${eachBeer.name}'>${eachBeer.description}</textarea>
        <input type="submit">
        </form>
      `)
      let updateForm = document.getElementById('beerform')
      let textarea = document.getElementById('textarea')
      updateForm.addEventListener('click', e =>{
        // e.preventDefault()
        Adapter.saveUpdate(`${eachBeer.id}`, `${textarea.value}`)
      })
    })
  }


}

Beer.all = []
