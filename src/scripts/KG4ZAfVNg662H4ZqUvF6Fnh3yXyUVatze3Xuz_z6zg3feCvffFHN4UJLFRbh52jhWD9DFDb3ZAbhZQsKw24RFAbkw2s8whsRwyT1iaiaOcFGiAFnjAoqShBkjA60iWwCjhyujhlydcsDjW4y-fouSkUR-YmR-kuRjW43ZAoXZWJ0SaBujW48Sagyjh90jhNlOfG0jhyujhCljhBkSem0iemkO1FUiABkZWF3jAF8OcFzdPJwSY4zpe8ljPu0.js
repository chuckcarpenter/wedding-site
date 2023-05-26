/*
 * For font license information, see the CSS file loaded by this JavaScript.
 */
if (!window.Typekit) window.Typekit = {};
window.Typekit.config = {
  a: "646866",
  f: "//use.typekit.net/c/94a09b/1w;lust-script,2,Zvp:V:n4;proxima-nova,2,cdc:V:i1,fsR:V:i3,cdh:V:i4,cdf:V:i6,cdX:V:i7,cdZ:V:i8,cdV:V:i9,cdb:V:n1,cdj:V:n3,cdg:V:n4,gGh:V:n6,cdW:V:n7,cdY:V:n8,cdT:V:n9/{format}{/extras*}?3bb2a6e53c9684ffdc9a9bf3195b2a62d1c54ed00fc5de48ce5f6312169168dee5a4d342293de59d9fc6ed3b695af25d38d16c70a5fe9ae595d0fce32b314adffa73cd884e02392b94532db3fe54eba40cdcb3389d44620350116b84a2e4aeafc6c4ae847458e1708d594c6cadb713051b9fabd79056fad80e2c2949814f8617b4c41045c577c57af02627fa7512cfbd6a9974889eb8a9a533",
  fi: [
    171, 5474, 175, 173, 172, 139, 169, 5475, 137, 176, 174, 140, 170, 138,
    22354,
  ],
  fn: [
    "lust-script",
    ["n4"],
    "proxima-nova",
    [
      "i1",
      "i3",
      "i4",
      "i6",
      "i7",
      "i8",
      "i9",
      "n1",
      "n3",
      "n4",
      "n6",
      "n7",
      "n8",
      "n9",
    ],
  ],
  ht: "tk",
  js: "1.12.8",
  kt: "646866_53740ed6e4b02c5d204e3dc2",
  p: "//p.typekit.net/p.gif?s=2&k=646866_53740ed6e4b02c5d204e3dc2&ht=tk&h={host}&f=171.5474.175.173.172.139.169.5475.137.176.174.140.170.138.22354&a=646866&_={_}",
  ps: 2,
};
/*{"k":"1.12.8","auto_updating":true}*/
(function (window, document, undefined) {
  function aa(a, b, c) {
    return a.call.apply(a.bind, arguments);
  }
  function ba(a, b, c) {
    if (!a) throw Error();
    if (2 < arguments.length) {
      var d = Array.prototype.slice.call(arguments, 2);
      return function () {
        var c = Array.prototype.slice.call(arguments);
        Array.prototype.unshift.apply(c, d);
        return a.apply(b, c);
      };
    }
    return function () {
      return a.apply(b, arguments);
    };
  }
  function h(a, b, c) {
    h =
      Function.prototype.bind &&
      -1 != Function.prototype.bind.toString().indexOf("native code")
        ? aa
        : ba;
    return h.apply(null, arguments);
  }
  var ca =
    Date.now ||
    function () {
      return +new Date();
    };
  function da(a, b) {
    this.pa = a;
    this.Y = b || a;
    this.G = this.Y.document;
  }
  da.prototype.createElement = function (a, b, c) {
    a = this.G.createElement(a);
    if (b)
      for (var d in b)
        b.hasOwnProperty(d) &&
          ("style" == d ? (a.style.cssText = b[d]) : a.setAttribute(d, b[d]));
    c && a.appendChild(this.G.createTextNode(c));
    return a;
  };
  function ea(a, b, c) {
    a = a.G.getElementsByTagName(b)[0];
    a || (a = document.documentElement);
    a && a.lastChild && a.insertBefore(c, a.lastChild);
  }
  function fa(a, b) {
    function c() {
      a.G.body ? b() : setTimeout(c, 0);
    }
    c();
  }
  function l(a, b, c) {
    b = b || [];
    c = c || [];
    for (var d = a.className.split(/\s+/), e = 0; e < b.length; e += 1) {
      for (var f = !1, g = 0; g < d.length; g += 1)
        if (b[e] === d[g]) {
          f = !0;
          break;
        }
      f || d.push(b[e]);
    }
    b = [];
    for (e = 0; e < d.length; e += 1) {
      f = !1;
      for (g = 0; g < c.length; g += 1)
        if (d[e] === c[g]) {
          f = !0;
          break;
        }
      f || b.push(d[e]);
    }
    a.className = b
      .join(" ")
      .replace(/\s+/g, " ")
      .replace(/^\s+|\s+$/, "");
  }
  function ga(a, b) {
    for (var c = a.className.split(/\s+/), d = 0, e = c.length; d < e; d++)
      if (c[d] == b) return !0;
    return !1;
  }
  function ha(a) {
    if ("string" === typeof a.ta) return a.ta;
    var b = a.Y.location.protocol;
    "about:" == b && (b = a.pa.location.protocol);
    return "https:" == b ? "https:" : "http:";
  }
  function ia(a, b) {
    /^http(s)?:$/.test(b) && (a.ta = b);
  }
  function ja(a) {
    return a.Y.location.hostname || a.pa.location.hostname;
  }
  function ka(a, b, c, d) {
    function e(a) {
      for (var c = 0; c < g.length; c++)
        if (g[c].href && -1 !== g[c].href.indexOf(b)) {
          a();
          return;
        }
      setTimeout(function () {
        e(a);
      }, 0);
    }
    var f = a.createElement("link", {
        rel: "stylesheet",
        href: b,
        media: d ? "only x" : "all",
      }),
      g = a.G.styleSheets,
      k = !1;
    f.onload = function () {
      k || ((k = !0), c && c(null));
    };
    f.onerror = function () {
      k || ((k = !0), c && c(Error("Stylesheet failed to load")));
    };
    ea(a, "head", f);
    d &&
      e(function () {
        f.media = "all";
      });
  }
  function la(a, b, c) {
    var d = a.G.getElementsByTagName("head")[0];
    if (d) {
      var e = a.createElement("script", { src: b }),
        f = !1;
      e.onload = e.onreadystatechange = function () {
        f ||
          (this.readyState &&
            "loaded" != this.readyState &&
            "complete" != this.readyState) ||
          ((f = !0),
          c && c(null),
          (e.onload = e.onreadystatechange = null),
          "HEAD" == e.parentNode.tagName && d.removeChild(e));
      };
      d.appendChild(e);
      window.setTimeout(function () {
        f || ((f = !0), c && c(Error("Script load timeout")));
      }, 5e3);
    }
  }
  function m(a) {
    this.wa = a;
  }
  function n(a, b, c, d) {
    this.m = null != a ? a : null;
    this.r = null != b ? b : null;
    this.Q = null != c ? c : null;
    this.h = null != d ? d : null;
  }
  var ma = /^([0-9]+)(?:[\._-]([0-9]+))?(?:[\._-]([0-9]+))?(?:[\._+-]?(.*))?$/;
  n.prototype.compare = function (a) {
    return this.m > a.m ||
      (this.m === a.m && this.r > a.r) ||
      (this.m === a.m && this.r === a.r && this.Q > a.Q)
      ? 1
      : this.m < a.m ||
        (this.m === a.m && this.r < a.r) ||
        (this.m === a.m && this.r === a.r && this.Q < a.Q)
      ? -1
      : 0;
  };
  function p(a, b) {
    return -1 === a.compare(b);
  }
  function r(a, b) {
    return 0 === a.compare(b) || 1 === a.compare(b);
  }
  function s(a, b) {
    return 0 === a.compare(b);
  }
  n.prototype.toString = function () {
    return [this.m, this.r || "", this.Q || "", this.h || ""].join("");
  };
  function u(a) {
    a = ma.exec(a);
    var b = null,
      c = null,
      d = null,
      e = null;
    a &&
      (null !== a[1] && a[1] && (b = parseInt(a[1], 10)),
      null !== a[2] && a[2] && (c = parseInt(a[2], 10)),
      null !== a[3] && a[3] && (d = parseInt(a[3], 10)),
      null !== a[4] &&
        a[4] &&
        (e = /^[0-9]+$/.test(a[4]) ? parseInt(a[4], 10) : a[4]));
    return new n(b, c, d, e);
  }
  function y(a, b, c, d, e, f, g, k) {
    this.Z = a;
    this.A = b;
    this.M = c;
    this.U = d;
    this.n = e;
    this.g = f;
    this.da = g;
    this.F = k;
  }
  y.prototype.getName = function () {
    return this.Z;
  };
  function na(a, b) {
    this.b = a;
    this.T = b;
  }
  var oa = new y(
    "Unknown",
    new n(),
    "Unknown",
    new n(),
    "Unknown",
    new n(),
    void 0,
    new m(!1)
  );
  na.prototype.parse = function () {
    var a;
    if (-1 != this.b.indexOf("MSIE") || -1 != this.b.indexOf("Trident/")) {
      a = z(this);
      var b = u(A(this)),
        c = null,
        d = null,
        e = null,
        e = B(this.b, /Trident\/([\d\w\.]+)/, 1),
        f = C(this.T),
        c =
          -1 != this.b.indexOf("MSIE")
            ? u(B(this.b, /MSIE ([\d\w\.]+)/, 1))
            : u(B(this.b, /rv:([\d\w\.]+)/, 1));
      "" != e
        ? ((d = "Trident"), (e = u(e)))
        : ((d = "Unknown"), (e = new n()));
      a = new y("MSIE", c, d, e, a, b, f, new m(!1));
    } else if (-1 != this.b.indexOf("Opera"))
      a: if (
        ((a = "Unknown"),
        (b = u(B(this.b, /Presto\/([\d\w\.]+)/, 1))),
        (c = u(A(this))),
        (d = C(this.T)),
        null !== b.m
          ? (a = "Presto")
          : (-1 != this.b.indexOf("Gecko") && (a = "Gecko"),
            (b = u(B(this.b, /rv:([^\)]+)/, 1)))),
        -1 != this.b.indexOf("Opera Mini/"))
      )
        (f = u(B(this.b, /Opera Mini\/([\d\.]+)/, 1))),
          (a = new y("OperaMini", f, a, b, z(this), c, d, new m(!1)));
      else {
        if (
          -1 != this.b.indexOf("Version/") &&
          ((f = u(B(this.b, /Version\/([\d\.]+)/, 1))), null !== f.m)
        ) {
          a = new y("Opera", f, a, b, z(this), c, d, new m(!1));
          break a;
        }
        f = u(B(this.b, /Opera[\/ ]([\d\.]+)/, 1));
        a =
          null !== f.m
            ? new y("Opera", f, a, b, z(this), c, d, new m(!1))
            : new y("Opera", new n(), a, b, z(this), c, d, new m(!1));
      }
    else
      /OPR\/[\d.]+/.test(this.b)
        ? (a = pa(this))
        : /AppleWeb(K|k)it/.test(this.b)
        ? (a = pa(this))
        : -1 != this.b.indexOf("Gecko")
        ? ((a = "Unknown"),
          (b = new n()),
          (c = u(A(this))),
          -1 != this.b.indexOf("Firefox")
            ? ((a = "Firefox"), (b = u(B(this.b, /Firefox\/([\d\w\.]+)/, 1))))
            : -1 != this.b.indexOf("Mozilla") && (a = "Mozilla"),
          (d = u(B(this.b, /rv:([^\)]+)/, 1))),
          (a = new y(a, b, "Gecko", d, z(this), c, C(this.T), new m(!1))))
        : (a = oa);
    return a;
  };
  function z(a) {
    var b = B(
      a.b,
      /(iPod|iPad|iPhone|Android|Windows Phone|BB\d{2}|BlackBerry)/,
      1
    );
    if ("" != b) return /BB\d{2}/.test(b) && (b = "BlackBerry"), b;
    a = B(
      a.b,
      /(Linux|Mac_PowerPC|Macintosh|Windows|CrOS|PlayStation|CrKey)/,
      1
    );
    return "" != a
      ? ("Mac_PowerPC" == a
          ? (a = "Macintosh")
          : "PlayStation" == a && (a = "Linux"),
        a)
      : "Unknown";
  }
  function A(a) {
    var b = B(a.b, /(OS X|Windows NT|Android) ([^;)]+)/, 2);
    if (
      b ||
      (b = B(a.b, /Windows Phone( OS)? ([^;)]+)/, 2)) ||
      (b = B(a.b, /(iPhone )?OS ([\d_]+)/, 2))
    )
      return b;
    if ((b = B(a.b, /(?:Linux|CrOS|CrKey) ([^;)]+)/, 1)))
      for (var b = b.split(/\s/), c = 0; c < b.length; c += 1)
        if (/^[\d\._]+$/.test(b[c])) return b[c];
    return (a = B(a.b, /(BB\d{2}|BlackBerry).*?Version\/([^\s]*)/, 2))
      ? a
      : "Unknown";
  }
  function pa(a) {
    var b = z(a),
      c = u(A(a)),
      d = u(B(a.b, /AppleWeb(?:K|k)it\/([\d\.\+]+)/, 1)),
      e = "Unknown",
      f = new n(),
      f = "Unknown";
    /OPR\/[\d.]+/.test(a.b)
      ? (e = "Opera")
      : -1 != a.b.indexOf("Chrome") ||
        -1 != a.b.indexOf("CrMo") ||
        -1 != a.b.indexOf("CriOS")
      ? (e = "Chrome")
      : /Silk\/\d/.test(a.b)
      ? (e = "Silk")
      : "BlackBerry" == b || "Android" == b
      ? (e = "BuiltinBrowser")
      : -1 != a.b.indexOf("PhantomJS")
      ? (e = "PhantomJS")
      : -1 != a.b.indexOf("Safari")
      ? (e = "Safari")
      : -1 != a.b.indexOf("AdobeAIR")
      ? (e = "AdobeAIR")
      : -1 != a.b.indexOf("PlayStation") && (e = "BuiltinBrowser");
    "BuiltinBrowser" == e
      ? (f = "Unknown")
      : "Silk" == e
      ? (f = B(a.b, /Silk\/([\d\._]+)/, 1))
      : "Chrome" == e
      ? (f = B(a.b, /(Chrome|CrMo|CriOS)\/([\d\.]+)/, 2))
      : -1 != a.b.indexOf("Version/")
      ? (f = B(a.b, /Version\/([\d\.\w]+)/, 1))
      : "AdobeAIR" == e
      ? (f = B(a.b, /AdobeAIR\/([\d\.]+)/, 1))
      : "Opera" == e
      ? (f = B(a.b, /OPR\/([\d.]+)/, 1))
      : "PhantomJS" == e && (f = B(a.b, /PhantomJS\/([\d.]+)/, 1));
    f = u(f);
    return new y(
      e,
      f,
      "AppleWebKit",
      d,
      b,
      c,
      C(a.T),
      new m(536 > d.m || (536 == d.m && 11 > d.r))
    );
  }
  function B(a, b, c) {
    return (a = a.match(b)) && a[c] ? a[c] : "";
  }
  function C(a) {
    if (a.documentMode) return a.documentMode;
  }
  function qa(a) {
    this.Ga = a || "-";
  }
  qa.prototype.h = function (a) {
    for (var b = [], c = 0; c < arguments.length; c++)
      b.push(arguments[c].replace(/[\W_]+/g, "").toLowerCase());
    return b.join(this.Ga);
  };
  function ra(a, b) {
    this.e = a;
    this.v = a.Y.document.documentElement;
    this.aa = b;
    this.p = "wf";
    this.o = new qa("-");
    this.Ba = !1 !== b.events;
    this.J = !1 !== b.classes;
  }
  function sa(a) {
    if (a.J) {
      var b = ga(a.v, a.o.h(a.p, "active")),
        c = [],
        d = [a.o.h(a.p, "loading")];
      b || c.push(a.o.h(a.p, "inactive"));
      l(a.v, c, d);
    }
    D(a, "inactive");
  }
  function D(a, b, c) {
    if (a.Ba && a.aa[b])
      if (c) a.aa[b](c.getName(), E(c));
      else a.aa[b]();
  }
  function F(a, b) {
    this.Z = a;
    this.fa = 4;
    this.$ = "n";
    var c = (b || "n4").match(/^([nio])([1-9])$/i);
    c && ((this.$ = c[1]), (this.fa = parseInt(c[2], 10)));
  }
  F.prototype.getName = function () {
    return this.Z;
  };
  function E(a) {
    return a.$ + a.fa;
  }
  function G(a, b) {
    this.e = a;
    this.P = b;
    this.q = this.e.createElement("span", { "aria-hidden": "true" }, this.P);
  }
  function ta(a) {
    ea(a.e, "body", a.q);
  }
  function H(a) {
    var b;
    b = [];
    for (var c = a.Z.split(/,\s*/), d = 0; d < c.length; d++) {
      var e = c[d].replace(/['"]/g, "");
      -1 == e.indexOf(" ") ? b.push(e) : b.push("'" + e + "'");
    }
    b = b.join(",");
    c = "normal";
    "o" === a.$ ? (c = "oblique") : "i" === a.$ && (c = "italic");
    return (
      "display:block;position:absolute;top:-9999px;left:-9999px;font-size:300px;width:auto;height:auto;line-height:normal;margin:0;padding:0;font-variant:normal;white-space:nowrap;font-family:" +
      b +
      ";" +
      ("font-style:" + c + ";font-weight:" + (a.fa + "00") + ";")
    );
  }
  G.prototype.remove = function () {
    var a = this.q;
    a.parentNode && a.parentNode.removeChild(a);
  };
  function ua(a, b, c, d, e, f, g, k) {
    this.ga = a;
    this.Fa = b;
    this.e = c;
    this.u = d;
    this.F = e;
    this.P = k || "BESbswy";
    this.D = {};
    this.ea = f || 3e3;
    this.qa = g || null;
    this.O = this.C = this.B = null;
    this.B = new G(this.e, this.P);
    this.C = new G(this.e, this.P);
    this.O = new G(this.e, this.P);
    a = new F("serif", E(this.u));
    a = H(a);
    this.B.q.style.cssText = a;
    a = new F("sans-serif", E(this.u));
    a = H(a);
    this.C.q.style.cssText = a;
    a = new F("monospace", E(this.u));
    a = H(a);
    this.O.q.style.cssText = a;
    ta(this.B);
    ta(this.C);
    ta(this.O);
    this.D.serif = this.B.q.offsetWidth;
    this.D["sans-serif"] = this.C.q.offsetWidth;
    this.D.monospace = this.O.q.offsetWidth;
  }
  var I = { Ta: "serif", Sa: "sans-serif", Pa: "monospace" };
  ua.prototype.start = function () {
    this.Ka = ca();
    var a = new F(this.u.getName() + ",serif", E(this.u)),
      a = H(a);
    this.B.q.style.cssText = a;
    a = new F(this.u.getName() + ",sans-serif", E(this.u));
    a = H(a);
    this.C.q.style.cssText = a;
    va(this);
  };
  function wa(a, b, c) {
    for (var d in I)
      if (I.hasOwnProperty(d) && b === a.D[I[d]] && c === a.D[I[d]]) return !0;
    return !1;
  }
  function va(a) {
    var b = a.B.q.offsetWidth,
      c = a.C.q.offsetWidth;
    (b === a.D.serif && c === a.D["sans-serif"]) || (a.F.wa && wa(a, b, c))
      ? ca() - a.Ka >= a.ea
        ? a.F.wa &&
          wa(a, b, c) &&
          (null === a.qa || a.qa.hasOwnProperty(a.u.getName()))
          ? xa(a, a.ga)
          : xa(a, a.Fa)
        : ya(a)
      : xa(a, a.ga);
  }
  function ya(a) {
    setTimeout(
      h(function () {
        va(this);
      }, a),
      50
    );
  }
  function xa(a, b) {
    a.B.remove();
    a.C.remove();
    a.O.remove();
    b(a.u);
  }
  function za(a, b, c, d) {
    this.e = b;
    this.H = c;
    this.ca = 0;
    this.va = this.oa = !1;
    this.ea = d;
    this.F = a.F;
  }
  za.prototype.Ca = function (a) {
    var b = this.H;
    b.J &&
      l(
        b.v,
        [b.o.h(b.p, a.getName(), E(a).toString(), "active")],
        [
          b.o.h(b.p, a.getName(), E(a).toString(), "loading"),
          b.o.h(b.p, a.getName(), E(a).toString(), "inactive"),
        ]
      );
    D(b, "fontactive", a);
    this.va = !0;
    Aa(this);
  };
  za.prototype.Da = function (a) {
    var b = this.H;
    if (b.J) {
      var c = ga(b.v, b.o.h(b.p, a.getName(), E(a).toString(), "active")),
        d = [],
        e = [b.o.h(b.p, a.getName(), E(a).toString(), "loading")];
      c || d.push(b.o.h(b.p, a.getName(), E(a).toString(), "inactive"));
      l(b.v, d, e);
    }
    D(b, "fontinactive", a);
    Aa(this);
  };
  function Aa(a) {
    0 == --a.ca &&
      a.oa &&
      (a.va
        ? ((a = a.H),
          a.J &&
            l(
              a.v,
              [a.o.h(a.p, "active")],
              [a.o.h(a.p, "loading"), a.o.h(a.p, "inactive")]
            ),
          D(a, "active"))
        : sa(a.H));
  }
  function J() {
    this.K = this.R = -1;
  }
  J.prototype.now = function () {
    return new Date().getTime();
  };
  J.prototype.start = function () {
    this.R = this.now();
    this.K = -1;
  };
  J.prototype.stop = function () {
    this.K = this.now();
  };
  function Ba() {
    var a = [{ name: "font-family", value: K.c[L + 1] }];
    this.Ia = [K.c[L]];
    this.ja = a;
  }
  function Ca(a) {
    for (var b = a.Ia.join(","), c = [], d = 0; d < a.ja.length; d++) {
      var e = a.ja[d];
      c.push(e.name + ":" + e.value + ";");
    }
    return b + "{" + c.join("") + "}";
  }
  function Da(a) {
    this.e = a;
  }
  Da.prototype.toString = function () {
    return encodeURIComponent(ja(this.e));
  };
  function Ea(a, b) {
    this.s = a;
    this.t = b;
  }
  Ea.prototype.toString = function () {
    for (var a = [], b = 0; b < this.t.length; b++)
      for (
        var c = this.t[b], d = c.I(), c = c.I(this.s), e = 0;
        e < d.length;
        e++
      ) {
        var f;
        a: {
          for (f = 0; f < c.length; f++)
            if (d[e] === c[f]) {
              f = !0;
              break a;
            }
          f = !1;
        }
        a.push(f ? 1 : 0);
      }
    a = a.join("");
    a = a.replace(/^0+/, "");
    b = [];
    for (d = a.length; 0 < d; d -= 4)
      b.unshift(parseInt(a.slice(0 > d - 4 ? 0 : d - 4, d), 2).toString(16));
    return b.join("");
  };
  function N(a) {
    this.Ma = a;
  }
  N.prototype.h = function (a, b) {
    var c = b || {},
      d = this.Ma.replace(/\{\/?([^*}]*)(\*?)\}/g, function (a, b, d) {
        return d && c[b] ? "/" + c[b].join("/") : c[b] || "";
      });
    d.match(/^\/\//) && (d = (a ? "https:" : "http:") + d);
    return d.replace(/\/*\?*($|\?)/, "$1");
  };
  function Fa(a, b) {
    for (var c = [], d = 0; d < b.length; d++) c.push(b[d].toString());
    return { format: a, extras: c };
  }
  function Ga(a, b) {
    this.N = a;
    this.W = b;
    this.la = {};
    this.ka = {};
  }
  Ga.prototype.I = function (a) {
    return a ? (this.la[a] || this.W).slice(0) : this.W.slice(0);
  };
  function Ha(a, b, c) {
    for (
      var d = [],
        e = a.N.split(",")[0].replace(/"|'/g, ""),
        f = a.I(),
        g,
        k = [],
        v = {},
        x = 0;
      x < f.length;
      x++
    )
      (g = f[x]), 0 < g.length && !v[g] && ((v[g] = !0), k.push(g));
    c = c.ua ? c.ua(e, k, d) : k;
    a.la[b] = c;
    a.ka[b] = d;
  }
  function Ia(a, b) {
    for (var c = a.I(b), d = a.ka[b] || [], e = [], f = 0; f < c.length; f++)
      e.push(new F(a.N, c[f]));
    for (f = 0; f < d.length; f++)
      if (((c = d[f].N), c !== a.N))
        for (var g = d[f].I(), k = 0; k < g.length; k++) e.push(new F(c, g[k]));
    return e;
  }
  function Ja(a, b) {
    this.N = a;
    this.W = b;
  }
  Ja.prototype.I = function () {
    return this.W;
  };
  function Ka(a, b, c, d, e, f, g) {
    this.Ja = a;
    this.Ea = b;
    this.V = c || [];
    this.ya = d || null;
    this.La = e || null;
    this.version = f || null;
    this.Aa = g || null;
  }
  Ka.prototype.send = function (a, b, c) {
    var d = new N(
        "//p.typekit.net/p.gif?s={service}&k={token}&app={app}&ht={hosting}&h={host}&f={variations}&a={account}&sl={stylesheetLoadTime}&fl={fontLoadTime}&js={version}&_={_}"
      ),
      e = encodeURIComponent(
        (window.__adobewebfontsappname__ || this.Aa || "")
          .toString()
          .substr(0, 20)
      ),
      f = encodeURIComponent(ja(a)),
      g = [],
      k = [];
    window.Typekit.fonts || (window.Typekit.fonts = []);
    for (var k = window.Typekit.fonts, v = 0; v < this.V.length; v++) {
      for (var x = !1, w = 0; w < k.length; w++)
        if (this.V[v] === k[w]) {
          x = !0;
          break;
        }
      x || (g.push(this.V[v]), k.push(this.V[v]));
    }
    g.length &&
      Ma(
        d.h("https:" === ha(a), {
          service: this.Ja,
          token: this.La,
          app: e,
          hosting: this.Ea,
          host: f,
          variations: g.join("."),
          account: this.ya,
          stylesheetLoadTime: b,
          fontLoadTime: c,
          version: this.version,
          _: (+new Date()).toString(),
        })
      );
  };
  function Ma(a) {
    var b = new Image(1, 1),
      c = !1;
    b.src = a;
    b.onload = function () {
      c = !0;
      b.onload = null;
    };
    setTimeout(function () {
      c || ((b.src = "about:blank"), (b.onload = null));
    }, 3e3);
  }
  function Na() {
    this.ha = this.xa = this.L = this.X = this.na = !0;
  }
  function O(a) {
    return "Windows" === a.n;
  }
  function P(a) {
    return (
      (O(a) && s(a.g, new n(5, 1))) ||
      (O(a) && s(a.g, new n(5, 2))) ||
      (O(a) && s(a.g, new n(6, 0))) ||
      (O(a) && r(a.g, new n(6, 1)))
    );
  }
  function Q(a) {
    return "Macintosh" === a.n && (r(a.g, new n(10, 4)) || null === a.g.m);
  }
  function Oa(a, b) {
    return b.na && ("iPhone" === a.n || "iPod" === a.n);
  }
  function Pa(a, b) {
    return Oa(a, b) && r(a.g, new n(4, 2)) && p(a.g, new n(5));
  }
  function Qa(a, b) {
    return b.X && "iPad" === a.n && r(a.g, new n(4, 2)) && p(a.g, new n(5));
  }
  function R(a, b) {
    return b.L && "Android" === a.n;
  }
  function Ra(a, b) {
    return R(a, b) && r(a.g, new n(2, 2)) && p(a.g, new n(3, 1));
  }
  function Sa(a, b) {
    return R(a, b) && r(a.g, new n(3, 1)) && p(a.g, new n(4, 1));
  }
  function T(a) {
    return "Linux" === a.n || "Ubuntu" === a.n;
  }
  function Ta(a) {
    return (
      ("Safari" === a.getName() && "AppleWebKit" === a.M) ||
      ("Unknown" === a.getName() &&
        "AppleWebKit" === a.M &&
        ("iPhone" === a.n || "iPad" === a.n || "iPod" === a.n))
    );
  }
  function Ua(a) {
    return "BuiltinBrowser" === a.getName();
  }
  function Va(a) {
    this.ua = a;
  }
  function Wa(a, b) {
    return b;
  }
  var U = { Qa: "a", Ua: "d", Oa: "i", Ra: "j", Na: "k", NONE: "x" },
    V = {
      a: function (a, b) {
        return (
          ("Safari" === a.getName() &&
            "AppleWebKit" === a.M &&
            r(a.U, new n(525, 13)) &&
            p(a.U, new n(534, 50)) &&
            (P(a) || Q(a))) ||
          (Ua(a) && (Ra(a, b) || (R(a, b) && r(a.g, new n(4, 1))))) ||
          (b.L &&
            "Silk" === a.getName() &&
            p(a.A, new n(2)) &&
            (Ra(a, b) || Q)) ||
          (b.L &&
            "Silk" === a.getName() &&
            r(a.A, new n(2)) &&
            R(a, b) &&
            r(a.g, new n(4, 1))) ||
          (Ta(a) && (Qa(a, b) || Pa(a, b))) ||
          ("Chrome" === a.getName() &&
            r(a.A, new n(6)) &&
            (Qa(a, b) || Pa(a, b))) ||
          ("AdobeAIR" === a.getName() &&
            r(a.A, new n(2, 5)) &&
            ((O(a) && null === a.g.m) || T(a) || Q(a)))
        );
      },
      d: function (a, b) {
        return (
          ("Chrome" === a.getName() &&
            r(a.A, new n(6)) &&
            (P(a) ||
              T(a) ||
              Q(a) ||
              R(a, b) ||
              "CrOS" === a.n ||
              "CrKey" === a.n ||
              (b.X && "iPad" === a.n && r(a.g, new n(5))) ||
              (Oa(a, b) && r(a.g, new n(5))))) ||
          ("Gecko" === a.M &&
            1 === a.U.compare(new n(1, 9, 1)) &&
            (P(a) || T(a) || Q(a) || R(a, b))) ||
          ("Safari" === a.getName() &&
            "AppleWebKit" === a.M &&
            r(a.U, new n(534, 50)) &&
            (P(a) || Q(a))) ||
          (Ta(a) &&
            ((b.X && "iPad" === a.n && r(a.g, new n(5))) ||
              (Oa(a, b) && r(a.g, new n(5))))) ||
          ("Opera" === a.getName() &&
            r(a.A, new n(11, 10)) &&
            (P(a) || T(a) || Q(a) || R(a, b))) ||
          ("MSIE" === a.getName() &&
            9 <= a.da &&
            ((O(a) && r(a.g, new n(6, 1))) || (O(a) && s(a.g, new n(6, 0))))) ||
          ("MSIE" === a.getName() &&
            b.xa &&
            "Windows Phone" === a.n &&
            r(a.g, new n(8))) ||
          (Ua(a) &&
            ((b.ha && "BlackBerry" === a.n && r(a.g, new n(10))) || T(a)))
        );
      },
      j: function (a, b) {
        return (
          (Ua(a) && Sa(a, b)) ||
          (b.L &&
            "Silk" === a.getName() &&
            r(a.A, new n(2)) &&
            (Sa(a, b) || T(a)))
        );
      },
      i: function (a) {
        return (
          "MSIE" === a.getName() &&
          r(a.A, new n(6, 0)) &&
          (void 0 === a.da || 9 > a.da) &&
          P(a)
        );
      },
      x: function () {
        return !1;
      },
    },
    Xa = {};
  Xa.i = new Va(function (a, b, c) {
    for (var d = 0; d < b.length; d += 1) {
      var e = b[d],
        f;
      f = e;
      f = a.replace(/(-1|-2)$/, "").slice(0, 28) + "-" + f;
      c.push(new Ja(f, [e]));
    }
    a = {};
    for (e = 0; e < b.length; e++)
      (c = b[e]), (d = c.charAt(1)), (a[d] || (a[d] = [])).push(c);
    c = [
      [4, 3, 2, 1, 5, 6, 7, 8, 9],
      [7, 8, 9, 6, 5, 4, 3, 2, 1],
    ];
    d = [];
    for (e = 0; e < c.length; e++) {
      f = c[e];
      for (var g = 0; g < f.length; g++) {
        var k = f[g];
        if (a[k]) {
          d = d.concat(a[k]);
          break;
        }
      }
    }
    c = d;
    d = {};
    a = [];
    for (e = 0; e < c.length; e++) (f = c[e]), d[f] || ((d[f] = !0), a.push(f));
    c = [];
    for (d = 0; d < b.length; d++)
      for (e = b[d], f = 0; f < a.length; f++) (g = a[f]), g == e && c.push(g);
    return c;
  });
  var W = {};
  W.a =
    W.d =
    W.j =
      function () {
        return [];
      };
  W.i = function (a, b, c) {
    return [new Da(a), new Ea(b, c)];
  };
  W.k = function (a) {
    return [new Da(a)];
  };
  function Ya(a, b, c) {
    return W[b](a, b, c);
  }
  function X(a) {
    this.e = a;
    this.s = "x";
    this.ia = this.b = null;
    this.t = [];
    this.S = [];
    this.ma = this.ba = null;
  }
  X.prototype.supportsConfiguredBrowser = function () {
    return "x" !== this.s;
  };
  X.prototype.init = function () {
    if (0 < this.S.length) {
      for (var a = [], b = 0; b < this.S.length; b++) a.push(Ca(this.S[b]));
      var b = this.e,
        a = a.join(""),
        c = this.e.createElement("style");
      c.setAttribute("type", "text/css");
      c.styleSheet
        ? (c.styleSheet.cssText = a)
        : c.appendChild(document.createTextNode(a));
      ea(b, "head", c);
    }
  };
  X.prototype.load = function (a, b, c) {
    function d() {}
    var e = this,
      f = c || {},
      g = f.contextPath || ".",
      k = f.hostname || this.ma;
    a = f.timeout;
    c = !!f.async;
    var v = !1 !== f.events,
      x = null,
      w = new J(),
      M = new J();
    f.active && (d = f.active);
    f.active = function () {
      M.stop();
      e.ra &&
        e.ra.send(
          e.e,
          -1 !== w.R && -1 !== w.K ? w.K - w.R : -1,
          -1 !== M.R && -1 !== M.K ? M.K - M.R : -1
        );
      d();
    };
    x = new ra(this.e, f);
    if (this.s) {
      for (var f = Xa[this.s] || new Va(Wa), q = 0; q < this.t.length; q++)
        Ha(this.t[q], this.s, f);
      this.ba &&
        ((f = Ya(this.e, this.s, this.t)),
        (f = Fa(this.s, f)),
        (f.contextPath = g),
        k && (f.hostname = k),
        (g = this.ba.h("https:" === ha(this.e), f)),
        w.start(),
        ka(
          this.e,
          g,
          function () {
            w.stop();
            M.start();
          },
          c
        ));
      if (v) {
        for (
          var S = [], La = {}, t = new za(this.b, this.e, x, a), q = 0;
          q < this.t.length;
          q++
        )
          S = S.concat(Ia(this.t[q], this.s));
        for (q = 0; q < S.length; q++)
          La[S[q].getName()] =
            "BESbswy\ue000\ue001\ue002\ue003\ue004\ue005\ue006";
        fa(this.e, function () {
          var a = S,
            c = {},
            d = La || {};
          if (0 === a.length && b) sa(t.H);
          else {
            t.ca += a.length;
            b && (t.oa = b);
            for (var e = 0; e < a.length; e++) {
              var f = a[e],
                g = d[f.getName()],
                k = t.H,
                q = f;
              k.J &&
                l(k.v, [k.o.h(k.p, q.getName(), E(q).toString(), "loading")]);
              D(k, "fontloading", q);
              k = null;
              k = new ua(h(t.Ca, t), h(t.Da, t), t.e, f, t.F, t.ea, c, g);
              k.start();
            }
          }
        });
      }
    }
  };
  X.prototype.performOptionalActions = function () {};
  function Za(a, b, c, d) {
    this.Ha = a;
    this.e = b;
    this.b = c;
    this.v = d;
    this.w = [];
  }
  Za.prototype.za = function (a) {
    this.w.push(a);
  };
  Za.prototype.load = function (a, b) {
    var c = a,
      d = b || {};
    "string" == typeof c
      ? (c = [c])
      : (c && c.length) || ((d = c || {}), (c = []));
    d.protocol && ia(this.e, d.protocol);
    if (c.length)
      for (var e = this, f = c.length, g = 0; g < c.length; g++)
        $a(this, c[g], function () {
          0 == --f && ab(e, d);
        });
    else ab(this, d);
  };
  function $a(a, b, c) {
    b = a.Ha.h("https:" === ha(a.e), { id: encodeURIComponent(b) });
    la(a.e, b, c);
  }
  function ab(a, b) {
    if (0 != a.w.length) {
      for (var c = new ra(a.e, b), d = !1, e = 0; e < a.w.length; e++)
        a.w[e].init(), (d = d || a.w[e].supportsConfiguredBrowser());
      if (d)
        for (
          c.J && l(c.v, [c.o.h(c.p, "loading")]), D(c, "loading"), c = 0;
          c < a.w.length;
          c++
        )
          (d = a.w[c]),
            d.supportsConfiguredBrowser() &&
              d.load(null, c == a.w.length - 1, b);
      else sa(c);
      a.w = [];
    }
  }
  var bb = new na(navigator.userAgent, document).parse(),
    cb = new da(window);
  window.Typekit || (window.Typekit = {});
  if (!window.Typekit.load) {
    var db = window.Typekit.config || {},
      eb = null;
    db.k && (eb = new N(db.k));
    var fb = new Za(eb, cb, bb, document.documentElement);
    window.Typekit.load = function () {
      fb.load.apply(fb, arguments);
    };
    window.Typekit.addKit = function () {
      fb.za.apply(fb, arguments);
    };
  }
  var gb,
    Y,
    Z,
    K = window.Typekit.config || {};
  Z = new X(cb);
  Z.ra = new Ka(K.ps, K.ht, K.fi, K.a, K.kt, K.js, K.l);
  Y = new Na();
  Y.na = !K.si;
  Y.X = !K.st;
  Y.L = !K.sa;
  Y.xa = !K.sw;
  Y.ha = !K.sb;
  Z.ia = Y;
  K.f && ((gb = new N(K.f)), (Z.ba = gb));
  K.hn && (Z.ma = K.hn);
  var L;
  if (K.fn)
    for (L = 0; L < K.fn.length; L += 2) Z.t.push(new Ga(K.fn[L], K.fn[L + 1]));
  if (K.c) for (L = 0; L < K.c.length; L += 2) Z.S.push(new Ba());
  Z.b = bb;
  var hb;
  a: {
    var ib = Z.b,
      jb = new Na(),
      kb = Z.ia || jb,
      lb;
    for (lb in U) {
      var $ = U[lb];
      if (V[$] && V[$](ib, kb)) {
        hb = $;
        break a;
      }
    }
    for (lb in U)
      if ((($ = U[lb]), V[$] && V[$](ib, jb))) {
        hb = "x";
        break a;
      }
    hb = "k";
  }
  Z.s = hb;
  window.Typekit.addKit(Z);
  if (window.WebFont)
    try {
      window.Typekit.load();
    } catch (mb) {}
})(this, document);
