import { Reactive } from '../lib/index';

test('副作用函数执行', () => {
    const a = {
        innerHTML: ""
    };
    const b = Reactive.reactive({
        innerHTML: ""
    });
    Reactive.effect(function(){
        a.innerHTML = b.innerHTML;
    });
    // expect(a.innerHTML).toBe("I LOVE YOU");
    b.innerHTML = "I LOVE YOU";
    expect(a.innerHTML).toBe("I LOVE YOU");
});

test('数组栈操作API导致副作用函数栈溢出', ()=>{
    const a: Array<number> = Reactive.reactive([]);
    Reactive.effect(function(){
        a.push(1);
    });
    Reactive.effect(function(){
        a.push(1);
    });
    expect(a.length).toBe(2);
});


