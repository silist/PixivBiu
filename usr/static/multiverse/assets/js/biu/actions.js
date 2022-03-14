function searchForWorks(key, grpIdx = 0, isCache = 1, mode = tmpSearchSettings['pixivbiu_searchMode']) {
    cssShowLoading();
    setTimeout("progresserSearching('" + key + '_' + String(tmpSearchSettings['pixivbiu_searchPageNum']) + '+' + String(grpIdx) + "')", 200);
    if (mode !== 'tag' && mode !== 'otag' && mode !== 'des')
        mode = 'tag';
    $.ajax({
        type: "GET",
        url: "api/biu/search/works/",
        data: {
            'kt': key,
            'mode': mode,
            'totalPage': tmpSearchSettings['pixivbiu_searchPageNum'],
            'isCache': Number(isCache),
            'groupIndex': Number(grpIdx),
            'sortMode': String(tmpSearchSettings['pixivbiu_sortMode'])
        },
        success: function (rep) {
            rep = jQuery.parseJSON(JSON.stringify(rep));
            if (rep.code) {
                tmpCode = rep.code;
                tmpPageData = rep.msg;
                showPics('Biu~');
            } else {
                showPics('Error :<', ['main'], []);
            }
        },
        error: function (e) {
            showPics('Error :<', ['main'], []);
        }
    });
}

function getUserWorks(user, type, grpIdx = 0) {
    NProgress.inc();
    cssShowLoading();
    $.ajax({
        type: "GET",
        url: "api/biu/get/idworks/",
        data: {
            'userID': user,
            'type': type,
            'sortMode': String(tmpSearchSettings['pixivbiu_sortMode']),
            'isSort': Number(tmpSearchSettings['pixivbiu_funIsAllSort'] === 'on'),
            'totalPage': tmpSearchSettings['pixivbiu_searchPageNum'],
            'groupIndex': Number(grpIdx)
        },
        success: function (rep) {
            rep = jQuery.parseJSON(JSON.stringify(rep));
            if (rep.code) {
                tmpCode = rep.code;
                tmpPageData = rep.msg;
                showPics('Biu~');
            } else {
                showPics('Error :<', ['main'], []);
            }
            NProgress.done();
        },
        error: function (e) {
            showPics('Error :<', ['main'], []);
            NProgress.done();
        }
    });
}

function getRank(mode = 'day', grpIdx = 0) {
    NProgress.inc();
    cssShowLoading();
    $.ajax({
        type: "GET",
        url: "api/biu/get/rank/",
        data: {
            'mode': mode,
            'totalPage': tmpSearchSettings['pixivbiu_searchPageNum'],
            'groupIndex': Number(grpIdx)
        },
        success: function (rep) {
            rep = jQuery.parseJSON(JSON.stringify(rep));
            if (rep.code) {
                tmpPageData = rep.msg;
                showPics('排行榜@' + mode, ['main', 'header']);
            } else {
                showPics('Error :<', ['main'], []);
            }
            NProgress.done();
        },
        error: function (e) {
            showPics('Error :<', ['main'], []);
            NProgress.done();
        }
    });
}

function getRecommend(type = 'illust', grpIdx = 0) {
    NProgress.inc();
    cssShowLoading();
    $.ajax({
        type: "GET",
        url: "api/biu/get/recommend/",
        data: {
            'type': type,
            'totalPage': tmpSearchSettings['pixivbiu_searchPageNum'],
            'groupIndex': Number(grpIdx),
            'sortMode': String(tmpSearchSettings['pixivbiu_sortMode']),
            'isSort': Number(tmpSearchSettings['pixivbiu_funIsAllSort'] === 'on')
        },
        success: function (rep) {
            rep = jQuery.parseJSON(JSON.stringify(rep));
            if (rep.code) {
                tmpPageData = rep.msg;
                showPics('推荐@' + type, ['main', 'header']);
            } else {
                showPics('Error :<', ['main'], []);
            }
            NProgress.done();
        },
        error: function (e) {
            showPics('Error :<', ['main'], []);
            NProgress.done();
        }
    });
}

function getNewToMe(mode = 'public', grpIdx = 0) {
    NProgress.inc();
    cssShowLoading();
    $.ajax({
        type: "GET",
        url: "api/biu/get/newtome/",
        data: {
            'restrict': mode,
            'totalPage': tmpSearchSettings['pixivbiu_searchPageNum'],
            'groupIndex': Number(grpIdx),
            'sortMode': String(tmpSearchSettings['pixivbiu_sortMode']),
            'isSort': Number(tmpSearchSettings['pixivbiu_funIsAllSort'] === 'on')
        },
        success: function (rep) {
            rep = jQuery.parseJSON(JSON.stringify(rep));
            if (rep.code) {
                tmpPageData = rep.msg;
                showPics('用户新作@' + mode, ['main', 'header']);
            } else {
                showPics('Error :<', ['main'], []);
            }
            NProgress.done();
        },
        error: function (e) {
            showPics('Error :<', ['main'], []);
            NProgress.done();
        }
    });
}

