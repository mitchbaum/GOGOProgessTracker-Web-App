const puppeteer = require('puppeteer');

    async function scrapeProduct(url) {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(url);

        const [el] = await page.$x('/html/body/div[3]/main/div[2]/div/div[1]/div/div/div[1]/div/img');
        const src = await el.getProperty('src');

        const srcTxt = await src.jsonValue();

        console.log({srcTxt});

    }

    scrapeProduct('https://www.strava.com/athletes/2521816');