import { debounce, throttle, deepClone, getType, generateUUID } from "../ts/index";

describe('函数防抖', ()=>{

    test('延迟执行', () => {
        let startTime: Date, endTime: Date;
        return new Promise<void>(resolve=>{
            const debouncedFunc = debounce(function(){
                resolve();
            }, 10);
            startTime = new Date();
            debouncedFunc();
        }).then(()=>{
            endTime = new Date();
            expect(endTime.getTime() - startTime.getTime()).toBeGreaterThanOrEqual(10);
        })
    });

    test('单次执行', () => {
        let excuteCount: number = 0;
        return new Promise<void>(resolve=>{
            const debouncedFunc = debounce(function(go: Function | undefined){
                excuteCount++;
                if(go) go();
            }, 10);
            debouncedFunc();
            debouncedFunc();
            debouncedFunc();
            debouncedFunc(resolve);
        }).then(()=>{
            expect(excuteCount).toBe(1);
        })
    });

    test('立即执行', () => {
        let excuteCount: number = 0;
        return new Promise<void>(resolve=>{
            const debouncedFunc = debounce(function(go: Function | undefined){
                excuteCount++;
                if(go) go();
            }, 10, true);
            debouncedFunc();
            debouncedFunc();
            debouncedFunc();
            debouncedFunc(resolve);
        }).then(()=>{
            expect(excuteCount).toBe(2);
        })
    });

})

describe('函数节流', ()=>{

    test('间隔执行', done => {
        let executeCount: number = 0;
        let invokeCount: number = 5;
        const throttledFunc = throttle(function(){
            executeCount++;
        }, 10);
        for(let i = 1; i <= invokeCount; i++){
            setTimeout(()=>{
                throttledFunc();
                if(i === invokeCount) {
                    try{
                        expect(invokeCount).not.toBe(executeCount);
                        done();
                    }catch(err){
                        done(err);
                    }
                }
            }, i * 10);
        }
    });

})

describe('对象深拷贝', ()=>{
    const targetVal = {
        a: '身体和心灵，总有一个在路上。',
        b: {
            c: new Date(),
            d: [1, 3, 4],
            e: Symbol(),
            a: null,
            b: undefined,
            f: {
                a: 1,
                b: true,
                
            }
        },
        c: document.createElement('div'),
        d: new RegExp(/\d+/ig),
        e: new Error('错误'),
        f: function(){
            console.log('身体和心灵，总有一个在路上。');
        },
        g: new Map(),
        h: new Set()
    };

    const cloneVal = deepClone(targetVal);

    test('值相同', () => {
        expect(cloneVal).toEqual(targetVal);
    });

    test('引用不同', () => {
        expect(cloneVal.b).not.toBe(targetVal.b);
    });

})

describe('对象类型获取', ()=>{

    test('数字', () => {
        const val = 1;
        const type: string = getType(val);
        expect(type).toBe('Number');
    });
    test('字典', () => {
        const val = new Map<any, any>();
        const type: string = getType(val);
        expect(type).toBe('Map');
    });
    test('日期', () => {
        const val = new Date();
        const type: string = getType(val);
        expect(type).toBe('Date');
    });
    test('异常', () => {
        const val = new Error("错误");
        const type: string = getType(val);
        expect(type).toBe('Error');
    });

})

describe('获取UUID', ()=>{
    let uuid: string = generateUUID();
    let separatorIndexs: Array<number> = [];
    let chartCount: number = 0;
    let key: string;

    for (const iterator of uuid.matchAll(/[0123456789abcdef-]/g)) {
        if(iterator[0] === '-') separatorIndexs.push(iterator.index || -1);
        else chartCount++;
        if(iterator.index === 14) key = iterator[0];
    }
     
    test('含有4个分隔符', ()=>{
        expect(separatorIndexs.join('')).toBe('8131823');
    });    
    test('分隔符与常规字符共36个', ()=>{
        expect(separatorIndexs.length + chartCount).toBe(36);
    });   
    test('从0开始第14个字符为4', ()=>{
        expect(key).toBe('4');
    });
})