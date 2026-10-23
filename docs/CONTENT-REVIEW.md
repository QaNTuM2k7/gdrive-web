# Content for the client to confirm before launch

The SEO master document asks for these confirmations, and some pages expand on it. Please review and sign off.

## Pages written from the brochure (no copy in the SEO document)

These follow the brochure and the SEO document's hub text closely, but the client should approve the wording:

- Solutions hub (`/solutions/`), Safety hub (`/safety/`)
- Fleet pages: Buses, Vans, SUVs, Sedans, Electric Vehicles (`/fleet/*`)
- Technology pages: Fleet Management, Driver App, Passenger App, Control Tower (`/technology/*`)
- Safety: GPS & Geofencing (`/safety/gps-geofencing/`)
- People & Excellence: Driver Training, Maintenance & Compliance (`/people-excellence/*`)
- Home page "How we work" step descriptions

## Facts to confirm

- [ ] Which technology features are live today: driver app, passenger app, control tower, QR boarding, SOS.
      Pages currently say availability depends on configuration.
- [ ] Face identification with breathalyzer and RFID/face attendance are shown as **in development** on `/safety/`.
- [ ] Service coverage and fleet availability in Chennai, Bengaluru and Hyderabad.
- [ ] Electric vehicle availability.
- [ ] Business contact names and phone numbers (footer, contact page, quote page).
- [ ] ISO 9001:2015 certificate is current.

## Assets to confirm or replace

- [ ] Written permission for every client logo shown (`src/lib/clients.ts`), and vector versions of the logos.
- [ ] The photography provided in the image pack is cleared for web use.
- [ ] Brand fonts: the brochure uses Averta and Akrobat (commercial). The site uses Archivo and Hanken Grotesk
      from Google Fonts unless web licences are purchased.

## Legal

- [ ] Privacy Policy and Terms drafts reviewed by the client's legal adviser, then set `NEXT_PUBLIC_LEGAL_APPROVED=true`.
