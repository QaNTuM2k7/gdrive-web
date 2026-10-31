import { expect, test } from '@playwright/test'

// SEO and health smoke test for every public page: it loads, has one H1, a title,
// a self-referencing canonical with a trailing slash, and logs no console errors.
const pages = [
  '/',
  '/about/',
  '/solutions/',
  '/solutions/employee-transportation/',
  '/solutions/corporate-car-rental/',
  '/solutions/executive-car-rental/',
  '/solutions/shuttle-services/',
  '/solutions/campus-mobility/',
  '/solutions/metro-connect/',
  '/fleet/',
  '/technology/',
  '/safety/',
  '/safety/iot-breathalyzer/',
  '/safety/gps-geofencing/',
  '/safety/ai-video-telematics/',
  '/safety/adas/',
  '/people-excellence/',
  '/people-excellence/driver-training/',
  '/people-excellence/maintenance-compliance/',
  '/clients/',
  '/blog/',
  '/contact/',
  '/request-a-quote/',
  '/privacy-policy/',
  '/terms/',
]

for (const path of pages) {
  test(`page ${path}`, async ({ page }) => {
    const errors: string[] = []
    page.on('console', (msg) => msg.type() === 'error' && errors.push(msg.text()))

    const res = await page.goto(path)
    expect(res?.status()).toBe(200)
    const title = await page.title()
    expect(title.length).toBeGreaterThan(10)
    expect(title.length).toBeLessThanOrEqual(75)
    await expect(page.locator('h1')).toHaveCount(1)
    const canonical = await page.locator('link[rel="canonical"]').getAttribute('href')
    // The root canonical is the bare origin, which is equivalent to "/".
    const normalized = path === '/' ? `${canonical?.replace(/\/$/, '')}/` : canonical
    expect(normalized).toMatch(new RegExp(`${path.replace(/\//g, '\\/')}$`))
    expect(errors).toEqual([])
  })
}

test('unknown pages return 404', async ({ page }) => {
  const res = await page.goto('/solutions/not-a-real-service/')
  expect(res?.status()).toBe(404)
})

// URLs outside every section used to fall through to Next's unbranded default 404.
test('unknown top-level pages get the branded 404', async ({ page }) => {
  const res = await page.goto('/no-such-page/')
  expect(res?.status()).toBe(404)
  await expect(page).toHaveTitle(/Page not found/)
  await expect(page.getByRole('heading', { level: 1 })).toContainText("This route doesn't exist")
})

// A backdrop-filter on the header once shrank the fixed menu panel so page content covered its links.
test('menu links are clickable over the page', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('button', { name: /menu/i }).click()
  await page.getByRole('dialog').getByRole('link', { name: 'Blog' }).click()
  await expect(page).toHaveURL(/\/blog\/$/)
  await expect(page.getByRole('dialog')).toBeHidden()
})

test('removed fleet and technology pages redirect to their parent', async ({ page }) => {
  await page.goto('/fleet/buses/')
  await expect(page).toHaveURL(/\/fleet\/$/)
  await page.goto('/technology/driver-app')
  await expect(page).toHaveURL(/\/technology\/$/)
})

test('navigation has Home and the G pin is on the home banner only', async ({ page }) => {
  await page.goto('/about/')
  await expect(page.getByRole('navigation', { name: 'Main' }).getByRole('link', { name: 'Home' })).toHaveAttribute('href', '/')
  await expect(page.locator('img[src*="pin-white"]')).toHaveCount(0)
  await page.goto('/')
  await expect(page.locator('img[src*="pin-white"]')).toHaveCount(1)
})

test('technology ecosystem diagram opens a stage on click', async ({ page }) => {
  await page.goto('/technology/')
  await page.getByRole('button', { name: /Control Tower/ }).click()
  await expect(page.locator('#ecosystem-detail')).toContainText('Stage 06 of 07')
  await expect(page.getByRole('button', { name: 'Play tour' })).toBeVisible()
})

// Turnstile is switched off for now (src/lib/leads/flags.ts).
test('contact form shows no Cloudflare widget', async ({ page }) => {
  await page.goto('/contact/')
  await expect(page.locator('iframe[src*="challenges.cloudflare.com"]')).toHaveCount(0)
})

test.describe('phone width', () => {
  test.use({ viewport: { width: 375, height: 812 } })
  for (const path of pages) {
    test(`no sideways scroll ${path}`, async ({ page }) => {
      await page.goto(path)
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)
      expect(overflow).toBeLessThanOrEqual(0)
    })
  }
})
