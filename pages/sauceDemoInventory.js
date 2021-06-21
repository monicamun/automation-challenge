const { Builder, By, Key, until } = require("selenium-webdriver");
const BasePage = require("../pages/basepage");
const webdriver = require("selenium-webdriver");

class SauceDemoInventory extends BasePage {
  async do_logout() {
    (
      await driver.wait(
        until.elementLocated(By.id("react-burger-menu-btn")),
        20000
      )
    ).click();
    (
      await driver.wait(
        until.elementLocated(By.id("logout_sidebar_link")),
        20000
      )
    ).click();
  }
  async sort_by_prices() {
    (
      await driver.wait(
        until.elementLocated(
          By.css(".product_sort_container>option[value='lohi']")
        ),
        20000
      )
    ).click();
  }

  async get_prices() {
    const pricesEl = await driver.findElements(By.css(".inventory_item_price"));
    const pricesPromises = pricesEl.map(async (priceEl) => {
      const priceText = await priceEl.getText();
      const price = priceText.replace("$", "");
      const priceNumber = Number(price);
      return priceNumber;
    });
    const prices = Promise.all(pricesPromises);
    return prices;
  }

  async add_to_shopping_cart(productsArray) {
    for (let i = 0; i < productsArray.length; i++) {
      const product = await driver.wait(
        until.elementLocated(By.id("add-to-cart-"+productsArray[i])),
        20000
      );
      product.click();
    }
  }

  async go_to_shopping_cart() {
    (
      await driver.wait(
        until.elementLocated(By.css(".shopping_cart_link")),
        20000
      )
    ).click();
  }
}

module.exports = new SauceDemoInventory();
