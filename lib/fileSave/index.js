//url为资源链接或者blob对象
export default function fileSave(url, saveName, callback) {
    if(typeof url === 'object' && url instanceof Blob){
        url = URL.createObjectURL(url);
    }
    let alink = document.createElement('a');
    alink.href = url;
    alink.download = saveName || '';
    //过时写法
    // let event;
    // if(window.MouseEvent) event = new MouseEvent('click');
    // else {
    //     event = document.createEvent('MouseEvents');
    //     event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0 ,null)
    // }
    // alink.dispatchEvent(event);

    //h5新写法
    alink.click();
    if(callback && callback instanceof Function) callback();
}