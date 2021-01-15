class SimpleCustom extends HTMLElement {
    constructor(props) {
        super();

        if (props && props.text) this.setAttribute('text', props.text);

        const div = document.createElement('div');
        div.textContent = this.getAttribute('text');
        const shadow = this.attachShadow({ mode: 'open' });

        shadow.appendChild(div);
    }

    ddd() {}

    ccc() {}
}
customElements.define('simple-custom', SimpleCustom);
