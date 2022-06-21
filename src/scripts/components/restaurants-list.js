import './resto.js'

class Restaurant extends HTMLElement {
  connectedCallback() {
    this.render()
  }

  render() {}
}

customElements.define('ristorante-list', Restaurant)
