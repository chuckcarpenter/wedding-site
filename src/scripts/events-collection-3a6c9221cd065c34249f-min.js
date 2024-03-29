webpackJsonp([5], {
  0: function (w, y, q) {
    q(276);
    q(277);
    q(275);
    q(1618);
    q(1619);
    q(1620);
    q(1704);
    q(84);
  },
  84: function (w, y, q) {
    YUI.add(
      "squarespace-widgets-alert",
      function (a) {
        a.namespace("Squarespace.Widgets");
        a.Squarespace.Widgets.Alert = a.Base.create(
          "alert",
          a.Squarespace.Widgets.Confirmation,
          [],
          {},
          {
            CSS_PREFIX: "sqs-widgets-confirmation",
            TYPE: a.Squarespace.Widgets.Confirmation.TYPE,
            ANCHOR: a.Squarespace.Widgets.Confirmation.ANCHOR,
            ATTRS: {
              className: { value: "alert" },
              style: {
                value: a.Squarespace.Widgets.Confirmation.TYPE.CONFIRM_ONLY,
              },
              "strings.confirm": { value: "Okay" },
            },
          }
        );
      },
      "1.0",
      { requires: ["base", "squarespace-widgets-confirmation"] }
    );
  },
  275: function (w, y, q) {
    YUI.add(
      "squarespace-calendar-core-renderer",
      function (a) {
        var p = function (c) {
          return c.recordType === a.Squarespace.RecordType.EVENT
            ? c.structuredContent.startDate
            : c.addedOn;
        };
        a.Squarespace.SquarespaceCalendar = a.Base.create(
          "SquarespaceCalendar",
          a.Calendar,
          [],
          {
            initializer: function () {
              this._fetchEvents();
            },
            bindUI: function () {
              a.Calendar.superclass.bindUI.call(this);
              this.before("dateChange", this._clearEvents, this);
              this.after("dateChange", this._fetchEvents, this);
              this.after("collectionIdChange", this._fetchEvents, this);
            },
            _clearEvents: function () {
              this.set("events", []);
            },
            _fetchEvents: function () {
              var c = this.get("date"),
                c = a.DataType.Date.format(c, {
                  format: "%B-%Y",
                  locale: "en",
                });
              a.Data.get(
                {
                  url: this._getFetchUrl(c),
                  success: this._parseResponse,
                  failure: this._handleResponseError,
                },
                this
              );
            },
            _parseResponse: function (c) {
              this.set("events", c);
            },
            _handleResponseError: function (c) {
              console.error("Failed fetch data: " + c);
              new a.Squarespace.Widgets.Alert({
                "strings.title": "Server Request Failed",
                "strings.message": "Failed to get calender data, " + c.message,
              });
            },
            _getFetchUrl: function (c) {
              var m = this.get("collectionId"),
                e = this.get("pageCollectionId");
              c = "/api/open/GetItemsByMonth?collectionId=" + m + "&month=" + c;
              a.Lang.isValue(e) && (c += "&pageCollectionId=" + e);
              return c;
            },
          },
          {
            ATTRS: {
              events: { value: [], validator: a.Lang.isArray },
              collectionId: { value: null, validator: a.Lang.isString },
              pageCollectionId: { value: null, validator: a.Lang.isString },
            },
          }
        );
        a.Squarespace.CalendarBaseRenderer = a.Base.create(
          "CalendarBaseRenderer",
          a.Plugin.Base,
          [],
          {
            initializer: function (c) {
              this.host = c.host;
              this.afterHostEvent("eventsChange", this._onEventsChange, this);
            },
            _onEventsChange: function (c) {
              var m = null;
              a.Lang.isArray(c.newVal) &&
                0 < c.newVal.length &&
                (m = a.bind(this._calendarFilterFunction, this));
              this.host.set("customRenderer", {
                rules: { all: "events" },
                filterFunction: m,
              });
            },
            _calendarFilterFunction: function (c, a, e) {
              e = this.host.get("events");
              e = this._getEventsOfDay(e, c);
              this._sortEvents(e);
              this._renderDay(c, a, e);
            },
            _renderDay: function (c, a, e) {
              0 < e.length && a.setStyle("background", "gray");
            },
            _sortEvents: function (c) {
              c.sort(function (c, a) {
                var d = p(c);
                return p(a) - d;
              });
            },
            _getEventsOfDay: function (c, m) {
              var e = a.DataType.Date.format(m, { format: "%Y-%m-%d" });
              return a.Lang.isArray(c) && 0 < c.length
                ? a.Array.filter(
                    c,
                    function (c) {
                      return this._isEventPartOfDay(c, e);
                    },
                    this
                  )
                : [];
            },
            _isEventPartOfDay: function (c, m) {
              var e, d;
              d = c.structuredContent;
              if (c.recordType !== a.Squarespace.RecordType.EVENT)
                return (
                  (e = a.Squarespace.DateUtils.dateFormat(c.addedOn, {
                    format: "%Y-%m-%d",
                  })),
                  e === m
                );
              e = a.Squarespace.DateUtils.dateFormat(d.startDate, {
                format: "%Y-%m-%d",
              });
              d = a.Squarespace.DateUtils.dateFormat(d.endDate, {
                format: "%Y-%m-%d",
              });
              return m == e ||
                m == d ||
                (new Date(m) > new Date(e) && new Date(m) < new Date(d))
                ? !0
                : !1;
            },
            _getEventDisplayTime: function (c) {
              c = p(c);
              return a.Squarespace.DateUtils.dateFormat(c, {
                format: "%l:%M%P",
              }).trim();
            },
            _isSameDay: function (c, m) {
              if (c.recordType !== a.Squarespace.RecordType.EVENT) return !0;
              var e = a.Squarespace.DateUtils.dateFormat(
                  c.structuredContent.startDate,
                  { format: "%Y-%m-%d" }
                ),
                d = a.DataType.Date.format(m, { format: "%Y-%m-%d" });
              return e === d;
            },
          },
          { NS: "calendarPlugin" }
        );
        var d = (a.namespace("Squarespace").SquarespaceCalendarRenderer =
          a.Base.create(
            "squarespaceCalendarRenderer",
            a.Squarespace.CalendarBaseRenderer,
            [],
            {
              initializer: function (c) {
                this._loadingSpinner = new a.Squarespace.Spinner({
                  color: "dark",
                  size: "extra-large",
                  render: this.host.get("contentBox"),
                });
                this.onceAfterHostEvent("eventsChange", this._renderCalendar);
                this._bindUI();
              },
              destructor: function () {
                this._resizeEvent.detach();
              },
              _bindUI: function () {
                this._resizeEvent = a.on(
                  "resize",
                  this._syncUI,
                  a.config.win,
                  this
                );
              },
              _syncUI: function () {
                this.host.get("contentBox").getDOMNode() &&
                  (this._fitToContainer(),
                  this._setupCells(),
                  this.host
                    .get("contentBox")
                    .hasClass(d.COMPACT_LAYOUT_CLASS) || this._loadImages(),
                  this._setFlyoutHeights());
              },
              _onEventsChange: function (c) {
                c = a.bind(this._calendarFilterFunction, this);
                this.host.set("customRenderer", {
                  rules: {
                    all: {
                      all: {
                        all: {
                          0: "sunday",
                          1: "monday",
                          2: "tuesday",
                          3: "wednesday",
                          4: "thursday",
                          5: "friday",
                          6: "saturday",
                        },
                      },
                    },
                  },
                  filterFunction: c,
                });
                this.get("isRendered") && this._syncUI();
              },
              _calendarFilterFunction: function (c, a, e) {
                d.superclass._calendarFilterFunction.apply(this, arguments);
                0 <= e.indexOf("sunday")
                  ? a.addClass("sunday")
                  : 0 <= e.indexOf("monday")
                  ? a.addClass("monday")
                  : 0 <= e.indexOf("friday")
                  ? a.addClass("friday")
                  : 0 <= e.indexOf("saturday") && a.addClass("saturday");
              },
              _fitToContainer: function () {
                var c = this.host.get("contentBox");
                c.toggleClass(
                  d.SMALL_LAYOUT_CLASS,
                  770 >= c.get("offsetWidth")
                );
                c.toggleClass(
                  d.COMPACT_LAYOUT_CLASS,
                  600 >= c.get("offsetWidth")
                );
                c.toggleClass(d.TINY_LAYOUT_CLASS, 300 >= c.get("offsetWidth"));
              },
              _setupHeader: function () {
                this.host
                  .get("contentBox")
                  .one(".yui3-calendar-header-label")
                  .wrap("<h1></h1>");
              },
              _setupCells: function () {
                var c = this.host.get("contentBox").one("table");
                c.setStyle("width", null);
                this.cellSpacing = parseInt(
                  c.getComputedStyle("borderSpacing"),
                  10
                );
                var a =
                  7 *
                    parseInt(
                      (c.get("offsetWidth") - 8 * this.cellSpacing) / 7,
                      10
                    ) +
                  8 * this.cellSpacing;
                c.setStyle("width", a);
                c.all("td").setStyles({
                  width: parseInt(a / 7, 10) - this.cellSpacing,
                  height: parseInt(a / 7, 10) - this.cellSpacing,
                });
              },
              _loadImages: function () {
                this.host
                  .get("contentBox")
                  .all("img[data-src]")
                  .each(function (c) {
                    ImageLoader.load(c, { mode: "fill", load: !0 });
                  }, this);
              },
              _setFlyoutHeights: function () {
                this.host
                  .get("contentBox")
                  .all(".flyoutitemlist--hasmorecontent")
                  .each(function (c) {
                    var a = c.ancestor("tr"),
                      e = this._getRowHeight(a),
                      a =
                        c.ancestor("tr:nth-child(4)") ||
                        c.ancestor("tr:nth-child(5)") ||
                        c.ancestor("tr:nth-child(6)")
                          ? this._getRowHeight(a.previous("tr"))
                          : this._getRowHeight(a.next("tr"));
                    c.setStyle("height", e + a + this.cellSpacing);
                  }, this);
                this.host
                  .get("contentBox")
                  .all("tr")
                  .removeAttribute("data-row-height");
              },
              _getRowHeight: function (c) {
                if (c.getAttribute("data-row-height"))
                  return parseInt(c.getAttribute("data-row-height"), 10);
                var a = c.get("offsetHeight");
                c.setAttribute("data-row-height", a);
                return a;
              },
              _renderCalendar: function () {
                this._setupHeader();
                this._syncUI();
                this._loadingSpinner && this._loadingSpinner.destroy(!0);
                this.host.get("boundingBox").addClass("loaded");
                this.set("isRendered", !0);
              },
              _renderDay: function (a, d, e) {
                this.setAttrs({
                  date: a,
                  node: d,
                  events: this._groupEvents(e, a),
                });
                this._highlightToday();
                this._highlightDaysWithEvents();
                a = this._getTemplateInfo().template(
                  this._getHBTemplateContext()
                );
                d.empty().append(a);
              },
              _highlightToday: function () {
                var c = new Date(),
                  c = new Date(
                    c.setMinutes(
                      c.getMinutes() +
                        a.Squarespace.DateUtils.getTimeOffsetToWebsiteTimezone(
                          c
                        )
                    )
                  );
                this.get("date").setHours(0, 0, 0, 0) ===
                  c.setHours(0, 0, 0, 0) &&
                  this.get("node").addClass(d.TODAY_CLASS);
              },
              _highlightDaysWithEvents: function () {
                0 < this.get("events").length &&
                  this.get("node").addClass(d.HAS_EVENT_CLASS);
              },
              _getTemplateInfo: function () {
                return {
                  template: a.Squarespace.UITemplates.getCompiledTemplate(
                    d.HANDLEBARS_TEMPLATE
                  ),
                };
              },
              _getHBTemplateContext: function () {
                return { date: this.get("date"), events: this.get("events") };
              },
              _groupEvents: function (c, d) {
                var e = [],
                  p = [];
                a.Array.each(
                  c,
                  function (a) {
                    this._isSameDay(a, d)
                      ? e.unshift(a)
                      : ((a.isSubsequentDayOfMultidayEvent = !0), p.unshift(a));
                    this._isMultidayEvent(a) && (a.isMultiday = !0);
                  },
                  this
                );
                return p.concat(e);
              },
              _isMultidayEvent: function (c) {
                if (c.recordType === a.Squarespace.RecordType.EVENT) {
                  var d = c.structuredContent;
                  c = a.Squarespace.DateUtils.dateFormat(d.startDate, {
                    format: "%d%m%Y",
                  });
                  d = a.Squarespace.DateUtils.dateFormat(d.endDate, {
                    format: "%d%m%Y",
                  });
                  return c !== d;
                }
              },
            },
            {
              NS: "calendarPlugin",
              TODAY_CLASS: "today",
              HAS_EVENT_CLASS: "has-event",
              SMALL_LAYOUT_CLASS: "small-layout",
              COMPACT_LAYOUT_CLASS: "compact-layout",
              TINY_LAYOUT_CLASS: "tiny-layout",
              HANDLEBARS_TEMPLATE: "calendar-day.html",
            }
          ));
        a.Handlebars.registerHelper("day-of-month-format", function (c, d) {
          return a.DataType.Date.format(c, {
            format: d.hash.format || "%B %e, %Y",
          });
        });
        a.Handlebars.registerHelper("date-format", function (c, d) {
          return a.Squarespace.DateUtils.dateFormat(c, {
            format: d.hash.format || "%B %e, %Y",
          });
        });
        a.Handlebars.registerHelper(
          "calendar-compact-time-format",
          function (c) {
            var d =
              "PM" == a.Squarespace.DateUtils.dateFormat(c, { format: "%p" })
                ? "p"
                : "a";
            return 0 === new Date(c).getMinutes()
              ? a.Squarespace.DateUtils.dateFormat(c, { format: "%l" }) + d
              : a.Squarespace.DateUtils.dateFormat(c, { format: "%l:%M" }) + d;
          }
        );
      },
      "1.0",
      {
        requires:
          "calendar node squarespace-attr-validators squarespace-calendar-day-template squarespace-date-utils squarespace-ui-base squarespace-spinner squarespace-widgets-alert".split(
            " "
          ),
      }
    );
  },
  276: function (w, y, q) {
    YUI.add(
      "squarespace-events-collection",
      function (a) {
        a.namespace("Squarespace.EventsCollection").ListViewPlugin =
          a.Base.create(
            "eventsCollectionListViewPlugin",
            a.Plugin.Base,
            [],
            {
              initializer: function () {
                this.set(
                  "thumbnails",
                  this.get("host").all(
                    ".eventlist-column-thumbnail img[data-src]"
                  )
                );
                this.get("thumbnails").each(function (p) {
                  p.plug(a.Squarespace.Loader2, { load: !0, mode: "fill" });
                });
                this._syncUI();
                this._bindUI();
              },
              destructor: function () {
                this._resizeEvent && this._resizeEvent.detach();
                this._tweakChangeEvent && this._tweakChangeEvent.detach();
                this._tweakResetEvent && this._tweakResetEvent.detach();
              },
              _bindUI: function () {
                this._resizeEvent = a.on(
                  "windowresize",
                  function () {
                    this._syncUI();
                  },
                  a.config.win,
                  this
                );
                this._bindTweakEvents();
              },
              _syncUI: function () {
                this.get("thumbnails").each(function (a) {
                  a.fire("refresh");
                });
              },
              _bindTweakEvents: function () {
                this._tweakChangeEvent = a.Global.on(
                  "tweak:change",
                  function (a) {
                    a = a.getName();
                    ("event-thumbnails" === a ||
                      "event-thumbnail-size" === a ||
                      "event-list-compact-view" === a ||
                      "event-show-past-events" === a) &&
                      this._syncUI();
                  },
                  this
                );
                this._tweakResetEvent = a.Global.on(
                  "tweak:reset",
                  function (a) {
                    this._syncUI();
                  },
                  this
                );
              },
            },
            { NS: "eventsCollection" }
          );
        a.config.win.Squarespace.onInitialize(a, function () {
          a.one(".sqs-events-collection-list") &&
            a.all(".sqs-events-collection-list").each(function (p) {
              p.plug(a.Squarespace.EventsCollection.ListViewPlugin);
            });
          a.one(".sqs-events-collection-calendar") &&
            a.all(".sqs-events-collection-calendar").each(function (p) {
              new a.Squarespace.EventsCollectionCalendar({
                contentBox: p,
                collectionId: p.getAttribute("data-collection-id"),
                render: !0,
              }).plug(a.Squarespace.SquarespaceCalendarRenderer);
            });
        });
        a.namespace("Squarespace").EventCollectionCalendar = a.Base.create(
          "eventCollectionCalendar",
          a.Widget,
          [],
          {
            render: function () {
              new a.Squarespace.EventsCollectionCalendar({
                contentBox: this.get("contentBox"),
                collectionId:
                  a.config.win.Static.SQUARESPACE_CONTEXT.collectionId,
                render: !0,
              }).plug(a.Squarespace.SquarespaceCalendarRenderer);
            },
          },
          { ATTRS: {} }
        );
      },
      "1.0",
      {
        requires: [
          "base",
          "node",
          "squarespace-events-collection-calendar",
          "squarespace-image-loader",
        ],
      }
    );
  },
  277: function (w, y, q) {
    YUI.add(
      "squarespace-events-collection-calendar",
      function (a) {
        var p = (a.namespace("Squarespace").EventsCollectionCalendar =
          a.Base.create(
            "eventsCollectionCalendar",
            a.Squarespace.SquarespaceCalendar,
            [],
            {
              initializer: function () {
                this.set("_history", new a.History());
                this._addHistory();
              },
              destructor: function () {
                this._navClickEvent.detach();
                this._historyChangeEvent.detach();
              },
              bindUI: function () {
                p.superclass.bindUI.call(this);
                this._navClickEvent = this.get("contentBox").delegate(
                  "click",
                  this._addHistory,
                  ".yui3-calendarnav-prevmonth, .yui3-calendarnav-nextmonth",
                  this
                );
                this._historyChangeEvent = a.on(
                  "history:change",
                  function (d) {
                    d.src === a.HistoryHTML5.SRC_POPSTATE &&
                      d.newVal.month &&
                      this.set("date", d.newVal.month);
                  },
                  this
                );
              },
              _addHistory: function () {
                this.get("_history").addValue("month", this.get("date"), {
                  url: this._makeUrlFromDate(this.get("date")),
                });
              },
              _makeUrlFromDate: function (d) {
                d = a.DataType.Date.format(d, {
                  format: "%B-%Y",
                  locale: "en",
                });
                return (
                  a.config.win.location.pathname + "?view=calendar&month=" + d
                );
              },
              _preventSelectionStart: null,
            },
            {
              ATTRS: {
                date: {
                  valueFn: function () {
                    var d =
                      a.Squarespace.DateUtils.shiftForWebsiteTimezoneDisplay(
                        new Date()
                      );
                    if (a.Squarespace.Utils.isInDamaskFrame()) return d;
                    var c = a.QueryString.parse(
                      location.search.substring(1)
                    ).month;
                    return (
                      (c = c
                        ? a.Date.parse(
                            c.split("-")[0] + " 1, " + c.split("-")[1]
                          )
                        : null) || d
                    );
                  },
                },
              },
            }
          ));
      },
      "1.0",
      {
        requires:
          "base node history squarespace-calendar-core-renderer squarespace-date-utils squarespace-util".split(
            " "
          ),
      }
    );
  },
  1618: function (w, y, q) {
    YUI.add(
      "calendar",
      function (a, p) {
        function d() {
          d.superclass.constructor.apply(this, arguments);
        }
        var c = a.ClassNameManager.getClassName,
          m = c("calendar", "day-selected"),
          e = c("calendar", "day-highlighted"),
          G = c("calendar", "day"),
          q = c("calendar", "prevmonth-day"),
          H = c("calendar", "nextmonth-day"),
          u = c("calendar", "grid"),
          n = a.DataType.Date,
          h = c("calendar", "pane"),
          D = a.UA.os;
        a.Calendar = a.extend(
          d,
          a.CalendarBase,
          {
            _keyEvents: [],
            _highlightedDateNode: null,
            _lastSelectedDate: null,
            initializer: function () {
              this.plug(a.Plugin.CalendarNavigator);
              this._keyEvents = [];
              this._lastSelectedDate = this._highlightedDateNode = null;
            },
            _bindCalendarEvents: function () {
              var a = this.get("contentBox").one("." + h);
              a.on("selectstart", this._preventSelectionStart);
              a.delegate(
                "click",
                this._clickCalendar,
                "." + G + ", ." + q + ", ." + H,
                this
              );
              a.delegate("keydown", this._keydownCalendar, "." + u, this);
              a.delegate("focus", this._focusCalendarGrid, "." + u, this);
              a.delegate("focus", this._focusCalendarCell, "." + G, this);
              a.delegate(
                "blur",
                this._blurCalendarGrid,
                "." + u + ",." + G,
                this
              );
              this.after(
                ["minimumDateChange", "maximumDateChange"],
                this._afterCustomRendererChange
              );
            },
            _preventSelectionStart: function (a) {
              a.preventDefault();
            },
            _highlightDateNode: function (a) {
              this._unhighlightCurrentDateNode();
              a = this._dateToNode(a);
              a.focus();
              a.addClass(e);
            },
            _unhighlightCurrentDateNode: function () {
              var a = this.get("contentBox").all("." + e);
              a && a.removeClass(e);
            },
            _getGridNumber: function (a) {
              a = a.get("id").split("_").reverse();
              return parseInt(a[0], 10);
            },
            _blurCalendarGrid: function () {
              this._unhighlightCurrentDateNode();
            },
            _focusCalendarCell: function (a) {
              this._highlightedDateNode = a.target;
              a.stopPropagation();
            },
            _focusCalendarGrid: function () {
              this._unhighlightCurrentDateNode();
              this._highlightedDateNode = null;
            },
            _keydownCalendar: function (a) {
              var c = this._getGridNumber(a.target),
                e = !this._highlightedDateNode
                  ? null
                  : this._nodeToDate(this._highlightedDateNode),
                d = a.keyCode,
                h = 0,
                t;
              switch (d) {
                case 40:
                  h = 7;
                  break;
                case 38:
                  h = -7;
                  break;
                case 37:
                  h = -1;
                  break;
                case 39:
                  h = 1;
                  break;
                case 32:
                case 13:
                  if ((a.preventDefault(), this._highlightedDateNode))
                    if (
                      ((t = this.get("selectionMode")),
                      "single" === t && !this._highlightedDateNode.hasClass(m))
                    )
                      this._clearSelection(!0), this._addDateToSelection(e);
                    else if ("multiple" === t || "multiple-sticky" === t)
                      this._highlightedDateNode.hasClass(m)
                        ? this._removeDateFromSelection(e)
                        : this._addDateToSelection(e);
              }
              if (40 === d || 38 === d || 37 === d || 39 === d)
                e || ((e = n.addMonths(this.get("date"), c)), (h = 0)),
                  a.preventDefault(),
                  (a = n.addDays(e, h)),
                  (c = this.get("date")),
                  (e = n.addMonths(this.get("date"), this._paneNumber - 1)),
                  (d = new Date(e)),
                  e.setDate(n.daysInMonth(e)),
                  n.isInRange(a, c, e)
                    ? this._highlightDateNode(a)
                    : n.isGreater(c, a)
                    ? n.isGreaterOrEqual(this.get("minimumDate"), c) ||
                      (this.set("date", n.addMonths(c, -1)),
                      this._highlightDateNode(a))
                    : n.isGreater(a, e) &&
                      !n.isGreaterOrEqual(d, this.get("maximumDate")) &&
                      (this.set("date", n.addMonths(c, 1)),
                      this._highlightDateNode(a));
            },
            _clickCalendar: function (a) {
              var c = a.currentTarget,
                e = c.hasClass(G) && !c.hasClass(q) && !c.hasClass(H),
                d = c.hasClass(m);
              switch (this.get("selectionMode")) {
                case "single":
                  e &&
                    !d &&
                    (this._clearSelection(!0),
                    this._addDateToSelection(this._nodeToDate(c)));
                  break;
                case "multiple-sticky":
                  e &&
                    (d
                      ? this._removeDateFromSelection(this._nodeToDate(c))
                      : this._addDateToSelection(this._nodeToDate(c)));
                  break;
                case "multiple":
                  e &&
                    (!a.metaKey && !a.ctrlKey && !a.shiftKey
                      ? (this._clearSelection(!0),
                        (this._lastSelectedDate = this._nodeToDate(c)),
                        this._addDateToSelection(this._lastSelectedDate))
                      : (("macintosh" === D && a.metaKey) ||
                          ("macintosh" !== D && a.ctrlKey)) &&
                        !a.shiftKey
                      ? d
                        ? (this._removeDateFromSelection(this._nodeToDate(c)),
                          (this._lastSelectedDate = null))
                        : ((this._lastSelectedDate = this._nodeToDate(c)),
                          this._addDateToSelection(this._lastSelectedDate))
                      : (("macintosh" === D && a.metaKey) ||
                          ("macintosh" !== D && a.ctrlKey)) &&
                        a.shiftKey
                      ? this._lastSelectedDate
                        ? ((a = this._nodeToDate(c)),
                          this._addDateRangeToSelection(
                            a,
                            this._lastSelectedDate
                          ),
                          (this._lastSelectedDate = a))
                        : ((this._lastSelectedDate = this._nodeToDate(c)),
                          this._addDateToSelection(this._lastSelectedDate))
                      : a.shiftKey &&
                        (this._lastSelectedDate
                          ? ((a = this._nodeToDate(c)),
                            this._clearSelection(!0),
                            this._addDateRangeToSelection(
                              a,
                              this._lastSelectedDate
                            ),
                            (this._lastSelectedDate = a))
                          : (this._clearSelection(!0),
                            (this._lastSelectedDate = this._nodeToDate(c)),
                            this._addDateToSelection(this._lastSelectedDate))));
              }
              e
                ? this.fire("dateClick", { cell: c, date: this._nodeToDate(c) })
                : c.hasClass(q)
                ? this.fire("prevMonthClick")
                : c.hasClass(H) && this.fire("nextMonthClick");
            },
            _canBeSelected: function (a) {
              var c = this.get("minimumDate"),
                e = this.get("maximumDate");
              return (c && !n.isGreaterOrEqual(a, c)) ||
                (e && n.isGreater(a, e))
                ? !1
                : d.superclass._canBeSelected.call(this, a);
            },
            _renderCustomRules: function () {
              d.superclass._renderCustomRules.call(this);
              var a = this.get("minimumDate"),
                c = this.get("maximumDate"),
                e = [],
                h,
                m;
              if (a || c) {
                for (m = 0; m < this._paneNumber; m++)
                  (h = n.addMonths(this.get("date"), m)),
                    (e = e.concat(n.listOfDatesInMonth(h)));
                if (a) {
                  h = 0;
                  for (m = e.length; h < m && !n.isGreaterOrEqual(e[h], a); h++)
                    this._disableDate(e[h]);
                }
                if (c)
                  for (h = e.length - 1; 0 <= h; h--)
                    if (n.isGreater(e[h], c)) this._disableDate(e[h]);
                    else break;
              }
            },
            subtractMonth: function (a) {
              this.set("date", n.addMonths(this.get("date"), -1));
              a && a.halt();
              return this;
            },
            subtractYear: function (a) {
              this.set("date", n.addYears(this.get("date"), -1));
              a && a.halt();
              return this;
            },
            addMonth: function (a) {
              this.set("date", n.addMonths(this.get("date"), 1));
              a && a.halt();
              return this;
            },
            addYear: function (a) {
              this.set("date", n.addYears(this.get("date"), 1));
              a && a.halt();
              return this;
            },
          },
          {
            NAME: "calendar",
            ATTRS: {
              selectionMode: { value: "single" },
              date: {
                value: new Date(),
                lazyAdd: !1,
                setter: function (a) {
                  a = this._normalizeDate(a);
                  var c = n.addMonths(a, this._paneNumber - 1),
                    e = this.get("minimumDate"),
                    d = this.get("maximumDate");
                  if (
                    (!e || n.isGreaterOrEqual(a, e)) &&
                    (!d || n.isGreaterOrEqual(d, c))
                  )
                    return a;
                  if (e && n.isGreater(e, a)) return this._normalizeDate(e);
                  if (d && n.isGreater(c, d))
                    return n.addMonths(
                      this._normalizeDate(d),
                      1 - this._paneNumber
                    );
                },
              },
              minimumDate: {
                value: null,
                setter: function (c) {
                  if (a.Lang.isDate(c)) {
                    var e = this.get("date"),
                      d = this._normalizeTime(c);
                    e && !n.isGreaterOrEqual(e, d) && this.set("date", c);
                    return d;
                  }
                  return null;
                },
              },
              maximumDate: {
                value: null,
                setter: function (c) {
                  if (a.Lang.isDate(c)) {
                    var e = this.get("date");
                    e &&
                      !n.isGreaterOrEqual(
                        c,
                        n.addMonths(e, this._paneNumber - 1)
                      ) &&
                      this.set(
                        "date",
                        n.addMonths(
                          this._normalizeDate(c),
                          1 - this._paneNumber
                        )
                      );
                    return this._normalizeTime(c);
                  }
                  return null;
                },
              },
            },
          }
        );
      },
      "3.17.2",
      { requires: ["calendar-base", "calendarnavigator"], skinnable: !0 }
    );
  },
  1619: function (w, y, q) {
    YUI.add(
      "calendar-base",
      function (a, p) {
        function d() {
          d.superclass.constructor.apply(this, arguments);
        }
        var c = a.ClassNameManager.getClassName,
          m = c("calendar", "grid"),
          e = c("calendar", "left-grid"),
          G = c("calendar", "right-grid"),
          q = c("calendar", "body"),
          H = c("calendar", "header"),
          u = c("calendar", "header-label"),
          n = c("calendar", "weekdayrow"),
          h = c("calendar", "weekday"),
          D = c("calendar", "column-hidden"),
          E = c("calendar", "day-selected"),
          w = c("calendar", "selection-disabled"),
          y = c("calendar", "row"),
          x = c("calendar", "day"),
          L = c("calendar", "prevmonth-day"),
          t = c("calendar", "nextmonth-day"),
          M = c("calendar", "anchor"),
          N = c("calendar", "pane"),
          c = c("calendar", "status"),
          B = a.Lang,
          A = B.sub,
          F = a.Array.each,
          I = a.Object.each,
          J = a.Array.indexOf,
          C = a.Object.hasKey,
          O = a.Object.setValue,
          K = a.Object.isEmpty,
          v = a.DataType.Date;
        a.CalendarBase = a.extend(
          d,
          a.Widget,
          {
            _paneProperties: {},
            _paneNumber: 1,
            _calendarId: null,
            _selectedDates: {},
            _rules: {},
            _filterFunction: null,
            _storedDateCells: {},
            initializer: function () {
              this._paneProperties = {};
              this._calendarId = a.guid("calendar");
              this._selectedDates = {};
              K(this._rules) && (this._rules = {});
              this._storedDateCells = {};
            },
            renderUI: function () {
              this.get("contentBox").appendChild(
                this._initCalendarHTML(this.get("date"))
              );
              this.get("showPrevMonth") && this._afterShowPrevMonthChange();
              this.get("showNextMonth") && this._afterShowNextMonthChange();
              this._renderCustomRules();
              this._renderSelectedDates();
              this.get("boundingBox").setAttribute(
                "aria-labelledby",
                this._calendarId + "_header"
              );
            },
            bindUI: function () {
              this.after("dateChange", this._afterDateChange);
              this.after("showPrevMonthChange", this._afterShowPrevMonthChange);
              this.after("showNextMonthChange", this._afterShowNextMonthChange);
              this.after(
                "headerRendererChange",
                this._afterHeaderRendererChange
              );
              this.after(
                "customRendererChange",
                this._afterCustomRendererChange
              );
              this.after(
                "enabledDatesRuleChange",
                this._afterCustomRendererChange
              );
              this.after(
                "disabledDatesRuleChange",
                this._afterCustomRendererChange
              );
              this.after("focusedChange", this._afterFocusedChange);
              this.after("selectionChange", this._renderSelectedDates);
              this._bindCalendarEvents();
            },
            _getSelectedDatesList: function () {
              var a = [];
              I(
                this._selectedDates,
                function (c) {
                  I(
                    c,
                    function (c) {
                      I(
                        c,
                        function (c) {
                          a.push(c);
                        },
                        this
                      );
                    },
                    this
                  );
                },
                this
              );
              return a;
            },
            _getSelectedDatesInMonth: function (c) {
              var e = c.getFullYear();
              c = c.getMonth();
              return C(this._selectedDates, e) && C(this._selectedDates[e], c)
                ? a.Object.values(this._selectedDates[e][c])
                : [];
            },
            _isNumInList: function (a, c) {
              if ("all" === c) return !0;
              for (var e = c.split(","), d = e.length, g; d--; )
                if (
                  ((g = e[d].split("-")),
                  (2 === g.length &&
                    a >= parseInt(g[0], 10) &&
                    a <= parseInt(g[1], 10)) ||
                    (1 === g.length && parseInt(e[d], 10) === a))
                )
                  return !0;
              return !1;
            },
            _getRulesForDate: function (a) {
              var c = a.getFullYear(),
                e = a.getMonth(),
                d = a.getDate();
              a = a.getDay();
              var g = this._rules,
                h = [],
                l,
                k,
                m,
                n;
              for (l in g)
                if (this._isNumInList(c, l))
                  if (B.isString(g[l])) h.push(g[l]);
                  else
                    for (k in g[l])
                      if (this._isNumInList(e, k))
                        if (B.isString(g[l][k])) h.push(g[l][k]);
                        else
                          for (m in g[l][k])
                            if (this._isNumInList(d, m))
                              if (B.isString(g[l][k][m])) h.push(g[l][k][m]);
                              else
                                for (n in g[l][k][m])
                                  this._isNumInList(a, n) &&
                                    B.isString(g[l][k][m][n]) &&
                                    h.push(g[l][k][m][n]);
              return h;
            },
            _matchesRule: function (a, c) {
              return 0 <= J(this._getRulesForDate(a), c);
            },
            _canBeSelected: function (a) {
              var c = this.get("enabledDatesRule"),
                e = this.get("disabledDatesRule");
              return c
                ? this._matchesRule(a, c)
                : e
                ? !this._matchesRule(a, e)
                : !0;
            },
            selectDates: function (a) {
              v.isValidDate(a)
                ? this._addDateToSelection(a)
                : B.isArray(a) && this._addDatesToSelection(a);
              return this;
            },
            deselectDates: function (a) {
              a
                ? v.isValidDate(a)
                  ? this._removeDateFromSelection(a)
                  : B.isArray(a) && this._removeDatesFromSelection(a)
                : this._clearSelection();
              return this;
            },
            _addDateToSelection: function (a, c) {
              a = this._normalizeTime(a);
              if (this._canBeSelected(a)) {
                var e = a.getFullYear(),
                  d = a.getMonth(),
                  g = a.getDate();
                C(this._selectedDates, e)
                  ? C(this._selectedDates[e], d) ||
                    (this._selectedDates[e][d] = {})
                  : ((this._selectedDates[e] = {}),
                    (this._selectedDates[e][d] = {}));
                this._selectedDates[e][d][g] = a;
                this._selectedDates = O(this._selectedDates, [e, d, g], a);
                c || this._fireSelectionChange();
              }
            },
            _addDatesToSelection: function (a) {
              F(a, this._addDateToSelection, this);
              this._fireSelectionChange();
            },
            _addDateRangeToSelection: function (a, c) {
              var e = 6e4 * (c.getTimezoneOffset() - a.getTimezoneOffset()),
                d = a.getTime(),
                g = c.getTime(),
                h;
              d > g ? ((h = d), (d = g), (g = h + e)) : (g -= e);
              for (e = d; e <= g; e += 864e5)
                (d = new Date(e)),
                  d.setHours(12),
                  this._addDateToSelection(d, e);
              this._fireSelectionChange();
            },
            _removeDateFromSelection: function (a, c) {
              var e = a.getFullYear(),
                d = a.getMonth(),
                g = a.getDate();
              C(this._selectedDates, e) &&
                C(this._selectedDates[e], d) &&
                C(this._selectedDates[e][d], g) &&
                (delete this._selectedDates[e][d][g],
                c || this._fireSelectionChange());
            },
            _removeDatesFromSelection: function (a) {
              F(a, this._removeDateFromSelection, this);
              this._fireSelectionChange();
            },
            _removeDateRangeFromSelection: function (a, c) {
              for (var e = a.getTime(), d = c.getTime(); e <= d; e += 864e5)
                this._removeDateFromSelection(new Date(e), e);
              this._fireSelectionChange();
            },
            _clearSelection: function (a) {
              this._selectedDates = {};
              this.get("contentBox")
                .all("." + E)
                .removeClass(E)
                .setAttribute("aria-selected", !1);
              a || this._fireSelectionChange();
            },
            _fireSelectionChange: function () {
              this.fire("selectionChange", {
                newSelection: this._getSelectedDatesList(),
              });
            },
            _restoreModifiedCells: function () {
              var a = this.get("contentBox"),
                c;
              for (c in this._storedDateCells)
                a.one("#" + c).replace(this._storedDateCells[c]),
                  delete this._storedDateCells[c];
            },
            _renderCustomRules: function () {
              this.get("contentBox")
                .all("." + x + ",." + t)
                .removeClass(w)
                .setAttribute("aria-disabled", !1);
              if (!K(this._rules)) {
                var c, e;
                for (c = 0; c < this._paneNumber; c++)
                  (e = v.addMonths(this.get("date"), c)),
                    (e = v.listOfDatesInMonth(e)),
                    F(e, a.bind(this._renderCustomRulesHelper, this));
              }
            },
            _renderCustomRulesHelper: function (a) {
              var c = this.get("enabledDatesRule"),
                e = this.get("disabledDatesRule"),
                d;
              d = this._getRulesForDate(a);
              0 < d.length
                ? (((c && 0 > J(d, c)) || (!c && e && 0 <= J(d, e))) &&
                    this._disableDate(a),
                  B.isFunction(this._filterFunction) &&
                    ((c = this._dateToNode(a)),
                    (this._storedDateCells[c.get("id")] = c.cloneNode(!0)),
                    this._filterFunction(a, c, d)))
                : c && this._disableDate(a);
            },
            _renderSelectedDates: function () {
              this.get("contentBox")
                .all("." + E)
                .removeClass(E)
                .setAttribute("aria-selected", !1);
              var c, e;
              for (c = 0; c < this._paneNumber; c++)
                (e = v.addMonths(this.get("date"), c)),
                  (e = this._getSelectedDatesInMonth(e)),
                  F(e, a.bind(this._renderSelectedDatesHelper, this));
            },
            _renderSelectedDatesHelper: function (a) {
              this._dateToNode(a).addClass(E).setAttribute("aria-selected", !0);
            },
            _disableDate: function (a) {
              this._dateToNode(a).addClass(w).setAttribute("aria-disabled", !0);
            },
            _dateToNode: function (a) {
              var c = a.getDate(),
                e = 0,
                d = c % 7;
              a = (12 + a.getMonth() - this.get("date").getMonth()) % 12;
              var g =
                this._paneProperties[this._calendarId + "_pane_" + a].cutoffCol;
              switch (d) {
                case 0:
                  e = 6 <= g ? 12 : 5;
                  break;
                case 1:
                  e = 6;
                  break;
                case 2:
                  e = 0 < g ? 7 : 0;
                  break;
                case 3:
                  e = 1 < g ? 8 : 1;
                  break;
                case 4:
                  e = 2 < g ? 9 : 2;
                  break;
                case 5:
                  e = 3 < g ? 10 : 3;
                  break;
                case 6:
                  e = 4 < g ? 11 : 4;
              }
              return this.get("contentBox").one(
                "#" + this._calendarId + "_pane_" + a + "_" + e + "_" + c
              );
            },
            _nodeToDate: function (a) {
              a = a.get("id").split("_").reverse();
              var c = parseInt(a[2], 10);
              a = parseInt(a[0], 10);
              var e = v.addMonths(this.get("date"), c),
                c = e.getFullYear(),
                e = e.getMonth();
              return new Date(c, e, a, 12, 0, 0, 0);
            },
            _bindCalendarEvents: function () {},
            _normalizeDate: function (a) {
              return a
                ? new Date(a.getFullYear(), a.getMonth(), 1, 12, 0, 0, 0)
                : null;
            },
            _normalizeTime: function (a) {
              return a
                ? new Date(
                    a.getFullYear(),
                    a.getMonth(),
                    a.getDate(),
                    12,
                    0,
                    0,
                    0
                  )
                : null;
            },
            _getCutoffColumn: function (a, c) {
              return 6 - ((this._normalizeDate(a).getDay() - c + 7) % 7);
            },
            _turnPrevMonthOn: function (a) {
              var c = a.get("id"),
                e = v.daysInMonth(
                  v.addMonths(this._paneProperties[c].paneDate, -1)
                ),
                d;
              this._paneProperties[c].hasOwnProperty("daysInPrevMonth") ||
                (this._paneProperties[c].daysInPrevMonth = 0);
              if (e !== this._paneProperties[c].daysInPrevMonth) {
                this._paneProperties[c].daysInPrevMonth = e;
                for (d = 5; 0 <= d; d--)
                  a.one("#" + c + "_" + d + "_" + (d - 5)).set("text", e--);
              }
            },
            _turnPrevMonthOff: function (a) {
              var c = a.get("id"),
                e;
              this._paneProperties[c].daysInPrevMonth = 0;
              for (e = 5; 0 <= e; e--)
                a.one("#" + c + "_" + e + "_" + (e - 5)).setContent("&nbsp;");
            },
            _cleanUpNextMonthCells: function (a) {
              var c = a.get("id");
              a.one("#" + c + "_6_29").removeClass(t);
              a.one("#" + c + "_7_30").removeClass(t);
              a.one("#" + c + "_8_31").removeClass(t);
              a.one("#" + c + "_0_30").removeClass(t);
              a.one("#" + c + "_1_31").removeClass(t);
            },
            _turnNextMonthOn: function (a) {
              var c = 1,
                e = a.get("id"),
                d = this._paneProperties[e].daysInMonth,
                g = this._paneProperties[e].cutoffCol,
                h;
              for (h = d - 22; h < g + 7; h++)
                a.one("#" + e + "_" + h + "_" + (h + 23))
                  .set("text", c++)
                  .addClass(t);
              h = g;
              for (
                31 === d && 1 >= g ? (h = 2) : 30 === d && 0 === g && (h = 1);
                h < g + 7;
                h++
              )
                a.one("#" + e + "_" + h + "_" + (h + 30))
                  .set("text", c++)
                  .addClass(t);
            },
            _turnNextMonthOff: function (a) {
              var c = a.get("id"),
                e = this._paneProperties[c].daysInMonth,
                d = this._paneProperties[c].cutoffCol,
                g;
              for (g = e - 22; 12 >= g; g++)
                a.one("#" + c + "_" + g + "_" + (g + 23))
                  .setContent("&nbsp;")
                  .addClass(t);
              g = 0;
              for (
                31 === e && 1 >= d ? (g = 2) : 30 === e && 0 === d && (g = 1);
                12 >= g;
                g++
              )
                a.one("#" + c + "_" + g + "_" + (g + 30))
                  .setContent("&nbsp;")
                  .addClass(t);
            },
            _afterShowNextMonthChange: function () {
              var a = this.get("contentBox").one(
                "#" + this._calendarId + "_pane_" + (this._paneNumber - 1)
              );
              this._cleanUpNextMonthCells(a);
              this.get("showNextMonth")
                ? this._turnNextMonthOn(a)
                : this._turnNextMonthOff(a);
            },
            _afterShowPrevMonthChange: function () {
              var a = this.get("contentBox").one(
                "#" + this._calendarId + "_pane_0"
              );
              this.get("showPrevMonth")
                ? this._turnPrevMonthOn(a)
                : this._turnPrevMonthOff(a);
            },
            _afterHeaderRendererChange: function () {
              this.get("contentBox")
                .one("." + u)
                .setContent(this._updateCalendarHeader(this.get("date")));
            },
            _afterCustomRendererChange: function () {
              this._restoreModifiedCells();
              this._renderCustomRules();
            },
            _afterDateChange: function () {
              var a = this.get("contentBox"),
                c = a.one("." + H).one("." + u),
                e = a.all("." + m),
                d = this.get("date"),
                g = 0;
              a.setStyle("visibility", "hidden");
              c.setContent(this._updateCalendarHeader(d));
              this._restoreModifiedCells();
              e.each(function (a) {
                this._rerenderCalendarPane(v.addMonths(d, g++), a);
              }, this);
              this._afterShowPrevMonthChange();
              this._afterShowNextMonthChange();
              this._renderCustomRules();
              this._renderSelectedDates();
              a.setStyle("visibility", "inherit");
            },
            _initCalendarPane: function (c, e) {
              var h =
                  this.get("strings.very_short_weekdays") ||
                  "Su Mo Tu We Th Fr Sa".split(" "),
                m = a.Intl.get("datatype-date-format").A,
                g = this.get("strings.first_weekday") || 0,
                n = this._getCutoffColumn(c, g),
                l = v.daysInMonth(c),
                k = "     ".split(" "),
                s = {},
                r,
                p,
                q;
              s.weekday_row = "";
              for (r = g; r <= g + 6; r++)
                s.weekday_row += A(d.WEEKDAY_TEMPLATE, {
                  short_weekdayname: h[r % 7],
                  weekdayname: m[r % 7],
                });
              s.weekday_row_template = A(d.WEEKDAY_ROW_TEMPLATE, s);
              for (h = 0; 5 >= h; h++)
                for (m = 0; 12 >= m; m++) {
                  g = 7 * h - 5 + m;
                  r = e + "_" + m + "_" + g;
                  p = x;
                  1 > g ? (p = L) : g > l && (p = t);
                  if (1 > g || g > l) g = "&nbsp;";
                  q = m >= n && m < n + 7 ? "" : D;
                  k[h] += A(d.CALDAY_TEMPLATE, {
                    day_content: g,
                    calendar_col_class: "calendar_col" + m,
                    calendar_col_visibility_class: q,
                    calendar_day_class: p,
                    calendar_day_id: r,
                  });
                }
              s.body_template = "";
              F(k, function (a) {
                s.body_template += A(d.CALDAY_ROW_TEMPLATE, { calday_row: a });
              });
              s.calendar_pane_id = e;
              s.calendar_pane_tabindex = this.get("tabIndex");
              s.pane_arialabel = v.format(c, { format: "%B %Y" });
              k = A(A(d.CALENDAR_GRID_TEMPLATE, s), d.CALENDAR_STRINGS);
              this._paneProperties[e] = {
                cutoffCol: n,
                daysInMonth: l,
                paneDate: c,
              };
              return k;
            },
            _rerenderCalendarPane: function (a, c) {
              var e = this.get("strings.first_weekday") || 0,
                e = this._getCutoffColumn(a, e),
                d = v.daysInMonth(a),
                h = c.get("id"),
                m,
                l;
              c.setStyle("visibility", "hidden");
              c.setAttribute("aria-label", v.format(a, { format: "%B %Y" }));
              for (m = 0; 12 >= m; m++)
                if (
                  ((l = c.all(".calendar_col" + m)),
                  l.removeClass(D),
                  m < e || m >= e + 7)
                )
                  l.addClass(D);
                else
                  switch (m) {
                    case 0:
                      l = c.one("#" + h + "_0_30");
                      30 <= d
                        ? (l.set("text", "30"), l.removeClass(t).addClass(x))
                        : (l.setContent("&nbsp;"),
                          l.removeClass(x).addClass(t));
                      break;
                    case 1:
                      l = c.one("#" + h + "_1_31");
                      31 <= d
                        ? (l.set("text", "31"), l.removeClass(t).addClass(x))
                        : (l.setContent("&nbsp;"),
                          l.removeClass(x).addClass(t));
                      break;
                    case 6:
                      l = c.one("#" + h + "_6_29");
                      29 <= d
                        ? (l.set("text", "29"), l.removeClass(t).addClass(x))
                        : (l.setContent("&nbsp;"),
                          l.removeClass(x).addClass(t));
                      break;
                    case 7:
                      l = c.one("#" + h + "_7_30");
                      30 <= d
                        ? (l.set("text", "30"), l.removeClass(t).addClass(x))
                        : (l.setContent("&nbsp;"),
                          l.removeClass(x).addClass(t));
                      break;
                    case 8:
                      (l = c.one("#" + h + "_8_31")),
                        31 <= d
                          ? (l.set("text", "31"), l.removeClass(t).addClass(x))
                          : (l.setContent("&nbsp;"),
                            l.removeClass(x).addClass(t));
                  }
              this._paneProperties[h].cutoffCol = e;
              this._paneProperties[h].daysInMonth = d;
              this._paneProperties[h].paneDate = a;
              c.setStyle("visibility", "inherit");
            },
            _updateCalendarHeader: function (c) {
              var e = "",
                d = this.get("headerRenderer");
              a.Lang.isString(d)
                ? (e = v.format(c, { format: d }))
                : d instanceof Function && (e = d.call(this, c));
              return e;
            },
            _initCalendarHeader: function (a) {
              return A(
                A(d.HEADER_TEMPLATE, {
                  calheader: this._updateCalendarHeader(a),
                  calendar_id: this._calendarId,
                }),
                d.CALENDAR_STRINGS
              );
            },
            _initCalendarHTML: function (c) {
              var e = {},
                h = 0,
                m,
                g;
              e.header_template = this._initCalendarHeader(c);
              e.calendar_id = this._calendarId;
              e.body_template = A(A(d.CONTENT_TEMPLATE, e), d.CALENDAR_STRINGS);
              g = e.body_template.replace(
                /\{calendar_grid_template\}/g,
                a.bind(function () {
                  m = this._initCalendarPane(
                    v.addMonths(c, h),
                    e.calendar_id + "_pane_" + h
                  );
                  h++;
                  return m;
                }, this)
              );
              this._paneNumber = h;
              return g;
            },
          },
          {
            CALENDAR_STRINGS: {
              calendar_grid_class: m,
              calendar_body_class: q,
              calendar_hd_class: H,
              calendar_hd_label_class: u,
              calendar_weekdayrow_class: n,
              calendar_weekday_class: h,
              calendar_row_class: y,
              calendar_day_class: x,
              calendar_dayanchor_class: M,
              calendar_pane_class: N,
              calendar_right_grid_class: G,
              calendar_left_grid_class: e,
              calendar_status_class: c,
            },
            CONTENT_TEMPLATE:
              '<div class="yui3-g {calendar_pane_class}" id="{calendar_id}">{header_template}<div class="yui3-u-1">{calendar_grid_template}</div></div>',
            ONE_PANE_TEMPLATE:
              '<div class="yui3-g {calendar_pane_class}" id="{calendar_id}">{header_template}<div class="yui3-u-1">{calendar_grid_template}</div></div>',
            TWO_PANE_TEMPLATE:
              '<div class="yui3-g {calendar_pane_class}" id="{calendar_id}">{header_template}<div class="yui3-u-1-2"><div class = "{calendar_left_grid_class}">{calendar_grid_template}</div></div><div class="yui3-u-1-2"><div class = "{calendar_right_grid_class}">{calendar_grid_template}</div></div></div>',
            THREE_PANE_TEMPLATE:
              '<div class="yui3-g {calendar_pane_class}" id="{calendar_id}">{header_template}<div class="yui3-u-1-3"><div class="{calendar_left_grid_class}">{calendar_grid_template}</div></div><div class="yui3-u-1-3">{calendar_grid_template}</div><div class="yui3-u-1-3"><div class="{calendar_right_grid_class}">{calendar_grid_template}</div></div></div>',
            CALENDAR_GRID_TEMPLATE:
              '<table class="{calendar_grid_class}" id="{calendar_pane_id}" role="grid" aria-readonly="true" aria-label="{pane_arialabel}" tabindex="{calendar_pane_tabindex}"><thead>{weekday_row_template}</thead><tbody>{body_template}</tbody></table>',
            HEADER_TEMPLATE:
              '<div class="yui3-g {calendar_hd_class}"><div class="yui3-u {calendar_hd_label_class}" id="{calendar_id}_header" aria-role="heading">{calheader}</div></div>',
            WEEKDAY_ROW_TEMPLATE:
              '<tr class="{calendar_weekdayrow_class}" role="row">{weekday_row}</tr>',
            CALDAY_ROW_TEMPLATE:
              '<tr class="{calendar_row_class}" role="row">{calday_row}</tr>',
            WEEKDAY_TEMPLATE:
              '<th class="{calendar_weekday_class}" role="columnheader" aria-label="{weekdayname}">{short_weekdayname}</th>',
            CALDAY_TEMPLATE:
              '<td class="{calendar_col_class} {calendar_day_class} {calendar_col_visibility_class}" id="{calendar_day_id}" role="gridcell" tabindex="-1">{day_content}</td>',
            NAME: "calendarBase",
            ATTRS: {
              tabIndex: { value: 1 },
              date: {
                value: new Date(),
                setter: function (a) {
                  a = this._normalizeDate(a);
                  return v.areEqual(a, this.get("date")) ? this.get("date") : a;
                },
              },
              showPrevMonth: { value: !1 },
              showNextMonth: { value: !1 },
              strings: {
                valueFn: function () {
                  return a.Intl.get("calendar-base");
                },
              },
              headerRenderer: { value: "%B %Y" },
              enabledDatesRule: { value: null },
              disabledDatesRule: { value: null },
              selectedDates: {
                readOnly: !0,
                getter: function () {
                  return this._getSelectedDatesList();
                },
              },
              customRenderer: {
                lazyAdd: !1,
                value: {},
                setter: function (a) {
                  this._rules = a.rules;
                  this._filterFunction = a.filterFunction;
                },
              },
            },
          }
        );
      },
      "3.17.2",
      {
        requires: ["widget", "datatype-date", "datatype-date-math", "cssgrids"],
        lang: "de en es es-AR fr hu it ja nb-NO nl pt-BR ru zh-Hans zh-Hans-CN zh-Hant zh-Hant-HK zh-HANT-TW".split(
          " "
        ),
        skinnable: !0,
      }
    );
  },
  1620: function (w, y, q) {
    YUI.add(
      "calendarnavigator",
      function (a, p) {
        function d() {
          d.superclass.constructor.apply(this, arguments);
        }
        var c = a.ClassNameManager.getClassName,
          m = a.Lang.sub,
          e = a.Node.create,
          q = c("calendar", "header"),
          w = c("calendarnav", "prevmonth"),
          y = c("calendarnav", "nextmonth"),
          u = c("calendarnav", "month-disabled"),
          n = a.DataType.Date;
        d.NS = "navigator";
        d.NAME = "pluginCalendarNavigator";
        d.ATTRS = { shiftByMonths: { value: 1 } };
        d.CALENDARNAV_STRINGS = { prev_month_class: w, next_month_class: y };
        d.PREV_MONTH_CONTROL_TEMPLATE =
          '<a class="yui3-u {prev_month_class}" role="button" aria-label="{prev_month_arialabel}" tabindex="{control_tabindex}" />';
        d.NEXT_MONTH_CONTROL_TEMPLATE =
          '<a class="yui3-u {next_month_class}" role="button" aria-label="{next_month_arialabel}" tabindex="{control_tabindex}" />';
        a.extend(d, a.Plugin.Base, {
          _eventAttachments: {},
          _controls: {},
          initializer: function () {
            this._controls = {};
            this._eventAttachments = {};
            this.afterHostMethod("renderUI", this._initNavigationControls);
          },
          destructor: function () {},
          _focusNavigation: function (a) {
            a.currentTarget.focus();
          },
          _subtractMonths: function (a) {
            if (
              "click" === a.type ||
              ("keydown" === a.type && (13 === a.keyCode || 32 === a.keyCode))
            ) {
              var c = this.get("host"),
                e = c.get("date");
              c.set("date", n.addMonths(e, -1 * this.get("shiftByMonths")));
              a.preventDefault();
            }
          },
          _addMonths: function (a) {
            if (
              "click" === a.type ||
              ("keydown" === a.type && (13 === a.keyCode || 32 === a.keyCode))
            ) {
              var c = this.get("host"),
                e = c.get("date");
              c.set("date", n.addMonths(e, this.get("shiftByMonths")));
              a.preventDefault();
            }
          },
          _updateControlState: function () {
            var a = this.get("host"),
              c = a.get("date"),
              e = n.addMonths(c, a._paneNumber - 1),
              d = a._normalizeDate(a.get("minimumDate")),
              a = a._normalizeDate(a.get("maximumDate"));
            n.areEqual(d, c)
              ? (this._eventAttachments.prevMonth &&
                  (this._eventAttachments.prevMonth.detach(),
                  (this._eventAttachments.prevMonth = !1)),
                this._controls.prevMonth.hasClass(u) ||
                  this._controls.prevMonth
                    .addClass(u)
                    .setAttribute("aria-disabled", "true"))
              : (this._eventAttachments.prevMonth ||
                  (this._eventAttachments.prevMonth =
                    this._controls.prevMonth.on(
                      ["click", "keydown"],
                      this._subtractMonths,
                      this
                    )),
                this._controls.prevMonth.hasClass(u) &&
                  this._controls.prevMonth
                    .removeClass(u)
                    .setAttribute("aria-disabled", "false"));
            n.areEqual(a, e)
              ? (this._eventAttachments.nextMonth &&
                  (this._eventAttachments.nextMonth.detach(),
                  (this._eventAttachments.nextMonth = !1)),
                this._controls.nextMonth.hasClass(u) ||
                  this._controls.nextMonth
                    .addClass(u)
                    .setAttribute("aria-disabled", "true"))
              : (this._eventAttachments.nextMonth ||
                  (this._eventAttachments.nextMonth =
                    this._controls.nextMonth.on(
                      ["click", "keydown"],
                      this._addMonths,
                      this
                    )),
                this._controls.nextMonth.hasClass(u) &&
                  this._controls.nextMonth
                    .removeClass(u)
                    .setAttribute("aria-disabled", "false"));
            this._controls.prevMonth.on(
              ["click", "keydown"],
              this._focusNavigation,
              this
            );
            this._controls.nextMonth.on(
              ["click", "keydown"],
              this._focusNavigation,
              this
            );
          },
          _renderPrevControls: function () {
            var a = e(m(d.PREV_MONTH_CONTROL_TEMPLATE, d.CALENDARNAV_STRINGS));
            a.on("selectstart", this.get("host")._preventSelectionStart);
            return a;
          },
          _renderNextControls: function () {
            var a = e(m(d.NEXT_MONTH_CONTROL_TEMPLATE, d.CALENDARNAV_STRINGS));
            a.on("selectstart", this.get("host")._preventSelectionStart);
            return a;
          },
          _initNavigationControls: function () {
            var a = this.get("host"),
              c = a.get("contentBox").one("." + q);
            d.CALENDARNAV_STRINGS.control_tabindex = a.get("tabIndex");
            d.CALENDARNAV_STRINGS.prev_month_arialabel = "Go to previous month";
            d.CALENDARNAV_STRINGS.next_month_arialabel = "Go to next month";
            this._controls.prevMonth = this._renderPrevControls();
            this._controls.nextMonth = this._renderNextControls();
            this._updateControlState();
            a.after(
              ["dateChange", "minimumDateChange", "maximumDateChange"],
              this._updateControlState,
              this
            );
            c.prepend(this._controls.prevMonth);
            c.append(this._controls.nextMonth);
          },
        });
        a.namespace("Plugin").CalendarNavigator = d;
      },
      "3.17.2",
      {
        requires: ["plugin", "classnamemanager", "datatype-date", "node"],
        skinnable: !0,
      }
    );
  },
  1704: function (w, y, q) {
    YUI.add(
      "squarespace-calendar-day-template",
      function (a) {
        var p = a.Handlebars;
        (function () {
          var a = p.template;
          (p.templates = p.templates || {})["calendar-day.html"] = a(function (
            a,
            d,
            e,
            p,
            q
          ) {
            function w(a, c) {
              return "";
            }
            function u(a, c) {
              var d, b, f;
              d = '\n\t<div class="background';
              if (
                (f = e["if"].call(
                  a,
                  ((b =
                    ((b = ((b = a.events), null == b || !1 === b ? b : b[0])),
                    null == b || !1 === b ? b : b.structuredContent)),
                  null == b || !1 === b ? b : b.startDate),
                  { hash: {}, inverse: k.noop, fn: k.program(5, n, c), data: c }
                )) ||
                0 === f
              )
                d += f;
              return (d +=
                '">\n\t\t<a href="' +
                r(
                  ((b =
                    ((b = ((b = a.events), null == b || !1 === b ? b : b[0])),
                    null == b || !1 === b ? b : b.fullUrl)),
                  typeof b === s ? b.apply(a) : b)
                ) +
                '" class="background-image-link"><img data-src="' +
                r(
                  ((b =
                    ((b = ((b = a.events), null == b || !1 === b ? b : b[0])),
                    null == b || !1 === b ? b : b.assetUrl)),
                  typeof b === s ? b.apply(a) : b)
                ) +
                '" data-image-dimensions="' +
                r(
                  ((b =
                    ((b = ((b = a.events), null == b || !1 === b ? b : b[0])),
                    null == b || !1 === b ? b : b.originalSize)),
                  typeof b === s ? b.apply(a) : b)
                ) +
                '" data-load="false" class="background-image"></a>\n\t</div>\n\t');
            }
            function n(a, c) {
              return " background--iseventscollection";
            }
            function h(a, c) {
              return " itemlist--iseventscollection";
            }
            function y(a, c) {
              var d, b, f;
              d = '\n\t<li class="item';
              if (
                (b = e["if"].call(a, a.isMultiday, {
                  hash: {},
                  inverse: k.noop,
                  fn: k.program(11, E, c),
                  data: c,
                })) ||
                0 === b
              )
                d += b;
              if (
                (b = e["if"].call(a, a.isSubsequentDayOfMultidayEvent, {
                  hash: {},
                  inverse: k.noop,
                  fn: k.program(13, Q, c),
                  data: c,
                })) ||
                0 === b
              )
                d += b;
              d += '">\n\t\t<a href="';
              (b = e.fullUrl)
                ? (b = b.call(a, { hash: {}, data: c }))
                : ((b = a.fullUrl), (b = typeof b === s ? b.apply(a) : b));
              d +=
                r(b) +
                '" class="item-link">\n\t\t\t<span class="item-time item-time--12hr">';
              f = { hash: {}, data: c };
              d +=
                r(
                  ((b =
                    e["calendar-compact-time-format"] ||
                    a["calendar-compact-time-format"]),
                  b
                    ? b.call(
                        a,
                        ((b = a.structuredContent),
                        null == b || !1 === b ? b : b.startDate),
                        f
                      )
                    : z.call(
                        a,
                        "calendar-compact-time-format",
                        ((b = a.structuredContent),
                        null == b || !1 === b ? b : b.startDate),
                        f
                      ))
                ) +
                '&nbsp;</span>\n\t\t\t<span class="item-time item-time--24hr">';
              f = { hash: { format: "%H:%M" }, data: c };
              d +=
                r(
                  ((b = e["date-format"] || a["date-format"]),
                  b
                    ? b.call(
                        a,
                        ((b = a.structuredContent),
                        null == b || !1 === b ? b : b.startDate),
                        f
                      )
                    : z.call(
                        a,
                        "date-format",
                        ((b = a.structuredContent),
                        null == b || !1 === b ? b : b.startDate),
                        f
                      ))
                ) + '&nbsp;</span>\n\t\t\t<span class="item-title">';
              (b = e.title)
                ? (b = b.call(a, { hash: {}, data: c }))
                : ((b = a.title), (b = typeof b === s ? b.apply(a) : b));
              d += r(b) + "</span>\n\t\t\t";
              if (
                (b = e["if"].call(a, a.isMultiday, {
                  hash: {},
                  inverse: k.noop,
                  fn: k.program(15, R, c),
                  data: c,
                })) ||
                0 === b
              )
                d += b;
              return d + "\n\t\t</a>\n\t</li>\n\t";
            }
            function E(a, c) {
              return " item--multiday";
            }
            function Q(a, c) {
              return " item--ongoing";
            }
            function R(a, c) {
              var d, b;
              d = { hash: { format: "%b %e" }, data: c };
              return (d =
                '<span class="item-enddate">&nbsp;' +
                (r(
                  ((b = e["date-format"] || a["date-format"]),
                  b
                    ? b.call(
                        a,
                        ((b = a.structuredContent),
                        null == b || !1 === b ? b : b.endDate),
                        d
                      )
                    : z.call(
                        a,
                        "date-format",
                        ((b = a.structuredContent),
                        null == b || !1 === b ? b : b.endDate),
                        d
                      ))
                ) +
                  "</span>"));
            }
            function x(a, c) {
              return " flyoutitemlist--iseventscollection";
            }
            function L(a, c) {
              return " \n\t\tflyoutitemlist--hasmorecontent\n\t";
            }
            function t(a, c) {
              var d, b, f;
              d = "\n\t\t";
              f = {
                hash: {},
                inverse: k.noop,
                fn: k.program(22, M, c),
                data: c,
              };
              (b = e.events)
                ? (b = b.call(a, f))
                : ((b = a.events), (b = typeof b === s ? b.apply(a) : b));
              e.events || (b = P.call(a, b, f));
              if (b || 0 === b) d += b;
              return d + "\n\t";
            }
            function M(a, c) {
              var d, b;
              d = "\n\t\t\t";
              if (
                (b = e["if"].call(a, a.excerpt, {
                  hash: {},
                  inverse: k.program(25, B, c),
                  fn: k.program(23, N, c),
                  data: c,
                })) ||
                0 === b
              )
                d += b;
              return d + "\n\t\t";
            }
            function N(a, c) {
              return " \n\t\t\t\tflyoutitemlist--hasmorecontent\n\t\t\t";
            }
            function B(a, c) {
              var d, b, f;
              d = "\n\t\t\t\t";
              if (
                (f = e["if"].call(
                  a,
                  ((b = a.location),
                  null == b || !1 === b ? b : b.addressLine1),
                  {
                    hash: {},
                    inverse: k.noop,
                    fn: k.program(26, A, c),
                    data: c,
                  }
                )) ||
                0 === f
              )
                d += f;
              return d + "\n\t\t\t";
            }
            function A(a, c) {
              return " \n\t\t\t\t\tflyoutitemlist--hasmorecontent\n\t\t\t\t";
            }
            function F(a, c) {
              var d, b, f;
              d = '\n\t<li class="flyoutitem';
              if (
                (b = e["if"].call(a, a.isMultiday, {
                  hash: {},
                  inverse: k.noop,
                  fn: k.program(29, I, c),
                  data: c,
                })) ||
                0 === b
              )
                d += b;
              if (
                (b = e["if"].call(a, a.isSubsequentDayOfMultidayEvent, {
                  hash: {},
                  inverse: k.noop,
                  fn: k.program(31, J, c),
                  data: c,
                })) ||
                0 === b
              )
                d += b;
              d += '">\n\t\t<h1 class="flyoutitem-title"><a href="';
              (b = e.fullUrl)
                ? (b = b.call(a, { hash: {}, data: c }))
                : ((b = a.fullUrl), (b = typeof b === s ? b.apply(a) : b));
              d += r(b) + '" class="flyoutitem-link">';
              (b = e.title)
                ? (b = b.call(a, { hash: {}, data: c }))
                : ((b = a.title), (b = typeof b === s ? b.apply(a) : b));
              d += r(b);
              if (
                (b = e["if"].call(a, a.isMultiday, {
                  hash: {},
                  inverse: k.noop,
                  fn: k.program(33, C, c),
                  data: c,
                })) ||
                0 === b
              )
                d += b;
              d +=
                '&nbsp;<span class="flyoutitem-link-arrow"></span></a></h1>\n\t\t<div class="flyoutitem-datetime flyoutitem-datetime--12hr">\n\t\t\t';
              if (
                (b = e["if"].call(a, a.isMultiday, {
                  hash: {},
                  inverse: k.program(37, K, c),
                  fn: k.program(35, O, c),
                  data: c,
                })) ||
                0 === b
              )
                d += b;
              d +=
                '\n\t\t</div>\n\t\t<div class="flyoutitem-datetime flyoutitem-datetime--24hr">\n\t\t\t';
              if (
                (b = e["if"].call(a, a.isMultiday, {
                  hash: {},
                  inverse: k.program(41, S, c),
                  fn: k.program(39, v, c),
                  data: c,
                })) ||
                0 === b
              )
                d += b;
              d +=
                '\n\t\t</div>\n\t\t<div class="flyoutitem-location">\n\t\t\t';
              if (
                (f = e["if"].call(
                  a,
                  ((b = a.location),
                  null == b || !1 === b ? b : b.addressTitle),
                  {
                    hash: {},
                    inverse: k.noop,
                    fn: k.program(43, T, c),
                    data: c,
                  }
                )) ||
                0 === f
              )
                d += f;
              d += "\n\t\t\t";
              if (
                (f = e["if"].call(
                  a,
                  ((b = a.location),
                  null == b || !1 === b ? b : b.addressLine1),
                  {
                    hash: {},
                    inverse: k.noop,
                    fn: k.program(45, U, c),
                    data: c,
                  }
                )) ||
                0 === f
              )
                d += f;
              d += "\n\t\t\t";
              if (
                (f = e["if"].call(
                  a,
                  ((b = a.location),
                  null == b || !1 === b ? b : b.addressLine2),
                  {
                    hash: {},
                    inverse: k.noop,
                    fn: k.program(47, V, c),
                    data: c,
                  }
                )) ||
                0 === f
              )
                d += f;
              d += "\n\t\t\t";
              if (
                (f = e["if"].call(
                  a,
                  ((b = a.location),
                  null == b || !1 === b ? b : b.addressCountry),
                  {
                    hash: {},
                    inverse: k.noop,
                    fn: k.program(49, g, c),
                    data: c,
                  }
                )) ||
                0 === f
              )
                d += f;
              d += "\n\t\t</div>\n\t\t";
              if (
                (f = e["if"].call(a, a.excerpt, {
                  hash: {},
                  inverse: k.noop,
                  fn: k.program(51, W, c),
                  data: c,
                })) ||
                0 === f
              )
                d += f;
              return d + "\n\t</li>\n\t";
            }
            function I(a, c) {
              return " flyoutitem--multiday";
            }
            function J(a, c) {
              return " flyoutitem--ongoing";
            }
            function C(a, c) {
              var d, b;
              d = { hash: { format: "%b %e" }, data: c };
              return (d =
                ' <span class="flyoutitem-enddate">' +
                (r(
                  ((b = e["date-format"] || a["date-format"]),
                  b
                    ? b.call(
                        a,
                        ((b = a.structuredContent),
                        null == b || !1 === b ? b : b.endDate),
                        d
                      )
                    : z.call(
                        a,
                        "date-format",
                        ((b = a.structuredContent),
                        null == b || !1 === b ? b : b.endDate),
                        d
                      ))
                ) +
                  "</span>"));
            }
            function O(a, c) {
              var d, b, f;
              f = { hash: { format: "%a, %b %e, %l:%M%P" }, data: c };
              d =
                "\n\t\t\t\t" +
                (r(
                  ((b = e["date-format"] || a["date-format"]),
                  b
                    ? b.call(
                        a,
                        ((b = a.structuredContent),
                        null == b || !1 === b ? b : b.startDate),
                        f
                      )
                    : z.call(
                        a,
                        "date-format",
                        ((b = a.structuredContent),
                        null == b || !1 === b ? b : b.startDate),
                        f
                      ))
                ) +
                  " &ndash; ");
              f = { hash: { format: "%a, %b %e, %l:%M%P" }, data: c };
              return (d +=
                r(
                  ((b = e["date-format"] || a["date-format"]),
                  b
                    ? b.call(
                        a,
                        ((b = a.structuredContent),
                        null == b || !1 === b ? b : b.endDate),
                        f
                      )
                    : z.call(
                        a,
                        "date-format",
                        ((b = a.structuredContent),
                        null == b || !1 === b ? b : b.endDate),
                        f
                      ))
                ) + "\n\t\t\t");
            }
            function K(a, c) {
              var d, b, f;
              f = { hash: { format: "%l:%M%P" }, data: c };
              d =
                "\n\t\t\t\t" +
                (r(
                  ((b = e["date-format"] || a["date-format"]),
                  b
                    ? b.call(
                        a,
                        ((b = a.structuredContent),
                        null == b || !1 === b ? b : b.startDate),
                        f
                      )
                    : z.call(
                        a,
                        "date-format",
                        ((b = a.structuredContent),
                        null == b || !1 === b ? b : b.startDate),
                        f
                      ))
                ) +
                  " &ndash; ");
              f = { hash: { format: "%l:%M%P" }, data: c };
              return (d +=
                r(
                  ((b = e["date-format"] || a["date-format"]),
                  b
                    ? b.call(
                        a,
                        ((b = a.structuredContent),
                        null == b || !1 === b ? b : b.endDate),
                        f
                      )
                    : z.call(
                        a,
                        "date-format",
                        ((b = a.structuredContent),
                        null == b || !1 === b ? b : b.endDate),
                        f
                      ))
                ) + "\n\t\t\t");
            }
            function v(a, c) {
              var d, b, f;
              f = { hash: { format: "%a, %b %e, %H:%M" }, data: c };
              d =
                "\n\t\t\t\t" +
                (r(
                  ((b = e["date-format"] || a["date-format"]),
                  b
                    ? b.call(
                        a,
                        ((b = a.structuredContent),
                        null == b || !1 === b ? b : b.startDate),
                        f
                      )
                    : z.call(
                        a,
                        "date-format",
                        ((b = a.structuredContent),
                        null == b || !1 === b ? b : b.startDate),
                        f
                      ))
                ) +
                  " &ndash; ");
              f = { hash: { format: "%a, %b %e, %H:%M" }, data: c };
              return (d +=
                r(
                  ((b = e["date-format"] || a["date-format"]),
                  b
                    ? b.call(
                        a,
                        ((b = a.structuredContent),
                        null == b || !1 === b ? b : b.endDate),
                        f
                      )
                    : z.call(
                        a,
                        "date-format",
                        ((b = a.structuredContent),
                        null == b || !1 === b ? b : b.endDate),
                        f
                      ))
                ) + "\n\t\t\t");
            }
            function S(a, c) {
              var d, b, f;
              f = { hash: { format: "%H:%M" }, data: c };
              d =
                "\n\t\t\t\t" +
                (r(
                  ((b = e["date-format"] || a["date-format"]),
                  b
                    ? b.call(
                        a,
                        ((b = a.structuredContent),
                        null == b || !1 === b ? b : b.startDate),
                        f
                      )
                    : z.call(
                        a,
                        "date-format",
                        ((b = a.structuredContent),
                        null == b || !1 === b ? b : b.startDate),
                        f
                      ))
                ) +
                  " &ndash; ");
              f = { hash: { format: "%H:%M" }, data: c };
              return (d +=
                r(
                  ((b = e["date-format"] || a["date-format"]),
                  b
                    ? b.call(
                        a,
                        ((b = a.structuredContent),
                        null == b || !1 === b ? b : b.endDate),
                        f
                      )
                    : z.call(
                        a,
                        "date-format",
                        ((b = a.structuredContent),
                        null == b || !1 === b ? b : b.endDate),
                        f
                      ))
                ) + "\n\t\t\t");
            }
            function T(a, c) {
              var d, b;
              return (d =
                "" +
                ('<div class="flyoutitem-location-addresstitle">' +
                  r(
                    ((b =
                      ((b = a.location),
                      null == b || !1 === b ? b : b.addressTitle)),
                    typeof b === s ? b.apply(a) : b)
                  ) +
                  "</div>"));
            }
            function U(a, c) {
              var d, b;
              return (d =
                "" +
                ('<div class="flyoutitem-location-address1">' +
                  r(
                    ((b =
                      ((b = a.location),
                      null == b || !1 === b ? b : b.addressLine1)),
                    typeof b === s ? b.apply(a) : b)
                  ) +
                  "</div>"));
            }
            function V(a, c) {
              var d, b;
              return (d =
                "" +
                ('<div class="flyoutitem-location-address2">' +
                  r(
                    ((b =
                      ((b = a.location),
                      null == b || !1 === b ? b : b.addressLine2)),
                    typeof b === s ? b.apply(a) : b)
                  ) +
                  "</div>"));
            }
            function g(a, c) {
              var d, b;
              return (d =
                "" +
                ('<div class="flyoutitem-location-addresscountry">' +
                  r(
                    ((b =
                      ((b = a.location),
                      null == b || !1 === b ? b : b.addressCountry)),
                    typeof b === s ? b.apply(a) : b)
                  ) +
                  "</div>"));
            }
            function W(a, c) {
              var d, b;
              d = '<div class="flyoutitem-excerpt">';
              (b = e.excerpt)
                ? (b = b.call(a, { hash: {}, data: c }))
                : ((b = a.excerpt), (b = typeof b === s ? b.apply(a) : b));
              if (b || 0 === b) d += b;
              return d + "</div>";
            }
            this.compilerInfo = [4, ">= 1.0.0"];
            e = this.merge(e, a.helpers);
            q = q || {};
            a = "";
            var l,
              k = this,
              s = "function",
              r = this.escapeExpression,
              z = e.helperMissing,
              P = e.blockHelperMissing;
            if (
              (p = e["if"].call(
                d,
                ((l = ((l = d.events), null == l || !1 === l ? l : l[0])),
                null == l || !1 === l ? l : l.systemDataId),
                {
                  hash: {},
                  inverse: k.noop,
                  fn: k.program(
                    1,
                    function (a, c) {
                      var d, b, f;
                      d = "\n\t";
                      if (
                        (f = e["if"].call(
                          a,
                          ((b =
                            ((b = a.events), null == b || !1 === b ? b : b[1])),
                          null == b || !1 === b ? b : b.title),
                          {
                            hash: {},
                            inverse: k.program(4, u, c),
                            fn: k.program(2, w, c),
                            data: c,
                          }
                        )) ||
                        0 === f
                      )
                        d += f;
                      return d + "\n";
                    },
                    q
                  ),
                  data: q,
                }
              )) ||
              0 === p
            )
              a += p;
            p = { hash: { format: "%a" }, data: q };
            a =
              a +
              '\n\n<div class="marker">\n\t<div class="marker-dayname">' +
              (r(
                ((l = e["day-of-month-format"] || d["day-of-month-format"]),
                l
                  ? l.call(d, d.date, p)
                  : z.call(d, "day-of-month-format", d.date, p))
              ) +
                '</div>\n\t<div class="marker-daynum">');
            p = { hash: { format: "%e" }, data: q };
            a +=
              r(
                ((l = e["day-of-month-format"] || d["day-of-month-format"]),
                l
                  ? l.call(d, d.date, p)
                  : z.call(d, "day-of-month-format", d.date, p))
              ) + "</div>\n</div>\n\n";
            if (
              (p = e["if"].call(d, d.events, {
                hash: {},
                inverse: k.noop,
                fn: k.program(
                  7,
                  function (a, c) {
                    var d, b, f, g;
                    d = '\n<ul class="itemlist';
                    if (
                      (f = e["if"].call(
                        a,
                        ((b =
                          ((b =
                            ((b = a.events), null == b || !1 === b ? b : b[0])),
                          null == b || !1 === b ? b : b.structuredContent)),
                        null == b || !1 === b ? b : b.startDate),
                        {
                          hash: {},
                          inverse: k.noop,
                          fn: k.program(8, h, c),
                          data: c,
                        }
                      )) ||
                      0 === f
                    )
                      d += f;
                    d += '">\n\t';
                    g = {
                      hash: {},
                      inverse: k.noop,
                      fn: k.program(10, y, c),
                      data: c,
                    };
                    (f = e.events)
                      ? (f = f.call(a, g))
                      : ((f = a.events), (f = typeof f === s ? f.apply(a) : f));
                    e.events || (f = P.call(a, f, g));
                    if (f || 0 === f) d += f;
                    d += '\n</ul>\n\n<ul class="\n\tflyoutitemlist\n\t';
                    if (
                      (f = e["if"].call(
                        a,
                        ((b =
                          ((b =
                            ((b = a.events), null == b || !1 === b ? b : b[0])),
                          null == b || !1 === b ? b : b.structuredContent)),
                        null == b || !1 === b ? b : b.startDate),
                        {
                          hash: {},
                          inverse: k.noop,
                          fn: k.program(17, x, c),
                          data: c,
                        }
                      )) ||
                      0 === f
                    )
                      d += f;
                    d += "\n\t";
                    if (
                      (f = e["if"].call(
                        a,
                        ((b =
                          ((b = a.events), null == b || !1 === b ? b : b[1])),
                        null == b || !1 === b ? b : b.title),
                        {
                          hash: {},
                          inverse: k.program(21, t, c),
                          fn: k.program(19, L, c),
                          data: c,
                        }
                      )) ||
                      0 === f
                    )
                      d += f;
                    d += '\n">\n\t';
                    g = {
                      hash: {},
                      inverse: k.noop,
                      fn: k.program(28, F, c),
                      data: c,
                    };
                    (f = e.events)
                      ? (f = f.call(a, g))
                      : ((f = a.events), (f = typeof f === s ? f.apply(a) : f));
                    e.events || (f = P.call(a, f, g));
                    if (f || 0 === f) d += f;
                    return (d +=
                      '\n</ul>\n\n<div class="itemcount">' +
                      r(
                        ((b =
                          ((b = a.events),
                          null == b || !1 === b ? b : b.length)),
                        typeof b === s ? b.apply(a) : b)
                      ) +
                      "</div>\n");
                  },
                  q
                ),
                data: q,
              })) ||
              0 === p
            )
              a += p;
            return (a += "\n");
          });
        })();
        a.Handlebars.registerPartial(
          "calendar-day.html".replace("/", "."),
          p.templates["calendar-day.html"]
        );
      },
      "1.0",
      { requires: ["handlebars-base"] }
    );
  },
});
