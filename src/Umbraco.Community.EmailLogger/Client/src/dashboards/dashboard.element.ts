import { LitElement, css, html, customElement, state, repeat } from "@umbraco-cms/backoffice/external/lit";
import { UmbElementMixin } from "@umbraco-cms/backoffice/element-api";
import { EmailLog, UmbracoCommunityEmailLoggerService } from "../api";
import { UUIButtonElement } from "@umbraco-cms/backoffice/external/uui";
// import { UMB_NOTIFICATION_CONTEXT } from "@umbraco-cms/backoffice/notification";
// import { UMB_CURRENT_USER_CONTEXT } from "@umbraco-cms/backoffice/current-user";

@customElement('example-dashboard')
export class ExampleDashboardElement extends UmbElementMixin(LitElement) {

  @state()
  private _userData: Array<EmailLog> = [];

  @state()
  private _showCode: boolean = true;

  constructor() {
    super();

    // this.consumeContext(UMB_NOTIFICATION_CONTEXT, (notificationContext) => {
    //   this.#notificationContext = notificationContext;
    // });

    // this.consumeContext(UMB_CURRENT_USER_CONTEXT, (currentUserContext) => {

    //   // When we have the current user context
    //   // We can observe properties from it, such as the current user or perhaps just individual properties
    //   // When the currentUser object changes we will get notified and can reset the @state properrty
    //   this.observe(currentUserContext.currentUser, (currentUser) => {
    //     this._contextCurrentUser = currentUser;
    //   });
    // });
  }


  #onClickWhoAmI = async (ev: Event) => {
    const buttonElement = ev.target as UUIButtonElement;
    const prettyButton = document.getElementById('btnTogglePretty') as UUIButtonElement;
    buttonElement.state = "waiting";

    const { data, error } = await UmbracoCommunityEmailLoggerService.all();

    if (error) {
      buttonElement.state = "failed";
      console.error(error);
      return;
    }

    if (data !== undefined) {
      this._userData = data;
      buttonElement.state = "success";
      prettyButton.disabled = false;
    }

    /*if (this.#notificationContext) {
      this.#notificationContext.peek("warning", {
        data: {
          headline: `You are ${this._serverUserData?.name}`,
          message: `Your email is ${this._serverUserData?.email}`,
        }
      })
    }*/
  }
  #togglePretty = async () => {
    this._showCode = !this._showCode;
  }


  render() {
    return html`
        <uui-box headline="Want to see some logs?">
            <div slot="header">[Server]</div>
            <uui-button color="default" look="primary" @click="${this.#onClickWhoAmI}">
                Go get data
            </uui-button>
            <uui-button color="default" look="secondary"  @click="${this.#togglePretty}">
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
				  ${repeat(this._userData, (user) => user.id, (user) => this._renderEmailLog(user))}
			  </uui-table>
        </uui-box>

    `;
  }

  private _renderEmailLog(user: EmailLog) {
    if (!user) return;
    return html`<uui-table-row class="user">
        <uui-table-cell>${user.dateSent}</uui-table-cell>
        <uui-table-cell>${user.recipients}</uui-table-cell>
        <uui-table-cell>${user.subject}</uui-table-cell>
        <uui-table-cell>${user.isSuccessful ? 'YES' : 'No'}</uui-table-cell>
        <uui-table-cell><div class="htmlbox">${this.rawHTML(user.message)}</div></uui-table-cell>
    </uui-table-row>`;
  }

  private rawHTML(html: string) {
    if (this._showCode) {
      return html;
    }

    var frag = document.createRange().createContextualFragment(`${html}`);
    return frag;
  }

  static styles = [
    css`
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
    `];
}

export default ExampleDashboardElement;

declare global {
  interface HTMLElementTagNameMap {
    'example-dashboard': ExampleDashboardElement;
  }
}
