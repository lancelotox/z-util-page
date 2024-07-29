import { effect, reactive, ref, watch } from 'z-util-page/Reactive';

describe('常规', () => {
  test('副作用函数执行', () => {
    const a = {
      innerHTML: ""
    };
    //生成响应式对象
    const b = reactive({
      innerHTML: ""
    });
    //创建副作用函数
    effect(function () {
      a.innerHTML = b.innerHTML;
    });
    //修改响应式对象属性
    b.innerHTML = "I LOVE YOU";
    //副作用函数执行改变了a对象属性值
    expect(a.innerHTML).toBe("I LOVE YOU");
  });

  test('嵌套副作用函数外层重复执行时, 创建多个子副作用函数, 导致逻辑重复执行', () => {
    let count = 0;

    //生成响应式对象
    const Rea = reactive({
      top: '',
      inner: '',
      thirty: ''
    });

    //创建嵌套副作用函数
    effect(function () {
      let a = Rea.top
      count++;

      effect(function () {
        let b = Rea.inner;
        count++;

        effect(function () {
          let c = Rea.thirty;
          count++;
        });
      });
    });

    //修改响应式对象属性
    Rea.top = "I";
    Rea.top = "LOVE";

    Rea.inner = "I";
    Rea.inner = "LOVE";

    Rea.thirty = "I";
    Rea.thirty = "LOVE";

    //预计副作用函数执行导致count为15
    expect(count).toBe(15);
  });

  test('ref响应式', () => {
    let sum = 0;
    const count = ref({
      a: 11
    });
    effect(() => {
      sum = count.value.a;
    });

    count.value.a = 15;
    // 监听函数执行
    expect(sum).toBe(15);
  });

  test('watch执行', () => {
    let sum = 0;
    const count = ref<Record<string, any>>({
      a: 11
    });
    watch(count, (newVal) => {
      sum = newVal.value.c;
    })

    count.value.c = 15;
    // 监听函数执行
    expect(sum).toBe(15);
  });
});

describe('数组', () => {
  test('数组栈操作API导致副作用函数栈溢出', () => {
    const a = reactive<Array<number>>([]);
    effect(function () {
      a.push(1);
    });
    effect(function () {
      a.push(1);
    });
    expect(a.length).toBe(2);
  });
  test('数组栈操作导致其他副作用函数无法追踪', () => {
    const a = reactive<Array<number>>([]);
    effect(function () {
      if (a.length) {
        a.push(1);
      } else {
        a.push(1);
      }
    });
    effect(function () {
      a.push(1);
    });
    effect(function () {
      a.push(1);
    });
    expect(a.length).toBe(5);
  });
});

describe('Map&Set', () => {
  test('修改', () => {
    let rMap = reactive(new Map<any, any>([
      ['r', { a: '1' }],
      ['test', 'test']
    ]));
    let resulet: string | undefined = '';
    effect(function () {
      resulet = rMap.get('test');
    });
    rMap.set('test', 'yes');
    expect(resulet).toBe('yes');
  });
  test('删除', () => {
    let rMap = reactive(new Map<any, any>([
      ['r', { a: '1' }],
      ['test', 'test']
    ]));
    let resulet: string | undefined = '';
    effect(function () {
      resulet = rMap.get('test');
    });
    rMap.delete('test');
    expect(resulet).toBeUndefined();
  });
  test('新增', () => {
    let rMap = reactive(new Map<any, any>([
      ['r', { a: '1' }],
      ['test', 'test']
    ]));
    let loopCount = 0;
    effect(function () {
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
    let rMap = reactive(new Map<any, any>([
      ['r', { a: '1' }],
      ['test', 'test']
    ]));
    let loopCount = 0;
    effect(function () {
      for (const [key] of rMap.keys()) {
        loopCount++;
      }
    });
    rMap.set('test', 'test1');
    expect(loopCount).toBe(2);
  });
});




