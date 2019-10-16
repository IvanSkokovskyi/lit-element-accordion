import {html, LitElement, property, css} from 'lit-element';

class MyAccordion extends LitElement {

    static get styles() {
        return css`:host{display: block;}`
    }

    render() {
        return html`<slot></slot>`;
    }

    constructor() {
        super();
        this.addEventListener('clickHeader', this.manageSpoilers)
    }

    manageSpoilers(ev) {
        ev.target.toggleAttribute('active');

        let active = this.querySelectorAll('ac-header[active]');

        active.forEach(function (el) {
            if (el !== ev.target)
                el.removeAttribute('active');
        });
    }
}

class AcItem extends LitElement {
    static get styles() {
        return css`:host{display: block;}`
    }

    render() {
        return html`<slot></slot>`
    }
}

class AcHeader extends LitElement {
    static get styles() {
        return css`
        :host{
            display: block;
            background-color: #eee;
            color: #444;
            cursor: pointer;
            padding: 18px;
            /*width: 100%;*/
            border: none;
            text-align: left;
            outline: none;
            font-size: 15px;
            transition: 0.4s;
        }
        :host:after{
            content: '\\002B';
            color: #777;
            font-weight: bold;
            float: right;
            margin-left: 5px;
        }
        :host([active]), :host(:hover) {
            background-color: #ccc;
        }
        :host:after {
            content: '\\002B';
            color: #777;
            font-weight: bold;
            float: right;
            margin-left: 5px;
        }
        :host([active]):after {
            content: "\\2212";
        }`
    }

    @property({type: CustomEvent}) clickHeader = new CustomEvent('clickHeader', {
        detail: {message: 'clickHeader happened.'},
        bubbles: true,
        composed: true
    });

    @property({
        type: Boolean,
        attribute: true,
        reflect: true,
        observe: true
    }) active = false;

    constructor() {
        super();
        this.addEventListener('click', this.handleClick);
    }

    handleClick() {
        this.dispatchEvent(this.clickHeader);
    }

    render() {
        return html`<slot>Default header</slot>`
    }

    attributeChangedCallback(name, oldval, newval) {
        console.log('attribute change: ', name, newval);

        if (this.hasAttribute('active')) {
            this.nextElementSibling.style.maxHeight = this.nextElementSibling.scrollHeight + "px";
        } else {
            this.nextElementSibling.style.maxHeight = null;
        }
        super.attributeChangedCallback(name, oldval, newval);
    }
}

class AcDetails extends LitElement {
    static get styles() {
        return css`
        :host{
            display: block;
            padding: 0 18px;
            background-color: white;
            max-height: 0px;
            overflow: hidden;
            transition: max-height 0.2s ease-out;
        }`
    }

    render() {
        return html`<slot >Default details</slot>`
    }
}

customElements.define('my-accordion', MyAccordion);
customElements.define('ac-item', AcItem);
customElements.define('ac-header', AcHeader);
customElements.define('ac-details', AcDetails);