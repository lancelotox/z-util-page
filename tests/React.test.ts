import { React } from '../lib/index';

test('副作用函数执行', () => {
    const a = {
        innerHTML: ""
    };
    const b = React.reactive({
        innerHTML: ""
    });
    React.effect(function(){
        a.innerHTML = b.innerHTML;
    });
    // expect(a.innerHTML).toBe("I LOVE YOU");
    b.innerHTML = "I LOVE YOU";
    expect(a.innerHTML).toBe("I LOVE YOU");
});

test('数组栈操作API导致副作用函数栈溢出', ()=>{
    const a: Array<number> = React.reactive([]);
    React.effect(function(){
        a.push(1);
    });
    React.effect(function(){
        a.push(1);
    });
    expect(a.length).toBe(2);
});