function getMarks(user = '', mode = 'public', grp = '0@0') {
    NProgress.inc();
    cssShowLoading();
    if (user === 'my') {
        mode = 'private';
        user = '';
    }
    if (user === '' || user === 'my')
        $('#srhBox').val('');
    var grpIdx = Number(grp.split('@')[0]);
    var grpArr = grp.split('@')[1].split('_');
    $.ajax({
        type: "GET",
        url: "api/biu/get/idmarks/",
        data: {
            'userID': user,
            'restrict': mode,
            'sortMode': String(tmpSearchSettings['pixivbiu_sortMode']),
            'isSort': Number(tmpSearchSettings['pixivbiu_funIsAllSort'] === 'on'),
            'groupIndex': String(grpArr[grpIdx]),
            'tmp': grp
        },
        success: function (rep) {
            rep = jQuery.parseJSON(JSON.stringify(rep));
            if (rep.code) {
                if (grpIdx === grpArr.length - 1 && rep['msg']['args']['ops']['markNex'] != 'None')
                    rep['msg']['args']['ops']['tmp'] = grp.split('@')[0] + '@' + grp.split('@')[1] + '_' + rep['msg']['args']['ops']['markNex'];
                tmpPageData = rep.msg;
                if (user === '' || user === 'my') {
                    showPics('我的收藏@' + mode, ['main', 'header']);
                } else {
                    showPics('TA 的收藏', ['main', 'header']);
                }
            } else {
                showPics('Error :<', ['main'], []);
            }
            NProgress.done();
        },
        error: function (e) {
            showPics('Error :<', ['main'], []);
            NProgress.done();
        }
    });
}

function getFollowing(user = '', mode = 'public', grpIdx = 0) {
    NProgress.inc();
    cssShowLoading();
    if (user === 'my') {
        mode = 'private';
        user = '';
    }
    $.ajax({
        type: "GET",
        url: "api/biu/get/idfollowing/",
        data: {
            'userID': user,
            'restrict': mode,
            'totalPage': tmpSearchSettings['pixivbiu_searchPageNum'],
            'groupIndex': Number(grpIdx)
        },
        success: function (rep) {
            rep = jQuery.parseJSON(JSON.stringify(rep));
            if (rep.code) {
                tmpPageData = rep.msg;
                if (user === '' || user === 'my') {
                    showPics('我的关注@' + mode, ['main', 'header']);
                } else {
                    showPics('TA 的关注', ['main', 'header']);
                }
            } else {
                showPics('Error :<', ['main'], []);
            }
            NProgress.done();
        },
        error: function (e) {
            showPics('Error :<', ['main'], []);
            NProgress.done();
        }
    });
}

function searchForUsers(key, grpIdx = 0) {
    NProgress.inc();
    cssShowLoading();
    $.ajax({
        type: "GET",
        url: "api/biu/search/users/",
        data: {
            'kt': key,
            'totalPage': tmpSearchSettings['pixivbiu_searchPageNum'],
            'groupIndex': Number(grpIdx)
        },
        success: function (rep) {
            rep = jQuery.parseJSON(JSON.stringify(rep));
            if (rep.code) {
                tmpPageData = rep.msg;
                showPics('用户搜索', ['main', 'header']);
            } else {
                showPics('Error :<', ['main'], []);
            }
            NProgress.done();
        },
        error: function (e) {
            showPics('Error :<', ['main'], []);
            NProgress.done();
        }
    });
}

function getOneWork(id) {
    NProgress.inc();
    cssShowLoading();
    $.ajax({
        type: "GET",
        url: "api/biu/get/onework/",
        data: {
            'workID': id
        },
        success: function (rep) {
            rep = jQuery.parseJSON(JSON.stringify(rep));
            if (rep.code) {
                tmpPageData = rep.msg;
                showPics('Biu~', ['main', 'header']);
            } else {
                showPics('Error :<', ['main'], []);
            }
            NProgress.done();
        },
        error: function (e) {
            showPics('Error :<', ['main'], []);
            NProgress.done();
        }
    });
}

