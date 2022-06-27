import DrawerInitiator from "../utils/drawer-initiator";
import routes from "../routes/routes";
import UrlParser from "../routes/url-parser";

class App {
  constructor({ button, drawer, content }) {
    this._button = button;
    this._drawer = drawer;
    this._content = content;
    this._inititalAppShell();
  }

  _inititalAppShell() {
    DrawerInitiator.init({
      button: this._button,
      drawer: this._drawer,
      content: this._content,
    });
  }

  async renderPage() {
    const url = UrlParser.parseActiveUrlWithCombiner();
    const page = routes[url] || routes["/"];
    this._content.innerHTML = await page.render();
    await page.afterRender();

    const skipLinkElem = document.querySelector(".skip-to-content");
    skipLinkElem.addEventListener("click", (event) => {
      event.preventDefault();
      document.querySelector("#main-content").focus();
    });
  }
}

export default App;
