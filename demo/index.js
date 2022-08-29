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
        file:{
            vvs: document.querySelector('#file').files[0]
        }
    }).finally(function(res){
        console.log(res);
    });
}