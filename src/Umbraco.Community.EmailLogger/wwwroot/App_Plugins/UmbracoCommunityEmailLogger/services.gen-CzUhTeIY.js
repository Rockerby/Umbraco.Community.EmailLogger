var C = Object.defineProperty;
var U = (l, e, a) => e in l ? C(l, e, { enumerable: !0, configurable: !0, writable: !0, value: a }) : l[e] = a;
var v = (l, e, a) => U(l, typeof e != "symbol" ? e + "" : e, a);
var A = /\{[^{}]+\}/g, y = ({ allowReserved: l, name: e, value: a }) => {
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
    let r = (l ? s : s.map((o) => encodeURIComponent(o))).join(_(i));
    switch (i) {
      case "label":
        return `.${r}`;
      case "matrix":
        return `;${a}=${r}`;
      case "simple":
        return r;
      default:
        return `${a}=${r}`;
    }
  }
  let n = q(i), t = s.map((r) => i === "label" || i === "simple" ? l ? r : encodeURIComponent(r) : y({ allowReserved: l, name: a, value: r })).join(n);
  return i === "label" || i === "matrix" ? n + t : t;
}, $ = ({ allowReserved: l, explode: e, name: a, style: i, value: s }) => {
  if (s instanceof Date) return `${a}=${s.toISOString()}`;
  if (i !== "deepObject" && !e) {
    let r = [];
    Object.entries(s).forEach(([m, c]) => {
      r = [...r, m, l ? c : encodeURIComponent(c)];
    });
    let o = r.join(",");
    switch (i) {
      case "form":
        return `${a}=${o}`;
      case "label":
        return `.${o}`;
      case "matrix":
        return `;${a}=${o}`;
      default:
        return o;
    }
  }
  let n = W(i), t = Object.entries(s).map(([r, o]) => y({ allowReserved: l, name: i === "deepObject" ? `${a}[${r}]` : r, value: o })).join(n);
  return i === "label" || i === "matrix" ? n + t : t;
}, E = ({ path: l, url: e }) => {
  let a = e, i = e.match(A);
  if (i) for (let s of i) {
    let n = !1, t = s.substring(1, s.length - 1), r = "simple";
    t.endsWith("*") && (n = !0, t = t.substring(0, t.length - 1)), t.startsWith(".") ? (t = t.substring(1), r = "label") : t.startsWith(";") && (t = t.substring(1), r = "matrix");
    let o = l[t];
    if (o == null) continue;
    if (Array.isArray(o)) {
      a = a.replace(s, x({ explode: n, name: t, style: r, value: o }));
      continue;
    }
    if (typeof o == "object") {
      a = a.replace(s, $({ explode: n, name: t, style: r, value: o }));
      continue;
    }
    if (r === "matrix") {
      a = a.replace(s, `;${y({ name: t, value: o })}`);
      continue;
    }
    let m = encodeURIComponent(r === "label" ? `.${o}` : o);
    a = a.replace(s, m);
  }
  return a;
}, O = ({ allowReserved: l, array: e, object: a } = {}) => (i) => {
  let s = [];
  if (i && typeof i == "object") for (let n in i) {
    let t = i[n];
    if (t != null) {
      if (Array.isArray(t)) {
        s = [...s, x({ allowReserved: l, explode: !0, name: n, style: "form", value: t, ...e })];
        continue;
      }
      if (typeof t == "object") {
        s = [...s, $({ allowReserved: l, explode: !0, name: n, style: "deepObject", value: t, ...a })];
        continue;
      }
      s = [...s, y({ allowReserved: l, name: n, value: t })];
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
  let n = s.startsWith("/") ? s : `/${s}`, t = l + n;
  e && (t = E({ path: e, url: t }));
  let r = a ? i(a) : "";
  return r.startsWith("?") && (r = r.substring(1)), r && (t += `?${r}`), t;
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
    else if (Array.isArray(n)) for (let t of n) e.append(s, t);
    else n !== void 0 && e.set(s, typeof n == "object" ? JSON.stringify(n) : n);
  }
  return e;
}, g = class {
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
}, D = () => ({ error: new g(), request: new g(), response: new g() }), N = { bodySerializer: (l) => JSON.stringify(l) }, P = O({ allowReserved: !1, array: { explode: !0, style: "form" }, object: { explode: !0, style: "deepObject" } }), H = { "Content-Type": "application/json" }, T = (l = {}) => ({ ...N, baseUrl: "", fetch: globalThis.fetch, headers: H, parseAs: "auto", querySerializer: P, ...l }), J = (l = {}) => {
  let e = j(T(), l), a = () => ({ ...e }), i = (t) => (e = j(e, t), a()), s = D(), n = async (t) => {
    let r = { ...e, ...t, headers: S(e.headers, t.headers) };
    r.body && r.bodySerializer && (r.body = r.bodySerializer(r.body)), r.body || r.headers.delete("Content-Type");
    let o = I({ baseUrl: r.baseUrl ?? "", path: r.path, query: r.query, querySerializer: typeof r.querySerializer == "function" ? r.querySerializer : O(r.querySerializer), url: r.url }), m = { redirect: "follow", ...r }, c = new Request(o, m);
    for (let f of s.request._fns) c = await f(c, r);
    let R = r.fetch, u = await R(c);
    for (let f of s.response._fns) u = await f(u, c, r);
    let h = { request: c, response: u };
    if (u.ok) {
      if (u.status === 204 || u.headers.get("Content-Length") === "0") return { data: {}, ...h };
      if (r.parseAs === "stream") return { data: u.body, ...h };
      let f = (r.parseAs === "auto" ? z(u.headers.get("Content-Type")) : r.parseAs) ?? "json", w = await u[f]();
      return f === "json" && r.responseTransformer && (w = await r.responseTransformer(w)), { data: w, ...h };
    }
    let p = await u.text();
    try {
      p = JSON.parse(p);
    } catch {
    }
    let d = p;
    for (let f of s.error._fns) d = await f(p, u, c, r);
    if (d = d || {}, r.throwOnError) throw d;
    return { error: d, ...h };
  };
  return { connect: (t) => n({ ...t, method: "CONNECT" }), delete: (t) => n({ ...t, method: "DELETE" }), get: (t) => n({ ...t, method: "GET" }), getConfig: a, head: (t) => n({ ...t, method: "HEAD" }), interceptors: s, options: (t) => n({ ...t, method: "OPTIONS" }), patch: (t) => n({ ...t, method: "PATCH" }), post: (t) => n({ ...t, method: "POST" }), put: (t) => n({ ...t, method: "PUT" }), request: n, setConfig: i, trace: (t) => n({ ...t, method: "TRACE" }) };
};
const b = J(T());
class L {
  static ping(e) {
    return ((e == null ? void 0 : e.client) ?? b).get({
      ...e,
      url: "/umbraco/umbracocommunityemaillogger/api/v1/ping"
    });
  }
  static whatsMyName(e) {
    return ((e == null ? void 0 : e.client) ?? b).get({
      ...e,
      url: "/umbraco/umbracocommunityemaillogger/api/v1/whatsMyName"
    });
  }
  static whatsTheTimeMrWolf(e) {
    return ((e == null ? void 0 : e.client) ?? b).get({
      ...e,
      url: "/umbraco/umbracocommunityemaillogger/api/v1/whatsTheTimeMrWolf"
    });
  }
  static whoAmI(e) {
    return ((e == null ? void 0 : e.client) ?? b).get({
      ...e,
      url: "/umbraco/umbracocommunityemaillogger/api/v1/whoAmI"
    });
  }
}
export {
  L as U,
  b as c
};
//# sourceMappingURL=services.gen-CzUhTeIY.js.map
