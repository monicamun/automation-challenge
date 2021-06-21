const webdriver = require('selenium-webdriver');
const { Builder, By, Key, until } = require("selenium-webdriver");
const driver = new webdriver.Builder().forBrowser('chrome').build();
driver.manage().setTimeouts({implicit: (1000)});

class Basepage{
    constructor(){
        global.driver = driver;
    }

    go_to_url(theURL){
        driver.get(theURL);
    }
    async get_title(){
        const titleEl = await driver.wait(until.elementLocated(By.className('title')),20000);
        const title = await titleEl.getText();
        return title;
     }
}

module.exports = Basepage;