class A{
    constructor() {
        this.a = 1;
        this.b = 2;
    }

    callA() {
        console.log(this.a);
        console.log(A)
    }
}

var a = new A();
a.callA();
