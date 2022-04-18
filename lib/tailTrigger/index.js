export default function tailTrigger (data) {s
    if (!data.index) data.index = 0;
    if (data.index === data.domList.length) {
        if (typeof data.lastFunction === 'function') data.lastFunction();
        return
    }
    if (!data.timeList[data.index]) data.timeList[data.index] = data.defaultTime;
    setTimeout(() => {
        data.props.forEach((item, i) => {
            data.domList[data.index].style[item] = data.params[i];
        });
        data.index++;
        this.tailTrigger(data);
    }, data.timeList[data.index]);
}

//data格式
// let data = {
//     domList: document.querySelectorAll('.item'),
//     timeList: [],
//     props: ['transform', 'opacity'],
//     params: ['translate(0px,0px)', 1],
//     defaultTime: 1000,
//     lastFunction: () => {
//         this.isAnimate = false;
//         this.isAnimated = {['page' + this.order]: true};
//     }
// }