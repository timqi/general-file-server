General-File-Server
=============

![logo](/____statics/logo.png)

This is a general file server made by [nodejs](http://nodejs.org). It will be easy for you to access the files on the server through the browser.

Install
=============

just use npm like:

```bash
# npm install -g general-file-server
```

And the server will be installed. run the command `gfs` to make it work with default configuration.

```bash
$ gfs
```

Customize
=============

Edit the **config.js** configure file to make the server to meet your needs. The file is in the folder of general-file-server node_modules. It is usually in the path of `/usr/local/lib/node_modules/general-file-server/`

```javascript
module.exports = {
    hostname: '192.168.1.110',       // hostname
    port: 1234,                      // port
    root_path: "/",                  // root_path to serve on your file system 
    title: "General File Server",    // title in the page
    logo_link: "/____statics/logo.png"  // href link of the logo
}
```

![example](/____statics/example.png)

As you can see, there are five options you can modify. In particular, the `____statics` folder in the root of general-file-server module is a always being served. you can put the static file like .css .js .png etc in it and files can be accessed with href like */____statics/\*.css* or */____statics/\*.js* or */____statics/\*.png*

License
=============

The MIT License (MIT)

    Copyright (c) <year> <copyright holders>

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
