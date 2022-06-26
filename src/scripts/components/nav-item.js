class NavItem extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
    <a href="#/" class="nav-item">Home</a>
    <a href="#/favorite-restaurants" class="nav-item">Favorite</a>
    <a href="https://github.com/bryankazuro04" class="nav-item" target="_blank" rel="noreferrer">About Us</a>
    `;
  }
}

customElements.define("nav-list", NavItem);
