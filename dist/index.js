import { ElTreeSelect as Dt, ElTimeSelect as Nt, ElTimePicker as Ut, ElCascader as jt, ElSlider as Kt, ElRate as Wt, ElDatePicker as ge, ElRadioGroup as Zt, ElCheckboxGroup as Gt, ElCheckbox as re, ElSwitch as Yt, ElSelect as qt, ElInputNumber as Xt, ElInputTag as Jt, ElInput as Qt, ElForm as Ye, ElRow as qe, ElCol as Be, ElFormItem as Xe, ElOption as Je, ElRadio as Qe, ElButton as ce, ElIcon as et, ElTooltip as eo, ElDropdown as tt, ElDropdownMenu as ot, ElDropdownItem as at, ElPopover as Ne, ElScrollbar as to, ElCard as oo, ElTable as ao, ElEmpty as lo, ElTableColumn as be, ElPagination as ro, ElDialog as no, ElMessage as Ue, ElUpload as so, ElLoadingDirective as uo } from "element-plus";
import { inject as Ie, ref as $, computed as h, toRaw as Ee, defineComponent as G, useTemplateRef as Re, watch as lt, toRefs as rt, openBlock as r, createElementBlock as w, normalizeClass as X, createVNode as O, unref as a, mergeProps as M, withCtx as u, Fragment as Z, renderList as W, createBlock as c, createSlots as ae, renderSlot as N, resolveDynamicComponent as oe, createCommentVNode as k, toDisplayString as U, createElementVNode as K, normalizeStyle as pe, createTextVNode as q, useAttrs as nt, useModel as he, onMounted as io, onUnmounted as co, isRef as xe, mergeModels as le, getCurrentInstance as fo, useSlots as ho, watchEffect as po, resolveDirective as mo, withDirectives as je, vShow as vo, normalizeProps as _e, guardReactiveProps as Ae, nextTick as st, readonly as go } from "vue";
import { defineStore as bo, storeToRefs as ut } from "pinia";
import { useWindowSize as it, useResizeObserver as Ke, useThrottleFn as yo } from "@vueuse/core";
import { ArrowUpBold as wo, ArrowDownBold as So, Loading as ko } from "@element-plus/icons-vue";
import { useI18n as ze } from "vue-i18n";
import { VueDraggable as xo } from "vue-draggable-plus";
import { Icon as Bo } from "@iconify/vue";
import * as ie from "xlsx";
import Eo from "file-saver";
const _o = { cancel: "取消", confirm: "确定" }, Ao = { form: { reset: "重置", submit: "提交" }, searchBar: { reset: "重置", search: "查询", expand: "展开", collapse: "收起" }, selection: "选择", sizeOptions: { small: "紧凑", default: "默认", large: "宽松" }, column: { selection: "勾选", expand: "展开", index: "序号" }, header: { search: "搜索", refresh: "刷新", size: "表格大小", fullscreen: "全屏", columns: "列设置", settings: "其他设置" }, zebra: "斑马纹", border: "边框", headerBackground: "表头背景" }, Co = {
  common: _o,
  table: Ao
}, To = { cancel: "Cancel", confirm: "Confirm" }, Oo = { form: { reset: "Reset", submit: "Submit" }, searchBar: { reset: "Reset", search: "Search", expand: "Expand", collapse: "Collapse" }, selection: "Select", sizeOptions: { small: "Compact", default: "Default", large: "Loose" }, column: { selection: "Select", expand: "Expand", index: "Index" }, header: { search: "Search", refresh: "Refresh", size: "Table Size", fullscreen: "Fullscreen", columns: "Column Settings", settings: "Settings" }, zebra: "Zebra", border: "Border", headerBackground: "Header BG" }, Io = {
  common: To,
  table: Oo
}, Ro = "1", ct = /* @__PURE__ */ Symbol("ao-admin-auth-list"), zo = () => {
  const e = Ie(ct, () => {
  });
  return { hasAuth: (l) => l ? e()?.includes(l) ?? !1 : !1 };
}, dt = /* @__PURE__ */ Symbol("ao-admin-local-svg"), ft = /* @__PURE__ */ Symbol("ao-admin-logo-url");
var fe = /* @__PURE__ */ ((e) => (e.DEFAULT = "default", e.SMALL = "small", e.LARGE = "large", e))(fe || {});
const Ce = bo(
  "tableStore",
  () => {
    const e = $(fe.DEFAULT), o = $(!1), l = $(!1), t = $(!1), n = $(!1);
    return {
      tableSize: e,
      isZebra: o,
      isBorder: l,
      isHeaderBackground: t,
      setTableSize: (S) => e.value = S,
      setIsZebra: (S) => o.value = S,
      setIsBorder: (S) => l.value = S,
      setIsHeaderBackground: (S) => t.value = S,
      isFullScreen: n,
      setIsFullScreen: (S) => n.value = S
    };
  },
  {
    persist: {
      key: "table",
      storage: localStorage
    }
  }
), $o = () => {
  const e = document.getElementById("app-main");
  e ? e.scrollTop = 0 : window.scrollTo(0, 0);
};
class ye {
  constructor(o) {
    this.options = o;
  }
  options;
  // 常量配置
  static DEFAULT_TABLE_HEADER_HEIGHT = 44;
  static TABLE_HEADER_SPACING = 10;
  /**
   * 计算容器高度
   */
  calculate() {
    const o = this.calculateOffset();
    return {
      height: o === 0 ? "100%" : `calc(100% - ${o}px)`
    };
  }
  /**
   * 计算偏移量
   */
  calculateOffset() {
    if (!this.options.showTableHeader.value)
      return this.calculateBottomBarOffset();
    const o = this.getHeaderHeight(), l = this.calculateBottomBarOffset();
    return o + l + ye.TABLE_HEADER_SPACING;
  }
  /**
   * 获取表格头部高度
   */
  getHeaderHeight() {
    return this.options.tableHeaderHeight.value || ye.DEFAULT_TABLE_HEADER_HEIGHT;
  }
  /**
   * 计算底部栏偏移量
   */
  calculateBottomBarOffset() {
    const { bottomBarHeight: o, bottomBarSpacing: l } = this.options;
    return o.value === 0 ? 0 : o.value + l.value;
  }
}
function Vo(e) {
  return {
    /** 容器高度样式对象 */
    containerHeight: h(() => new ye(e).calculate())
  };
}
const We = {
  input: Qt,
  // 输入框
  inputtag: Jt,
  // 标签输入框
  number: Xt,
  // 数字输入框
  select: qt,
  // 选择器
  switch: Yt,
  // 开关
  checkbox: re,
  // 复选框
  checkboxgroup: Gt,
  // 复选框组
  radiogroup: Zt,
  // 单选框组
  date: ge,
  // 日期选择器
  daterange: ge,
  // 日期范围选择器
  datetime: ge,
  // 日期时间选择器
  datetimerange: ge,
  // 日期时间范围选择器
  rate: Wt,
  // 评分
  slider: Kt,
  // 滑块
  cascader: jt,
  // 级联选择器
  timepicker: Ut,
  // 时间选择器
  timeselect: Nt,
  // 时间选择
  treeselect: Dt
  // 树选择器
}, Lo = [
  "label",
  "labelWidth",
  "key",
  "type",
  "hidden",
  "span",
  "slots",
  "render",
  "options"
], Po = ["select", "checkboxgroup", "radiogroup"], Mo = "title", Ze = (e) => e.type === Mo, Ho = (e, o) => Lo.includes(e) ? e === "options" ? Po.includes(o ?? "") : !0 : !1, we = {
  removeEmptyString: !0,
  removeEmptyArray: !0,
  removeEmptyObject: !0,
  removeEmptyRichText: !0,
  keepZero: !0,
  keepFalse: !0
}, Fo = /^\d+$/, $e = (e) => e.split(".").filter(Boolean).map((o) => Fo.test(o) ? Number(o) : o), te = (e) => {
  if (!e) return {};
  const o = (l) => {
    if (Array.isArray(l))
      return l.map((t) => o(t));
    if (l && typeof l == "object") {
      const t = Ee(l);
      return Object.keys(t).reduce((n, s) => (n[s] = o(t[s]), n), {});
    }
    return l;
  };
  return o(Ee(e));
}, ht = (e, o) => $e(o).reduce((l, t) => {
  if (l != null)
    return l[t];
}, e), Do = (e, o) => {
  const l = $e(o);
  if (!l.length) return;
  const t = l.pop(), n = l.reduce((s, i) => {
    if (s != null)
      return s[i];
  }, e);
  n != null && t !== void 0 && delete n[t];
}, pt = (e, o, l) => {
  const t = l === "" ? void 0 : l;
  if (t === void 0) {
    Do(e, o);
    return;
  }
  const n = $e(o);
  if (!n.length) return;
  let s = e;
  n.forEach((i, d) => {
    if (d === n.length - 1) {
      s[i] = t;
      return;
    }
    const S = typeof n[d + 1] == "number" ? [] : {};
    (s[i] === null || s[i] === void 0 || typeof s[i] != "object") && (s[i] = S), s = s[i];
  });
}, No = (e) => /<(img|video|audio|iframe|embed|object)\b/i.test(e) ? !1 : e.replace(/&nbsp;/gi, "").replace(/<br\s*\/?>/gi, "").replace(/<[^>]*>/g, "").trim() === "", Te = (e, o = we) => {
  if (Array.isArray(e)) {
    const l = e.map((t) => Te(t, o)).filter((t) => t !== void 0);
    return l.length === 0 && o.removeEmptyArray ? void 0 : l;
  }
  if (e && typeof e == "object") {
    const l = Ee(e), t = Object.entries(l).reduce(
      (n, [s, i]) => {
        const d = Te(i, o);
        return d !== void 0 && (n[s] = d), n;
      },
      {}
    );
    return Object.keys(t).length === 0 && o.removeEmptyObject ? void 0 : t;
  }
  return typeof e == "string" ? o.removeEmptyString && e.trim() === "" || o.removeEmptyRichText && No(e) ? void 0 : e : e === 0 ? o.keepZero ? e : void 0 : e === !1 ? o.keepFalse ? e : void 0 : e ?? void 0;
}, Oe = (e, o = we) => Te(te(e), o) || {}, mt = (e) => e.props ? e.props : Object.fromEntries(
  Object.entries(e).filter(([o]) => !Ho(o, e.type))
), Y = (e) => {
  const o = e.props?.options ?? e.options;
  return Array.isArray(o) ? o : [];
}, vt = (e) => {
  if (!e.slots) return {};
  const o = {};
  return Object.entries(e.slots).forEach(([l, t]) => {
    t && (o[l] = t);
  }), o;
}, gt = (e) => {
  if (e.render)
    return e.render;
  const o = e.type ? We[e.type] : void 0;
  return o || We.input;
}, Uo = {
  xs: { threshold: 12, fallback: 24 },
  // 手机：小于 12 时使用满宽
  sm: { threshold: 12, fallback: 12 },
  // 平板：小于 12 时使用半宽
  md: { threshold: 8, fallback: 8 },
  // 中等屏幕：小于 8 时使用三分之一宽
  lg: null,
  // 大屏幕：直接使用设置的 span
  xl: null
  // 超大屏幕：直接使用设置的 span
};
function bt(e, o) {
  const l = Uo[o];
  return l ? e >= l.threshold ? e : l.fallback : e;
}
const jo = 500, Ko = 6, Wo = (e, o) => {
  const l = o && o > 0 ? o : 24, t = (e ?? Ko) / l * 24;
  return Math.min(24, Math.max(1, Math.round(t)));
}, Zo = (e, o, l) => e ? "flex-end" : o <= (l ?? 2) ? "flex-start" : "flex-end", Go = { key: 1 }, Yo = { class: "form-buttons" }, qo = { class: "icon-wrapper" }, Xo = /* @__PURE__ */ G({
  name: "AoSearchBar",
  __name: "AoSearchBar",
  props: {
    items: { default: () => [] },
    modelValue: { default: () => ({}) },
    span: { default: 6 },
    gutter: { default: 12 },
    isExpand: { type: Boolean, default: !1 },
    defaultExpanded: { type: Boolean, default: !1 },
    labelPosition: { default: "right" },
    labelWidth: { default: "70px" },
    showExpand: { type: Boolean, default: !0 },
    buttonLeftLimit: { default: 2 },
    showReset: { type: Boolean, default: !0 },
    showSearch: { type: Boolean, default: !0 },
    disabledSearch: { type: Boolean, default: !1 },
    sanitizeOutput: { default: () => ({}) }
  },
  emits: ["reset", "search", "update:modelValue"],
  setup(e, { expose: o, emit: l }) {
    const t = e, n = l, { width: s } = it(), { t: i } = ze(), d = h(() => s.value < jo), z = Re("formRef"), f = $(te(t.modelValue)), S = $(te(t.modelValue));
    let I;
    lt(
      () => t.modelValue,
      (A) => {
        A !== I && (f.value = te(A), S.value = te(A));
      }
    );
    const V = $(t.defaultExpanded), H = h(() => ({
      ...we,
      ...t.sanitizeOutput
    })), m = (A) => ht(f.value, A), v = (A, ee) => {
      pt(f.value, A, ee), I = f.value, n("update:modelValue", f.value);
    }, _ = (A, ee) => bt(A ?? Q.value, ee), x = h(() => {
      const A = t.items.filter((g) => !g.hidden);
      if (!t.isExpand && !V.value) {
        const g = Math.floor(24 / t.span) - 1;
        return A.slice(0, g);
      }
      return A;
    }), C = h(() => {
      const A = t.items.filter((ee) => !ee.hidden);
      return !t.isExpand && t.showExpand && A.length > Math.floor(24 / t.span) - 1;
    }), R = h(() => V.value ? i("table.searchBar.collapse") : i("table.searchBar.expand")), B = h(() => ({
      "justify-content": Zo(
        d.value,
        t.items.filter((A) => !A.hidden).length,
        t.buttonLeftLimit
      )
    })), T = () => {
      V.value = !V.value;
    }, p = () => {
      z.value?.resetFields(), Object.keys(f.value).forEach((A) => {
        delete f.value[A];
      }), Object.assign(f.value, te(S.value)), I = f.value, n("update:modelValue", f.value), n("reset");
    }, L = () => {
      n(
        "search",
        Oe(f.value, H.value)
      );
    };
    o({
      validate: (...A) => z.value.validate(...A),
      reset: p,
      // 允许外部在手动组装请求前直接读取清洗后的参数。
      getOutput: () => Oe(f.value, H.value)
    });
    const { span: Q, gutter: E, labelPosition: D, labelWidth: y } = rt(t);
    return (A, ee) => (r(), w("section", {
      class: X(["ao-search-bar ao-card-xs", { "is-expanded": V.value }])
    }, [
      O(a(Ye), M({
        ref: "formRef",
        model: f.value,
        "label-position": a(D)
      }, { ...A.$attrs }), {
        default: u(() => [
          O(a(qe), { gutter: a(E) }, {
            default: u(() => [
              (r(!0), w(Z, null, W(x.value, (g) => (r(), c(a(Be), {
                key: g.key,
                xs: _(g.span, "xs"),
                sm: _(g.span, "sm"),
                md: _(g.span, "md"),
                lg: _(g.span, "lg"),
                xl: _(g.span, "xl")
              }, {
                default: u(() => [
                  O(a(Xe), {
                    prop: g.key,
                    "label-width": g.label ? g.labelWidth || a(y) : void 0
                  }, ae({
                    default: u(() => [
                      N(A.$slots, g.key, {
                        item: g,
                        modelValue: f.value
                      }, () => [
                        (r(), c(oe(a(gt)(g)), M({
                          "model-value": m(g.key),
                          "onUpdate:modelValue": (j) => v(g.key, j)
                        }, { ref_for: !0 }, a(mt)(g)), ae({
                          default: u(() => [
                            g.type === "select" && a(Y)(g).length ? (r(!0), w(Z, { key: 0 }, W(a(Y)(g), (j) => (r(), c(a(Je), M({ ref_for: !0 }, j, {
                              key: String(j.value)
                            }), null, 16))), 128)) : k("", !0),
                            g.type === "checkboxgroup" && a(Y)(g).length ? (r(!0), w(Z, { key: 1 }, W(a(Y)(g), (j) => (r(), c(a(re), M({ ref_for: !0 }, j, {
                              key: String(j.value)
                            }), null, 16))), 128)) : k("", !0),
                            g.type === "radiogroup" && a(Y)(g).length ? (r(!0), w(Z, { key: 2 }, W(a(Y)(g), (j) => (r(), c(a(Qe), M({ ref_for: !0 }, j, {
                              key: String(j.value)
                            }), null, 16))), 128)) : k("", !0)
                          ]),
                          _: 2
                        }, [
                          W(a(vt)(g), (j, Se) => ({
                            name: Se,
                            fn: u(() => [
                              (r(), c(oe(j)))
                            ])
                          }))
                        ]), 1040, ["model-value", "onUpdate:modelValue"]))
                      ], !0)
                    ]),
                    _: 2
                  }, [
                    g.label ? {
                      name: "label",
                      fn: u(() => [
                        typeof g.label != "string" ? (r(), c(oe(g.label), { key: 0 })) : (r(), w("span", Go, U(g.label), 1))
                      ]),
                      key: "0"
                    } : void 0
                  ]), 1032, ["prop", "label-width"])
                ]),
                _: 2
              }, 1032, ["xs", "sm", "md", "lg", "xl"]))), 128)),
              O(a(Be), {
                xs: 24,
                sm: 24,
                md: a(Q),
                lg: a(Q),
                xl: a(Q),
                class: "action-column"
              }, {
                default: u(() => [
                  K("div", {
                    class: "action-buttons-wrapper",
                    style: pe(B.value)
                  }, [
                    K("div", Yo, [
                      e.showReset ? (r(), c(a(ce), {
                        key: 0,
                        class: "reset-button",
                        onClick: p
                      }, {
                        default: u(() => [
                          q(U(a(i)("table.searchBar.reset")), 1)
                        ]),
                        _: 1
                      })) : k("", !0),
                      e.showSearch ? (r(), c(a(ce), {
                        key: 1,
                        type: "primary",
                        class: "search-button",
                        onClick: L,
                        disabled: e.disabledSearch
                      }, {
                        default: u(() => [
                          q(U(a(i)("table.searchBar.search")), 1)
                        ]),
                        _: 1
                      }, 8, ["disabled"])) : k("", !0)
                    ]),
                    C.value ? (r(), w("div", {
                      key: 0,
                      class: "filter-toggle",
                      onClick: T
                    }, [
                      K("span", null, U(R.value), 1),
                      K("div", qo, [
                        O(a(et), null, {
                          default: u(() => [
                            V.value ? (r(), c(a(wo), { key: 0 })) : (r(), c(a(So), { key: 1 }))
                          ]),
                          _: 1
                        })
                      ])
                    ])) : k("", !0)
                  ], 4)
                ]),
                _: 1
              }, 8, ["md", "lg", "xl"])
            ]),
            _: 3
          }, 8, ["gutter"])
        ]),
        _: 3
      }, 16, ["model", "label-position"])
    ], 2));
  }
}), J = (e, o) => {
  const l = e.__vccOpts || e;
  for (const [t, n] of o)
    l[t] = n;
  return l;
}, Jo = /* @__PURE__ */ J(Xo, [["__scopeId", "data-v-7d216e4e"]]), Qo = ["src"], ea = /* @__PURE__ */ G({
  name: "AoSvgIcon",
  inheritAttrs: !1,
  __name: "AoSvgIcon",
  props: {
    icon: {},
    size: { default: "1em" }
  },
  setup(e) {
    const o = e, l = Ie(dt, () => {
    });
    function t(d) {
      if (!(!d || d.includes(":")))
        return l(d);
    }
    const n = nt(), s = h(() => t(o.icon)), i = h(() => ({
      class: n.class || "",
      style: [n.style, { width: o.size, height: o.size }]
    }));
    return (d, z) => s.value ? (r(), w("img", M({
      key: 0,
      src: s.value
    }, i.value, {
      class: "ao-svg-icon",
      alt: ""
    }), null, 16, Qo)) : o.icon ? (r(), c(a(Bo), M({
      key: 1,
      icon: o.icon
    }, i.value, { class: "ao-svg-icon" }), null, 16, ["icon"])) : k("", !0);
  }
}), me = /* @__PURE__ */ J(ea, [["__scopeId", "data-v-9818fa03"]]), ta = /* @__PURE__ */ G({
  name: "AoTableHeaderButton",
  __name: "AoTableHeaderButton",
  props: {
    icon: {},
    content: { default: "" },
    active: { type: Boolean, default: !1 },
    loading: { type: Boolean, default: !1 }
  },
  emits: ["click"],
  setup(e, { emit: o }) {
    const l = e, t = o, n = $(), s = h(() => l.loading ? "is-loading-icon" : l.active ? "is-active-icon" : "is-icon"), i = (d) => {
      t("click", d);
    };
    return (d, z) => (r(), w("div", {
      ref_key: "triggerRef",
      ref: n,
      class: X(["button", { "is-active": e.active }]),
      onClick: i
    }, [
      O(me, {
        icon: e.icon,
        size: "1rem",
        class: X(s.value)
      }, null, 8, ["icon", "class"]),
      e.content ? (r(), c(a(eo), {
        key: 0,
        "virtual-ref": n.value,
        "virtual-triggering": "",
        content: e.content,
        placement: "top",
        "show-after": 500
      }, null, 8, ["virtual-ref", "content"])) : k("", !0)
    ], 2));
  }
}), ue = /* @__PURE__ */ J(ta, [["__scopeId", "data-v-8e84760f"]]), oa = { class: "table-header-root" }, aa = { class: "left-wrap" }, la = { class: "right-wrap" }, ra = /* @__PURE__ */ G({
  name: "AoTableHeader",
  __name: "AoTableHeader",
  props: /* @__PURE__ */ le({
    showZebra: { type: Boolean, default: !0 },
    showBorder: { type: Boolean, default: !0 },
    showHeaderBackground: { type: Boolean, default: !0 },
    fullClass: { default: "ao-page-view" },
    layout: { default: "search,refresh,size,fullscreen,columns,settings" },
    loading: { type: Boolean },
    showSearchBar: { type: Boolean, default: void 0 }
  }, {
    columns: {
      required: !1,
      default: () => []
    },
    columnsModifiers: {}
  }),
  emits: /* @__PURE__ */ le(["refresh", "search", "update:showSearchBar"], ["update:columns"]),
  setup(e, { emit: o }) {
    const { t: l } = ze(), t = e, n = he(e, "columns"), s = o, i = (E) => E.visible !== void 0 ? E.visible : E.checked ?? !0, d = (E, D) => {
      const y = !!D;
      E.checked = y, E.visible = y;
    }, z = [
      { value: fe.SMALL, label: l("table.sizeOptions.small") },
      { value: fe.DEFAULT, label: l("table.sizeOptions.default") },
      { value: fe.LARGE, label: l("table.sizeOptions.large") }
    ], f = Ce(), { tableSize: S, isZebra: I, isBorder: V, isHeaderBackground: H } = ut(f), m = h(() => t.layout.split(",").map((E) => E.trim())), v = (E) => m.value.includes(E), _ = (E) => {
      const D = E.related;
      return !(D && D.classList.contains("fixed-column"));
    }, x = () => {
      s("update:showSearchBar", !t.showSearchBar), s("search");
    }, C = () => {
      B.value = !0, s("refresh");
    }, R = (E) => {
      Ce().setTableSize(E);
    }, B = $(!1), T = $(!1), p = $(""), L = () => {
      const E = document.querySelector(`.${t.fullClass}`);
      E && (T.value = !T.value, T.value ? (p.value = document.body.style.overflow, document.body.style.overflow = "hidden", E.classList.add("el-full-screen"), f.setIsFullScreen(!0)) : (document.body.style.overflow = p.value, E.classList.remove("el-full-screen"), f.setIsFullScreen(!1)));
    }, Q = (E) => {
      E.key === "Escape" && T.value && L();
    };
    return io(() => {
      document.addEventListener("keydown", Q);
    }), co(() => {
      if (document.removeEventListener("keydown", Q), T.value) {
        document.body.style.overflow = p.value;
        const E = document.querySelector(`.${t.fullClass}`);
        E && E.classList.remove("el-full-screen");
      }
    }), (E, D) => (r(), w("div", oa, [
      K("div", aa, [
        N(E.$slots, "left", {}, void 0, !0)
      ]),
      K("div", la, [
        N(E.$slots, "right", {}, void 0, !0),
        e.showSearchBar != null ? (r(), c(ue, {
          key: 0,
          icon: "ri:search-line",
          content: a(l)("table.header.search"),
          active: e.showSearchBar,
          onClick: x
        }, null, 8, ["content", "active"])) : k("", !0),
        v("refresh") ? (r(), c(ue, {
          key: 1,
          icon: "ri:refresh-line",
          content: a(l)("table.header.refresh"),
          loading: e.loading && B.value,
          onClick: C
        }, null, 8, ["content", "loading"])) : k("", !0),
        v("size") ? (r(), c(a(tt), {
          key: 2,
          onCommand: R
        }, {
          dropdown: u(() => [
            O(a(ot), null, {
              default: u(() => [
                (r(), w(Z, null, W(z, (y) => K("div", {
                  key: y.value,
                  class: X(["table-size-btn-item", { "is-current-size": a(S) === y.value }])
                }, [
                  (r(), c(a(at), {
                    key: y.value,
                    command: y.value
                  }, {
                    default: u(() => [
                      q(U(y.label), 1)
                    ]),
                    _: 2
                  }, 1032, ["command"]))
                ], 2)), 64))
              ]),
              _: 1
            })
          ]),
          default: u(() => [
            O(ue, {
              icon: "ri:arrow-up-down-fill",
              content: a(l)("table.header.size")
            }, null, 8, ["content"])
          ]),
          _: 1
        })) : k("", !0),
        v("fullscreen") ? (r(), c(ue, {
          key: 3,
          icon: T.value ? "ri:fullscreen-exit-line" : "ri:fullscreen-line",
          content: a(l)("table.header.fullscreen"),
          onClick: L
        }, null, 8, ["icon", "content"])) : k("", !0),
        v("columns") ? (r(), c(a(Ne), {
          key: 4,
          placement: "bottom",
          trigger: "click"
        }, {
          reference: u(() => [
            O(ue, {
              icon: "ri:align-right",
              content: a(l)("table.header.columns")
            }, null, 8, ["content"])
          ]),
          default: u(() => [
            K("div", null, [
              O(a(to), { "max-height": "380px" }, {
                default: u(() => [
                  O(a(xo), {
                    modelValue: n.value,
                    "onUpdate:modelValue": D[0] || (D[0] = (y) => n.value = y),
                    disabled: !1,
                    filter: ".fixed-column",
                    "prevent-on-filter": !1,
                    onMove: _
                  }, {
                    default: u(() => [
                      (r(!0), w(Z, null, W(n.value, (y) => (r(), w("div", {
                        key: y.columnKey || y.prop || y.type,
                        class: X(["column-option", { "fixed-column": y.fixed }])
                      }, [
                        K("div", {
                          class: X(["drag-icon", y.fixed ? "is-fixed" : "is-movable"])
                        }, [
                          O(me, {
                            icon: y.fixed ? "ri:unpin-line" : "ri:drag-move-2-fill",
                            class: "drag-icon-svg"
                          }, null, 8, ["icon"])
                        ], 2),
                        O(a(re), {
                          "model-value": i(y),
                          "onUpdate:modelValue": (A) => d(y, A),
                          disabled: y.disabled,
                          class: "column-checkbox"
                        }, {
                          default: u(() => [
                            q(U(y.label || (y.type === "selection" ? a(l)("table.selection") : "")), 1)
                          ]),
                          _: 2
                        }, 1032, ["model-value", "onUpdate:modelValue", "disabled"])
                      ], 2))), 128))
                    ]),
                    _: 1
                  }, 8, ["modelValue"])
                ]),
                _: 1
              })
            ])
          ]),
          _: 1
        })) : k("", !0),
        v("settings") ? (r(), c(a(Ne), {
          key: 5,
          placement: "bottom",
          trigger: "click"
        }, {
          reference: u(() => [
            O(ue, {
              icon: "ri:settings-line",
              content: a(l)("table.header.settings")
            }, null, 8, ["content"])
          ]),
          default: u(() => [
            K("div", null, [
              e.showZebra ? (r(), c(a(re), {
                key: 0,
                modelValue: a(I),
                "onUpdate:modelValue": D[1] || (D[1] = (y) => xe(I) ? I.value = y : null),
                value: !0
              }, {
                default: u(() => [
                  q(U(a(l)("table.zebra")), 1)
                ]),
                _: 1
              }, 8, ["modelValue"])) : k("", !0),
              e.showBorder ? (r(), c(a(re), {
                key: 1,
                modelValue: a(V),
                "onUpdate:modelValue": D[2] || (D[2] = (y) => xe(V) ? V.value = y : null),
                value: !0
              }, {
                default: u(() => [
                  q(U(a(l)("table.border")), 1)
                ]),
                _: 1
              }, 8, ["modelValue"])) : k("", !0),
              e.showHeaderBackground ? (r(), c(a(re), {
                key: 2,
                modelValue: a(H),
                "onUpdate:modelValue": D[3] || (D[3] = (y) => xe(H) ? H.value = y : null),
                value: !0
              }, {
                default: u(() => [
                  q(U(a(l)("table.headerBackground")), 1)
                ]),
                _: 1
              }, 8, ["modelValue"])) : k("", !0)
            ])
          ]),
          _: 1
        })) : k("", !0)
      ])
    ]));
  }
}), na = /* @__PURE__ */ J(ra, [["__scopeId", "data-v-d65192e3"]]), sa = { key: 0 }, ua = { class: "ao-table-bottom__left" }, ia = {
  key: 0,
  class: "pagination custom-pagination"
}, ca = /* @__PURE__ */ G({
  name: "AoTable",
  __name: "index",
  props: /* @__PURE__ */ le({
    data: {},
    columns: { default: () => [] },
    pagination: {},
    loading: { type: Boolean },
    paginationOptions: {},
    emptyHeight: { default: "100%" },
    emptyText: { default: "暂无数据" },
    showTableHeader: { type: Boolean, default: !0 },
    searchItems: { default: () => [] },
    searchRules: {},
    searchSpan: {},
    searchShowExpand: { type: Boolean, default: void 0 },
    showSearchBar: { type: Boolean, default: void 0 },
    headerShowZebra: { type: Boolean, default: void 0 },
    headerShowBorder: { type: Boolean, default: void 0 },
    headerShowHeaderBackground: { type: Boolean, default: void 0 },
    integrated: { type: Boolean, default: void 0 },
    size: { default: void 0 },
    width: {},
    height: {},
    maxHeight: {},
    fit: { type: Boolean, default: !0 },
    stripe: { type: Boolean, default: void 0 },
    border: { type: Boolean, default: void 0 },
    rowKey: {},
    context: {},
    showHeader: { type: Boolean, default: !0 },
    showSummary: { type: Boolean },
    sumText: {},
    summaryMethod: {},
    rowClassName: {},
    rowStyle: {},
    cellClassName: {},
    cellStyle: {},
    headerRowClassName: {},
    headerRowStyle: {},
    headerCellClassName: {},
    headerCellStyle: {},
    highlightCurrentRow: { type: Boolean },
    currentRowKey: {},
    expandRowKeys: {},
    defaultExpandAll: { type: Boolean },
    rowExpandable: {},
    defaultSort: {},
    tooltipEffect: {},
    tooltipOptions: {},
    spanMethod: {},
    selectOnIndeterminate: { type: Boolean },
    indent: {},
    treeProps: {},
    lazy: { type: Boolean },
    load: {},
    className: {},
    style: { type: [Boolean, null, String, Object, Array] },
    tableLayout: {},
    scrollbarAlwaysOn: { type: Boolean },
    flexible: { type: Boolean },
    showOverflowTooltip: { type: [Boolean, Object] },
    tooltipFormatter: {},
    appendFilterPanelTo: {},
    scrollbarTabindex: {},
    allowDragLastColumn: { type: Boolean },
    preserveExpandedContent: { type: Boolean },
    nativeScrollbar: { type: Boolean }
  }, {
    searchForm: {
      default: () => ({})
    },
    searchFormModifiers: {},
    columnChecks: {
      default: () => []
    },
    columnChecksModifiers: {}
  }),
  emits: /* @__PURE__ */ le(["size-change", "current-change", "refresh", "search", "reset", "update:showSearchBar"], ["update:searchForm", "update:columnChecks"]),
  setup(e, { expose: o, emit: l }) {
    const t = e, n = he(e, "searchForm"), s = he(e, "columnChecks"), i = fo(), d = nt(), z = ho(), { width: f } = it(), S = $(null), I = $(), V = $(), H = Ce(), { isBorder: m, isZebra: v, tableSize: _, isFullScreen: x, isHeaderBackground: C } = ut(H), R = $(null), B = $(null), T = {
      MOBILE: "prev, pager, next, sizes, jumper, total",
      IPAD: "prev, pager, next, jumper, total",
      DESKTOP: "total, prev, pager, next, sizes, jumper"
    }, p = h(() => f.value < 768 ? T.MOBILE : f.value < 1024 ? T.IPAD : T.DESKTOP), L = h(() => ({
      background: !0,
      hideOnSinglePage: !1,
      size: "default",
      pagerCount: f.value > 1200 ? 7 : 5,
      layout: p.value,
      ...t.paginationOptions
    })), Q = h(() => t.border ?? m.value), E = h(() => t.stripe ?? v.value), D = h(() => t.size ?? _.value), y = h(() => t.data?.length === 0), A = h(() => t.pagination?.currentPage ?? 1), ee = h(() => t.pagination?.pageSize ?? 10), g = h(() => t.pagination?.total ?? 0), j = h(() => (t.searchItems?.length ?? 0) > 0), Se = h(() => !!(z["header-left"] || z["header-right"])), ve = h(
      () => t.integrated ?? (j.value || Se.value)
    ), Ve = $(!0), Le = h(() => t.showSearchBar ?? Ve.value), yt = h(
      () => j.value ? Le.value : void 0
    ), wt = h(() => ve.value && t.showTableHeader), St = h(() => ve.value ? "is-integrated" : "is-bare"), kt = h(() => ve.value ? oo : "div"), xt = h(() => ve.value ? "ao-table-card" : "ao-table-bare"), Pe = $(0), Me = $(0);
    Ke(I, (b) => {
      const F = b[0];
      F && requestAnimationFrame(() => {
        Pe.value = F.contentRect.height;
      });
    }), Ke(V, (b) => {
      const F = b[0];
      F && requestAnimationFrame(() => {
        Me.value = F.contentRect.height;
      });
    });
    const Bt = $(10), { containerHeight: Et } = Vo({
      showTableHeader: h(() => t.showTableHeader),
      bottomBarHeight: Pe,
      tableHeaderHeight: Me,
      bottomBarSpacing: Bt
    }), _t = h(() => x.value ? "100%" : y.value && !t.loading ? t.emptyHeight : t.height ? t.height : "100%"), At = h(() => ({
      background: C.value ? "var(--el-fill-color-lighter)" : "var(--default-box-color)",
      ...t.headerCellStyle || {}
      // 合并用户传入的样式
    })), Ct = (b) => {
      const F = i?.vnode.props || {}, de = b.replace(/[A-Z]/g, (P) => `-${P.toLowerCase()}`);
      return b in F || de in F;
    }, Tt = [
      "loading",
      "columns",
      "pagination",
      "paginationOptions",
      "emptyHeight",
      "emptyText",
      "showTableHeader",
      "searchItems",
      "searchRules",
      "searchSpan",
      "searchShowExpand",
      "showSearchBar",
      "headerShowZebra",
      "headerShowBorder",
      "headerShowHeaderBackground",
      "integrated",
      "searchForm",
      "columnChecks"
    ], Ot = h(() => {
      const b = { ...t };
      return Tt.forEach((F) => {
        delete b[F];
      }), b;
    }), It = h(() => ({
      ...d,
      ...Ot.value,
      height: _t.value,
      stripe: E.value,
      border: Q.value,
      size: D.value,
      headerCellStyle: At.value,
      // Element Plus 默认值为 true，未显式传入时不应被 AoTable 覆盖成 false。
      selectOnIndeterminate: Ct("selectOnIndeterminate") ? t.selectOnIndeterminate : void 0
    })), He = h(() => g.value > 0 && !y.value), Fe = (b) => b.$index === void 0 || b.$index >= 0, Rt = ["slotName", "checked", "visible", "disabled"], ke = (b) => {
      const F = { ...b };
      return Rt.forEach((de) => {
        delete F[de];
      }), F;
    }, zt = (b) => {
      ne("size-change", b);
    }, $t = (b) => {
      ne("current-change", b), De();
    }, Vt = async (b) => {
      if (t.searchRules)
        try {
          await R.value?.validate();
        } catch {
          return;
        }
      ne("search", b);
    }, Lt = () => {
      ne("reset");
    }, Pt = () => {
      ne("refresh");
    }, Mt = (b) => {
      t.showSearchBar === void 0 && (Ve.value = b), ne("update:showSearchBar", b);
    }, Ht = $o, De = () => {
      st(() => {
        S.value?.setScrollTop(0), Ht();
      });
    }, Ft = (b) => (A.value - 1) * ee.value + b + 1, ne = l;
    return po(
      () => {
        V.value = B.value?.$el ?? void 0;
      },
      { flush: "post" }
    ), o({
      scrollToTop: De,
      elTableRef: S
    }), (b, F) => {
      const de = mo("loading");
      return r(), w("div", {
        class: X(["ao-table-root", St.value])
      }, [
        j.value ? je((r(), c(Jo, {
          key: 0,
          ref_key: "searchBarRef",
          ref: R,
          modelValue: n.value,
          "onUpdate:modelValue": F[0] || (F[0] = (P) => n.value = P),
          items: e.searchItems,
          rules: e.searchRules,
          span: e.searchSpan,
          "show-expand": e.searchShowExpand,
          onSearch: Vt,
          onReset: Lt
        }, null, 8, ["modelValue", "items", "rules", "span", "show-expand"])), [
          [vo, Le.value]
        ]) : k("", !0),
        (r(), c(oe(kt.value), {
          class: X(xt.value)
        }, {
          default: u(() => [
            wt.value ? (r(), c(na, {
              key: 0,
              ref_key: "tableHeaderCompRef",
              ref: B,
              columns: s.value,
              "onUpdate:columns": F[1] || (F[1] = (P) => s.value = P),
              "show-search-bar": yt.value,
              "show-zebra": e.headerShowZebra,
              "show-border": e.headerShowBorder,
              "show-header-background": e.headerShowHeaderBackground,
              loading: e.loading,
              "onUpdate:showSearchBar": Mt,
              onRefresh: Pt
            }, {
              left: u(() => [
                N(b.$slots, "header-left", {}, void 0, !0)
              ]),
              right: u(() => [
                N(b.$slots, "header-right", {}, void 0, !0)
              ]),
              _: 3
            }, 8, ["columns", "show-search-bar", "show-zebra", "show-border", "show-header-background", "loading"])) : k("", !0),
            K("div", {
              class: X(["ao-table", { "is-empty": y.value }]),
              style: pe(a(Et))
            }, [
              je((r(), c(a(ao), M({
                ref_key: "elTableRef",
                ref: S
              }, It.value), {
                default: u(() => [
                  (r(!0), w(Z, null, W(e.columns, (P) => (r(), w(Z, {
                    key: P.columnKey || P.prop || P.type
                  }, [
                    P.type === "globalIndex" ? (r(), c(a(be), M({
                      key: 0,
                      ref_for: !0
                    }, ke(P)), {
                      default: u(({ $index: se }) => [
                        K("span", null, U(Ft(se)), 1)
                      ]),
                      _: 1
                    }, 16)) : P.type === "expand" ? (r(), c(a(be), M({
                      key: 1,
                      ref_for: !0
                    }, ke(P)), ae({ _: 2 }, [
                      P.slotName ? {
                        name: "default",
                        fn: u((se) => [
                          N(b.$slots, P.slotName, M({ ref_for: !0 }, se), void 0, !0)
                        ]),
                        key: "0"
                      } : void 0
                    ]), 1040)) : (r(), c(a(be), M({
                      key: 2,
                      ref_for: !0
                    }, ke(P)), ae({ _: 2 }, [
                      P.slotName ? {
                        name: "default",
                        fn: u((se) => [
                          Fe(se) ? N(b.$slots, P.slotName, M({ ref_for: !0 }, se), void 0, !0, 0) : k("", !0)
                        ]),
                        key: "0"
                      } : void 0
                    ]), 1040))
                  ], 64))), 128)),
                  b.$slots.default ? N(b.$slots, "default", {}, void 0, !0, 0) : k("", !0),
                  b.$slots.operation ? (r(), c(a(be), {
                    key: 1,
                    label: "操作",
                    width: 170,
                    fixed: "right",
                    align: "right"
                  }, {
                    default: u((P) => [
                      Fe(P) ? N(b.$slots, "operation", _e(Ae(P)), void 0, !0, 0) : k("", !0)
                    ]),
                    _: 3
                  })) : k("", !0)
                ]),
                empty: u(() => [
                  e.loading ? (r(), w("div", sa)) : (r(), c(a(lo), {
                    key: 1,
                    description: e.emptyText,
                    "image-size": 120
                  }, null, 8, ["description"]))
                ]),
                _: 3
              }, 16)), [
                [de, !!e.loading]
              ])
            ], 6),
            K("div", {
              class: X(["ao-table-bottom", { "is-bar-empty": !He.value && !b.$slots.footer }]),
              ref_key: "bottomBarRef",
              ref: I
            }, [
              K("div", ua, [
                N(b.$slots, "footer", {}, void 0, !0)
              ]),
              He.value ? (r(), w("div", ia, [
                O(a(ro), M(L.value, {
                  total: g.value,
                  disabled: e.loading,
                  "current-page": A.value,
                  "page-size": ee.value,
                  onSizeChange: zt,
                  onCurrentChange: $t
                }), null, 16, ["total", "disabled", "current-page", "page-size"])
              ])) : k("", !0)
            ], 2)
          ]),
          _: 3
        }, 8, ["class"]))
      ], 2);
    };
  }
}), Va = /* @__PURE__ */ J(ca, [["__scopeId", "data-v-d3420260"]]), da = { class: "form-section" }, fa = {
  key: 0,
  class: "form-title"
}, ha = { key: 1 }, pa = { key: 1 }, ma = /* @__PURE__ */ G({
  __name: "FormBody",
  props: /* @__PURE__ */ le({
    items: {},
    span: {},
    gutter: {},
    labelPosition: {},
    labelWidth: {},
    sanitizeOutput: {}
  }, {
    modelValue: {
      default: () => ({})
    },
    modelModifiers: {}
  }),
  emits: /* @__PURE__ */ le(["reset", "submit"], ["update:modelValue"]),
  setup(e, { expose: o, emit: l }) {
    const t = e, n = l, s = he(e, "modelValue"), i = Re("formRef"), d = $({});
    d.value = te(s.value), lt(s, (B) => {
      d.value = te(B);
    });
    const z = h(() => ({
      ...we,
      ...t.sanitizeOutput
    })), f = (B) => ht(s.value, B), S = (B, T) => {
      pt(s.value, B, T);
    }, I = (B, T) => Ze(B) ? 24 : bt(Wo(B.span, _.value), T), V = h(() => t.items.filter((B) => !B.hidden)), H = () => Oe(s.value, z.value);
    o({
      validate: (...B) => i.value.validate(...B),
      reset: () => {
        i.value?.resetFields(), Object.keys(s.value).forEach((B) => {
          delete s.value[B];
        }), Object.assign(s.value, te(d.value)), n("reset");
      },
      submit: async () => {
        try {
          await i.value?.validate();
        } catch {
          console.error("[AoForm] 表单校验失败");
          return;
        }
        n("submit", H());
      },
      // 允许外部在不触发提交事件时主动获取清洗后的输出。
      getOutput: H
    });
    const { span: _, gutter: x, labelPosition: C, labelWidth: R } = rt(t);
    return (B, T) => (r(), w("section", da, [
      O(a(Ye), M({
        ref: "formRef",
        model: s.value,
        "label-position": a(C)
      }, { ...B.$attrs }), {
        default: u(() => [
          O(a(qe), { gutter: a(x) }, {
            default: u(() => [
              (r(!0), w(Z, null, W(V.value, (p) => (r(), c(a(Be), {
                key: p.key,
                xs: I(p, "xs"),
                sm: I(p, "sm"),
                md: I(p, "md"),
                lg: I(p, "lg"),
                xl: I(p, "xl")
              }, {
                default: u(() => [
                  a(Ze)(p) ? (r(), w("div", fa, [
                    typeof p.label != "string" ? (r(), c(oe(p.label), { key: 0 })) : (r(), w("span", ha, U(p.label), 1))
                  ])) : (r(), c(a(Xe), {
                    key: 1,
                    prop: p.key,
                    "label-width": p.label ? p.labelWidth || a(R) : void 0
                  }, ae({
                    default: u(() => [
                      N(B.$slots, p.key, {
                        item: p,
                        modelValue: s.value
                      }, () => [
                        (r(), c(oe(a(gt)(p)), M({
                          "model-value": f(p.key),
                          "onUpdate:modelValue": (L) => S(p.key, L)
                        }, { ref_for: !0 }, a(mt)(p)), ae({
                          default: u(() => [
                            p.type === "select" && a(Y)(p).length ? (r(!0), w(Z, { key: 0 }, W(a(Y)(p), (L) => (r(), c(a(Je), M({ ref_for: !0 }, L, {
                              key: String(L.value)
                            }), null, 16))), 128)) : k("", !0),
                            p.type === "checkboxgroup" && a(Y)(p).length ? (r(!0), w(Z, { key: 1 }, W(a(Y)(p), (L) => (r(), c(a(re), M({ ref_for: !0 }, L, {
                              key: String(L.value)
                            }), null, 16))), 128)) : k("", !0),
                            p.type === "radiogroup" && a(Y)(p).length ? (r(!0), w(Z, { key: 2 }, W(a(Y)(p), (L) => (r(), c(a(Qe), M({ ref_for: !0 }, L, {
                              key: String(L.value)
                            }), null, 16))), 128)) : k("", !0)
                          ]),
                          _: 2
                        }, [
                          W(a(vt)(p), (L, Q) => ({
                            name: Q,
                            fn: u(() => [
                              (r(), c(oe(L)))
                            ])
                          }))
                        ]), 1040, ["model-value", "onUpdate:modelValue"]))
                      ], !0)
                    ]),
                    _: 2
                  }, [
                    p.label ? {
                      name: "label",
                      fn: u(() => [
                        typeof p.label != "string" ? (r(), c(oe(p.label), { key: 0 })) : (r(), w("span", pa, U(p.label), 1))
                      ]),
                      key: "0"
                    } : void 0
                  ]), 1032, ["prop", "label-width"]))
                ]),
                _: 2
              }, 1032, ["xs", "sm", "md", "lg", "xl"]))), 128))
            ]),
            _: 3
          }, 8, ["gutter"])
        ]),
        _: 3
      }, 16, ["model", "label-position"])
    ]));
  }
}), Ge = /* @__PURE__ */ J(ma, [["__scopeId", "data-v-701ee2e8"]]), La = /* @__PURE__ */ G({
  name: "AoForm",
  inheritAttrs: !1,
  __name: "index",
  props: /* @__PURE__ */ le({
    dialog: { type: Boolean, default: !0 },
    visible: { type: Boolean, default: !1 },
    title: { default: "" },
    width: { default: "600px" },
    alignCenter: { type: Boolean, default: !0 },
    cancelText: { default: "" },
    confirmText: { default: "" },
    showSubmit: { type: Boolean, default: !0 },
    disabledSubmit: { type: Boolean, default: !1 },
    items: { default: () => [] },
    span: { default: 24 },
    gutter: { default: 12 },
    labelPosition: { default: "right" },
    labelWidth: { default: "70px" },
    sanitizeOutput: { default: () => ({}) }
  }, {
    modelValue: {
      default: () => ({})
    },
    modelModifiers: {}
  }),
  emits: /* @__PURE__ */ le(["update:visible", "cancel", "closed", "reset", "submit"], ["update:modelValue"]),
  setup(e, { expose: o, emit: l }) {
    const t = e, n = l, s = he(e, "modelValue"), { t: i } = ze(), d = Re("formBodyRef"), z = h(() => t.dialog), f = h(() => ({
      items: t.items,
      span: t.span,
      gutter: t.gutter,
      labelPosition: t.labelPosition,
      labelWidth: t.labelWidth,
      sanitizeOutput: t.sanitizeOutput
    })), S = () => {
      n("reset");
    }, I = (v) => {
      n("submit", v);
    }, V = (v) => {
      n("update:visible", v);
    }, H = () => {
      n("cancel"), V(!1);
    }, m = () => {
      d.value?.submit();
    };
    return o({
      /** 校验表单，透传表单主体的 validate */
      validate: (...v) => d.value.validate(...v),
      /** 重置表单，透传表单主体的 reset */
      reset: () => d.value?.reset(),
      /** 触发提交（含校验），透传表单主体的 submit */
      submit: () => d.value?.submit(),
      /** 读取清洗后的表单输出，透传表单主体的 getOutput */
      getOutput: () => d.value?.getOutput() ?? {}
    }), (v, _) => z.value ? (r(), c(a(no), {
      key: 0,
      class: "ao-form-dialog",
      "model-value": e.visible,
      title: e.title,
      width: e.width,
      "align-center": e.alignCenter,
      draggable: "",
      overflow: !1,
      "onUpdate:modelValue": V,
      onClosed: _[1] || (_[1] = (x) => n("closed"))
    }, {
      footer: u(() => [
        N(v.$slots, "footer", {}, () => [
          O(a(ce), { onClick: H }, {
            default: u(() => [
              q(U(e.cancelText || a(i)("common.cancel")), 1)
            ]),
            _: 1
          }),
          e.showSubmit ? (r(), c(a(ce), {
            key: 0,
            type: "primary",
            disabled: e.disabledSubmit,
            onClick: m
          }, {
            default: u(() => [
              q(U(e.confirmText || a(i)("common.confirm")), 1)
            ]),
            _: 1
          }, 8, ["disabled"])) : k("", !0)
        ])
      ]),
      default: u(() => [
        O(Ge, M({
          ref_key: "formBodyRef",
          ref: d
        }, { ...f.value, ...v.$attrs }, {
          modelValue: s.value,
          "onUpdate:modelValue": _[0] || (_[0] = (x) => s.value = x),
          onReset: S,
          onSubmit: I
        }), ae({ _: 2 }, [
          W(v.$slots, (x, C) => ({
            name: C,
            fn: u((R) => [
              N(v.$slots, C, _e(Ae(R ?? {})))
            ])
          }))
        ]), 1040, ["modelValue"])
      ]),
      _: 3
    }, 8, ["model-value", "title", "width", "align-center"])) : (r(), c(Ge, M({
      key: 1,
      ref_key: "formBodyRef",
      ref: d
    }, { ...f.value, ...v.$attrs }, {
      modelValue: s.value,
      "onUpdate:modelValue": _[2] || (_[2] = (x) => s.value = x),
      onReset: S,
      onSubmit: I
    }), ae({ _: 2 }, [
      W(v.$slots, (x, C) => ({
        name: C,
        fn: u((R) => [
          N(v.$slots, C, _e(Ae(R ?? {})))
        ])
      }))
    ]), 1040, ["modelValue"]));
  }
}), va = /* @__PURE__ */ G({
  name: "AoButtonTable",
  __name: "AoButtonTable",
  props: {
    type: {},
    icon: {},
    iconClass: {},
    iconColor: {},
    buttonBgColor: {}
  },
  emits: ["click"],
  setup(e, { emit: o }) {
    const l = e, t = o, n = {
      add: { icon: "ri:add-fill", class: "ao-btn-theme" },
      edit: { icon: "ri:pencil-line", class: "ao-btn-secondary" },
      delete: { icon: "ri:delete-bin-5-line", class: "ao-btn-error" },
      view: { icon: "ri:eye-line", class: "ao-btn-info" },
      more: { icon: "ri:more-2-fill", class: "" }
    }, s = h(() => l.icon || (l.type ? n[l.type]?.icon : "") || ""), i = h(() => l.iconClass || (l.type ? n[l.type]?.class : "") || ""), d = () => {
      t("click");
    };
    return (z, f) => (r(), w("div", {
      class: X(["ao-button-table", i.value]),
      style: pe({ backgroundColor: e.buttonBgColor, color: e.iconColor }),
      onClick: d
    }, [
      O(me, { icon: s.value }, null, 8, ["icon"])
    ], 6));
  }
}), Pa = /* @__PURE__ */ J(va, [["__scopeId", "data-v-005b60b0"]]), ga = /* @__PURE__ */ G({
  name: "AoIconButton",
  __name: "AoIconButton",
  props: {
    icon: {},
    circle: { type: Boolean }
  },
  setup(e) {
    return (o, l) => (r(), w("div", {
      class: X(["icon-button", { "is-circle": e.circle }])
    }, [
      O(me, { icon: e.icon }, null, 8, ["icon"]),
      N(o.$slots, "default", {}, void 0, !0)
    ], 2));
  }
}), ba = /* @__PURE__ */ J(ga, [["__scopeId", "data-v-a298f446"]]), ya = /* @__PURE__ */ G({
  name: "AoButtonMore",
  __name: "AoButtonMore",
  props: {
    list: {},
    auth: {}
  },
  emits: ["click"],
  setup(e, { emit: o }) {
    const { hasAuth: l } = zo(), t = e, n = h(() => t.list.some((d) => !d.auth || l(d.auth))), s = o, i = (d) => {
      s("click", d);
    };
    return (d, z) => (r(), w("div", null, [
      n.value ? (r(), c(a(tt), { key: 0 }, {
        dropdown: u(() => [
          O(a(ot), null, {
            default: u(() => [
              (r(!0), w(Z, null, W(e.list, (f) => (r(), w(Z, {
                key: f.key
              }, [
                !f.auth || a(l)(f.auth) ? (r(), c(a(at), {
                  key: 0,
                  disabled: f.disabled,
                  onClick: (S) => i(f)
                }, {
                  default: u(() => [
                    K("div", {
                      class: "dropdown-item-content",
                      style: pe({ color: f.color })
                    }, [
                      f.icon ? (r(), c(me, {
                        key: 0,
                        icon: f.icon
                      }, null, 8, ["icon"])) : k("", !0),
                      K("span", null, U(f.label), 1)
                    ], 4)
                  ]),
                  _: 2
                }, 1032, ["disabled", "onClick"])) : k("", !0)
              ], 64))), 128))
            ]),
            _: 1
          })
        ]),
        default: u(() => [
          O(ba, {
            icon: "ri:more-2-fill",
            class: "more-button"
          })
        ]),
        _: 1
      })) : k("", !0)
    ]));
  }
}), Ma = /* @__PURE__ */ J(ya, [["__scopeId", "data-v-e5e8e40b"]]), wa = /* @__PURE__ */ G({
  name: "AoExcelExport",
  __name: "AoExcelExport",
  props: {
    data: {},
    filename: { default: () => `export_${(/* @__PURE__ */ new Date()).toISOString().slice(0, 10)}` },
    sheetName: { default: "Sheet1" },
    type: { default: "primary" },
    size: { default: "default" },
    disabled: { type: Boolean, default: !1 },
    buttonText: { default: "导出 Excel" },
    loadingText: { default: "导出中..." },
    autoIndex: { type: Boolean, default: !1 },
    indexColumnTitle: { default: "序号" },
    columns: { default: () => ({}) },
    headers: { default: () => ({}) },
    maxRows: { default: 1e5 },
    showSuccessMessage: { type: Boolean, default: !0 },
    showErrorMessage: { type: Boolean, default: !0 },
    workbookOptions: { default: () => ({}) }
  },
  emits: ["before-export", "export-success", "export-error", "export-progress"],
  setup(e, { expose: o, emit: l }) {
    const t = e, n = l;
    class s extends Error {
      constructor(v, _, x) {
        super(v), this.code = _, this.details = x, this.name = "ExportError";
      }
      code;
      details;
    }
    const i = $(!1), d = h(() => Array.isArray(t.data) && t.data.length > 0), z = (m) => {
      if (!Array.isArray(m))
        throw new s("数据必须是数组格式", "INVALID_DATA_TYPE");
      if (m.length === 0)
        throw new s("没有可导出的数据", "NO_DATA");
      if (m.length > t.maxRows)
        throw new s(`数据行数超过限制（${t.maxRows}行）`, "EXCEED_MAX_ROWS", {
          currentRows: m.length,
          maxRows: t.maxRows
        });
    }, f = (m, v, _, x) => {
      const C = t.columns[v];
      return C?.formatter ? C.formatter(m, _, x) : m == null ? "" : m instanceof Date ? m.toLocaleDateString("zh-CN") : typeof m == "boolean" ? m ? "是" : "否" : String(m);
    }, S = (m) => m.map((_, x) => {
      const C = {};
      return t.autoIndex && (C[t.indexColumnTitle] = String(x + 1)), Object.entries(_).forEach(([R, B]) => {
        let T = R;
        t.columns[R]?.title ? T = t.columns[R].title : t.headers[R] && (T = t.headers[R]), C[T] = f(B, R, _, x);
      }), C;
    }), I = (m) => {
      if (m.length === 0) return [];
      const v = Math.min(m.length, 100);
      return Object.keys(m[0]).map((x) => {
        const C = Object.values(t.columns).find((T) => T.title === x)?.width;
        if (C)
          return { wch: C };
        const R = Math.max(
          x.length,
          ...m.slice(0, v).map((T) => String(T[x] || "").length)
        );
        return { wch: Math.min(Math.max(R + 2, 8), 50) };
      });
    }, V = async (m, v, _) => {
      try {
        n("export-progress", 10);
        const x = S(m);
        n("export-progress", 30);
        const C = ie.utils.book_new();
        t.workbookOptions && (C.Props = {
          Title: v,
          Subject: "数据导出",
          Author: t.workbookOptions.creator || "Ao Design Pro",
          Manager: t.workbookOptions.lastModifiedBy || "",
          Company: "系统导出",
          Category: "数据",
          Keywords: "excel,export,data",
          Comments: "由系统自动生成",
          CreatedDate: t.workbookOptions.created || /* @__PURE__ */ new Date(),
          ModifiedDate: t.workbookOptions.modified || /* @__PURE__ */ new Date()
        }), n("export-progress", 50);
        const R = ie.utils.json_to_sheet(x);
        R["!cols"] = I(x), n("export-progress", 70), ie.utils.book_append_sheet(C, R, _), n("export-progress", 85);
        const B = ie.write(C, {
          bookType: "xlsx",
          type: "array",
          compression: !0
        }), T = new Blob([B], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        });
        n("export-progress", 95);
        const p = (/* @__PURE__ */ new Date()).toISOString().replace(/[:.]/g, "-"), L = `${v}_${p}.xlsx`;
        return Eo.saveAs(T, L), n("export-progress", 100), await st(), Promise.resolve();
      } catch (x) {
        throw new s(`Excel 导出失败: ${x.message}`, "EXPORT_FAILED", x);
      }
    }, H = yo(async () => {
      if (!i.value) {
        i.value = !0;
        try {
          z(t.data), n("before-export", t.data), await V(t.data, t.filename, t.sheetName), n("export-success", t.filename, t.data.length), t.showSuccessMessage && Ue.success({
            message: `成功导出 ${t.data.length} 条数据`,
            duration: 3e3
          });
        } catch (m) {
          const v = m instanceof s ? m : new s(`导出失败: ${m.message}`, "UNKNOWN_ERROR", m);
          n("export-error", v), t.showErrorMessage && Ue.error({
            message: v.message,
            duration: 5e3
          }), console.error("Excel 导出错误:", v);
        } finally {
          i.value = !1, n("export-progress", 0);
        }
      }
    }, 1e3);
    return o({
      exportData: H,
      isExporting: go(i),
      hasData: d
    }), (m, v) => (r(), c(a(ce), {
      type: e.type,
      size: e.size,
      loading: i.value,
      disabled: e.disabled || !d.value,
      onClick: a(H)
    }, {
      loading: u(() => [
        O(a(et), { class: "is-loading" }, {
          default: u(() => [
            O(a(ko))
          ]),
          _: 1
        }),
        q(" " + U(e.loadingText), 1)
      ]),
      default: u(() => [
        N(m.$slots, "default", {}, () => [
          q(U(e.buttonText), 1)
        ], !0)
      ]),
      _: 3
    }, 8, ["type", "size", "loading", "disabled", "onClick"]));
  }
}), Ha = /* @__PURE__ */ J(wa, [["__scopeId", "data-v-eae0b991"]]), Sa = { class: "excel-import" }, ka = /* @__PURE__ */ G({
  name: "AoExcelImport",
  __name: "AoExcelImport",
  emits: ["import-success", "import-error"],
  setup(e, { emit: o }) {
    async function l(s) {
      return new Promise((i, d) => {
        const z = new FileReader();
        z.onload = (f) => {
          try {
            const S = f.target?.result, I = ie.read(S, { type: "array" }), V = I.SheetNames[0], H = I.Sheets[V], m = ie.utils.sheet_to_json(H);
            i(m);
          } catch (S) {
            d(S);
          }
        }, z.onerror = (f) => d(f), z.readAsArrayBuffer(s);
      });
    }
    const t = o, n = async (s) => {
      try {
        if (!s.raw) return;
        const i = await l(s.raw);
        t("import-success", i);
      } catch (i) {
        t("import-error", i);
      }
    };
    return (s, i) => (r(), w("div", Sa, [
      O(a(so), {
        "auto-upload": !1,
        accept: ".xlsx, .xls",
        "show-file-list": !1,
        onChange: n
      }, {
        default: u(() => [
          O(a(ce), { type: "primary" }, {
            default: u(() => [
              N(s.$slots, "default", {}, () => [
                i[0] || (i[0] = q("导入 Excel", -1))
              ], !0)
            ]),
            _: 3
          })
        ]),
        _: 3
      })
    ]));
  }
}), Fa = /* @__PURE__ */ J(ka, [["__scopeId", "data-v-81d063bb"]]), xa = { class: "logo-container" }, Ba = ["src"], Ea = /* @__PURE__ */ G({
  name: "AoLogo",
  __name: "AoLogo",
  props: {
    size: { default: 36 },
    src: {}
  },
  setup(e) {
    const o = e, l = Ie(ft, void 0), t = h(() => o.src ?? l), n = h(() => ({ width: `${o.size}px` }));
    return (s, i) => (r(), w("div", xa, [
      t.value ? (r(), w("img", {
        key: 0,
        style: pe(n.value),
        src: t.value,
        alt: "logo",
        class: "logo-img"
      }, null, 12, Ba)) : k("", !0)
    ]));
  }
}), Da = /* @__PURE__ */ J(Ea, [["__scopeId", "data-v-a45d0db4"]]), Na = {
  install(e, o = {}) {
    console.info(`[ao-admin-components] v${Ro}`), o.i18n && (o.i18n.global.mergeLocaleMessage("zh", Co), o.i18n.global.mergeLocaleMessage("en", Io)), e.provide(ct, o.getAuthList ?? (() => {
    })), e.provide(dt, o.resolveLocalSvg ?? (() => {
    })), e.provide(ft, o.assets?.logo), e.directive("loading", uo);
  }
};
export {
  ct as AUTH_LIST_KEY,
  Na as AdminComponents,
  Ma as AoButtonMore,
  Pa as AoButtonTable,
  Ha as AoExcelExport,
  Fa as AoExcelImport,
  La as AoForm,
  ba as AoIconButton,
  Da as AoLogo,
  Jo as AoSearchBar,
  me as AoSvgIcon,
  Va as AoTable,
  na as AoTableHeader,
  ue as AoTableHeaderButton,
  dt as LOCAL_SVG_KEY,
  ft as LOGO_URL_KEY,
  fe as TableSizeEnum,
  zo as useAuth,
  Vo as useTableHeight,
  Ce as useTableStore,
  Ro as version
};
