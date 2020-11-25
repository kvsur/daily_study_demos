interface Human {
    show(): void;
}

abstract class Human {
    protected abstract gender: string;

    protected abstract sayHello(): void;

    // abstract show(): void;

    protected action() {
        console.log('dododododododo.....');
    }
}


class Japaniese extends Human implements Human {
    protected gender: string;
    protected sayHello(): void {
        console.log('Hello, I am a Japaniese')
    }

    private sexual() {
        console.log('Ya Mi De...')
    }

    protected makeAV() {
        this.sexual();
    }

    show() {
        this.makeAV();
        this.action();
    }
}

class Chiniese extends Human implements Human {
    protected gender: string;
    protected sayHello(): void {
        console.log('Hello, I am a Chiniese')
    }

    private eat() {
        console.log('bajibaji...')
    }

    show() {
        this.eat();
        this.action();
    }
}

const j = new Japaniese();
j.show();