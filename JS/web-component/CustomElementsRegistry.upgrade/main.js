const el = document.createElement('licheng-e');

document.body.appendChild(el);


class Kvsur extends HTMLElement {
    constructor() {
        super();

        const shadow = this.attachShadow({ mode: 'open' });
        const innerHTML = `
            <div slot="kvsur">
                fuck you
            </div>
        `;

        shadow.innerHTML = innerHTML;
    }
}

customElements.define('kvsur-e', Kvsur);

class Licheng extends HTMLElement {
    constructor() {
        super();

        const shadow = this.attachShadow({ mode: 'open' });

        const innnerHtml = `
            <div>
                licheng textContent
                <slot name="kvsur"></slot>
            </div>
        `;

        shadow.innerHTML = innnerHtml;
    }

    connectedCallback() {
        localStorage.setItem('fuck', 'licheng');
    }
}


const btn = document.getElementById('upgrade');
const btn1 = document.getElementById('upgrade1');

// btn.onclick = e => {
//     customElements.define('licheng-e', Licheng);
//     customElements.upgrade(el);
// }
setTimeout(() => {
    customElements.define('licheng-e', Licheng);
    customElements.upgrade(el);
}, 3000);
// btn1.onclick = e => {
//     const el2 = document.createElement('div');

//     el2.innerHTML = `
//         <licheng-e style="color: red;">
//             <div slot="kvsur">My name is licheng && kvsur</div>
//         </licheng-e>
//     `;

//     const script = document.createElement('script');
//     script.src = './inner.js';

//     el2.appendChild(script);

//     document.body.appendChild(el2);
// }