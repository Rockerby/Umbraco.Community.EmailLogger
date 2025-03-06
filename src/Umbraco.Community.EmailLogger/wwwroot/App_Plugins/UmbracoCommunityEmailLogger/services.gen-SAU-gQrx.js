var C = Object.defineProperty;
var U = (l, e, a) => e in l ? C(l, e, { enumerable: !0, configurable: !0, writable: !0, value: a }) : l[e] = a;
var v = (l, e, a) => U(l, typeof e != "symbol" ? e + "" : e, a);
var A = /\{[^{}]+\}/g, p = ({ allowReserved: l, name: e, value: a }) => {
  if (a == null) return "";
  if (typeof a == "object") throw new Error("Deeply-nested arrays/objects aren’t supported. Provide your own `querySerializer()` to handle these.");
  return `${e}=${l ? a : encodeURIComponent(a)}`;
}, q = (l) => {
  switch (l) {
    case "label":
      return ".";
    case "matrix":
      return ";";
    case "simple":
      return ",";
    default:
      return "&";
  }
}, _ = (l) => {
  switch (l) {
    case "form":
      return ",";
    case "pipeDelimited":
      return "|";
    case "spaceDelimited":
      return "%20";
    default:
      return ",";
  }
}, W = (l) => {
  switch (l) {
    case "label":
      return ".";
    case "matrix":
      return ";";
    case "simple":
      return ",";
    default:
      return "&";
  }
}, x = ({ allowReserved: l, explode: e, name: a, style: i, value: s }) => {
  if (!e) {
    let t = (l ? s : s.map((u) => encodeURIComponent(u))).join(_(i));
    switch (i) {
      case "label":
        return `.${t}`;
      case "matrix":
        return `;${a}=${t}`;
      case "simple":
        return t;
      default:
        return `${a}=${t}`;
    }
  }
  let n = q(i), r = s.map((t) => i === "label" || i === "simple" ? l ? t : encodeURIComponent(t) : p({ allowReserved: l, name: a, value: t })).join(n);
  return i === "label" || i === "matrix" ? n + r : r;
}, $ = ({ allowReserved: l, explode: e, name: a, style: i, value: s }) => {
  if (s instanceof Date) return `${a}=${s.toISOString()}`;
  if (i !== "deepObject" && !e) {
    let t = [];
    Object.entries(s).forEach(([m, c]) => {
      t = [...t, m, l ? c : encodeURIComponent(c)];
    });
    let u = t.join(",");
    switch (i) {
      case "form":
        return `${a}=${u}`;
      case "label":
        return `.${u}`;
      case "matrix":
        return `;${a}=${u}`;
      default:
        return u;
    }
  }
  let n = W(i), r = Object.entries(s).map(([t, u]) => p({ allowReserved: l, name: i === "deepObject" ? `${a}[${t}]` : t, value: u })).join(n);
  return i === "label" || i === "matrix" ? n + r : r;
}, E = ({ path: l, url: e }) => {
  let a = e, i = e.match(A);
  if (i) for (let s of i) {
    let n = !1, r = s.substring(1, s.length - 1), t = "simple";
    r.endsWith("*") && (n = !0, r = r.substring(0, r.length - 1)), r.startsWith(".") ? (r = r.substring(1), t = "label") : r.startsWith(";") && (r = r.substring(1), t = "matrix");
    let u = l[r];
    if (u == null) continue;
    if (Array.isArray(u)) {
      a = a.replace(s, x({ explode: n, name: r, style: t, value: u }));
      continue;
    }
    if (typeof u == "object") {
      a = a.replace(s, $({ explode: n, name: r, style: t, value: u }));
      continue;
    }
    if (t === "matrix") {
      a = a.replace(s, `;${p({ name: r, value: u })}`);
      continue;
    }
    let m = encodeURIComponent(t === "label" ? `.${u}` : u);
    a = a.replace(s, m);
  }
  return a;
}, O = ({ allowReserved: l, array: e, object: a } = {}) => (i) => {
  let s = [];
  if (i && typeof i == "object") for (let n in i) {
    let r = i[n];
    if (r != null) {
      if (Array.isArray(r)) {
        s = [...s, x({ allowReserved: l, explode: !0, name: n, style: "form", value: r, ...e })];
        continue;
      }
      if (typeof r == "object") {
        s = [...s, $({ allowReserved: l, explode: !0, name: n, style: "deepObject", value: r, ...a })];
        continue;
      }
      s = [...s, p({ allowReserved: l, name: n, value: r })];
    }
  }
  return s.join("&");
}, z = (l) => {
  if (!l) return;
  let e = l.split(";")[0].trim();
  if (e.startsWith("application/json") || e.endsWith("+json")) return "json";
  if (e === "multipart/form-data") return "formData";
  if (["application/", "audio/", "image/", "video/"].some((a) => e.startsWith(a))) return "blob";
  if (e.startsWith("text/")) return "text";
}, I = ({ baseUrl: l, path: e, query: a, querySerializer: i, url: s }) => {
  let n = s.startsWith("/") ? s : `/${s}`, r = l + n;
  e && (r = E({ path: e, url: r }));
  let t = a ? i(a) : "";
  return t.startsWith("?") && (t = t.substring(1)), t && (r += `?${t}`), r;
}, j = (l, e) => {
  var i;
  let a = { ...l, ...e };
  return (i = a.baseUrl) != null && i.endsWith("/") && (a.baseUrl = a.baseUrl.substring(0, a.baseUrl.length - 1)), a.headers = S(l.headers, e.headers), a;
}, S = (...l) => {
  let e = new Headers();
  for (let a of l) {
    if (!a || typeof a != "object") continue;
    let i = a instanceof Headers ? a.entries() : Object.entries(a);
    for (let [s, n] of i) if (n === null) e.delete(s);
    else if (Array.isArray(n)) for (let r of n) e.append(s, r);
    else n !== void 0 && e.set(s, typeof n == "object" ? JSON.stringify(n) : n);
  }
  return e;
}, w = class {
  constructor() {
    v(this, "_fns");
    this._fns = [];
  }
  clear() {
    this._fns = [];
  }
  exists(l) {
    return this._fns.indexOf(l) !== -1;
  }
  eject(l) {
    let e = this._fns.indexOf(l);
    e !== -1 && (this._fns = [...this._fns.slice(0, e), ...this._fns.slice(e + 1)]);
  }
  use(l) {
    this._fns = [...this._fns, l];
  }
}, D = () => ({ error: new w(), request: new w(), response: new w() }), N = { bodySerializer: (l) => JSON.stringify(l) }, P = O({ allowReserved: !1, array: { explode: !0, style: "form" }, object: { explode: !0, style: "deepObject" } }), H = { "Content-Type": "application/json" }, T = (l = {}) => ({ ...N, baseUrl: "", fetch: globalThis.fetch, headers: H, parseAs: "auto", querySerializer: P, ...l }), J = (l = {}) => {
  let e = j(T(), l), a = () => ({ ...e }), i = (r) => (e = j(e, r), a()), s = D(), n = async (r) => {
    let t = { ...e, ...r, headers: S(e.headers, r.headers) };
    t.body && t.bodySerializer && (t.body = t.bodySerializer(t.body)), t.body || t.headers.delete("Content-Type");
    let u = I({ baseUrl: t.baseUrl ?? "", path: t.path, query: t.query, querySerializer: typeof t.querySerializer == "function" ? t.querySerializer : O(t.querySerializer), url: t.url }), m = { redirect: "follow", ...t }, c = new Request(u, m);
    for (let f of s.request._fns) c = await f(c, t);
    let R = t.fetch, o = await R(c);
    for (let f of s.response._fns) o = await f(o, c, t);
    let b = { request: c, response: o };
    if (o.ok) {
      if (o.status === 204 || o.headers.get("Content-Length") === "0") return { data: {}, ...b };
      if (t.parseAs === "stream") return { data: o.body, ...b };
      let f = (t.parseAs === "auto" ? z(o.headers.get("Content-Type")) : t.parseAs) ?? "json", g = await o[f]();
      return f === "json" && t.responseTransformer && (g = await t.responseTransformer(g)), { data: g, ...b };
    }
    let y = await o.text();
    try {
      y = JSON.parse(y);
    } catch {
    }
    let d = y;
    for (let f of s.error._fns) d = await f(y, o, c, t);
    if (d = d || {}, t.throwOnError) throw d;
    return { error: d, ...b };
  };
  return { connect: (r) => n({ ...r, method: "CONNECT" }), delete: (r) => n({ ...r, method: "DELETE" }), get: (r) => n({ ...r, method: "GET" }), getConfig: a, head: (r) => n({ ...r, method: "HEAD" }), interceptors: s, options: (r) => n({ ...r, method: "OPTIONS" }), patch: (r) => n({ ...r, method: "PATCH" }), post: (r) => n({ ...r, method: "POST" }), put: (r) => n({ ...r, method: "PUT" }), request: n, setConfig: i, trace: (r) => n({ ...r, method: "TRACE" }) };
};
const h = J(T());
class L {
  static all(e) {
    return ((e == null ? void 0 : e.client) ?? h).get({
      ...e,
      url: "/umbraco/umbracocommunityemaillogger/api/v1/all"
    });
  }
  static ping(e) {
    return ((e == null ? void 0 : e.client) ?? h).get({
      ...e,
      url: "/umbraco/umbracocommunityemaillogger/api/v1/ping"
    });
  }
  static whatsMyName(e) {
    return ((e == null ? void 0 : e.client) ?? h).get({
      ...e,
      url: "/umbraco/umbracocommunityemaillogger/api/v1/whatsMyName"
    });
  }
  static whatsTheTimeMrWolf(e) {
    return ((e == null ? void 0 : e.client) ?? h).get({
      ...e,
      url: "/umbraco/umbracocommunityemaillogger/api/v1/whatsTheTimeMrWolf"
    });
  }
  static whoAmI(e) {
    return ((e == null ? void 0 : e.client) ?? h).get({
      ...e,
      url: "/umbraco/umbracocommunityemaillogger/api/v1/whoAmI"
    });
  }
}
export {
  L as U,
  h as c
};
//# sourceMappingURL=services.gen-SAU-gQrx.js.map
