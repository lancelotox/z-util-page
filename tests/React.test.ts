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
