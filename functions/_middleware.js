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

export async function onRequest(context) {
  const url = new URL(context.request.url);
  const path = url.pathname.toLowerCase();

  const target = redirects[path];
  if (target) {
    return Response.redirect(new URL(target, url.origin).toString(), 301);
  }

  return context.next();
}
