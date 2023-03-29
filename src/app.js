import express from 'express';
import { chromium } from 'playwright'

const app = express();

app.get('/', async (req, res) => {
    const browser = await chromium.launch();
    const page = await browser.newPage();
    await page.goto("https://dolarhoy.com/");
    await page.waitForLoadState('domcontentloaded');

    const content = await page.evaluate(() => {
        let resultado = []
        const rawText = document.querySelectorAll('.val')
        resultado.push(rawText[0].innerText);
        resultado.push(rawText[1].innerText);
        return resultado
    })
    await browser.close();
    res.send({ content })
});

app.listen(8080, () => console.log(`Server started on 8080`));