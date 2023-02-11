define([
  "esri/core/watchUtils",
], function (
  watchUtils,
) {
  var __prevextent = false,
    __preextent = null,
    __currentextent = null,
    __extenthistory = [],
    __extenthistoryIndx = 0,
    __nextextent = false;

  $('#btn_previous').on('click', function () {
    extentHistoryChange();
    if (!$("#btn_previous").hasClass("disabled")) {
      if (__extenthistory[__extenthistoryIndx].preExtent) {
        __prevextent = true;
        __globspace.view.goTo(__extenthistory[__extenthistoryIndx].preExtent);
        __extenthistoryIndx--;
      }
    }
  });

  $('#btn_next').on('click', function () {
    extentHistoryChange();
    if (!$("#btn_next").hasClass("disabled")) {
      __nextextent = true;
      __extenthistoryIndx++;
      __globspace.view.goTo(__extenthistory[__extenthistoryIndx].currentExtent);
    }
  });

  watchUtils.whenTrue(__globspace.view, "ready", function () {
    watchUtils.whenOnce(__globspace.view, "extent", function () {
      watchUtils.when(__globspace.view, 'stationary', function (evt) {
        if (evt) {
          extentChangeHandler(__globspace.view.extent);
        }
      });
    });
  });

  function extentChangeHandler(evt) {
    if (__prevextent || __nextextent) {
      __currentextent = evt;
    } else {
      __preextent = __currentextent;
      __currentextent = evt;
      __extenthistory.push({
        preExtent: __preextent,
        currentExtent: __currentextent
      });
      __extenthistoryIndx = __extenthistory.length - 1;
    }
    __prevextent = __nextextent = false;
    extentHistoryChange();
  }

  function extentHistoryChange() {
    if (__extenthistoryIndx > __extenthistory.length - 1) {
      $('#btn_next').addClass('disabled');
      __extenthistoryIndx = __extenthistory.length - 1;
    }
    if (__extenthistory.length === 0 || __extenthistoryIndx === 0) {
      $('#btn_previous').addClass('disabled');
    } else {
      $('#btn_previous').removeClass('disabled');
    }
    if (__extenthistory.length === 0 || __extenthistoryIndx === __extenthistory.length - 1) {
      $('#btn_next').addClass('disabled');
    } else {
      $('#btn_next').removeClass('disabled');
    }
  }

});

/* REVISADO ♠ */