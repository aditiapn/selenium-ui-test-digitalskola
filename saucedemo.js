const {Builder, By, Key, until} = require("selenium-webdriver");
const assert = require('assert');

async function saucedemologinaddtocart() {

    let driver = await new Builder().forBrowser("chrome").build();

    try {
        //membuka URL di browser
        await driver.get("https://saucedemo.com");

        //login user
        await driver.findElement(By.id("user-name")).sendKeys("standard_user");
        await driver
        .findElement(By.xpath("//input[@id='password']"))
        .sendKeys("secret_sauce");
        await driver.findElement(By.name("login-button")).click();

        //validasi login berhasil atau tidak
        let titleText = await driver.findElement(By.css(".app_logo")).getText();
        assert.strictEqual(
            titleText.includes('Swag Labs'),
            true,
            'Title does not include "Swag Labs"'
        );

        // menunggu halaman menampilkan barang yang tersedia
        await driver.wait(until.elementLocated(By.css(".inventory_list")), 10000);

        // menambahkan item ke cart
        await driver.findElement(By.xpath("//button[@id='add-to-cart-sauce-labs-backpack']")).click();

        // validasi cart sudah berisi item atau belum
        let cartCount = await driver.findElement(By.className("shopping_cart_badge")).getText();
        assert.strictEqual(cartCount, "1", 'cart tidak muncul angka "1"');

    } finally {
        //await driver.quit();
    }
}

saucedemologinaddtocart();