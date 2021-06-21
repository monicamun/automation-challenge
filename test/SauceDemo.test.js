const expect = require("chai").expect;
const sauceDemoLogin = require("../pages/sauceDemoLogin");
const sauceDemoInventory = require("../pages/sauceDemoInventory");
const sauceDemoShoppingCart = require("../pages/sauceDemoShoppingCart");
const sauceDemoCheckout = require("../pages/sauceDemoCheckout")

describe("saucedemo login page", () => {
  const baseUrl = "https://www.saucedemo.com/";
    it("Navigates to the products page when logged in", async () => {
      sauceDemoLogin.go_to_url(baseUrl);
      sauceDemoLogin.do_login("standard_user", "secret_sauce");
      expect(await sauceDemoLogin.get_title()).to.equal("PRODUCTS");
    });

    it("Validate error message is displayed", async () => {
      sauceDemoLogin.go_to_url(baseUrl);
      sauceDemoLogin.do_login("non-existent username", "secret_sauce");
      expect(await sauceDemoLogin.get_error_message()).to.equal(
        "Epic sadface: Username and password do not match any user in this service"
      );
    });

    it("Validate the user navigates to the login page", async () => {
      sauceDemoLogin.go_to_url(baseUrl);
      sauceDemoLogin.do_login("standard_user", "secret_sauce");
      sauceDemoInventory.do_logout();
      expect(await sauceDemoLogin.get_login_button()).to.not.be.null;
    });

    it("Validate the products have been sorted by price correctly", async () => {
      await wait(200);
      sauceDemoLogin.go_to_url(baseUrl);
      sauceDemoLogin.do_login("standard_user", "secret_sauce");
      await sauceDemoInventory.sort_by_prices();
      await wait(200);
      const prices = await sauceDemoInventory.get_prices();
      const sortedPrices = Array.from(prices).sort((a, b) => a - b);
      console.log("prices", prices);
      console.log("sortedPrices", sortedPrices);
      expect(prices.length).to.equal(sortedPrices.length);
      for (let i = 0; i < prices.length; i++) {
        expect(prices[i]).to.equal(sortedPrices[i]);
      }
    });

    it("Validate all the items that have been added to the shopping cart", async () => {
      await wait(200);
      sauceDemoLogin.go_to_url(baseUrl);
      sauceDemoLogin.do_login("standard_user", "secret_sauce");
      await wait(500);
      let productsArray = [
          "sauce-labs-bike-light",
          "sauce-labs-bolt-t-shirt",
        ];
      await sauceDemoInventory.add_to_shopping_cart(productsArray);
      await wait(500);
      await sauceDemoInventory.go_to_shopping_cart();
      const shoppingCart = await sauceDemoShoppingCart.get_shopping_cart();
      expect(shoppingCart.length).to.equal(2);
      expect(shoppingCart).to.include.members([
        "remove-sauce-labs-bike-light",
        "remove-sauce-labs-bolt-t-shirt",
      ]);
    });

    it("Validate the correct product was added to the cart", async () => {
      await wait(200);
      sauceDemoLogin.go_to_url(baseUrl);
      sauceDemoLogin.do_login("standard_user", "secret_sauce");
      await wait(500);
      let productsArray = [
          "sauce-labs-fleece-jacket",
        ];
      await sauceDemoInventory.add_to_shopping_cart(productsArray);
      await wait(500);
      await sauceDemoInventory.go_to_shopping_cart();
      const shoppingCart = await sauceDemoShoppingCart.get_shopping_cart();
      expect(shoppingCart).to.include.members([
        "remove-sauce-labs-fleece-jacket",
      ]);
    });

  it("Validate the user navigates to the order confirmation page", async () => {
    await wait(200);
    sauceDemoLogin.go_to_url(baseUrl);
    sauceDemoLogin.do_login("standard_user", "secret_sauce");
    await wait(500);
    let productsArray = ["sauce-labs-onesie"];
    await sauceDemoInventory.add_to_shopping_cart(productsArray);
    await wait(500);
    await sauceDemoInventory.go_to_shopping_cart();
    await sauceDemoCheckout.start_checkout();
    await wait(500);
    await sauceDemoCheckout.fill_checkout_data("Monica","Muñoz","4288");
    await sauceDemoCheckout.finish_order();
    await wait(500);
    const title = await sauceDemoCheckout.get_title()
    expect(title).to.equal("CHECKOUT: COMPLETE!");
  });
});

function wait(milliseconds) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}
