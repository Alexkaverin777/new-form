
const head = document.querySelector('head');
const fbPixelScripts = `
<!-- Facebook Pixel Code -->
<script type="application/javascript">

    var date = new Date();
date.setTime(date.getTime() + (5 * 24 * 60 * 60 * 1000));
if (!'{pixel}'.match('{')) {
document.cookie = "pixel={pixel}; " + "expires=" + date.toUTCString() + "";
}

var matches = document.cookie.match(new RegExp("(?:^|; )" + 'pixel' + "=([^;]*)"));
var pixel = matches ? decodeURIComponent(matches[1]) : undefined;


  !function (f, b, e, v, n, t, s) {
if (f.fbq) return;
n = f.fbq = function () {
  n.callMethod ?
      n.callMethod.apply(n, arguments) : n.queue.push(arguments)
};
if (!f._fbq) f._fbq = n;
n.push = n;
n.loaded = !0;
n.version = '2.0';
n.queue = [];
t = b.createElement(e);
t.async = !0;
t.src = v;
s = b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t, s)
}(window, document, 'script',
  'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', pixel);
fbq('track', 'PageView');
</script>


<!-- End Facebook Pixel Code -->
`;


head.insertAdjacentHTML('beforeend', fbPixelScripts);