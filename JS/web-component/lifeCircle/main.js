/**
 * Create a class for the element and user lifecircles example
 */
class CustomSquare extends HTMLElement {

    static get observedAttributes() {
        return ['l', 'c'];
    }
    constructor () {
        super();

        const shadow = this.attachShadow({ mode: 'open' });
        const div = document.createElement('div');
        const style = document.createElement('style');

        shadow.appendChild(style);
        shadow.appendChild(div);

        this.styleUpdated = false;
    }

    updateStyle() {
        if (this.styleUpdated) return;
        this.styleUpdated = true;

        const shadow = this.shadowRoot;
        shadow.querySelector('style').textContent = `
            div {
                width: ${this.getAttribute('l')}px;
                height: ${this.getAttribute('l')}px;
                background-color: ${this.getAttribute('c')};
            }
        `;
        setTimeout(() => {this.styleUpdated = false;}, 0);

        console.log('Customer square element style updated');
    }

    connectedCallback() {
        console.log('Custom square elment added to page');
        queueMicrotask(() => {
            this.updateStyle();
        });
    }

    disconnectedCallback() {
        console.log('Custom square element moved from page');
    }

    adoptedCallback() {
        console.log('Custom square element moved to new page');
    }

    attributeChangedCallback() {
        // debugger;
        console.log('Custom square element attributes changed');
        queueMicrotask(() => {
            this.updateStyle();
        });
    }
}

// customElements.define('custom-square', CustomSquare);

const add = document.querySelector('.add');
const update = document.querySelector('.update');
const remove = document.querySelector('.remove');

let square;

update.disabled = remove.disabled = true;

function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

add.onclick = e => {
    // square = document.createElement('custom-square');
    // square = new (customElements.get('custom-square'));
    square = new CustomSquare;
    console.log(square);
    square.setAttribute('l', 100);
    square.setAttribute('c', 'red');

    document.body.appendChild(square);

    update.disabled = remove.disabled = false;
    add.disabled = true;
}

update.onclick = e => {
    square.setAttribute('l', random(50, 200));
    square.setAttribute('c', `rgb(${random(0, 255)},${random(0, 255)} ,${random(0, 255)})`);
}

remove.onclick = e => {
    document.body.removeChild(square);
    
    update.disabled = remove.disabled = true;
    add.disabled = false;
}
