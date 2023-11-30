import { EventBus } from "../ts/eventBus";

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

    const bus = new EventBus();

    let count = 0;

    EventBus.on('test', function (num) {
      count += num;
    })

    bus.on('test', function (num) {
      count += num;
    })

    bus.emit('test', 1);

    EventBus.emit('test', 1);

    expect(count).toBe(2);
  });
})