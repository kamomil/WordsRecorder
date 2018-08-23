var createdPop = null

const popup_win_data = {
    url: "MediaRecorder.html",
    type: "popup",
    width: 500,
    height: 1000,
    left: 20,
    top: 20
};


//chrome.browserAction.onClicked.addListener(function(tab) {
//  if (createdPop != null) {
//      chrome.windows.update(createdPop.id, {focused: true})
//  }  else {
//      chrome.windows.create(popup_win_data, function(window) {createdPop = window;} );
////      chrome.windows.create(popup_win_data, function(window) {createdPop = window.tabs[0];} );
////      chrome.tabs.create({'url': chrome.extension.getURL('MediaRecorder.html')}, function(tab) {
////    	extTab = tab
////      })
//  }
//
//   chrome.windows.getCurrent(function( currentWin) {
//    if(currentWin !== createdPop)
//        chrome.windows.update(currentWin.id, {left: createdPop.left+createdPop.width+5, width: Math.round(currentWin*0.75) | 0})
//
//  })
//
//
//})

chrome.tabs.onRemoved.addListener(function(tabId, removeInfo) {
  if (createdPop != null && createdPop.id === tabId) {
    createdPop = null
  }
})

chrome.extension.onRequest.addListener(
    function(request, sender, sendResponse) {
        console.log('in background')
        switch (request.message) {
            case 'setText':
            window.seltext = request.data
            console.log('in background, data is ' + request.data)
            chrome.tabs.sendMessage(createdPop.id, {'data' : request.data})
            break
            default:
            break
        }
    })


////////////////////
//if (chrome.system && chrome.system.display) {
//        chrome.system.display.getInfo(function(displayInfo) {
//            chrome.windows.getCurrent(function(windowInfo) {
//
//                var currentWindowInfo = {
//                    left: windowInfo.left + windowInfo.width - 100,
//                    top: windowInfo.top + 100
//                };
//
//                var displayJSON = util.displayInfoFormatter(displayInfo, currentWindowInfo),
//                    isScaled = command.indexOf('scale') !== -1,
//                    resizeParams = getResizeParams(command);
//
//                sendTracking('keyboard-shortcut', command);
//
//                if (isScaled) {
//                    resizeScaledTabs(displayJSON.displays[displayJSON.primaryIndex].workArea, resizeParams.primaryRatio, resizeParams.secondaryRatio, resizeParams.orientation);
//                } else {
//                    resizeTabs(displayJSON.displays[displayJSON.primaryIndex].workArea, resizeParams.rows, resizeParams.cols);
//                }
//            });
//        });
//    }


//var ht0 = {
//    c: {},
//    v: chrome.runtime.getManifest()
//        .version,
//    m: new Map()
//};
//ht0.cd = {
//    v: -1,
//    ati: 1,
//    cps: true,
//    cpsn: true,
//    cs: false
//};
//
//ht0.fiu = function() {
//    if (!ht0.iur || !ht0.c.v || (ht0.c.v === ht0.v)){
//        console.log("return")
//        return;
//    }
//    ht0.c.v = ht0.v;
//    if (ht0.iur == "update") ht0.c.iu = true;
//    //chrome.storage.local.set(ht0.c);
//    chrome.tabs.create({
//        url: "https://ht0.de/open-as-popup.html#" + ht0.iur,
//        active: true
//    });
//    chrome.runtime.openOptionsPage();
//    ht0.iur = false;
//};
//console.log("about to get storage")
//chrome.storage.local.get(null, function(c) {
//    console.log("getting storage")
//    console.log(c)
//    if (!c.v) {
//        console.log("no config -> set defaults");
//        //chrome.storage.local.set(ht0.cd);
//        c = ht0.cd;
//    };
//    ht0.c = c;
//    ht0.fiu();
//});
//
//chrome.storage.onChanged.addListener(function(c, n) {
//    console.log("")
//    chrome.storage.local.get(null, function(c) {
//        ht0.c = c;
//    });
//});

function win2popup(t, u, w) {
   
    var data = {
        type: "popup"
    };
    if (t) {
        data.tabId = t.id;
    }
    else if (u) data.url = u;

    if (w && w.state === "normal") {

        data.top = w.top;
        data.left = w.left;
        data.width = w.width;
        data.height = w.height;
    };

    chrome.windows.create(data, function(pw) {
        console.log("window create callback")
//        if (w) {
//            console.log("window create callback - update state")
//            chrome.windows.update(pw.id, {state: w.state});
//        }
    });
};

chrome.browserAction.onClicked.addListener(function(tab) {
    chrome.windows.get(tab.windowId, function(win) {
        win2popup(tab, null, win);
    });
});
//chrome.contextMenus.removeAll();
//chrome.contextMenus.create({
//    type: "normal",
//    contexts: ["all"],
//    id: "toggle_popup",
//    title: "Toggle Open-as-Popup",
//    onclick: function(i, t) {
//        ht0.tp(t);
//    }
//});
//chrome.contextMenus.create({
//    type: "normal",
//    contexts: ["link"],
//    id: "popup_from_url",
//    title: "Open URL in new popup window",
//    onclick: function(i, t) {
//        chrome.windows.get(t.windowId, function(w) {
//            ht0.tpw(null, i.linkUrl, w);
//        });
//    }
//});
//chrome.commands.onCommand.addListener(function(c) {
//    if (c === "toggle_popup") {
//        chrome.windows.getLastFocused(function(w) {
//            chrome.tabs.query({
//                windowId: w.id,
//                active: true
//            }, function(ts) {
//                var t = ts[0];
//                if (w.type === "popup") ht0.tnw(t, w);
//                else ht0.tpw(t, null, w);
//            });
//        });
//    };
//});
//ht0.tp = function(t) {
//    console.log("tp")
//    chrome.windows.get(t.windowId, function(w) {
//        if (w.type === "popup") ht0.tnw(t, w);
//        else ht0.tpw(t, null, w);
//    });
//};
//
//ht0.tnw = function(t, wp) {
//    console.log("tnw")
//    var tw = ht0.m.get(t.id);
//    if (tw) {
//        chrome.windows.get(tw, function(w) {
//            if (!chrome.runtime.lastError) ht0.tnwt(t, tw);
//            else ht0.tnwlf(t, wp);
//        });
//    } else ht0.tnwlf(t, wp);
//};
//ht0.tnwlf = function(t, wp) {
//    console.log("tnwlf")
//    chrome.windows.getLastFocused({
//        windowTypes: ["normal"]
//    }, function(w) {
//        if (!chrome.runtime.lastError) ht0.tnwt(t, w.id);
//        else ht0.tnwc(t, wp);
//    });
//};
//ht0.tnwc = function(t, wp) {
//    console.log("tnwc")
//    chrome.windows.create({
//        type: "normal",
//        state: wp.state,
//        tabId: t.id
//    });
//};
//ht0.tnwt = function(t, tw) {
//    console.log("tnwt")
//    if (ht0.c.ati > 0) chrome.tabs.query({
//        windowId: tw,
//        active: true
//    }, function(ts) {
//        ht0.tnwti(t, tw, ts[0].index + 1);
//    });
//    else ht0.tnwti(t, tw, ht0.c.ati);
//};
//ht0.tnwti = function(t, tw, i) {
//    console.log("tnwti")
//    chrome.tabs.move(t.id, {
//        windowId: tw,
//        index: i
//    }, function(t) {
//        if (t) chrome.tabs.update(t.id, {
//            active: true
//        });
//        chrome.windows.update(tw, {
//            focused: true
//        });
//    });
//    ht0.m.delete(t.id);
//};