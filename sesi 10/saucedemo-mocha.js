const {Builder, By, Key, until} = require("selenium-webdriver");
const assert = require('assert');

async function saucedemologinaddtocart() {
    describe("Saucedemo Login Test", function(done) {
        it("Login Berhasil",async function(){
            // menambahkan time out
            this.timeout(10000) 

            //script login berhasil
            // membuat koneksi dengan webdriver
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
        console.log("Login Berhasil");

    } finally {
        await driver.quit();
    }
        }),

        it("Login Gagal",async function(){
            // menambahkan time out
            this.timeout(10000) 

            //script login gagal
            // membuat koneksi dengan webdriver
            let driver = await new Builder().forBrowser("chrome").build();

    try {
        //membuka URL di browser
        await driver.get("https://saucedemo.com");

        //login user
        await driver.findElement(By.id("user-name")).sendKeys("standard_user");
        await driver
        .findElement(By.xpath("//input[@id='password']"))
        .sendKeys("secret");
        await driver.findElement(By.name("login-button")).click();

        //validasi login berhasil atau tidak
        let errorMessage = await driver.findElement(By.css(".error-message-container"))
        .getText();
        assert.strictEqual(
            errorMessage.includes(
                "Username and password do not match"
            ),
            true,
            "Error Message do not match"
        );


        console.log("Login Gagal");

    } finally {
        await driver.quit();
    }
    });
});
}

saucedemologinaddtocart();