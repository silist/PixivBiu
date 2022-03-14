// 获取版本号
function getVersion() {
    $.ajax({
        type: "GET",
        url: 'api/biu/get/outdated/',
        success: function (rep) {
            rep = jQuery.parseJSON(JSON.stringify(rep));
            if (rep.code) {
                if (rep.msg.latest) {
                    $('#hint-current-verson').html(rep.msg.current);
                }
            }
        },
        error: function (e) {
            console.log(e);
        }
    });
}

// 检测更新
function checkOutdated() {
    $('#btnCheckUP').tooltipster('content', '检测中...');
    $.ajax({
        type: "GET",
        url: 'api/biu/get/outdated/',
        success: function (rep) {
            rep = jQuery.parseJSON(JSON.stringify(rep));
            if (rep.code) {
                if (rep.msg.latest) {
                    $('#btnCheckUP').tooltipster('content', '哇哦，这就是最新版本哦');
                } else {
                    $('#btnCheckUP').attr('onclick', 'javascript: window.open("https://biu.tls.moe/", "_blank")');
                    $('#btnCheckUP').html("可以更新啦");
                    $('#btnCheckUP').tooltipster('content', '有新版本了，点击进入官网下载');
                }
            }
        },
        error: function (e) {
            console.log(e);
        }
    });
}

// 结果 HTML 内容加载
function btnGetHTML(type) {
    if (type === 'none') {
        return '<article class="thumb"><a href="./" class="imageBtn"><img src="static/multiverse/images/tea.jpg" alt="无"" /></a><h2>什么都没有找到...</h2><p>这里什么都没有哦~</p></article>';
    }
}

// 获取 get 内容
function getGetArg(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable) { return pair[1]; }
    }
    return false;
}

// 修改搜索框内容
function changeSrhBox(c, is = 1) {
    if (c !== '') {
        $('#srhBox').val(c);
        srhBoxStu();
    }
    if (is > 0) {
        $('.poptrox-popup').trigger('poptrox_close');
        $(window).scrollTop(0);
        $('#srhBox').focus();
        if (is > 1 && $('#srhBox').val() !== '') {
            srhBoxDo();
        }
    }
}

// tooltip 初始化
function loadTooltip(c = '.tooltip') {
    $(c).tooltipster({
        debug: false,
        trigger: 'custom',
        triggerOpen: {
            mouseenter: true,
            click: true,
            touchstart: true,
            tap: true
        },
        triggerClose: {
            mouseleave: true,
            scroll: true,
            touchleave: true,
            tap: true
        },
        theme: 'tooltipster-noir',
        animation: 'fade',
        animationDuration: 250,
        arrow: false,
        delay: 200,
    });
}

// 搜索设置显示动画
// function isShowSettings() {
//     if ($('#settings').css('display') === 'none') {
//         $('#main').addClass('aniMoveDown');
//         $('#settings').css('z-index', '999');
//         $('#settings').delay(300).fadeIn();
//     } else {
//         $('#settings').fadeOut(300);
//         $('#settings').css('z-index', '-999');
//         $('#main').removeClass('aniMoveDown');
//     }
// }

// 搜索动画
function cssShowLoading() {
    $('#settings').fadeOut(200);
    $('#settings').css('z-index', '-999');
    $('#main').removeClass('aniMoveDown');
    $('body').addClass('is-preload');
}

// 正则匹配
function regMatch(regex, str) {
    r = []
    while ((m = regex.exec(str)) !== null) {
        if (m.index === regex.lastIndex) {
            regex.lastIndex++;
        }
        m.forEach((match, groupIndex) => {
            r[groupIndex] = match;
        });
    }
    return r;
}

// 下载全部图片
function dlPageAll() {
    if (confirm("你确定要一下子下载全部的图片嘛？！还是原图哎...\n其实点击图片右上角也可以下载。"))
        $('.thumbAction').each(function () {
            if ($(this).children('a:last')[0]['target'] !== '_blank') {
                $(this).children('a:last')[0].click();
            }
        });
}

// 切换面板
function togglePanel(id) {
    function toggleClassActive(_, className = "active") {
        if (_) {
            if (_.attr("class") && _.attr("class").includes(className))
                _.removeClass(className);
            else
                _.addClass(className);
        }
    }
    toggleClassActive($(id));
    // toggleClassActive($("body"), "content-active");
}

// 分割并排除空白项
function splitNoEmpty(c, symbol) {
    let r = [];
    const li = c.replace(" ", "").split(symbol);
    for (let i = 0; i < li.length; i++) {
        if (li[i])
            r.push(li[i])
    }
    return r;
}