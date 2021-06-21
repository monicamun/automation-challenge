const { Builder, By, Key, until } = require("selenium-webdriver");
const BasePage = require("../pages/basepage");
const webdriver = require("selenium-webdriver");

class SauceDemoLogin extends BasePage {
  do_login(username, password) {
    driver.findElement(By.id("user-name")).sendKeys(username);
    driver.findElement(By.id("password")).sendKeys(password);
    driver.findElement(By.id("login-button")).click();
  }

  async get_error_message() {
    const errorMessageEl = await driver.wait(
      until.elementLocated(By.css('[data-test="error"]')),
      20000
    );
    const errorMessage = await errorMessageEl.getText();
    return errorMessage;
  }
  async get_login_button() {
    const loginButtonEl = await driver.wait(
      until.elementLocated(By.css("#login-button")),
      20000
    );
    // const loginButtontext = await loginButtonEl.getText()
    return loginButtonEl;
  }
}
module.exports = new SauceDemoLogin();
