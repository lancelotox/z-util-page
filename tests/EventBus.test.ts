import { EventBus } from "../src/eventBus";

describe('新建事件总线', () => {

  test('总线注册事件执行事件', () => {
    let count = 0;

    EventBus.on('test', function (num, num1) {
      count = num + num1;
    })

    EventBus.emit('test', 1, 2);

    expect(count).toBe(3);
  });

  test('分线注册事件执行事件', () => {

    const bus = new EventBus();

    let count = 0;

    bus.on('test', function (num, num1) {
      count = num + num1;
    })

    bus.emit('test', 1, 2);

    expect(count).toBe(3);
  });

  test('总线分线事件互不干扰', () => {

    class Test extends EventBus{
      constructor() {
        super();
      }
    }

    class Test1 extends EventBus{
      constructor() {
        super();
      }
    }

    const bus = new EventBus();
    const bus1 = new EventBus();
    const test = new Test();
    const test1 = new Test1();

    let count = 0;
    let countSon = 0;
    let countSon1 = 0;
    let countTest = 0;
    let countTest1 = 0;

    EventBus.on('test', function (num) {
      count += num;
    })

    bus.on('test', function (num) {
      countSon += num;
    })

    bus1.on('test', function (num) {
      countSon1 += num;
    })

    test.on('test', function (num) {
      countTest += num;
    })

    test1.on('test', function (num) {
      countTest1 += num;
    })

    EventBus.emit('test', 1);
    
    bus.emit('test', 1);
    bus1.emit('test', 1);

    test.emit('test', 1);
    test1.emit('test', 1);

    expect(count + countSon + countSon1 + countTest + countTest1).toBe(5);
  });
})