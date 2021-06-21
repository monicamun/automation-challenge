const { Builder, By, Key, until } = require("selenium-webdriver");
const BasePage = require("../pages/basepage");
const webdriver = require("selenium-webdriver");

class SauceDemoShoppingCart extends BasePage {
  async get_shopping_cart() {
    
    let products = await driver.wait(
      until.elementsLocated(By.css(".cart_button"))
    );
    const productsIdPromises = products.map(async (productEl) => {
      const productId = await productEl.getAttribute("id");
      return productId;
    });
    const productsId = Promise.all(productsIdPromises);
    return productsId;
  }
}

module.exports = new SauceDemoShoppingCart();
