const { Builder, Capabilities, By } = require("selenium-webdriver")
require("chromedriver")
const driver = new Builder().withCapabilities(Capabilities.chrome()).build()

const deleteMovie = async (driver) => {
    await driver.findElement(By.xpath("//input")).sendKeys('Princess Mononoke')

    await driver.findElement(By.xpath("//button")).click()

    const movieCount = await driver.findElements(By.xpath("//ul/li")).then(elements => {
        return elements.length
    })

    await driver.findElement(By.id("PrincessMononoke")).click()

    const newMovieCount = await driver.findElements(By.xpath("//ul/li")).then(elements => {
        return elements.length
    })

    expect(newMovieCount).toBe(movieCount-1)
}

const crossOffMovie = async (driver) => {
    await driver.findElement(By.xpath("//input")).sendKeys('Princess Bride')

    await driver.findElement(By.xpath("//button")).click()

    await driver.findElement(By.xpath("//li/span")).click()

    const isCrossed = await driver.findElement(By.className("checked")).isDisplayed()

    expect(isCrossed).toBeTruthy()

    await driver.findElement(By.id("PrincessBride")).click()
}

const revealMessage = async (driver) => {
    await driver.findElement(By.xpath("//input")).sendKeys('The Hobbit')

    await driver.findElement(By.xpath("//button")).click()

    await driver.findElement(By.xpath("//li/span")).click()

    const isDisplayed = await driver.findElement(By.id("message")).isDisplayed()

    expect(isDisplayed).toBe(true)

    await driver.findElement(By.id("TheHobbit")).click()
}

beforeAll(async () => {
    await driver.get("http://127.0.0.1:5501/movieList/index.html")
})

afterAll(async () => {
    await driver.quit()
})

test("deletes a movie", async () => {
    await deleteMovie(driver)
})

test("crosses off a movie", async () => {
    await crossOffMovie(driver)
})

test("reveals message", async () => {
    await revealMessage(driver)
})