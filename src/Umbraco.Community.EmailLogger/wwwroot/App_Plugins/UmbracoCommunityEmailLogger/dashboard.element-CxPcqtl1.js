import { LitElement as g, repeat as v, html as d, css as _, state as p, customElement as f } from "@umbraco-cms/backoffice/external/lit";
import { UmbElementMixin as w } from "@umbraco-cms/backoffice/element-api";
import { U as y } from "./services.gen-SAU-gQrx.js";
var x = Object.defineProperty, E = Object.getOwnPropertyDescriptor, m = (e) => {
  throw TypeError(e);
}, n = (e, t, a, u) => {
  for (var l = u > 1 ? void 0 : u ? E(t, a) : t, r = e.length - 1, o; r >= 0; r--)
    (o = e[r]) && (l = (u ? o(t, a, l) : o(l)) || l);
  return u && l && x(t, a, l), l;
}, C = (e, t, a) => t.has(e) || m("Cannot " + a), h = (e, t, a) => (C(e, t, "read from private field"), a ? a.call(e) : t.get(e)), b = (e, t, a) => t.has(e) ? m("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, a), s, c;
let i = class extends w(g) {
  constructor() {
    super(), this._userData = [], this._showCode = !0, b(this, s, async (e) => {
      const t = e.target, a = document.getElementById("btnTogglePretty");
      t.state = "waiting";
      const { data: u, error: l } = await y.all();
      if (l) {
        t.state = "failed", console.error(l);
        return;
      }
      u !== void 0 && (this._userData = u, t.state = "success", a.disabled = !1);
    }), b(this, c, async () => {
      this._showCode = !this._showCode;
    });
  }
  render() {
    return d`
        <uui-box headline="Want to see some logs?">
            <div slot="header">[Server]</div>
            <uui-button color="default" look="primary" @click="${h(this, s)}">
                Go get data
            </uui-button>
            <uui-button color="default" look="secondary"  @click="${h(this, c)}">
                Toggle pretty HTML
            </uui-button>
        </uui-box>
                
        <uui-box headline="Email Logs" class="wide">
          <uui-table id="users-wrapper">
				  <uui-table-row>
					  <uui-table-head-cell>Date Sent</uui-table-head-cell>
					  <uui-table-head-cell>Recipient</uui-table-head-cell>
					  <uui-table-head-cell>Subject</uui-table-head-cell>
					  <uui-table-head-cell>Sent</uui-table-head-cell>
					  <uui-table-head-cell>Message</uui-table-head-cell>
				  </uui-table-row>
				  ${v(this._userData, (e) => e.id, (e) => this._renderEmailLog(e))}
			  </uui-table>
        </uui-box>

    `;
  }
  _renderEmailLog(e) {
    if (e)
      return d`<uui-table-row class="user">
        <uui-table-cell>${e.dateSent}</uui-table-cell>
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
s = /* @__PURE__ */ new WeakMap();
c = /* @__PURE__ */ new WeakMap();
i.styles = [
  _`
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
n([
  p()
], i.prototype, "_userData", 2);
n([
  p()
], i.prototype, "_showCode", 2);
i = n([
  f("example-dashboard")
], i);
const L = i;
export {
  i as ExampleDashboardElement,
  L as default
};
//# sourceMappingURL=dashboard.element-CxPcqtl1.js.map
