function doing() {
    const url = ['/addModule', '/webserver/SisManager/index.html']
    const http = new ZUtilPages.Http({
        baseUrl: 'http://127.0.0.1:4000'
    });
    let res = http.ajaxAsync({
        url: '/',
        method: "POST",
        data: {
            'moduleName': '周峰',
            'moduleType': 'adb'
        },
        file:{
            vvs: document.querySelector('#file').files[0]
        },
        header:{
            token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0aW1lU3RhbXAiOjE2NjE1MDIxMzQxMDcsInVzZXJJZCI6IlpIT1VGRU5HIn0.731mP9r3OldhF3R8SFzrV7G8HC4rGcEg5FHPqzLO0MM',
            'Content-Type': 'multipart/form-data'
        }
    })
    return res;
}