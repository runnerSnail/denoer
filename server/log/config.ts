import { log } from "../dependcy/dep.ts";


function setTime(fmt): string {
    let date = new Date();
    var o = {
        "y+": date.getFullYear(),
        "M+": date.getMonth() + 1,                 //月份
        "d+": date.getDate(),                    //日
        "h+": date.getHours(),                   //小时
        "m+": date.getMinutes(),                 //分
        "s+": date.getSeconds(),                 //秒
        "q+": Math.floor((date.getMonth() + 3) / 3), //季度
        "S+": date.getMilliseconds()             //毫秒
    };
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            if (k == "y+") {
                fmt = fmt.replace(RegExp.$1, ("" + o[k]).substr(4 - RegExp.$1.length));
            }
            else if (k == "S+") {
                var lens = RegExp.$1.length;
                lens = lens == 1 ? 3 : lens;
                fmt = fmt.replace(RegExp.$1, ("00" + o[k]).substr(("" + o[k]).length - 1, lens));
            }
            else {
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            }
        }
    }
    return fmt;
}
export async function setLogger() {
    let logger;
    await log.setup({
        handlers: {
            console: new log.handlers.ConsoleHandler("DEBUG"),

            file: new log.handlers.FileHandler("DEBUG", {
                filename: "./log.txt",
                // you can change format of output message
                formatter: (logRecord): string =>
                    `${logRecord.levelName} ${setTime('yyyy-MM-dd hh:mm:ss')} ${logRecord.msg}`
            })
        },
        loggers: {
            // configure default logger available via short-hand methods above
            default: {
                level: "DEBUG",
                handlers: ["console", "file"]
            },

            tasks: {
                level: "ERROR",
                handlers: ["console"]
            }
        }
    });
    logger = log.getLogger();
    //   logger.debuger("xxx")
    return logger;
}