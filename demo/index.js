function doing() {
    const http = new ZUtilPages.Http({
        baseUrl: 'http://127.0.0.1:40800'
    });
    return http.ajax({
        url: '/login',
        method: "POST",
        data: {
            'moduleName': 'lancelot',
            'moduleType': 'man'
        },
        file: {
            vvs: document.querySelector('#file').files[0]
        }
    }).finally(function (res) {
        console.log(res);
    });
}

function mockFetch(fn) {
    setTimeout(() => {
        fn('请求成功');
    }, 1000);
}

function p() {
    let x = new ZUtilPages.ForkPromise(resolve => {
        mockFetch(function (res) {
            resolve(res);
        });
    }).then(function (res) {
        console.log(res);
        return new ZUtilPages.ForkPromise(resolve1 => {
            mockFetch(function (res1) {
                resolve1(res + res1);
            });
        })
    }).then(function(res){
        console.log(res);
        res.ajax();
    }).catch(function(err){
        console.log(err);
    });
}
function q() {
    // let Promise = ZUtilPages.ForkPromise;
    let x = new Promise((resolve, reject) => {
        mockFetch(function (res) {
            console.log(reject(res));
            console.log(resolve(res));
        });
    })
    x.then(function(res){
        console.log(x);
        // res.ajax();
    });
    x.catch(function(err){
        console.log(err);
        console.log(x);
    });
    
}
