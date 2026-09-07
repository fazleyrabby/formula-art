/**
 * Real-time Discord Visitor Notification System for Math Art (formula-art)
 * Mirrors the telemetry architecture and embed aesthetics from the Spot project.
 */

const DISCORD_WEBHOOK_URL =
  'https://discord.com/api/webhooks/1546564308828299455/t6elYNgQmqXnfSEBQ2yWB0kcC2qa2Uia_3eRhsjYqrH08B0NlA8nJ_eMVkOlCNRW5siE';

export interface UserAgentInfo {
  os: string;
  browser: string;
  device: string;
}

export function parseUserAgent(ua: string): UserAgentInfo {
  let os = 'Unknown OS';
  if (/windows nt 10/i.test(ua)) os = 'Windows 10/11';
  else if (/windows nt 6\.3/i.test(ua)) os = 'Windows 8.1';
  else if (/windows nt/i.test(ua)) os = 'Windows';
  else if (/macintosh|mac os x/i.test(ua)) os = 'macOS';
  else if (/iphone/i.test(ua)) os = 'iPhone iOS';
  else if (/ipad/i.test(ua)) os = 'iPad iOS';
  else if (/android/i.test(ua)) os = 'Android';
  else if (/linux/i.test(ua)) os = 'Linux';

  let browser = 'Unknown Browser';
  if (/edg\//i.test(ua)) browser = 'Edge';
  else if (/chrome|crios/i.test(ua)) browser = 'Chrome';
  else if (/firefox|fxios/i.test(ua)) browser = 'Firefox';
  else if (/safari/i.test(ua) && !/chrome/i.test(ua)) browser = 'Safari';
  else if (/opera|opr/i.test(ua)) browser = 'Opera';

  let device = '💻 Desktop';
  if (/mobile|iphone|android.*mobile/i.test(ua)) device = '📱 Mobile';
  else if (/ipad|tablet|android(?!.*mobile)/i.test(ua)) device = '📟 Tablet';

  return { os, browser, device };
}

export function getCountryFlag(countryCode?: string | null): string {
  if (!countryCode || countryCode.length !== 2) return '🌍';
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map((char) => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}

export interface VisitorDispatchPayload {
  ip: string;
  country?: string | null;
  city?: string | null;
  region?: string | null;
  isp?: string | null;
  os: string;
  browser: string;
  device: string;
  referrer?: string | null;
  path?: string | null;
  userAgent: string;
  totalVisitors: number;
}

export async function sendDiscordVisitorAlert(input: VisitorDispatchPayload): Promise<void> {
  if (!DISCORD_WEBHOOK_URL) return;

  const flag = getCountryFlag(input.country);
  const locationParts = [input.city, input.region, input.country].filter(Boolean);
  const locationStr = locationParts.length > 0 ? locationParts.join(', ') : 'Unknown Location';

  const fields: Array<{ name: string; value: string; inline?: boolean }> = [
    { name: '📍 Location', value: `${flag} ${locationStr}`, inline: true },
    { name: '💻 Device / OS', value: `${input.device} • ${input.os}`, inline: true },
    { name: '🌐 Browser', value: input.browser, inline: true },
    { name: '🛡️ IP Address', value: `\`${input.ip}\``, inline: true },
    { name: '🔗 Referrer', value: input.referrer ? `\`${input.referrer}\`` : 'Direct / Organic', inline: true },
    { name: '🧭 Page Path', value: `\`${input.path || '/'}\``, inline: true },
  ];

  if (input.isp) {
    fields.push({ name: '🏢 ISP / Connection', value: input.isp, inline: true });
  }

  fields.push({
    name: '🔍 Full User-Agent',
    value: `\`\`\`${input.userAgent.slice(0, 240)}\`\`\``,
    inline: false,
  });

  const payload = {
    embeds: [
      {
        title: `🌐 New Visitor Landed • #${input.totalVisitors}`,
        description: `**${flag} ${locationStr}**`,
        color: 0x3b82f6, // Spot Vibrant Blue
        fields,
        footer: { text: 'Math Art Realtime Analytics • art.fazleyrabbi.xyz' },
        timestamp: new Date().toISOString(),
      },
    ],
  };

  try {
    await fetch(DISCORD_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
  } catch (err) {
    console.error('[Discord Visitor Notification Error]', err);
  }
}

/**
 * Checks throttle conditions (24h cooldown, localhost, admin flags)
 * and dispatches a rich Discord alert on unique visit.
 */
export async function handleVisitorNotification(visitorCount: number): Promise<void> {
  if (typeof window === 'undefined') return;

  const urlParams = new URLSearchParams(window.location.search);
  const isTest = urlParams.get('test_visit') === '1';

  // Respect admin / owner ignore flags unless testing
  const isIgnoredAdmin = localStorage.getItem('formula_ignore_analytics') === 'true';
  const isLocalhost = ['localhost', '127.0.0.1', '0.0.0.0'].includes(window.location.hostname);

  if ((isLocalhost || isIgnoredAdmin) && !isTest) {
    return;
  }

  // Check 24-hour notification throttle
  const LAST_VISIT_KEY = 'formula_last_notified_timestamp';
  const lastNotified = localStorage.getItem(LAST_VISIT_KEY);
  const now = Date.now();
  const ONE_DAY_MS = 24 * 60 * 60 * 1000;

  if (lastNotified && now - parseInt(lastNotified, 10) < ONE_DAY_MS && !isTest) {
    return;
  }

  // Mark notified immediately to prevent race conditions
  localStorage.setItem(LAST_VISIT_KEY, now.toString());

  const userAgent = navigator.userAgent || 'Unknown';
  const { os, browser, device } = parseUserAgent(userAgent);
  let referrer: string | null = null;
  try {
    if (document.referrer) {
      const refUrl = new URL(document.referrer);
      referrer = refUrl.hostname === window.location.hostname ? refUrl.pathname : document.referrer;
    }
  } catch (_) {
    referrer = document.referrer || null;
  }
  const path = window.location.pathname + window.location.search;

  let ip = 'Unknown';
  let country: string | null = null;
  let city: string | null = null;
  let region: string | null = null;
  let isp: string | null = null;

  try {
    // Lookup IP & geo-data from non-blocking endpoint
    const geoRes = await fetch('https://ipwho.is/', { cache: 'no-store' });
    if (geoRes.ok) {
      const geo = await geoRes.json();
      if (geo && geo.success) {
        ip = geo.ip || ip;
        country = geo.country_code || geo.country || null;
        city = geo.city || null;
        region = geo.region || null;
        if (geo.connection) {
          isp = [geo.connection.org, geo.connection.isp].filter(Boolean).join(' • ') || null;
        }
      }
    }
  } catch (_) {
    // Fallback: country.is
    try {
      const fallbackRes = await fetch('https://api.country.is', { cache: 'no-store' });
      if (fallbackRes.ok) {
        const fb = await fallbackRes.json();
        if (fb) {
          ip = fb.ip || ip;
          country = fb.country || null;
        }
      }
    } catch (__) {}
  }

  await sendDiscordVisitorAlert({
    ip,
    country,
    city,
    region,
    isp,
    os,
    browser,
    device,
    referrer,
    path,
    userAgent,
    totalVisitors: visitorCount,
  });
}
