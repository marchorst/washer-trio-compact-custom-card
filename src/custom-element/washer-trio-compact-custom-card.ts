import { HomeAssistant } from "../ha-types";
import { html, css, LitElement, CSSResultGroup, TemplateResult, HTMLTemplateResult } from "lit";
import { property } from "lit/decorators";
import { IWhirlpoolForecastConfig } from "../types";
import styles from "./card.css";

/**
 * Main card class definition
 */
export class WasherTrioCompactCustomCard extends LitElement {

    @property({ attribute: false })
    private cardTitle: string = "Washer Trio Compact";

    @property({ attribute: false })
    private state: any = "";

    private _hass: any;

    private entities: any = [];

    /**
     * CSS for the card
     */
    static get styles(): CSSResultGroup {
        return css(<TemplateStringsArray><any>[styles]);
    }

    /**
     * Called on every hass update
     */
    set hass(hass: HomeAssistant) {
        this._hass = hass;
        this.state = {}
        this.entities.forEach((entity : any)=> {
            this.state[entity.entity] = hass.states[entity.entity].state
        })
    }

    /**
     * Called every time when entity config is updated
     * @param config Card configuration (yaml converted to JSON)
     */
    setConfig(config: IWhirlpoolForecastConfig): void {
        this.entities = config.entities;
        this.cardTitle = config.title || "Washer";
       
    }

    /**
     * Renders the card when the update is requested (when any of the properties are changed)
     */
    render(): TemplateResult {
        var tl : HTMLTemplateResult[] = [];
        this.entities.forEach((entity :any) => {
            let el = html``;
            let d = this.state[entity.entity];
            const remainMinutes =  Math.floor((((new Date(d)).getTime() - Date.now())/1000)/60);
            el = html`
            <div>
              ${entity.name}: ${remainMinutes>0 ? remainMinutes: '-'}
            </div>
            `; 
            tl.push(el);
        });

        return html`
        <ha-card>
          ${tl}
        </ha-card>
        `;
    }
}