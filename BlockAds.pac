// Network configuration script by Gorstak, ver 11.
// Script serves to block ads using regular expressions and some specific domains, mainly for youtube ads blocking

// Variable to skip proxy
var pass = "DIRECT";

// Varible for dead end route
var blackhole = "PROXY 0.0.0.0:3421";

// Regular expression patterns for popular ad domains and subdomains
var adRegex = new RegExp("^(.+[-_.])?(ad[sxv]?|teads?|doubleclick|adservice|adtrack(er|ing)?|advertising|adnxs|admeld|advert|adx(addy|pose|pr[io])?|adform|admulti|adbutler|adblade|adroll|adgr[ao]|adinterax|admarvel|admed(ia|ix)|adperium|adplugg|adserver|adsolut|adtegr(it|ity)|adtraxx|advertising|aff(iliat(es?|ion))|akamaihd|amazon-adsystem|appnexus|appsflyer|audience2media|bingads|bidswitch|brightcove|casalemedia|contextweb|criteo|doubleclick|emxdgt|e-planning|exelator|eyewonder|flashtalking|goog(le(syndication|tagservices))|gunggo|hurra(h|ynet)|imrworldwide|insightexpressai|kontera|lifestreetmedia|lkntracker|mediaplex|ooyala|openx|pixel(e|junky)|popcash|propellerads|pubmatic|quantserve|revcontent|revenuehits|sharethrough|skimresources|taboola|traktrafficx|twitter[.]com|undertone|yieldmo|ad[-]?(banner|boost|butler|center|click|codes|ima?ge?|manager|media|serv(ant|ice|ing)|se?rve?r?|v|vert)?s?[0-9]{0,3}[.]|banner[-]?(s|ads?|exchange|server?)?[0-9]{0,3}[.]|(((cl(ic)?ks?(server?)?|count(er)?s?)[0-9]{0,3})[.])|hits?[.]|imageads?[.]|((pageads?|pop(s|ups?)?|promos?)[0-9]{0,3}[.])|servedby[0-9]{0,3}[.]|((toolbar|track(ing)?)[0-9]{0,3}[.]))", "i");

// Define blocked sites (exact domain matches)
var blockedSites = [
    "wmctjd.com",
    "instrumenttactics.com",
    "srce.unizg.hr",
    "googleadservices.com",
    "pagead2.googlesyndication.com",
    "partner.googleadservices.com",
    "static.doubleclick.net",
    "www.googleadservices.com",
    "ad.doubleclick.net",
    "youtubeads.googleapis.com",
    "pubads.g.doubleclick.net",
    "video-stats.video.google.com",
    "adservice.google.com",
    "adservice.google.co.in",
    "ads.youtube.com",
    "analytics.youtube.com",
    "www.googletagservices.com",
    "googleads.g.doubleclick.net",
    "r1---sn-a5meknlz.googlevideo.com",
    "r2---sn-a5meknlz.googlevideo.com",
    "r3---sn-a5meknlz.googlevideo.com",
    "r4---sn-a5meknlz.googlevideo.com",
    "r5---sn-a5meknlz.googlevideo.com",
    "r6---sn-a5meknlz.googlevideo.com",
    "r7---sn-a5meknlz.googlevideo.com",
    "r8---sn-a5meknlz.googlevideo.com",
    "r9---sn-a5meknlz.googlevideo.com"
    // Add more sites as needed
];

function FindProxyForURL(url, host) {
    host = host.toLowerCase();
    url = url.toLowerCase();

    // Block known YouTube ad-serving endpoints
    if (
        url.indexOf("youtube.com") !== -1 &&
        (url.indexOf("/ads") !== -1 ||
         url.indexOf("/doubleclick") !== -1 ||
         url.indexOf("adformat") !== -1 ||
         url.indexOf("/api/stats/ads") !== -1 ||
         url.indexOf("/pagead") !== -1)
    ) {
        return blackhole;
    }

    // Get the hostname part of the URL (excluding protocol and path)
    var urlHost = new URL(url).hostname.toLowerCase();

    // Block specific URLs manually
    if (blockedSites.indexOf(urlHost) !== -1) {
        return blackhole;
    }

    // Block ads using regular expressions
    if (adRegex.test(host)) {
        return blackhole;
    }

    // All else fails, just pass through
    return pass;
}

