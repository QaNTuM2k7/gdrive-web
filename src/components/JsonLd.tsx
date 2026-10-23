// Structured data script. "<" is escaped so CMS-provided text (blog titles, excerpts) can never close the
// script tag and inject markup.
export function JsonLd({ data }: { data: unknown }) {
  const json = JSON.stringify(data).replace(/</g, '\\u003c')
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />
}
