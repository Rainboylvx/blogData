```bash
# 转换视频格式
ffmpeg -i test.avi test.mp4

ffmpeg -i test.avi -c:v [video encoder] test.mp4

# 默认提贡的编码
ffmpeg -i test.avi -c:v libx264 test.mp4
# 如果使用的nvida显示 ,可以硬件加速
ffmpeg -i test.avi -c:v h264_nvenc  test.mp4

# 转换音频格式
ffmpeg -i sound.wav sound.mp3


ffmpeg -i test.avi -c:v libx264 -preset [xxx] test.mp4
# 编码速度,-> 文件大小 - 编码时间 反比
ultrafast
superfast
verfast
faster
medium
slow
slower
veryslow

-crf 控制图像质量 0-51 越大越差,文件越小

-filter 过滤器,可以管道
-vf "scale=1024:576" 指定视频尺寸
-vf "scale=1024:-1"  -1 表示自动推算,等比例
-vf "scale=1024:-2"  -2 表示推算偶数,
-vf "scale=-1:720"  表示 转成 720p

# 旋转视频
-vf "transpose=2"
具体去文档 : https://ffmpeg,org.ffmpeg-filters.html#toc-transpose-1

-vf "scale=256:256,transpose=1" 组合

裁剪
crop=400:400:100:100
crop=w:h:x:y

也可以是一个表达式
crop=iw/3:ih/3
iw -> input width
```

## 什么是视频格式

格式 -> container
编码

- h265 有更高的压缩率
- vp9

## 剪切与合并

剪切

需要放到`-i`参数的后面
- 起始参数:`-ss 00:00:03`
- 结束参数:`-t 00:00:05` 或`-t 5`

合并

把所有的文件放在一个文件内

```plaintext
file 'clip1.mp4'
file 'clip2.mp4'
file 'clip3.mp4'
file 'clip3.mp4'
```
```bash
ffmpeg -f concat -i mylist.txt -c copy output.mp4
```

## 音频过滤器

```plaintext
-af "volume=1.5" 音量大小
loundnorm 统一视频的音量
```

创建一个无声的视频,删除视频的音轨

```bash
-an 删除音轨
-vn 删除视频轨
-sn 删除字幕轨
-dn 删除数据流
```

## 其它技巧

创建视频缩略图

```bash
ffmpeg -i test.mp4 -vf "fps=1/10,scale=-2:720" thumbnail-%03d.jpg
```

添加水印

```bash
ffmpeg -i test.mp4 -i cat.jpg -filter_complex "overlay=100:100" output.mp4
```

屏幕录制

## 资源


- 【FFmpeg 最最强大的视频工具 (转码/压缩/剪辑/滤镜/水印/录屏/Gif/...)-哔哩哔哩】 https://b23.tv/bsNvLCe
- 【【FFmpeg 分P教学】转码、压制、录屏、裁切、合并、提取 … 统统不是问题。-哔哩哔哩】 https://b23.tv/IHcKZqu
