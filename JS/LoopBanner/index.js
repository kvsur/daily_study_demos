let wrap = document.querySelector('.wrap');//获取外框，以便设置图片滚动的宽度
let list = wrap.querySelector('.list');//图片列表
let dot = wrap.querySelectorAll('.dot li');//小点

let startpoint = {};//鼠标按下的起始点
let distaince = {};//距离
let startOffset = 0;//记录鼠标按下时图片列表的位置
let translatex = 0;//移动的距离
let now = 0;//当前在那一张
let imgW = wrap.offsetWidth;//获取一下外框的宽度
let proportion = 0.3;//当图片拖动超过整体宽度的比例时，跳转到下一张或者上一章
let isMove = false;
list.innerHTML += list.innerHTML;//复制图片列表

wrap.addEventListener('touchstart', (ev) => {
    let touch = ev.changedTouches[0];
    startpoint = {
        x: touch.pageX,
        y: touch.pageY
    }

    if (now == 0) {
        now = dot.length;
    } else if (now == dot.length * 2 - 1) {
        now = dot.length - 1;
    }

    translatex = now * -imgW;
    startOffset = translatex;
    list.style.transition = 'none';
    list.style.transform = `translateX(${translatex}px)`;
})

wrap.addEventListener('touchmove', (ev) => {
    let touch = ev.changedTouches[0];
    distaince = {
        x: touch.pageX - startpoint.x,
        y: touch.pageY - startpoint.y
    }

    if (Math.abs(distaince.x) - Math.abs(distaince.y) > 5) {
        isMove = true;
        ev.preventDefault();
    } else if (Math.abs(distaince.x) - Math.abs(distaince.y) < 5) {
        isMove = false;
    }

    if (isMove) {
        translatex = startOffset + distaince.x;
        list.style.transform = `translateX(${translatex}px)`;
    }
})

wrap.addEventListener('touchend', () => {
    if (Math.abs(distaince.x) > imgW * proportion) {
        now -= distaince.x / Math.abs(distaince.x);
    }
    Array.from(dot).forEach((item, index) => {
        item.classList.remove('active');
        if (index === (now % dot.length)) {
            item.classList.add('active');
        }
    });

    if (isMove) {
        translatex = now * -imgW;
        list.style.transition = '0.3s';
        list.style.transform = `translateX(${translatex}px)`;
    }
})

Array.from(dot).forEach((item,index)=>{
    item.onclick = function(ev){
        Array.from(dot).forEach((item)=>{
            item.classList.remove('active');
        })

        now = index;
        this.classList.add('active');
        translatex = now * -imgW;
        list.style.transition = '0.3s';
        list.style.transform = `translateX(${translatex}px)`;
        ev.preventDefault();
    }
})