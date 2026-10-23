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
    await expect(page).toHaveTitle(/G DRIVE/)
    await expect(page.locator('h1')).toHaveCount(1)
    const canonical = await page.locator('link[rel="canonical"]').getAttribute('href')
    expect(canonical).toMatch(new RegExp(`${path.replace(/\//g, '\\/')}$`))
    expect(errors).toEqual([])
  })
}

test('unknown pages return 404', async ({ page }) => {
  const res = await page.goto('/solutions/not-a-real-service/')
  expect(res?.status()).toBe(404)
})
