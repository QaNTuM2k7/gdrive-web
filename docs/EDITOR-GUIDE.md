# Editor guide

Sign in at `/admin` with the account your administrator created.

## Leads (sales team)

Every enquiry from Request a Quote and Contact appears under **Leads**.

- Sort or search by company, name, email or phone.
- Change **Status** as you work a lead: New, Contacted, Qualified, Closed.
- Use **Internal notes** for follow-up details. Visitors never see them.
- **Source and consent** shows the page the visitor came from, any campaign tags, and the consent wording they accepted.

## Blog posts (editors)

1. Go to **Posts** and click **Create new**.
2. Fill in the title, a one or two sentence excerpt, a cover image and the article body.
3. The URL slug is created from the title; you can edit it before publishing.
4. Choose a **Related service** so readers can request a quote for it from the article.
5. Optional: set an SEO title and description (otherwise the title and excerpt are used).
6. Click **Save draft** to keep working, or **Publish** to put it live. Published posts appear on `/blog/` immediately.

Image tips: use landscape photos at least 1600 px wide, JPEG/PNG/WebP/AVIF under 5 MB, and always write the alt text
describing what the image shows.

## Users (administrators)

Under **Users**, administrators add people and choose their roles:

- **Admin**: everything, including users
- **Editor**: blog posts and media
- **Sales**: leads only

Accounts lock for 10 minutes after 5 wrong passwords.

## Service pages

The service, fleet, technology, safety and people pages are maintained in the code (`src/content`) so their
layout and SEO stay consistent. Send copy changes to the development team; they are published with the next release.
