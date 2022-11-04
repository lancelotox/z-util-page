import { Reactive } from '../ts/index';

test('副作用函数执行', () => {
    const a = {
        innerHTML: ""
    };
    //生成响应式对象
    const b = Reactive.reactive({
        innerHTML: ""
    });
    //创建副作用函数
    Reactive.effect(function(){
        a.innerHTML = b.innerHTML;
    });
    //修改响应式对象属性
    b.innerHTML = "I LOVE YOU";
    //副作用函数执行改变了a对象属性值
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


