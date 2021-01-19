const btn = document.getElementById('upgrade');
const helloEl = document.getElementById('hello');

class Hello extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });
        const style = document.createElement('style');
        style.textContent = `
            .hello {
                color: orange;
                background-color: grey;
                padding: 5px 15px;
                border-radius: 4px;
                display: inline-block;
                width: 200px;
                text-align: center;
            }
        `;

        const div = document.createElement('div');
        div.classList.add('hello');
        div.innerHTML = '<span>(hello licheng ^_^)</span>';

        shadow.appendChild(style);
        shadow.appendChild(div);
    }
}

// whenDefine
customElements.whenDefined('licheng-hello').then(res => {
    console.log('when define licheng-hello', res);

    // upgrade
    customElements.upgrade(helloEl);
}).catch(reason=> {
    console.error(reason);
});

btn.onclick = e => {
    // get
    const definedHello = customElements.get('licheng-hello');

    if (typeof definedHello === 'function') return;
    // define
    customElements.define('licheng-hello', Hello);
}