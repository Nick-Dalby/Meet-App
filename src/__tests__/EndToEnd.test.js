import puppeteer from 'puppeteer';

describe('Show/Hide An Events Details', () => {
    let browser
    let page
    beforeAll(async () => {
      jest.setTimeout(30000)
      browser = await puppeteer.launch()
      page = await browser.newPage()
      await page.goto('http://localhost:3000/')
      await page.waitForSelector('.event')
    })

    afterAll(() => {
      browser.close()
    })

    test('An event element is collapsed by default', async () => {
      const eventDetails = await page.$('.event .event-details')
      expect(eventDetails).toBeNull()
    })

    test('User can expand an event to see its details', async () => {
      await page.click('.event .details-btn')

      const eventDetails = await page.$('event .event-details')
      expect(eventDetails).toBeDefined()
    })

    test('User can collapse an event to hide its details', async () => {
      await page.click('.event .details-btn')
      const eventDetails = await page.$('.event .event-details')
      expect(eventDetails).toBeNull()
    })

})

describe('Filter Events By City', () => {
    let browser
      let page
      beforeAll(async () => {
        jest.setTimeout(60000)
        browser = await puppeteer.launch()
        page = await browser.newPage()
        await page.goto('http://localhost:3000/')
        await page.waitForSelector('.event')
      })

      afterAll(() => {
        browser.close()
      })

    test('When user has not searched for a city, show upcoming events from all cities', async () => {

    })

    test('User should see a list of suggestions when they search for a city', async () => {
      await page.type('.city', 'berlin', { delay: 100 });
      const suggestions = await page.$$eval('.suggestions li', li => li.length)
      expect(suggestions).toBeGreaterThan(1);
    })

    test('User can select a city from the suggested list', async () => {
      await page.waitForSelector('.suggestions li')
      await page.click('.suggestions li')
      const city = await page.$eval('.city', li => li.value)
      expect(city).toBe('Berlin, Germany')
    })


  })