#!/usr/bin/env node

var config = require('./config.js')
var fs = require('fs')
var url = require('url')
var jade = require('jade')
var mime = require('mime')
var async = require('async')
var root_path = config.root_path

function endupwith404(res) {
    res.writeHeader(404, {
            'Content-Type': 'text/plain'
        })
    return res.end('Not Found!');
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
    var year = date.getFullYear()
    var month = date.getMonth()+1
        month = month < 10? '0'+month : month
    var day = date.getDate()
        day = day < 10? '0'+day : day

    var hour = date.getHours()
        hour = hour < 10? '0'+hour : hour
    var min = date.getMinutes()
        min = min < 10? '0'+min : min
    var sec = date.getSeconds()
        sec = sec < 10? '0'+sec : sec

    var dateStr = hour+':'+min+':'+sec+' '+year+'-'+month+'-'+day

    return {
        size: size,
        date: dateStr
    }
}
function removetailslash(str) {
    if ('/' == str.charAt(str.length-1)) {
        return str.substr(0, str.length-1)
    }
    return str;
}

root_path = removetailslash(root_path)
require('http').createServer(function (req, res) {

    var pathnameencoded = url.parse(req.url).pathname
    if ('/' != pathnameencoded) {
        pathnameencoded = removetailslash(pathnameencoded)
    }
    var pathname = decodeURI(pathnameencoded)
    var currpath = root_path + pathname

    if (pathname.search('____statics') == 1) {
        currpath = __dirname + pathname

        fs.stat(currpath, function (err, stat) {
            if (err || stat.isDirectory()) {
                endupwith404(res)
            } else {
                res.writeHeader(200, {
                    'Content-Type': mime.lookup(currpath)
                })
                fs.createReadStream(currpath).pipe(res)
            }
        })
    }

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
                        fs.createReadStream(currpath).pipe(res);
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
                                    pathnameencoded = pathnameencoded + '/'
                                    templateitems[templateitems.length] = {
                                        filelink: '../',
                                        qrcodestring: '',
                                        filepath: '..',
                                        mtime: '-',
                                        size: '-'
                                    }
                                }

                                for (var i = results.length -1; i > -1; i--) {
                                    var info = getDateAndSize(results[i])

                                    templateitems[templateitems.length] = {
                                        filelink: pathname+files[i],
                                        qrcodestring: 'http://'+config.hostname+':'+config.port+pathnameencoded+'/'+encodeURIComponent(files[i]),
                                        filepath: files[i],
                                        mtime: info.date,
                                        size: info.size
                                    }
                                }

                                return res.end(jade.compileFile(__dirname+'/template/index', {
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
}).listen(config.port, config.hostname)
console.log('> serving "'+config.root_path+'" http://'+config.hostname+':'+config.port)
