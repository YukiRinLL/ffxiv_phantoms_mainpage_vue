// FFXIV 天气系统常量配置
export const WEATHER_CONFIG = {
    // 艾欧泽亚时间与现实时间比例 (1 ET = 175 秒现实时间)
    EORZEAN_TIME_RATIO: 175,

    // 天气周期持续时间 (8 ET小时 = 1400现实秒)
    WEATHER_CYCLE_DURATION: 8 * 175 * 1000, // 毫秒

    // 地区分组
    REGIONS: [
        {
            name: "拉诺西亚",
            locations: [
                "利姆萨·罗敏萨上层甲板",
                "中拉诺西亚",
                "拉诺西亚低地",
                "东拉诺西亚",
                "西拉诺西亚",
                "拉诺西亚高地",
                "拉诺西亚外地",
                "狼狱停船场",
                "海雾村"
            ]
        },
        {
            name: "黑衣森林",
            locations: [
                "格里达尼亚新街",
                "黑衣森林中央林区",
                "黑衣森林东部林区",
                "黑衣森林南部林区",
                "黑衣森林北部林区",
                "薰衣草苗圃"
            ]
        },
        // 其他地区...
    ],

    // 天气图标映射
    WEATHER_ICONS: {
        "碧空": {
            class: "weather-fair",
            url: "https://huiji-public.huijistatic.com/ff14/uploads/f/f6/060201.png"
        },
        "晴朗": {
            class: "weather-clear",
            url: "https://huiji-public.huijistatic.com/ff14/uploads/d/de/060202.png"
        },
        "阴云": {
            class: "weather-clouds",
            url: "https://huiji-public.huijistatic.com/ff14/uploads/3/33/060203.png"
        },
        "薄雾": {
            class: "weather-fog",
            url: "https://huiji-public.huijistatic.com/ff14/uploads/6/63/060204.png"
        },
        "微风": {
            class: "weather-wind",
            url: "https://huiji-public.huijistatic.com/ff14/uploads/6/6c/060205.png"
        },
        "强风": {
            class: "weather-gales",
            url: "https://huiji-public.huijistatic.com/ff14/uploads/1/19/060206.png"
        },
        "小雨": {
            class: "weather-rain",
            url: "https://huiji-public.huijistatic.com/ff14/uploads/9/9a/060207.png"
        },
        "暴雨": {
            class: "weather-showers",
            url: "https://huiji-public.huijistatic.com/ff14/uploads/9/96/060208.png"
        },
        "打雷": {
            class: "weather-thunder",
            url: "https://huiji-public.huijistatic.com/ff14/uploads/d/d5/060209.png"
        },
        "雷雨": {
            class: "weather-thunderstorms",
            url: "https://huiji-public.huijistatic.com/ff14/uploads/d/db/060210.png"
        },
        "扬沙": {
            class: "weather-dust-storms",
            url: "https://huiji-public.huijistatic.com/ff14/uploads/3/32/060211.png"
        },
        "热浪": {
            class: "weather-heat-waves",
            url: "https://huiji-public.huijistatic.com/ff14/uploads/6/6c/060214.png"
        },
        "小雪": {
            class: "weather-snow",
            url: "https://huiji-public.huijistatic.com/ff14/uploads/6/6e/060215.png"
        },
        "暴雪": {
            class: "weather-blizzards",
            url: "https://huiji-public.huijistatic.com/ff14/uploads/9/9a/060216.png"
        },
        "妖雾": {
            class: "weather-umbral-wind",
            url: "https://huiji-public.huijistatic.com/ff14/uploads/2/21/060218.png"
        },
        "灵电": {
            class: "weather-umbral-static",
            url: "https://huiji-public.huijistatic.com/ff14/uploads/2/23/060220.png"
        },
        "灵风": {
            class: "weather-umbral-dynamic",
            url: "https://huiji-public.huijistatic.com/ff14/uploads/1/19/060219.png"
        },
        "月尘": {
            class: "weather-moon-dust",
            url: "https://huiji-public.huijistatic.com/ff14/uploads/8/89/060222.png"
        },
        "磁暴": {
            class: "weather-astromagnetic-storm",
            url: "https://huiji-public.huijistatic.com/ff14/uploads/c/ca/060223.png"
        }
    }
}

// 时间格式化选项
export const TIME_FORMATS = {
    eorzean: {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    },
    local: {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    },
    server: {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
        timeZone: 'UTC'
    }
}