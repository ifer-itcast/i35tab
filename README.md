# i35Tab

## 简介

基于 jQuery 的 Tab 选项卡，[预览](https://zhihur.com/resource/demos/demo03/index.html)

## 特点

简单！

## 使用

**第一步：引入依赖文件**

```javascript
// 引入基础依赖
<script src="./js/jquery-3.4.1.js"></script>
// 引入对应插件
<script src="./js/i35.min.js"></script>
```

**第二步：初始化代码**

```javascript
// 添加到 body 的最后
$("body").i35Tab();
```

## API

参数名 | 类型 | 是否必填 | 默认值 | 描述
-|  -  | - | - | -
titles | array | 否 | ["News", "Sports", "Education"] |标题
contents | array | 否 | ["News con...", "Sports con...", "Education ..."] |内容
eventType | string | 否 | click | 事件类型
delayTime | number | 否 | 0 | eventType 为 mouseover 时才生效，节流时间
color | string | 否 | #6341a5 | 主题颜色
effect | string | 否 | default | 默认普通的显示/隐藏；支持 slide、fade
autoPlay | boolean/number | 否 | false | 自动播放时间间隔
prevChange | function | 否 | function() {} | 切换之前触发的回调
nextChange | function | 否 | function() {} | 切换之后触发的回调
styles | object | 否 | ... | 所有的样式配置必须写在次对象下面
wrap | object | 否 | ... | 外包裹
title| object | 否 | ... | 标题包裹
titleItem| object | 否  | ... | 标题列表
titleItemFirst| object | 否 | ... | 第一个标题
content| object | 否 | ... | 内容包裹
contentItem| object | 否 | ... | 内容列表
contentItemFirst| object | 否 | ... | 第一个内容

## 效果预览

### 最基础使用

```javascript
<script src="./js/jquery-3.4.1.js"></script>
<script src="./js/i35.min.js"></script>
<script>
$('body').i35Tab();
</script>
```

[点我预览](https://zhihur.com/resource/demos/demo03/01_init.html)

### 改变触发事件

```javascript
// mouseover 时延迟 100ms 触发
$("body").i35Tab({
    eventType: "mouseover",
    delayTime: "100"
});
```

[点我预览](https://zhihur.com/resource/demos/demo03/02_mouseover.html)

### 改变主题

```javascript
$("body").i35Tab({
    color: "#e23839",
});
```

[点我预览](https://zhihur.com/resource/demos/demo03/03_theme.html)

### 改变切换效果

```javascript
$("body").i35Tab({
    effect: "slide"
});
```

[点我预览](https://zhihur.com/resource/demos/demo03/04_effect.html)

### 自动播放

```javascript
$("body").i35Tab({
    autoPlay: 2000
});
```

[点我预览](https://zhihur.com/resource/demos/demo03/05_autoplay.html)

### 事件回调

```javascript
$("body").i35Tab({
    prevChange: function(e) {
        console.log($(e.target).find(".i35-con div:visible").html());
    },
    nextChange: function(e) {
        console.log($(e.target).find(".i35-con div:visible").html());
    }
});
```

[点我预览](https://zhihur.com/resource/demos/demo03/06_callback.html)