!function ($) {
  $(function () {
    var p, createImageHandel, tiggerWindowShow,
        m, a, v        = 0,
        IMG_URL        = 'public/image/',
        cardsLength    = $('.card li').length,    // 翻牌的长度
        s              = {
          11: '未登录，请登录后再试',
          21: '购买令咒失败',
          22: '购买令咒失败，社区币不足'
        },
        r              = {
          extcredits1: '存在感',
          extcredits2: '社区币',
          extcredits3: '有爱值',
          food3      : '节操',
          food4      : '金坷拉',
          food5      : '提拉米苏'
        },
        charactorsObjs = {};
    // 中奖榜滚动动画
    showList = function () {
      var c = $('#list ul');
      c.animate(
        { 'margin-top': -20 },
        'normal',
        function () {
          c.find('li:first').appendTo(c),
            c.css({ 'margin-top': 0 })
        })
    },
      againLottery = function (j, i) {
        var c, f = $('.card img');
        windowClose();
        for (c in f) {
          if ('1' == f.eq(c).parent().css('opacity')) {
            r[j] || 'empty' == j ? $('.card li').eq(c).css('opacity', 0) : (f.eq(c).css('opacity', 0),
              m(f.eq(c), j, i));
            break
          }
        }
        window.setTimeout(function () {
          $('.start').removeClass('sel').text('启动抽奖'),
            $('.card li').removeAttr('style'),
            $('.card img').removeAttr('style').attr('src', IMG_URL + 'back.jpg'),
            v = 0
        }, 1000)
      },
      // 抽奖说明 - 关闭窗口
      windowClose = function () {
        $('.mask').css('opacity', 0),
          $('.mask .d-info').css('-webkit-transform', 'scale(0)'),
          window.setTimeout(function () {
            $('.mask').hide()
          }, 500)
      },
      // 成就列表 (兑换成就
      achieveList = function (charactorName) {
        function e () {
          var h, g, achieveItems = '',
              achievements       = charactorsObjs[charactorName];     // 成就
          // 可兑换的成就列表
          if (0 == achievements.length) {
            $('#achieveList .list').html('<p class="empty">暂无可兑换的成就...</p>')
          } else {
            for (h in achievements) {
              achieveItems += '<li onmouseover="$(this).children(\'.ms\').css(\'opacity\',\'1\')" onmouseout="$(this).children(\'.ms\').css(\'opacity\',\'0\')">' +
                '<p><img src=../achieve/public/title/aid' + achievements[h].id + '_lv1.gif /></p>' +
                '<p>' + achievements[h].name + '</p>' +
                '<div class="ms">' +
                '<a onclick="achievPost(' + achievements[h].id + ',\'' + achievements[h].name + '\')">兑换成就</a>' +
                '<a onmouseover="achievBackground(' + achievements[h].id + ',this)" onmouseout="achievBackground(-1,this)">预览背景</a>' +
                '</div>' +
                '</li>'
            }
            $('#achieveList .list').html('<ul>' + achieveItems + '</ul>')
          }
          g = -1 * ($('.mask .d-info').height() / 2),
            $('.mask .d-info').stop(!0, !1).animate({
              'margin-top': g + 'px'
            }, 500),
            $('#achieveList .menu span').removeClass('sel'),
            $('#achieveList [onclick="achieveList(\'' + charactorName + '\')"]').addClass('sel')
        }
        
        0 != $('#achieveList').length && (charactorsObjs[charactorName] ? e() : (tiggerWindowShow($('#achieveList'), 'show'),
          $.get('/hy/achieve/', {
              figure: charactorName,
              type  : 'list',
              ajax  : 1,
              r     : Math.random()
            },
            function (c) {
              c.error ? a('请登录...') : (charactorsObjs[charactorName] = c,
                e(),
                tiggerWindowShow($('#achieveList'), 'hide'))
            }, 'json')))
      },
      // 传后台兑换成就 (是否确认消耗30个 Saber 来兑换 )
      achievPost = function (targetId, targetName) {
        var charactorName = $('#achieveList .menu span.sel').text();
        confirm('是否确认消耗30个' + charactorName + '来兑换' + targetName + '？') && (tiggerWindowShow($('#achieveList'), 'show'),
          $.get('/hy/achieve/', {
              figure: targetId,
              type  : 'get',
              ajax  : 1,
              r     : Math.random()
            },
            function (c) {
              tiggerWindowShow($('#achieveList'), 'hide'),
                0 == c.error ? (alert('恭喜你成功的兑换了' + targetName),
                  $('#' + charactorName).text(parseInt($('#' + charactorName).text()) - 30)) : alert('兑换失败，' + charactorName + '不足30个或者你已经兑换过此成就了')
            }, 'json'))
      },
      // 预览成就兑换背景
      achievBackground = function (f, i) {
        var h = $(i).parent().offset().top
          , g = $(i).parent().offset().left + 155;
        f > 0 ?
        $('body').append('' +
          '<div class="achieveBackground" style="background-image:url(../achieve/public/background/' + f + '-1.jpg);top:' + h + 'px;left:' + g + 'px"></div>'
        ) :
        $('body').children('.achieveBackground').remove()
      },
      achieveExchange = function () {
        var g = $('#achieveExchange input[type="text"]').val()
          , k = $('#achieveExchange .bk1 img').attr('src').match(/image\/(.+?)\.jpg/)[1]
          , j = $('#achieveExchange .bk2 img.sel').attr('src').match(/image\/(.+?)\.jpg/)[1]
          , i = parseInt($('#' + k).text())
          , h = /^\d+$/;
        return g > i ? (alert('你最多只能转换' + i + '张' + k),
          void 0) : 0 == h.test(g) ? (alert('请输入合法的数量'),
          void 0) : (confirm('你是否要消耗' + 10 * g + '个令咒将' + k + '转换为' + j + '？') && (tiggerWindowShow($('#achieveExchange'), 'show'),
          $.get(window.location.href, {
            change: k,
            to    : j,
            sum   : g,
            r     : Math.random()
          }, function (c) {
            tiggerWindowShow($('#achieveExchange'), 'hide'),
              41 == c.error ? alert('抱歉，你的令咒不足以转换卡片！') : c.error ? alert('出现错误: ' + c.error) : 1 == c.success ? (a('恭喜，兑换成功！'),
                $('#' + k).text(i - g),
                $('#' + j).text(parseInt($('#' + j).text()) + parseInt(g)),
                $('#command').text(parseInt($('#command').text()) - 10 * g)) : a('未知错误')
          }, 'json')),
          void 0)
      },
      p = function (c) {
        return c >= cardsLength ?
               ($('.card li').on('click', function () {
                 var d = this,
                     h = $(d).index(),
                     f;
                 $('.card li').off('click')
                 for (f = 0; cardsLength > f; f++) {
                   f != h && $('.card li').eq(f).css('opacity', 0)
                 }
                 tiggerWindowShow(d, 'show'),
                   $.get(window.location.href, {
                     lottery: h + 1,
                     r      : Math.random()
                   }, function (data) {
                     data.error && a('出现错误: ' + data.error),
                       $('#command').text(parseInt($('#command').text()) - 1);
                     var imgUrl = IMG_URL + data.image + '.jpg';
                     createImageHandel(imgUrl, function () {
                       tiggerWindowShow(d, 'hide'),
                         $(d).children('img').animate({
                             width : 0,
                             height: 239,
                             left  : 70
                           },
                           120,
                           function () {
                             $(d).children('img').attr('src', imgUrl),
                               $(d).children('img').animate({
                                   width: 140,
                                   left : 0
                                 },
                                 120,
                                 function () {
                                   var e = '<br /><br />' +
                                     '<a onclick="againLottery(\'' + data.type + '\',' + data.amount + ')" href="javascript:void(0);">继续抽奖</a>';
                                   'empty' == data.type
                                   ? a('很遗憾，这是一张空牌' + e, 1) : a('恭喜你获得了' + (r[data.type] ? r[data.type] : data.type + '卡片') + 'X' + data.amount + e, 1)
                                 })
                           })
                     })
                   }, 'json')
               }), void 0) :
               ($('.card li').eq(c).animate(
                 { 'margin-right': 0 },
                 'normal',
                 function () {
                   p(c + 1)
                 })
                 , void 0)
      }
      ,
      createImageHandel = function (imgUrl, feedBack) {
        var f = new Image();
        f.src = imgUrl,
          f.complete ?
          'function' == typeof feedBack && feedBack() :
          f.onload = function () {
            'function' == typeof feedBack && feedBack()
          }
      },
      tiggerWindowShow = function (d, e) {
        'show' == e ? $(d).prepend('<div class="loading sel"></div>') : $(d).children('.loading').remove()
      },
      m = function (g, k, j) {
        $('.parabola').remove();
        var i = $('#' + k).offset()
          , h = $('<img class="parabola" src="' + g.attr('src') + '" />');
        h.fly({
          start      : {
            left: g.offset().left,
            top : g.offset().top
          },
          end        : {
            left  : i.left,
            top   : i.top,
            width : 0,
            height: 0
          },
          speed      : 1.5,
          vertex_Rtop: 15,
          onEnd      : function () {
            $('#' + k).text(parseInt($('#' + k).text()) + j)
          }
        })
      },
      a = function (f, i, h) {
        if (h > 420) {
          var g = -1 * (h / 2);
          $('.mask .d-info').css('width', h + 'px'),
            $('.mask .d-info').css('margin-left', g + 'px')
        } else {
          $('.mask .d-info').css({
            width        : '',
            'margin-left': ''
          })
        }
        1 == i ? $('.mask .close').hide() : $('.mask .close').show(),
        2 == i && (f += '<br /><br /><a onclick="windowClose()" href="javascript:void(0);">\u786e\u5b9a</a>'),
          $('#window-text').html(f),
          $('.mask').show(0, function () {
            var c = -1 * ($('.mask .d-info').height() / 2);
            $('.mask .d-info').css('margin-top', c + 'px'),
              $('.mask').css('opacity', 0.9),
              $('.mask .d-info').css('-webkit-transform', 'scale(1)')
          })
      },
      $('.start').on('click', function () {
        if (0 == v) {
          var c = parseInt($('#command').text());
          if (0 == c) {
            return a('可用令咒不足，请购买', 2), void 0
          }
          v = 1,
            $(this).addClass('sel').text('正在抽奖'),
            $('.card li').css({
              display       : 'block',
              'margin-right': '-150px'
            }),
            createImageHandel(IMG_URL + 'back.jpg', function () {
              p(0)
            })
        }
      }),
      $('.buy').on('click', function () {
        $(this).hasClass('sel') ? ($(this).removeClass('sel'),
          $('.buy_mu').css('opacity', 0),
          window.setTimeout(function () {
            $('.buy_mu').hide()
          }, 400)) : $('.buy_mu').is(':hidden') && ($(this).addClass('sel'),
          $('.buy_mu').show(0, function () {
            $('.buy_mu').css('opacity', 0.9)
          }))
      }),
      $('.buy_mu .button').on('click', function () {
        var e = $('#buy-amount').val()
          , g = $('#buy-amount')
          , f = /^\d+$/;
        'disabled' != g.attr('disabled') && (0 == f.test(e) ? a('请输入合法的数量', 2) : 0 >= e || e > 99 ? a('单次购买须大于1个，小于100个', 2) : (g.attr('disabled', 'disabled'),
          $.get(window.location.href, {
            buy: e,
            r  : Math.random()
          }, function (c) {
            g.val(''),
              g.removeAttr('disabled'),
              c.error ? a(s[c.error], 2) : ($('#command').text(parseInt($('#command').text()) + parseInt(e)),
                $('.buy').click(),
                a('购买成功，消耗社区币' + c.wastage + '个', 2))
          }, 'json')))
      }),
      // btn 兑换礼品
      $('.button-g2 li').eq(0).on('click', function () {
        a('该功能将在后续更新！', 2)
      }),
      // btn 兑换成就
      $('.button-g2 li').eq(1).on('click', function () {
        a('<div id="achieveList">' +
          '<div class="menu">' +
          '<span onclick="achieveList(\'saber\')">Saber</span>' +
          '<span onclick="achieveList(\'lancer\')">Lancer</span>' +
          '<span onclick="achieveList(\'archer\')">Archer</span>' +
          '<span onclick="achieveList(\'rider\')">Rider</span>' +
          '<span onclick="achieveList(\'caster\')">Caster</span>' +
          '<span onclick="achieveList(\'assassin\')">Assassin</span>' +
          '<span onclick="achieveList(\'berserker\')">Berserker</span>' +
          '<span onclick="achieveList(\'avenger\')">Avenger</span>' +
          '</div>' +
          '<div class="list"></div>', 0, 680),
          achieveList('saber')
      }),
      // btn 兑换成就
      $('.button-g2 li').eq(2).on('click', function () {
        a('<p style="text-align:left">' +
          '<strong>1.如何抽奖？</strong><br />&nbsp;&nbsp;&nbsp;&nbsp;点击启动抽奖将会出现8张卡片，选择一张，消耗一个令咒，翻开它即可完成抽奖；<br /><br  />' +
          '<strong>2.能抽到什么奖品？</strong><br />&nbsp;&nbsp;&nbsp;&nbsp;可以抽奖社区币、有爱值、存在感、HY娘的食物等丰富的奖品，同时还能抽到特殊的阶职卡片；<br /><br />' +
          '<strong>3.阶职卡片有什么用？</strong><br />&nbsp;&nbsp;&nbsp;&nbsp;凑齐30张同职位的卡片可以兑换一个带有帖子背景特效的人物成就；<br /><br />' +
          '<strong>3.令咒如何获得？</strong><br />&nbsp;&nbsp;&nbsp;&nbsp;' +
          '①累计签到达到15天以上，周六、周日签到可以额外获赠1个令咒；<br />&nbsp;&nbsp;&nbsp;&nbsp;' +
          '②累计签到达到5天以上，周六、周日抢签第1-3名可以获得2个令咒，第4至第10名1个；<br />&nbsp;&nbsp;&nbsp;&nbsp;' +
          '③触发HY娘的祝福也有一定的机率可以获得令咒；<br />&nbsp;&nbsp;&nbsp;&nbsp;' +
          '④花费10个社区币可以购买1个令咒；</p>')
      }),
      $('.d-info .zh').on('click', function () {
        var l, k, j, i, h = $(this).prev().attr('id'), w = $(this).prev().text();
        if (0 == w) {
          return a('抱歉，你还未获得' + h, 2),
            void 0
        }
        for (l = $('.d-info strong'),
               k = '',
               j = 0,
               i = 0; i < l.length; i++) {
          l.eq(i).attr('id') != h && 'command' != l.eq(i).attr('id') && l.eq(i).attr('id') && (k += '<img src="public/image/' + l.eq(i).attr('id') + '.jpg" onclick="$(\'#achieveExchange .bk2 img\').removeClass(\'sel\').eq(' + j + ').addClass(\'sel\');$(\'#achieveExchange .bk3\').css(\'opacity\',1)" />',
            j++)
        }
        a('<div id="achieveExchange"><div class="bk1">你可以将<br /><img src="public/image/' + h + '.jpg"><br />转换为以下任意一种卡片</div><div class="bk2">' + k + '</div><div class="bk3">转换数量：<input type="text" /><button onclick="achieveExchange()">确认转换</button>（每兑换1张卡片都会消耗10个令咒）</div><div>', 0, 700)
      }),
      // btn - 玩法说明 - 关闭窗口
      $('#window-close').on('click', function () {
        windowClose()
      }),
      createImageHandel(IMG_URL + 'back.jpg'),
      autoPlay = window.setInterval(showList, 3500)
  })
}(jQuery);
