var config = require('./config.js')
    fs = require('fs')
    url = require('url')
    jade = require('jade')
    mime = require('mime')
    async = require('async')
    root_path = config.root_path

function endupwith404(res) {
    res.writeHeader(404, {
            'Content-Type': 'text/plain'
        })
    return res.end('404 Not Found!');
}

function getDateAndSize(stats) {
    var size;
    if (stats.isDirectory()) {
        size = '-'
    } else {
        size = stats.size
        var sizeK = size / 1024;
        sizeK = sizeK.toFixed(3)
        if (sizeK > 1) {
            var sizeM = sizeK / 1204;
            sizeM = sizeM.toFixed(3)
            if (sizeM > 1) {
                size = sizeM + 'M'
            } else {
                size = sizeK + 'K'
            }
        } else {
            size = size+'B';
        }
    }

    var date = stats.mtime
        year = date.getFullYear()
        month = date.getMonth()+1
        month = month < 10? '0'+month : month
        day = date.getDate()
        day = day < 10? '0'+day : day

        hour = date.getHours()
        hour = hour < 10? '0'+hour : hour
        min = date.getMinutes()
        min = min < 10? '0'+min : min
        sec = date.getSeconds()
        sec = sec < 10? '0'+sec : sec

        dateStr = hour+':'+min+':'+sec+' '+year+'-'+month+'-'+day

    return {
        size: size,
        date: dateStr
    }
}

if ('/' == root_path.charAt(root_path.length-1)) {
    root_path = root_path.slice(0, root_path.length-2)
}

require('http').createServer(function (req, res) {

    var pathname = url.parse(req.url).pathname
        currpath = root_path + pathname

    fs.exists(currpath, function (exists) {
        if (exists) {
            fs.stat(currpath, function (err, stats) {
                if (err) {
                    endupwith404(res)
                } else {
                    if (stats.isFile()) {

                        res.writeHeader(200, {
                            'Content-Type': mime.lookup(currpath)
                        })
                        fs.createReadStream(root_path + pathname).pipe(res);
                    } else if (stats.isDirectory()) {

                        res.writeHeader(200, {
                            'Content-Type': 'text/html'
                        })
                        fs.readdir(currpath, function (err, files) {

                            var files_path = []
                            for (var i = 0; i < files.length; i++) {
                                files_path[i] = currpath +'/'+ files[i];
                            }

                            async.map(files_path, fs.stat, function (err, results) {

                                var templateitems = []
                                if ('/' != pathname) {
                                    pathname = pathname + '/'
                                    templateitems[templateitems.length] = {
                                        filelink: '../',
                                        filepath: '..',
                                        mtime: '-',
                                        size: '-'
                                    }
                                }

                                for (var i = results.length -1; i > -1; i--) {
                                    var info = getDateAndSize(results[i])

                                    templateitems[templateitems.length] = {
                                        filelink: pathname+files[i],
                                        filepath: files[i],
                                        mtime: info.date,
                                        size: info.size
                                    }
                                }

                                return res.end(jade.compileFile('./template/index', {
                                        compileDebug: false,
                                        debug: false,
                                        cache: false
                                    })({
                                        template: {
                                            title: config.title,
                                            logo_link: config.logo_link,
                                            cpath: pathname,
                                            items: templateitems
                                    }}))
                            })
                        })

                    }
                }
            })
        } else {
            endupwith404(res);
        }
    })
}).listen(config.port)
