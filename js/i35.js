~(function ($, window, document, undefined) {
    // 传递 $, window, document 提高访问速度，传递 undefined 防止被外部修改掉
    const Tab = function (eles, opts) {
        // eles => jQuery 对象
        // opts => 自定义参数
        // 传过来的 jQuery 对象
        this.$elements = eles;
        // 定时器
        this.timer = null;
        // 外包裹
        this.$wrap = $("<div id='i35-wrap'>");
        // 防止 opts 不传报错
        opts = opts || {};
        // 默认配置
        this.defaults = {
            titles: ["News", "Sports", "Education"],
            contents: ["News con...", "Sports con...", "Education ..."],
            eventType: "click",
            delayTime: 0,
            color: "#6341a5",
            effect: "default",
            autoPlay: false,
            prevChange: function () { },
            nextChange: function () { },
            styles: {
                wrap: { display: "inline-block", verticalAlign: "top", border: "1px solid #dbdbdb", boxShadow: "rgb(164, 160, 157) 1px 1px 9px -3px" },
                title: { listStyle: "none", display: "flex", margin: 0, padding: 0, borderBottom: "2px solid " + (opts.color || "#6341a5") },
                titleItem: { flex: 1, cursor: "pointer", padding: "10px 30px", color: "#333", "white-space": "nowrap" },
                titleItemFirst: { marginLeft: 0, "backgroundColor": opts.color || "#6341a5", "color": "#fff" },
                content: {},
                contentItem: { display: "none", padding: "20px" },
                contentItemFirst: { display: "block" }
            }
        };
        // 不要覆盖默认参数 this.defaults，后续可能会用到
        this.options = $.extend(true, {}, this.defaults, opts);
    };
    Tab.prototype = {
        constructor: Tab,
        init: function () {
            // 创建元素
            this.createEle();
            // 绑定事件
            this.bindEvent();
            // 切换功能
            this.changeTab();
            // 默认样式
            this.defaultStyle();
            // 自动播放
            this.options.autoPlay && this.autoPlay();
        },
        defaultStyle: function () {
            const { wrap, title, titleItem, titleItemFirst, content, contentItem, contentItemFirst } = this.options.styles;
            // 外包裹
            this.$wrap.css(wrap)
            // 标题包裹
            this.$wrap.find(".i35-title").css(title)
            // 标题
            this.$wrap.find(".i35-title li").css(titleItem);
            // 第一个标题
            this.$wrap.find(".i35-title li").eq(0).css(titleItemFirst);
            // 内容包裹
            this.$wrap.find(".i35-con").css(content);
            // 内容
            this.$wrap.find(".i35-con div").css(contentItem);
            // 第一个内容
            this.$wrap.find(".i35-con div").eq(0).css(contentItemFirst);
        },
        bindEvent: function () {
            // 防止 this.$elements 中添加多个重复触发，要绑定在 this.$wrap 上
            this.$wrap.on("prevChange", this.options.prevChange);
            this.$wrap.on("nextChange", this.options.nextChange);
        },
        createEle: function () {
            // 创建标题
            let $ul = $("<ul class='i35-title'>");
            $.each(this.options.titles, function (idx, data) {
                $ul.append($("<li>" + data + "</li>"));
            });
            this.$wrap.append($ul);
            this.$titles = $ul.find("li");

            // 创建内容
            let $div = $("<div class='i35-con'>");
            $.each(this.options.contents, function (idx, data) {
                $div.append($("<div>" + data + "</div>"));
            });
            this.$wrap.append($div);
            this.$contents = $div.find("div");

            // 添加
            this.$elements.append(this.$wrap);
        },
        changeTab: function () {
            let timer = null, _this = this;
            // 改成bind
            this.$titles.on(this.options.eventType, function (ele) {
                // ele 是 jQuery 元素
                // this 是原生
                _this.iNum = $(this).index();
                if (_this.options.eventType === "mouseover") {
                    clearInterval(timer);
                    timer = setTimeout(() => {
                        _changeTab(_this, $(this).index());
                    }, _this.options.delayTime);
                } else {
                    _changeTab(_this, $(this).index());
                }
            });
        },
        autoPlay: function () {
            this.iNum = 0;
            _autoPlay(this);
            this.$wrap.hover(function () {
                clearInterval(this.timer);
            }.bind(this), function () {
                _autoPlay(this);
            }.bind(this));
        }
    };
    function _autoPlay(_this) {
        _this.timer = setInterval(function () {
            _this.iNum++;
            if (_this.iNum === _this.$titles.length) {
                _this.iNum = 0;
            }
            _changeTab(_this, _this.iNum);
        }.bind(_this), _this.options.autoPlay);
    }
    function _changeTab(_this, idx) {
        // 切换前
        _this.$wrap.trigger("prevChange");
        // $(nowThis).css({"backgroundColor": _this.options.color, "color": "#fff"}).siblings().css({"background": "", "color": "#333"}).parents("#i35-wrap").find(".i35-con div").eq(idx).show().siblings().hide();
        // 标题
        _this.$wrap.find(".i35-title li").eq(idx).css({ "backgroundColor": _this.options.color, "color": "#fff" }).siblings().css({ "background": "", "color": "#333" });
        // 内容
        const thisCon = _this.$wrap.find(".i35-con div").eq(idx);
        switch (_this.options.effect) {
            case "slide":
                thisCon.stop().slideDown().siblings().stop().slideUp();
                break;
            case "fade":
                thisCon.stop().fadeIn().siblings().stop().fadeOut();
                break;
            default:
                thisCon.show().siblings().hide();
        }
        // 切换后
        _this.$wrap.trigger("nextChange");
    }
    $.fn.i35Tab = function (options) {
        // this => 选中的 jQuery 元素
        const tab = new Tab(this, options);
        tab.init();
    };
})(jQuery, window, document);