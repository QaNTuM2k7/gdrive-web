# SEO go-live checklist

Built into the site already: unique titles and meta descriptions from the SEO master document, one H1 per page,
self-referencing canonicals with trailing slashes, `sitemap.xml`, `robots.txt`, Organization, LocalBusiness,
Service, FAQPage, Article and BreadcrumbList structured data, Open Graph tags, image alt text, AVIF/WebP images
and pre-rendered pages.

## Before launch

- [ ] `NEXT_PUBLIC_SITE_URL` is the final production domain (canonicals and sitemap use it)
- [ ] `NEXT_PUBLIC_ALLOW_INDEXING=true` on production only, and the image was rebuilt
- [ ] Staging still returns `Disallow: /` in `robots.txt` and `noindex` meta tags
- [ ] Real Turnstile keys for the production domain
- [ ] Client logos on `/clients/` and the home page have written permission (see CONTENT-REVIEW.md)
- [ ] Legal pages approved and `NEXT_PUBLIC_LEGAL_APPROVED=true`

## Launch day

- [ ] `https://<domain>/robots.txt` allows crawling and lists the sitemap
- [ ] `https://<domain>/sitemap.xml` lists 35+ URLs on the production domain
- [ ] Verify the domain in Google Search Console and submit the sitemap
- [ ] Add 301 redirects for any old URLs (for example on newtravel.in) to their new pages
- [ ] Update the Google Business Profile with the website URL, address and phone numbers exactly as in the footer
- [ ] Test structured data on the home page and one service page with Google's Rich Results Test
- [ ] Submit a test enquiry and confirm it reaches the sales inbox

## First month

- [ ] Check Search Console coverage for errors or excluded pages
- [ ] Watch Core Web Vitals in Search Console (targets: LCP under 2.5 s, INP under 200 ms, CLS under 0.1)
- [ ] Publish the first blog posts and link each to its service (the Posts collection has a "Related service" field)
