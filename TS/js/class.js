var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Human = /** @class */ (function () {
    function Human() {
    }
    // abstract show(): void;
    Human.prototype.action = function () {
        console.log('dododododododo.....');
    };
    return Human;
}());
var Japaniese = /** @class */ (function (_super) {
    __extends(Japaniese, _super);
    function Japaniese() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Japaniese.prototype.sayHello = function () {
        console.log('Hello, I am a Japaniese');
    };
    Japaniese.prototype.sexual = function () {
        console.log('Ya Mi De...');
    };
    Japaniese.prototype.makeAV = function () {
        this.sexual();
    };
    Japaniese.prototype.show = function () {
        this.makeAV();
        this.action();
    };
    return Japaniese;
}(Human));
var Chiniese = /** @class */ (function (_super) {
    __extends(Chiniese, _super);
    function Chiniese() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Chiniese.prototype.sayHello = function () {
        console.log('Hello, I am a Chiniese');
    };
    Chiniese.prototype.eat = function () {
        console.log('bajibaji...');
    };
    Chiniese.prototype.show = function () {
        this.eat();
        this.action();
    };
    return Chiniese;
}(Human));
var j = new Japaniese();
j.show();
