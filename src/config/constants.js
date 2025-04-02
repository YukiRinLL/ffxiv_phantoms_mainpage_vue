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
        "碧空": "weather-fair",
        "晴朗": "weather-clear",
        "阴云": "weather-clouds",
        "薄雾": "weather-fog",
        "小雨": "weather-rain",
        "暴雨": "weather-showers",
        "微风": "weather-wind",
        "强风": "weather-gales",
        "打雷": "weather-thunder",
        "雷雨": "weather-thunderstorms",
        "扬沙": "weather-dust-storms",
        "热浪": "weather-heat-waves",
        "小雪": "weather-snow",
        "暴雪": "weather-blizzards",
        "妖雾": "weather-umbral-wind",
        "灵电": "weather-umbral-static",
        "灵风": "weather-umbral-dynamic",
        "月尘": "weather-moon-dust",
        "磁暴": "weather-astromagnetic-storm"
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
    }
}