function doBookmark(id, action = 'add') {
    let des, de, icon, tURL;

    if (action === 'add') {
        tURL = "api/biu/do/mark/";
        icon = '💘';
        de = 'javascript: doBookmark(' + id + ', \'del\');';
        des = '取消收藏';
    } else {
        tURL = "api/biu/do/unmark/";
        icon = '💗';
        de = 'javascript: doBookmark(' + id + ', \'add\');';
        des = '收藏';
    }

    $.ajax({
        type: "GET",
        url: tURL,
        data: {
            'workID': id,
            'publicity': tmpSearchSettings['pixivbiu_actionType'] === 'private' ? 'private' : 'public'
        },
        success: function (rep) {
            rep = jQuery.parseJSON(JSON.stringify(rep));
            if (rep.code) {
                $('#marks_' + id + ' b hicon').html(icon);
                $('#marks_' + id + ' b').tooltipster('content', des);
                $('#marks_' + id).attr('href', de);
            }
        },
        error: function (e) {
            console.log(e);
        }
    });
}

function doFollow(id, action = 'add') {
    let des, de, icon, tURL;

    if (action === 'add') {
        tURL = "api/biu/do/follow/";
        icon = '💘';
        de = 'javascript: doFollow(' + id + ', \'del\');';
        des = '取消关注';
    } else {
        tURL = "api/biu/do/unfollow/";
        icon = '💗';
        de = 'javascript: doFollow(' + id + ', \'add\');';
        des = '关注';
    }

    $.ajax({
        type: "GET",
        url: tURL,
        data: {
            'userID': id,
            'publicity': tmpSearchSettings['pixivbiu_actionType'] === 'private' ? 'private' : 'public'
        },
        success: function (rep) {
            rep = jQuery.parseJSON(JSON.stringify(rep));
            if (rep.code) {
                $('#follow_' + id + ' b hicon').html(icon);
                $('#follow_' + id + ' b').tooltipster('content', des);
                $('#follow_' + id).attr('href', de);
            }
        },
        error: function (e) {
            console.log(e);
        }
    });
}

function doDownloadPic(kt, workID = 0, idx = -1) {
    if (downloadList.hasOwnProperty(workID))
        return;

    let data;
    if (idx !== -1)
        data = JSON.stringify(tmpPageData['rst']['data'][idx]['all']);
    else
        data = 0;

    $.ajax({
        type: "GET",
        async: true,
        url: "api/biu/do/dl/",
        data: {
            'kt': kt,
            'workID': workID,
            'data': data
        },
        success: function (rep) {
            if (rep['msg']['rst'] === 'running') {
                let bakJS = escape($('#dl_' + workID).attr('href').replaceAll("'", "%sq%").replaceAll("\"", "%dq%"));
                downloadList[String(workID)] = ([bakJS, 0]);
            } else {
                $('#art_' + workID + ' a:first').attr('class', 'image proer-error');
                $('#dl_' + workID + ' d').html('错误, 点击重试');
            }
        },
        error: function (e) {
            console.log(e);
            $('#art_' + workID + ' a:first').attr('class', 'image proer-error');
            $('#dl_' + workID + ' d').html('错误, 点击重试');
        }
    });
}

function doDownloadStopPic(workID) {
    $.ajax({
        type: "GET",
        async: true,
        url: "api/biu/do/dl_stop/",
        data: {
            'key': workID
        },
        success: function (rep) {
            // console.log(rep);
        },
        error: function (e) {
            console.log(e);
        }
    });
}

function grpActChon(type, grpIdx = -1, args = tmpPageData['args']) {
    const meth = args['ops']['method'];

    if (grpIdx <= -1) {
        if (meth === 'userMarks') {
            grpIdx = Number(args['ops']['tmp'].split('@')[0]);
            var grp = args['ops']['tmp'].split('@')[1];
        } else {
            grpIdx = Number(args['ops']['groupIndex']);
        }
    }

    if (type === 'back' && grpIdx > 0) {
        grpIdx--;
    } else if (type === 'next') {
        grpIdx++;
    }

    if (meth === 'works') {
        searchForWorks(args['fun']['kt'], grpIdx);
    } else if (meth === 'searchUsers') {
        searchForUsers(args['fun']['kt']);
    } else if (meth === 'recommend') {
        getRecommend(args['fun']['type'], grpIdx);
    } else if (meth === 'rank') {
        getRank(args['fun']['mode'], grpIdx);
    } else if (meth === 'newToMe') {
        getNewToMe(args['fun']['mode'], grpIdx);
    } else if (meth === 'userWorks') {
        getUserWorks(args['fun']['userID'], args['fun']['type'], grpIdx);
    } else if (meth === 'userFollowing') {
        getFollowing(args['fun']['userID'], args['fun']['restrict'], grpIdx);
    } else if (meth === 'userMarks') {
        if (grpIdx < args['ops']['tmp'].split('_').length) {
            getMarks(args['fun']['userID'], args['fun']['restrict'], String(grpIdx) + '@' + grp);
        } else {
            $('#btnHeaderNext i').tooltipster('content', '没有了...');
        }
    } else if (meth === 'oneWork') {
        getOneWork(args['fun']['workID']);
    }
}