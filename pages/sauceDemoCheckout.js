const { Builder, By, Key, until } = require("selenium-webdriver");
const BasePage = require("../pages/basepage");
const webdriver = require("selenium-webdriver");

class SauceDemoCheckout extends BasePage {
  async start_checkout() {
    (await driver.wait(until.elementLocated(By.id("checkout")), 20000)).click();
  }

  async fill_checkout_data(firstName, lastName, postalCode) {
    (
      await driver.wait(until.elementLocated(By.id("first-name")), 20000)
    ).sendKeys(firstName);
    (
      await driver.wait(until.elementLocated(By.id("last-name")), 20000)
    ).sendKeys(lastName);
    (
      await driver.wait(until.elementLocated(By.id("postal-code")), 20000)
    ).sendKeys(postalCode);
    (await driver.wait(until.elementLocated(By.id("continue")), 20000)).click();
    
  }

  async  finish_order() {
    (await driver.wait(until.elementLocated(By.id("finish")), 20000)).click();
  }
}

module.exports = new SauceDemoCheckout();
