General-File-Server
=============

![logo](https://raw.githubusercontent.com/timqi/general-file-server/master/____statics/logo.png)

This is a general file server made by [nodejs](http://nodejs.org). It will be easy for you to access the files on the server through the browser.

Install
=============

just use npm like:

```bash
$ npm install -g general-file-server
```

And the server will be installed. run the command `gfs` to make it work with default configuration.

```bash
$ gfs
```

Customize
=============

Edit the **config.js** configure file to make the server meet your needs. The file is in the folder of general-file-server node_modules. It is usually in the path of 

    /usr/local/lib/node_modules/general-file-server/

```javascript
module.exports = {
    hostname: '192.168.1.110',       // hostname, or "abc.com"
    port: 1234,                      // port
    root_path: "/",                  // root_path to serve on your file system 
    title: "General File Server",    // title in the page
    logo_link: "/____statics/logo.png"  // href link of the logo
}
```

<br/>
As you can see, there are five options you can modify. In particular, the `____statics` folder in the root of general-file-server module is always being served. you can put the static file like .css .js .png etc in it and files can be accessed with href with */____statics/* prefix.

<br/>
When you put mouse on the link of the file. It will show a qrcode for you. So you can access the folder or download the file through your mobile devices easily.
<br/><br/>

![example](https://raw.githubusercontent.com/timqi/general-file-server/master/____statics/example.png)

Example
=============

You can use it as a " Android Distribution System"

![example1](https://raw.githubusercontent.com/timqi/general-file-server/master/____statics/example1.png)
<br/><br/>

Scan the qrcode to download the .apk package

<br/><br/>
![example2](https://raw.githubusercontent.com/timqi/general-file-server/master/____statics/example2.png)
<br/><br/>

If you are using this repo, Your `example` can be here. You should do something like:

* [fork](https://github.com/timqi/general-file-server) this repo
* add your `example`
* create a  [Pull Request](https://github.com/timqi/general-file-server/compare) 
* waiting to merge 


License
=============

The MIT License (MIT)

    Copyright (c) <2015> <Tim Qi>

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in
    all copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
    THE SOFTWARE.
