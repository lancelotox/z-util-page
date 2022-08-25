function doing() {
    ZUtilPages.chooseFile({
        accept: ".doc,.docx,application/msword",
        capture: "user",
        multiple: true
    }, function (files) {
        ZUtilPages.readFile(files[0]).progress(function (res) {
            console.log(res);
        }).error(function(err){
            console.log(err);
        }).start('Text');
    });
}
