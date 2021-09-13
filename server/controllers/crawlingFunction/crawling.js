const webdriver = require('selenium-webdriver');
const { By } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome')

exports.crawling = async(placeUrl,placeData)=>{
    const service = new chrome.ServiceBuilder('./controllers/crawlingFunction/chrome').build();
    chrome.setDefaultService(service);

    const driver = await new webdriver.Builder().forBrowser('chrome').build();
    // const driver = new webdriver.Builder().forBrowser('chrome').setChromeOptions(new chrome.Options().addArguments('--headless')).build();
    await driver.manage().setTimeouts({
        implicit: 30000,
        pageLoad: 30000,
        script: 30000
    })

    await driver.get(placeUrl);
    
    const img = await driver.findElement(By.css('span.bg_present'));
    const imgString = await img.getCssValue("background-image");
    console.log(imgString);

    setTimeout(async () => {
        await driver.quit();
        process.exit(0);
    }, 5000);
    placeData.picture_url = imgString || null
    await placeData.save();
}
