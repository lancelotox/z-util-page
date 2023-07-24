import { Reactive } from '../ts/index';

describe('常规', () => {
    test('副作用函数执行', () => {
        const a = {
            innerHTML: ""
        };
        //生成响应式对象
        const b = Reactive.reactive({
            innerHTML: ""
        });
        //创建副作用函数
        Reactive.effect(function () {
            a.innerHTML = b.innerHTML;
        });
        //修改响应式对象属性
        b.innerHTML = "I LOVE YOU";
        //副作用函数执行改变了a对象属性值
        expect(a.innerHTML).toBe("I LOVE YOU");
    });
});

describe('数组', () => {
    test('数组栈操作API导致副作用函数栈溢出', () => {
        const a = Reactive.reactive<Array<number>>([]);
        Reactive.effect(function () {
            a.push(1);
        });
        Reactive.effect(function () {
            a.push(1);
        });
        expect(a.length).toBe(2);
    });
    test('数组栈操作导致其他副作用函数无法追踪', () => {
        const a = Reactive.reactive<Array<number>>([]);
        Reactive.effect(function () {
            if (a.length) {
              a.push(1);
            } else {
              a.push(1);
            }
        });
        Reactive.effect(function () {
            a.push(1);
        });
        Reactive.effect(function () {
            a.push(1);
        });
        expect(a.length).toBe(5);
    });
});

describe('Map&Set', () => {
    test('修改', () => {
        let rMap = Reactive.reactive(new Map<any, any>([
            ['r', { a: '1' }],
            ['test', 'test']
        ]));
        let resulet: string | undefined = '';
        Reactive.effect(function () {
            resulet = rMap.get('test');
        });
        rMap.set('test', 'yes');
        expect(resulet).toBe('yes');
    });
    test('删除', () => {
        let rMap = Reactive.reactive(new Map<any, any>([
            ['r', { a: '1' }],
            ['test', 'test']
        ]));
        let resulet: string | undefined = '';
        Reactive.effect(function () {
            resulet = rMap.get('test');
        });
        rMap.delete('test');
        expect(resulet).toBeUndefined();
    });
    test('新增', () => {
        let rMap = Reactive.reactive(new Map<any, any>([
            ['r', { a: '1' }],
            ['test', 'test']
        ]));
        let loopCount = 0;
        Reactive.effect(function () {
            // rMap.forEach((value, key, m)=>{
            //     loopCount++;
            // });
            for (const [val, key] of rMap) {
                loopCount++;
            }
        });
        rMap.set('test1', 'test1');
        expect(loopCount).toBe(5);
    });
    test('Map.keys相关副作用函数不会在值变化时触发', () => {
        let rMap = Reactive.reactive(new Map<any, any>([
            ['r', { a: '1' }],
            ['test', 'test']
        ]));
        let loopCount = 0;
        Reactive.effect(function () {
            for (const [key] of rMap.keys()) {
                loopCount++;
            }
        });
        rMap.set('test', 'test1');
        expect(loopCount).toBe(2);
    });
});




