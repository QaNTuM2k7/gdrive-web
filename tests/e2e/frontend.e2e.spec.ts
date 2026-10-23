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
  '/fleet/buses/',
  '/fleet/vans/',
  '/fleet/suvs/',
  '/fleet/sedans/',
  '/fleet/electric-vehicles/',
  '/technology/',
  '/technology/fleet-management/',
  '/technology/gps-telematics/',
  '/technology/driver-app/',
  '/technology/passenger-app/',
  '/technology/control-tower/',
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
