webpackJsonp([16], {
  0: function (h, l, f) {
    f(831);
    f(1587);
    f(1588);
    f(1591);
    f(1592);
    f(832);
    f(833);
    f(834);
    f(1789);
    f(835);
    f(836);
    f(837);
    f(838);
    f(211);
    f(212);
    f(84);
    f(1790);
    f(1791);
    f(548);
    f(839);
    f(840);
    f(841);
    f(321);
    f(842);
    f(470);
    f(1792);
    f(1793);
    f(320);
    f(1626);
    f(1627);
    f(1624);
    f(1625);
    f(843);
    f(844);
    f(1622);
    f(318);
    f(319);
    f(1683);
    f(845);
    f(846);
    f(1794);
    f(1795);
    f(1796);
    f(1797);
    f(847);
    f(522);
    f(1705);
    f(49);
    f(848);
    f(1798);
    f(849);
    f(1799);
    f(519);
    f(520);
    f(1800);
  },
  49: function (h, l, f) {
    YUI.add(
      "squarespace-widgets-data-widget",
      function (a) {
        a.namespace("Squarespace.Widgets");
        var e = (a.Squarespace.Widgets.DataWidget = a.Base.create(
          "dataWidget",
          a.Squarespace.Widgets.SSWidget,
          [],
          {
            initializer: function (a) {
              a.dataState ||
                (this.getProperty("ASYNC_DATA")
                  ? this.set(
                      "dataState",
                      this.getProperty("DATA_STATES").INITIALIZED
                    )
                  : this.set(
                      "dataState",
                      this.getProperty("DATA_STATES").LOADED
                    ));
            },
            renderUI: function () {
              e.superclass.renderUI.call(this);
              this._updateDataStateClassName();
            },
            bindUI: function () {
              e.superclass.bindUI.call(this);
              var a = this.get("id");
              this.after(
                a + "|dataChange",
                function (a) {
                  a.noSyncUI || this.syncUI();
                },
                this
              );
              this.after(
                a + "|dataStateChange",
                this._updateDataStateClassName,
                this
              );
            },
            _updateDataStateClassName: function () {
              var b = this.get("boundingBox"),
                c = this.get("dataState");
              a.Object.each(this.getProperty("DATA_STATES"), function (a) {
                b.removeClass("data-state-" + a);
              });
              b.addClass("data-state-" + c);
            },
            setLoadingState: function () {
              return this.set(
                "dataState",
                this.getProperty("DATA_STATES").LOADING
              );
            },
            setLoadedState: function () {
              return this.set(
                "dataState",
                this.getProperty("DATA_STATES").LOADED
              );
            },
            setLoadFailedState: function () {
              return this.set(
                "dataState",
                this.getProperty("DATA_STATES").LOAD_FAILED
              );
            },
            loadedSuccessfully: function () {
              return (
                this.get("dataState") === this.getProperty("DATA_STATES").LOADED
              );
            },
            isLoading: function () {
              return (
                this.get("dataState") ===
                this.getProperty("DATA_STATES").LOADING
              );
            },
            loadFailed: function () {
              return (
                this.get("dataState") ===
                this.getProperty("DATA_STATES").LOAD_FAILED
              );
            },
          },
          {
            CSS_PREFIX: "sqs-data-widget",
            ASYNC_DATA: !1,
            DATA_STATES: {
              INITIALIZED: "initialized",
              LOADING: "loading",
              LOADED: "loaded",
              LOAD_FAILED: "load-failed",
            },
            ATTRS: {
              data: {
                value: null,
                validator: function (b) {
                  return a.Lang.isUndefined(b)
                    ? (console.warn(
                        this.name + ": Will not set data to undefined."
                      ),
                      !1)
                    : !0;
                },
              },
              dataState: {
                valueFn: function () {
                  return this.getProperty("DATA_STATES").INITIALIZED;
                },
              },
              preventRenderTemplate: {
                value: !1,
                validator: a.Squarespace.AttrValidators.isBoolean,
              },
            },
          }
        ));
      },
      "1.0",
      {
        requires: [
          "base",
          "node",
          "widget",
          "squarespace-ss-widget",
          "squarespace-attr-validators",
        ],
      }
    );
  },
  84: function (h, l, f) {
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
  211: function (h, l, f) {
    YUI.add(
      "squarespace-async-form",
      function (a) {
        a.namespace("Squarespace.Widgets");
        var e = (a.Squarespace.Widgets.AsyncForm = a.Base.create(
          "AsyncForm",
          a.Squarespace.Widgets.SSWidget,
          [],
          {
            initializer: function () {
              this._typeGetterMap = {
                date: this._getMultiFieldVal,
                name: this._getMultiFieldVal,
                time: this._getMultiFieldVal,
                address: this._getMultiFieldVal,
                checkbox: this._getOptionFieldVal,
                likert: this._getLikertFieldVal,
                radio: this._getRadioFieldVal,
                select: this._getSelectVal,
                phone: this._getPhoneFieldVal,
              };
              this._typeSetterMap = {
                date: this._setMultiFieldVal,
                name: this._setMultiFieldVal,
                time: this._setMultiFieldVal,
                address: this._setMultiFieldVal,
                checkbox: this._setOptionFieldVal,
                likert: this._setLikertFieldVal,
                radio: this._setRadioFieldVal,
                select: this._setSelectVal,
                phone: this._setPhoneFieldVal,
              };
              this._defaultGetter = this._getSingleFieldVal;
              this._defaultSetter = this._setSingleFieldVal;
            },
            renderUI: function () {
              e.superclass.renderUI.call(this);
              var b = this.get("form"),
                c = b.fields;
              a.Lang.isString(c[0]) && (c = a.Array.map(c, a.JSON.parse));
              var c = {
                  showTitle: this.get("showTitle"),
                  preventSubmit:
                    this.get("preventDefaultSubmit") ||
                    this.get("preventAllSubmits"),
                  hideSubmitButton: this.get("hideSubmitButton"),
                  formId: b.id,
                  formName: this.get("formName"),
                  formFields: c,
                  formSubmitButtonText: this.get("formSubmitButtonText"),
                  formSubmissionMessage: b.parsedSubmissionMessage,
                  formSubmissionHTML: b.submissionHTML,
                },
                b = this.get("contentBox"),
                d = this.get("formTemplate").html,
                c = a.JSONTemplate.evaluateJsonTemplate(d, c);
              b.append(c);
              this._formEl = b.one("form");
              this._setFormData();
            },
            bindUI: function () {
              this._formEl.on(
                "submit",
                function (b) {
                  if (
                    this.get("preventDefaultSubmit") &&
                    !this.get("preventAllSubmits")
                  ) {
                    this._clearErrors();
                    var c = this._validateForm(),
                      d = c.errors;
                    0 < d.length
                      ? this._renderErrors(d)
                      : this.fetchValidatedFormSubmission(
                          this.get("form").id,
                          a.bind(function () {
                            this.fire("submission", { data: c.data });
                          }, this),
                          a.bind(function (b) {
                            var d = [];
                            a.Object.each(b.errors, function (a, b) {
                              d.push({ fieldId: b, message: a });
                            });
                            this._renderErrors(d);
                          }, this)
                        );
                  }
                  b.halt();
                },
                this
              );
              this.after("formDataChange", this._setFormData, this);
            },
            setStateSaving: function () {
              var a = this.get("contentBox");
              a.addClass("saving");
              a.one('input[type="submit"]').set("value", "Saving...");
            },
            setStateEditing: function () {
              var a = this.get("contentBox"),
                c = this.get("formSubmitButtonText");
              a.one('input[type="submit"]').set("value", c);
              a.removeClass("saving");
            },
            getLocalValidationErrors: function () {
              return this._validateForm().errors;
            },
            fetchValidatedFormSubmission: function (b, c, d) {
              a.Data.post({
                url: "/api/rest/forms/validate/" + b,
                headers: { "Content-Type": "application/json" },
                data: JSON.stringify(this.getFormData()),
                success: c,
                failure: d,
              });
            },
            getFormData: function () {
              return this._validateForm().data;
            },
            _renderErrors: function (b) {
              a.Array.each(
                b,
                function (a) {
                  this.get("contentBox")
                    .one("#" + a.fieldId)
                    .one(".title")
                    .insert(
                      '<div class="field-error">' + a.message + "</div>",
                      "before"
                    );
                },
                this
              );
            },
            _clearErrors: function () {
              this.get("contentBox").all(".field-error").remove(!0);
            },
            _validateForm: function () {
              var a = {},
                c = [];
              this._formEl.all(".form-item").each(function (d) {
                var k = d.getAttribute("id");
                if ((d = this._getFieldData(d))) {
                  var g = d.error;
                  g && c.push({ fieldId: k, message: g });
                  a[k] = d.data;
                }
              }, this);
              return { data: a, errors: c };
            },
            _getFieldData: function (b) {
              var c = b.get("className").split(" "),
                d = null,
                k,
                g = !1;
              a.Array.each(
                c,
                function (b) {
                  a.Object.hasKey(this._typeGetterMap, b)
                    ? ((d = b), (k = this._typeGetterMap[d]))
                    : "section" === b && (g = !0);
                },
                this
              );
              if (!g)
                return null === d && (k = this._defaultGetter), k.call(this, b);
            },
            _getSingleFieldVal: function (b) {
              var c = b.one(".field-element");
              if (c) {
                var d = c.get("value"),
                  k,
                  d = !a.Lang.isValue(d) || "" === d;
                b.hasClass("required") && d && (k = "Required");
                return { data: c.get("value"), error: k };
              }
              return null;
            },
            _getMultiFieldVal: function (b) {
              var c = [],
                d,
                k = !1;
              b.all(".field-element").each(function (b) {
                var d = b.get("value");
                a.Lang.isValue(d) && "" !== d && (k = !0);
                c.push(b.get("value"));
              });
              b.hasClass("required") && !k && (d = "Required");
              return { data: c, error: d };
            },
            _getOptionFieldVal: function (a) {
              var c = [],
                d;
              a.all("input").each(function (a) {
                a.get("checked") && c.push(a.get("value"));
              }, this);
              a.hasClass("required") && 0 === c.length && (d = "Required");
              return { data: c, error: d };
            },
            _getLikertFieldVal: function (b) {
              var c = {};
              b.all(".item").each(function (b) {
                var k;
                b.all("input").each(function (a) {
                  a.get("checked") && (k = a.get("value"));
                });
                a.Lang.isValue(k) && (c[b.getAttribute("data-question")] = k);
              });
              return { data: c, error: void 0 };
            },
            _getRadioFieldVal: function (b) {
              var c, d;
              b.all("input").each(function (a) {
                a.get("checked") && (c = a.get("value"));
              }, this);
              b.hasClass("required") && !a.Lang.isValue(c) && (d = "Required");
              return { data: c, error: d };
            },
            _getSelectVal: function (b) {
              var c = b.one("select").get("value"),
                d,
                k = !a.Lang.isValue(c) || "" === c;
              b.hasClass("required") && k && (d = "Required");
              return { data: c, error: d };
            },
            _getPhoneFieldVal: function (a) {
              a = this._getMultiFieldVal(a);
              var c = a.data;
              c && 3 === c.length && c.unshift("");
              return a;
            },
            _setFormData: function () {
              var b = this.get("formData");
              null !== b &&
                this._formEl.all(".form-item").each(function (c) {
                  var d = b[c.getAttribute("id")];
                  if (d) {
                    var k = d.value,
                      d = a.Lang.isValue(k) ? k : d.values || [];
                    this._setFieldData(c, d);
                  }
                }, this);
            },
            _setFieldData: function (b, c) {
              var d = b.get("className").split(" "),
                k = null,
                g,
                n;
              a.Array.each(
                d,
                function (d) {
                  a.Object.hasKey(this._typeSetterMap, d)
                    ? ((k = d), (g = this._typeSetterMap[k]))
                    : "section" === d && (n = !0);
                  if (!n)
                    return (
                      null === k && (g = this._defaultSetter),
                      g.call(this, b, c)
                    );
                },
                this
              );
            },
            _setSingleFieldVal: function (a, c) {
              var d = a.one(".field-element");
              if (d) return d.set("value", c);
            },
            _setMultiFieldVal: function (a, c) {
              a.all(".field-element").each(function (a) {
                a.set("value", c[a.getData("title")]);
              });
            },
            _setOptionFieldVal: function (a, c) {
              a.all("input").each(function (a) {
                -1 !== c.indexOf(a.get("value")) &&
                  a.setAttribute("checked", "checked");
              }, this);
            },
            _setLikertFieldVal: function (b, c) {
              b.all(".item").each(function (b) {
                var k = b.getAttribute("data-question"),
                  k = c[k];
                a.Lang.isValue(k) &&
                  "" !== k &&
                  ((k = parseInt(k, 10) + 2),
                  b.all("input").item(k).setAttribute("checked", "checked"));
              });
            },
            _setRadioFieldVal: function (a, c) {
              a.all("input").each(function (a) {
                a.get("value") === c && a.setAttribute("checked", "checked");
              }, this);
            },
            _setSelectVal: function (a, c) {
              a.one("select").set("value", c);
            },
            _setPhoneFieldVal: function (a, c) {
              3 === a.all(".field").size() && 4 === c.length && c.shift();
              this._setMultiFieldVal(a, c);
            },
          },
          {
            CSS_PREFIX: "sqs-async-form",
            ATTRS: {
              form: { value: { fields: [] }, validator: a.Lang.isValue },
              formTemplate: { value: null },
              hideSubmitButton: { value: !1 },
              formSubmitButtonText: { value: "Add to Cart" },
              formName: { value: "My Form Name" },
              formData: { value: null },
              showTitle: { value: !0 },
              preventDefaultSubmit: { value: !0 },
              preventAllSubmits: { value: !1 },
            },
          }
        ));
      },
      "1.0",
      {
        requires: [
          "base",
          "node",
          "json",
          "squarespace-ss-widget",
          "squarespace-json-template",
        ],
      }
    );
  },
  212: function (h, l, f) {
    YUI.add(
      "squarespace-json-template",
      function (a) {
        function e(a) {
          return a.replace(/([\{\}\(\)\[\]\|\^\$\-\+\?])/g, "\\$1");
        }
        function b(a, b) {
          var d = p[a + b];
          void 0 === d &&
            ((d = "(" + e(a) + "\\S.*?" + e(b) + "\n?)"), (d = RegExp(d, "g")));
          return d;
        }
        function c(a, b) {
          var d = [{ context: a, index: -1 }];
          return {
            PushSection: function (a) {
              if (void 0 === a || null === a) return null;
              a =
                "@" == a
                  ? d[d.length - 1].context
                  : d[d.length - 1].context[a] || null;
              d.push({ context: a, index: -1 });
              return a;
            },
            Pop: function () {
              d.pop();
            },
            next: function () {
              var a = d[d.length - 1];
              -1 == a.index && ((a = { context: null, index: 0 }), d.push(a));
              var b = d[d.length - 2].context;
              if (a.index == b.length) d.pop();
              else return (a.context = b[a.index++]), !0;
            },
            _Undefined: function (a) {
              return void 0 === b ? null : b;
            },
            _LookUpStack: function (a) {
              for (var b = d.length - 1; ; ) {
                var c = d[b];
                if ("@index" == a) {
                  if (-1 != c.index) return c.index;
                } else if (
                  ((c = c.context),
                  "object" === typeof c && ((c = c[a]), void 0 !== c))
                )
                  return c;
                b--;
                if (-1 >= b) return this._Undefined(a);
              }
            },
            get: function (a) {
              if ("@" == a) return d[d.length - 1].context;
              var b = a.split("."),
                c = this._LookUpStack(b[0]);
              if (1 < b.length)
                for (var k = 1; k < b.length; k++) {
                  if (null === c) return "[JSONT: Can't resolve '" + a + "'.]";
                  c = c[b[k]];
                  if (void 0 === c) return this._Undefined(b[k]);
                }
              return c;
            },
          };
        }
        function d(a, b, d) {
          for (var c = 0; c < a.length; c++) {
            var k = a[c];
            if ("string" == typeof k) d(k);
            else (0, k[0])(k[1], b, d);
          }
        }
        function k(a, b, d) {
          var c;
          c = b.get(a.name);
          for (var k = 0; k < a.formatters.length; k++) {
            var g = a.formatters[k];
            c = (0, g[0])(c, b, g[1]);
          }
          d(c);
        }
        function g(a, b, c) {
          var k = b.PushSection(a.section_name),
            g = !1;
          k && (g = !0);
          k && 0 === k.length && (g = !1);
          g
            ? (d(a.Statements(), b, c), b.Pop())
            : (b.Pop(), d(a.Statements("or"), b, c));
        }
        function n(a, b, c) {
          for (var k = b.get("@"), g = 0; g < a.clauses.length; g++) {
            var n = a.clauses[g],
              e = n[1];
            if ((0, n[0][0])(k, b, n[0][1])) {
              d(e, b, c);
              break;
            }
          }
        }
        function v(a, b, c) {
          var k = b.PushSection(a.section_name);
          if (k && 0 < k.length) {
            var k = k.length - 1,
              g = a.Statements();
            a = a.Statements("alternate");
            for (var n = 0; void 0 !== b.next(); n++)
              d(g, b, c), n != k && d(a, b, c);
          } else d(a.Statements("or"), b, c);
          b.Pop();
        }
        function f(d, c) {
          function e(b) {
            if (b.startsWith(m)) {
              var d = c.partials[b.substr(m.length)];
              if (d)
                return [
                  function (b, c, k) {
                    return a.JSONTemplate.evaluateJsonTemplate(d, b);
                  },
                  null,
                ];
              throw {
                name: "BadPartialInclude",
                message:
                  b.substr(m) +
                  " is not a valid partial. Remember, loops are not supported (a partial include cannot be included inside itself).",
              };
            }
            var k = u.lookup(b);
            if (!k[0])
              throw {
                name: "BadFormatter",
                message: b + " is not a valid formatter",
              };
            return k;
          }
          function w(a) {
            var b = p.lookup(a);
            if (!b[0])
              throw {
                name: "BadPredicate",
                message: a + " is not a valid predicate",
              };
            return b;
          }
          var u = new t([
              q(a.JSONTemplate.DEFAULT_FORMATTERS),
              r(a.JSONTemplate.DEFAULT_PREFIX_FORMATTERS),
            ]),
            p = t([
              q(a.JSONTemplate.DEFAULT_PREDICATES),
              r(a.JSONTemplate.DEFAULT_PARAMETRIC_PREDICATES),
            ]),
            J = c.format_char || "|";
          if (":" != J && "|" != J)
            throw {
              name: "ConfigurationError",
              message: "Only format characters : and | are accepted",
            };
          var E = c.meta || "{}",
            F = E.length;
          if (1 == F % 2)
            throw {
              name: "ConfigurationError",
              message: E + " has an odd number of metacharacters",
            };
          for (
            var K = E.substring(0, F / 2),
              E = E.substring(F / 2, F),
              F = b(K, E),
              z = x({}),
              C = [z],
              L = K.length,
              y,
              s,
              H = 0;
            ;

          ) {
            y = F.exec(d);
            if (null === y) break;
            else s = y[0];
            y.index > H && ((H = d.slice(H, y.index)), z.Append(H));
            H = F.lastIndex;
            y = !1;
            "\n" == s.slice(-1) && ((s = s.slice(null, -1)), (y = !0));
            s = s.slice(L, -L);
            if ("#" != s.charAt(0)) {
              if ("." == s.charAt(0)) {
                s = s.substring(1, s.length);
                var A = {
                  "meta-left": K,
                  "meta-right": E,
                  space: " ",
                  tab: "\t",
                  newline: "\n",
                }[s];
                if (void 0 !== A) {
                  z.Append(A);
                  continue;
                }
                if ((A = s.match(l))) {
                  s = A[3];
                  A[1]
                    ? ((y = v), (s = h({ section_name: s })))
                    : ((y = g), (s = x({ section_name: s })));
                  z.Append([y, s]);
                  C.push(s);
                  z = s;
                  continue;
                }
                var D;
                if ((A = s.match(M))) {
                  y = (D = A[1]) ? w(D) : null;
                  z.NewOrClause(y);
                  continue;
                }
                var A = !1,
                  G = s.match(N);
                if (G) {
                  if (((D = G[1]), (A = !0), -1 == D.indexOf("?"))) {
                    y = [
                      (function (a) {
                        return function (b, d) {
                          var c, k, g;
                          if (-1 !== a.indexOf(" || ")) {
                            c = a.split("||");
                            for (g = 0; g < c.length; g++)
                              if (((k = c[g].trim()), d.get(k))) return !0;
                            return !1;
                          }
                          if (-1 !== a.indexOf(" && ")) {
                            c = a.split(" && ");
                            for (g = 0; g < c.length; g++)
                              if (((k = c[g].trim()), !d.get(k))) return !1;
                            return !0;
                          }
                          return d.get(a);
                        };
                      })(D),
                      null,
                    ];
                    s = I();
                    s.NewOrClause(y);
                    z.Append([n, s]);
                    C.push(s);
                    z = s;
                    continue;
                  }
                } else if (
                  "?" == s.charAt(s.length - 1) ||
                  "?" == s.split(" ")[0].charAt(s.split(" ")[0].length - 1)
                )
                  (D = s), (A = !0);
                if (A) {
                  y = D ? w(D) : null;
                  s = I();
                  s.NewOrClause(y);
                  z.Append([n, s]);
                  C.push(s);
                  z = s;
                  continue;
                }
                if ("alternates with" == s) {
                  z.AlternatesWith();
                  continue;
                }
                if ("end" == s) {
                  C.pop();
                  if (0 < C.length) z = C[C.length - 1];
                  else
                    throw {
                      name: "TemplateSyntaxError",
                      message: "Got too many {end} statements",
                    };
                  continue;
                }
              }
              G = s.split(J);
              if (1 == G.length) A = [e("str")];
              else {
                A = [];
                for (s = 1; s < G.length; s++) A.push(e(G[s]));
                s = G[0];
              }
              z.Append([k, { name: s, formatters: A }]);
              y && z.Append("\n");
            }
          }
          z.Append(d.slice(H));
          if (1 !== C.length)
            throw {
              name: "TemplateSyntaxError",
              message: "Got too few {end} statements.",
            };
          return z;
        }
        a.namespace("JSONTemplate");
        var m = "apply ",
          p = {};
        a.JSONTemplate.DEFAULT_FORMATTERS = a.Squarespace.TEMPLATE_FORMATTERS;
        a.JSONTemplate.DEFAULT_PREFIX_FORMATTERS = [].concat(
          a.Squarespace.TEMPLATE_PREFIX_FORMATTERS,
          [
            {
              name: "pluralize",
              func: function (a, b, d) {
                switch (d.length) {
                  case 0:
                    b = "";
                    d = "s";
                    break;
                  case 1:
                    b = "";
                    d = d[0];
                    break;
                  case 2:
                    b = d[0];
                    d = d[1];
                    break;
                  default:
                    throw {
                      name: "EvaluationError",
                      message: "pluralize got too many args",
                    };
                }
                return 1 == a ? b : d;
              },
            },
            {
              name: "encode-space",
              func: function (a, b, d) {
                return a.replace(/\s/g, "&nbsp;");
              },
            },
            {
              name: "truncate",
              func: function (a, b, d) {
                b = d[0] || 100;
                d = d[1] || "...";
                a &&
                  a.length > b &&
                  ((a = a.substring(0, b)),
                  (a = a.replace(/\w+$/, "")),
                  (a += d));
                return a;
              },
            },
            {
              name: "date",
              func: function (b, d, c) {
                var k = 0,
                  k = new Date(b).getTimezoneOffset();
                if (!a.Lang.isNumber(b)) return "Invalid date.";
                if ("undefined" !== typeof TimezoneJS) {
                  var g;
                  try {
                    g = new TimezoneJS.Date(b, d.get("website.timeZone"));
                  } catch (n) {
                    return "Invalid Timezone";
                  }
                  k =
                    (isNaN(g.getTimezoneOffset()) ? 0 : g.getTimezoneOffset()) -
                    k;
                } else
                  (d = -parseInt(d.get("website.timeZoneOffset"), 10) / 6e4),
                    (g = new Date().getTimezoneOffset()),
                    (k = d - g);
                b = new Date(b - 6e4 * k);
                c = c.join(" ");
                return a.DataType.Date.format(b, { format: c });
              },
            },
            {
              name: "image",
              func: function (b, d, c) {
                var k;
                b.mediaFocalPoint &&
                  (k = b.mediaFocalPoint.x + "," + b.mediaFocalPoint.y);
                return (
                  '<img class="' +
                  (c[0] ? c[0] : "thumb-image") +
                  '" ' +
                  (b.title
                    ? 'alt="' +
                      a.Squarespace.Escaping.escapeForHtmlTag(b.title) +
                      '" '
                    : "") +
                  ' data-image="' +
                  b.assetUrl +
                  '" data-image-dimensions="' +
                  b.originalSize +
                  '" data-image-focal-point="' +
                  k +
                  '"/>'
                );
              },
            },
            {
              name: "timesince",
              func: function (b, d, c) {
                if (!a.Lang.isNumber(b)) return "Invalid date.";
                c.join(" ");
                return (
                  '<span class="timesince" data-date="' +
                  b +
                  '">' +
                  a.Squarespace.DateUtils.humanizeDate(b) +
                  "</span>"
                );
              },
            },
            {
              name: "resizedHeightForWidth",
              func: function (a, b, d) {
                b = a.split("x");
                if (2 != b.length)
                  return "Invalid source parameter.  Pass in 'originalSize'.";
                a = parseInt(b[0], 10);
                b = parseInt(b[1], 10);
                d = parseInt(d[0], 10) / a;
                return parseInt(b * d, 10);
              },
            },
            {
              name: "resizedWidthForHeight",
              func: function (a, b, d) {
                b = a.split("x");
                if (2 != b.length)
                  return "Invalid source parameter.  Pass in 'originalSize'.";
                a = parseInt(b[0], 10);
                b = parseInt(b[1], 10);
                d = parseInt(d[0], 10) / b;
                return parseInt(a * d, 10);
              },
            },
            {
              name: "squarespaceThumbnailForWidth",
              func: function (b, d, c) {
                return a.Squarespace.Rendering.getSquarespaceSizeForWidth(
                  parseInt(c[0], 10)
                );
              },
            },
            {
              name: "squarespaceThumbnailForHeight",
              func: function (b, d, c) {
                d = b.split("x");
                if (2 != d.length)
                  return "Invalid source parameter.  Pass in 'originalSize'.";
                b = parseInt(d[0], 10);
                d = parseInt(d[1], 10);
                c = parseInt(c[0], 10) / d;
                c = parseInt(b * c, 10);
                return a.Squarespace.Rendering.getSquarespaceSizeForWidth(c);
              },
            },
            {
              name: "cycle",
              func: function (a, b, d) {
                return d[(a - 1) % d.length];
              },
            },
          ]
        );
        var q = function (a) {
            return {
              lookup: function (b) {
                return [a[b] || null, null];
              },
            };
          },
          r = function (a) {
            return {
              lookup: function (b) {
                for (var d = 0; d < a.length; d++) {
                  var c = a[d].name,
                    k = a[d].func;
                  if (b.slice(0, c.length) == c)
                    return (
                      (d = b.charAt(c.length)),
                      (b = "" === d ? [] : b.split(d).slice(1)),
                      [k, b]
                    );
                }
                return [null, null];
              },
            };
          },
          t = function (a) {
            return {
              lookup: function (b) {
                for (var d = 0; d < a.length; d++) {
                  var c = a[d].lookup(b);
                  if (c[0]) return c;
                }
                return [null, null];
              },
            };
          },
          u = function (a) {
            var b = {
              current_clause: [],
              Append: function (a) {
                b.current_clause.push(a);
              },
              AlternatesWith: function () {
                throw {
                  name: "TemplateSyntaxError",
                  message:
                    "{.alternates with} can only appear with in {.repeated section ...}",
                };
              },
              NewOrClause: function (a) {
                throw { name: "NotImplemented" };
              },
            };
            return b;
          },
          x = function (a) {
            var b = u(a);
            b.statements = { default: b.current_clause };
            b.section_name = a.section_name;
            b.Statements = function (a) {
              return b.statements[a || "default"] || [];
            };
            b.NewOrClause = function (a) {
              if (a)
                throw {
                  name: "TemplateSyntaxError",
                  message:
                    "{.or} clause only takes a predicate inside predicate blocks",
                };
              b.current_clause = [];
              b.statements.or = b.current_clause;
            };
            return b;
          },
          h = function (a) {
            var b = x(a);
            b.AlternatesWith = function () {
              b.current_clause = [];
              b.statements.alternate = b.current_clause;
            };
            return b;
          },
          I = function (a) {
            var b = u(a);
            b.clauses = [];
            b.NewOrClause = function (a) {
              a = a || [
                function (a) {
                  return !0;
                },
                null,
              ];
              b.current_clause = [];
              b.clauses.push([a, b.current_clause]);
            };
            return b;
          },
          l = /(repeated)?\s*(section)\s+(\S+)?/,
          M = /^or(?:[\s\-]+(.+))?/,
          N = /^if(?:[\s\-]+(.+))?/;
        a.JSONTemplate.Template = Class.create({
          initialize: function (a, b, d) {
            a = this.removeMultilineComments(a);
            this._options = b || {};
            this._program = f(a, this._options);
          },
          removeMultilineComments: function (a) {
            for (var b = a.search("{##"), d; 0 <= b; )
              (d = a.substr(b)),
                (a = a.substr(0, b) + d.substr(d.search("##}") + 3)),
                (b = a.search("{##"));
            return a;
          },
          render: function (a, b) {
            var k = c(a, this._options.undefined_str);
            d(this._program.Statements(), k, b);
          },
          expand: function (a) {
            var b = [];
            this.render(a, function (a) {
              b.push(a);
            });
            return b.join("");
          },
        });
        a.JSONTemplate.DEFAULT_PREDICATES = a.Squarespace.TEMPLATE_PREDICATES;
        a.JSONTemplate.DEFAULT_PARAMETRIC_PREDICATES =
          a.Squarespace.TEMPLATE_PARAMETRIC_PREDICATES;
        a.JSONTemplate.evaluateJsonTemplate = function (b, d, c) {
          return "string" != typeof b
            ? "JSON Template Error: Processing failed because no input was provided. (type: " +
                typeof b +
                ", template: " +
                JSON.stringify(b) +
                ", dictionary: " +
                JSON.stringify(d) +
                ", partials: " +
                JSON.stringify(c) +
                ")"
            : new a.JSONTemplate.Template(b, { partials: c }).expand(d);
        };
      },
      "1.0",
      {
        requires:
          "datatype-date-format squarespace-common squarespace-util squarespace-date-utils json squarespace-template-helpers".split(
            " "
          ),
      }
    );
  },
  318: function (h, l, f) {
    YUI.add(
      "squarespace-widgets-google-places-autocomplete",
      function (a) {
        a.namespace("Squarespace.Widgets");
        a.Squarespace.Widgets.GooglePlacesAutocomplete = a.Base.create(
          "GooglePlacesAutoCompleteWidget",
          a.Squarespace.Widgets.ScrollingAutoCompleteList,
          [a.Squarespace.Mixins.GooglePlacesAutocomplete],
          {},
          {
            CSS_PREFIX:
              a.Squarespace.Widgets.ScrollingAutoCompleteList.CSS_PREFIX,
          }
        );
      },
      "1.0",
      {
        requires: [
          "base",
          "squarespace-scrolling-auto-complete-list",
          "squarespace-mixins-google-places-autocomplete",
        ],
      }
    );
  },
  319: function (h, l, f) {
    YUI.add(
      "squarespace-scrolling-auto-complete-list",
      function (a) {
        a.namespace("Squarespace.Widgets");
        var e = (a.Squarespace.Widgets.ScrollingAutoCompleteList =
          a.Base.create(
            "ScrollingAutoCompleteList",
            a.AutoCompleteList,
            [],
            {
              initializer: function () {
                this.publish("keyboardContinue");
                this.publish("listMouseUp");
                this.publish("listMouseDown");
              },
              renderUI: function () {
                e.superclass.renderUI.call(this);
                var b = (this._scrollNode = a.Node.create(
                  '<div class="' +
                    this.getClassName() +
                    '-scroll-container"></div>'
                ));
                this.get("listNode").wrap(b);
                b.hide();
                (b = this.get("className")) &&
                  this.get("contentBox").addClass(b);
              },
              bindUI: function () {
                e.superclass.bindUI.call(this);
                var a = this._scrollNode,
                  c = this.get("inputNode");
                this.after(
                  "activeItemChange",
                  function (a) {
                    a.newVal && this._scrollToActiveItem();
                  },
                  this
                );
                this.on(
                  "results",
                  function (d) {
                    0 < d.results.length ? a.show() : a.hide();
                  },
                  this
                );
                this.on(["select", "clear"], function () {
                  a.hide();
                });
                this.get("boundingBox").on(
                  ["focusoutside", "clickoutside"],
                  function (d) {
                    a.hide();
                  }
                );
                c.on(
                  "keydown",
                  function (a) {
                    switch (a.keyCode) {
                      case 13:
                        this.selectItem();
                        this.fire("keyboardContinue");
                        break;
                      case 9:
                        this.get("activeItem") &&
                          (this.selectItem(), this.fire("keyboardContinue"));
                        break;
                      case 27:
                        this.hide();
                        break;
                      case 38:
                        this._activatePrevItem();
                        break;
                      case 40:
                        this._activateNextItem();
                    }
                  },
                  this
                );
                this._listNode.delegate(
                  "mouseup",
                  function (a) {
                    this.fire("listMouseUp");
                    a.preventDefault();
                  },
                  this._SELECTOR_ITEM,
                  this
                );
                this._listNode.delegate(
                  "mousedown",
                  function (a) {
                    this.fire("listMouseDown");
                  },
                  this._SELECTOR_ITEM,
                  this
                );
              },
              _activateNextItem: function () {
                e.superclass._activateNextItem.call(this);
                a.Lang.isNull(this.get("activeItem")) &&
                  this.set("activeItem", this._getFirstItemNode());
              },
              _activatePrevItem: function () {
                e.superclass._activatePrevItem.call(this);
                a.Lang.isNull(this.get("activeItem")) &&
                  this.set("activeItem", this._getLastItemNode());
              },
              _scrollToActiveItem: function () {
                this.get("activeItem").scrollIntoView();
                var a = this._scrollNode,
                  c = a.get("scrollTop"),
                  d = a.one("li:first-child").get("offsetHeight");
                a.set("scrollTop", d * Math.round(c / d));
              },
            },
            {
              CSS_PREFIX: "sqs-scroll-ac",
              ATTRS: {
                className: {
                  validator: a.Squarespace.AttrValidators.isNullOrString,
                },
              },
            }
          ));
      },
      "1.0",
      {
        requires: [
          "base",
          "autocomplete",
          "lang/autocomplete-list",
          "squarespace-attr-validators",
          "event-outside",
        ],
      }
    );
  },
  320: function (h, l, f) {
    YUI.add(
      "squarespace-mixins-google-places-autocomplete",
      function (a) {
        a.namespace("Squarespace.Mixins");
        var e = {
            POSTAL_CODE: "postal_code",
            COUNTRY: "country",
            LOCALITY: "locality",
            ROUTE: "route",
            STREET_NUMBER: "street_number",
            ADMIN_LEVEL_1: "administrative_area_level_1",
            SUBLOCALITY: "sublocality",
            POSTAL_TOWN: "postal_town",
            NEIGHBORHOOD: "neighborhood",
          },
          b = a.Object.values(e),
          c = a.Squarespace.Localities.COUNTRY_OPTIONS,
          d = ["geocode"];
        a.Squarespace.Mixins.GooglePlacesAutocomplete = a.Base.create(
          "GooglePlacesAutocomplete",
          a.Base,
          [],
          {
            initializer: function () {
              this.publish("placeDetails");
              a.Do.after(this._afterRenderUI, this, "renderUI", this);
              a.Do.after(this._afterBindUI, this, "bindUI", this);
              this.after("render", this._enableBrowserAutoComplete, this);
              this.setAttrs({
                source: a.bind(this._accessAutocompleteService, this),
                enableCache: !1,
                resultTextLocator: "description",
                resultFilters: this._filterResults,
                resultFormatter: this._formatResults,
                minQueryLength: 3,
              });
            },
            _afterRenderUI: function () {
              var a = this.get("contentBox");
              a.addClass("sqs-google-places-autocomplete-mixin");
              a.one(".sqs-scroll-ac-scroll-container").append(
                '<div class="google-required-elements"><div class="google-attributions"></div><div class="powered-by-google"></div></div>'
              );
            },
            _afterBindUI: function () {
              this.before("select", this._getDetailsForPrediction, this);
              this.on("placeDetails", this._fillWithAddressLine1, this);
              this._inputNode.on(
                "focus",
                function () {
                  this._inputNode.setAttribute("autocomplete", "off");
                  this._inputIsFocused = !0;
                },
                this
              );
              this._inputNode.on(
                "blur",
                function () {
                  this._inputNode.setAttribute("autocomplete", "on");
                  this._inputIsFocused = !1;
                },
                this
              );
            },
            _enableBrowserAutoComplete: function () {
              this._inputNode.setAttribute("autocomplete", "on");
            },
            _getDetailsForPrediction: function (b) {
              b.halt();
              var d = b.result.raw;
              this._accessPlaceDetailsService(d, function (b, c) {
                if (
                  c === a.config.win.google.maps.places.PlacesServiceStatus.OK
                ) {
                  var k = this._extractPlaceComponents(b),
                    k = this._buildLocationPayload(k, d);
                  this.fire("placeDetails", { place: k });
                } else console.warn("Error communicating with Google Places API");
              });
            },
            _extractPlaceComponents: function (d) {
              return a.Array.reduce(d.address_components, {}, function (d, k) {
                var v = a.Array.find(k.types, function (d) {
                  return -1 !== a.Array.indexOf(b, d);
                });
                d[v] = v
                  ? v === e.ADMIN_LEVEL_1
                    ? k.short_name
                    : v === e.COUNTRY
                    ? c[k.short_name].title
                    : k.long_name
                  : "";
                return d;
              });
            },
            _buildLocationPayload: function (b, d) {
              var c = a.Object.getValue(b, "street_number") || "",
                v = a.Object.getValue(b, "route") || "",
                f = a.Object.getValue(b, "country") || "",
                m = a.Object.getValue(b, "locality") || "",
                p = a.Object.getValue(b, "sublocality") || "",
                q = a.Object.getValue(b, "neighborhood") || "",
                p = [a.Object.getValue(b, "postal_town") || "", m, p, q],
                m =
                  a.Array.find(p, function (b) {
                    return a.Array.find(d.terms, function (a) {
                      return a.value === b;
                    });
                  }) || m,
                c = this._getPreferredStreetNumber(v, c),
                p = a.Object.getValue(b, e.ADMIN_LEVEL_1) || "",
                q = a.Object.getValue(b, e.POSTAL_CODE) || "",
                r = a.Array.filter([m, p, q], function (a) {
                  return !!a;
                })
                  .join(", ")
                  .trim();
              return {
                address: (c + " " + v).trim(),
                country: f,
                city: m,
                state: p,
                zip: q,
                fullLocality: r,
              };
            },
            _getPreferredStreetNumber: function (a, b) {
              var d = this.get("query"),
                c = a.split(" ")[0],
                c = d.toLowerCase().indexOf(c.toLowerCase()),
                d = d.substring(0, c).trim();
              return d.length > b.length ? d : b;
            },
            _accessAutocompleteService: function (b, d) {
              if (this._autocompleteService) this._performAutoComplete(b, d);
              else
                a.Squarespace.GoogleMaps.Renderer.onReady(function () {
                  this._initAutocompleteService();
                  this._performAutoComplete(b, d);
                }, this);
            },
            _initAutocompleteService: function () {
              this._autocompleteService =
                new a.config.win.google.maps.places.AutocompleteService();
            },
            _performAutoComplete: function (b, c) {
              var n = { input: b, types: d },
                e = a.bind(function () {
                  this._inputIsFocused && c.apply(this, arguments);
                }, this);
              this._autocompleteService.getPlacePredictions(n, e);
            },
            _accessPlaceDetailsService: function (b, d) {
              if (this._placeDetailsService) this._getPlaceDetails(b, d);
              else
                a.Squarespace.GoogleMaps.Renderer.onReady(function () {
                  this._initPlaceDetailsService();
                  this._getPlaceDetails(b, d);
                }, this);
            },
            _initPlaceDetailsService: function () {
              this._placeDetailsService =
                new a.config.win.google.maps.places.PlacesService(
                  this.get("contentBox").one(".google-attributions")
                );
            },
            _getPlaceDetails: function (b, d) {
              this._placeDetailsService.getDetails(b, a.bind(d, this));
            },
            _formatResults: function (b, d) {
              return a.Array.map(
                d,
                function (b) {
                  var d = b.raw.terms,
                    c = b.raw.matched_substrings,
                    k = -1 !== a.Array.indexOf(b.raw.types, "street_address"),
                    g = d[0].offset + d[0].value.length,
                    d = d[1].offset + d[1].value.length,
                    e = k ? d : g;
                  return a.Array.map(
                    b.text.split(""),
                    function (a, d) {
                      var k = ["google-ac-character"];
                      this._indexWithinMatchedSubstring(d, c) &&
                        k.push("google-ac-matched-character");
                      k =
                        '<span class="' +
                        k.join(" ").trim() +
                        '">' +
                        a +
                        "</span>";
                      return 0 === d
                        ? '<div class="google-ac-address">' + k
                        : d === e
                        ? k + "</div>"
                        : d === e + 1
                        ? '<div class="google-ac-trailing">' + k
                        : d === b.text.length
                        ? k + "</div>"
                        : k;
                    },
                    this
                  ).join("");
                },
                this
              );
            },
            _indexWithinMatchedSubstring: function (b, d) {
              return a.Array.some(d, function (a) {
                return b >= a.offset && b < a.offset + a.length;
              });
            },
            _filterResults: function (b, d) {
              return a.Array.filter(
                d,
                function (a) {
                  return (
                    this._predictionHasRouteComponent(a.raw) &&
                    this._predictionContainsCountryInList(a.raw)
                  );
                },
                this
              );
            },
            _predictionContainsCountryInList: function (b) {
              var d = this.get("countriesAllowed");
              return !a.Lang.isArray(d) || 0 === d.length
                ? !0
                : a.Array.find(d, function (a) {
                    return -1 !== b.description.indexOf(a);
                  });
            },
            _predictionHasRouteComponent: function (b) {
              return -1 !== a.Array.indexOf(b.types, e.ROUTE);
            },
          },
          {
            ATTRS: {
              countriesAllowed: {
                validator: a.Squarespace.AttrValidators.isNullOrArray,
              },
            },
          }
        );
      },
      "1.0",
      {
        requires:
          "autocomplete-highlighters base event-custom squarespace-attr-validators squarespace-google-maps-renderer squarespace-localities squarespace-util".split(
            " "
          ),
      }
    );
  },
  321: function (h, l, f) {
    var a = f(1992),
      e = f(2011);
    YUI.add("squarespace-localities", function (b) {
      b.namespace("Squarespace");
      b.Squarespace.Localities = {
        COUNTRY_OPTIONS: b.merge(
          { "": { title: "Not Specified", empty: !0 } },
          e(a, function (a) {
            return { title: a };
          })
        ),
        STATE_OPTIONS: {
          AL: { title: "Alabama" },
          AK: { title: "Alaska" },
          AZ: { title: "Arizona" },
          AR: { title: "Arkansas" },
          CA: { title: "California" },
          CO: { title: "Colorado" },
          CT: { title: "Connecticut" },
          DE: { title: "Delaware" },
          FL: { title: "Florida" },
          GA: { title: "Georgia" },
          HI: { title: "Hawaii" },
          ID: { title: "Idaho" },
          IL: { title: "Illinois" },
          IN: { title: "Indiana" },
          IA: { title: "Iowa" },
          KS: { title: "Kansas" },
          KY: { title: "Kentucky" },
          LA: { title: "Louisiana" },
          ME: { title: "Maine" },
          MD: { title: "Maryland" },
          MA: { title: "Massachusetts" },
          MI: { title: "Michigan" },
          MN: { title: "Minnesota" },
          MS: { title: "Mississippi" },
          MO: { title: "Missouri" },
          MT: { title: "Montana" },
          NE: { title: "Nebraska" },
          NV: { title: "Nevada" },
          NH: { title: "New Hampshire" },
          NJ: { title: "New Jersey" },
          NM: { title: "New Mexico" },
          NY: { title: "New York" },
          NC: { title: "North Carolina" },
          ND: { title: "North Dakota" },
          OH: { title: "Ohio" },
          OK: { title: "Oklahoma" },
          OR: { title: "Oregon" },
          PA: { title: "Pennsylvania" },
          RI: { title: "Rhode Island" },
          SC: { title: "South Carolina" },
          SD: { title: "South Dakota" },
          TN: { title: "Tennessee" },
          TX: { title: "Texas" },
          UT: { title: "Utah" },
          VT: { title: "Vermont" },
          VA: { title: "Virginia" },
          WA: { title: "Washington" },
          DC: { title: "Washington, District of Columbia" },
          WV: { title: "West Virginia" },
          WI: { title: "Wisconsin" },
          WY: { title: "Wyoming" },
          AA: { title: "Armed Forces Europe" },
          AE: { title: "Armed Forces Americas" },
          AP: { title: "Armed Forces Pacific" },
        },
      };
      b.Squarespace.Localities.COUNTRIES_TO_STATES = {
        US: b.Squarespace.Localities.STATE_OPTIONS,
        CA: {
          ON: { title: "Ontario" },
          QC: { title: "Quebec" },
          NS: { title: "Nova Scotia" },
          NB: { title: "New Brunswick" },
          MB: { title: "Manitoba" },
          BC: { title: "British Columbia" },
          PE: { title: "Prince Edward Island" },
          SK: { title: "Saskatchewan" },
          AB: { title: "Alberta" },
          NL: { title: "Newfoundland and Labrador" },
          NT: { title: "Northwest Territories" },
          YT: { title: "Yukon" },
          NU: { title: "Nunavut" },
        },
      };
      b.Squarespace.Localities.countryCodeFromName = function (a) {
        for (var d in b.Squarespace.Localities.COUNTRY_OPTIONS)
          if (b.Squarespace.Localities.COUNTRY_OPTIONS[d].title === a) return d;
      };
      var c = function (a) {
          return b.Array.reduce(b.Object.keys(a).sort(), [], function (b, d) {
            b.push({ label: a[d].title, value: d });
            return b;
          });
        },
        d = function (a) {
          return a.sort(function (a, b) {
            return a.label < b.label ? -1 : 1;
          });
        };
      b.Squarespace.Localities.getAllCountryNames = function () {
        var a = [];
        b.Object.each(b.Squarespace.Localities.COUNTRY_OPTIONS, function (b) {
          b.empty || a.push(b.title);
        });
        return a;
      };
      b.Squarespace.Localities.getNewCountryOptions = function () {
        return d(c(b.Squarespace.Localities.COUNTRY_OPTIONS));
      };
      b.Squarespace.Localities.getNewStateOptionsForCountry = function (a) {
        return c(b.Squarespace.Localities.COUNTRIES_TO_STATES[a]);
      };
      b.Squarespace.Localities.getAmericentricSortedCountryOptions =
        function () {
          var a = b.Array.filter(
            b.Squarespace.Localities.getNewCountryOptions(),
            function (a) {
              return "" !== a.value;
            }
          );
          a.sort(function (a, b) {
            return a.label > b.label ? 1 : a.label < b.label ? -1 : 0;
          });
          return a;
        };
    });
  },
  470: function (h, l, f) {
    YUI.add(
      "squarespace-plugin-pulsewarn",
      function (a) {
        a.namespace("Squarespace.Plugin");
        a.Squarespace.Plugin.PulseWarn = a.Base.create(
          "pulseWarn",
          a.Plugin.Base,
          [],
          {
            initializer: function (e) {
              this.config = e;
              this.set("color", e.color);
              this.set("useClass", e.useClass);
              this.set("targetClass", e.targetClass);
              this.set("iterations", e.iterations);
              this.get("host").addClass("pulse-warnable");
              a.Lang.isUndefined(e.interval) ||
                this.set("interval", e.interval);
              this._timer = null;
            },
            destructor: function () {
              this._timer && (this._timer.cancel(), (this._timer = null));
            },
            warn: function () {
              var e = this.get("host"),
                b = this.get("iterations"),
                c = e.getStyle("backgroundColor"),
                d = this.get("color");
              a.Lang.isNull(this._timer) ||
                (this._timer.cancel(), (this._timer = null));
              if (this.get("useClass")) {
                var k = this.get("targetClass"),
                  c = this.get("interval");
                this.fire("start");
                e.addClass(k);
                this._timer = a.later(
                  c,
                  this,
                  function () {
                    0 === b
                      ? (e.removeClass(k),
                        this.fire("stop"),
                        this._timer.cancel(),
                        (this._timer = null))
                      : (e.hasClass(k) ? e.removeClass(k) : e.addClass(k), b--);
                  },
                  {},
                  !0
                );
              } else {
                var g = new a.Anim({
                    node: e,
                    to: { backgroundColor: d, opacity: 0.8 },
                    easing: this.get("easingUp"),
                    duration: this.get("duration"),
                  }),
                  n = new a.Anim({
                    node: e,
                    to: { backgroundColor: c, opacity: 1 },
                    easing: this.get("easingDown"),
                    duration: this.get("duration"),
                  });
                g.on("end", function () {
                  0 < b && n.run();
                  b--;
                });
                n.on(
                  "end",
                  function () {
                    0 < b ? g.run() : this.fire("stop");
                  },
                  this
                );
                this.fire("start");
                g.run();
              }
            },
          },
          {
            NS: "pulseWarn",
            ATTRS: {
              useClass: { value: !1 },
              iterations: { value: 3 },
              color: { value: "#c1b12e" },
              interval: { value: 2e3 },
              duration: { value: 0.7 },
              easingUp: { value: a.Easing.easeInSine },
              easingDown: { value: a.Easing.easeOutSine },
            },
          }
        );
      },
      "1.0",
      { requires: ["base", "plugin", "anim"] }
    );
  },
  519: function (h, l, f) {
    YUI.add(
      "squarespace-plugin-money-formatter",
      function (a) {
        a.namespace("Squarespace.Plugin");
        a.Squarespace.Plugin.MoneyFormatter = a.Base.create(
          "moneyFormatter",
          a.Squarespace.Plugin.NumericFormatter,
          [],
          {
            _transformToData: function (e) {
              return Number(a.Squarespace.Utils.convertToCents(e));
            },
          },
          {
            NS: "moneyFormatterPlugin",
            ATTRS: {
              prefixUnit: {
                valueFn: function () {
                  return a.Squarespace.Commerce.currencySymbol();
                },
              },
              displayFormatter: { value: a.Squarespace.Commerce.moneyFormat },
            },
          }
        );
      },
      "1.0",
      {
        requires: [
          "plugin",
          "squarespace-util",
          "squarespace-commerce-utils",
          "squarespace-plugin-numeric-formatter",
        ],
      }
    );
  },
  520: function (h, l, f) {
    YUI.add(
      "squarespace-plugin-numeric-formatter",
      function (a) {
        a.namespace("Squarespace.Plugin");
        a.Squarespace.Plugin.NumericFormatter = a.Base.create(
          "numericFormatter",
          a.Plugin.Base,
          [],
          {
            initializer: function () {
              a.Lang.isNumber(Number(this.get("host").get("value")))
                ? this.set("data", Number(this.get("host").get("value")))
                : this.set("data", 0);
              this.set("displayString", this._format(this.get("data")));
              this._bindUI();
              this._syncUI();
            },
            _format: function (a) {
              return this.get("displayFormatter")(a);
            },
            _syncUI: function () {
              var e = this.get("data"),
                b = this.get("displayString");
              this.get("hasFocus")
                ? this.get("host").set("value", 0 < e ? b : "")
                : ((b = ""),
                  a.Lang.isNull(this.get("prefixUnit")) ||
                    (b += this.get("prefixUnit")),
                  (b += this._format(e)),
                  a.Lang.isNull(this.get("postfixUnit")) ||
                    (b += " " + this.get("postfixUnit")),
                  this.get("host").set("value", b));
            },
            _bindUI: function () {
              var a = this.get("host");
              this.on("displayStringChange", this._syncUI, this);
              a.on("valuechange", this._onValueChange, this);
              a.on("keydown", this._onKeyDown, this);
              a.on("focus", this._onFocus, this);
              a.on("blur", this._onBlur, this);
            },
            _onFocus: function () {
              this.set("hasFocus", !0);
              this._syncUI();
              setTimeout(
                a.bind(function () {
                  this.get("host").select();
                }, this),
                0
              );
            },
            _onBlur: function () {
              this.set("hasFocus", !1);
              this.set("displayString", this._format(this.get("data")));
            },
            _onKeyDown: function (a) {
              var b;
              b = this.get("host").get("value");
              -1 < [9, 13, 8, 46, 37, 39].indexOf(a.keyCode) ||
                ((b =
                  96 <= a.keyCode && 105 >= a.keyCode
                    ? String.fromCharCode(a.keyCode - 48)
                    : 190 === a.keyCode || 110 === a.keyCode
                    ? -1 < b.indexOf(".")
                      ? "x"
                      : "."
                    : String.fromCharCode(a.keyCode)),
                isFinite(Number(b)) ||
                  "." === b ||
                  (a.stopPropagation(), a.preventDefault()));
            },
            _onValueChange: function () {
              var a = this.get("host").get("value"),
                a = this._transformToData(a);
              this.set("data", a);
            },
            _displayFormatter: function (a) {
              return a;
            },
            _transformToData: function (e) {
              var b;
              a.Lang.isUndefined(this.get("prefixUnit")) ||
                (b = String(e).replace(RegExp(this.get("prefixUnit"))));
              a.Lang.isUndefined(this.get("postfixUnit")) ||
                (b = String(e).replace(RegExp(this.get("postfixUnit"))));
              return Number(b);
            },
          },
          {
            NS: "numericFormatterPlugin",
            ATTRS: {
              hasFocus: { value: !1 },
              data: { value: null },
              displayString: { value: null },
              prefixUnit: { value: null },
              postfixUnit: { value: null },
              displayFormatter: {
                value: function (a) {
                  return a;
                },
              },
            },
          }
        );
      },
      "1.0",
      { requires: ["plugin", "squarespace-util"] }
    );
  },
  522: function (h, l, f) {
    YUI.add(
      "squarespace-basic-check",
      function (a) {
        var e = function (a) {
          return function (b) {
            b.halt();
            a.call(this, b);
          };
        };
        a.namespace("Squarespace.Widgets");
        var b = (a.Squarespace.Widgets.BasicCheck = a.Base.create(
          "basicCheck",
          a.Squarespace.Widgets.DataWidget,
          [],
          {
            bindUI: function () {
              b.superclass.bindUI.call(this);
              this.get("boundingBox").on("click", e(this._toggleActive), this);
            },
            renderUI: function () {
              var b = this.get("contentBox");
              a.Lang.isValue(this.get("title")) &&
                b.append('<div class="title">' + this.get("title") + "</div>");
              var d = a.Node.create('<div class="check-element"></div>');
              b.append(d);
              a.Lang.isValue(this.get("label")) &&
                d.append('<div class="label">' + this.get("label") + "</div>");
            },
            syncUI: function () {
              b.superclass.syncUI.call(this);
              this.get("contentBox")
                .one(".check-element")
                .toggleClass("active", this.get("data"));
            },
            _toggleActive: function () {
              this.set("data", !this.get("data"));
            },
          },
          {
            CSS_PREFIX: "sqs-basic-check",
            ATTRS: {
              data: { value: !1, validator: a.Lang.isBoolean },
              name: { value: null },
              title: { value: null },
              label: { value: null },
            },
          }
        ));
      },
      "1.0",
      {
        requires: [
          "base",
          "squarespace-dialog-check-template",
          "squarespace-widgets-data-widget",
        ],
      }
    );
  },
  548: function (h, l, f) {
    YUI.add(
      "squarespace-product-utils",
      function (a) {
        a.Squarespace.ProductUtils = {
          getProductAveragePrice: function (e) {
            e = e.get("structuredContent");
            if (e.get("productType") === a.Squarespace.ProductTypes.DIGITAL)
              return e.get("priceCents");
            e = e.get("variants");
            return (
              a.Array.reduce(e, 0, function (a, c) {
                return a + (c.onSale ? c.salePrice : c.price);
              }) / e.length
            );
          },
          getProductEffectiveStock: function (e) {
            e = e.get("structuredContent");
            if (e.get("productType") === a.Squarespace.ProductTypes.DIGITAL)
              return Number.MAX_VALUE;
            e = e.get("variants");
            var b = 0;
            a.Array.some(e, function (a) {
              if (a.unlimited) return (b = Number.MAX_VALUE), !0;
              b += a.qtyInStock;
            });
            return b;
          },
          initializeVariantDropdowns: function () {
            a.all(".product-variants[data-variants]").each(function (e) {
              var b = JSON.parse(e.getAttribute("data-variants")),
                c = e.all("select"),
                d = e.siblings(".product-price").item(0),
                k;
              d && (k = d.getHTML());
              a.Squarespace.ProductUtils._checkVariantStockAndPrice(
                e,
                b,
                c,
                d,
                k
              );
              c.detach("change");
              c.each(function (g) {
                g.after(
                  "change",
                  function (g) {
                    a.Squarespace.ProductUtils._checkVariantStockAndPrice(
                      e,
                      b,
                      c,
                      d,
                      k
                    );
                  },
                  this
                );
              }, this);
            }, this);
          },
          _checkVariantStockAndPrice: function (e, b, c, d, k) {
            e.removeAttribute("data-unselected-options");
            e.removeAttribute("data-selected-variant");
            e.removeAttribute("data-variant-in-stock");
            var g = e.one(".variant-out-of-stock");
            g && g.remove();
            var n = [],
              g = null,
              v = !1,
              f = {};
            c.each(function (a) {
              var b = a.get("value"),
                d = a.getAttribute("data-variant-option-name");
              0 === a.get("selectedIndex") ? n.push(d) : (f[d] = b);
            }, this);
            if (0 === n.length) {
              for (c = 0; c < b.length; c++) {
                k = b[c];
                var m = !0,
                  p;
                for (p in f)
                  if (f[p] != k.attributes[p]) {
                    m = !1;
                    break;
                  }
                if (m) {
                  g = k;
                  if (k.unlimited || 0 < k.qtyInStock) v = !0;
                  break;
                }
              }
              !g && d
                ? d.set("text", "Unavailable")
                : d &&
                  (d.empty(),
                  g.onSale
                    ? (d.setHTML(
                        a.Squarespace.Commerce.moneyString(g.salePrice)
                      ),
                      d.append(
                        a.Node.create(
                          '<span> </span><span class="original-price">' +
                            a.Squarespace.Commerce.moneyString(g.price) +
                            "</span>"
                        )
                      ))
                    : d.setHTML(a.Squarespace.Commerce.moneyString(g.price)));
              g &&
                !v &&
                e.append(
                  a.Node.create(
                    '<div class="variant-out-of-stock">Out of stock.</div>'
                  )
                );
            } else d && d.getHTML() !== k && d.empty().setHTML(k);
            e.setAttribute("data-unselected-options", JSON.stringify(n));
            g && e.setAttribute("data-selected-variant", JSON.stringify(g));
            v && e.setAttribute("data-variant-in-stock", v);
          },
        };
      },
      "1.0",
      {
        requires: [
          "base",
          "node",
          "squarespace-commerce-utils",
          "squarespace-enum",
        ],
      }
    );
  },
  831: function (h, l, f) {
    YUI.add(
      "squarespace-commerce",
      function (a) {
        a.namespace("Squarespace.Commerce");
        var e = a.config.win.Static;
        a.Squarespace.Commerce.initializeCommerce = function () {
          a.Squarespace.ProductUtils.initializeVariantDropdowns();
          a.Squarespace.CartUtils.initializeAddToCartButtons();
          a.Squarespace.CartUtils.initializeSuperbowlBuyButtons();
          if (
            !a.Squarespace.Commerce.isExpressCheckout() &&
            !a.Lang.isValue(a.one(".show-cart-page")) &&
            !a.Lang.isValue(a.one(".sqs-custom-cart"))
          ) {
            var b = a.one(".sqs-cart-dropzone");
            a.Lang.isNull(b) &&
              ((b = a.Node.create('<div class="absolute-cart-box"></div>')),
              a.one(a.config.doc.body).append(b));
            new a.Squarespace.Widgets.PillShoppingCart({
              model: a.Squarespace.Singletons.ShoppingCart,
              useLightCart:
                e.SQUARESPACE_CONTEXT.websiteSettings.storeSettings
                  .useLightCart,
              render: b,
            });
          }
          a.Lang.isValue(a.one(".sqs-custom-cart")) &&
            a.all(".sqs-custom-cart").each(function (b) {
              new a.Squarespace.Widgets.TemplateIntegratedShoppingCart({
                model: a.Squarespace.Singletons.ShoppingCart,
                boundingBox: b,
                srcNode: b,
              }).render();
            });
          a.Lang.isNull(a.Cookie.get("CART"))
            ? a
                .all(".sqs-add-to-cart-button-wrapper")
                .setStyle("visibility", "visible")
            : a.Squarespace.Singletons.ShoppingCart.load(function () {
                a.all(".sqs-add-to-cart-button-wrapper").setStyle(
                  "visibility",
                  "visible"
                );
              }, this);
          a.Lang.isValue(a.one("#sqs-shopping-cart-wrapper")) &&
            new a.Squarespace.Widgets.FullPageShoppingCart({
              model: a.Squarespace.Singletons.ShoppingCart,
              linkItems: !0,
              render: a.one("#sqs-shopping-cart-wrapper"),
            });
        };
        a.config.win.Squarespace.onInitialize(
          a,
          a.Squarespace.Commerce.initializeCommerce
        );
      },
      "1.0",
      {
        requires:
          "event-base-ie overlay squarespace-pill-shopping-cart squarespace-template-integrated-shopping-cart squarespace-full-page-shopping-cart squarespace-product-utils squarespace-cart-utils squarespace-enum squarespace-donate-form".split(
            " "
          ),
      }
    );
  },
  832: function (h, l, f) {
    YUI.add(
      "squarespace-pill-shopping-cart",
      function (a) {
        a.namespace("Squarespace.Widgets");
        var e = (a.Squarespace.Widgets.PillShoppingCart = a.Base.create(
          "pillShoppingCart",
          a.Squarespace.Widgets.SSWidget,
          [],
          {
            renderUI: function () {
              e.superclass.renderUI.call(this);
              this.get("boundingBox").plug(a.Squarespace.Animations.Scalable, {
                duration: 0.25,
              });
              this._hide(!0);
              this.get("contentBox").addClass(
                this.get("useLightCart") ? "light" : "dark"
              );
            },
            bindUI: function () {
              e.superclass.bindUI.call(this);
              this.get("model").on("change", this.syncUI, this);
              this.get("contentBox").on("click", function () {
                a.config.win.location = "/commerce/show-cart";
              });
            },
            syncUI: function () {
              e.superclass.syncUI.call(this);
              var b = this.get("model"),
                c = b.get("totalQuantity"),
                d = this.get("contentBox"),
                k = function () {
                  d.one(".total-quantity").setContent(100 < c ? "100+" : c);
                  d.one(".suffix").setContent(1 === c ? "item" : "items");
                  d.one(".subtotal .price").setContent(
                    a.Squarespace.Commerce.moneyString(b.get("subtotalCents"))
                  );
                };
              0 < c ? (k(), this._show()) : (this._hide(), k());
            },
            _show: function () {
              var b = this.get("boundingBox");
              if (b.hasClass("sqs-scalable-hidden")) b.show();
              else {
                var c = a.Easing.easeOutStrong,
                  d = new a.Anim({
                    node: b,
                    to: { opacity: 0.7 },
                    duration: 0.2,
                    easing: c,
                  }),
                  k = new a.Anim({
                    node: b,
                    to: { opacity: 1 },
                    duration: 0.5,
                    easing: c,
                  });
                d.on("end", function () {
                  k.run();
                });
                d.run();
              }
            },
            _hide: function (a) {
              var c = this.get("boundingBox");
              c.hasClass("sqs-scalable-hidden") || c.hide(a);
            },
          },
          {
            CSS_PREFIX: "sqs-pill-shopping-cart",
            HANDLEBARS_TEMPLATE: "pill-shopping-cart.html",
            ATTRS: {
              model: {
                value: null,
                validator: function (b) {
                  return a.instanceOf(b, a.Squarespace.Models.ShoppingCart);
                },
              },
              useLightCart: { value: !1 },
            },
          }
        ));
      },
      "1.0",
      {
        requires:
          "base node cookie squarespace-ss-widget squarespace-commerce-utils squarespace-animations squarespace-models-shopping-cart squarespace-pill-shopping-cart-template".split(
            " "
          ),
      }
    );
  },
  833: function (h, l, f) {
    YUI.add(
      "squarespace-models-shopping-cart",
      function (a) {
        a.namespace("Squarespace.Models");
        a.namespace("Squarespace.Singletons");
        var e = (a.Squarespace.Models.ShoppingCart = a.Base.create(
          "shoppingCart",
          a.Model,
          [],
          {
            initializer: function () {
              this.publish("item-added", { emitFacade: !0 });
              this.publish("loaded", { emitFacade: !0 });
              this.publish("recalculate-start", { emitFacade: !0 });
              this.publish("recalculate-end", { emitFacade: !0 });
              this._isRecalculating = this._readInProgress = !1;
              this.on(
                "recalculate-start",
                function () {
                  this._isRecalculating = !0;
                },
                this
              );
              this.on(
                "recalculate-end",
                function () {
                  this._isRecalculating = !1;
                },
                this
              );
            },
            toJSON: function () {
              var b = e.superclass.toJSON.call(this),
                c = b.created;
              a.Lang.isNull(c) || (b.created = c.getTime());
              return b;
            },
            sync: function (a, c, d) {
              switch (a) {
                case "read":
                  this._read(c, d);
              }
            },
            load: function (b, c, d) {
              "function" === typeof b && ((c = b), (b = {}));
              this._readinProgress
                ? this.after("load", c, d)
                : a.Model.prototype.load.call(
                    this,
                    b,
                    c ? a.bind(c, d || this) : null
                  );
            },
            isRecalculating: function () {
              return this._isRecalculating;
            },
            hasEntry: function (b, c) {
              return a.Array.reduce(this.get("entries"), !1, function (d, k) {
                return a.Lang.isValue(c)
                  ? d || (k.itemId == b && c.sku == k.chosenVariant.sku)
                  : d || k.itemId == b;
              });
            },
            addEntry: function (b, c, d, k, g, n, e) {
              a.Data.post(
                {
                  url:
                    "/api/commerce/shopping-cart/entries" +
                    (g ? "?isExpress=true" : ""),
                  headers: { "Content-Type": "application/json" },
                  data: a.JSON.stringify({
                    itemId: b,
                    sku: a.Lang.isValue(c) ? c.sku : null,
                    quantity: d,
                    additionalFields: a.JSON.stringify(k),
                  }),
                  success: function (b) {
                    a.Squarespace.CommerceAnalytics.itemAdded(b);
                    this.setAttrs(b.shoppingCart);
                    this.fire("item-added");
                    a.Lang.isFunction(n) &&
                      n.call(e || this, null, b.newlyAdded);
                  },
                  failure: function (b) {
                    b.crumbFail &&
                      (a.Squarespace.Utils.areCookiesEnabled()
                        ? (b.error =
                            "Your session has expired. Please reload the page and try again.")
                        : (b.error =
                            "Please enable cookies in your browser, reload the page, and try again."));
                    a.Lang.isFunction(n) && n.call(e || this, b.message, null);
                  },
                },
                this
              );
            },
            updateFormSubmission: function (b, c, d, k) {
              var g = b.chosenVariant;
              this.fire("recalculate-start");
              a.Data.put(
                {
                  headers: { "Content-Type": "application/json" },
                  url: a.Lang.sub(
                    "/api/commerce/shopping-cart/entries/{entryId}/additionalFields",
                    { entryId: b.id }
                  ),
                  data: a.JSON.stringify({
                    itemId: b.itemId,
                    sku: a.Lang.isValue(g) ? g.sku : null,
                    additionalFields: a.JSON.stringify(c),
                  }),
                  success: function (b) {
                    this.fire("recalculate-end");
                    this.setAttrs(b.shoppingCart);
                    a.Lang.isFunction(d) &&
                      d.call(k || this, null, b.updatedEntry);
                  },
                  failure: function (b) {
                    this.fire("recalculate-end");
                    a.Lang.isFunction(d) && d.call(k || this, b.message, null);
                  },
                },
                this
              );
            },
            updateQuantity: function (b, c, d, k) {
              var g = b.chosenVariant;
              this.fire("recalculate-start");
              a.Data.put(
                {
                  headers: { "Content-Type": "application/json" },
                  url: a.Lang.sub(
                    "/api/commerce/shopping-cart/entries/{entryId}",
                    { entryId: b.id }
                  ),
                  data: a.JSON.stringify({
                    itemId: b.itemId,
                    sku: a.Lang.isValue(g) ? g.sku : null,
                    quantity: c,
                  }),
                  success: function (b) {
                    this.fire("recalculate-end");
                    0 === c
                      ? a.Squarespace.CommerceAnalytics.itemRemoved(b)
                      : a.Squarespace.CommerceAnalytics.itemModified(b);
                    this.setAttrs(b.shoppingCart);
                    a.Lang.isFunction(d) &&
                      d.call(k || this, null, b.updatedEntry);
                  },
                  failure: function (b) {
                    this.fire("recalculate-end");
                    a.Lang.isFunction(d) && d.call(k || this, b.message, null);
                  },
                },
                this
              );
            },
            updateShippingLocation: function (b, c, d) {
              this.fire("recalculate-start");
              a.Data.put(
                {
                  url: "/api/commerce/shopping-cart/shipping-location",
                  data: b,
                  success: function (b) {
                    this.fire("recalculate-end");
                    this.setAttrs(b);
                    a.Lang.isFunction(c) && c.call(d || this, null);
                  },
                  failure: function (b) {
                    this.fire("recalculate-end");
                    a.Lang.isFunction(c) && c.call(d || this, b.message, null);
                  },
                },
                this
              );
            },
            updateShippingMethod: function (b, c, d) {
              this.fire("recalculate-start");
              a.Data.put(
                {
                  url: "/api/commerce/shopping-cart/selected-shipping-option",
                  data: { shippingOptionId: b },
                  success: function (b) {
                    this.fire("recalculate-end");
                    this.setAttrs(b);
                    a.Lang.isFunction(c) && c.call(d || this, null);
                  },
                  failure: function (b) {
                    this.fire("recalculate-end");
                    a.Lang.isFunction(c) && c.call(d || this, b.message, null);
                  },
                },
                this
              );
            },
            addCoupon: function (b, c, d) {
              a.Data.post(
                {
                  url: "/api/commerce/shopping-cart/coupons",
                  data: { promoCode: b },
                  success: function (b) {
                    this.setAttrs(b);
                    a.Lang.isFunction(c) && c.call(d || this, null);
                  },
                  failure: function (b) {
                    a.Lang.isFunction(c) && c.call(d || this, b.message, null);
                  },
                },
                this
              );
            },
            removeCoupon: function (b, c, d) {
              a.Data.del(
                {
                  url: "/api/commerce/shopping-cart/coupons/" + b,
                  success: function (b) {
                    this.setAttrs(b);
                    a.Lang.isFunction(c) && c.call(d || this, null);
                  },
                  failure: function (b) {
                    a.Lang.isFunction(c) && c.call(d || this, b.message, null);
                  },
                },
                this
              );
            },
            totalForItem: function (b, c) {
              var d = a.Lang.isValue(c);
              return a.Array.reduce(this.get("entries"), 0, function (a, g) {
                return g.item.id === b &&
                  (!d || (d && g.chosenVariant.sku === c.sku))
                  ? a + g.quantity
                  : a;
              });
            },
            _read: function (b, c) {
              this._readInProgress = !0;
              this.fire("loading");
              a.Data.get(
                {
                  url: "/api/commerce/shopping-cart",
                  data: { mock: b.mock ? "true" : "false" },
                  success: function (a) {
                    this.fire("loaded");
                    this._readInProgress = !1;
                    c(null, a);
                  },
                  failure: function (a) {
                    this.fire("loaded");
                    this._readInProgress = !1;
                    c(a.message, null);
                  },
                },
                this
              );
            },
          },
          {
            ATTRS: {
              id: { validator: a.Lang.isString },
              websiteId: { validator: a.Lang.isString },
              orderId: { validator: a.Lang.isString },
              created: {
                getter: function (b) {
                  return a.Lang.isValue(b) ? new Date(b) : null;
                },
                setter: function (b) {
                  return a.Lang.isDate(b) ? b.getTime() : b;
                },
                validator: a.Lang.isNumber,
              },
              isPurchased: { value: !1, validator: a.Lang.isBoolean },
              entries: { value: [], validator: a.Lang.isArray },
              shippingOptions: { value: [], validator: a.Lang.isArray },
              selectedShippingOption: { validator: a.Lang.isObject },
              shippingLocation: { validator: a.Lang.isObject },
              applicableTaxRules: { value: [], validator: a.Lang.isArray },
              coupons: { value: [], validator: a.Lang.isArray },
              validCoupons: { value: [], validator: a.Lang.isArray },
              invalidCoupons: { value: [], validator: a.Lang.isArray },
              subtotalCents: { validator: a.Lang.isNumber, value: 0 },
              taxCents: { validator: a.Lang.isNumber, value: 0 },
              shippingCostCents: { validator: a.Lang.isNumber, value: 0 },
              discountCents: { validator: a.Lang.isNumber, value: 0 },
              grandTotalCents: { validator: a.Lang.isNumber, value: 0 },
              totalQuantity: { validator: a.Lang.isNumber, value: 0 },
              hasDigital: { validator: a.Lang.isBoolean, value: !1 },
              purelyDigital: { validator: a.Lang.isBoolean, value: !1 },
              requiresShipping: { validator: a.Lang.isBoolean, value: !1 },
            },
          }
        ));
        a.Squarespace.Singletons.ShoppingCart = new e();
      },
      "1.0",
      {
        requires: [
          "base",
          "model",
          "squarespace-commerce-utils",
          "squarespace-commerce-analytics",
        ],
      }
    );
  },
  834: function (h, l, f) {
    YUI.add(
      "squarespace-commerce-analytics",
      function (a) {
        var e = new a.Base.create(
          "commerceTrack",
          a.Base,
          [],
          {
            itemViewed: function (a) {
              this.fire("commerce-item-viewed", a);
            },
            itemAdded: function (a) {
              this.fire("commerce-item-added", a);
            },
            itemRemoved: function (a) {
              this.fire("commerce-item-removed", a);
            },
            itemModified: function (a) {
              this.fire("commerce-item-modified", a);
            },
            checkoutStarted: function (a) {
              this.fire("commerce-checkout-started", a);
            },
            checkoutConfirmed: function (a) {
              this.fire("commerce-checkout-confirmed", a);
            },
            contributionConfirmed: function (a) {
              this.fire("commerce-contribution-confirmed", a);
            },
          },
          { ATTRS: {} }
        );
        a.namespace("Squarespace");
        a.Squarespace.CommerceAnalytics = new e();
        var b = a.Base.create(
            "commerceAnalytics",
            a.Base,
            [],
            {
              initializer: function () {
                this._events = [
                  a.Squarespace.CommerceAnalytics.on(
                    "commerce-item-viewed",
                    this._getProtectedTracker("onItemViewed"),
                    this
                  ),
                  a.Squarespace.CommerceAnalytics.on(
                    "commerce-item-added",
                    this._getProtectedTracker("onItemAdded"),
                    this
                  ),
                  a.Squarespace.CommerceAnalytics.on(
                    "commerce-item-removed",
                    this._getProtectedTracker("onItemRemoved"),
                    this
                  ),
                  a.Squarespace.CommerceAnalytics.on(
                    "commerce-item-modified",
                    this._getProtectedTracker("onItemModified"),
                    this
                  ),
                  a.Squarespace.CommerceAnalytics.on(
                    "commerce-checkout-started",
                    this._getProtectedTracker("onCheckoutStarted"),
                    this
                  ),
                  a.Squarespace.CommerceAnalytics.on(
                    "commerce-checkout-confirmed",
                    this._getProtectedTracker("onCheckoutConfirmed"),
                    this
                  ),
                  a.Squarespace.CommerceAnalytics.on(
                    "commerce-contribution-confirmed",
                    this._getProtectedTracker("onContributionConfirmed"),
                    this
                  ),
                ];
                this._setCartMode();
              },
              destructor: function () {
                a.Array.invoke(this._events, "detach");
              },
              _setCartMode: function () {
                var a = !0;
                try {
                  a =
                    Static.SQUARESPACE_CONTEXT.websiteSettings.storeSettings
                      .testModeOn;
                } catch (b) {}
                this.cartMode = a ? "test" : "live";
              },
              _getProtectedTracker: function (a) {
                return function (b) {
                  try {
                    this[a].call(this, b);
                  } catch (c) {}
                };
              },
              onItemViewed: function (a) {},
              onItemAdded: function (a) {},
              onItemRemoved: function (a) {},
              onItemModified: function (a) {},
              onCheckoutStarted: function (a) {},
              onCheckoutConfirmed: function (a) {},
              onContributionConfirmed: function (a) {},
            },
            { ATTRS: {} }
          ),
          e = a.Base.create(
            "commerceAnalyticsInternal",
            b,
            [],
            {
              _createCartData: function (a) {
                return {
                  CartOrderId: a.id,
                  CartSubtotal: a.subtotalCents / 100,
                  CartTax: a.taxCents / 100,
                  CartCurrency: "USD",
                  CartMode: this.cartMode,
                };
              },
              _createProductData: function (b) {
                var c = b.productType;
                return {
                  ProductId: b.itemId,
                  ProductName: b.title,
                  ProductType:
                    c === a.Squarespace.ProductTypes.PHYSICAL
                      ? "PHYSICAL"
                      : c === a.Squarespace.ProductTypes.DIGITAL
                      ? "DIGITAL"
                      : "SERVICE",
                  ProductSKU: b.chosenVariant ? b.chosenVariant.sku : "",
                  ProductPrice: b.purchasePriceCents / 100,
                  ProductQuantity: b.quantity,
                };
              },
              _getItemVariantPrice: function (b) {
                return a.Object.hasKey(b, "onSale") && b.onSale
                  ? (a.Object.hasKey(b, "salePrice")
                      ? b.salePrice
                      : b.salePriceCents) / 100
                  : (a.Object.hasKey(b, "price") ? b.price : b.priceCents) /
                      100;
              },
              _getItemPrice: function (b) {
                var c = 0;
                a.Object.hasKey(b, "variants") && 0 < b.variants.length
                  ? (a.Array.each(
                      b.variants,
                      function (a) {
                        c += this._getItemVariantPrice(a);
                      },
                      this
                    ),
                    (c /= b.variants.length))
                  : (c = this._getItemVariantPrice(b));
                return c;
              },
              _createItemData: function (a) {
                return { ProductId: a.id, ProductName: a.title };
              },
              _createItemAddedData: function (b) {
                return a.merge(
                  this._createCartData(b.shoppingCart),
                  this._createProductData(b.newlyAdded)
                );
              },
              _createItemRemovedData: function (b) {
                return a.merge(
                  this._createCartData(b.shoppingCart),
                  this._createProductData(b.updatedEntry)
                );
              },
              _createItemModifiedData: function (b) {
                return a.merge(
                  this._createCartData(b.shoppingCart),
                  this._createProductData(b.updatedEntry)
                );
              },
              _createItemCheckoutStartedData: function (b, c) {
                return a.merge(
                  this._createCartData(b),
                  this._createProductData(c)
                );
              },
              _createItemCheckoutCompletedData: function (b, c) {
                return a.merge(
                  this._createCartData(b),
                  this._createProductData(c)
                );
              },
              _track: function (b, c) {
                a.Squarespace.Analytics.trackInternal(b, c);
              },
              onItemViewed: function (a) {},
            },
            { ATTRS: {} }
          ),
          c = a.Base.create(
            "commerceAnalyticsMixpanel",
            e,
            [],
            {
              _track: function (b, c) {
                a.Squarespace.Analytics.track(b, c);
              },
              onItemViewed: function (a) {
                this._track("shopper_product_viewed", this._createItemData(a));
              },
              onItemAdded: function (a) {
                this._track(
                  "shopper_product_added",
                  this._createItemAddedData(a)
                );
              },
              onItemRemoved: function (a) {
                this._track(
                  "shopper_product_removed",
                  this._createItemRemovedData(a)
                );
              },
              onItemModified: function (a) {
                this._track(
                  "shopper_product_modified",
                  this._createItemModifiedData(a)
                );
              },
              onCheckoutStarted: function (b) {
                a.each(
                  b.entries,
                  function (a) {
                    this._track(
                      "shopper_product_checkout_started",
                      this._createItemCheckoutStartedData(b, a)
                    );
                  },
                  this
                );
              },
              onCheckoutConfirmed: function (b) {
                a.each(
                  b.purchasedCart.entries,
                  function (a) {
                    this._track(
                      "shopper_product_purchased",
                      this._createItemCheckoutCompletedData(b.purchasedCart, a)
                    );
                  },
                  this
                );
                this._track("shopper_order_submitted", {
                  CartOrderId: b.purchasedCart.id,
                  CartCurrency: "USD",
                  CartGrandTotal: b.purchasedCart.grandTotalCents / 100,
                  CartSubtotal: b.purchasedCart.subtotalCents / 100,
                  CartTax: b.purchasedCart.taxCents / 100,
                  CartShipping: b.purchasedCart.shippingCostCents / 100,
                  CartTotalQuantity: b.purchasedCart.totalQuantity,
                  CartMode: this.cartMode,
                });
              },
              onContributionConfirmed: function (a) {
                this._track("donation_submitted", {
                  Currency: "USD",
                  Total: a.amountCents / 100,
                  CartMode: this.cartMode,
                });
              },
            },
            { ATTRS: {} }
          ),
          b = a.Base.create(
            "commerceAnalyticsGoogle",
            b,
            [],
            {
              onCheckoutConfirmed: function (b) {
                _gaq &&
                  (_gaq.push([
                    "_addTrans",
                    b.id,
                    "",
                    b.purchasedCart.subtotalCents / 100,
                    b.purchasedCart.taxCents / 100,
                    b.purchasedCart.shippingCostCents / 100,
                    b.customer.billingAddress.city,
                    b.customer.billingAddress.state,
                    b.customer.billingAddress.country,
                  ]),
                  a.each(b.purchasedCart.entries, function (a) {
                    _gaq.push([
                      "_addItem",
                      b.id,
                      a.chosenVariant ? a.chosenVariant.sku : "digital",
                      a.title,
                      "",
                      a.purchasePriceCents / 100,
                      a.quantity,
                    ]);
                  }),
                  _gaq.push(["_trackTrans"]));
              },
            },
            { ATTRS: {} }
          );
        new e();
        new c();
        new b();
        a.Lang.isObject(Static) &&
          a.Object.hasKey(Static, "SQUARESPACE_CONTEXT") &&
          a.Object.hasKey(Static.SQUARESPACE_CONTEXT, "item") &&
          Static.SQUARESPACE_CONTEXT.item.recordType ===
            a.Squarespace.RecordType.STORE_ITEM &&
          a.Squarespace.CommerceAnalytics.itemViewed(
            Static.SQUARESPACE_CONTEXT.item
          );
      },
      "1.0",
      {
        requires: [
          "event-custom",
          "node",
          "base",
          "squarespace-enum",
          "squarespace-util",
        ],
      }
    );
  },
  835: function (h, l, f) {
    YUI.add(
      "squarespace-template-integrated-shopping-cart",
      function (a) {
        a.namespace("Squarespace.Widgets");
        var e = (a.Squarespace.Widgets.TemplateIntegratedShoppingCart =
          a.Base.create(
            "templateIntegratedShoppingCart",
            a.Widget,
            [],
            {
              bindUI: function () {
                e.superclass.bindUI.call(this);
                this.get("model").on("change", this.syncUI, this);
              },
              syncUI: function () {
                e.superclass.syncUI.call(this);
                var b = this.get("quantityEl"),
                  c = this.get("subtotalEl"),
                  d = this.get("model"),
                  k = d.get("totalQuantity"),
                  d = d.get("subtotalCents");
                a.Lang.isValue(b) && b.setContent(100 < k ? "100+" : k);
                a.Lang.isValue(c) &&
                  c.setContent(a.Squarespace.Commerce.moneyString(d));
              },
            },
            {
              CSS_PREFIX: "sqs-template-integrated-shopping-cart",
              HTML_PARSER: {
                quantityEl: ".sqs-cart-quantity",
                subtotalEl: ".sqs-cart-subtotal",
              },
              ATTRS: {
                quantityEl: {
                  value: null,
                  validator: a.Squarespace.AttrValidators.isNullOrNode,
                  writeOnce: "initOnly",
                },
                subtotalEl: {
                  value: null,
                  validator: a.Squarespace.AttrValidators.isNullOrNode,
                  writeOnce: "initOnly",
                },
                model: {
                  value: null,
                  validator: function (b) {
                    return a.instanceOf(b, a.Squarespace.Models.ShoppingCart);
                  },
                },
              },
            }
          ));
      },
      "1.0",
      {
        requires:
          "base node widget squarespace-attr-validators squarespace-commerce-utils squarespace-models-shopping-cart".split(
            " "
          ),
      }
    );
  },
  836: function (h, l, f) {
    YUI.add(
      "squarespace-full-page-shopping-cart",
      function (a) {
        a.namespace("Squarespace.Widgets");
        var e = (a.Squarespace.Widgets.FullPageShoppingCart = a.Base.create(
          "fullPageShoppingCart",
          a.Squarespace.Widgets.TableShoppingCart,
          [],
          {
            renderUI: function () {
              e.superclass.renderUI.call(this);
              this._spinner = new a.Squarespace.Spinner({
                render: this.get("contentBox").one(".loading-spinner"),
                size: 50,
                color: "dark",
              });
            },
            bindUI: function () {
              e.superclass.bindUI.call(this);
              var b = this.get("model");
              this.get("contentBox")
                .one(".checkout-button")
                .on("click", a.Squarespace.Commerce.goToCheckoutPage, this);
              b.on("recalculate-start", this._setLoadingState, this);
              b.on("recalculate-end", this._setLoadedState, this);
            },
            _setLoadingState: function () {
              var a = this.get("contentBox");
              a.all("input").setAttribute("disabled", !0);
              a.addClass("loading-cart");
            },
            _setLoadedState: function () {
              var b = this.get("contentBox");
              a.later(350, this, function () {
                b.all("input").removeAttribute("disabled");
                b.removeClass("loading-cart");
              });
            },
          },
          {
            CSS_PREFIX: "sqs-fullpage-shopping-cart",
            HANDLEBARS_TEMPLATE: "full-page-shopping-cart.html",
            HANDLEBARS_ITEM_TEMPLATE: "full-page-shopping-cart-item.html",
          }
        ));
      },
      "1.0",
      {
        requires:
          "base node cookie squarespace-commerce-utils squarespace-table-shopping-cart squarespace-full-page-shopping-cart-template squarespace-full-page-shopping-cart-item-template squarespace-spinner".split(
            " "
          ),
      }
    );
  },
  837: function (h, l, f) {
    YUI.add(
      "squarespace-table-shopping-cart",
      function (a) {
        a.namespace("Squarespace.Widgets");
        var e = (a.Squarespace.Widgets.TableShoppingCart = a.Base.create(
          "tableShoppingCart",
          a.Squarespace.Widgets.SSWidget,
          [],
          {
            initializer: function () {
              this._getAdditionalFieldsFormTemplateSchema(function (a) {
                this._additionalFieldsFormTemplate = a;
              }, this);
              this._additionalFieldsModalLightbox =
                new a.Squarespace.Widgets.ModalLightbox();
              this._formWidget = null;
            },
            destructor: function () {
              this._additionalFieldsModalLightbox.destroy();
              this._formWidget && this._formWidget.destroy();
            },
            renderUI: function () {
              e.superclass.renderUI.call(this);
              this._additionalFieldsModalLightbox.render(a.one("body"));
            },
            bindUI: function () {
              e.superclass.bindUI.call(this);
              this.get("model").on("change", this.syncUI, this);
              var b = this.get("contentBox");
              b.delegate(
                "click",
                function (a) {
                  b.hasClass("loading-cart") ||
                    this._removeEntryRow(a.target.ancestor("tr"));
                },
                ".remove-item",
                this
              );
              b.delegate(
                "click",
                function (a) {
                  a.target.select();
                },
                ".quantity input",
                this
              );
              var c = 0,
                d;
              b.delegate(
                "valuechange",
                function (b) {
                  var g = b.target.get("parentNode");
                  c += 1300;
                  d && d.stop();
                  g.one("input").setStyle("opacity", 0.3);
                  setTimeout(
                    a.bind(function () {
                      d = new a.Anim({
                        node: g.one("input"),
                        to: { opacity: 1 },
                        easing: a.Easing.easeOutSine,
                        duration: 0.5,
                      });
                      d.run();
                      setTimeout(
                        a.bind(function () {
                          c -= 1300;
                          0 === c && this._onQuantityChange(b);
                        }, this),
                        1e3
                      );
                    }, this),
                    300
                  );
                },
                ".quantity input",
                this
              );
              b.delegate(
                "click",
                this._onAdditionalFieldsEdit,
                ".additional-fields",
                this
              );
              this._additionalFieldsModalLightbox.on(
                "close",
                function () {
                  this._formWidget && this._formWidget.destroy();
                },
                this
              );
            },
            syncUI: function () {
              e.superclass.syncUI.call(this);
              var b = this.get("model"),
                c = this.get("contentBox");
              c.one(".subtotal .price").setContent(
                a.Squarespace.Commerce.moneyString(b.get("subtotalCents"))
              );
              c.one("tbody").empty();
              0 === b.get("totalQuantity")
                ? c.addClass("empty")
                : (c.removeClass("empty"),
                  a.Array.each(
                    b.get("entries"),
                    function (a) {
                      0 < a.quantity && this._appendEntryRow(a);
                    },
                    this
                  ),
                  this._focusedInputItemId &&
                    (b = this._getEntryRowByItemId(this._focusedInputItemId)) &&
                    b.one(".quantity input").focus());
              c.all(".cooldown").addClass("hidden");
            },
            showError: function (b, c) {
              new a.Squarespace.Widgets.Alert({
                "strings.title": b,
                "strings.message": c,
              });
            },
            _appendEntryRow: function (b) {
              var c = b.item,
                d = c.items,
                k = c.structuredContent.productType,
                g = k === a.Squarespace.ProductTypes.PHYSICAL,
                n = b.chosenVariant,
                e = a.Lang.isValue(n),
                f = a.Squarespace.UITemplates.renderAsNodeOrDocFrag(
                  this.getProperty("HANDLEBARS_ITEM_TEMPLATE"),
                  { isPhysicalProduct: g }
                );
              f.setData("entry", b);
              f.setAttribute("data-item-id", c.id);
              e && f.setAttribute("data-chosen-variant-sku", n.sku);
              c = f.one(".item-image");
              d =
                a.Lang.isValue(d) && 0 < d.length
                  ? d[0].assetUrl.replace("http://", "https://") +
                    "?format=100w"
                  : "/universal/images-v6/configuration/no-image.png";
              c.append('<img src="' + d + '" />');
              d = f.one(".item-desc");
              c = this.get("linkItems")
                ? '<a href="' + b.item.fullUrl + '">' + b.item.title + "</a>"
                : "<div>" + b.item.title + "</div>";
              d.append(c);
              var m;
              e
                ? (m =
                    '<div class="variant-info">' +
                    a.Squarespace.Commerce.variantFormat(n) +
                    "</div>")
                : k === a.Squarespace.ProductTypes.DIGITAL &&
                  (m = '<div class="variant-info">Digital Download</div>');
              m && d.append(m);
              b.additionalFields &&
                d.append(
                  '<div class="additional-fields"><a>Edit Details</a></div>'
                );
              k = b.quantity;
              g &&
                ((g = f.one(".quantity input")),
                g.setAttrs({ maxlength: 4, size: String(k).length, value: k }),
                g.plug(a.Squarespace.Plugin.IntegerRestrictor));
              f.one(".price").setContent(
                a.Squarespace.Commerce.moneyString(k * b.purchasePriceCents)
              );
              this.get("contentBox").one("tbody").append(f);
            },
            _removeEntryRow: function (b) {
              b.plug(a.Squarespace.Animations.Fadeable, { duration: 0.25 });
              b.once(
                "hidden",
                function () {
                  this._updateEntryQuantity(b.getData("entry"), 0);
                },
                this
              );
              b.hide();
            },
            _getEntryRowByItemId: function (a) {
              var c;
              this.get("contentBox")
                .all("tbody tr")
                .each(function (d) {
                  d.getData("entry").itemId === a && (c = d);
                }, this);
              return c;
            },
            _onQuantityChange: function (b) {
              var c = b.target;
              b = c.get("value");
              var d = c.ancestor("tr"),
                k = d.getData("entry"),
                g = Number(b),
                n = k.quantity;
              this._focusedInputItemId = k.itemId;
              "" === b ||
                g === n ||
                (0 === g
                  ? ((b = new a.Squarespace.Widgets.Confirmation({
                      "strings.title": "Remove Item",
                      "strings.message":
                        "You have set this item's quantity to 0. This will remove it from your cart. Would you like to continue?",
                    })),
                    b.on(
                      "confirm",
                      function () {
                        this._removeEntryRow(d);
                      },
                      this
                    ),
                    b.on(
                      "cancel",
                      function () {
                        c.set("value", n);
                      },
                      this
                    ))
                  : this._updateEntryQuantity(k, g, n, c));
            },
            _onAdditionalFieldsEdit: function (b) {
              if (
                this._additionalFieldsFormTemplate &&
                !this.get("contentBox").hasClass("loading-cart")
              ) {
                var c = b.target.ancestor("tr").getData("entry");
                b = c.item.structuredContent.additionalFieldsForm;
                var d = (this._formWidget = new a.Squarespace.Widgets.AsyncForm(
                  {
                    form: b,
                    formTemplate: this._additionalFieldsFormTemplate,
                    formSubmitButtonText: "Save",
                    formData: a.JSON.parse(c.additionalFields),
                    formName: b.name,
                    showTitle: !0,
                  }
                ));
                d.on(
                  "submission",
                  function (a) {
                    d.setStateSaving();
                    this.get("model").updateFormSubmission(
                      c,
                      a.data,
                      function (a, b) {
                        d.setStateEditing();
                        this._additionalFieldsModalLightbox.close();
                      },
                      this
                    );
                  },
                  this
                );
                this._additionalFieldsModalLightbox.set("content", d);
                this._additionalFieldsModalLightbox.open();
              }
            },
            _updateEntryQuantity: function (a, c, d, k) {
              this.get("model").updateQuantity(
                a,
                c,
                function (a) {
                  a &&
                    (this.showError("Unable to Update Quantity", a),
                    k && k.inDoc() && k.set("value", d));
                },
                this
              );
            },
            _getAdditionalFieldsFormTemplateSchema: function (b, c) {
              a.Data.get(
                {
                  url: "/api/template/GetTemplateSchema",
                  data: {
                    componentType: "widget",
                    type: a.Squarespace.BlockType.FORM,
                  },
                  success: function (a) {
                    b.call(c || this, a);
                  },
                },
                this
              );
            },
          },
          {
            ATTRS: {
              model: {
                value: null,
                validator: function (b) {
                  return a.instanceOf(b, a.Squarespace.Models.ShoppingCart);
                },
              },
              linkItems: { value: !1 },
            },
          }
        ));
      },
      "1.0",
      {
        requires:
          "base node anim squarespace-enum squarespace-animations squarespace-commerce-utils squarespace-ui-base squarespace-ui-templates squarespace-models-shopping-cart squarespace-plugin-integer-restrictor squarespace-modal-lightbox squarespace-async-form squarespace-widgets-alert squarespace-widgets-confirmation".split(
            " "
          ),
      }
    );
  },
  838: function (h, l, f) {
    YUI.add(
      "squarespace-plugin-integer-restrictor",
      function (a) {
        a.namespace("Squarespace.Plugin");
        a.Squarespace.Plugin.IntegerRestrictor = a.Base.create(
          "integerRestrictor",
          a.Plugin.Base,
          [],
          {
            initializer: function () {
              this.get("host").on(
                "keydown",
                function (a) {
                  var b = a.keyCode;
                  -1 !== [9, 13, 8, 46, 37, 39].indexOf(b) ||
                    (48 <= b && 57 >= b) ||
                    (96 <= b && 105 >= b) ||
                    a.halt(!0);
                },
                this
              );
            },
          },
          { NS: "integerRestrictorPlugin" }
        );
      },
      "1.0",
      { requires: ["base", "plugin", "squarespace-ui-base"] }
    );
  },
  839: function (h, l, f) {
    YUI.add(
      "squarespace-cart-utils",
      function (a) {
        var e, b, c;
        a.namespace("Squarespace.CartUtils");
        a.Squarespace.CartUtils = {
          initializeAddToCartButtons: function () {
            var b = a.Squarespace.Commerce.isExpressCheckout(),
              k = !1;
            a.all(".sqs-add-to-cart-button").each(function (c) {
              var n = c.one(".sqs-add-to-cart-button-inner");
              n.plug(a.Squarespace.Animations.Scalable, { duration: 0.2 });
              b &&
                "Add To Cart" === c.getData("original-label") &&
                (n.setContent("Purchase"),
                c.setData("original-label", "Purchase"));
              c.hasClass("use-form") && (k = !0);
            }, this);
            k &&
              !c &&
              a.Squarespace.CartUtils._getAdditionalFieldsFormTemplateSchema(
                function (a) {
                  c = a;
                },
                this
              );
            e ||
              (e = a
                .one("body")
                .delegate(
                  "click",
                  a.Squarespace.CartUtils._addCartEntry,
                  ".sqs-add-to-cart-button",
                  this
                ));
          },
          initializeSuperbowlBuyButtons: function () {
            a.Lang.isValue(a.one(".sqs-superbowl-buy-button")) &&
              (console.log("initializing superbowl buttons"),
              a.all(".sqs-superbowl-buy-button").each(function (a) {
                var b = a.getAttribute("data-productId");
                a.on("click", function () {
                  window.location =
                    "https://" +
                    Static.SQUARESPACE_CONTEXT.website.identifier +
                    "." +
                    Static.SQUARESPACE_CONTEXT.appDomain +
                    "/commerce/checkouts?productId=" +
                    b;
                });
              }));
          },
          _addCartEntry: function (b) {
            var c = b.currentTarget;
            if (!c.get("parentNode").hasClass("cart-added")) {
              var g = function (b) {
                new a.Squarespace.Widgets.Alert({
                  "strings.title":
                    "Unable to " +
                    (a.Squarespace.Commerce.isExpressCheckout()
                      ? "Purchase"
                      : "Add") +
                    " Item",
                  "strings.message": b,
                });
              };
              b = function (a) {
                var b = "Please select the ",
                  c = a.length;
                if (1 == c) b += a[0] + " option.";
                else if (2 == c) b += a[0] + " and " + a[1] + " options.";
                else
                  for (var d = 0; d < c; d++)
                    b =
                      d == c - 1
                        ? b + ("and " + a[d] + " options.")
                        : b + (a[d] + ", ");
                return b;
              };
              var n = c.getAttribute("data-item-id"),
                e,
                f,
                m = a.one(
                  c.get("parentNode").siblings(".product-variants").item(0)
                );
              if (a.Lang.isValue(m)) {
                var p = JSON.parse(m.getAttribute("data-unselected-options")),
                  q = p.length,
                  r = m.getAttribute("data-selected-variant"),
                  m = m.getAttribute("data-variant-in-stock"),
                  r = r ? JSON.parse(r) : null,
                  m = m ? !0 : !1;
                if (0 < q) {
                  g(b(p));
                  return;
                }
                if (r)
                  if (m) e = r;
                  else {
                    g("Sorry, we do not have enough of that item available.");
                    return;
                  }
                else {
                  g(
                    "Sorry, that item variant is unavailable. Please select another variant."
                  );
                  return;
                }
              }
              if (
                (b = c
                  .get("parentNode")
                  .siblings(".product-quantity-input")
                  .item(0))
              )
                if (
                  ((f = a.one(b).one("input").get("value")),
                  !a.Lang.isNumber(Number(f)))
                ) {
                  g("Quantity must be a number.");
                  return;
                }
              c.hasClass("use-form")
                ? this._verifyItemInStock({
                    itemId: n,
                    variant: e,
                    inStockCb: a.bind(function () {
                      a.Squarespace.CartUtils._openAdditionalFieldsForm(
                        c,
                        function (b) {
                          a.Squarespace.CartUtils._goToCheckoutOrAddToCart(
                            c,
                            n,
                            e,
                            f,
                            b,
                            g
                          );
                        },
                        this
                      );
                    }, this),
                    outOfStockCb: function () {
                      g("Sorry, we do not have enough of that item available.");
                    },
                  })
                : a.Squarespace.CartUtils._goToCheckoutOrAddToCart(
                    c,
                    n,
                    e,
                    f,
                    null,
                    g
                  );
            }
          },
          _verifyItemInStock: function (b) {
            var c = a.Squarespace.Singletons.ShoppingCart;
            a.Data.get({
              url: a.Squarespace.API_ROOT + "commerce/inventory/stock/",
              data: { itemId: b.itemId },
              success: function (g) {
                a.Array.some(g.results, function (a) {
                  return a.unlimited
                    ? !0
                    : a.qtyInStock > c.totalForItem(b.itemId, b.variant);
                })
                  ? b.inStockCb()
                  : b.outOfStockCb();
              },
            });
          },
          _goToCheckoutOrAddToCart: function (b, c, g, n, e, f) {
            a.Squarespace.CartUtils._setButtonStateAdding(b);
            if (a.Lang.isValue(n) && 0 !== n % 1)
              f("Quantity must be a whole number"),
                a.Squarespace.CartUtils._setButtonStateIdle(b);
            else {
              var m = a.Squarespace.Commerce.isExpressCheckout();
              a.Squarespace.Singletons.ShoppingCart.addEntry(
                c,
                g,
                n,
                e,
                m,
                function (c) {
                  b.one(".sqs-add-to-cart-button-inner");
                  c
                    ? (f(c),
                      a.later(1e3, this, function () {
                        a.Squarespace.CartUtils._setButtonStateIdle(b);
                      }))
                    : a.Squarespace.Commerce.isExpressCheckout()
                    ? a.Squarespace.Commerce.goToCheckoutPage()
                    : a.later(1e3, this, function () {
                        a.Squarespace.CartUtils._setButtonStateAdded(b);
                        a.later(2e3, this, function () {
                          a.Squarespace.CartUtils._setButtonStateIdle(b);
                        });
                      });
                },
                this
              );
            }
          },
          _setButtonStateAdding: function (b) {
            var c = b.one(".sqs-add-to-cart-button-inner");
            c.once(
              "hidden",
              function () {
                c.empty();
                b.addClass("cart-adding");
                new a.Squarespace.Spinner({
                  size: 20,
                  color: "light",
                  render: c,
                }).spin();
                c.append('<div class="status-text">Adding...</div>');
                c.show();
              },
              this
            );
            c.hide();
          },
          _setButtonStateAdded: function (a) {
            var b = a.one(".sqs-add-to-cart-button-inner");
            b.empty();
            a.addClass("cart-added");
            b.append('<div class="status-text">Added!</div>');
          },
          _setButtonStateIdle: function (a) {
            var b = a.one(".sqs-add-to-cart-button-inner");
            b.once(
              "hidden",
              function () {
                b.empty();
                a.removeClass("cart-adding");
                a.removeClass("cart-added");
                b.setContent(a.getData("original-label"));
                b.show();
              },
              this
            );
            b.hide();
          },
          _openAdditionalFieldsForm: function (d, k, g) {
            b ||
              (b = new a.Squarespace.Widgets.ModalLightbox({
                render: a.one("body"),
              }));
            var n = a.JSON.parse(d.getData("form")),
              e = new a.Squarespace.Widgets.AsyncForm({
                form: n,
                formTemplate: c,
                formSubmitButtonText: d.getData("original-label"),
                formName: n.name,
                showTitle: !0,
              });
            e.on(
              "submission",
              function (a) {
                k && k.call(g || this, a.data);
                b.close();
              },
              this
            );
            b.set("content", e);
            b.once(
              "close",
              function () {
                e.destroy();
              },
              this
            );
            b.open();
          },
          _getAdditionalFieldsFormTemplateSchema: function (b, c) {
            a.Data.get(
              {
                url: "/api/template/GetTemplateSchema",
                data: {
                  componentType: "widget",
                  type: a.Squarespace.BlockType.FORM,
                },
                success: function (a) {
                  b.call(c || this, a);
                },
              },
              this
            );
          },
        };
      },
      "1.0",
      {
        requires:
          "base node json squarespace-enum squarespace-commerce-utils squarespace-modal-lightbox squarespace-async-form squarespace-animations squarespace-spinner squarespace-widgets-alert".split(
            " "
          ),
      }
    );
  },
  840: function (h, l, f) {
    YUI.add(
      "squarespace-donate-form",
      function (a) {
        a.namespace("Squarespace.Widgets");
        var e = (a.Squarespace.Widgets.DonateForm = a.Base.create(
          "DonateForm",
          a.Squarespace.Widgets.SSWidget,
          [],
          {
            initializer: function () {
              var b = this.get("donatePage");
              this._contributionSection =
                new a.Squarespace.Widgets.ContributionSummary({
                  donatePage: b,
                  state: "editing",
                });
              this._contactSection =
                new a.Squarespace.Widgets.CheckoutFormContactInfo({
                  enableMailingListOptInByDefault: this.get(
                    "enableMailingListOptInByDefault"
                  ),
                  optionalFields: this.get("optionalFields"),
                  state: "incomplete",
                });
              this._customFormSection =
                new a.Squarespace.Widgets.CheckoutCustomForm({
                  state: "incomplete",
                  customForm: b.customForm,
                  formId: b.customFormId,
                });
              this._paymentSection =
                new a.Squarespace.Widgets.CheckoutFormPayment({
                  strings: {
                    submitText: b.buttonLabel,
                    pendingText: "Submitting ...",
                  },
                  state: "incomplete",
                  optionalHiddenFields: [
                    "donationAmountCents",
                    "donatePageId",
                    "email",
                    "phone",
                    "joinMailingList",
                  ],
                  inTestMode: this.get("inTestMode"),
                  countriesAllowed:
                    a.Squarespace.Localities.getAllCountryNames(),
                });
              this.formSubmitted = !1;
            },
            destructor: function () {
              this._contributionSection.destroy(!0);
              this._contributionSection = null;
              this._contactSection.destroy(!0);
              this._contactSection = null;
              this._customFormSection.destroy(!0);
              this._customFormSection = null;
              this._paymentSection.destroy(!0);
              this._paymentSection = null;
            },
            renderUI: function () {
              e.superclass.renderUI.call(this);
              var b;
              b = a.Data.addCrumb("/commerce/submit-donation");
              b = a.Node.create(
                '<form action="' + b + '" method="POST"></form>'
              );
              b.append(
                a.Node.create(
                  '<input type="hidden" name="customFormSubmission" />'
                )
              );
              this._contributionSection.render(a.one("#summary-wrapper"));
              this._contactSection.render(a.one("#summary-wrapper"));
              this._customFormSection.render(a.one("#summary-wrapper"));
              this._paymentSection.render(b);
              this._customFormSection.setStateIncomplete();
              this._paymentSection.setStateIncomplete();
              this.get("contentBox").append(b);
            },
            bindUI: function () {
              e.superclass.bindUI.call(this);
              var a = this._contributionSection,
                c = this._contactSection,
                d = this._customFormSection,
                k = this._paymentSection;
              a.on("continue", function () {
                a.setStateComplete();
                c.setStateEditing();
              });
              a.on("edit", function () {
                a.setStateEditing();
                c.setStateIncomplete();
                d.setStateIncomplete();
                k.setStateIncomplete();
              });
              c.on("edit", function () {
                c.setStateEditing();
                d.setStateIncomplete();
                k.setStateIncomplete();
              });
              c.on(
                "continue",
                function () {
                  c.setStateComplete();
                  this._hasCustomForm()
                    ? d.setStateEditing()
                    : k.setStateEditing();
                },
                this
              );
              d.on("continue", function () {
                d.setStateComplete();
                k.setStateEditing();
              });
              d.on("edit", function () {
                d.setStateEditing();
                k.setStateIncomplete();
              });
              k.on("continue", this._submit, this);
            },
            lock: function () {
              var a = this.get("contentBox");
              this.fire("lock");
              a.addClass("submitting");
              this._paymentSection.lock();
            },
            unlock: function () {
              var a = this.get("contentBox");
              this.fire("unlock");
              a.removeClass("submitting");
              this._paymentSection.unlock();
            },
            _hasCustomForm: function () {
              var b = this.get("donatePage").customForm;
              return !a.Lang.isValue(b) ? !1 : 0 < b.fields.length;
            },
            _submit: function () {
              var b = this.get("donatePage"),
                c = a.bind(function (b) {
                  b = this._paymentSection.getCreditCardValues();
                  var c = this._paymentSection.getValues();
                  Stripe.createToken(
                    {
                      number: b.cardNumber,
                      cvc: b.cvc,
                      exp_month: b.cardExpiryMonth,
                      exp_year: b.cardExpiryYear,
                      name: c.cardHolderName,
                      address_line1: c.billingAddress1,
                      address_line2: c.billingAddress2,
                      address_state: c.billingState,
                      address_city: c.billingCity,
                      address_country: c.billingCountry,
                      address_zip: c.billingZip,
                    },
                    a.bind(this._stripeResponseHandler, this)
                  );
                }, this);
              this._validateSubmit().then(
                a.bind(function (d) {
                  if (d)
                    if ((this.lock(), !0 === b.queuedSubmitEnabled)) {
                      var k = new a.Squarespace.TokenQueue();
                      k.on(
                        "estimatedWaitChanged",
                        function () {
                          this._showCountdown(k.estimatedTime);
                        },
                        this
                      );
                      k.waitInQueue().then(a.bind(c, this));
                    } else c();
                }, this)
              );
            },
            _showCountdown: function (b) {
              if (!(5 >= b)) {
                this._paymentSection.showQueueExplanation();
                var c = setInterval(
                  a.bind(function () {
                    0 >= b && clearInterval(c);
                    b--;
                    this._paymentSection.updateButton(b);
                  }, this),
                  1e3
                );
              }
            },
            _validateSubmit: function () {
              return new a.Promise(
                a.bind(function (b) {
                  this._contributionSection.validate() || b(!1);
                  this._paymentSection.validate().then(
                    a.bind(function (c) {
                      0 < c.length &&
                        (this._paymentSection.renderErrors(c), b(!1));
                      50 > this._contributionSection.getDonationAmountCents() &&
                        (new a.Squarespace.Widgets.Alert({
                          "strings.title": "Cannot Complete Donation",
                          "strings.message":
                            "Your contribution must be at least " +
                            a.Squarespace.Commerce.currencySymbol() +
                            "0.50 to continue.",
                        }),
                        b(!1));
                      Static.SQUARESPACE_CONTEXT.websiteSettings.storeSettings
                        .storeState ===
                        a.Squarespace.StoreStates.NOT_CONNECTED &&
                        (new a.Squarespace.Widgets.Alert({
                          "strings.title": "Payments Not Connected",
                          "strings.message":
                            "This site has not connected a payment gateway. Transactions are disabled and you cannot complete this donation.",
                        }),
                        b(!1));
                      b(!0);
                    }, this)
                  );
                }, this)
              );
            },
            _stripeResponseHandler: function (a, c) {
              var d = c.error,
                k = this.get("contentBox").one("form"),
                g = this._contributionSection;
              if (d)
                this.unlock(),
                  (k = this._paymentSection),
                  k.renderErrors([
                    {
                      type: k.getProperty("FIELD_ERROR_TYPES").STRIPE,
                      message: d.message,
                    },
                  ]);
              else {
                var d = this._contactSection.getValues(),
                  n = this._paymentSection.getValues();
                this._paymentSection.setHiddenValues({
                  stripeToken: c.id,
                  cardHolderName: n.cardHolderName,
                  donationAmountCents: g.getDonationAmountCents(),
                  email: d.email,
                  joinMailingList: "on" == d.joinMailingList ? !0 : !1,
                  phone: d.phone,
                  donatePageId: this.get("donatePage").id,
                });
                g = this._customFormSection.getCustomFormSubmission();
                k.one('input[name="customFormSubmission"]').set(
                  "value",
                  JSON.stringify(g)
                );
                this._submitForm();
              }
            },
            _submitForm: function () {
              var a = this.get("contentBox").one("form");
              !1 === this.formSubmitted &&
                ((this.formSubmitted = !0), a.submit());
            },
          },
          {
            CSS_PREFIX: "sqs-checkout-form",
            ATTRS: {
              countriesAllowed: { value: [] },
              optionalFields: { value: null },
              donatePage: { value: null },
              inTestMode: { value: !1 },
              enableMailingListOptInByDefault: {
                validator: a.Squarespace.AttrValidators.isBoolean,
                value: !0,
              },
            },
          }
        ));
      },
      "1.0",
      {
        requires:
          "base node squarespace-attr-validators squarespace-ss-widget squarespace-util squarespace-commerce-utils squarespace-ui-base squarespace-checkout-form-custom-form squarespace-checkout-form-shipping-info squarespace-checkout-form-payment squarespace-contribution-summary squarespace-widgets-alert".split(
            " "
          ),
      }
    );
  },
  841: function (h, l, f) {
    YUI.add(
      "squarespace-checkout-form-custom-form",
      function (a) {
        a.namespace("Squarespace.Widgets");
        var e = (a.Squarespace.Widgets.CheckoutCustomForm = a.Base.create(
          "CheckoutCustomForm",
          a.Squarespace.Widgets.CheckoutFormSection,
          [],
          {
            renderUI: function () {
              e.superclass.renderUI.call(this);
              var b = this.get("contentBox");
              a.Data.get(
                {
                  url: "/api/template/GetTemplateSchema",
                  data: {
                    componentType: "widget",
                    type: a.Squarespace.BlockType.FORM,
                  },
                  success: function (c) {
                    this._formWidget = new a.Squarespace.Widgets.AsyncForm({
                      form: this.get("customForm"),
                      formTemplate: c,
                      formSubmitButtonText: "Submit",
                      hideSubmitButton: !0,
                      showTitle: !1,
                    });
                    this._formWidget.render(b.one(".custom-form"));
                  },
                },
                this
              );
            },
            syncUI: function () {
              e.superclass.syncUI.call(this);
              this.get("boundingBox").toggleClass(
                "no-form",
                0 === this.get("customForm").fields.length
              );
            },
            _renderSavedFieldset: function (b) {
              var c = this.getProperty("HANDLEBARS_SAVED_FIELDSET_TEMPLATE"),
                d = this.get("formId");
              this._formWidget.fetchValidatedFormSubmission(
                d,
                a.bind(function (d) {
                  var g = [];
                  a.Object.each(d, function (b, c) {
                    g.push(a.Squarespace.Commerce.summaryFormFieldString(b));
                  });
                  this.get("contentBox").append(
                    a.Squarespace.UITemplates.render(c, { fields: g })
                  );
                  b.call(this);
                }, this)
              );
            },
            _getLocalErrors: function () {
              return [];
            },
            _fetchAsyncValidatedErrors: function () {
              return new a.Promise(
                a.bind(function (b) {
                  this._formWidget.fetchValidatedFormSubmission(
                    this.get("formId"),
                    function () {
                      b([]);
                    },
                    a.bind(function (c) {
                      var d = a.Array.map(
                        a.Object.keys(c.errors),
                        function (a) {
                          return {
                            type: this.getProperty("FIELD_ERROR_TYPES")
                              .FORM_FIELD,
                            fieldId: a,
                            message: c.errors[a],
                          };
                        },
                        this
                      );
                      d.push({
                        type: this.getProperty("FIELD_ERROR_TYPES").CUSTOM,
                        message:
                          "Your form has encountered a problem. Please scroll up to review.",
                      });
                      d.push({
                        type: this.getProperty("FIELD_ERROR_TYPES").HEADER,
                        message:
                          "Your form has encountered a problem. Please scroll down to review.",
                      });
                      b(d);
                    }, this)
                  );
                }, this)
              );
            },
            getCustomFormSubmission: function () {
              return a.Lang.isValue(this._formWidget)
                ? this._formWidget.getFormData()
                : null;
            },
          },
          {
            CSS_PREFIX: "sqs-checkout-form-custom-form",
            HANDLEBARS_TEMPLATE: "checkout-form-custom-form.html",
            HANDLEBARS_SAVED_FIELDSET_TEMPLATE:
              "checkout-saved-custom-form.html",
            ATTRS: {
              "strings.name": { value: "More" },
              customForm: { value: { fields: [] }, validator: a.Lang.isValue },
              formId: { value: null },
            },
          }
        ));
      },
      "1.0",
      {
        requires:
          "base node squarespace-localities squarespace-util squarespace-checkout-form-section squarespace-checkout-saved-custom-form-template squarespace-checkout-form-custom-form-template squarespace-mixins-google-places-autocomplete".split(
            " "
          ),
      }
    );
  },
  842: function (h, l, f) {
    YUI.add(
      "squarespace-checkout-form-section",
      function (a) {
        a.namespace("Squarespace.Widgets");
        var e = (a.Squarespace.Widgets.CheckoutFormSection = a.Base.create(
          "checkoutFormSection",
          a.Squarespace.Widgets.SSWidget,
          [],
          {
            initializer: function () {
              this.publish("continue-clicked", {
                preventable: !0,
                defaultFn: this._onContinue,
              });
            },
            renderUI: function () {
              e.superclass.renderUI.call(this);
              Modernizr &&
                !Modernizr.input.placeholder &&
                this.get("boundingBox").addClass("show-labels");
              this.get("contentBox")
                .all(".field-element")
                .plug(a.Squarespace.Plugin.PulseWarn, {
                  iterations: 1,
                  useClass: !0,
                  targetClass: "warn",
                  interval: 1300,
                });
              switch (this.get("state")) {
                case "editing":
                  this.setStateEditing();
                  break;
                case "complete":
                  this.setStateComplete();
                  break;
                case "incomplete":
                  this.setStateIncomplete();
              }
            },
            bindUI: function () {
              e.superclass.bindUI.call(this);
              if (a.Lang.isValue(this.get("model")))
                this.get("model").on("change", this.syncUI, this);
              var b = this.get("contentBox");
              b.one(".continue-button").on(
                "click",
                function () {
                  this.fire("continue-clicked");
                },
                this
              );
              b.one(".edit-button").on("click", this._onEdit, this);
            },
            setStateEditing: function () {
              var a = this.get("boundingBox");
              this._removeSaved();
              a.removeClass("complete");
              a.removeClass("incomplete");
              a.addClass("editing");
              this.set("state", "editing");
            },
            setStateComplete: function () {
              var a = this.get("contentBox").one(".saved-fieldset");
              a && a.remove(!0);
              this._renderSavedFieldset(function () {
                var a = this.get("boundingBox");
                a.removeClass("editing");
                a.removeClass("incomplete");
                a.addClass("complete");
                this.set("state", "complete");
              });
            },
            _renderSavedFieldset: function (b) {
              var c = this.getProperty("HANDLEBARS_SAVED_FIELDSET_TEMPLATE");
              c &&
                this.get("contentBox").append(
                  a.Squarespace.UITemplates.render(c, this.getValues())
                );
              a.Lang.isValue(b) && b.call(this);
            },
            setStateIncomplete: function () {
              var a = this.get("boundingBox");
              this._removeSaved();
              this._clearErrors();
              a.removeClass("editing");
              a.removeClass("complete");
              a.addClass("incomplete");
              this.set("state", "incomplete");
            },
            getValues: function () {
              var a = {};
              this.get("contentBox")
                .all(".field")
                .each(function (c) {
                  c = c.one(".field-element");
                  var d = c.get("value").trim();
                  "" === d && (d = null);
                  a[c.get("name")] = d;
                }, this);
              return a;
            },
            setValues: function (b) {
              this.get("contentBox")
                .all(".field-element")
                .each(function (c) {
                  var d = c.get("name");
                  a.Object.hasKey(b, d) && this._setFieldValue(c, b[d]);
                }, this);
            },
            _setFieldValue: function (b, c) {
              if ("select-one" === b.get("type")) {
                var d = b.one('option[value="' + c + '"]');
                a.Lang.isValue(d) && d.set("selected", !0);
              } else b.set("value", c);
            },
            renderErrors: function (b) {
              this._clearErrors();
              var c = [],
                d = [],
                k = [],
                g = [],
                n = [],
                e = [];
              a.Array.each(
                b,
                function (a) {
                  var b = this.getProperty("FIELD_ERROR_TYPES"),
                    f = a.type,
                    m = a.field;
                  m && this._renderFieldError(m);
                  f === b.REQUIRED
                    ? c.push(m.getData("label"))
                    : f === b.VALIDATION
                    ? d.push(m.getData("label"))
                    : f === b.STRIPE
                    ? k.push(a.message)
                    : f === b.CUSTOM
                    ? g.push(a.message)
                    : f === b.FORM_FIELD
                    ? n.push(a)
                    : f === b.HEADER && e.push(a);
                },
                this
              );
              var f = (b = ""),
                m = "",
                p = "";
              0 < c.length &&
                (b = a.Array.dedupe(c).join(", ") + " required. ");
              0 < d.length && (f = a.Array.dedupe(d).join(", ") + " invalid.");
              0 < k.length && (m = a.Array.dedupe(k).join(". "));
              0 < g.length && (p = a.Array.dedupe(g).join(". "));
              b = a.Node.create(
                '<div class="error-summary">' + b + f + m + p + "</div>"
              );
              this.get("contentBox").one(".button").insert(b, "before");
              a.Array.each(n, function (b) {
                a.one("#" + b.fieldId)
                  .addClass("error")
                  .insert(
                    '<div class="form-field-error">' + b.message + "</div>",
                    0
                  );
              });
              a.Array.each(
                e,
                function (a) {
                  this.get("contentBox")
                    .one(".custom-form")
                    .insert(
                      '<div class="header-error">' + a.message + "</div>",
                      0
                    );
                },
                this
              );
            },
            _onContinue: function () {
              this.validate().then(
                a.bind(function (a) {
                  0 < a.length
                    ? this.renderErrors(a)
                    : (this._clearErrors(), this.fire("continue"));
                }, this)
              );
            },
            _onEdit: function () {
              this.fire("edit");
            },
            _fetchAsyncValidatedErrors: function () {
              return new a.Promise(function (a) {
                a([]);
              });
            },
            _getLocalErrors: function () {
              var a = [];
              this.get("contentBox")
                .all(".field")
                .each(function (c) {
                  c.hasClass("required") &&
                    (c = this._validateField(c)) &&
                    a.push(c);
                }, this);
              return a;
            },
            validate: function () {
              var b = this._getLocalErrors();
              return new a.Promise(
                a.bind(function (c) {
                  this._fetchAsyncValidatedErrors().then(
                    a.bind(function (a) {
                      a = b.concat(a);
                      c(a);
                    }, this)
                  );
                }, this)
              );
            },
            _validateField: function (a) {
              var c = a.one(".field-element");
              c.get("name");
              if ("" === c.get("value").trim())
                return {
                  type: this.getProperty("FIELD_ERROR_TYPES").REQUIRED,
                  field: a,
                };
            },
            _clearErrors: function () {
              var a = this.get("contentBox");
              a.all(".error-summary, .form-field-error, .header-error").remove(
                !0
              );
              a.all(".field, .form-item").removeClass("error");
            },
            _renderFieldError: function (a) {
              var c = a.one(".field-element");
              c.pulseWarn.warn();
              a.addClass("error");
              c.once(
                ["click", "change", "focus"],
                function () {
                  a.removeClass("error");
                },
                this
              );
            },
            _removeSaved: function () {
              var a = this.get("contentBox").one(".saved-fieldset");
              a && a.remove(!0);
            },
          },
          {
            CSS_PREFIX: "sqs-checkout-form-section card",
            FIELD_ERROR_TYPES: {
              REQUIRED: 1,
              VALIDATION: 2,
              STRIPE: 3,
              CUSTOM: 4,
              FORM_FIELD: 5,
              HEADER: 6,
            },
            ATTRS: { model: { value: null }, state: { value: "incomplete" } },
          }
        ));
      },
      "1.0",
      {
        requires:
          "node base thirdparty-modernizr squarespace-ss-widget squarespace-ui-templates squarespace-plugin-pulsewarn".split(
            " "
          ),
      }
    );
  },
  843: function (h, l, f) {
    YUI.add(
      "squarespace-checkout-form-shipping-info",
      function (a) {
        a.namespace("Squarespace.Widgets");
        var e = (a.Squarespace.Widgets.CheckoutFormShippingInfo = a.Base.create(
          "checkoutFormShipping",
          a.Squarespace.Widgets.CheckoutFormAddress,
          [],
          {
            _onContinue: function () {
              if (this.get("model").isRecalculating()) return !1;
              e.superclass._onContinue.call(this);
            },
            getValues: function () {
              var a = e.superclass.getValues.call(this);
              a.requiresShipping = this.get("model").get("requiresShipping");
              return a;
            },
            setValues: function (b) {
              e.superclass.setValues.call(this, b);
              a.Object.hasKey(b, "selectedShippingOption") &&
                this._shippingOptionsWidget.setSelectedOption(
                  b.selectedShippingOption
                );
            },
            getLocationForShipping: function () {
              var a = this.getValues();
              return {
                country: a.shippingCountry,
                state: a.shippingState,
                zip: a.shippingZip,
              };
            },
            _populateFieldsFromAc: function (a) {
              this.setValues({
                shippingAddress1: a.address,
                shippingCountry: a.country,
                shippingCity: a.city,
                shippingState: a.state,
                shippingZip: a.zip,
              });
            },
          },
          {
            CSS_PREFIX: "sqs-checkout-form-shipping-info",
            HANDLEBARS_TEMPLATE: "checkout-form-shipping-info.html",
            HANDLEBARS_SAVED_FIELDSET_TEMPLATE:
              "checkout-saved-shipping-info.html",
            ATTRS: {
              useAddressForShipping: { value: !0 },
              optionalFields: { value: { showMailingList: !0 } },
              enableMailingListOptInByDefault: {
                validator: a.Squarespace.AttrValidators.isBoolean,
              },
            },
          }
        ));
      },
      "1.0",
      {
        requires:
          "base node squarespace-checkout-form-address squarespace-models-shopping-cart squarespace-hb-money-string squarespace-shipping-options-list squarespace-checkout-form-shipping-info-template squarespace-checkout-saved-shipping-info-template".split(
            " "
          ),
      }
    );
  },
  844: function (h, l, f) {
    YUI.add(
      "squarespace-checkout-form-address",
      function (a) {
        a.namespace("Squarespace.Widgets");
        var e = a.Squarespace.Localities,
          b = e.COUNTRY_OPTIONS.US,
          c = e.COUNTRY_OPTIONS.CA,
          d = (a.Squarespace.Widgets.CheckoutFormAddress = a.Base.create(
            "checkoutFormAddress",
            a.Squarespace.Widgets.CheckoutFormSection,
            [],
            {
              renderUI: function () {
                d.superclass.renderUI.call(this);
                try {
                  this._autoComplete =
                    new a.Squarespace.Widgets.GooglePlacesAutocomplete({
                      inputNode: this.get("contentBox").one(
                        "input.address-line1"
                      ),
                      render: !0,
                      countriesAllowed: this.get("countriesAllowed"),
                    });
                } catch (b) {
                  console.error(b);
                }
              },
              bindUI: function () {
                d.superclass.bindUI.call(this);
                this._bindUseAddressForShippingChange();
                this._bindZipChange();
                this._bindCountryChange();
                this._bindStateChange();
                try {
                  this._bindGoogleAutoComplete();
                } catch (a) {
                  console.error(a);
                }
              },
              syncUI: function () {
                d.superclass.syncUI.call(this);
                this._populateCountrySelect();
                this._updateStateFieldForSelectedCountry();
                this._syncRequiredFieldsForSelectedCountry();
              },
              setValues: function (a) {
                d.superclass.setValues.call(this, a);
                this.get("useAddressForShipping") &&
                  this.fire("shippingLocationChange");
              },
              _bindUseAddressForShippingChange: function () {
                this.after(
                  "useAddressForShippingChange",
                  function (a) {
                    !0 === a.newVal && this.fire("shippingLocationChange");
                  },
                  this
                );
              },
              _bindZipChange: function () {
                this.get("contentBox")
                  .one(".zip input")
                  .after(
                    "change",
                    function () {
                      this.get("useAddressForShipping") &&
                        this.fire("shippingLocationChange");
                    },
                    this
                  );
              },
              _bindCountryChange: function () {
                this.get("contentBox")
                  .one(".country select")
                  .after(
                    "change",
                    function () {
                      this.syncUI();
                      this.get("useAddressForShipping") &&
                        this.fire("shippingLocationChange");
                    },
                    this
                  );
              },
              _bindStateChange: function () {
                this.get("contentBox").delegate(
                  "change",
                  function () {
                    this.get("useAddressForShipping") &&
                      this.fire("shippingLocationChange");
                  },
                  ".state .field-element",
                  this
                );
              },
              _bindGoogleAutoComplete: function () {
                this._autoComplete.on(
                  "placeDetails",
                  function (a) {
                    this._setSelectedCountry(a.place.country);
                    this.syncUI();
                    this._populateFieldsFromAc(a.place);
                  },
                  this
                );
                this._autoComplete.on(
                  ["keyboardContinue", "listMouseUp"],
                  function () {
                    this.get("contentBox").one("input.address-line2").focus();
                  },
                  this
                );
              },
              _getSelectedCountry: function () {
                return this.get("contentBox")
                  .one(".country select")
                  .get("value");
              },
              _setSelectedCountry: function (a) {
                this.get("contentBox").one(".country select").set("value", a);
              },
              _getSelectedState: function () {
                return this.get("contentBox").one(".state select").get("value");
              },
              _countryRequiresStateAndZip: function (a) {
                return a === b.title || a === c.title;
              },
              _shouldValidateStateZipEnclosure: function () {
                return this._getSelectedCountry() === b.title;
              },
              _syncRequiredFieldsForSelectedCountry: function () {
                this.get("contentBox")
                  .all(".state, .zip")
                  .toggleClass(
                    "required",
                    this._countryRequiresStateAndZip(this._getSelectedCountry())
                  );
              },
              _zipFieldIsInvalid: function (a) {
                var c = /^\d{5}(-\d{4})?$/;
                return this._getSelectedCountry() === b.title
                  ? !c.test(a.one(".field-element").get("value").trim())
                  : !1;
              },
              _emailFieldIsInvalid: function (b) {
                return !a.Squarespace.EmailUtils.isValid(
                  b.one(".field-element").get("value")
                );
              },
              _validateField: function (a) {
                var b = d.superclass._validateField.call(this, a);
                if (b) return b;
                if (
                  (a.hasClass("zip") && this._zipFieldIsInvalid(a)) ||
                  (a.hasClass("email") && this._emailFieldIsInvalid(a))
                )
                  return {
                    type: this.getProperty("FIELD_ERROR_TYPES").VALIDATION,
                    field: a,
                  };
              },
              _buildSingleOptionString: function (a) {
                return '<option value="' + a + '">' + a + "</option>";
              },
              _buildOptionString: function (b) {
                return a.Array.reduce(
                  b,
                  "",
                  function (a, b) {
                    return "Not Specified" === b
                      ? a
                      : a + this._buildSingleOptionString(b);
                  },
                  this
                );
              },
              _getCountryTitles: function () {
                var b = a.Array.filter(
                  a.Object.values(e.COUNTRY_OPTIONS),
                  function (a) {
                    return !a.empty;
                  }
                );
                return a.Array.map(b, function (a) {
                  return a.title;
                });
              },
              _getStateCodesForSelectedCountry: function () {
                var b = e.countryCodeFromName(this._getSelectedCountry());
                if ("" === b || !a.Lang.isValue(b)) b = "US";
                b = e.COUNTRIES_TO_STATES[b];
                return a.Lang.isValue(b) ? a.Object.keys(b) : [];
              },
              _fetchAsyncValidatedErrors: function () {
                var b = this.getLocationForShipping();
                return !this._shouldValidateStateZipEnclosure()
                  ? a.when([])
                  : new a.Promise(
                      a.bind(function (c) {
                        a.Data.get({
                          url:
                            a.Squarespace.API_ROOT +
                            "commerce/shipping/address/validate",
                          headers: { "Content-Type": "application/json" },
                          data: { state: b.state, zip: b.zip },
                          success: a.bind(function (a) {
                            a.stateOwnsZip
                              ? c([])
                              : c([
                                  {
                                    type: this.getProperty("FIELD_ERROR_TYPES")
                                      .CUSTOM,
                                    message:
                                      "ZIP Code does not belong to that State.",
                                  },
                                ]);
                          }, this),
                        });
                      }, this)
                    );
              },
              _populateCountrySelect: function () {
                var c = this.get("contentBox").one(".country select"),
                  d = this._getSelectedCountry(),
                  n = this.get("countriesAllowed");
                c.empty();
                0 === n.length
                  ? c.setHTML(this._buildSingleOptionString(b.title))
                  : (c.setHTML(this._buildOptionString(n)),
                    -1 !== a.Array.indexOf(n, d)
                      ? c.set("value", d)
                      : -1 !== a.Array.indexOf(n, b.title)
                      ? c.set("value", b.title)
                      : c.set("value", n[0]));
              },
              _updateStateFieldForSelectedCountry: function (b) {
                var c = this.get("contentBox").one(".state .field-element");
                b = a.Lang.isValue(b)
                  ? e.countryCodeFromName(b)
                  : e.countryCodeFromName(this._getSelectedCountry());
                var d;
                e.COUNTRIES_TO_STATES[b]
                  ? c.test("select") ||
                    (d = a.Node.create(
                      '<select class="field-element state required" name="' +
                        c.getAttribute("name") +
                        '"></select>'
                    ))
                  : c.test("input") ||
                    (d = a.Node.create(
                      '<input class="field-element state" placeholder="State" name="' +
                        c.getAttribute("name") +
                        '" />'
                    ));
                d &&
                  (d.plug(a.Squarespace.Plugin.PulseWarn, {
                    iterations: 1,
                    useClass: !0,
                    targetClass: "warn",
                    interval: 1300,
                  }),
                  c.replace(d),
                  (c = d));
                if (c.test("select")) {
                  d = this._getSelectedState();
                  b = this._getStateCodesForSelectedCountry();
                  c.empty();
                  var v =
                    this._buildSingleOptionString("") +
                    this._buildOptionString(b);
                  c.setHTML(v);
                  -1 !== a.Array.indexOf(b, d) && c.set("value", d);
                }
              },
            },
            {
              CSS_PREFIX: "sqs-checkout-form-address",
              ATTRS: {
                strings: { value: null },
                countriesAllowed: { value: [] },
                getCountriesAllowed: { value: function () {} },
                useAddressForShipping: { value: !1 },
              },
            }
          ));
      },
      "1.0",
      {
        requires:
          "autocomplete cookie node squarespace-localities squarespace-util squarespace-checkout-form-section squarespace-widgets-google-places-autocomplete".split(
            " "
          ),
      }
    );
  },
  845: function (h, l, f) {
    YUI.add(
      "squarespace-hb-money-string",
      function (a) {
        a.Handlebars.registerHelper("money-string", function (e, b) {
          return new a.Handlebars.SafeString(
            a.Squarespace.Commerce.moneyString(e)
          );
        });
      },
      "1.0",
      { requires: ["handlebars-base", "squarespace-commerce-utils"] }
    );
  },
  846: function (h, l, f) {
    YUI.add(
      "squarespace-shipping-options-list",
      function (a) {
        a.namespace("Squarespace.Widgets");
        var e = (a.Squarespace.Widgets.ShippingOptionsList = a.Base.create(
          "shippingOptionsList",
          a.Squarespace.Widgets.SSWidget,
          [],
          {
            renderUI: function () {
              e.superclass.renderUI.call(this);
              this._spinner = new a.Squarespace.Spinner({
                render: this.get("contentBox").one(".loading-spinner"),
                size:
                  1 < this.get("model").get("shippingOptions").length ? 35 : 15,
                color: "dark",
              });
            },
            bindUI: function () {
              e.superclass.bindUI.call(this);
              var a = this.get("model"),
                c = this.get("contentBox");
              a.on("change", this.syncUI, this);
              a.on("recalculate-start", this._setLoadingState, this);
              a.on("recalculate-end", this._setLoadedState, this);
              this.on("shippingCountryChange", this.syncUI, this);
              c.delegate(
                "click",
                function (c) {
                  a.updateShippingMethod(c.target.get("value"));
                },
                "input",
                this
              );
            },
            syncUI: function () {
              e.superclass.syncUI.call(this);
              var b = this.get("contentBox"),
                c = this.get("model"),
                d = c.get("shippingOptions"),
                k = (c = c.get("selectedShippingOption")) ? c.id : null,
                c = this._getWarnings(),
                g = b.one(".options-container");
              b.all(".shipping-option").remove(!0);
              b.toggleClass("empty", 0 === d.length);
              b.toggleClass("show-zip-warning", c.zip);
              b.toggleClass("show-zip-invalid-warning", c.zipInvalid);
              b.toggleClass("show-weight-missing-warning", c.weightMissing);
              b.toggleClass(
                "show-service-unavailable-warning",
                c.serviceUnavailable
              );
              b.toggleClass("show-carrier-warning", c.carrier);
              a.Array.each(
                d,
                function (b, c) {
                  var d = b.id,
                    e =
                      b.priceRequestStatus !==
                      a.Squarespace.ShippingPriceRequestStatus.SUCCESS,
                    f;
                  b.rateType === a.Squarespace.ShippingRateTypes.USPS &&
                    (f = a.Squarespace.Commerce.speedStringForShippingRate(
                      b.rateType,
                      b.formula.serviceType
                    ));
                  e = a.Squarespace.UITemplates.renderAsNodeOrDocFrag(
                    this.getProperty("HANDLEBARS_SHIPPING_OPT_TEMPLATE"),
                    {
                      name: b.name,
                      id: d,
                      computedCost: b.computedCost,
                      speed: f,
                      showAlert: e,
                    }
                  );
                  ((k && d === k) || (!k && 0 === c)) &&
                    e.one("input").set("checked", !0);
                  g.append(e);
                },
                this
              );
            },
            getSelectedOption: function () {
              var b = this.get("contentBox").one("input:checked");
              if (a.Lang.isValue(b) && b.get("disabled")) return null;
              if (b)
                return {
                  value: b.get("value"),
                  title: b.get("title"),
                  cost: Number(b.getData("computed-cost")),
                };
            },
            setSelectedOption: function (a) {
              this.get("contentBox")
                .all("input")
                .each(function (c) {
                  c.set("checked", c.get("value") === a);
                }, this);
            },
            _setLoadingState: function () {
              var a = this.get("contentBox"),
                c = 1 < this.get("model").get("shippingOptions").length;
              this._spinner.set("size", c ? 35 : 15);
              a.all("input").setAttribute("disabled", !0);
              a.toggleClass("multiple-options", c);
              a.addClass("loading-options");
            },
            _setLoadedState: function () {
              a.later(350, this, function () {
                var a = this.get("contentBox");
                a.removeClass("loading-options");
                a.all(".shipping-option").each(function (a) {
                  a.hasClass("disabled") ||
                    a.one("input").removeAttribute("disabled");
                }, this);
              });
            },
            _getWarnings: function () {
              var b = this.get("model").get("shippingOptions"),
                c = a.Array.reduce(b, !1, function (b, c) {
                  return (
                    b ||
                    c.priceRequestStatus ===
                      a.Squarespace.ShippingPriceRequestStatus
                        .DESTINATION_MISSING
                  );
                }),
                d = a.Array.reduce(b, !1, function (b, c) {
                  return (
                    b ||
                    c.priceRequestStatus ===
                      a.Squarespace.ShippingPriceRequestStatus
                        .DESTINATION_INVALID
                  );
                }),
                k = a.Array.reduce(b, !1, function (b, c) {
                  return (
                    b ||
                    c.priceRequestStatus ===
                      a.Squarespace.ShippingPriceRequestStatus.WEIGHT_MISSING
                  );
                }),
                g = a.Array.reduce(b, !1, function (b, c) {
                  return (
                    b ||
                    c.priceRequestStatus ===
                      a.Squarespace.ShippingPriceRequestStatus
                        .SERVICE_UNAVAILABLE_FOR_PACKAGE
                  );
                }),
                b = a.Array.reduce(b, !1, function (b, c) {
                  return (
                    b ||
                    c.priceRequestStatus ===
                      a.Squarespace.ShippingPriceRequestStatus
                        .CARRIER_UNAVAILABLE
                  );
                });
              return {
                zip: c,
                zipInvalid: d,
                weightMissing: k,
                serviceUnavailable: g,
                carrier: b,
              };
            },
          },
          {
            CSS_PREFIX: "sqs-shipping-options-list",
            HANDLEBARS_TEMPLATE: "shipping-options-list.html",
            HANDLEBARS_SHIPPING_OPT_TEMPLATE:
              "shipping-options-list-option.html",
            ATTRS: {
              model: {
                value: null,
                validator: function (b) {
                  return a.instanceOf(b, a.Squarespace.Models.ShoppingCart);
                },
              },
            },
          }
        ));
      },
      "1.0",
      {
        requires:
          "base node squarespace-ss-widget squarespace-models-shopping-cart squarespace-shipping-options-list-template squarespace-shipping-options-list-option-template squarespace-hb-money-string squarespace-spinner".split(
            " "
          ),
      }
    );
  },
  847: function (h, l, f) {
    YUI.add(
      "squarespace-checkout-form-payment",
      function (a) {
        a.namespace("Squarespace.Widgets");
        var e = (a.Squarespace.Widgets.CheckoutFormPayment = a.Base.create(
          "checkoutFormPayment",
          a.Squarespace.Widgets.CheckoutFormAddress,
          [],
          {
            initializer: function () {
              this.get("requiresShipping") ||
                this.set("useAddressForShipping", !0);
            },
            renderUI: function () {
              e.superclass.renderUI.call(this);
              var b = this.get("contentBox");
              this._creditCardInputs = {
                cardNumber: b.one("#card-number input"),
                cardExpiryMonth: b.one("#card-expiry-month select"),
                cardExpiryYear: b.one("#card-expiry-year select"),
                cvc: b.one("#cvc input"),
              };
              this._hiddenInputs = {
                cardHolderName: b.one('input[name="cardHolderName"]'),
                stripeToken: b.one('input[name="stripeToken"]'),
              };
              a.Array.each(
                this.get("optionalHiddenFields"),
                function (c) {
                  var d = b.one('input[name="' + c + '"]');
                  if (a.Lang.isValue(d)) this._hiddenInputs[c] = d;
                  else
                    throw Error(
                      "Optional hidden field input element could not be found."
                    );
                },
                this
              );
              this._toggleLockedFields();
              this._syncBillingFieldsWithCheckbox();
            },
            bindUI: function () {
              e.superclass.bindUI.call(this);
              this.after("inTestModeChange", this._toggleLockedFields, this);
              this.get("requiresShipping") &&
                this.get("contentBox")
                  .one('input[name="billToShipping"]')
                  .after("change", this._syncBillingFieldsWithCheckbox, this);
              this.after(
                "stateChange",
                this._syncBillingFieldsWithCheckbox,
                this
              );
              this._bindLockedToolTip();
            },
            syncUI: function () {
              e.superclass.syncUI.call(this);
            },
            _syncBillingFieldsWithCheckbox: function () {
              var a = this.get("contentBox").one("#billing-address");
              if (this.get("isLinkedToShipping")) {
                var c = this.get("shippingSection").getValues();
                this._updateStateFieldForSelectedCountry(c.shippingCountry);
                this._syncRequiredFieldsForSelectedCountry();
                this.setValues({
                  billingFirstName: c.shippingFirstName,
                  billingLastName: c.shippingLastName,
                  billingAddress1: c.shippingAddress1,
                  billingAddress2: c.shippingAddress2,
                  billingCity: c.shippingCity,
                  billingState: c.shippingState,
                  billingZip: c.shippingZip,
                  billingCountry: c.shippingCountry,
                });
                a.toggleClass("locked", !0);
                a.all("input, select").each(function (a) {
                  a.setAttribute("readonly", !0);
                  a.setAttribute("disabled", "disabled");
                });
              } else
                a.toggleClass("locked", !1),
                  a.all("input, select").each(function (a) {
                    a.removeAttribute("readonly");
                    a.removeAttribute("disabled");
                  }),
                  this.setValues({
                    billingFirstName: "",
                    billingLastName: "",
                    billingAddress1: "",
                    billingAddress2: "",
                    billingCity: "",
                    billingState: "",
                    billingZip: "",
                  });
            },
            setCreditCardValues: function (b) {
              a.Object.each(
                b,
                a.bind(function (a, b) {
                  this._setFieldValue(this._creditCardInputs[b], a);
                }, this)
              );
            },
            getCreditCardValues: function () {
              return this._extractValuesFromFields(this._creditCardInputs);
            },
            setHiddenValues: function (b) {
              a.Object.each(
                b,
                a.bind(function (a, b) {
                  this._setFieldValue(this._hiddenInputs[b], a);
                }, this)
              );
            },
            getValues: function () {
              var a = e.superclass.getValues.call(this);
              this._extractValuesFromFields(this._hiddenInputs);
              if (this.get("isLinkedToShipping")) {
                var c = this.get("shippingSection").getValues();
                a.cardHolderName =
                  c.shippingFirstName + " " + c.shippingLastName;
              } else
                a.cardHolderName = a.billingFirstName + " " + a.billingLastName;
              return a;
            },
            _extractValuesFromFields: function (b) {
              return a.Array.hash(
                a.Object.keys(b),
                a.Array.map(a.Object.values(b), function (a) {
                  return a.get("value");
                })
              );
            },
            getLocationForShipping: function () {
              var a = this.getValues();
              return {
                country: a.billingCountry,
                state: a.billingState,
                zip: a.billingZip,
              };
            },
            _getSelectedCountry: function () {
              return this.get("isLinkedToShipping")
                ? this.get("shippingSection").getValues().shippingCountry
                : this.getValues().billingCountry;
            },
            _onContinue: function () {
              this.fire("continue");
            },
            _populateFieldsFromAc: function (a) {
              this.setValues({
                billingAddress1: a.address,
                billingCountry: a.country,
                billingCity: a.city,
                billingState: a.state,
                billingZip: a.zip,
              });
            },
            _toggleLockedFields: function () {
              var b = this.get("inTestMode"),
                c =
                  this.get("storeState") ==
                  a.Squarespace.StoreStates.NOT_CONNECTED,
                d = this.get("contentBox"),
                k = this._creditCardInputs,
                g = this._creditCardInputs.cardNumber;
              d.one("#credit-card").toggleClass("locked", b || c);
              b || c
                ? (this.setCreditCardValues({
                    cardNumber: "4242424242424242",
                    cardExpiryMonth: "4",
                    cardExpiryYear: new Date().getFullYear() + 1,
                    cvc: "323",
                  }),
                  g.setAttribute("readonly", !0),
                  k.cardExpiryMonth.setAttribute("disabled", "disabled"),
                  k.cardExpiryYear.setAttribute("disabled", "disabled"),
                  k.cvc.setAttribute("readonly", !0))
                : (this.setCreditCardValues({
                    cardNumber: "",
                    cardExpiryMonth: new Date().getMonth(),
                    cardExpiryYear: new Date().getFullYear(),
                    cvc: "",
                  }),
                  g.removeAttribute("readonly"),
                  k.cardExpiryMonth.removeAttribute("disabled"),
                  k.cardExpiryYear.removeAttribute("disabled"),
                  k.cvc.removeAttribute("readonly"));
            },
            _bindLockedToolTip: function () {
              this._creditCardInputs.cardNumber.on(
                "click",
                function () {
                  var b = this.get("contentBox").one("#credit-card");
                  this.get("inTestMode") &&
                    new a.Squarespace.Widgets.Information({
                      "strings.title": "Store Not Live",
                      "strings.message":
                        'This store has not yet gone live. You may try the checkout process and place a test order. We have prefilled a "Test" credit card number for you.',
                      hideAfterTime: 7e3,
                      position:
                        a.Squarespace.Widgets.Confirmation.ANCHOR.ELEMENT,
                      anchor: b,
                    });
                  this.get("storeState") ==
                    a.Squarespace.StoreStates.NOT_CONNECTED &&
                    new a.Squarespace.Widgets.Information({
                      "strings.title": "Payments Not Connected",
                      "strings.message":
                        "A payment gateway is not connected. Checkout will be disabled. Please go to Store Settings to connect Stripe.",
                      hideAfterTime: 7e3,
                      position:
                        a.Squarespace.Widgets.Confirmation.ANCHOR.ELEMENT,
                      anchor: b,
                    });
                },
                this
              );
            },
            updateButton: function (b) {
              b = a.Squarespace.DateUtils.humanizeDuration(1e3 * b);
              this.get("contentBox")
                .one("#place-order-button")
                .setContent("Submitting in " + b + "...")
                .set("disabled", !0);
            },
            showQueueExplanation: function () {
              this.get("contentBox").one(".wait-in-queue-message").show();
            },
            lock: function () {
              this.get("contentBox")
                .one("#place-order-button")
                .setContent(this.get("strings.pendingText"))
                .set("disabled", !0);
            },
            unlock: function () {
              this.get("contentBox")
                .one("#place-order-button")
                .setContent(this.get("strings.submitText"))
                .set("disabled", !1);
            },
          },
          {
            CSS_PREFIX: "sqs-checkout-form-payment",
            HANDLEBARS_TEMPLATE: "checkout-form-payment.html",
            ATTRS: {
              strings: {
                value: {
                  submitText: "Place Order",
                  pendingText: "Placing Order ...",
                },
              },
              optionalHiddenFields: { value: [] },
              isLinkedToShipping: {
                getter: function () {
                  return (
                    this.get("requiresShipping") &&
                    this.get("billToShippingAddress")
                  );
                },
              },
              billToShippingAddress: {
                getter: function () {
                  var b = this.get("contentBox").one(
                    'input[name="billToShipping"]'
                  );
                  return !a.Lang.isValue(b) ? !1 : b.get("checked");
                },
              },
              inTestMode: { validator: a.Squarespace.AttrValidators.isBoolean },
              storeState: { value: null },
              shippingSection: { value: null },
              requiresShipping: { value: !1 },
            },
          }
        ));
      },
      "1.0",
      {
        requires:
          "base node squarespace-attr-validators squarespace-basic-check squarespace-hb-date-options squarespace-checkout-form-section squarespace-checkout-form-payment-template squarespace-widgets-information".split(
            " "
          ),
      }
    );
  },
  848: function (h, l, f) {
    YUI.add(
      "squarespace-hb-date-options",
      function (a) {
        a.Handlebars.registerHelper("month-options", function (e) {
          var b = "";
          a.Array.each(
            "January February March April May June July August September October November December".split(
              " "
            ),
            function (c, d) {
              var k = d + 1,
                g = k.toString();
              1 === g.length && (g = "0" + g);
              a.Lang.isUndefined(e.hash["short"]) && (g += " " + c);
              b += '<option value="' + k + '">' + g + "</option>";
            }
          );
          return new a.Handlebars.SafeString(b);
        });
        a.Handlebars.registerHelper(
          "year-options",
          function (e) {
            e = new Date().getFullYear();
            for (var b = "", c = e; c < e + 10; c++)
              b += '<option value="' + c + '">' + c + "</option>";
            return new a.Handlebars.SafeString(b);
          },
          this
        );
      },
      "1.0",
      { requires: ["handlebars-base"] }
    );
  },
  849: function (h, l, f) {
    YUI.add(
      "squarespace-contribution-summary",
      function (a) {
        a.namespace("Squarespace.Widgets");
        var e = (a.Squarespace.Widgets.ContributionSummary = a.Base.create(
          "ContributionSummary",
          a.Squarespace.Widgets.CheckoutFormSection,
          [],
          {
            _getHBTemplateContext: function () {
              var b = e.superclass._getHBTemplateContext.call(this);
              a.Array.each(b.donatePage.suggestedContributions, function (b) {
                b.amountDollars = a.Squarespace.Commerce.moneyFormat(
                  b.amountCents
                );
              });
              return b;
            },
            bindUI: function () {
              e.superclass.bindUI.call(this);
              var a = this.get("contentBox");
              a.delegate(
                "click",
                function (c) {
                  "other" == c.target.get("value") &&
                    a.one('input[name="contributionAmount"]').select();
                },
                'input[type="radio"]'
              );
            },
            renderUI: function () {
              e.superclass.renderUI.call(this);
              var b = this.get("contentBox");
              b.one('input[name="contributionAmount"]').plug(
                a.Squarespace.Plugin.MoneyFormatter
              );
              var c = this.get("donatePage").suggestedContributions;
              a.Lang.isValue(c) && 0 < c.length
                ? b.one(".prompt").setContent("Select an amount:")
                : b.one(".prompt").setContent("Enter an amount:");
            },
            _getLocalErrors: function () {
              var a = e.superclass._getLocalErrors.call(this);
              return 50 > this.getDonationAmountCents()
                ? [
                    {
                      type: this.getProperty("FIELD_ERROR_TYPES").CUSTOM,
                      message: "You must donate at least 0.50",
                    },
                  ]
                : a;
            },
            getDonationAmountCents: function () {
              var b = this.get("contentBox"),
                c = this.get("donatePage").suggestedContributions;
              return a.Lang.isValue(c) && 0 < c.length
                ? ((c = this._getCheckedRadio()),
                  !a.Lang.isValue(c)
                    ? 0
                    : "other" == c.get("value")
                    ? b
                        .one('input[name="contributionAmount"]')
                        .moneyFormatterPlugin.get("data")
                    : c.get("value"))
                : b
                    .one('input[name="contributionAmount"]')
                    .moneyFormatterPlugin.get("data");
            },
            _getCheckedRadio: function () {
              var a;
              this.get("contentBox")
                .one(".contribution-option-list")
                .all('input[type="radio"]')
                .each(function (c) {
                  c.get("checked") && (a = c);
                });
              return a;
            },
            getValues: function () {
              return {
                donationAmount: a.Squarespace.Commerce.moneyString(
                  this.getDonationAmountCents()
                ),
                title: this.get("donatePage").title,
              };
            },
          },
          {
            CSS_PREFIX: "sqs-contribution-summary",
            HANDLEBARS_TEMPLATE: "contribution-summary.html",
            HANDLEBARS_SAVED_FIELDSET_TEMPLATE:
              "checkout-saved-contribution.html",
            ATTRS: {
              strings: { value: { prompt: null } },
              donatePage: { value: null },
            },
          }
        ));
      },
      "1.0",
      {
        requires:
          "base node squarespace-commerce-utils squarespace-ui-templates squarespace-hb-money-string squarespace-checkout-form-section squarespace-contribution-summary-template squarespace-plugin-money-formatter squarespace-async-form squarespace-checkout-saved-contribution-template".split(
            " "
          ),
      }
    );
  },
  1587: function (h, l, f) {
    YUI.add(
      "overlay",
      function (a, e) {
        a.Overlay = a.Base.create("overlay", a.Widget, [
          a.WidgetStdMod,
          a.WidgetPosition,
          a.WidgetStack,
          a.WidgetPositionAlign,
          a.WidgetPositionConstrain,
        ]);
      },
      "3.17.2",
      {
        requires:
          "widget widget-stdmod widget-position widget-position-align widget-stack widget-position-constrain".split(
            " "
          ),
        skinnable: !0,
      }
    );
  },
  1588: function (h, l, f) {
    YUI.add(
      "widget-stdmod",
      function (a, e) {
        function b(a) {}
        var c = a.Lang,
          d = a.Node,
          k = a.UA,
          g = a.Widget,
          n = a.Widget.UI_SRC;
        b.HEADER = "header";
        b.BODY = "body";
        b.FOOTER = "footer";
        b.AFTER = "after";
        b.BEFORE = "before";
        b.REPLACE = "replace";
        var v = b.HEADER,
          f = b.BODY,
          m = b.FOOTER,
          p = v + "Content",
          q = m + "Content",
          r = f + "Content";
        b.ATTRS = {
          headerContent: { value: null },
          footerContent: { value: null },
          bodyContent: { value: null },
          fillHeight: {
            value: b.BODY,
            validator: function (a) {
              return this._validateFillHeight(a);
            },
          },
        };
        b.HTML_PARSER = {
          headerContent: function (a) {
            return this._parseStdModHTML(v);
          },
          bodyContent: function (a) {
            return this._parseStdModHTML(f);
          },
          footerContent: function (a) {
            return this._parseStdModHTML(m);
          },
        };
        b.SECTION_CLASS_NAMES = {
          header: g.getClassName("hd"),
          body: g.getClassName("bd"),
          footer: g.getClassName("ft"),
        };
        b.TEMPLATES = {
          header: '<div class="' + b.SECTION_CLASS_NAMES[v] + '"></div>',
          body: '<div class="' + b.SECTION_CLASS_NAMES[f] + '"></div>',
          footer: '<div class="' + b.SECTION_CLASS_NAMES[m] + '"></div>',
        };
        b.prototype = {
          initializer: function () {
            this._stdModNode = this.get("contentBox");
            a.before(this._renderUIStdMod, this, "renderUI");
            a.before(this._bindUIStdMod, this, "bindUI");
            a.before(this._syncUIStdMod, this, "syncUI");
          },
          _syncUIStdMod: function () {
            var a = this._stdModParsed;
            (!a || !a[p]) && this._uiSetStdMod(v, this.get(p));
            (!a || !a[r]) && this._uiSetStdMod(f, this.get(r));
            (!a || !a[q]) && this._uiSetStdMod(m, this.get(q));
            this._uiSetFillHeight(this.get("fillHeight"));
          },
          _renderUIStdMod: function () {
            this._stdModNode.addClass(g.getClassName("stdmod"));
            this._renderStdModSections();
            this.after("headerContentChange", this._afterHeaderChange);
            this.after("bodyContentChange", this._afterBodyChange);
            this.after("footerContentChange", this._afterFooterChange);
          },
          _renderStdModSections: function () {
            c.isValue(this.get(p)) && this._renderStdMod(v);
            c.isValue(this.get(r)) && this._renderStdMod(f);
            c.isValue(this.get(q)) && this._renderStdMod(m);
          },
          _bindUIStdMod: function () {
            this.after("fillHeightChange", this._afterFillHeightChange);
            this.after("heightChange", this._fillHeight);
            this.after("contentUpdate", this._fillHeight);
          },
          _afterHeaderChange: function (a) {
            a.src !== n && this._uiSetStdMod(v, a.newVal, a.stdModPosition);
          },
          _afterBodyChange: function (a) {
            a.src !== n && this._uiSetStdMod(f, a.newVal, a.stdModPosition);
          },
          _afterFooterChange: function (a) {
            a.src !== n && this._uiSetStdMod(m, a.newVal, a.stdModPosition);
          },
          _afterFillHeightChange: function (a) {
            this._uiSetFillHeight(a.newVal);
          },
          _validateFillHeight: function (a) {
            return !a || a == b.BODY || a == b.HEADER || a == b.FOOTER;
          },
          _uiSetFillHeight: function (a) {
            a = this.getStdModNode(a);
            var b = this._currFillNode;
            b && a !== b && b.setStyle("height", "");
            a && (this._currFillNode = a);
            this._fillHeight();
          },
          _fillHeight: function () {
            if (this.get("fillHeight")) {
              var a = this.get("height");
              "" != a &&
                "auto" != a &&
                this.fillHeight(this.getStdModNode(this.get("fillHeight")));
            }
          },
          _uiSetStdMod: function (a, b, d) {
            if (c.isValue(b)) {
              var g = this.getStdModNode(a, !0);
              this._addStdModContent(g, b, d);
              this.set(a + "Content", this._getStdModContent(a), { src: n });
            } else this._eraseStdMod(a);
            this.fire("contentUpdate");
          },
          _renderStdMod: function (a) {
            var b = this.get("contentBox"),
              c = this._findStdModSection(a);
            c || (c = this._getStdModTemplate(a));
            this._insertStdModSection(b, a, c);
            this[a + "Node"] = c;
            return this[a + "Node"];
          },
          _eraseStdMod: function (a) {
            var b = this.getStdModNode(a);
            b && (b.remove(!0), delete this[a + "Node"]);
          },
          _insertStdModSection: function (a, b, c) {
            var d = a.get("firstChild");
            b === m || !d
              ? a.appendChild(c)
              : b === v
              ? a.insertBefore(c, d)
              : (b = this[m + "Node"])
              ? a.insertBefore(c, b)
              : a.appendChild(c);
          },
          _getStdModTemplate: function (a) {
            return d.create(
              b.TEMPLATES[a],
              this._stdModNode.get("ownerDocument")
            );
          },
          _addStdModContent: function (a, c, d) {
            switch (d) {
              case b.BEFORE:
                d = 0;
                break;
              case b.AFTER:
                d = void 0;
                break;
              default:
                d = b.REPLACE;
            }
            a.insert(c, d);
          },
          _getPreciseHeight: function (a) {
            var b = a ? a.get("offsetHeight") : 0;
            a &&
              a.hasMethod("getBoundingClientRect") &&
              (a = a.invoke("getBoundingClientRect")) &&
              (b = a.bottom - a.top);
            return b;
          },
          _findStdModSection: function (a) {
            return this.get("contentBox").one("> ." + b.SECTION_CLASS_NAMES[a]);
          },
          _parseStdModHTML: function (b) {
            var c = this._findStdModSection(b);
            return c
              ? (this._stdModParsed ||
                  ((this._stdModParsed = {}),
                  a.before(
                    this._applyStdModParsedConfig,
                    this,
                    "_applyParsedConfig"
                  )),
                (this._stdModParsed[b + "Content"] = 1),
                c.get("innerHTML"))
              : null;
          },
          _applyStdModParsedConfig: function (a, b, c) {
            if ((a = this._stdModParsed))
              (a[p] = !(p in b) && p in a),
                (a[r] = !(r in b) && r in a),
                (a[q] = !(q in b) && q in a);
          },
          _getStdModContent: function (a) {
            return this[a + "Node"] ? this[a + "Node"].get("childNodes") : null;
          },
          setStdModContent: function (a, b, c) {
            this.set(a + "Content", b, { stdModPosition: c });
          },
          getStdModNode: function (a, b) {
            var c = this[a + "Node"] || null;
            !c && b && (c = this._renderStdMod(a));
            return c;
          },
          fillHeight: function (a) {
            if (a) {
              var b = this.get("contentBox"),
                d = [this.headerNode, this.bodyNode, this.footerNode],
                g,
                e = 0;
              g = 0;
              for (var n = !1, v = 0, f = d.length; v < f; v++)
                (g = d[v]) &&
                  (g !== a ? (e += this._getPreciseHeight(g)) : (n = !0));
              n &&
                ((k.ie || k.opera) && a.set("offsetHeight", 0),
                (b =
                  b.get("offsetHeight") -
                  parseInt(b.getComputedStyle("paddingTop"), 10) -
                  parseInt(b.getComputedStyle("paddingBottom"), 10) -
                  parseInt(b.getComputedStyle("borderBottomWidth"), 10) -
                  parseInt(b.getComputedStyle("borderTopWidth"), 10)),
                c.isNumber(b) &&
                  ((g = b - e), 0 <= g && a.set("offsetHeight", g)));
            }
          },
        };
        a.WidgetStdMod = b;
      },
      "3.17.2",
      { requires: ["base-build", "widget"] }
    );
  },
  1591: function (h, l, f) {
    YUI.add(
      "widget-stack",
      function (a, e) {
        function b(a) {}
        var c = a.Lang,
          d = a.UA,
          k = a.Node,
          g = a.Widget;
        b.ATTRS = {
          shim: { value: 6 == d.ie },
          zIndex: { value: 0, setter: "_setZIndex" },
        };
        b.HTML_PARSER = {
          zIndex: function (a) {
            return this._parseZIndex(a);
          },
        };
        b.SHIM_CLASS_NAME = g.getClassName("shim");
        b.STACKED_CLASS_NAME = g.getClassName("stacked");
        b.SHIM_TEMPLATE =
          '<iframe class="' +
          b.SHIM_CLASS_NAME +
          '" frameborder="0" title="Widget Stacking Shim" src="javascript:false" tabindex="-1" role="presentation"></iframe>';
        b.prototype = {
          initializer: function () {
            this._stackNode = this.get("boundingBox");
            this._stackHandles = {};
            a.after(this._renderUIStack, this, "renderUI");
            a.after(this._syncUIStack, this, "syncUI");
            a.after(this._bindUIStack, this, "bindUI");
          },
          _syncUIStack: function () {
            this._uiSetShim(this.get("shim"));
            this._uiSetZIndex(this.get("zIndex"));
          },
          _bindUIStack: function () {
            this.after("shimChange", this._afterShimChange);
            this.after("zIndexChange", this._afterZIndexChange);
          },
          _renderUIStack: function () {
            this._stackNode.addClass(b.STACKED_CLASS_NAME);
          },
          _parseZIndex: function (a) {
            a =
              !a.inDoc() || "static" === a.getStyle("position")
                ? "auto"
                : a.getComputedStyle("zIndex");
            return "auto" === a ? null : a;
          },
          _setZIndex: function (a) {
            c.isString(a) && (a = parseInt(a, 10));
            c.isNumber(a) || (a = 0);
            return a;
          },
          _afterShimChange: function (a) {
            this._uiSetShim(a.newVal);
          },
          _afterZIndexChange: function (a) {
            this._uiSetZIndex(a.newVal);
          },
          _uiSetZIndex: function (a) {
            this._stackNode.setStyle("zIndex", a);
          },
          _uiSetShim: function (a) {
            a
              ? (this.get("visible")
                  ? this._renderShim()
                  : this._renderShimDeferred(),
                6 == d.ie && this._addShimResizeHandlers())
              : this._destroyShim();
          },
          _renderShimDeferred: function () {
            this._stackHandles.shimdeferred =
              this._stackHandles.shimdeferred || [];
            this._stackHandles.shimdeferred.push(
              this.on("visibleChange", function (a) {
                a.newVal && this._renderShim();
              })
            );
          },
          _addShimResizeHandlers: function () {
            this._stackHandles.shimresize = this._stackHandles.shimresize || [];
            var a = this.sizeShim,
              b = this._stackHandles.shimresize;
            b.push(this.after("visibleChange", a));
            b.push(this.after("widthChange", a));
            b.push(this.after("heightChange", a));
            b.push(this.after("contentUpdate", a));
          },
          _detachStackHandles: function (a) {
            a = this._stackHandles[a];
            var b;
            if (a && 0 < a.length) for (; (b = a.pop()); ) b.detach();
          },
          _renderShim: function () {
            var a = this._shimNode,
              b = this._stackNode;
            a ||
              ((a = this._shimNode = this._getShimTemplate()),
              b.insertBefore(a, b.get("firstChild")),
              this._detachStackHandles("shimdeferred"),
              this.sizeShim());
          },
          _destroyShim: function () {
            this._shimNode &&
              (this._shimNode.get("parentNode").removeChild(this._shimNode),
              (this._shimNode = null),
              this._detachStackHandles("shimdeferred"),
              this._detachStackHandles("shimresize"));
          },
          sizeShim: function () {
            var a = this._shimNode,
              b = this._stackNode;
            a &&
              6 === d.ie &&
              this.get("visible") &&
              (a.setStyle("width", b.get("offsetWidth") + "px"),
              a.setStyle("height", b.get("offsetHeight") + "px"));
          },
          _getShimTemplate: function () {
            return k.create(
              b.SHIM_TEMPLATE,
              this._stackNode.get("ownerDocument")
            );
          },
        };
        a.WidgetStack = b;
      },
      "3.17.2",
      { requires: ["base-build", "widget"], skinnable: !0 }
    );
  },
  1592: function (h, l, f) {
    YUI.add(
      "widget-position-constrain",
      function (a, e) {
        function b(a) {}
        var c = a.Node,
          d;
        b.ATTRS = {
          constrain: { value: null, setter: "_setConstrain" },
          preventOverlap: { value: !1 },
        };
        d = b._PREVENT_OVERLAP = {
          x: { tltr: 1, blbr: 1, brbl: 1, trtl: 1 },
          y: { trbr: 1, tlbl: 1, bltl: 1, brtr: 1 },
        };
        b.prototype = {
          initializer: function () {
            this._posNode ||
              a.error(
                "WidgetPosition needs to be added to the Widget, before WidgetPositionConstrain is added"
              );
            a.after(this._bindUIPosConstrained, this, "bindUI");
          },
          getConstrainedXY: function (a, b) {
            b = b || this.get("constrain");
            var c = this._getRegion(!0 === b ? null : b),
              d = this._posNode.get("region");
            return [
              this._constrain(a[0], "x", d, c),
              this._constrain(a[1], "y", d, c),
            ];
          },
          constrain: function (a, b) {
            var c, d;
            if ((d = b || this.get("constrain")))
              (c = a || this.get("xy")),
                (d = this.getConstrainedXY(c, d)),
                (d[0] !== c[0] || d[1] !== c[1]) &&
                  this.set("xy", d, { constrained: !0 });
          },
          _setConstrain: function (a) {
            return !0 === a ? a : c.one(a);
          },
          _constrain: function (a, b, c, d) {
            if (d) {
              this.get("preventOverlap") &&
                (a = this._preventOverlap(a, b, c, d));
              var e = "x" == b;
              b = e ? d.width : d.height;
              c = e ? c.width : c.height;
              var f = e ? d.left : d.top;
              d = e ? d.right - c : d.bottom - c;
              if (a < f || a > d)
                c < b ? (a < f ? (a = f) : a > d && (a = d)) : (a = f);
            }
            return a;
          },
          _preventOverlap: function (a, b, c, e) {
            var f = this.get("align"),
              m = "x" === b,
              p,
              q,
              r,
              h,
              l;
            if (f && f.points && d[b][f.points.join("")]) {
              if ((b = this._getRegion(f.node)))
                (p = m ? c.width : c.height),
                  (q = m ? b.left : b.top),
                  (r = m ? b.right : b.bottom),
                  (h = m ? b.left - e.left : b.top - e.top),
                  (l = m ? e.right - b.right : e.bottom - b.bottom);
              a > q ? l < p && h > p && (a = q - p) : h < p && l > p && (a = r);
            }
            return a;
          },
          _bindUIPosConstrained: function () {
            this.after("constrainChange", this._afterConstrainChange);
            this._enableConstraints(this.get("constrain"));
          },
          _afterConstrainChange: function (a) {
            this._enableConstraints(a.newVal);
          },
          _enableConstraints: function (a) {
            a
              ? (this.constrain(),
                (this._cxyHandle =
                  this._cxyHandle ||
                  this.on("constrain|xyChange", this._constrainOnXYChange)))
              : this._cxyHandle &&
                (this._cxyHandle.detach(), (this._cxyHandle = null));
          },
          _constrainOnXYChange: function (a) {
            a.constrained || (a.newVal = this.getConstrainedXY(a.newVal));
          },
          _getRegion: function (a) {
            var b;
            a
              ? (a = c.one(a)) && (b = a.get("region"))
              : (b = this._posNode.get("viewportRegion"));
            return b;
          },
        };
        a.WidgetPositionConstrain = b;
      },
      "3.17.2",
      { requires: ["widget-position"] }
    );
  },
  1622: function (h, l, f) {
    YUI.add(
      "autocomplete-sources",
      function (a, e) {
        var b = a.AutoCompleteBase,
          c = a.Lang,
          d = "_sourceSuccess",
          k = "maxResults";
        a.mix(b.prototype, {
          _YQL_SOURCE_REGEX: /^(?:select|set|use)\s+/i,
          _beforeCreateObjectSource: function (b) {
            return b instanceof a.Node &&
              "select" === b.get("nodeName").toLowerCase()
              ? this._createSelectSource(b)
              : a.JSONPRequest && b instanceof a.JSONPRequest
              ? this._createJSONPSource(b)
              : this._createObjectSource(b);
          },
          _createIOSource: function (b) {
            function c(k) {
              var n = k.request;
              if (e._cache && n in e._cache) e[d](e._cache[n], k);
              else
                f && f.isInProgress() && f.abort(),
                  (f = a.io(e._getXHRUrl(b, k), {
                    on: {
                      success: function (b, c) {
                        var g;
                        try {
                          g = a.JSON.parse(c.responseText);
                        } catch (f) {
                          a.error("JSON parse error", f);
                        }
                        g && (e._cache && (e._cache[n] = g), e[d](g, k));
                      },
                    },
                  }));
            }
            var k = { type: "io" },
              e = this,
              f,
              p,
              q;
            k.sendRequest = function (b) {
              p = b;
              q ||
                ((q = !0),
                a.use("io-base", "json-parse", function () {
                  k.sendRequest = c;
                  c(p);
                }));
            };
            return k;
          },
          _createJSONPSource: function (b) {
            function c(a) {
              var k = a.request,
                f = a.query;
              if (e._cache && k in e._cache) e[d](e._cache[k], a);
              else
                (b._config.on.success = function (b) {
                  e._cache && (e._cache[k] = b);
                  e[d](b, a);
                }),
                  b.send(f);
            }
            var k = { type: "jsonp" },
              e = this,
              f,
              p;
            k.sendRequest = function (d) {
              f = d;
              p ||
                ((p = !0),
                a.use("jsonp", function () {
                  b instanceof a.JSONPRequest ||
                    (b = new a.JSONPRequest(b, {
                      format: a.bind(e._jsonpFormatter, e),
                    }));
                  k.sendRequest = c;
                  c(f);
                }));
            };
            return k;
          },
          _createSelectSource: function (a) {
            var b = this;
            return {
              type: "select",
              sendRequest: function (c) {
                var k = [];
                a.get("options").each(function (a) {
                  k.push({
                    html: a.get("innerHTML"),
                    index: a.get("index"),
                    node: a,
                    selected: a.get("selected"),
                    text: a.get("text"),
                    value: a.get("value"),
                  });
                });
                b[d](k, c);
              },
            };
          },
          _createStringSource: function (a) {
            return this._YQL_SOURCE_REGEX.test(a)
              ? this._createYQLSource(a)
              : -1 !== a.indexOf("{callback}")
              ? this._createJSONPSource(a)
              : this._createIOSource(a);
          },
          _createYQLSource: function (b) {
            function e(n) {
              var m = n.query,
                p = f.get("yqlEnv"),
                h = f.get(k),
                w;
              w = c.sub(b, {
                maxResults: 0 < h ? h : 1e3,
                request: n.request,
                query: m,
              });
              if (f._cache && w in f._cache) f[d](f._cache[w], n);
              else
                (m = function (a) {
                  f._cache && (f._cache[w] = a);
                  f[d](a, n);
                }),
                  (h = { proto: f.get("yqlProtocol") }),
                  q
                    ? ((q._callback = m),
                      (q._opts = h),
                      (q._params.q = w),
                      p && (q._params.env = p))
                    : (q = new a.YQLRequest(
                        w,
                        { on: { success: m }, allowCache: !1 },
                        p ? { env: p } : null,
                        h
                      )),
                  q.send();
            }
            var f = this,
              h = { type: "yql" },
              m,
              p,
              q;
            f.get("resultListLocator") ||
              f.set("resultListLocator", f._defaultYQLLocator);
            h.sendRequest = function (b) {
              m = b;
              p ||
                ((p = !0),
                a.use("yql", function () {
                  h.sendRequest = e;
                  e(m);
                }));
            };
            return h;
          },
          _defaultYQLLocator: function (b) {
            (b = b && b.query && b.query.results) && c.isObject(b)
              ? ((b = a.Object.values(b) || []),
                (b = 1 === b.length ? b[0] : b),
                c.isArray(b) || (b = [b]))
              : (b = []);
            return b;
          },
          _getXHRUrl: function (a, b) {
            var d = this.get(k);
            b.query !== b.request && (a += b.request);
            return c.sub(a, {
              maxResults: 0 < d ? d : 1e3,
              query: encodeURIComponent(b.query),
            });
          },
          _jsonpFormatter: function (a, b, d) {
            var e = this.get(k),
              f = this.get("requestTemplate");
            f && (a += f(d));
            return c.sub(a, {
              callback: b,
              maxResults: 0 < e ? e : 1e3,
              query: encodeURIComponent(d),
            });
          },
        });
        a.mix(b.ATTRS, {
          yqlEnv: { value: null },
          yqlProtocol: { value: "http" },
        });
        a.mix(
          b.SOURCE_TYPES,
          {
            io: "_createIOSource",
            jsonp: "_createJSONPSource",
            object: "_beforeCreateObjectSource",
            select: "_createSelectSource",
            string: "_createStringSource",
            yql: "_createYQLSource",
          },
          !0
        );
      },
      "3.17.2",
      {
        optional: ["io-base", "json-parse", "jsonp", "yql"],
        requires: ["autocomplete-base"],
      }
    );
  },
  1624: function (h, l, f) {
    YUI.add(
      "text-wordbreak",
      function (a, e) {
        var b = a.Text,
          c = b.Data.WordBreak,
          d = [
            RegExp(c.aletter),
            RegExp(c.midnumlet),
            RegExp(c.midletter),
            RegExp(c.midnum),
            RegExp(c.numeric),
            RegExp(c.cr),
            RegExp(c.lf),
            RegExp(c.newline),
            RegExp(c.extend),
            RegExp(c.format),
            RegExp(c.katakana),
            RegExp(c.extendnumlet),
          ],
          k = RegExp("^" + c.punctuation + "$"),
          g = /\s/,
          f = {
            getWords: function (a, b) {
              var c = 0,
                d = f._classify(a),
                e = d.length,
                h = [],
                l = [],
                u,
                x,
                B;
              b || (b = {});
              b.ignoreCase && (a = a.toLowerCase());
              x = b.includePunctuation;
              for (B = b.includeWhitespace; c < e; ++c)
                (u = a.charAt(c)),
                  h.push(u),
                  f._isWordBoundary(d, c) &&
                    ((h = h.join("")) &&
                      (B || !g.test(h)) &&
                      (x || !k.test(h)) &&
                      l.push(h),
                    (h = []));
              return l;
            },
            getUniqueWords: function (b, c) {
              return a.Array.unique(f.getWords(b, c));
            },
            isWordBoundary: function (a, b) {
              return f._isWordBoundary(f._classify(a), b);
            },
            _classify: function (a) {
              for (
                var b, c = [], e = 0, k, g, f = a.length, n = d.length, h;
                e < f;
                ++e
              ) {
                b = a.charAt(e);
                h = 12;
                for (k = 0; k < n; ++k)
                  if ((g = d[k]) && g.test(b)) {
                    h = k;
                    break;
                  }
                c.push(h);
              }
              return c;
            },
            _isWordBoundary: function (a, b) {
              var c,
                d = a[b],
                e = a[b + 1],
                k;
              if (
                0 > b ||
                (b > a.length - 1 && 0 !== b) ||
                (0 === d && 0 === e)
              )
                return !1;
              k = a[b + 2];
              if (0 === d && (2 === e || 1 === e) && 0 === k) return !1;
              c = a[b - 1];
              return ((2 === d || 1 === d) && 0 === e && 0 === c) ||
                ((4 === d || 0 === d) && (4 === e || 0 === e)) ||
                ((3 === d || 1 === d) && 4 === e && 4 === c) ||
                (4 === d && (3 === e || 1 === e) && 4 === k) ||
                8 === d ||
                9 === d ||
                8 === c ||
                9 === c ||
                8 === e ||
                9 === e ||
                (5 === d && 6 === e)
                ? !1
                : 7 === d || 5 === d || 6 === d || 7 === e || 5 === e || 6 === e
                ? !0
                : (10 === d && 10 === e) ||
                  (11 === e && (0 === d || 4 === d || 10 === d || 11 === d)) ||
                  (11 === d && (0 === e || 4 === e || 10 === e))
                ? !1
                : !0;
            },
          };
        b.WordBreak = f;
      },
      "3.17.2",
      { requires: ["array-extras", "text-data-wordbreak"] }
    );
  },
  1625: function (h, l, f) {
    YUI.add(
      "text-data-wordbreak",
      function (a, e) {
        a.namespace("Text.Data").WordBreak = {
          aletter:
            "[A-Za-z\u00aa\u00b5\u00ba\u00c0-\u00d6\u00d8-\u00f6\u00f8-\u02c1\u02c6-\u02d1\u02e0-\u02e4\u02ec\u02ee\u0370-\u0374\u0376\u0377\u037a-\u037d\u0386\u0388-\u038a\u038c\u038e-\u03a1\u03a3-\u03f5\u03f7-\u0481\u048a-\u0527\u0531-\u0556\u0559\u0561-\u0587\u05d0-\u05ea\u05f0-\u05f3\u0620-\u064a\u066e\u066f\u0671-\u06d3\u06d5\u06e5\u06e6\u06ee\u06ef\u06fa-\u06fc\u06ff\u0710\u0712-\u072f\u074d-\u07a5\u07b1\u07ca-\u07ea\u07f4\u07f5\u07fa\u0800-\u0815\u081a\u0824\u0828\u0840-\u0858\u0904-\u0939\u093d\u0950\u0958-\u0961\u0971-\u0977\u0979-\u097f\u0985-\u098c\u098f\u0990\u0993-\u09a8\u09aa-\u09b0\u09b2\u09b6-\u09b9\u09bd\u09ce\u09dc\u09dd\u09df-\u09e1\u09f0\u09f1\u0a05-\u0a0a\u0a0f\u0a10\u0a13-\u0a28\u0a2a-\u0a30\u0a32\u0a33\u0a35\u0a36\u0a38\u0a39\u0a59-\u0a5c\u0a5e\u0a72-\u0a74\u0a85-\u0a8d\u0a8f-\u0a91\u0a93-\u0aa8\u0aaa-\u0ab0\u0ab2\u0ab3\u0ab5-\u0ab9\u0abd\u0ad0\u0ae0\u0ae1\u0b05-\u0b0c\u0b0f\u0b10\u0b13-\u0b28\u0b2a-\u0b30\u0b32\u0b33\u0b35-\u0b39\u0b3d\u0b5c\u0b5d\u0b5f-\u0b61\u0b71\u0b83\u0b85-\u0b8a\u0b8e-\u0b90\u0b92-\u0b95\u0b99\u0b9a\u0b9c\u0b9e\u0b9f\u0ba3\u0ba4\u0ba8-\u0baa\u0bae-\u0bb9\u0bd0\u0c05-\u0c0c\u0c0e-\u0c10\u0c12-\u0c28\u0c2a-\u0c33\u0c35-\u0c39\u0c3d\u0c58\u0c59\u0c60\u0c61\u0c85-\u0c8c\u0c8e-\u0c90\u0c92-\u0ca8\u0caa-\u0cb3\u0cb5-\u0cb9\u0cbd\u0cde\u0ce0\u0ce1\u0cf1\u0cf2\u0d05-\u0d0c\u0d0e-\u0d10\u0d12-\u0d3a\u0d3d\u0d4e\u0d60\u0d61\u0d7a-\u0d7f\u0d85-\u0d96\u0d9a-\u0db1\u0db3-\u0dbb\u0dbd\u0dc0-\u0dc6\u0f00\u0f40-\u0f47\u0f49-\u0f6c\u0f88-\u0f8c\u10a0-\u10c5\u10d0-\u10fa\u10fc\u1100-\u1248\u124a-\u124d\u1250-\u1256\u1258\u125a-\u125d\u1260-\u1288\u128a-\u128d\u1290-\u12b0\u12b2-\u12b5\u12b8-\u12be\u12c0\u12c2-\u12c5\u12c8-\u12d6\u12d8-\u1310\u1312-\u1315\u1318-\u135a\u1380-\u138f\u13a0-\u13f4\u1401-\u166c\u166f-\u167f\u1681-\u169a\u16a0-\u16ea\u16ee-\u16f0\u1700-\u170c\u170e-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176c\u176e-\u1770\u1820-\u1877\u1880-\u18a8\u18aa\u18b0-\u18f5\u1900-\u191c\u1a00-\u1a16\u1b05-\u1b33\u1b45-\u1b4b\u1b83-\u1ba0\u1bae\u1baf\u1bc0-\u1be5\u1c00-\u1c23\u1c4d-\u1c4f\u1c5a-\u1c7d\u1ce9-\u1cec\u1cee-\u1cf1\u1d00-\u1dbf\u1e00-\u1f15\u1f18-\u1f1d\u1f20-\u1f45\u1f48-\u1f4d\u1f50-\u1f57\u1f59\u1f5b\u1f5d\u1f5f-\u1f7d\u1f80-\u1fb4\u1fb6-\u1fbc\u1fbe\u1fc2-\u1fc4\u1fc6-\u1fcc\u1fd0-\u1fd3\u1fd6-\u1fdb\u1fe0-\u1fec\u1ff2-\u1ff4\u1ff6-\u1ffc\u2071\u207f\u2090-\u209c\u2102\u2107\u210a-\u2113\u2115\u2119-\u211d\u2124\u2126\u2128\u212a-\u212d\u212f-\u2139\u213c-\u213f\u2145-\u2149\u214e\u2160-\u2188\u24b6-\u24e9\u2c00-\u2c2e\u2c30-\u2c5e\u2c60-\u2ce4\u2ceb-\u2cee\u2d00-\u2d25\u2d30-\u2d65\u2d6f\u2d80-\u2d96\u2da0-\u2da6\u2da8-\u2dae\u2db0-\u2db6\u2db8-\u2dbe\u2dc0-\u2dc6\u2dc8-\u2dce\u2dd0-\u2dd6\u2dd8-\u2dde\u2e2f\u3005\u303b\u303c\u3105-\u312d\u3131-\u318e\u31a0-\u31ba\ua000-\ua48c\ua4d0-\ua4fd\ua500-\ua60c\ua610-\ua61f\ua62a\ua62b\ua640-\ua66e\ua67f-\ua697\ua6a0-\ua6ef\ua717-\ua71f\ua722-\ua788\ua78b-\ua78e\ua790\ua791\ua7a0-\ua7a9\ua7fa-\ua801\ua803-\ua805\ua807-\ua80a\ua80c-\ua822\ua840-\ua873\ua882-\ua8b3\ua8f2-\ua8f7\ua8fb\ua90a-\ua925\ua930-\ua946\ua960-\ua97c\ua984-\ua9b2\ua9cf\uaa00-\uaa28\uaa40-\uaa42\uaa44-\uaa4b\uab01-\uab06\uab09-\uab0e\uab11-\uab16\uab20-\uab26\uab28-\uab2e\uabc0-\uabe2\uac00-\ud7a3\ud7b0-\ud7c6\ud7cb-\ud7fb\ufb00-\ufb06\ufb13-\ufb17\ufb1d\ufb1f-\ufb28\ufb2a-\ufb36\ufb38-\ufb3c\ufb3e\ufb40\ufb41\ufb43\ufb44\ufb46-\ufbb1\ufbd3-\ufd3d\ufd50-\ufd8f\ufd92-\ufdc7\ufdf0-\ufdfb\ufe70-\ufe74\ufe76-\ufefc\uff21-\uff3a\uff41-\uff5a\uffa0-\uffbe\uffc2-\uffc7\uffca-\uffcf\uffd2-\uffd7\uffda-\uffdc]",
          midnumlet: "['\\.\u2018\u2019\u2024\ufe52\uff07\uff0e]",
          midletter: "[:\u00b7\u00b7\u05f4\u2027\ufe13\ufe55\uff1a]",
          midnum:
            "[,;;\u0589\u060c\u060d\u066c\u07f8\u2044\ufe10\ufe14\ufe50\ufe54\uff0c\uff1b]",
          numeric:
            "[0-9\u0660-\u0669\u066b\u06f0-\u06f9\u07c0-\u07c9\u0966-\u096f\u09e6-\u09ef\u0a66-\u0a6f\u0ae6-\u0aef\u0b66-\u0b6f\u0be6-\u0bef\u0c66-\u0c6f\u0ce6-\u0cef\u0d66-\u0d6f\u0e50-\u0e59\u0ed0-\u0ed9\u0f20-\u0f29\u1040-\u1049\u1090-\u1099\u17e0-\u17e9\u1810-\u1819\u1946-\u194f\u19d0-\u19d9\u1a80-\u1a89\u1a90-\u1a99\u1b50-\u1b59\u1bb0-\u1bb9\u1c40-\u1c49\u1c50-\u1c59\ua620-\ua629\ua8d0-\ua8d9\ua900-\ua909\ua9d0-\ua9d9\uaa50-\uaa59\uabf0-\uabf9]",
          cr: "\\r",
          lf: "\\n",
          newline: "[\x0B\f\u0085\u2028\u2029]",
          extend:
            "[\u0300-\u036f\u0483-\u0489\u0591-\u05bd\u05bf\u05c1\u05c2\u05c4\u05c5\u05c7\u0610-\u061a\u064b-\u065f\u0670\u06d6-\u06dc\u06df-\u06e4\u06e7\u06e8\u06ea-\u06ed\u0711\u0730-\u074a\u07a6-\u07b0\u07eb-\u07f3\u0816-\u0819\u081b-\u0823\u0825-\u0827\u0829-\u082d\u0859-\u085b\u0900-\u0903\u093a-\u093c\u093e-\u094f\u0951-\u0957\u0962\u0963\u0981-\u0983\u09bc\u09be-\u09c4\u09c7\u09c8\u09cb-\u09cd\u09d7\u09e2\u09e3\u0a01-\u0a03\u0a3c\u0a3e-\u0a42\u0a47\u0a48\u0a4b-\u0a4d\u0a51\u0a70\u0a71\u0a75\u0a81-\u0a83\u0abc\u0abe-\u0ac5\u0ac7-\u0ac9\u0acb-\u0acd\u0ae2\u0ae3\u0b01-\u0b03\u0b3c\u0b3e-\u0b44\u0b47\u0b48\u0b4b-\u0b4d\u0b56\u0b57\u0b62\u0b63\u0b82\u0bbe-\u0bc2\u0bc6-\u0bc8\u0bca-\u0bcd\u0bd7\u0c01-\u0c03\u0c3e-\u0c44\u0c46-\u0c48\u0c4a-\u0c4d\u0c55\u0c56\u0c62\u0c63\u0c82\u0c83\u0cbc\u0cbe-\u0cc4\u0cc6-\u0cc8\u0cca-\u0ccd\u0cd5\u0cd6\u0ce2\u0ce3\u0d02\u0d03\u0d3e-\u0d44\u0d46-\u0d48\u0d4a-\u0d4d\u0d57\u0d62\u0d63\u0d82\u0d83\u0dca\u0dcf-\u0dd4\u0dd6\u0dd8-\u0ddf\u0df2\u0df3\u0e31\u0e34-\u0e3a\u0e47-\u0e4e\u0eb1\u0eb4-\u0eb9\u0ebb\u0ebc\u0ec8-\u0ecd\u0f18\u0f19\u0f35\u0f37\u0f39\u0f3e\u0f3f\u0f71-\u0f84\u0f86\u0f87\u0f8d-\u0f97\u0f99-\u0fbc\u0fc6\u102b-\u103e\u1056-\u1059\u105e-\u1060\u1062-\u1064\u1067-\u106d\u1071-\u1074\u1082-\u108d\u108f\u109a-\u109d\u135d-\u135f\u1712-\u1714\u1732-\u1734\u1752\u1753\u1772\u1773\u17b6-\u17d3\u17dd\u180b-\u180d\u18a9\u1920-\u192b\u1930-\u193b\u19b0-\u19c0\u19c8\u19c9\u1a17-\u1a1b\u1a55-\u1a5e\u1a60-\u1a7c\u1a7f\u1b00-\u1b04\u1b34-\u1b44\u1b6b-\u1b73\u1b80-\u1b82\u1ba1-\u1baa\u1be6-\u1bf3\u1c24-\u1c37\u1cd0-\u1cd2\u1cd4-\u1ce8\u1ced\u1cf2\u1dc0-\u1de6\u1dfc-\u1dff\u200c\u200d\u20d0-\u20f0\u2cef-\u2cf1\u2d7f\u2de0-\u2dff\u302a-\u302f\u3099\u309a\ua66f-\ua672\ua67c\ua67d\ua6f0\ua6f1\ua802\ua806\ua80b\ua823-\ua827\ua880\ua881\ua8b4-\ua8c4\ua8e0-\ua8f1\ua926-\ua92d\ua947-\ua953\ua980-\ua983\ua9b3-\ua9c0\uaa29-\uaa36\uaa43\uaa4c\uaa4d\uaa7b\uaab0\uaab2-\uaab4\uaab7\uaab8\uaabe\uaabf\uaac1\uabe3-\uabea\uabec\uabed\ufb1e\ufe00-\ufe0f\ufe20-\ufe26\uff9e\uff9f]",
          format:
            "[\u00ad\u0600-\u0603\u06dd\u070f\u17b4\u17b5\u200e\u200f\u202a-\u202e\u2060-\u2064\u206a-\u206f\ufeff\ufff9-\ufffb]",
          katakana:
            "[\u3031-\u3035\u309b\u309c\u30a0-\u30fa\u30fc-\u30ff\u31f0-\u31ff\u32d0-\u32fe\u3300-\u3357\uff66-\uff9d]",
          extendnumlet: "[_\u203f\u2040\u2054\ufe33\ufe34\ufe4d-\ufe4f\uff3f]",
          punctuation:
            "[!-#%-*,-\\/:;?@\\[-\\]_{}\u00a1\u00ab\u00b7\u00bb\u00bf;\u00b7\u055a-\u055f\u0589\u058a\u05be\u05c0\u05c3\u05c6\u05f3\u05f4\u0609\u060a\u060c\u060d\u061b\u061e\u061f\u066a-\u066d\u06d4\u0700-\u070d\u07f7-\u07f9\u0830-\u083e\u085e\u0964\u0965\u0970\u0df4\u0e4f\u0e5a\u0e5b\u0f04-\u0f12\u0f3a-\u0f3d\u0f85\u0fd0-\u0fd4\u0fd9\u0fda\u104a-\u104f\u10fb\u1361-\u1368\u1400\u166d\u166e\u169b\u169c\u16eb-\u16ed\u1735\u1736\u17d4-\u17d6\u17d8-\u17da\u1800-\u180a\u1944\u1945\u1a1e\u1a1f\u1aa0-\u1aa6\u1aa8-\u1aad\u1b5a-\u1b60\u1bfc-\u1bff\u1c3b-\u1c3f\u1c7e\u1c7f\u1cd3\u2010-\u2027\u2030-\u2043\u2045-\u2051\u2053-\u205e\u207d\u207e\u208d\u208e\u3008\u3009\u2768-\u2775\u27c5\u27c6\u27e6-\u27ef\u2983-\u2998\u29d8-\u29db\u29fc\u29fd\u2cf9-\u2cfc\u2cfe\u2cff\u2d70\u2e00-\u2e2e\u2e30\u2e31\u3001-\u3003\u3008-\u3011\u3014-\u301f\u3030\u303d\u30a0\u30fb\ua4fe\ua4ff\ua60d-\ua60f\ua673\ua67e\ua6f2-\ua6f7\ua874-\ua877\ua8ce\ua8cf\ua8f8-\ua8fa\ua92e\ua92f\ua95f\ua9c1-\ua9cd\ua9de\ua9df\uaa5c-\uaa5f\uaade\uaadf\uabeb\ufd3e\ufd3f\ufe10-\ufe19\ufe30-\ufe52\ufe54-\ufe61\ufe63\ufe68\ufe6a\ufe6b\uff01-\uff03\uff05-\uff0a\uff0c-\uff0f\uff1a\uff1b\uff1f\uff20\uff3b-\uff3d\uff3f\uff5b\uff5d\uff5f-\uff65]",
        };
      },
      "3.17.2",
      { requires: ["yui-base"] }
    );
  },
  1626: function (h, l, f) {
    YUI.add(
      "autocomplete-highlighters",
      function (a, e) {
        var b = a.Array,
          c = a.Highlight,
          d = a.mix(a.namespace("AutoCompleteHighlighters"), {
            charMatch: function (a, d, e) {
              var f = b.unique((e ? a : a.toLowerCase()).split(""));
              return b.map(d, function (a) {
                return c.all(a.text, f, { caseSensitive: e });
              });
            },
            charMatchCase: function (a, b) {
              return d.charMatch(a, b, !0);
            },
            phraseMatch: function (a, d, e) {
              return b.map(d, function (b) {
                return c.all(b.text, [a], { caseSensitive: e });
              });
            },
            phraseMatchCase: function (a, b) {
              return d.phraseMatch(a, b, !0);
            },
            startsWith: function (a, d, e) {
              return b.map(d, function (b) {
                return c.all(b.text, [a], { caseSensitive: e, startsWith: !0 });
              });
            },
            startsWithCase: function (a, b) {
              return d.startsWith(a, b, !0);
            },
            subWordMatch: function (d, e, f) {
              var v = a.Text.WordBreak.getUniqueWords(d, { ignoreCase: !f });
              return b.map(e, function (a) {
                return c.all(a.text, v, { caseSensitive: f });
              });
            },
            subWordMatchCase: function (a, b) {
              return d.subWordMatch(a, b, !0);
            },
            wordMatch: function (a, d, e) {
              return b.map(d, function (b) {
                return c.words(b.text, a, { caseSensitive: e });
              });
            },
            wordMatchCase: function (a, b) {
              return d.wordMatch(a, b, !0);
            },
          });
      },
      "3.17.2",
      { requires: ["array-extras", "highlight-base"] }
    );
  },
  1627: function (h, l, f) {
    YUI.add(
      "highlight-base",
      function (a, e) {
        var b = a.Array,
          c = a.Escape,
          d = a.Text.WordBreak,
          k = a.Lang.isArray,
          g = {},
          f = {
            _REGEX: "(&[^;\\s]*)?(%needles)",
            _REPLACER: function (a, b, c) {
              return b && !/\s/.test(c) ? a : f._TEMPLATE.replace(/\{s\}/g, c);
            },
            _START_REGEX: "^(&[^;\\s]*)?(%needles)",
            _TEMPLATE:
              '<b class="' +
              a.ClassNameManager.getClassName("highlight") +
              '">{s}</b>',
            all: function (a, b, d) {
              var e = [],
                h,
                l,
                t,
                u,
                x,
                B;
              d || (d = g);
              h = !1 !== d.escapeHTML;
              x = d.startsWith ? f._START_REGEX : f._REGEX;
              B = d.replacer || f._REPLACER;
              b = k(b) ? b : [b];
              l = 0;
              for (t = b.length; l < t; ++l)
                (u = b[l]) && e.push(c.regex(h ? c.html(u) : u));
              h && (a = c.html(a));
              return !e.length
                ? a
                : a.replace(
                    RegExp(
                      x.replace("%needles", e.join("|")),
                      d.caseSensitive ? "g" : "gi"
                    ),
                    B
                  );
            },
            allCase: function (b, c, d) {
              return f.all(b, c, a.merge(d || g, { caseSensitive: !0 }));
            },
            start: function (b, c, d) {
              return f.all(b, c, a.merge(d || g, { startsWith: !0 }));
            },
            startCase: function (a, b) {
              return f.start(a, b, { caseSensitive: !0 });
            },
            words: function (a, e, h) {
              var l,
                q,
                r = f._TEMPLATE;
              h || (h = g);
              l = !!h.caseSensitive;
              e = b.hash(k(e) ? e : d.getUniqueWords(e, { ignoreCase: !l }));
              q =
                h.mapper ||
                function (a, b) {
                  return b.hasOwnProperty(l ? a : a.toLowerCase())
                    ? r.replace(/\{s\}/g, c.html(a))
                    : c.html(a);
                };
              a = d.getWords(a, {
                includePunctuation: !0,
                includeWhitespace: !0,
              });
              return b
                .map(a, function (a) {
                  return q(a, e);
                })
                .join("");
            },
            wordsCase: function (a, b) {
              return f.words(a, b, { caseSensitive: !0 });
            },
          };
        a.Highlight = f;
      },
      "3.17.2",
      {
        requires: [
          "array-extras",
          "classnamemanager",
          "escape",
          "text-wordbreak",
        ],
      }
    );
  },
  1683: function (h, l, f) {
    YUI.add(
      "lang/autocomplete-list",
      function (a) {
        a.Intl.add("autocomplete-list", "", {
          item_selected: "{item} selected.",
          items_available:
            "Suggestions are available. Use the up and down arrow keys to select suggestions.",
        });
      },
      "3.17.2"
    );
  },
  1705: function (h, l, f) {
    YUI.add(
      "squarespace-dialog-check-template",
      function (a) {
        var e = a.Handlebars;
        (function () {
          var a = e.template;
          (e.templates = e.templates || {})["dialog-check.html"] = a(function (
            a,
            b,
            e,
            g,
            f
          ) {
            this.compilerInfo = [4, ">= 1.0.0"];
            e = this.merge(e, a.helpers);
            f = f || {};
            var h,
              l = this.escapeExpression;
            a = '<div class="check-element ';
            if (
              (g = e["if"].call(b, b.data, {
                hash: {},
                inverse: this.noop,
                fn: this.program(
                  1,
                  function (a, b) {
                    return "active";
                  },
                  f
                ),
                data: f,
              })) ||
              0 === g
            )
              a += g;
            a += '">\n  ';
            if (
              (h = e["if"].call(
                b,
                ((g = b.strings), null == g || !1 === g ? g : g.title),
                {
                  hash: {},
                  inverse: this.noop,
                  fn: this.program(
                    3,
                    function (a, b) {
                      var c, d;
                      return (c =
                        "" +
                        ('\n    <div class="title">' +
                          l(
                            ((d =
                              ((d = a.strings),
                              null == d || !1 === d ? d : d.title)),
                            "function" === typeof d ? d.apply(a) : d)
                          ) +
                          "</div>\n  "));
                    },
                    f
                  ),
                  data: f,
                }
              )) ||
              0 === h
            )
              a += h;
            a += "\n  ";
            if (
              (h = e["if"].call(
                b,
                ((g = b.strings), null == g || !1 === g ? g : g.description),
                {
                  hash: {},
                  inverse: this.noop,
                  fn: this.program(
                    5,
                    function (a, b) {
                      var c, d, e;
                      c = '\n    <div class="description">';
                      if (
                        (e =
                          ((d =
                            ((d = a.strings),
                            null == d || !1 === d ? d : d.description)),
                          "function" === typeof d ? d.apply(a) : d)) ||
                        0 === e
                      )
                        c += e;
                      return c + "</div>\n  ";
                    },
                    f
                  ),
                  data: f,
                }
              )) ||
              0 === h
            )
              a += h;
            return a + "\n</div>\n";
          });
        })();
        a.Handlebars.registerPartial(
          "dialog-check.html".replace("/", "."),
          e.templates["dialog-check.html"]
        );
      },
      "1.0",
      { requires: ["handlebars-base"] }
    );
  },
  1789: function (h, l, f) {
    YUI.add(
      "squarespace-pill-shopping-cart-template",
      function (a) {
        var e = a.Handlebars;
        (function () {
          var a = e.template;
          (e.templates = e.templates || {})["pill-shopping-cart.html"] = a(
            function (a, b, e, g, f) {
              this.compilerInfo = [4, ">= 1.0.0"];
              this.merge(e, a.helpers);
              return '<div class="icon"></div>\n\n<div class="details">\n  Cart&nbsp;-&nbsp;\n    <span class="total-quantity"></span>\n    <span class="suffix"></span>\n</div>\n\n<span class="subtotal">\n  <span class="price"></span>\n</span>\n';
            }
          );
        })();
        a.Handlebars.registerPartial(
          "pill-shopping-cart.html".replace("/", "."),
          e.templates["pill-shopping-cart.html"]
        );
      },
      "1.0",
      { requires: ["handlebars-base"] }
    );
  },
  1790: function (h, l, f) {
    YUI.add(
      "squarespace-full-page-shopping-cart-template",
      function (a) {
        var e = a.Handlebars;
        (function () {
          var a = e.template;
          (e.templates = e.templates || {})["full-page-shopping-cart.html"] = a(
            function (a, b, e, g, f) {
              this.compilerInfo = [4, ">= 1.0.0"];
              this.merge(e, a.helpers);
              return '<div class="loading-spinner"></div>\n\n<h2>Shopping Cart</h2>\n\n<div class="cart-container">\n\n  <table>\n\n    <thead> \n      <tr>\n        <td class="item">Item</td>\n        <td></td>\n        <td class="quantity">Quantity</td>\n        <td class="price">Price</td>\n        <td></td>\n      </tr>\n    </thead>\n\n    <tbody></tbody>\n\n  </table>\n\n  <div class="subtotal">\n    <span class="label">Subtotal</span>\n    <span class="price"></span>\n  </div>\n\n  <div class="checkout">\n    <div class="checkout-button sqs-system-button sqs-editable-button">CHECKOUT</div>\n  </div>\n\n</div>\n\n<div class="empty-message">\n  You have nothing in your shopping cart.&nbsp;\n  <a href="/">Continue Shopping</a>\n</div>\n';
            }
          );
        })();
        a.Handlebars.registerPartial(
          "full-page-shopping-cart.html".replace("/", "."),
          e.templates["full-page-shopping-cart.html"]
        );
      },
      "1.0",
      { requires: ["handlebars-base"] }
    );
  },
  1791: function (h, l, f) {
    YUI.add(
      "squarespace-full-page-shopping-cart-item-template",
      function (a) {
        var e = a.Handlebars;
        (function () {
          var a = e.template;
          (e.templates = e.templates || {})[
            "full-page-shopping-cart-item.html"
          ] = a(function (a, b, e, g, f) {
            this.compilerInfo = [4, ">= 1.0.0"];
            e = this.merge(e, a.helpers);
            f = f || {};
            a =
              '<tr>\n\n  <td class="item">\n    <div class="item-image"></div>\n  </td>\n\n  <td class="item-desc"></td>\n\n  <td class="quantity">\n    ';
            if (
              (b = e["if"].call(b, b.isPhysicalProduct, {
                hash: {},
                inverse: this.program(
                  3,
                  function (a, b) {
                    return '\n      <div class="not-applicable">N/A</div>\n    ';
                  },
                  f
                ),
                fn: this.program(
                  1,
                  function (a, b) {
                    return '\n      <input />\n      <div class="cooldown">&bull;</div>\n    ';
                  },
                  f
                ),
                data: f,
              })) ||
              0 === b
            )
              a += b;
            return (
              a +
              '\n  </td>\n\n  <td class="price"></td>\n\n  <td class="remove">\n    <div class="remove-item">\u00d7</div>\n  </td>\n\n</tr>\n'
            );
          });
        })();
        a.Handlebars.registerPartial(
          "full-page-shopping-cart-item.html".replace("/", "."),
          e.templates["full-page-shopping-cart-item.html"]
        );
      },
      "1.0",
      { requires: ["handlebars-base"] }
    );
  },
  1792: function (h, l, f) {
    YUI.add(
      "squarespace-checkout-saved-custom-form-template",
      function (a) {
        var e = a.Handlebars;
        (function () {
          var a = e.template;
          (e.templates = e.templates || {})["checkout-saved-custom-form.html"] =
            a(function (a, b, e, g, f) {
              this.compilerInfo = [4, ">= 1.0.0"];
              e = this.merge(e, a.helpers);
              f = f || {};
              a = '<div class="saved-fieldset">\n\n  ';
              if (
                (b = e.each.call(b, b.fields, {
                  hash: {},
                  inverse: this.noop,
                  fn: this.program(
                    1,
                    function (a, b) {
                      var c, d;
                      c = "\n  <div>\n    ";
                      if (
                        (d = "function" === typeof a ? a.apply(a) : a) ||
                        0 === d
                      )
                        c += d;
                      return c + "\n  </div> \n  ";
                    },
                    f
                  ),
                  data: f,
                })) ||
                0 === b
              )
                a += b;
              return a + "\n\n</div>\n";
            });
        })();
        a.Handlebars.registerPartial(
          "checkout-saved-custom-form.html".replace("/", "."),
          e.templates["checkout-saved-custom-form.html"]
        );
      },
      "1.0",
      { requires: ["handlebars-base"] }
    );
  },
  1793: function (h, l, f) {
    YUI.add(
      "squarespace-checkout-form-custom-form-template",
      function (a) {
        var e = a.Handlebars;
        (function () {
          var a = e.template;
          (e.templates = e.templates || {})["checkout-form-custom-form.html"] =
            a(function (a, b, e, g, f) {
              this.compilerInfo = [4, ">= 1.0.0"];
              this.merge(e, a.helpers);
              var h;
              a = this.escapeExpression;
              return (b =
                "" +
                ('<div class="title">' +
                  a(
                    ((h =
                      ((h = b.strings), null == h || !1 === h ? h : h.name)),
                    "function" === typeof h ? h.apply(b) : h)
                  ) +
                  '<a class="edit-button">edit</a></div>\n\n<fieldset>\n\n  <div class="custom-form">\n  </div>\n\n  \x3c!-- Continue --\x3e\n  <div class="btn-container">\n    <div class="button continue-button">Continue</div>\n  </div>\n\n</fieldset>\n'));
            });
        })();
        a.Handlebars.registerPartial(
          "checkout-form-custom-form.html".replace("/", "."),
          e.templates["checkout-form-custom-form.html"]
        );
      },
      "1.0",
      { requires: ["handlebars-base"] }
    );
  },
  1794: function (h, l, f) {
    YUI.add(
      "squarespace-shipping-options-list-template",
      function (a) {
        var e = a.Handlebars;
        (function () {
          var a = e.template;
          (e.templates = e.templates || {})["shipping-options-list.html"] = a(
            function (a, b, e, g, f) {
              this.compilerInfo = [4, ">= 1.0.0"];
              this.merge(e, a.helpers);
              return '<div class="empty-message">\n  You cannot continue checkout because this store has not configured any\n  shipping options for your country.\n</div>\n\n<div class="warning-message zip-warning-message">\n  <img src="/universal/images-v6/dialog/tiny-alert.png" />Shipping options require your zip/postal code to estimate.\n</div>\n\n<div class="warning-message zip-invalid-warning-message">\n  <img src="/universal/images-v6/dialog/tiny-alert.png" />The zip code you entered is not valid.\n</div>\n\n<div class="warning-message weight-missing-warning-message">\n  <img src="/universal/images-v6/dialog/tiny-alert.png" />All products in this cart are missing weight information.\n</div>\n\n<div class="warning-message service-unavailable-warning-message">\n  <img src="/universal/images-v6/dialog/tiny-alert.png" />A method is unavailable because all items violate carrier \n  limits.\n</div>\n\n<div class="warning-message carrier-warning-message">\n  <img src="/universal/images-v6/dialog/tiny-alert.png" />Something went wrong reaching the shipping carrier for estimates.\n</div>\n\n<div class="loading-spinner"></div>\n<div class="options-container"></div>\n';
            }
          );
        })();
        a.Handlebars.registerPartial(
          "shipping-options-list.html".replace("/", "."),
          e.templates["shipping-options-list.html"]
        );
      },
      "1.0",
      { requires: ["handlebars-base"] }
    );
  },
  1795: function (h, l, f) {
    YUI.add(
      "squarespace-shipping-options-list-option-template",
      function (a) {
        var e = a.Handlebars;
        (function () {
          var a = e.template;
          (e.templates = e.templates || {})[
            "shipping-options-list-option.html"
          ] = a(function (a, b, e, g, f) {
            function h(a, b) {
              var c, d;
              c = "(";
              (d = e.speed)
                ? (d = d.call(a, { hash: {}, data: b }))
                : ((d = a.speed), (d = typeof d === l ? d.apply(a) : d));
              return (c += m(d) + ")");
            }
            this.compilerInfo = [4, ">= 1.0.0"];
            e = this.merge(e, a.helpers);
            f = f || {};
            var l = "function",
              m = this.escapeExpression,
              p = e.helperMissing;
            a = '<div class="shipping-option ';
            if (
              (g = e["if"].call(b, b.showAlert, {
                hash: {},
                inverse: this.noop,
                fn: this.program(
                  1,
                  function (a, b) {
                    return "disabled";
                  },
                  f
                ),
                data: f,
              })) ||
              0 === g
            )
              a += g;
            a +=
              '">\n\n  <div class="option">\n\n    <label class="shipping-option-label">\n\n      <input type="radio" value="';
            (g = e.id)
              ? (g = g.call(b, { hash: {}, data: f }))
              : ((g = b.id), (g = typeof g === l ? g.apply(b) : g));
            a += m(g) + '" title="';
            (g = e.name)
              ? (g = g.call(b, { hash: {}, data: f }))
              : ((g = b.name), (g = typeof g === l ? g.apply(b) : g));
            a += m(g) + '" data-computed-cost="';
            (g = e.computedCost)
              ? (g = g.call(b, { hash: {}, data: f }))
              : ((g = b.computedCost), (g = typeof g === l ? g.apply(b) : g));
            a += m(g) + '"\n          name="selectedShippingOption" ';
            if (
              (g = e["if"].call(b, b.showAlert, {
                hash: {},
                inverse: this.noop,
                fn: this.program(
                  3,
                  function (a, b) {
                    return 'disabled="true"';
                  },
                  f
                ),
                data: f,
              })) ||
              0 === g
            )
              a += g;
            a += ' />\n      <span class="option-name" title="';
            (g = e.name)
              ? (g = g.call(b, { hash: {}, data: f }))
              : ((g = b.name), (g = typeof g === l ? g.apply(b) : g));
            a += m(g) + " ";
            if (
              (g = e["if"].call(b, b.speed, {
                hash: {},
                inverse: this.noop,
                fn: this.program(5, h, f),
                data: f,
              })) ||
              0 === g
            )
              a += g;
            a += '">';
            (g = e.name)
              ? (g = g.call(b, { hash: {}, data: f }))
              : ((g = b.name), (g = typeof g === l ? g.apply(b) : g));
            a += m(g) + " ";
            if (
              (g = e["if"].call(b, b.speed, {
                hash: {},
                inverse: this.noop,
                fn: this.program(5, h, f),
                data: f,
              })) ||
              0 === g
            )
              a += g;
            f = { hash: {}, data: f };
            return (a =
              a +
              '</span>\n\n      <div class="shipping-failure">\n        <img src="/universal/images-v6/dialog/tiny-alert-inverted.png" />\n      </div>\n\n      <span class="cost">&mdash;&nbsp;<strong>' +
              (m(
                ((g = e["money-string"] || b["money-string"]),
                g
                  ? g.call(b, b.computedCost, f)
                  : p.call(b, "money-string", b.computedCost, f))
              ) +
                "</strong></span>\n\n    </label>\n\n  </div>\n\n</div>"));
          });
        })();
        a.Handlebars.registerPartial(
          "shipping-options-list-option.html".replace("/", "."),
          e.templates["shipping-options-list-option.html"]
        );
      },
      "1.0",
      { requires: ["handlebars-base"] }
    );
  },
  1796: function (h, l, f) {
    YUI.add(
      "squarespace-checkout-form-shipping-info-template",
      function (a) {
        var e = a.Handlebars;
        (function () {
          var a = e.template;
          (e.templates = e.templates || {})[
            "checkout-form-shipping-info.html"
          ] = a(function (a, b, e, f, n) {
            function h(a, b) {
              return 'checked="checked"';
            }
            this.compilerInfo = [4, ">= 1.0.0"];
            e = this.merge(e, a.helpers);
            n = n || {};
            var l,
              m = this;
            a =
              '<div class="title">\n  Contact &amp; Shipping\n  <a class="edit-button">edit</a>\n</div>\n\n<fieldset>\n\n    <div class="subtitle contact-info-subtitle">Your Email Address</div>\n    \x3c!-- Email Address --\x3e\n    <div id="email" data-label="Email Address" class="field email required">\n      <label>Email Address</label>\n      <input name="email" class="field-element" placeholder="Email"\n          x-autocompletetype="email" type="email" spellcheck="false" maxlength="50" type="email" />\n    </div>\n    <div class="description">Receipts and notifications will be sent to this email address.</div>\n\n    ';
            if (
              (b = e["if"].call(
                b,
                ((l = b.optionalFields),
                null == l || !1 === l ? l : l.showMailingList),
                {
                  hash: {},
                  inverse: m.noop,
                  fn: m.program(
                    1,
                    function (a, b) {
                      var c, d;
                      c =
                        '\n      \x3c!-- Mailchimp (optional) --\x3e\n      <div class="join-mailing-list">\n        <label>\n          <input type="checkbox" name="joinMailingList" class="field-element" ';
                      if (
                        (d = e["if"].call(
                          a,
                          a.enableMailingListOptInByDefault,
                          {
                            hash: {},
                            inverse: m.noop,
                            fn: m.program(2, h, b),
                            data: b,
                          }
                        )) ||
                        0 === d
                      )
                        c += d;
                      return (
                        c +
                        "></input>\n          Join our mailing list\n        </label>\n      </div>\n    "
                      );
                    },
                    n
                  ),
                  data: n,
                }
              )) ||
              0 === b
            )
              a += b;
            return (
              a +
              '\n\n  <div class="subtitle shipping-address-subtitle">Shipping Address</div>\n\n  \x3c!-- Shipping Address --\x3e\n  <div id="shipping-address-wrapper">\n\n    <div class="shipping-fields">\n\n      \x3c!-- First Name --\x3e\n      <div id="shipping-first-name" data-label="First Name" class="field first-name required">\n        <label>First Name</label>\n        <input name="shippingFirstName" class="field-element"\n            placeholder="First Name" x-autocompletetype="given-name" type="text" spellcheck="false" maxlength="30" />\n      </div>\n\n\n      \x3c!-- Last Name --\x3e\n      <div id="shipping-last-name" data-label="Last Name" class="field last-name required">\n        <label>Last Name</label>\n        <input name="shippingLastName" class="field-element" placeholder="Last Name"\n            x-autocompletetype="surname" type="text" spellcheck="false" maxlength="30" />\n      </div>\n\n\n      \x3c!-- Shipping Address 1 --\x3e\n      <div id="shipping-address-1" data-label="Address Line 1" class="field address required">\n        <label>Address Line 1</label>\n        <input name="shippingAddress1" class="field-element address-line1" type="text"\n            x-autocompletetype="address-line1" placeholder="Street Address 1" spellcheck="false" maxlength="50" />\n      </div>\n\n\n      \x3c!-- Shipping Address 2 --\x3e\n      <div id="shipping-address-2" data-label="Address Line 2" class="field address">\n        <label>Address Line 2</label>\n        <input name="shippingAddress2" class="field-element address-line2" type="text"\n            placeholder="Street Address 2" x-autocompletetype="address-line2" spellcheck="false" maxlength="50" />\n      </div>\n\n\n      \x3c!-- Country --\x3e\n      <div id="shipping-country" data-label="Country" class="field country required">\n        <label>Country</label>\n        <select name="shippingCountry" class="field-element"\n            x-autocompletetype="country-name">\n        </select>\n      </div>\n\n\n      \x3c!-- City --\x3e\n      <div id="shipping-city" data-label="City" class="field city required">\n        <label>City</label>\n        <input name="shippingCity" class="field-element" placeholder="City"\n            x-autocompletetype="city" type="text" spellcheck="false" maxlength="30" />\n      </div>\n\n\n      \x3c!-- State/Province --\x3e\n      <div id="shipping-state" data-label="State/Province" class="field state required">\n        <label>State/Province</label>\n        <select name="shippingState" class="field-element"\n            x-autocompletetype="state">\n        </select>\n      </div>\n\n\n      \x3c!-- Zip Code --\x3e\n      <div id="shipping-zip" data-label="Zip Code" class="field zip required">\n        <label>Zip / Postal</label>\n        <input name="shippingZip" class="field-element"\n            x-autocompletetype="postal-code" placeholder="Zip / Postal" type="text" spellcheck="false" maxlength="10" />\n      </div>\n\n      <div id="phone" data-label="Phone Number" class="field phone">\n        <label>Phone Number</label>\n        <input name="phone" class="field-element" placeholder="Phone Number"\n            x-autocompletetype="phone" spellcheck="false" maxlength="20" type="tel" />\n      </div>\n\n    </div>\n\n\n  </div> \x3c!-- end #shipping-address --\x3e\n\n\n\n  \x3c!-- Continue --\x3e\n  <div class="btn-container">\n    <div class="button continue-button">Continue</div>\n  </div>\n\n</fieldset>\n'
            );
          });
        })();
        a.Handlebars.registerPartial(
          "checkout-form-shipping-info.html".replace("/", "."),
          e.templates["checkout-form-shipping-info.html"]
        );
      },
      "1.0",
      { requires: ["handlebars-base"] }
    );
  },
  1797: function (h, l, f) {
    YUI.add(
      "squarespace-checkout-saved-shipping-info-template",
      function (a) {
        var e = a.Handlebars;
        (function () {
          var a = e.template;
          (e.templates = e.templates || {})[
            "checkout-saved-shipping-info.html"
          ] = a(function (a, b, e, f, n) {
            function h(a, b) {
              var c;
              (c = e.shippingCity)
                ? (c = c.call(a, { hash: {}, data: b }))
                : ((c = a.shippingCity), (c = typeof c === q ? c.apply(a) : c));
              return r(c);
            }
            function l(a, b) {
              var c, d;
              c = ",&nbsp;";
              (d = e.shippingState)
                ? (d = d.call(a, { hash: {}, data: b }))
                : ((d = a.shippingState),
                  (d = typeof d === q ? d.apply(a) : d));
              return (c += r(d));
            }
            function m(a, b) {
              var c, d;
              c = "&nbsp;&nbsp;";
              (d = e.shippingZip)
                ? (d = d.call(a, { hash: {}, data: b }))
                : ((d = a.shippingZip), (d = typeof d === q ? d.apply(a) : d));
              return (c += r(d));
            }
            this.compilerInfo = [4, ">= 1.0.0"];
            e = this.merge(e, a.helpers);
            n = n || {};
            var p,
              q = "function",
              r = this.escapeExpression,
              t = this;
            f = e.blockHelperMissing;
            a = '<div class="saved-fieldset">\n\n  ';
            p = {
              hash: {},
              inverse: t.noop,
              fn: t.program(
                1,
                function (a, b) {
                  var c, d;
                  c =
                    '\n\n    <div class="subtitle">Your Email Address</div>\n    <div>';
                  (d = e.email)
                    ? (d = d.call(a, { hash: {}, data: b }))
                    : ((d = a.email), (d = typeof d === q ? d.apply(a) : d));
                  c +=
                    r(d) +
                    '</div>\n    <br />\n    \n\n    <div class="subtitle">Shipping Address</div>\n    <div>\n      ';
                  (d = e.shippingFirstName)
                    ? (d = d.call(a, { hash: {}, data: b }))
                    : ((d = a.shippingFirstName),
                      (d = typeof d === q ? d.apply(a) : d));
                  c += r(d) + "&nbsp;";
                  (d = e.shippingLastName)
                    ? (d = d.call(a, { hash: {}, data: b }))
                    : ((d = a.shippingLastName),
                      (d = typeof d === q ? d.apply(a) : d));
                  c += r(d) + "\n    </div>\n    <div>";
                  (d = e.shippingAddress1)
                    ? (d = d.call(a, { hash: {}, data: b }))
                    : ((d = a.shippingAddress1),
                      (d = typeof d === q ? d.apply(a) : d));
                  c += r(d) + "</div>\n    <div>";
                  (d = e.shippingAddress2)
                    ? (d = d.call(a, { hash: {}, data: b }))
                    : ((d = a.shippingAddress2),
                      (d = typeof d === q ? d.apply(a) : d));
                  c += r(d) + "</div>\n\n    <div>\n      ";
                  if (
                    (d = e["if"].call(a, a.shippingCity, {
                      hash: {},
                      inverse: t.noop,
                      fn: t.program(2, h, b),
                      data: b,
                    })) ||
                    0 === d
                  )
                    c += d;
                  if (
                    (d = e["if"].call(a, a.shippingState, {
                      hash: {},
                      inverse: t.noop,
                      fn: t.program(4, l, b),
                      data: b,
                    })) ||
                    0 === d
                  )
                    c += d;
                  if (
                    (d = e["if"].call(a, a.shippingZip, {
                      hash: {},
                      inverse: t.noop,
                      fn: t.program(6, m, b),
                      data: b,
                    })) ||
                    0 === d
                  )
                    c += d;
                  c += "\n    </div>\n\n    <div>";
                  (d = e.shippingCountry)
                    ? (d = d.call(a, { hash: {}, data: b }))
                    : ((d = a.shippingCountry),
                      (d = typeof d === q ? d.apply(a) : d));
                  c += r(d) + "</div>\n    <div>";
                  (d = e.phone)
                    ? (d = d.call(a, { hash: {}, data: b }))
                    : ((d = a.phone), (d = typeof d === q ? d.apply(a) : d));
                  return (c += r(d) + "</div>\n\n    <br />\n\n  ");
                },
                n
              ),
              data: n,
            };
            (n = e.requiresShipping)
              ? (n = n.call(b, p))
              : ((n = b.requiresShipping),
                (n = typeof n === q ? n.apply(b) : n));
            e.requiresShipping || (n = f.call(b, n, p));
            if (n || 0 === n) a += n;
            return a + "\n\n</div>\n";
          });
        })();
        a.Handlebars.registerPartial(
          "checkout-saved-shipping-info.html".replace("/", "."),
          e.templates["checkout-saved-shipping-info.html"]
        );
      },
      "1.0",
      { requires: ["handlebars-base"] }
    );
  },
  1798: function (h, l, f) {
    YUI.add(
      "squarespace-checkout-form-payment-template",
      function (a) {
        var e = a.Handlebars;
        (function () {
          var a = e.template;
          (e.templates = e.templates || {})["checkout-form-payment.html"] = a(
            function (a, b, e, f, n) {
              this.compilerInfo = [4, ">= 1.0.0"];
              e = this.merge(e, a.helpers);
              n = n || {};
              var h,
                l = this.escapeExpression,
                m = e.helperMissing;
              a =
                '<div class="title">\n  <a class="edit-button">edit</a>\n\n  <div class="cards">\n    <img src="https://static.squarespace.com/universal/images-v6/checkout/discover.png" />\n    <img src="https://static.squarespace.com/universal/images-v6/checkout/mastercard.png" />\n    <img src="https://static.squarespace.com/universal/images-v6/checkout/visa.png" />\n    <img src="https://static.squarespace.com/universal/images-v6/checkout/americanexpress.png" />\n  </div>\n\n  Billing\n</div>\n\n<fieldset>\n\n  <div class="subtitle">Billing Address</div>\n\n  \x3c!-- bill to shipping --\x3e\n  ';
              if (
                (f = e["if"].call(b, b.requiresShipping, {
                  hash: {},
                  inverse: this.noop,
                  fn: this.program(
                    1,
                    function (a, b) {
                      return '\n    <div class="bill-to-shipping">\n      <label>\n        <input name="billToShipping" class="field-element" type="checkbox" />\n        Use Shipping Address\n      </label>\n    </div>\n  ';
                    },
                    n
                  ),
                  data: n,
                })) ||
                0 === f
              )
                a += f;
              h = { hash: { short: "true" }, data: n };
              a =
                a +
                '\n\n  \x3c!-- Billing Information --\x3e\n  <div id="billing-address">\n\n    \x3c!-- First Name --\x3e\n    <div id="billing-first-name" data-label="First Name" class="field first-name required">\n      <label>First Name</label>\n      <input name="billingFirstName" class="field-element" placeholder="First Name"\n          x-autocompletetype="given-name" type="text" spellcheck="false" maxlength="30" />\n    </div>\n\n\n    \x3c!-- Last Name --\x3e\n    <div id="billing-last-name" data-label="Last Name" class="field last-name required">\n      <label>Last Name</label>\n      <input name="billingLastName" class="field-element" placeholder="Last Name"\n          x-autocompletetype="surname"a type="text" spellcheck="false" maxlength="30" />\n    </div>\n\n\n    \x3c!-- Billing Address 1 --\x3e\n    <div id="billing-address-1" data-label="Address Line 1" class="field required">\n      <label>Address Line 1</label>\n      <input name="billingAddress1" class="field-element address-line1"\n          placeholder="Address Line 1" x-autocompletetype="address-line1" type="text" spellcheck="false" maxlength="50" />\n    </div>\n\n\n    \x3c!-- Billing Address 2 --\x3e\n    <div id="billing-address-2" data-label="Address Line 2" class="field">\n      <label>Address Line 2</label>\n      <input name="billingAddress2" class="field-element address-line2"\n          placeholder="Address Line 2" type="text" x-autocompletetype="address-line2" spellcheck="false" maxlength="50" />\n    </div>\n\n\n    \x3c!-- Country --\x3e\n    <div id="billing-country" data-label="Country" class="field country required">\n      <label>Country</label>\n      <select name="billingCountry" class="field-element" x-autocompletetype="country-name">\n      </select>\n    </div>\n\n\n    \x3c!-- City --\x3e\n    <div id="billing-city" data-label="City" class="field city required">\n      <label>City</label>\n      <input name="billingCity" class="field-element" placeholder="City" type="text"\n          spellcheck="false" maxlength="30" />\n    </div>\n\n\n    \x3c!-- State/Province --\x3e\n    <div id="billing-state" data-label="State/Province" class="field state required">\n      <label>State/Province</label>\n      <select name="billingState" class="field-element" x-autocompletetype="state">\n      </select>\n    </div>\n\n\n    \x3c!-- Zip Code --\x3e\n    <div id="billing-zip" data-label="Zip Code" class="field zip required">\n      <label>Zip / Postal</label>\n      <input name="billingZip" class="field-element" placeholder="Zip / Postal" type="text"\n          spellcheck="false" maxlength="10" />\n    </div>\n\n  </div>\n\n  <div class="subtitle">Secure Payment</div>\n\n  \x3c!-- \n    Credit Card Fields \n    NOTA BENE: These INPUTs are left without \'name\' because we ABSOLUTELY must NOT\n    transmit these values to our own servers.\n  --\x3e\n  <div id="credit-card">\n\n    \x3c!-- Name --\x3e\n    <input name="cardHolderName" type="hidden" />\n\n    \x3c!-- Card Number --\x3e\n    <div id="card-number" data-label="Card Number" class="field">\n      <label>Card Number</label>\n\n      <input class="field-element" size="20"\n          autocomplete="off" placeholder="Card Number" value="" />\n    </div>\n\n    \x3c!-- Expiry/CVC --\x3e\n    <div id="expiry-cvc">\n\n      \x3c!-- Expiry Month --\x3e\n      <div id="card-expiry-month" data-label="Exp. Mo." class="field">\n        <label>Exp. Mo.</label>\n        <select class="field-element" value="04" >\n          ' +
                (l(
                  ((f = e["month-options"] || b["month-options"]),
                  f ? f.call(b, h) : m.call(b, "month-options", h))
                ) +
                  '\n        </select>\n      </div>\n\n      \x3c!-- Expiry Year --\x3e\n      <div id="card-expiry-year" data-label="Exp. Yr." class="field">\n        <label>Exp. Yr.</label>\n        <select class="field-element" value="2015" >\n          ');
              (h = e["year-options"])
                ? (h = h.call(b, { hash: {}, data: n }))
                : ((h = b["year-options"]),
                  (h = "function" === typeof h ? h.apply(b) : h));
              a +=
                l(h) +
                '\n        </select>\n      </div>\n\n      \x3c!-- CVC --\x3e\n      <div id="cvc" data-label="CVC" class="field">\n        <label>CVC</label>\n        <input class="field-element" size="4" autocomplete="off"\n            placeholder="CVC" value="" />\n      </div>\n\n    </div>\n\n  </div> \x3c!-- end #credit-card --\x3e\n\n\n  \x3c!-- Secure payment conditions --\x3e\n  <div id="comfort">\n    All transactions are secure and encrypted, and we never store your credit card information. Payments are\n    processed through Stripe. Payment information is also governed by\n    <a target="_blank" href="https://stripe.com/privacy">Stripe\'s privacy policy</a>.\n  </div>\n\n\n  \x3c!-- Place Order --\x3e\n  <div id="place-order">\n    <div id="place-order-button" class="button continue-button" value="Place Order" >' +
                l(
                  ((f =
                    ((f = b.strings),
                    null == f || !1 === f ? f : f.submitText)),
                  "function" === typeof f ? f.apply(b) : f)
                ) +
                '</div>\n\n    <div class="wait-in-queue-message" style="display: none">\n      Due to heavy traffic, your payment will be accepted shortly. Please don\'t hit the "back" button or leave the page.\n    </div>\n\n    \x3c!-- hidden field to convey the Stripe Token so we may submit the charge --\x3e\n    <input name="stripeToken" type="hidden" />\n\n    \x3c!-- optional hidden fields --\x3e\n    ';
              if (
                (h = e.each.call(b, b.optionalHiddenFields, {
                  hash: {},
                  inverse: this.noop,
                  fn: this.program(
                    3,
                    function (a, b) {
                      var c;
                      return (c =
                        "" +
                        ('\n      <input name="' +
                          l("function" === typeof a ? a.apply(a) : a) +
                          '" type="hidden" />\n    '));
                    },
                    n
                  ),
                  data: n,
                })) ||
                0 === h
              )
                a += h;
              return (a += "\n\n  </div>\n\n</fieldset>\n");
            }
          );
        })();
        a.Handlebars.registerPartial(
          "checkout-form-payment.html".replace("/", "."),
          e.templates["checkout-form-payment.html"]
        );
      },
      "1.0",
      { requires: ["handlebars-base"] }
    );
  },
  1799: function (h, l, f) {
    YUI.add(
      "squarespace-contribution-summary-template",
      function (a) {
        var e = a.Handlebars;
        (function () {
          var a = e.template;
          (e.templates = e.templates || {})["contribution-summary.html"] = a(
            function (a, b, e, f, h) {
              function l(a, b) {
                var c, d;
                c = "\n<p>\n  ";
                (d = e.description)
                  ? (d = d.call(a, { hash: {}, data: b }))
                  : ((d = a.description),
                    (d = typeof d === r ? d.apply(a) : d));
                return (c += t(d) + "\n</p>\n");
              }
              function w(a, b) {
                var c, d;
                c = '\n      <div class="suggested-contributions">\n        ';
                if (
                  (d = e.each.call(a, a.suggestedContributions, {
                    hash: {},
                    inverse: u.noop,
                    fn: u.program(5, m, b),
                    data: b,
                  })) ||
                  0 === d
                )
                  c += d;
                return (
                  c +
                  '\n\n        <div class="option">\n          <input type="radio" name="contribution" id="other" value="other" />\n          <label for="other">Other \n            &nbsp;<input type="text" placeholder="Enter Other Amount" name="contributionAmount" />\n          </label>\n          <br />\n        </div>\n      </div>\n    '
                );
              }
              function m(a, b) {
                var c, d;
                c =
                  '\n          <div class="option">\n            <input type="radio" name="contribution" id="';
                (d = e.amountCents)
                  ? (d = d.call(a, { hash: {}, data: b }))
                  : ((d = a.amountCents),
                    (d = typeof d === r ? d.apply(a) : d));
                c += t(d) + '" value="';
                (d = e.amountCents)
                  ? (d = d.call(a, { hash: {}, data: b }))
                  : ((d = a.amountCents),
                    (d = typeof d === r ? d.apply(a) : d));
                c += t(d) + '" />\n            <label for="';
                (d = e.amountCents)
                  ? (d = d.call(a, { hash: {}, data: b }))
                  : ((d = a.amountCents),
                    (d = typeof d === r ? d.apply(a) : d));
                c += t(d) + '"><span class="sqs-money-native">';
                (d = e.amountDollars)
                  ? (d = d.call(a, { hash: {}, data: b }))
                  : ((d = a.amountDollars),
                    (d = typeof d === r ? d.apply(a) : d));
                c += t(d) + "</span>&nbsp;";
                if (
                  (d = e["if"].call(a, a.label, {
                    hash: {},
                    inverse: u.noop,
                    fn: u.program(6, p, b),
                    data: b,
                  })) ||
                  0 === d
                )
                  c += d;
                return c + "</label><br />\n          </div>\n        ";
              }
              function p(a, b) {
                var c, d;
                c = "(";
                (d = e.label)
                  ? (d = d.call(a, { hash: {}, data: b }))
                  : ((d = a.label), (d = typeof d === r ? d.apply(a) : d));
                return (c += t(d) + ")");
              }
              function q(a, b) {
                return '\n    \n      <input type="text" placeholder="Enter Other Amount" name="contributionAmount" /><br />\n    ';
              }
              this.compilerInfo = [4, ">= 1.0.0"];
              e = this.merge(e, a.helpers);
              h = h || {};
              a = "";
              var r = "function",
                t = this.escapeExpression,
                u = this;
              if (
                (b = e["with"].call(b, b.donatePage, {
                  hash: {},
                  inverse: u.noop,
                  fn: u.program(
                    1,
                    function (a, b) {
                      var c, d;
                      c =
                        '\n\n<div class="title">Your Contribution<a class="edit-button">edit</a></div>\n\n<fieldset>\n\n';
                      if (
                        (d = e["if"].call(a, a.description, {
                          hash: {},
                          inverse: u.noop,
                          fn: u.program(2, l, b),
                          data: b,
                        })) ||
                        0 === d
                      )
                        c += d;
                      c +=
                        '\n\n<div class="choices">\n\n  <div class="title prompt"></div>\n  <div class="contribution-option-list">\n\n    \n    ';
                      if (
                        (d = e["if"].call(a, a.suggestedContributions, {
                          hash: {},
                          inverse: u.program(8, q, b),
                          fn: u.program(4, w, b),
                          data: b,
                        })) ||
                        0 === d
                      )
                        c += d;
                      return (
                        c +
                        '\n\n  </div>\n\n</div>\n\n\n\x3c!-- Continue --\x3e\n<div class="btn-container">\n  <div class="button continue-button">Continue</div>\n</div>\n\n</fieldset>\n'
                      );
                    },
                    h
                  ),
                  data: h,
                })) ||
                0 === b
              )
                a += b;
              return a + "\n";
            }
          );
        })();
        a.Handlebars.registerPartial(
          "contribution-summary.html".replace("/", "."),
          e.templates["contribution-summary.html"]
        );
      },
      "1.0",
      { requires: ["handlebars-base"] }
    );
  },
  1800: function (h, l, f) {
    YUI.add(
      "squarespace-checkout-saved-contribution-template",
      function (a) {
        var e = a.Handlebars;
        (function () {
          var a = e.template;
          (e.templates = e.templates || {})[
            "checkout-saved-contribution.html"
          ] = a(function (a, b, e, f, h) {
            this.compilerInfo = [4, ">= 1.0.0"];
            e = this.merge(e, a.helpers);
            h = h || {};
            var l = this.escapeExpression;
            a = '<div class="saved-fieldset">\n\n  You will donate ';
            (f = e.donationAmount)
              ? (f = f.call(b, { hash: {}, data: h }))
              : ((f = b.donationAmount),
                (f = "function" === typeof f ? f.apply(b) : f));
            if (f || 0 === f) a += f;
            a += " to ";
            (f = e.title)
              ? (f = f.call(b, { hash: {}, data: h }))
              : ((f = b.title), (f = "function" === typeof f ? f.apply(b) : f));
            return (a += l(f) + "\n\n</div>\n");
          });
        })();
        a.Handlebars.registerPartial(
          "checkout-saved-contribution.html".replace("/", "."),
          e.templates["checkout-saved-contribution.html"]
        );
      },
      "1.0",
      { requires: ["handlebars-base"] }
    );
  },
  1992: function (h, l, f) {
    h.exports = {
      AF: "Afghanistan",
      AL: "Albania",
      DZ: "Algeria",
      AS: "American Samoa",
      AD: "Andorra",
      AO: "Angola",
      AI: "Anguilla",
      AQ: "Antarctica",
      AG: "Antigua and Barbuda",
      AR: "Argentina",
      AM: "Armenia",
      AW: "Aruba",
      AU: "Australia",
      AT: "Austria",
      AX: "Aland Islands",
      AZ: "Azerbaijan",
      BS: "Bahamas",
      BH: "Bahrain",
      BD: "Bangladesh",
      BB: "Barbados",
      BY: "Belarus",
      BE: "Belgium",
      BZ: "Belize",
      BJ: "Benin",
      BM: "Bermuda",
      BT: "Bhutan",
      BO: "Bolivia",
      BA: "Bosnia and Herzegovina",
      BW: "Botswana",
      BV: "Bouvet Island",
      BR: "Brazil",
      IO: "British Indian Ocean Territory",
      BN: "Brunei Darussalam",
      BG: "Bulgaria",
      BF: "Burkina Faso",
      BI: "Burundi",
      KH: "Cambodia",
      CA: "Canada",
      CI: "Cote d'Ivoire",
      CM: "Cameroon",
      CV: "Cape Verde",
      KY: "Cayman Islands",
      CF: "Central African Republic",
      TD: "Chad",
      CL: "Chile",
      CN: "China",
      CX: "Christmas Island",
      CC: "Cocos (Keeling) Islands",
      CO: "Colombia",
      KM: "Comoros",
      CG: "Congo",
      CD: "Congo, Democratic Republic",
      CK: "Cook Islands",
      CR: "Costa Rica",
      HR: "Croatia",
      CU: "Cuba",
      CY: "Cyprus",
      CZ: "Czech Republic",
      DK: "Denmark",
      DJ: "Djibouti",
      DM: "Dominica",
      DO: "Dominican Republic",
      TL: "Timor-Leste",
      EC: "Ecuador",
      EG: "Egypt",
      SV: "El Salvador",
      GQ: "Equatorial Guinea",
      ER: "Eritrea",
      EE: "Estonia",
      ET: "Ethiopia",
      FK: "Falkland Islands (Malvinas)",
      FO: "Faroe Islands",
      FJ: "Fiji",
      FI: "Finland",
      FR: "France",
      GF: "French Guiana",
      PF: "French Polynesia",
      TF: "French Southern Territories",
      GA: "Gabon",
      GM: "Gambia",
      GE: "Georgia",
      DE: "Germany",
      GH: "Ghana",
      GI: "Gibraltar",
      GR: "Greece",
      GL: "Greenland",
      GD: "Grenada",
      GG: "Guernsey",
      GP: "Guadeloupe",
      GU: "Guam",
      GT: "Guatemala",
      GN: "Guinea",
      GW: "Guinea-Bissau",
      GY: "Guyana",
      HT: "Haiti",
      HM: "Heard and McDonald Islands",
      HN: "Honduras",
      HK: "Hong Kong",
      HU: "Hungary",
      IS: "Iceland",
      IN: "India",
      ID: "Indonesia",
      IR: "Iran",
      IQ: "Iraq",
      IE: "Ireland",
      IM: "Isle of Man",
      IL: "Israel",
      IT: "Italy",
      JM: "Jamaica",
      JP: "Japan",
      JE: "Jersey",
      JO: "Jordan",
      KZ: "Kazakhstan",
      KE: "Kenya",
      KI: "Kiribati",
      KP: "Korea (the Democratic People's Republic of)",
      KR: "Korea (the Republic of)",
      KV: "Kosovo",
      KW: "Kuwait",
      KG: "Kyrgyzstan",
      LA: "Laos",
      LV: "Latvia",
      LB: "Lebanon",
      LS: "Lesotho",
      LR: "Liberia",
      LY: "Libya",
      LI: "Liechtenstein",
      LT: "Lithuania",
      LU: "Luxembourg",
      MO: "Macau",
      MK: "Macedonia",
      MG: "Madagascar",
      MW: "Malawi",
      MY: "Malaysia",
      MV: "Maldives",
      ML: "Mali",
      MT: "Malta",
      MH: "Marshall Islands",
      MQ: "Martinique",
      MR: "Mauritania",
      MU: "Mauritius",
      YT: "Mayotte",
      MX: "Mexico",
      FM: "Micronesia",
      MD: "Moldova",
      MC: "Monaco",
      MN: "Mongolia",
      ME: "Montenegro",
      MS: "Montserrat",
      MA: "Morocco",
      MZ: "Mozambique",
      MM: "Myanmar",
      NA: "Namibia",
      NR: "Nauru",
      NP: "Nepal",
      NL: "Netherlands",
      AN: "Netherlands Antilles",
      NC: "New Caledonia",
      NZ: "New Zealand",
      NI: "Nicaragua",
      NE: "Niger",
      NG: "Nigeria",
      NU: "Niue",
      NF: "Norfolk Island",
      MP: "Northern Mariana Islands",
      NO: "Norway",
      OM: "Oman",
      PK: "Pakistan",
      PW: "Palau",
      PA: "Panama",
      PG: "Papua New Guinea",
      PS: "Palestine, State of",
      PY: "Paraguay",
      PE: "Peru",
      PH: "Philippines",
      PN: "Pitcairn",
      PL: "Poland",
      PT: "Portugal",
      PR: "Puerto Rico",
      QA: "Qatar",
      RE: "Reunion",
      RO: "Romania",
      RU: "Russian Federation",
      RW: "Rwanda",
      GS: "South Georgia and the South Sandwich Islands",
      BL: "Saint Barthelemy",
      KN: "Saint Kitts and Nevis",
      LC: "Saint Lucia",
      VC: "Saint Vincent and the Grenadines",
      WS: "Samoa",
      SM: "San Marino",
      ST: "Sao Tome and Principe",
      SA: "Saudi Arabia",
      SN: "Senegal",
      RS: "Serbia",
      SC: "Seychelles",
      SL: "Sierra Leone",
      SG: "Singapore",
      SK: "Slovakia",
      SI: "Slovenia",
      SB: "Solomon Islands",
      SO: "Somalia",
      ZA: "South Africa",
      ES: "Spain",
      LK: "Sri Lanka",
      SH: "Saint Helena",
      PM: "Saint Pierre and Miquelon",
      SD: "Sudan",
      SR: "Suriname",
      SJ: "Svalbard and Jan Mayen Islands",
      SZ: "Swaziland",
      SE: "Sweden",
      CH: "Switzerland",
      SY: "Syria",
      TW: "Taiwan",
      TJ: "Tajikistan",
      TZ: "Tanzania",
      TH: "Thailand",
      TG: "Togo",
      TK: "Tokelau",
      TO: "Tonga",
      TT: "Trinidad and Tobago",
      TN: "Tunisia",
      TR: "Turkey",
      TM: "Turkmenistan",
      TC: "Turks and Caicos Islands",
      TV: "Tuvalu",
      US: "United States",
      UM: "United States Minor Outlying Islands",
      UG: "Uganda",
      UA: "Ukraine",
      AE: "United Arab Emirates",
      GB: "United Kingdom",
      UY: "Uruguay",
      UZ: "Uzbekistan",
      VU: "Vanuatu",
      VA: "Vatican City State (Holy See)",
      VE: "Venezuela",
      VN: "Vietnam",
      VG: "Virgin Islands (British)",
      VI: "Virgin Islands (U.S.)",
      WF: "Wallis and Futuna Islands",
      EH: "Western Sahara",
      YE: "Yemen",
      ZM: "Zambia",
      ZW: "Zimbabwe",
    };
  },
  2011: function (h, l, f) {
    var a = f(2045),
      e = f(2046);
    h.exports = function (b, c, d) {
      var f = {};
      c = a(c, d, 3);
      e(b, function (a, b, d) {
        f[b] = c(a, b, d);
      });
      return f;
    };
  },
  2045: function (h, l, f) {
    var a = f(2091),
      e = f(2092),
      b = f(2093),
      c = f(2090),
      d = f(2094),
      k = f(2095);
    h.exports = function (f, h, l) {
      var w = typeof f;
      return "function" == w
        ? "undefined" != typeof h && k(f)
          ? c(f, h, l)
          : f
        : null == f
        ? d
        : "object" == w
        ? a(f)
        : "undefined" == typeof h
        ? b(f + "")
        : e(f + "", h);
    };
  },
  2046: function (h, l, f) {
    var a = f(2096),
      e = f(2097);
    h.exports = function (b, c) {
      return a(b, c, e);
    };
  },
  2090: function (h, l, f) {
    var a = f(2094);
    h.exports = function (e, b, c) {
      if ("function" != typeof e) return a;
      if ("undefined" == typeof b) return e;
      switch (c) {
        case 1:
          return function (a) {
            return e.call(b, a);
          };
        case 3:
          return function (a, c, f) {
            return e.call(b, a, c, f);
          };
        case 4:
          return function (a, c, f, h) {
            return e.call(b, a, c, f, h);
          };
        case 5:
          return function (a, c, f, h, l) {
            return e.call(b, a, c, f, h, l);
          };
      }
      return function () {
        return e.apply(b, arguments);
      };
    };
  },
  2091: function (h, l, f) {
    var a = f(2159),
      e = f(2158),
      b = f(2097),
      c = Object.prototype.hasOwnProperty;
    h.exports = function (d) {
      var f = b(d),
        g = f.length;
      if (1 == g) {
        var h = f[0],
          l = d[h];
        if (e(l))
          return function (a) {
            return null != a && a[h] === l && c.call(a, h);
          };
      }
      for (var w = Array(g), m = Array(g); g--; )
        (l = d[f[g]]), (w[g] = l), (m[g] = e(l));
      return function (b) {
        return a(b, f, w, m);
      };
    };
  },
  2092: function (h, l, f) {
    var a = f(2157),
      e = f(2158);
    h.exports = function (b, c) {
      return e(c)
        ? function (a) {
            return null != a && a[b] === c;
          }
        : function (d) {
            return null != d && a(c, d[b], null, !0);
          };
    };
  },
  2093: function (h, l, f) {
    h.exports = function (a) {
      return function (e) {
        return null == e ? void 0 : e[a];
      };
    };
  },
  2094: function (h, l, f) {
    h.exports = function (a) {
      return a;
    };
  },
  2095: function (h, l, f) {
    var a = f(2160),
      e = f(2161),
      b = f(2162),
      c = /^\s*function[ \n\r\t]+\w/,
      d = /\bthis\b/,
      k = Function.prototype.toString;
    h.exports = function (f) {
      var h = !(b.funcNames ? f.name : b.funcDecomp);
      if (!h) {
        var l = k.call(f);
        b.funcNames || (h = !c.test(l));
        h || ((h = d.test(l) || e(f)), a(f, h));
      }
      return h;
    };
  },
  2096: function (h, l, f) {
    var a = f(2163);
    h.exports = function (e, b, c) {
      var d = -1,
        f = a(e);
      c = c(e);
      for (var g = c.length; ++d < g; ) {
        var h = c[d];
        if (!1 === b(f[h], h, f)) break;
      }
      return e;
    };
  },
  2097: function (h, l, f) {
    var a = f(2164);
    l = f(2161);
    var e = f(2165),
      b = f(2166),
      c = l((c = Object.keys)) && c;
    h.exports = !c
      ? b
      : function (d) {
          if (d)
            var f = d.constructor,
              g = d.length;
          return ("function" == typeof f && f.prototype === d) ||
            ("function" != typeof d && g && a(g))
            ? b(d)
            : e(d)
            ? c(d)
            : [];
        };
  },
  2116: function (h, l, f) {
    var a = f(2164);
    l = f(2161);
    var e = f(2173),
      b = Object.prototype.toString,
      c = l((c = Array.isArray)) && c;
    h.exports =
      c ||
      function (c) {
        return (e(c) && a(c.length) && "[object Array]" == b.call(c)) || !1;
      };
  },
  2157: function (h, l, f) {
    function a(b, c, d, f, g, h) {
      if (b === c) return 0 !== b || 1 / b == 1 / c;
      var l = typeof b,
        w = typeof c;
      return ("function" != l &&
        "object" != l &&
        "function" != w &&
        "object" != w) ||
        null == b ||
        null == c
        ? b !== b && c !== c
        : e(b, c, a, d, f, g, h);
    }
    var e = f(2270);
    h.exports = a;
  },
  2158: function (h, l, f) {
    var a = f(2165);
    h.exports = function (e) {
      return e === e && (0 === e ? 0 < 1 / e : !a(e));
    };
  },
  2159: function (h, l, f) {
    var a = f(2157),
      e = Object.prototype.hasOwnProperty;
    h.exports = function (b, c, d, f, g) {
      var h = c.length;
      if (null == b) return !h;
      for (var l = -1, w = !g; ++l < h; )
        if (w && f[l] ? d[l] !== b[c[l]] : !e.call(b, c[l])) return !1;
      for (l = -1; ++l < h; ) {
        var m = c[l];
        if (w && f[l]) m = e.call(b, m);
        else {
          var p = b[m],
            q = d[l],
            m = g ? g(p, q, m) : void 0;
          "undefined" == typeof m && (m = a(q, p, g, !0));
        }
        if (!m) return !1;
      }
      return !0;
    };
  },
  2160: function (h, l, f) {
    l = f(2094);
    var a = f(2272);
    h.exports = !a
      ? l
      : function (e, b) {
          a.set(e, b);
          return e;
        };
  },
  2161: function (h, l, f) {
    l = f(2271);
    var a = f(2173),
      e = /^\[object .+?Constructor\]$/,
      b = Function.prototype.toString,
      c = Object.prototype.toString,
      d = RegExp(
        "^" +
          l(c).replace(
            /toString|(function).*?(?=\\\()| for .+?(?=\\\])/g,
            "$1.*?"
          ) +
          "$"
      );
    h.exports = function (f) {
      return null == f
        ? !1
        : "[object Function]" == c.call(f)
        ? d.test(b.call(f))
        : (a(f) && e.test(f)) || !1;
    };
  },
  2162: function (h, l, f) {
    (function (a) {
      var e = f(2161),
        b = /\bthis\b/,
        c = Object.prototype,
        d = (d = a.window) && d.document,
        k = c.propertyIsEnumerable,
        g = {};
      (function (c) {
        g.funcDecomp =
          !e(a.WinRTError) &&
          b.test(function () {
            return this;
          });
        g.funcNames = "string" == typeof Function.name;
        try {
          g.dom = 11 === d.createDocumentFragment().nodeType;
        } catch (f) {
          g.dom = !1;
        }
        try {
          g.nonEnumArgs = !k.call(arguments, 1);
        } catch (h) {
          g.nonEnumArgs = !0;
        }
      })(0, 0);
      h.exports = g;
    }).call(
      l,
      (function () {
        return this;
      })()
    );
  },
  2163: function (h, l, f) {
    var a = f(2165);
    h.exports = function (e) {
      return a(e) ? e : Object(e);
    };
  },
  2164: function (h, l, f) {
    var a = Math.pow(2, 53) - 1;
    h.exports = function (e) {
      return "number" == typeof e && -1 < e && 0 == e % 1 && e <= a;
    };
  },
  2165: function (h, l, f) {
    h.exports = function (a) {
      var e = typeof a;
      return "function" == e || (a && "object" == e) || !1;
    };
  },
  2166: function (h, l, f) {
    var a = f(2273),
      e = f(2116),
      b = f(2274),
      c = f(2164),
      d = f(2275),
      k = f(2162),
      g = Object.prototype.hasOwnProperty;
    h.exports = function (f) {
      for (
        var h = d(f),
          l = h.length,
          m = l && f.length,
          p = m && c(m) && (e(f) || (k.nonEnumArgs && a(f))),
          q = -1,
          r = [];
        ++q < l;

      ) {
        var t = h[q];
        ((p && b(t, m)) || g.call(f, t)) && r.push(t);
      }
      return r;
    };
  },
  2173: function (h, l, f) {
    h.exports = function (a) {
      return (a && "object" == typeof a) || !1;
    };
  },
  2270: function (h, l, f) {
    var a = f(2336),
      e = f(2337),
      b = f(2338),
      c = f(2116),
      d = f(2339);
    l = Object.prototype;
    var k = l.hasOwnProperty,
      g = l.toString;
    h.exports = function (f, h, l, m, p, q, r) {
      var t = c(f),
        u = c(h),
        x = "[object Array]",
        B = "[object Array]";
      t ||
        ((x = g.call(f)),
        "[object Arguments]" == x
          ? (x = "[object Object]")
          : "[object Object]" != x && (t = d(f)));
      u ||
        ((B = g.call(h)),
        "[object Arguments]" == B
          ? (B = "[object Object]")
          : "[object Object]" != B && d(h));
      var I = "[object Object]" == x,
        u = "[object Object]" == B;
      if ((B = x == B) && !t && !I) return e(f, h, x);
      x = I && k.call(f, "__wrapped__");
      u = u && k.call(h, "__wrapped__");
      if (x || u) return l(x ? f.value() : f, u ? h.value() : h, m, p, q, r);
      if (!B) return !1;
      q || (q = []);
      r || (r = []);
      for (x = q.length; x--; ) if (q[x] == f) return r[x] == h;
      q.push(f);
      r.push(h);
      f = (t ? a : b)(f, h, l, m, p, q, r);
      q.pop();
      r.pop();
      return f;
    };
  },
  2271: function (h, l, f) {
    var a = f(2340),
      e = /[.*+?^${}()|[\]\/\\]/g,
      b = RegExp(e.source);
    h.exports = function (c) {
      return (c = a(c)) && b.test(c) ? c.replace(e, "\\$&") : c;
    };
  },
  2272: function (h, l, f) {
    (function (a) {
      var e = f(2161)((e = a.WeakMap)) && e;
      a = e && new e();
      h.exports = a;
    }).call(
      l,
      (function () {
        return this;
      })()
    );
  },
  2273: function (h, l, f) {
    var a = f(2164),
      e = f(2173),
      b = Object.prototype.toString;
    h.exports = function (c) {
      var d = e(c) ? c.length : void 0;
      return (a(d) && "[object Arguments]" == b.call(c)) || !1;
    };
  },
  2274: function (h, l, f) {
    var a = Math.pow(2, 53) - 1;
    h.exports = function (e, b) {
      e = +e;
      b = null == b ? a : b;
      return -1 < e && 0 == e % 1 && e < b;
    };
  },
  2275: function (h, l, f) {
    var a = f(2273),
      e = f(2116),
      b = f(2274),
      c = f(2164),
      d = f(2165),
      k = f(2162),
      g = Object.prototype.hasOwnProperty;
    h.exports = function (f) {
      if (null == f) return [];
      d(f) || (f = Object(f));
      for (
        var h = f.length,
          h = (h && c(h) && (e(f) || (k.nonEnumArgs && a(f))) && h) || 0,
          l = f.constructor,
          m = -1,
          l = "function" == typeof l && l.prototype === f,
          p = Array(h),
          q = 0 < h;
        ++m < h;

      )
        p[m] = m + "";
      for (var r in f)
        (!q || !b(r, h)) &&
          !("constructor" == r && (l || !g.call(f, r))) &&
          p.push(r);
      return p;
    };
  },
  2336: function (h, l, f) {
    h.exports = function (a, e, b, c, d, f, g) {
      var h = -1,
        l = a.length,
        w = e.length,
        m = !0;
      if (l != w && !(d && w > l)) return !1;
      for (; m && ++h < l; ) {
        var p = a[h],
          q = e[h],
          m = void 0;
        c && (m = d ? c(q, p, h) : c(p, q, h));
        if ("undefined" == typeof m)
          if (d)
            for (
              var r = w;
              r-- && !((q = e[r]), (m = (p && p === q) || b(p, q, c, d, f, g)));

            );
          else m = (p && p === q) || b(p, q, c, d, f, g);
      }
      return !!m;
    };
  },
  2337: function (h, l, f) {
    h.exports = function (a, e, b) {
      switch (b) {
        case "[object Boolean]":
        case "[object Date]":
          return +a == +e;
        case "[object Error]":
          return a.name == e.name && a.message == e.message;
        case "[object Number]":
          return a != +a ? e != +e : 0 == a ? 1 / a == 1 / e : a == +e;
        case "[object RegExp]":
        case "[object String]":
          return a == e + "";
      }
      return !1;
    };
  },
  2338: function (h, l, f) {
    var a = f(2097),
      e = Object.prototype.hasOwnProperty;
    h.exports = function (b, c, d, f, g, h, l) {
      var w = a(b),
        m = w.length,
        p = a(c).length;
      if (m != p && !g) return !1;
      for (var q, p = -1; ++p < m; ) {
        var r = w[p],
          t = e.call(c, r);
        if (t) {
          var u = b[r],
            x = c[r],
            t = void 0;
          f && (t = g ? f(x, u, r) : f(u, x, r));
          "undefined" == typeof t &&
            (t = (u && u === x) || d(u, x, f, g, h, l));
        }
        if (!t) return !1;
        q || (q = "constructor" == r);
      }
      return !q &&
        ((d = b.constructor),
        (f = c.constructor),
        d != f &&
          "constructor" in b &&
          "constructor" in c &&
          !(
            "function" == typeof d &&
            d instanceof d &&
            "function" == typeof f &&
            f instanceof f
          ))
        ? !1
        : !0;
    };
  },
  2339: function (h, l, f) {
    var a = f(2164),
      e = f(2173),
      b = {};
    b["[object Float32Array]"] =
      b["[object Float64Array]"] =
      b["[object Int8Array]"] =
      b["[object Int16Array]"] =
      b["[object Int32Array]"] =
      b["[object Uint8Array]"] =
      b["[object Uint8ClampedArray]"] =
      b["[object Uint16Array]"] =
      b["[object Uint32Array]"] =
        !0;
    b["[object Arguments]"] =
      b["[object Array]"] =
      b["[object ArrayBuffer]"] =
      b["[object Boolean]"] =
      b["[object Date]"] =
      b["[object Error]"] =
      b["[object Function]"] =
      b["[object Map]"] =
      b["[object Number]"] =
      b["[object Object]"] =
      b["[object RegExp]"] =
      b["[object Set]"] =
      b["[object String]"] =
      b["[object WeakMap]"] =
        !1;
    var c = Object.prototype.toString;
    h.exports = function (d) {
      return (e(d) && a(d.length) && b[c.call(d)]) || !1;
    };
  },
  2340: function (h, l, f) {
    h.exports = function (a) {
      return "string" == typeof a ? a : null == a ? "" : a + "";
    };
  },
});
