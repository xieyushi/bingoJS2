<<<<<<< HEAD
(function (bingo) {

    var app = window.demoApp = bingo.app('demo'), _pageManager = {
=======
(function (bingo, app) {


    var _pageManager = {
        bgNoObserve: true,
>>>>>>> master
        action: '',
        pageList: [],
        isBack: function (name) {
            var list = this.pageList, len = list.length;
            return this.action !== 'go' && len > 1 && list[len - 2] == name;
        },
        go: function (name) {
            this.action = 'go';
            location.hash = name;
        },
        open: function (name) {
            this.pageList.push(name);
<<<<<<< HEAD
            var view = bingo.view('main'), node = view.$getNode();
            var tmpl = '<div bg-route="' + name + '" bg-name="' + name + '"></div>';
            bingo.compile(view).tmpl(tmpl).appendTo(node).compile();
=======
            app.tmpl('#tpl_' + name).then(function (tmpl) {
                var cp = app.view('home').cp1;
                cp.$insertAfter(tmpl);
            });
>>>>>>> master
        },
        back: function () {
            this.action = 'back';
            history.back();
        },
        close: function (name) {
<<<<<<< HEAD
            var view = bingo.view(name);
            if (!view) return;
            this.pageList.pop();
            var node = view.$getNode();
            var jo = $(node);
            jo.children('.page').addClass('slideOut').on('animationend', function () {
                jo.remove();
            }).on('webkitAnimationEnd', function () {
                jo.remove();
            });
        },
        hash: function () {
            return bingo.location.hash(location + '');
=======
            var view = app.view(name);
            if (!view) return;
            this.pageList.pop();
            var node = view.$getNodes()[0];
            var jo = $(node);
            jo.addClass('slideOut').on('animationend', function () {
                //view.$ownerCP是指view所属的cp
                view.$ownerCP.$remove();
            }).on('webkitAnimationEnd', function () {
                view.$ownerCP.$remove();
            });
        },
        _hashReg: /#([^#]*)$/,
        hash: function () {
            return this._hashReg.test(location + '') ? RegExp.$1 : '';
>>>>>>> master
        },
        _init:false,
        init: function () {
            if (this._init) return;
            this._init = true;
            $(window).on('hashchange', function () {

                var name = _pageManager.hash();
                if (name) {
                    try {
                        switch (_pageManager.action) {
                            case 'go':
                                _pageManager.open(name);
                                break;
                            default:
                                if (_pageManager.isBack(name))
                                    _pageManager.close(_pageManager.pageList[_pageManager.pageList.length-1]);
                                else
                                    _pageManager.open(name);
                                break;
                        }
                    } finally {
                        _pageManager.action = '';
                    }
                } else if (_pageManager.pageList.length > 0) {
                    _pageManager.close(_pageManager.pageList.pop());
                }
            });

            var hash = this.hash();
            if (hash)
                this.open(hash);
        }
    };//end _pageManager

<<<<<<< HEAD
    app.service('$ui', ['$view', 'node', '$compile', '$component', function ($view, node, $compile, $component) {
        if ($view.$ui) return $view.$ui;
        _pageManager.init();
        var $ui = $view.$ui = {
=======
    app.service('$ui', ['$view', function ($view) {
        if ($view.$ui) return $view.$ui;

        $view.$ready(function () {
            _pageManager.init();
        });

        var $ui = $view.$ui = {
            bgNoObserve:true,
>>>>>>> master
            go: function (name) {
                _pageManager.go(name);
            },
            back: function () {
                _pageManager.back();
            },
            showLoading: function (msg, timeout) {
<<<<<<< HEAD
                var pNode = _getPageNode[0];
                return $component.create({
                    context: pNode, src: 'comp/loading', name: 'loading',
                    msg: msg || '数据加载中',
                    timeout: timeout || 10000
                });
            },
            showComplete: function (msg, time) {
                var pNode = _getPageNode[0];
                return $component.create({
                    context: pNode, src: 'comp/complete', name: 'complete',
                    msg: msg || '操作成功',
                    time: time || 2000
                });
=======

                app.tmpl('#tpl_loading').then(function (tmpl) {
                    $view.$insertAfter(tmpl).then(function (cp) {
                        cp.$ownerView.msg = msg || '数据加载中';
                        setTimeout(function () {
                            cp.$remove();
                        }, timeout || 3000);
                    });
                });

            },
            showComplete: function (msg, time) {

                app.tmpl('#tpl_complete').then(function (tmpl) {
                    $view.$insertAfter(tmpl).then(function (cp) {
                        cp.$ownerView.msg = msg || '操作成功';
                        setTimeout(function () {
                            cp.$remove();
                        }, time || 3000);
                    });
                });

>>>>>>> master
            },
            $params: function () {
                return this.$dialog().params;
            },
            $dialog: function (name, p) {
                if (arguments.length == 0)
<<<<<<< HEAD
                    return $view.__dlg;
=======
                    return this.__dlg;
>>>>>>> master

                var dlg = {
                    params: p,
                    send: function (p) {
                        return this.bgTrigger('receive', arguments);
                    },
                    receive: function (fn) {
                        return this.bgOn('receive', fn);
                    }
                };
<<<<<<< HEAD

                var node = _getPageNode()[0];
                var tmpl = '<div bg-route="' + name + '" bg-name="' + name + '"></div>';
                bingo.compile($view).tmpl(tmpl).controller(['$view', function ($view) {

                    dlg.close = function (p) {
                        if (arguments.length > 0)
                            this.send.apply(this, arguments);
                        $view.$remove();
                    };
                    $view.__dlg = dlg;
                }]).appendTo(node).compile();
=======
                app.tmpl('#tpl_dialog1').then(function (tmpl) {
                    var cp = app.view('home').cp1;
                    cp.$insertAfter(tmpl).then(function (cp) {
                        var $view = cp.$ownerView;
                        dlg.close = function (p) {
                            if (arguments.length > 0)
                                this.send.apply(this, arguments);
                            cp.$remove();
                        };
                        $view.$ui.__dlg = dlg;
                    });
                });
>>>>>>> master

                return dlg;
            }
        };
<<<<<<< HEAD
        var _getPageNode = function () { return $(node).children('.page');};
=======
        var _getPageNode = function () { return $($view.$getNodes()[0]);};
>>>>>>> master
        $view.$ready(function () {
            $view.$name != 'main' && _getPageNode().addClass('slideIn ' + $view.$name);
        });
        return $ui;
    }]);//end service $ui

<<<<<<< HEAD
    app.component('loading', {
        $tmpl: 'comp/loading',
        msg: '', timeout: -1,
        $init: function (p) {
            var tFn = function () {
                tid = null;
                this.$remove();
            }.bind(this);
            var tid;
            this.$observe('timeout', function (c) {
                tid && clearTimeout(tid);
                tid = setTimeout(tFn, c.value);
            }.bind(this));
            this.msg = p.msg;
            this.timeout = p.timeout;
        }
    });

    app.component('complete', {
        $tmpl: 'comp/complete',
        msg: '', time: -1,
        $init: function (p) {
            var tFn = function () {
                tid = null;
                this.$remove();
            }.bind(this);
            var tid;
            this.$observe('time', function (c) {
                tid && clearTimeout(tid);
                tid = setTimeout(tFn, c.value);
            });
            this.msg = p.msg;
            this.time = p.time;
        }
    });

})(bingoV2);
=======
    app.command('complete', function (cp) {
        cp.$tmpl(function () {
            return app.tmpl('#tpl_complete');
        });
        cp.$controller(['$view', function ($view) {
            $view.msg = '';
        }]);
    });


})(bingoV2, bingo.app('weiui'));
>>>>>>> master
