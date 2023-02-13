#!/usr/bin/env bash

filepath=$(cd "$(dirname "$0")"; pwd)
# export BLOG_ROOT="/home/rainboy/mycode/RainboyDefault/blogData/"
# export REQUEST_URI="%E8%AF%BB%E4%B9%A6%E7%AC%94%E8%AE%B0%2FTcpIp%E7%BD%91%E7%BB%9C%E7%BC%96%E7%A8%8B%2F01-%E7%90%86%E8%A7%A3%E7%BD%91%E7%BB%9C%E7%BC%96%E7%A8%8B%E5%92%8C%E5%A5%97%E6%8E%A5%E5%AD%97%2Freadme.md"
node $filepath/markdown_cgi.js
