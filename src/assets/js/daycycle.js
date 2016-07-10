var timesArr = getDefaultTimesArr(),
    nowDate = new Date(),
    now = nowDate.getTime(),
    daycycleKeyframesRule = getKeyframesRule('daycycle'),
    midnightDate = new Date(now),
    midnight;
midnightDate.setHours(0);
midnightDate.setMinutes(0);
midnightDate.setSeconds(0);
midnightDate.setMilliseconds(0);
midnight = midnightDate.getTime();

// timesArr = getTimeAdjustedTimesArr(timesArr);
writeNowTimeOffset();

writeNewKeyframeRules(timesArr, daycycleKeyframesRule);

if ("geolocation" in navigator) {
    var daycycleKeyframesRule = getKeyframesRule('daycycle');
    navigator.geolocation.getCurrentPosition(function(position) {
        var solarTimes = SunCalc.getTimes(nowDate, position.coords.latitude, position.coords.longitude),
            solarMidnight = solarTimes.solarNoon.getTime() - (12 * 60 * 60 * 1000),
            sunrise = solarTimes.sunrise.getTime(),
            sunset = solarTimes.sunset.getTime();
        timesMap = arrayToMap(timesArr);
        timesMap.sunrise.start = (sunrise - solarMidnight) / (24 * 60 * 60 * 1000);
        timesMap.sunset.start = (sunset - solarMidnight) / (24 * 60 * 60 * 1000);
        writeNowTimeOffset(solarMidnight);
        writeNewKeyframeRules(timesArr, daycycleKeyframesRule);
    });
}
function getDefaultTimesArr() {
    return [
        {
            key: 'midnight',
            start: 0,
            // duration: 0.2,
            position: 0
        },
        {
            key: 'sunrise',
            start: 0.25,
            // duration: 0.3,
            position: 0.2
        },
        {
            key: 'noon',
            start: 0.5,
            // duration: 0.3,
            position: 0.5
        },
        {
            key: 'sunset',
            start: 0.75,
            // duration: 0.2,
            position: 0.2
        }
    ];
}
function getRuleFromTime(time) {
    var rule = '';
    rule += getPercentFormat(time.start) +
        '{background-position: 50% ' +
        getPercentFormat(time.position) +
        ';}';
    return rule;
}
function deleteKeyframesRules(keyframesRule) {
    var rules = keyframesRule.cssRules;
    for (var i = rules.length - 1; i >= 0; i++) {
        keyframesRule.deleteRule(i);
    }
}
function writeNewKeyframeRules(timesArr, keyframesRule) {
    for (var i = 0; i < timesArr.length; i++) {
        var time = timesArr[i];
        keyframesRule.appendRule(getRuleFromTime(time));
    }
    keyframesRule.appendRule(getRuleFromTime({
        key: 'nextMidnight',
        start: 1,
        position: timesArr[0].position
    }));
}
function getLocationAdjustedTimesArr(timesArr) {
    return timesArr;
}
function writeNowTimeOffset(localMidnight) {
    var rule = getStyleRule('.daycycle');
    var localMidnight = typeof localMidnight == 'undefined' ? midnight : localMidnight;
    rule.style.animationDelay = -1 * parseInt((now - localMidnight) / 1000, 10) + 's';
}
function arrayToMap(array) {
    return array.reduce(
        function(prev, curr) {
            prev[curr.key] = curr;
            return prev;
        }, {}
    );
}
function getPercentFormat(number) {
    return parseInt(number * 10000, 10) / 100 + "%";
}
function getKeyframesRule(rule) {
    var ss = document.styleSheets;
    for (var i = 0; i < ss.length; ++i) {
        for (var j = 0; j < ss[i].cssRules.length; ++j) {
            if (ss[i].cssRules[j].type == window.CSSRule.WEBKIT_KEYFRAMES_RULE &&
            ss[i].cssRules[j].name == rule) {
                return ss[i].cssRules[j];
            }
        }
    }
    return null;
}
function getStyleRule(selector) {
    var ss = document.styleSheets;
    for (var i = 0; i < ss.length; ++i) {
        for (var j = 0; j < ss[i].cssRules.length; ++j) {
            if (ss[i].cssRules[j].type == window.CSSRule.STYLE_RULE &&
            ss[i].cssRules[j].selectorText == selector) {
                return ss[i].cssRules[j];
            }
        }
    }
    return null;
}