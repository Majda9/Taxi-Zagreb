const redirects = {
  '/hr/usluge-i-cijene': '/usluge/',
  '/hr/usluge-i-cijene/': '/usluge/',
  '/hr/kontakti-i-rezervacije': '/kontakti-i-rezervacije/',
  '/hr/kontakti-i-rezervacije/': '/kontakti-i-rezervacije/',
  '/en/contacts-booking': '/en/contact/',
  '/en/contacts-booking/': '/en/contact/',
  '/en/services-prices': '/en/services/',
  '/en/services-prices/': '/en/services/',
};

const SITEMAP = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
    <url>
        <loc>https://taxi-zagreb.com/</loc>
        <xhtml:link rel="alternate" hreflang="hr" href="https://taxi-zagreb.com/"/>
        <xhtml:link rel="alternate" hreflang="en" href="https://taxi-zagreb.com/en/"/>
        <xhtml:link rel="alternate" hreflang="x-default" href="https://taxi-zagreb.com/"/>
        <changefreq>weekly</changefreq>
        <priority>1.0</priority>
    </url>
    <url>
        <loc>https://taxi-zagreb.com/en/</loc>
        <xhtml:link rel="alternate" hreflang="hr" href="https://taxi-zagreb.com/"/>
        <xhtml:link rel="alternate" hreflang="en" href="https://taxi-zagreb.com/en/"/>
        <xhtml:link rel="alternate" hreflang="x-default" href="https://taxi-zagreb.com/"/>
        <changefreq>weekly</changefreq>
        <priority>1.0</priority>
    </url>
    <url>
        <loc>https://taxi-zagreb.com/usluge/</loc>
        <xhtml:link rel="alternate" hreflang="hr" href="https://taxi-zagreb.com/usluge/"/>
        <xhtml:link rel="alternate" hreflang="en" href="https://taxi-zagreb.com/en/services/"/>
        <xhtml:link rel="alternate" hreflang="x-default" href="https://taxi-zagreb.com/usluge/"/>
        <changefreq>monthly</changefreq>
        <priority>0.8</priority>
    </url>
    <url>
        <loc>https://taxi-zagreb.com/en/services/</loc>
        <xhtml:link rel="alternate" hreflang="hr" href="https://taxi-zagreb.com/usluge/"/>
        <xhtml:link rel="alternate" hreflang="en" href="https://taxi-zagreb.com/en/services/"/>
        <xhtml:link rel="alternate" hreflang="x-default" href="https://taxi-zagreb.com/usluge/"/>
        <changefreq>monthly</changefreq>
        <priority>0.8</priority>
    </url>
    <url>
        <loc>https://taxi-zagreb.com/o-nama/</loc>
        <xhtml:link rel="alternate" hreflang="hr" href="https://taxi-zagreb.com/o-nama/"/>
        <xhtml:link rel="alternate" hreflang="en" href="https://taxi-zagreb.com/en/about/"/>
        <xhtml:link rel="alternate" hreflang="x-default" href="https://taxi-zagreb.com/o-nama/"/>
        <changefreq>monthly</changefreq>
        <priority>0.7</priority>
    </url>
    <url>
        <loc>https://taxi-zagreb.com/en/about/</loc>
        <xhtml:link rel="alternate" hreflang="hr" href="https://taxi-zagreb.com/o-nama/"/>
        <xhtml:link rel="alternate" hreflang="en" href="https://taxi-zagreb.com/en/about/"/>
        <xhtml:link rel="alternate" hreflang="x-default" href="https://taxi-zagreb.com/o-nama/"/>
        <changefreq>monthly</changefreq>
        <priority>0.7</priority>
    </url>
    <url>
        <loc>https://taxi-zagreb.com/kontakti-i-rezervacije/</loc>
        <xhtml:link rel="alternate" hreflang="hr" href="https://taxi-zagreb.com/kontakti-i-rezervacije/"/>
        <xhtml:link rel="alternate" hreflang="en" href="https://taxi-zagreb.com/en/contact/"/>
        <xhtml:link rel="alternate" hreflang="x-default" href="https://taxi-zagreb.com/kontakti-i-rezervacije/"/>
        <changefreq>monthly</changefreq>
        <priority>0.9</priority>
    </url>
    <url>
        <loc>https://taxi-zagreb.com/en/contact/</loc>
        <xhtml:link rel="alternate" hreflang="hr" href="https://taxi-zagreb.com/kontakti-i-rezervacije/"/>
        <xhtml:link rel="alternate" hreflang="en" href="https://taxi-zagreb.com/en/contact/"/>
        <xhtml:link rel="alternate" hreflang="x-default" href="https://taxi-zagreb.com/kontakti-i-rezervacije/"/>
        <changefreq>monthly</changefreq>
        <priority>0.9</priority>
    </url>
</urlset>`;

export async function onRequest(context) {
  const url = new URL(context.request.url);
  const path = url.pathname.toLowerCase();

  // Serve sitemap.xml directly
  if (path === '/sitemap.xml') {
    return new Response(SITEMAP, {
      headers: { 'Content-Type': 'application/xml; charset=utf-8' }
    });
  }

  const target = redirects[path];
  if (target) {
    return Response.redirect(new URL(target, url.origin).toString(), 301);
  }

  return context.next();
}
