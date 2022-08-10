---
_id: Hy1rZZHAX
title: winston学习笔记
date: 2018-11-23 12:25
update: 2018-11-23 12:25
series: 无
categories:
    - 学习笔记
tags:
    - node
    - 日志
---

## 介级

**什么是winston?**

winston是一个基于**node**的轻量的日志管理组件包.[winston github地址](https://github.com/winstonjs/winston)

[这里是我练习winston的地址](https://github.com/rainboy-learn/winston)


## 入门

最简单的创建logger的方式是使用`winston.createLogger`


```javascript
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    //
    // - Write to all logs with level `info` and below to `combined.log`
    // - 所有等级<=info的日志写入到 combined.log 里
    // - Write all logs error (and below) to `error.log`.
    // - 所有等级 <= error 的写入到 error.log里
    //
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple()
  }));
}
```

 - 在使用`winston.createLogger`时,可以指定参数:`transports`(输出功能,输出到哪里)
 - 可以使用`add`函数,动态增加`transports`


## 功能目录

* [输出日志](#logging)
  * [创建你的logger](#creating-your-own-logger)
  * [流,对象模式,info对象](#streams-objectmode-and-info-objects)
* [格式化]
  * [组合 格式](#combining-formats)
  * [字符串格式化/改写](#string-interpolation)
  * [过滤`info`对象](#filtering-info-objects)
  * [创建定制的格式化](#creating-custom-formats)
* [日志等级]
  * [使用日志等级](#using-logging-levels)
  * [拼合定制的日志等级](#using-custom-logging-levels)
* [输出]
  * [同类型的多个输出](#multiple-transports-of-the-same-type)
  * [加入定制的输出](#adding-custom-transports)
* [异常](#exceptions)
  * [用winston处理没有捕获的异常](#handling-uncaught-exceptions-with-winston)
  * [退出或者没有退出](#to-exit-or-not-to-exit)
* [性能分析](#profiling)
* [Streaming Logs](#streaming-logs)
* [Querying Logs](#querying-logs)
* [Further Reading](#further-reading)
  * [Using the default logger](#using-the-default-logger)
  * [Awaiting logs to be written in `winston`](#awaiting-logs-to-be-written-in-winston)
  * [Working with multiple Loggers in `winston`](#working-with-multiple-loggers-in-winston)
* [Installation](#installation)
* [Run Tests](#run-tests)

## 日志

**定制的日志等级**

```javascript
const levels = {
  error: 0,
  warn: 1,
  info: 2,
  verbose: 3,
  debug: 4,
  silly: 5
};
```
**创建自己的logger**,使用`winston.createLogger`

```javascript
const logger = winston.createLogger({
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});
```

它接受下面的参数:

| Name          | Default                     | Description                                   |
| ------------- | ----------------------      | ---------------                               |
| `level`       | `'info'`                    | 输出比之个等级小于等于的信息                  |
| `levels`      | `winston.config.npm.levels` | 等级(还有颜色)代表日志的优先级                |
| `format`      | `winston.format.json`       | 格式化日志信息(see: [Formats])                |
| `transports`  | `[]` _(No transports)_      | 设定日志输出的地方                            |
| `exitOnError` | `true`                      | 如果为 false, 处理异常不会引起 `process.exit` |
| `silent`      | `false`                     | 如果为true,所有的日志都不会输出               |

在`createLogger`里的`levels`,会被定义成一个便捷的method在`logger`上.

```javascript
//
// Logging
//
logger.log({
  level: 'info',
  message: 'Hello distributed log files!'
});

logger.info('Hello again distributed logs');
```

在通过`createLogger`创建`logger`后,你可以**添加**或**删除**`transports`

```javascript
const files = new winston.transports.File({ filename: 'combined.log' });
const console = new winston.transports.Console();

logger
  .clear()          // Remove all transports
  .add(console)     // Add console transport
  .add(files)       // Add file transport
  .remove(console); // Remove console transport
```

你也可以大规模的重新配置`logger`,通过使用`configure`方法

```javascript
const logger = winston.createLogger({
  level: 'info',
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});

//
// Replaces the previous transports with those in the
// new configuration wholesale.
//
const DailyRotateFile = require('winston-daily-rotate-file');
logger.configure({
  level: 'verbose',
  transports: [
    new DailyRotateFile(opts)
  ]
});
```

## 流, 对象模式,`info`对象

在`winston`中,`logger`和`transport`被当成一个可以接受`info`对像的`objectMode`模式的流,`info`对象代表一条单独的日志信息,`info`对象必须至少有`level`和`message`两属性

ps.有关node的stream,[看这篇文章](https://www.jianshu.com/p/2c76ef653af6)

```javascript
{
  level: 'info',                 // Level of the logging message
  message: 'Hey! Log something?' // Descriptive message being logged.
}
```

`winston.format`使之暴露了一些额外的属性

 - `splat`:字符串,插值到`%d,%s`这个类型的信息上
 - `timestamp`:接收时的时间戳
 - `lable`:定制的标签绑定到每条信息上

(???)As a consumer you may add whatever properties you wish – internal state is maintained by Symbol properties:

- `Symbol.for('level')` (READ-ONLY): equal to level property. Is treated as immutable by all code.
- `Symbol.for('message')`: complete string message set by "finalizing formats": json, logstash, printf, prettyPrint, and simple.

## 格式化

通过`winston.format`来调用`format`函数,这一个单独的模块`logform`

通过使用`winston.format.printf`,来格式化输出字符串

```javascript
const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, printf } = format;

const myFormat = printf(info => {
  return `${info.timestamp} [${info.label}] ${info.level}: ${info.message}`;
});

const logger = createLogger({
  format: combine(
    label({ label: 'right meow!' }),
    timestamp(),
    myFormat
  ),
  transports: [new transports.Console()]
});
```
想学习更多的使用方法,查看[logform](https://github.com/winstonjs/logform)

### 拼合formats

使用`format.combine`可以把任意数量的`formats`拼合在一起

```javascript
const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, prettyPrint } = format;

const logger = createLogger({
  format: combine(
    label({ label: 'right meow!' }),
    timestamp(),
    prettyPrint()
  ),
  transports: [new transports.Console()]
})

logger.log({
  level: 'info',
  message: 'What time is the testing at?'
});
// Outputs:
// { level: 'info',
//   message: 'What time is the testing at?',
//   label: 'right meow!',
//   timestamp: '2017-09-30T03:57:26.875Z' }
```

### 字符串 添写

感觉这个没有什么用,可以直接把值`${value}`这种方法写入`message`中

### 过滤`info`对象

一个过虑的例子
```javascript
const { createLogger, format, transports } = require('winston');

// Ignore log messages if they have { private: true }
const ignorePrivate = format((info, opts) => {
  if (info.private) { return false; }
  return info;
});

const logger = createLogger({
  format: format.combine(
    ignorePrivate(),
    format.json()
  ),
  transports: [new transports.Console()]
});

// Outputs: {"level":"error","message":"Public error to share"}
logger.log({
  level: 'error',
  message: 'Public error to share'
});

// Messages with { private: true } will not be written when logged.
logger.log({
  private: true,
  level: 'error',
  message: 'This is super secret - hide it.'
});
```


如果返回了`false`,`format.combine`就会中断后面的格式化函数

```javascript
const { format } = require('winston');
const { combine, timestamp, label } = format;

const willNeverThrow = format.combine(
  format(info => { return false })(), // Ignores everything
  format(info => { throw new Error('Never reached') })()
);
```

### 创建定制的formats

`Format`这个类有一个方法:`transform(info,opts)`,而且它会返回一个修改后的`info`object,包含

 - info
 - `opts`

`transform(info,opts)`函数得到一个新的`Format`

```javascript
const { format } = require('winston');

const volume = format((info, opts) => {
  if (opts.yell) {
    info.message = info.message.toUpperCase();
  } else if (opts.whisper) {
    info.message = info.message.toLowerCase();
  }

  return info;
});

// `volume` is now a function that returns instances of the format.
const scream = volume({ yell: true });
console.dir(scream.transform({
  level: 'info',
  message: `sorry for making you YELL in your head!`
}, scream.options));
// {
//   level: 'info'
//   message: 'SORRY FOR MAKING YOU YELL IN YOUR HEAD!'
// }

// `volume` can be used multiple times to create different formats.
const whisper = volume({ whisper: true });
console.dir(whisper.transform({
  level: 'info',
  message: `WHY ARE THEY MAKING US YELL SO MUCH!`
}, whisper.options));
// {
//   level: 'info'
//   message: 'why are they making us yell so much!'
// }
```

理解,调用`const v = format((info,opts)=>{xxx})`,那么`v`是一个函数,它会反回一个`format`实例,它接收的一个`opts`,来设定返回的`format`实例的`options`属性

`format.transform(info_obj,opts)`接收二个参数,返回处理过的`info`object

## logging 等级

`winston`如果没有指定`level`,下面的`npm`的`levels`会被使用
```javascript
{
  error: 0,
  warn: 1,
  info: 2,
  verbose: 3,
  debug: 4,
  silly: 5
}
```

### 使用logging等级

 - 方法1:使用`logger.log('info')`
 - 方法2:使用`logger.info()`

```javascript
//
// Any logger instance
//
logger.log('silly', "127.0.0.1 - there's no place like home");
logger.log('debug', "127.0.0.1 - there's no place like home");
logger.log('verbose', "127.0.0.1 - there's no place like home");
logger.log('info', "127.0.0.1 - there's no place like home");
logger.log('warn', "127.0.0.1 - there's no place like home");
logger.log('error', "127.0.0.1 - there's no place like home");
logger.info("127.0.0.1 - there's no place like home");
logger.warn("127.0.0.1 - there's no place like home");
logger.error("127.0.0.1 - there's no place like home");

//
// Default logger
//
winston.log('info', "127.0.0.1 - there's no place like home");
winston.info("127.0.0.1 - there's no place like home");
```

`winston`可以自己定义一个`level`属性在每一个`transport`上,设定最大的输出等级,

```javascript
const logger = winston.createLogger({
  levels: winston.config.syslog.levels,
  transports: [
    new winston.transports.Console({ level: 'error' }),
    new winston.transports.File({
      filename: 'combined.log',
      level: 'info'
    })
  ]
});
```


动态改变`transport`中的`level`
```javascript
const transports = {
  console: new winston.transports.Console({ level: 'warn' }),
  file: new winston.transports.File({ filename: 'combined.log', level: 'error' })
};

const logger = winston.createLogger({
  transports: [
    transports.console,
    transports.file
  ]
});

logger.info('Will not be logged in either transport!');
transports.console.level = 'info';
transports.file.level = 'info';
logger.info('Will be logged in both transports!');
```

### 使用定制的`logging`等级

```javascript
const myCustomLevels = {
  levels: {
    foo: 0,
    bar: 1,
    baz: 2,
    foobar: 3
  },
  colors: {
    foo: 'blue',
    bar: 'green',
    baz: 'yellow',
    foobar: 'red'
  }
};

const customLevelLogger = winston.createLogger({ 
  levels: myCustomLevels.levels 
});

customLevelLogger.foobar('some foobar level-ed message');
```

### 使用标准的log level 有颜色

```javascript
winston.format.combine(
  winston.format.colorize(),
  winston.format.json()
);
```

## 输出

### 同类型的多个输出

```javascript
const logger = winston.createLogger({
  transports: [
    new winston.transports.File({
      filename: 'combined.log',
      level: 'info'
    }),
    new winston.transports.File({
      filename: 'errors.log',
      level: 'error'
    })
  ]
});
```

如果之后你想删除一个`transport`
```javascript
const combinedLogs = logger.transports.find(transport => {
  return transport.filename === 'combined.log'
});

logger.remove(combinedLogs);
```
### 加入定制的transport

```javascript
const Transport = require('winston-transport');
const util = require('util');

//
// Inherit from `winston-transport` so you can take advantage
// of the base functionality and `.exceptions.handle()`.
//
module.exports = class YourCustomTransport extends Transport {
  constructor(opts) {
    super(opts);
    //
    // Consume any custom options here. e.g.:
    // - Connection information for databases
    // - Authentication information for APIs (e.g. loggly, papertrail, 
    //   logentries, etc.).
    //
  }

  log(info, callback) {
    setImmediate(() => {
      this.emit('logged', info);
    });

    // Perform the writing to the remote service
    callback();
  }
};
```


## 异常

可以捕获`uncaughtException`事件
```javascript
const { createLogger, transports } = require('winston');

// Enable exception handling when you create your logger.
const logger = createLogger({
  transports: [
    new transports.File({ filename: 'combined.log' }) 
  ],
  exceptionHandlers: [
    new transports.File({ filename: 'exceptions.log' })
  ]
});

// Or enable it later on by adding a transport or using `.exceptions.handle`
const logger = createLogger({
  transports: [
    new transports.File({ filename: 'combined.log' }) 
  ]
});

// Call exceptions.handle with a transport to handle exceptions
logger.exceptions.handle(
  new transports.File({ filename: 'exceptions.log' })
);
```

**要不要退出**

```javascript
const logger = winston.createLogger({ exitOnError: false });

//
// or, like this:
//
logger.exitOnError = false;
```


## 按日期输出到单独的文件

使用[winston-daily-rotate-file](https://github.com/winstonjs/winston-daily-rotate-file)

样例:

```javascript
  var winston = require('winston');
  require('winston-daily-rotate-file');

  var transport = new (winston.transports.DailyRotateFile)({
    filename: 'application-%DATE%.log',
    datePattern: 'YYYY-MM-DD-HH',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '14d'
  });

  transport.on('rotate', function(oldFilename, newFilename) {
    // do something fun
  });

  var logger = winston.createLogger({
    transports: [
      transport
    ]
  });

  logger.info('Hello World!');
```


## 相关资料
 - [winston github地址](https://github.com/winstonjs/winston)
 - [pm2 cluster模式下，使用winston-daily-rotate-file](https://blog.csdn.net/Justinjiang1314/article/details/80619038)


