function request(url) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {console.log(url);resolve()}, 1000)
    })
}

// then 有Rromise接收Promise, 没有就接收上面返回的then返回的东西
request('url1')
    .then((response) => { return request('url2');})
    .then((response) => { return 2222222;})
    .then((response) => {console.log(response);});


