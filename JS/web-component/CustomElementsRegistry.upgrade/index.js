const div = document.createElement('div');

// script.src = './main.js';
{/* <script src="./main.js"></script> */}

const script = document.createElement('script');
script.src = './main.js';

div.appendChild(script);

// div.innerHTML = '<script src="./main.js"></script>';

document.body.appendChild(div);