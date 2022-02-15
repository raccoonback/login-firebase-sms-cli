const puppeteer = require('puppeteer');
const StaticServer = require('static-server');
const server = new StaticServer({
    rootPath: '.',
    port: 4444,
    name: 'temp-http-server',
    host: '0.0.0.0',
    cors: '*',
    followSymlink: true,
    templates: {
        index: 'lib/index.html',
    }
})

server.start(async () => {
    await run()
    server.stop()
})

const run = async () => {
    const browser = await puppeteer.launch()
    const page = await browser.newPage();
    await page.goto('http://0.0.0.0:4444', {waitUntil: 'load'})

    await page.waitForSelector('#access-token-container > span')

    const element = await page.$('#access-token-container > span')
    const accessToken = await page.evaluate(el => el.textContent, element)
    await browser.close();

    console.log(accessToken)
}




