// src/pages/api/amazon-search.ts
import type { APIRoute } from 'astro';

type Market = 'de'|'com'|'co.uk'|'fr'|'it'|'es';
const hostFor: Record<Market,string> = {
  de: 'webservices.amazon.de',
  com: 'webservices.amazon.com',
  'co.uk': 'webservices.amazon.co.uk',
  fr: 'webservices.amazon.fr',
  it: 'webservices.amazon.it',
  es: 'webservices.amazon.es',
};
const regionFor: Record<Market,string> = {
  de: 'eu-west-1', 'co.uk': 'eu-west-1', fr: 'eu-west-1', it: 'eu-west-1', es: 'eu-west-1',
  com: 'us-east-1',
};

const TTL_MS = Number(process.env.PAAPI_CACHE_TTL_MS || 3600_000); // 1h
const CACHE = new Map<string, { t:number; data:any }>();

function mapItem(it:any) {
  const offer = it?.Offers?.Listings?.[0];
  const price = offer?.Price;
  return {
    asin: it?.ASIN,
    title: it?.ItemInfo?.Title?.DisplayValue,
    url: it?.DetailPageURL,
    image: it?.Images?.Primary?.Medium?.URL || it?.Images?.Primary?.Large?.URL,
    price: price?.DisplayAmount || null,
    amount: price?.Amount || null,
    currency: price?.Currency || null,
    isPrime: !!offer?.DeliveryInfo?.IsPrimeEligible,
  };
}

export const GET: APIRoute = async ({ url }) => {
  try {
    const q = url.searchParams.get('q')?.trim();
    if (!q) return new Response(JSON.stringify({ items: [], error: 'q required' }), { status: 400 });

    const page = Math.max(1, Math.min(10, Number(url.searchParams.get('page') || 1)));
    const market = (url.searchParams.get('market') || process.env.AMAZON_DEFAULT_MARKET || 'de') as Market;

    const accessKey = process.env.PAAPI_ACCESS_KEY;
    const secretKey = process.env.PAAPI_SECRET_KEY;
    const partnerTag = process.env.AMAZON_PARTNER_TAG;

    if (!accessKey || !secretKey || !partnerTag) {
      return new Response(JSON.stringify({ items: [], error: 'PA-API env missing' }), { status: 500 });
    }

    const host = hostFor[market] || hostFor.de;
    const region = regionFor[market] || regionFor.de;

    const key = `${market}|${page}|${q}`;
    const now = Date.now();
    const cached = CACHE.get(key);
    if (cached && (now - cached.t) < TTL_MS) {
      return new Response(JSON.stringify({ items: cached.data.items, ts: cached.data.ts, cached: true }), { headers: { 'content-type': 'application/json' } });
    }

    // Lazy import des offiziellen SDKs
    const paapi = await import('paapi5-nodejs-sdk');
    const defaultClient = (paapi as any).ApiClient.instance;
    defaultClient.accessKey = accessKey;
    defaultClient.secretKey = secretKey;
    defaultClient.host = host;
    defaultClient.region = region;
    const api = new (paapi as any).DefaultApi();

    const req = new (paapi as any).SearchItemsRequest();
    req['PartnerTag'] = partnerTag;
    req['PartnerType'] = 'Associates';
    req['Keywords'] = q;
    req['SearchIndex'] = 'All';
    req['ItemPage'] = page;
    req['Resources'] = [
      'Images.Primary.Medium',
      'Images.Primary.Large',
      'ItemInfo.Title',
      'ItemInfo.Features',
      'Offers.Listings.Price',
      'Offers.Listings.DeliveryInfo.IsPrimeEligible',
      'BrowseNodeInfo.BrowseNodes'
    ];

    const resp = await api.searchItems(req);
    const items = (resp?.SearchResult?.Items || []).map(mapItem).filter(x => x.title && x.url);

    const payload = { items, ts: new Date().toISOString() };
    CACHE.set(key, { t: now, data: payload });

    return new Response(JSON.stringify(payload), { headers: { 'content-type': 'application/json' } });
  } catch (e:any) {
    return new Response(JSON.stringify({ items: [], error: e?.message || 'paapi error' }), { status: 500 });
  }
};
