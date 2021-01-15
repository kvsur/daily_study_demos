customElements.define('info-wrapper', class InfoWrapper extends HTMLElement {
    constructor () {
        super();

        const info = this.getAttribute('info');
        const wrapper = document.createElement('div');
        wrapper.setAttribute('class', 'wrapper');
        wrapper.setAttribute('style', 'color: red;');
        wrapper.textContent = info;

        const shadow = this.attachShadow({ mode: 'open'});

        shadow.appendChild(wrapper);
    }
});


class WordCount extends HTMLParagraphElement {
    constructor() {
        super();

        alert('fucking life');

        const wcParent = this.parentNode;

        function countWrods(node) {
            const text = node.innerText || node.textContent;
            return text.split(/\s+/g).length;
        }

        const count = `WordCount: ${countWrods(wcParent)}`;

        const shadow = this.attachShadow({ mode: 'open'});
        const text = document.createElement('span');
        text.textContent = count;

        shadow.appendChild(text);

        this.textTimer = setInterval(() => {
            text.textContent = `WordCount: ${countWrods(wcParent)}`;
        }, 1000);
    }

    // disconnectedCallback() {
    //     clearInterval(this.textTimer);
    //     console.log('disconnectedCallback method called');
    // }
}

customElements.define('word-count', WordCount, { extends: 'p' });