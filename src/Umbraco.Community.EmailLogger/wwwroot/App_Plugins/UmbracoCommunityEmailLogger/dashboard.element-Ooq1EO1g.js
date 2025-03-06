import { LitElement as y, repeat as C, html as _, css as x, state as l, customElement as E } from "@umbraco-cms/backoffice/external/lit";
import { UmbElementMixin as M } from "@umbraco-cms/backoffice/element-api";
import { U as h } from "./services.gen-SAU-gQrx.js";
import { UMB_NOTIFICATION_CONTEXT as T } from "@umbraco-cms/backoffice/notification";
import { UMB_CURRENT_USER_CONTEXT as W } from "@umbraco-cms/backoffice/current-user";
var U = Object.defineProperty, D = Object.getOwnPropertyDescriptor, f = (e) => {
  throw TypeError(e);
}, s = (e, t, a, r) => {
  for (var o = r > 1 ? void 0 : r ? D(t, a) : t, n = e.length - 1, c; n >= 0; n--)
    (c = e[n]) && (o = (r ? c(t, a, o) : c(o)) || o);
  return r && o && U(t, a, o), o;
}, v = (e, t, a) => t.has(e) || f("Cannot " + a), b = (e, t, a) => (v(e, t, "read from private field"), a ? a.call(e) : t.get(e)), u = (e, t, a) => t.has(e) ? f("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, a), N = (e, t, a, r) => (v(e, t, "write to private field"), t.set(e, a), a), d, p, m, w, g;
let i = class extends M(y) {
  constructor() {
    super(), this._yourName = "Press the button!", this._serverUserData = void 0, this._userData = [], this._contextCurrentUser = void 0, this._showCode = !0, u(this, d), u(this, p, async (e) => {
      const t = e.target, a = document.getElementById("btnTogglePretty");
      t.state = "waiting";
      const { data: r, error: o } = await h.all();
      if (o) {
        t.state = "failed", console.error(o);
        return;
      }
      r !== void 0 && (this._userData = r, t.state = "success", a.disabled = !1);
    }), u(this, m, async (e) => {
      this._showCode = !this._showCode;
    }), u(this, w, async (e) => {
      const t = e.target;
      t.state = "waiting";
      const { data: a, error: r } = await h.whatsTheTimeMrWolf();
      if (r) {
        t.state = "failed", console.error(r);
        return;
      }
      a !== void 0 && (this._timeFromMrWolf = new Date(a), t.state = "success");
    }), u(this, g, async (e) => {
      const t = e.target;
      t.state = "waiting";
      const { data: a, error: r } = await h.whatsMyName();
      if (r) {
        t.state = "failed", console.error(r);
        return;
      }
      this._yourName = a, t.state = "success";
    }), this.consumeContext(T, (e) => {
      N(this, d, e);
    }), this.consumeContext(W, (e) => {
      this.observe(e.currentUser, (t) => {
        this._contextCurrentUser = t;
      });
    });
  }
  render() {
    return _`
        <uui-box headline="Want to see some logs?">
            <div slot="header">[Server]</div>
            <uui-button color="default" look="primary" @click="${b(this, p)}">
                Go get data
            </uui-button>
            <uui-button color="default" look="secondary"  @click="${b(this, m)}">
                Toggle pretty HTML
            </uui-button>
        </uui-box>
                
        <uui-box headline="Email Logs" class="wide">
          <uui-table id="users-wrapper">
				  <uui-table-row>
					  <uui-table-head-cell>Recipient</uui-table-head-cell>
					  <uui-table-head-cell>Subject</uui-table-head-cell>
					  <uui-table-head-cell>Sent</uui-table-head-cell>
					  <uui-table-head-cell>Message</uui-table-head-cell>
				  </uui-table-row>
				  ${C(this._userData, (e) => e.id, (e) => this._renderEmailLog(e))}
			  </uui-table>
        </uui-box>

    `;
  }
  _renderEmailLog(e) {
    if (e)
      return _`<uui-table-row class="user">
        <uui-table-cell>${e.recipients}</uui-table-cell>
        <uui-table-cell>${e.subject}</uui-table-cell>
        <uui-table-cell>${e.isSuccessful ? "YES" : "No"}</uui-table-cell>
        <uui-table-cell><div class="htmlbox">${this.rawHTML(e.message)}</div></uui-table-cell>
    </uui-table-row>`;
  }
  rawHTML(e) {
    if (this._showCode)
      return e;
    var t = document.createRange().createContextualFragment(`${e}`);
    return t;
  }
};
d = /* @__PURE__ */ new WeakMap();
p = /* @__PURE__ */ new WeakMap();
m = /* @__PURE__ */ new WeakMap();
w = /* @__PURE__ */ new WeakMap();
g = /* @__PURE__ */ new WeakMap();
i.styles = [
  x`
            :host {
                display: grid;
                gap: var(--uui-size-layout-1);
                padding: var(--uui-size-layout-1);
                grid-template-columns: 1fr 1fr 1fr;
            }

            uui-box {
                margin-bottom: var(--uui-size-layout-1);
            }

            h2 {
                margin-top:0;
            }

            .wide {
                grid-column: span 3;
            }
            .htmlbox {
              max-width:800px;
              height:300px;
              overflow-y: scroll;
            }
    `
];
s([
  l()
], i.prototype, "_yourName", 2);
s([
  l()
], i.prototype, "_timeFromMrWolf", 2);
s([
  l()
], i.prototype, "_serverUserData", 2);
s([
  l()
], i.prototype, "_userData", 2);
s([
  l()
], i.prototype, "_contextCurrentUser", 2);
s([
  l()
], i.prototype, "_showCode", 2);
i = s([
  E("example-dashboard")
], i);
const P = i;
export {
  i as ExampleDashboardElement,
  P as default
};
//# sourceMappingURL=dashboard.element-Ooq1EO1g.js.map
