const {Builder, By} = require('selenium-webdriver');
const firefox = require('selenium-webdriver/firefox');
 exports.crawling = async(placeUrl, placeData) => {
  let driver = await new Builder()
  .forBrowser('firefox')
  .setFirefoxOptions(
    new firefox.Options()
    .headless()
  ).build();
  await driver.manage().setTimeouts({
    implicit: 30000,
    pageLoad: 30000,
    script: 30000,
  });

  await driver.get(placeUrl);

  try{ 
  const img = await driver.findElement(By.css("span.bg_present"));
  const imgString = await img.getCssValue("background-image");
  setTimeout(async () => {
    await driver.quit();
    process.exit(0);
  }, 5000);
  placeData.picture_url = imgString.slice(5, -2)
  await placeData.save();
  }
  catch{
  placeData.picture_url = "https://t1.daumcdn.net/localimg/localimages/07/2017/pc/bg_nodata.png";
  await placeData.save();
  }
};
