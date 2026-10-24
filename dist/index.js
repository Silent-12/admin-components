import { ElTreeSelect as Yt, ElTimeSelect as qt, ElTimePicker as Xt, ElCascader as Jt, ElSlider as Qt, ElRate as eo, ElDatePicker as ye, ElRadioGroup as to, ElCheckboxGroup as oo, ElCheckbox as ue, ElSwitch as ao, ElSelect as lo, ElInputNumber as no, ElInputTag as ro, ElInput as so, ElForm as et, ElRow as tt, ElCol as Oe, ElFormItem as ot, ElOption as at, ElRadio as lt, ElButton as pe, ElIcon as nt, ElTooltip as io, ElDropdown as rt, ElDropdownMenu as st, ElDropdownItem as it, ElPopover as Ze, ElScrollbar as uo, ElCard as co, ElTable as fo, ElEmpty as po, ElTableColumn as we, ElPagination as mo, ElDialog as ho, ElMessage as Ye, ElUpload as vo, ElLoadingDirective as go } from "element-plus";
import { inject as $e, ref as V, computed as b, toRaw as Ie, defineComponent as Y, useTemplateRef as Pe, watch as He, toRefs as ut, openBlock as s, createElementBlock as B, normalizeClass as J, createVNode as z, unref as a, mergeProps as F, withCtx as h, Fragment as G, renderList as K, createBlock as v, createSlots as re, renderSlot as N, resolveDynamicComponent as ne, createCommentVNode as _, toDisplayString as U, createElementVNode as W, normalizeStyle as ve, createTextVNode as X, useAttrs as ct, useModel as he, onMounted as bo, onUnmounted as yo, isRef as Ae, mergeModels as se, getCurrentInstance as wo, useSlots as dt, watchEffect as So, resolveDirective as ft, withDirectives as Se, vShow as ko, normalizeProps as Re, guardReactiveProps as Me, nextTick as pt, readonly as xo } from "vue";
import { defineStore as Eo, storeToRefs as mt } from "pinia";
import Bo from "dayjs";
import { useWindowSize as ht, useResizeObserver as qe, useThrottleFn as _o } from "@vueuse/core";
import { ArrowUpBold as Co, ArrowDownBold as Ao, Loading as To } from "@element-plus/icons-vue";
import { useI18n as Ee } from "vue-i18n";
import { VueDraggable as Oo } from "vue-draggable-plus";
import { Icon as Io } from "@iconify/vue";
import * as fe from "xlsx";
import Ro from "file-saver";
const Mo = { cancel: "取消", confirm: "确定" }, zo = { form: { reset: "重置", submit: "提交" }, searchBar: { reset: "重置", search: "查询", expand: "展开", collapse: "收起" }, selection: "选择", sizeOptions: { small: "紧凑", default: "默认", large: "宽松" }, column: { selection: "勾选", expand: "展开", index: "序号", globalIndex: "全局序号" }, header: { search: "搜索", refresh: "刷新", size: "表格大小", fullscreen: "全屏", columns: "列设置", settings: "其他设置" }, zebra: "斑马纹", border: "边框", headerBackground: "表头背景" }, Vo = {
  common: Mo,
  table: zo
}, Lo = { cancel: "Cancel", confirm: "Confirm" }, $o = { form: { reset: "Reset", submit: "Submit" }, searchBar: { reset: "Reset", search: "Search", expand: "Expand", collapse: "Collapse" }, selection: "Select", sizeOptions: { small: "Compact", default: "Default", large: "Loose" }, column: { selection: "Select", expand: "Expand", index: "Index", globalIndex: "Global Index" }, header: { search: "Search", refresh: "Refresh", size: "Table Size", fullscreen: "Fullscreen", columns: "Column Settings", settings: "Settings" }, zebra: "Zebra", border: "Border", headerBackground: "Header BG" }, Po = {
  common: Lo,
  table: $o
}, Ho = "12", vt = /* @__PURE__ */ Symbol("ao-admin-auth-list"), Fo = () => {
  const e = $e(vt, () => {
  });
  return { hasAuth: (l) => l ? e()?.includes(l) ?? !1 : !1 };
}, gt = /* @__PURE__ */ Symbol("ao-admin-local-svg"), bt = /* @__PURE__ */ Symbol("ao-admin-logo-url");
var me = /* @__PURE__ */ ((e) => (e.DEFAULT = "default", e.SMALL = "small", e.LARGE = "large", e))(me || {});
const ze = Eo(
  "tableStore",
  () => {
    const e = V(me.DEFAULT), o = V(!1), l = V(!1), t = V(!1), n = V(!1);
    return {
      tableSize: e,
      isZebra: o,
      isBorder: l,
      isHeaderBackground: t,
      setTableSize: (f) => e.value = f,
      setIsZebra: (f) => o.value = f,
      setIsBorder: (f) => l.value = f,
      setIsHeaderBackground: (f) => t.value = f,
      isFullScreen: n,
      setIsFullScreen: (f) => n.value = f
    };
  },
  {
    persist: {
      key: "table",
      storage: localStorage
    }
  }
), Do = () => {
  const e = document.getElementById("app-main");
  e ? e.scrollTop = 0 : window.scrollTo(0, 0);
};
class ke {
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
    return o + l + ke.TABLE_HEADER_SPACING;
  }
  /**
   * 获取表格头部高度
   */
  getHeaderHeight() {
    return this.options.tableHeaderHeight.value || ke.DEFAULT_TABLE_HEADER_HEIGHT;
  }
  /**
   * 计算底部栏偏移量
   */
  calculateBottomBarOffset() {
    const { bottomBarHeight: o, bottomBarSpacing: l } = this.options;
    return o.value === 0 ? 0 : o.value + l.value;
  }
}
function No(e) {
  return {
    /** 容器高度样式对象 */
    containerHeight: b(() => new ke(e).calculate())
  };
}
const Xe = {
  input: so,
  // 输入框
  inputtag: ro,
  // 标签输入框
  number: no,
  // 数字输入框
  select: lo,
  // 选择器
  switch: ao,
  // 开关
  checkbox: ue,
  // 复选框
  checkboxgroup: oo,
  // 复选框组
  radiogroup: to,
  // 单选框组
  date: ye,
  // 日期选择器
  daterange: ye,
  // 日期范围选择器
  datetime: ye,
  // 日期时间选择器
  datetimerange: ye,
  // 日期时间范围选择器
  rate: eo,
  // 评分
  slider: Qt,
  // 滑块
  cascader: Jt,
  // 级联选择器
  timepicker: Xt,
  // 时间选择器
  timeselect: qt,
  // 时间选择
  treeselect: Yt
  // 树选择器
}, Uo = [
  "label",
  "labelWidth",
  "key",
  "type",
  "hidden",
  "span",
  "slots",
  "render",
  "options"
], jo = ["select", "checkboxgroup", "radiogroup"], Wo = "title", Je = (e) => e.type === Wo, Ko = (e, o) => Uo.includes(e) ? e === "options" ? jo.includes(o ?? "") : !0 : !1, Be = {
  removeEmptyString: !0,
  removeEmptyArray: !0,
  removeEmptyObject: !0,
  removeEmptyRichText: !0,
  keepZero: !0,
  keepFalse: !0
}, Go = /^\d+$/, Fe = (e) => e.split(".").filter(Boolean).map((o) => Go.test(o) ? Number(o) : o), oe = (e) => {
  if (!e) return {};
  const o = (l) => {
    if (Array.isArray(l))
      return l.map((t) => o(t));
    if (l && typeof l == "object") {
      const t = Ie(l);
      return Object.keys(t).reduce((n, c) => (n[c] = o(t[c]), n), {});
    }
    return l;
  };
  return o(Ie(e));
}, yt = (e, o) => Fe(o).reduce((l, t) => {
  if (l != null)
    return l[t];
}, e), Zo = (e, o) => {
  const l = Fe(o);
  if (!l.length) return;
  const t = l.pop(), n = l.reduce((c, p) => {
    if (c != null)
      return c[p];
  }, e);
  n != null && t !== void 0 && delete n[t];
}, wt = (e, o, l) => {
  const t = l === "" ? void 0 : l;
  if (t === void 0) {
    Zo(e, o);
    return;
  }
  const n = Fe(o);
  if (!n.length) return;
  let c = e;
  n.forEach((p, i) => {
    if (i === n.length - 1) {
      c[p] = t;
      return;
    }
    const f = typeof n[i + 1] == "number" ? [] : {};
    (c[p] === null || c[p] === void 0 || typeof c[p] != "object") && (c[p] = f), c = c[p];
  });
}, Yo = (e) => /<(img|video|audio|iframe|embed|object)\b/i.test(e) ? !1 : e.replace(/&nbsp;/gi, "").replace(/<br\s*\/?>/gi, "").replace(/<[^>]*>/g, "").trim() === "", Ve = (e, o = Be) => {
  if (Array.isArray(e)) {
    const l = e.map((t) => Ve(t, o)).filter((t) => t !== void 0);
    return l.length === 0 && o.removeEmptyArray ? void 0 : l;
  }
  if (e && typeof e == "object") {
    const l = Ie(e), t = Object.entries(l).reduce(
      (n, [c, p]) => {
        const i = Ve(p, o);
        return i !== void 0 && (n[c] = i), n;
      },
      {}
    );
    return Object.keys(t).length === 0 && o.removeEmptyObject ? void 0 : t;
  }
  return typeof e == "string" ? o.removeEmptyString && e.trim() === "" || o.removeEmptyRichText && Yo(e) ? void 0 : e : e === 0 ? o.keepZero ? e : void 0 : e === !1 ? o.keepFalse ? e : void 0 : e ?? void 0;
}, Le = (e, o = Be) => Ve(oe(e), o) || {}, St = (e) => e.props ? e.props : Object.fromEntries(
  Object.entries(e).filter(([o]) => !Ko(o, e.type))
), q = (e) => {
  const o = e.props?.options ?? e.options;
  return Array.isArray(o) ? o : [];
}, kt = (e) => {
  if (!e.slots) return {};
  const o = {};
  return Object.entries(e.slots).forEach(([l, t]) => {
    t && (o[l] = t);
  }), o;
}, xt = (e) => {
  if (e.render)
    return e.render;
  const o = e.type ? Xe[e.type] : void 0;
  return o || Xe.input;
}, qo = {
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
function Et(e, o) {
  const l = qo[o];
  return l ? e >= l.threshold ? e : l.fallback : e;
}
const Xo = 500, Jo = 2, Qo = (e, o) => {
  const l = o && o > 0 ? o : 24, t = (e ?? l / Jo) / l * 24;
  return Math.min(24, Math.max(1, Math.round(t)));
}, ea = (e, o, l) => e ? "flex-end" : o <= (l ?? 2) ? "flex-start" : "flex-end", ta = { key: 1 }, oa = { class: "form-buttons" }, aa = { class: "icon-wrapper" }, la = /* @__PURE__ */ Y({
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
    const t = e, n = l, { width: c } = ht(), { t: p } = Ee(), i = b(() => c.value < Xo), u = Pe("formRef"), r = V(oe(t.modelValue)), f = V(oe(t.modelValue));
    let m;
    He(
      () => t.modelValue,
      (M) => {
        M !== m && (r.value = oe(M), f.value = oe(M));
      }
    );
    const g = V(t.defaultExpanded), k = b(() => ({
      ...Be,
      ...t.sanitizeOutput
    })), d = (M) => yt(r.value, M), R = (M, ee) => {
      wt(r.value, M, ee), m = r.value, n("update:modelValue", r.value);
    }, E = (M, ee) => Et(M ?? A.value, ee), C = b(() => {
      const M = t.items.filter((x) => !x.hidden);
      if (!t.isExpand && !g.value) {
        const x = Math.floor(24 / t.span) - 1;
        return M.slice(0, x);
      }
      return M;
    }), L = b(() => {
      const M = t.items.filter((ee) => !ee.hidden);
      return !t.isExpand && t.showExpand && M.length > Math.floor(24 / t.span) - 1;
    }), O = b(() => g.value ? p("table.searchBar.collapse") : p("table.searchBar.expand")), S = b(() => ({
      "justify-content": ea(
        i.value,
        t.items.filter((M) => !M.hidden).length,
        t.buttonLeftLimit
      )
    })), I = () => {
      g.value = !g.value;
    }, w = () => {
      u.value?.resetFields(), Object.keys(r.value).forEach((M) => {
        delete r.value[M];
      }), Object.assign(r.value, oe(f.value)), m = r.value, n("update:modelValue", r.value), n("reset");
    }, H = () => {
      n(
        "search",
        Le(r.value, k.value)
      );
    };
    o({
      validate: (...M) => u.value.validate(...M),
      reset: w,
      // 允许外部在手动组装请求前直接读取清洗后的参数。
      getOutput: () => Le(r.value, k.value)
    });
    const { span: A, gutter: D, labelPosition: T, labelWidth: ie } = ut(t);
    return (M, ee) => (s(), B("section", {
      class: J(["ao-search-bar ao-card-xs", { "is-expanded": g.value }])
    }, [
      z(a(et), F({
        ref: "formRef",
        model: r.value,
        "label-position": a(T)
      }, { ...M.$attrs }), {
        default: h(() => [
          z(a(tt), { gutter: a(D) }, {
            default: h(() => [
              (s(!0), B(G, null, K(C.value, (x) => (s(), v(a(Oe), {
                key: x.key,
                xs: E(x.span, "xs"),
                sm: E(x.span, "sm"),
                md: E(x.span, "md"),
                lg: E(x.span, "lg"),
                xl: E(x.span, "xl")
              }, {
                default: h(() => [
                  z(a(ot), {
                    prop: x.key,
                    "label-width": x.label ? x.labelWidth || a(ie) : void 0
                  }, re({
                    default: h(() => [
                      N(M.$slots, x.key, {
                        item: x,
                        modelValue: r.value
                      }, () => [
                        (s(), v(ne(a(xt)(x)), F({
                          "model-value": d(x.key),
                          "onUpdate:modelValue": (j) => R(x.key, j)
                        }, { ref_for: !0 }, a(St)(x)), re({
                          default: h(() => [
                            x.type === "select" && a(q)(x).length ? (s(!0), B(G, { key: 0 }, K(a(q)(x), (j) => (s(), v(a(at), F({ ref_for: !0 }, j, {
                              key: String(j.value)
                            }), null, 16))), 128)) : _("", !0),
                            x.type === "checkboxgroup" && a(q)(x).length ? (s(!0), B(G, { key: 1 }, K(a(q)(x), (j) => (s(), v(a(ue), F({ ref_for: !0 }, j, {
                              key: String(j.value)
                            }), null, 16))), 128)) : _("", !0),
                            x.type === "radiogroup" && a(q)(x).length ? (s(!0), B(G, { key: 2 }, K(a(q)(x), (j) => (s(), v(a(lt), F({ ref_for: !0 }, j, {
                              key: String(j.value)
                            }), null, 16))), 128)) : _("", !0)
                          ]),
                          _: 2
                        }, [
                          K(a(kt)(x), (j, _e) => ({
                            name: _e,
                            fn: h(() => [
                              (s(), v(ne(j)))
                            ])
                          }))
                        ]), 1040, ["model-value", "onUpdate:modelValue"]))
                      ], !0)
                    ]),
                    _: 2
                  }, [
                    x.label ? {
                      name: "label",
                      fn: h(() => [
                        typeof x.label != "string" ? (s(), v(ne(x.label), { key: 0 })) : (s(), B("span", ta, U(x.label), 1))
                      ]),
                      key: "0"
                    } : void 0
                  ]), 1032, ["prop", "label-width"])
                ]),
                _: 2
              }, 1032, ["xs", "sm", "md", "lg", "xl"]))), 128)),
              z(a(Oe), {
                xs: 24,
                sm: 24,
                md: a(A),
                lg: a(A),
                xl: a(A),
                class: "action-column"
              }, {
                default: h(() => [
                  W("div", {
                    class: "action-buttons-wrapper",
                    style: ve(S.value)
                  }, [
                    W("div", oa, [
                      e.showSearch ? (s(), v(a(pe), {
                        key: 0,
                        type: "primary",
                        plain: "",
                        class: "search-button",
                        onClick: H,
                        disabled: e.disabledSearch
                      }, {
                        default: h(() => [
                          X(U(a(p)("table.searchBar.search")), 1)
                        ]),
                        _: 1
                      }, 8, ["disabled"])) : _("", !0),
                      e.showReset ? (s(), v(a(pe), {
                        key: 1,
                        plain: "",
                        class: "reset-button",
                        onClick: w
                      }, {
                        default: h(() => [
                          X(U(a(p)("table.searchBar.reset")), 1)
                        ]),
                        _: 1
                      })) : _("", !0)
                    ]),
                    L.value ? (s(), B("div", {
                      key: 0,
                      class: "filter-toggle",
                      onClick: I
                    }, [
                      W("span", null, U(O.value), 1),
                      W("div", aa, [
                        z(a(nt), null, {
                          default: h(() => [
                            g.value ? (s(), v(a(Co), { key: 0 })) : (s(), v(a(Ao), { key: 1 }))
                          ]),
                          _: 1
                        })
                      ])
                    ])) : _("", !0)
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
}), Q = (e, o) => {
  const l = e.__vccOpts || e;
  for (const [t, n] of o)
    l[t] = n;
  return l;
}, na = /* @__PURE__ */ Q(la, [["__scopeId", "data-v-6125fcb8"]]), ra = ["src"], sa = /* @__PURE__ */ Y({
  name: "AoSvgIcon",
  inheritAttrs: !1,
  __name: "AoSvgIcon",
  props: {
    icon: {},
    size: { default: "1em" }
  },
  setup(e) {
    const o = e, l = $e(gt, () => {
    });
    function t(i) {
      if (!(!i || i.includes(":")))
        return l(i);
    }
    const n = ct(), c = b(() => t(o.icon)), p = b(() => ({
      class: n.class || "",
      style: [n.style, { width: o.size, height: o.size }]
    }));
    return (i, u) => c.value ? (s(), B("img", F({
      key: 0,
      src: c.value
    }, p.value, {
      class: "ao-svg-icon",
      alt: ""
    }), null, 16, ra)) : o.icon ? (s(), v(a(Io), F({
      key: 1,
      icon: o.icon
    }, p.value, { class: "ao-svg-icon" }), null, 16, ["icon"])) : _("", !0);
  }
}), ge = /* @__PURE__ */ Q(sa, [["__scopeId", "data-v-e3e5bfd5"]]), ia = /* @__PURE__ */ Y({
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
    const l = e, t = o, n = V(), c = b(() => l.loading ? "is-loading-icon" : l.active ? "is-active-icon" : "is-icon"), p = (i) => {
      t("click", i);
    };
    return (i, u) => (s(), B("div", {
      ref_key: "triggerRef",
      ref: n,
      class: J(["button", { "is-active": e.active }]),
      onClick: p
    }, [
      z(ge, {
        icon: e.icon,
        size: "1rem",
        class: J(c.value)
      }, null, 8, ["icon", "class"]),
      e.content ? (s(), v(a(io), {
        key: 0,
        "virtual-ref": n.value,
        "virtual-triggering": "",
        content: e.content,
        placement: "top",
        "show-after": 500
      }, null, 8, ["virtual-ref", "content"])) : _("", !0)
    ], 2));
  }
}), de = /* @__PURE__ */ Q(ia, [["__scopeId", "data-v-8e84760f"]]), le = {
  selection: "__selection__",
  expand: "__expand__",
  index: "__index__",
  globalIndex: "__globalIndex__"
}, Z = (e) => e.columnKey ?? le[e.type] ?? e.prop ?? e.slotName ?? "", xe = (e) => e.visible ?? !0, ua = (e, o) => {
  const l = e.type && e.type in le, t = xe(e);
  if (l) {
    const n = e.type;
    return {
      ...e,
      prop: le[n],
      // 列名以用户声明为准，仅在未声明时回落到内置文案
      label: e.label || o[n],
      visible: t
    };
  }
  return { ...e, visible: t };
}, Te = (e, o) => e.map((l) => ua(l, o));
function Wa(e) {
  const { t: o } = Ee(), l = b(() => ({
    selection: o("table.column.selection"),
    expand: o("table.column.expand"),
    index: o("table.column.index"),
    globalIndex: o("table.column.globalIndex")
  })), t = V(e()), n = V(
    Te(t.value, l.value)
  );
  He(l, (i) => {
    const u = new Map(t.value.map((r) => [Z(r), r]));
    n.value = n.value.map((r) => {
      if (r.type && r.type in le) {
        const f = r.type, m = u.get(Z(r));
        return {
          ...r,
          label: m?.label || i[f]
        };
      }
      return r;
    });
  });
  const c = b(() => {
    const i = new Map(t.value.map((u) => [Z(u), u]));
    return n.value.filter((u) => xe(u)).map((u) => {
      const r = Z(u), f = i.get(r);
      return f ? { ...f, visible: !0 } : u;
    });
  }), p = (i) => {
    const u = [...t.value], r = i(u);
    t.value = Array.isArray(r) ? r : u;
  };
  return {
    columns: c,
    columnChecks: n,
    /**
     * @description 新增列（支持单个或批量）
     * @param column 列配置或列配置数组
     * @param index 可选的插入位置，越界时追加到末尾
     */
    addColumn: (i, u) => {
      const r = Array.isArray(i) ? i : [i];
      if (r.length === 0) return;
      p((k) => {
        const d = [...k], R = typeof u == "number" && u >= 0 && u <= d.length ? u : d.length;
        return d.splice(R, 0, ...r), d;
      });
      const f = Te(r, l.value), m = [...n.value], g = typeof u == "number" && u >= 0 && u <= m.length ? u : m.length;
      m.splice(g, 0, ...f), n.value = m;
    },
    /**
     * @description 删除列（支持单个或批量）
     * @param prop 列的唯一标识或标识数组
     */
    removeColumn: (i) => {
      const u = Array.isArray(i) ? i : [i];
      u.length !== 0 && (p((r) => r.filter((f) => !u.includes(Z(f)))), n.value = n.value.filter(
        (r) => !u.includes(Z(r))
      ));
    },
    /**
     * @description 更新列（支持单个或批量）
     * @param prop 列的唯一标识或更新配置数组
     * @param updates 列配置更新，prop 为字符串时使用
     */
    updateColumn: (i, u) => {
      const r = Array.isArray(i) ? i : u ? [{ prop: i, updates: u }] : [];
      if (r.length === 0) return;
      const f = new Map(r.map((m) => [m.prop, m.updates]));
      p(
        (m) => m.map((g) => {
          const k = f.get(Z(g));
          return k ? { ...g, ...k } : g;
        })
      ), n.value = n.value.map((m) => {
        const g = Z(m), k = f.get(g);
        if (!k) return m;
        const d = { ...m, ...k };
        return d.type && d.type in le && (d.prop = le[d.type], d.label = d.label || l.value[d.type]), "visible" in k && (d.visible = k.visible), d;
      });
    },
    /**
     * @description 切换列显示状态（支持单个或批量），通过 visible 控制显隐
     * @param prop 列的唯一标识或标识数组
     * @param visible 可选的显示状态，未传时取反
     */
    toggleColumn: (i, u) => {
      const r = Array.isArray(i) ? i : [i];
      if (r.length === 0) return;
      const f = [...n.value], m = /* @__PURE__ */ new Map();
      r.forEach((g) => {
        const k = f.findIndex((R) => Z(R) === g);
        if (k < 0) return;
        const d = u ?? !xe(f[k]);
        f[k] = { ...f[k], visible: d }, m.set(g, d);
      }), n.value = f, p(
        (g) => g.map((k) => {
          const d = Z(k);
          return m.has(d) ? { ...k, visible: m.get(d) } : k;
        })
      );
    },
    /** @description 重置所有列到初始配置，恢复初始列显隐与初始列顺序 */
    resetColumns: () => {
      const i = e();
      t.value = [...i], n.value = Te(i, l.value);
    },
    /**
     * @description 批量更新列
     * @param updates 列更新配置
     * @deprecated 推荐使用 updateColumn 的数组模式
     */
    batchUpdateColumns: (i) => {
      if (!Array.isArray(i) || i.length === 0) return;
      const u = new Map(i.map((r) => [r.prop, r.updates]));
      p(
        (r) => r.map((f) => {
          const m = u.get(Z(f));
          return m ? { ...f, ...m } : f;
        })
      ), n.value = n.value.map((r) => {
        const f = Z(r), m = u.get(f);
        if (!m) return r;
        const g = { ...r, ...m };
        return g.type && g.type in le && (g.prop = le[g.type], g.label = g.label || l.value[g.type]), "visible" in m && (g.visible = m.visible), g;
      });
    },
    /**
     * @description 重新排序列，索引越界或原地移动时保持原顺序
     * @param fromIndex 源索引
     * @param toIndex 目标索引
     */
    reorderColumns: (i, u) => {
      const r = (f) => {
        if (i < 0 || i >= f.length || u < 0 || u >= f.length || i === u)
          return f;
        const m = [...f], [g] = m.splice(i, 1);
        return m.splice(u, 0, g), m;
      };
      p(r), n.value = r(n.value);
    },
    /**
     * @description 获取指定列的配置
     * @param prop 列的唯一标识
     * @return 列配置，未找到时返回 undefined
     */
    getColumnConfig: (i) => t.value.find((u) => Z(u) === i),
    /**
     * @description 获取所有列配置的副本
     * @return 所有列配置
     */
    getAllColumns: () => [...t.value]
  };
}
const ca = { class: "table-header-root" }, da = { class: "left-wrap" }, fa = { class: "right-wrap" }, pa = /* @__PURE__ */ Y({
  name: "AoTableHeader",
  __name: "AoTableHeader",
  props: /* @__PURE__ */ se({
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
  emits: /* @__PURE__ */ se(["refresh", "search", "update:showSearchBar"], ["update:columns"]),
  setup(e, { emit: o }) {
    const { t: l } = Ee(), t = e, n = he(e, "columns"), c = o, p = (A, D) => {
      A.visible = !!D;
    }, i = [
      { value: me.SMALL, label: l("table.sizeOptions.small") },
      { value: me.DEFAULT, label: l("table.sizeOptions.default") },
      { value: me.LARGE, label: l("table.sizeOptions.large") }
    ], u = ze(), { tableSize: r, isZebra: f, isBorder: m, isHeaderBackground: g } = mt(u), k = b(() => t.layout.split(",").map((A) => A.trim())), d = (A) => k.value.includes(A), R = (A) => {
      const D = A.related;
      return !(D && D.classList.contains("fixed-column"));
    }, E = () => {
      c("update:showSearchBar", !t.showSearchBar), c("search");
    }, C = () => {
      O.value = !0, c("refresh");
    }, L = (A) => {
      ze().setTableSize(A);
    }, O = V(!1), S = V(!1), I = V(""), w = () => {
      const A = document.querySelector(`.${t.fullClass}`);
      A && (S.value = !S.value, S.value ? (I.value = document.body.style.overflow, document.body.style.overflow = "hidden", A.classList.add("el-full-screen"), u.setIsFullScreen(!0)) : (document.body.style.overflow = I.value, A.classList.remove("el-full-screen"), u.setIsFullScreen(!1)));
    }, H = (A) => {
      A.key === "Escape" && S.value && w();
    };
    return bo(() => {
      document.addEventListener("keydown", H);
    }), yo(() => {
      if (document.removeEventListener("keydown", H), S.value) {
        document.body.style.overflow = I.value;
        const A = document.querySelector(`.${t.fullClass}`);
        A && A.classList.remove("el-full-screen");
      }
    }), (A, D) => (s(), B("div", ca, [
      W("div", da, [
        N(A.$slots, "left", {}, void 0, !0)
      ]),
      W("div", fa, [
        N(A.$slots, "right", {}, void 0, !0),
        e.showSearchBar != null ? (s(), v(de, {
          key: 0,
          icon: "ri:search-line",
          content: a(l)("table.header.search"),
          active: e.showSearchBar,
          onClick: E
        }, null, 8, ["content", "active"])) : _("", !0),
        d("refresh") ? (s(), v(de, {
          key: 1,
          icon: "ri:refresh-line",
          content: a(l)("table.header.refresh"),
          loading: e.loading && O.value,
          onClick: C
        }, null, 8, ["content", "loading"])) : _("", !0),
        d("size") ? (s(), v(a(rt), {
          key: 2,
          onCommand: L
        }, {
          dropdown: h(() => [
            z(a(st), null, {
              default: h(() => [
                (s(), B(G, null, K(i, (T) => W("div", {
                  key: T.value,
                  class: J(["table-size-btn-item", { "is-current-size": a(r) === T.value }])
                }, [
                  (s(), v(a(it), {
                    key: T.value,
                    command: T.value
                  }, {
                    default: h(() => [
                      X(U(T.label), 1)
                    ]),
                    _: 2
                  }, 1032, ["command"]))
                ], 2)), 64))
              ]),
              _: 1
            })
          ]),
          default: h(() => [
            z(de, {
              icon: "ri:arrow-up-down-fill",
              content: a(l)("table.header.size")
            }, null, 8, ["content"])
          ]),
          _: 1
        })) : _("", !0),
        d("fullscreen") ? (s(), v(de, {
          key: 3,
          icon: S.value ? "ri:fullscreen-exit-line" : "ri:fullscreen-line",
          content: a(l)("table.header.fullscreen"),
          onClick: w
        }, null, 8, ["icon", "content"])) : _("", !0),
        d("columns") ? (s(), v(a(Ze), {
          key: 4,
          placement: "bottom",
          trigger: "click"
        }, {
          reference: h(() => [
            z(de, {
              icon: "ri:align-right",
              content: a(l)("table.header.columns")
            }, null, 8, ["content"])
          ]),
          default: h(() => [
            W("div", null, [
              z(a(uo), { "max-height": "380px" }, {
                default: h(() => [
                  z(a(Oo), {
                    modelValue: n.value,
                    "onUpdate:modelValue": D[0] || (D[0] = (T) => n.value = T),
                    disabled: !1,
                    filter: ".fixed-column",
                    "prevent-on-filter": !1,
                    onMove: R
                  }, {
                    default: h(() => [
                      (s(!0), B(G, null, K(n.value, (T) => (s(), B("div", {
                        key: T.columnKey || T.prop || T.type,
                        class: J(["column-option", { "fixed-column": T.fixed }])
                      }, [
                        W("div", {
                          class: J(["drag-icon", T.fixed ? "is-fixed" : "is-movable"])
                        }, [
                          z(ge, {
                            icon: T.fixed ? "ri:unpin-line" : "ri:drag-move-2-fill",
                            class: "drag-icon-svg"
                          }, null, 8, ["icon"])
                        ], 2),
                        z(a(ue), {
                          "model-value": a(xe)(T),
                          "onUpdate:modelValue": (ie) => p(T, ie),
                          disabled: T.disabled,
                          class: "column-checkbox"
                        }, {
                          default: h(() => [
                            X(U(T.label || (T.type === "selection" ? a(l)("table.selection") : "")), 1)
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
        })) : _("", !0),
        d("settings") ? (s(), v(a(Ze), {
          key: 5,
          placement: "bottom",
          trigger: "click"
        }, {
          reference: h(() => [
            z(de, {
              icon: "ri:settings-line",
              content: a(l)("table.header.settings")
            }, null, 8, ["content"])
          ]),
          default: h(() => [
            W("div", null, [
              e.showZebra ? (s(), v(a(ue), {
                key: 0,
                modelValue: a(f),
                "onUpdate:modelValue": D[1] || (D[1] = (T) => Ae(f) ? f.value = T : null),
                value: !0
              }, {
                default: h(() => [
                  X(U(a(l)("table.zebra")), 1)
                ]),
                _: 1
              }, 8, ["modelValue"])) : _("", !0),
              e.showBorder ? (s(), v(a(ue), {
                key: 1,
                modelValue: a(m),
                "onUpdate:modelValue": D[2] || (D[2] = (T) => Ae(m) ? m.value = T : null),
                value: !0
              }, {
                default: h(() => [
                  X(U(a(l)("table.border")), 1)
                ]),
                _: 1
              }, 8, ["modelValue"])) : _("", !0),
              e.showHeaderBackground ? (s(), v(a(ue), {
                key: 2,
                modelValue: a(g),
                "onUpdate:modelValue": D[3] || (D[3] = (T) => Ae(g) ? g.value = T : null),
                value: !0
              }, {
                default: h(() => [
                  X(U(a(l)("table.headerBackground")), 1)
                ]),
                _: 1
              }, 8, ["modelValue"])) : _("", !0)
            ])
          ]),
          _: 1
        })) : _("", !0)
      ])
    ]));
  }
}), ma = /* @__PURE__ */ Q(pa, [["__scopeId", "data-v-7c40a1b5"]]), ha = { key: 0 }, va = { class: "ao-table-bottom__left" }, ga = {
  key: 0,
  class: "pagination custom-pagination"
}, ba = "YYYY/MM/DD HH:mm:ss", ya = /* @__PURE__ */ Y({
  name: "AoTable",
  __name: "index",
  props: /* @__PURE__ */ se({
    data: {},
    columns: { default: () => [] },
    operationWidth: {},
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
  emits: /* @__PURE__ */ se(["size-change", "current-change", "refresh", "search", "reset", "update:showSearchBar"], ["update:searchForm", "update:columnChecks"]),
  setup(e, { expose: o, emit: l }) {
    const t = e, n = he(e, "searchForm"), c = he(e, "columnChecks"), p = wo(), i = ct(), u = dt(), { width: r } = ht(), f = V(null), m = V(), g = V(), k = ze(), { isBorder: d, isZebra: R, tableSize: E, isFullScreen: C, isHeaderBackground: L } = mt(k), O = V(null), S = V(null), I = {
      MOBILE: "prev, pager, next, sizes, jumper, total",
      IPAD: "prev, pager, next, jumper, total",
      DESKTOP: "total, prev, pager, next, sizes, jumper"
    }, w = b(() => r.value < 768 ? I.MOBILE : r.value < 1024 ? I.IPAD : I.DESKTOP), H = b(() => ({
      background: !0,
      hideOnSinglePage: !1,
      size: "default",
      pagerCount: r.value > 1200 ? 7 : 5,
      layout: w.value,
      ...t.paginationOptions
    })), A = b(() => t.border ?? d.value), D = b(() => t.stripe ?? R.value), T = b(() => t.size ?? E.value), ie = b(() => t.data?.length === 0), M = b(() => t.pagination?.currentPage ?? 1), ee = b(() => t.pagination?.pageSize ?? 10), x = b(() => t.pagination?.total ?? 0), j = b(() => (t.searchItems?.length ?? 0) > 0), _e = b(() => !!(u["header-left"] || u["header-right"])), be = b(
      () => t.integrated ?? (j.value || _e.value)
    ), De = V(!0), Ne = b(() => t.showSearchBar ?? De.value), Bt = b(
      () => j.value ? Ne.value : void 0
    ), _t = b(() => be.value && t.showTableHeader), Ct = b(() => be.value ? "is-integrated" : "is-bare"), At = b(() => be.value ? co : "div"), Tt = b(() => be.value ? "ao-table-card" : "ao-table-bare"), Ue = V(0), je = V(0);
    qe(m, (y) => {
      const $ = y[0];
      $ && requestAnimationFrame(() => {
        Ue.value = $.contentRect.height;
      });
    }), qe(g, (y) => {
      const $ = y[0];
      $ && requestAnimationFrame(() => {
        je.value = $.contentRect.height;
      });
    });
    const Ot = V(10), { containerHeight: It } = No({
      showTableHeader: b(() => t.showTableHeader),
      bottomBarHeight: Ue,
      tableHeaderHeight: je,
      bottomBarSpacing: Ot
    }), Rt = b(() => C.value ? "100%" : ie.value && !t.loading ? t.emptyHeight : t.height ? t.height : "100%"), Mt = b(() => ({
      background: L.value ? "var(--ao-table-header-bg-color)" : "var(--default-box-color)",
      ...t.headerCellStyle || {}
      // 合并用户传入的样式
    })), zt = (y) => {
      const $ = p?.vnode.props || {}, te = y.replace(/[A-Z]/g, (P) => `-${P.toLowerCase()}`);
      return y in $ || te in $;
    }, Vt = [
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
    ], Lt = b(() => {
      const y = { ...t };
      return Vt.forEach(($) => {
        delete y[$];
      }), y;
    }), $t = b(() => ({
      ...i,
      ...Lt.value,
      height: Rt.value,
      stripe: D.value,
      border: A.value,
      size: T.value,
      headerCellStyle: Mt.value,
      // Element Plus 默认值为 true，未显式传入时不应被 AoTable 覆盖成 false。
      selectOnIndeterminate: zt("selectOnIndeterminate") ? t.selectOnIndeterminate : void 0
    })), We = b(() => x.value > 0 && !ie.value), Ke = (y) => y.$index === void 0 || y.$index >= 0, Pt = ["slotName", "visible", "disabled", "timestamp"], Ht = (y, $) => {
      if (y == null || y === "") return "-";
      const te = Bo(Number(y) * 1e3);
      return te.isValid() ? te.format($) : "-";
    }, Ft = (y) => {
      const $ = y.format ?? ba;
      return (te, P, ae) => Ht(y.field ? te?.[y.field] : ae, $);
    }, Ce = (y) => {
      const $ = { ...y };
      return Pt.forEach((te) => {
        delete $[te];
      }), y.timestamp && ($.formatter = Ft(y.timestamp)), $;
    }, Dt = (y) => {
      ce("size-change", y);
    }, Nt = (y) => {
      ce("current-change", y), Ge();
    }, Ut = async (y) => {
      if (t.searchRules)
        try {
          await O.value?.validate();
        } catch {
          return;
        }
      ce("search", y);
    }, jt = () => {
      ce("reset");
    }, Wt = () => {
      ce("refresh");
    }, Kt = (y) => {
      t.showSearchBar === void 0 && (De.value = y), ce("update:showSearchBar", y);
    }, Gt = Do, Ge = () => {
      pt(() => {
        f.value?.setScrollTop(0), Gt();
      });
    }, Zt = (y) => (M.value - 1) * ee.value + y + 1, ce = l;
    return So(
      () => {
        g.value = S.value?.$el ?? void 0;
      },
      { flush: "post" }
    ), o({
      scrollToTop: Ge,
      elTableRef: f
    }), (y, $) => {
      const te = ft("loading");
      return s(), B("div", {
        class: J(["ao-table-root", Ct.value])
      }, [
        j.value ? Se((s(), v(na, {
          key: 0,
          ref_key: "searchBarRef",
          ref: O,
          modelValue: n.value,
          "onUpdate:modelValue": $[0] || ($[0] = (P) => n.value = P),
          items: e.searchItems,
          rules: e.searchRules,
          span: e.searchSpan,
          "show-expand": e.searchShowExpand,
          onSearch: Ut,
          onReset: jt
        }, null, 8, ["modelValue", "items", "rules", "span", "show-expand"])), [
          [ko, Ne.value]
        ]) : _("", !0),
        (s(), v(ne(At.value), {
          class: J(Tt.value)
        }, {
          default: h(() => [
            _t.value ? (s(), v(ma, {
              key: 0,
              ref_key: "tableHeaderCompRef",
              ref: S,
              columns: c.value,
              "onUpdate:columns": $[1] || ($[1] = (P) => c.value = P),
              "show-search-bar": Bt.value,
              "show-zebra": e.headerShowZebra,
              "show-border": e.headerShowBorder,
              "show-header-background": e.headerShowHeaderBackground,
              loading: e.loading,
              "onUpdate:showSearchBar": Kt,
              onRefresh: Wt
            }, {
              left: h(() => [
                N(y.$slots, "header-left", {}, void 0, !0)
              ]),
              right: h(() => [
                N(y.$slots, "header-right", {}, void 0, !0)
              ]),
              _: 3
            }, 8, ["columns", "show-search-bar", "show-zebra", "show-border", "show-header-background", "loading"])) : _("", !0),
            W("div", {
              class: J(["ao-table", { "is-empty": ie.value }]),
              style: ve(a(It))
            }, [
              Se((s(), v(a(fo), F({
                ref_key: "elTableRef",
                ref: f
              }, $t.value), {
                default: h(() => [
                  (s(!0), B(G, null, K(e.columns, (P) => (s(), B(G, {
                    key: P.columnKey || P.prop || P.type
                  }, [
                    P.type === "globalIndex" ? (s(), v(a(we), F({
                      key: 0,
                      ref_for: !0
                    }, Ce(P)), {
                      default: h(({ $index: ae }) => [
                        W("span", null, U(Zt(ae)), 1)
                      ]),
                      _: 1
                    }, 16)) : P.type === "expand" ? (s(), v(a(we), F({
                      key: 1,
                      ref_for: !0
                    }, Ce(P)), re({ _: 2 }, [
                      P.slotName ? {
                        name: "default",
                        fn: h((ae) => [
                          N(y.$slots, P.slotName, F({ ref_for: !0 }, ae), void 0, !0)
                        ]),
                        key: "0"
                      } : void 0
                    ]), 1040)) : (s(), v(a(we), F({
                      key: 2,
                      ref_for: !0
                    }, Ce(P)), re({ _: 2 }, [
                      P.slotName ? {
                        name: "default",
                        fn: h((ae) => [
                          Ke(ae) ? N(y.$slots, P.slotName, F({ ref_for: !0 }, ae), void 0, !0, 0) : _("", !0)
                        ]),
                        key: "0"
                      } : void 0
                    ]), 1040))
                  ], 64))), 128)),
                  a(u).default ? N(y.$slots, "default", {}, void 0, !0, 0) : _("", !0),
                  a(u).operation ? (s(), v(a(we), {
                    key: 1,
                    label: "操作",
                    width: e.operationWidth,
                    fixed: "right",
                    align: "left"
                  }, {
                    default: h((P) => [
                      Ke(P) ? N(y.$slots, "operation", Re(Me(P)), void 0, !0, 0) : _("", !0)
                    ]),
                    _: 3
                  }, 8, ["width"])) : _("", !0)
                ]),
                empty: h(() => [
                  e.loading ? (s(), B("div", ha)) : (s(), v(a(po), {
                    key: 1,
                    description: e.emptyText,
                    "image-size": 120
                  }, null, 8, ["description"]))
                ]),
                _: 3
              }, 16)), [
                [te, !!e.loading]
              ])
            ], 6),
            W("div", {
              class: J(["ao-table-bottom", { "is-bar-empty": !We.value && !y.$slots.footer }]),
              ref_key: "bottomBarRef",
              ref: m
            }, [
              W("div", va, [
                N(y.$slots, "footer", {}, void 0, !0)
              ]),
              We.value ? (s(), B("div", ga, [
                z(a(mo), F(H.value, {
                  total: x.value,
                  disabled: e.loading,
                  "current-page": M.value,
                  "page-size": ee.value,
                  onSizeChange: Dt,
                  onCurrentChange: Nt
                }), null, 16, ["total", "disabled", "current-page", "page-size"])
              ])) : _("", !0)
            ], 2)
          ]),
          _: 3
        }, 8, ["class"]))
      ], 2);
    };
  }
}), Ka = /* @__PURE__ */ Q(ya, [["__scopeId", "data-v-0d8a310a"]]), wa = { class: "form-section" }, Sa = {
  key: 0,
  class: "form-title"
}, ka = { key: 1 }, xa = { key: 1 }, Ea = /* @__PURE__ */ Y({
  __name: "FormBody",
  props: /* @__PURE__ */ se({
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
  emits: /* @__PURE__ */ se(["reset", "submit"], ["update:modelValue"]),
  setup(e, { expose: o, emit: l }) {
    const t = e, n = l, c = he(e, "modelValue"), p = Pe("formRef"), i = V({});
    i.value = oe(c.value), He(c, (S) => {
      i.value = oe(S);
    });
    const u = b(() => ({
      ...Be,
      ...t.sanitizeOutput
    })), r = (S) => yt(c.value, S), f = (S, I) => {
      wt(c.value, S, I);
    }, m = (S, I) => Je(S) ? 24 : Et(Qo(S.span, E.value), I), g = b(() => t.items.filter((S) => !S.hidden)), k = () => Le(c.value, u.value);
    o({
      validate: (...S) => p.value.validate(...S),
      /**
       * @description 清除指定字段或全部字段的校验状态，不修改表单值
       * @param args Element Plus clearValidate 的字段参数，省略时清除全部字段
       */
      clearValidate: (...S) => p.value?.clearValidate(...S),
      reset: () => {
        p.value?.resetFields(), Object.keys(c.value).forEach((S) => {
          delete c.value[S];
        }), Object.assign(c.value, oe(i.value)), n("reset");
      },
      submit: async () => {
        try {
          await p.value?.validate();
        } catch {
          console.error("[AoForm] 表单校验失败");
          return;
        }
        n("submit", k());
      },
      // 允许外部在不触发提交事件时主动获取清洗后的输出。
      getOutput: k
    });
    const { span: E, gutter: C, labelPosition: L, labelWidth: O } = ut(t);
    return (S, I) => (s(), B("section", wa, [
      z(a(et), F({
        ref: "formRef",
        model: c.value,
        "label-position": a(L)
      }, { ...S.$attrs }), {
        default: h(() => [
          z(a(tt), { gutter: a(C) }, {
            default: h(() => [
              (s(!0), B(G, null, K(g.value, (w) => (s(), v(a(Oe), {
                key: w.key,
                xs: m(w, "xs"),
                sm: m(w, "sm"),
                md: m(w, "md"),
                lg: m(w, "lg"),
                xl: m(w, "xl")
              }, {
                default: h(() => [
                  a(Je)(w) ? (s(), B("div", Sa, [
                    typeof w.label != "string" ? (s(), v(ne(w.label), { key: 0 })) : (s(), B("span", ka, U(w.label), 1))
                  ])) : (s(), v(a(ot), {
                    key: 1,
                    prop: w.key,
                    "label-width": w.label ? w.labelWidth || a(O) : void 0
                  }, re({
                    default: h(() => [
                      N(S.$slots, w.key, {
                        item: w,
                        modelValue: c.value
                      }, () => [
                        (s(), v(ne(a(xt)(w)), F({
                          "model-value": r(w.key),
                          "onUpdate:modelValue": (H) => f(w.key, H)
                        }, { ref_for: !0 }, a(St)(w)), re({
                          default: h(() => [
                            w.type === "select" && a(q)(w).length ? (s(!0), B(G, { key: 0 }, K(a(q)(w), (H) => (s(), v(a(at), F({ ref_for: !0 }, H, {
                              key: String(H.value)
                            }), null, 16))), 128)) : _("", !0),
                            w.type === "checkboxgroup" && a(q)(w).length ? (s(!0), B(G, { key: 1 }, K(a(q)(w), (H) => (s(), v(a(ue), F({ ref_for: !0 }, H, {
                              key: String(H.value)
                            }), null, 16))), 128)) : _("", !0),
                            w.type === "radiogroup" && a(q)(w).length ? (s(!0), B(G, { key: 2 }, K(a(q)(w), (H) => (s(), v(a(lt), F({ ref_for: !0 }, H, {
                              key: String(H.value)
                            }), null, 16))), 128)) : _("", !0)
                          ]),
                          _: 2
                        }, [
                          K(a(kt)(w), (H, A) => ({
                            name: A,
                            fn: h(() => [
                              (s(), v(ne(H)))
                            ])
                          }))
                        ]), 1040, ["model-value", "onUpdate:modelValue"]))
                      ], !0)
                    ]),
                    _: 2
                  }, [
                    w.label ? {
                      name: "label",
                      fn: h(() => [
                        typeof w.label != "string" ? (s(), v(ne(w.label), { key: 0 })) : (s(), B("span", xa, U(w.label), 1))
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
}), Qe = /* @__PURE__ */ Q(Ea, [["__scopeId", "data-v-e7e83958"]]), Ga = /* @__PURE__ */ Y({
  name: "AoForm",
  inheritAttrs: !1,
  __name: "index",
  props: /* @__PURE__ */ se({
    loading: { type: Boolean, default: !1 },
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
  emits: /* @__PURE__ */ se(["update:visible", "cancel", "closed", "reset", "submit"], ["update:modelValue"]),
  setup(e, { expose: o, emit: l }) {
    const t = e, n = l, c = he(e, "modelValue"), { t: p } = Ee(), i = dt(), u = Pe("formBodyRef"), r = b(() => t.dialog), f = b(() => ({
      items: t.items,
      span: t.span,
      gutter: t.gutter,
      labelPosition: t.labelPosition,
      labelWidth: t.labelWidth,
      sanitizeOutput: t.sanitizeOutput
    })), m = () => {
      n("reset");
    }, g = (E) => {
      n("submit", E);
    }, k = (E) => {
      n("update:visible", E);
    }, d = () => {
      n("cancel"), k(!1);
    }, R = () => {
      u.value?.submit();
    };
    return o({
      /** 校验表单，透传表单主体的 validate */
      validate: (...E) => u.value.validate(...E),
      /**
       * @description 清除指定字段或全部字段的校验状态，透传表单主体的 clearValidate
       * @param args 待清除校验的字段参数，省略时清除全部字段
       */
      clearValidate: (...E) => u.value?.clearValidate(...E),
      /** 重置表单，透传表单主体的 reset */
      reset: () => u.value?.reset(),
      /** 触发提交（含校验），透传表单主体的 submit */
      submit: () => u.value?.submit(),
      /** 读取清洗后的表单输出，透传表单主体的 getOutput */
      getOutput: () => u.value?.getOutput() ?? {}
    }), (E, C) => {
      const L = ft("loading");
      return r.value ? (s(), v(a(ho), {
        key: 0,
        class: "ao-form-dialog",
        "model-value": e.visible,
        title: e.title,
        width: e.width,
        "align-center": e.alignCenter,
        draggable: "",
        overflow: !1,
        "onUpdate:modelValue": k,
        onClosed: C[1] || (C[1] = (O) => n("closed"))
      }, {
        footer: h(() => [
          N(E.$slots, "footer", {}, () => [
            z(a(pe), { onClick: d }, {
              default: h(() => [
                X(U(e.cancelText || a(p)("common.cancel")), 1)
              ]),
              _: 1
            }),
            e.showSubmit ? (s(), v(a(pe), {
              key: 0,
              type: "primary",
              disabled: e.disabledSubmit || e.loading,
              onClick: R
            }, {
              default: h(() => [
                X(U(e.confirmText || a(p)("common.confirm")), 1)
              ]),
              _: 1
            }, 8, ["disabled"])) : _("", !0)
          ])
        ]),
        default: h(() => [
          Se((s(), v(Qe, F({
            ref_key: "formBodyRef",
            ref: u
          }, { ...f.value, ...E.$attrs }, {
            modelValue: c.value,
            "onUpdate:modelValue": C[0] || (C[0] = (O) => c.value = O),
            onReset: m,
            onSubmit: g
          }), re({ _: 2 }, [
            K(a(i), (O, S) => ({
              name: S,
              fn: h((I) => [
                N(E.$slots, S, Re(Me(I ?? {})))
              ])
            }))
          ]), 1040, ["modelValue"])), [
            [L, e.loading]
          ])
        ]),
        _: 3
      }, 8, ["model-value", "title", "width", "align-center"])) : Se((s(), v(Qe, F({
        key: 1,
        ref_key: "formBodyRef",
        ref: u
      }, { ...f.value, ...E.$attrs }, {
        modelValue: c.value,
        "onUpdate:modelValue": C[2] || (C[2] = (O) => c.value = O),
        onReset: m,
        onSubmit: g
      }), re({ _: 2 }, [
        K(a(i), (O, S) => ({
          name: S,
          fn: h((I) => [
            N(E.$slots, S, Re(Me(I ?? {})))
          ])
        }))
      ]), 1040, ["modelValue"])), [
        [L, e.loading]
      ]);
    };
  }
}), Ba = /* @__PURE__ */ Y({
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
    }, c = b(() => l.icon || (l.type ? n[l.type]?.icon : "") || ""), p = b(() => l.iconClass || (l.type ? n[l.type]?.class : "") || ""), i = () => {
      t("click");
    };
    return (u, r) => (s(), B("div", {
      class: J(["ao-button-table", p.value]),
      style: ve({ backgroundColor: e.buttonBgColor, color: e.iconColor }),
      onClick: i
    }, [
      z(ge, { icon: c.value }, null, 8, ["icon"])
    ], 6));
  }
}), Za = /* @__PURE__ */ Q(Ba, [["__scopeId", "data-v-005b60b0"]]), _a = /* @__PURE__ */ Y({
  name: "AoIconButton",
  __name: "AoIconButton",
  props: {
    icon: {},
    circle: { type: Boolean }
  },
  setup(e) {
    return (o, l) => (s(), B("div", {
      class: J(["icon-button", { "is-circle": e.circle }])
    }, [
      z(ge, { icon: e.icon }, null, 8, ["icon"]),
      N(o.$slots, "default", {}, void 0, !0)
    ], 2));
  }
}), Ca = /* @__PURE__ */ Q(_a, [["__scopeId", "data-v-a298f446"]]), Aa = /* @__PURE__ */ Y({
  name: "AoButtonMore",
  __name: "AoButtonMore",
  props: {
    list: {},
    auth: {}
  },
  emits: ["click"],
  setup(e, { emit: o }) {
    const { hasAuth: l } = Fo(), t = e, n = b(() => t.list.some((i) => !i.auth || l(i.auth))), c = o, p = (i) => {
      c("click", i);
    };
    return (i, u) => (s(), B("div", null, [
      n.value ? (s(), v(a(rt), { key: 0 }, {
        dropdown: h(() => [
          z(a(st), null, {
            default: h(() => [
              (s(!0), B(G, null, K(e.list, (r) => (s(), B(G, {
                key: r.key
              }, [
                !r.auth || a(l)(r.auth) ? (s(), v(a(it), {
                  key: 0,
                  disabled: r.disabled,
                  onClick: (f) => p(r)
                }, {
                  default: h(() => [
                    W("div", {
                      class: "dropdown-item-content",
                      style: ve({ color: r.color })
                    }, [
                      r.icon ? (s(), v(ge, {
                        key: 0,
                        icon: r.icon
                      }, null, 8, ["icon"])) : _("", !0),
                      W("span", null, U(r.label), 1)
                    ], 4)
                  ]),
                  _: 2
                }, 1032, ["disabled", "onClick"])) : _("", !0)
              ], 64))), 128))
            ]),
            _: 1
          })
        ]),
        default: h(() => [
          z(Ca, {
            icon: "ri:more-2-fill",
            class: "more-button"
          })
        ]),
        _: 1
      })) : _("", !0)
    ]));
  }
}), Ya = /* @__PURE__ */ Q(Aa, [["__scopeId", "data-v-e5e8e40b"]]), Ta = /* @__PURE__ */ Y({
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
    class c extends Error {
      constructor(R, E, C) {
        super(R), this.code = E, this.details = C, this.name = "ExportError";
      }
      code;
      details;
    }
    const p = V(!1), i = b(() => Array.isArray(t.data) && t.data.length > 0), u = (d) => {
      if (!Array.isArray(d))
        throw new c("数据必须是数组格式", "INVALID_DATA_TYPE");
      if (d.length === 0)
        throw new c("没有可导出的数据", "NO_DATA");
      if (d.length > t.maxRows)
        throw new c(`数据行数超过限制（${t.maxRows}行）`, "EXCEED_MAX_ROWS", {
          currentRows: d.length,
          maxRows: t.maxRows
        });
    }, r = (d, R, E, C) => {
      const L = t.columns[R];
      return L?.formatter ? L.formatter(d, E, C) : d == null ? "" : d instanceof Date ? d.toLocaleDateString("zh-CN") : typeof d == "boolean" ? d ? "是" : "否" : String(d);
    }, f = (d) => d.map((E, C) => {
      const L = {};
      return t.autoIndex && (L[t.indexColumnTitle] = String(C + 1)), Object.entries(E).forEach(([O, S]) => {
        let I = O;
        t.columns[O]?.title ? I = t.columns[O].title : t.headers[O] && (I = t.headers[O]), L[I] = r(S, O, E, C);
      }), L;
    }), m = (d) => {
      if (d.length === 0) return [];
      const R = Math.min(d.length, 100);
      return Object.keys(d[0]).map((C) => {
        const L = Object.values(t.columns).find((I) => I.title === C)?.width;
        if (L)
          return { wch: L };
        const O = Math.max(
          C.length,
          ...d.slice(0, R).map((I) => String(I[C] || "").length)
        );
        return { wch: Math.min(Math.max(O + 2, 8), 50) };
      });
    }, g = async (d, R, E) => {
      try {
        n("export-progress", 10);
        const C = f(d);
        n("export-progress", 30);
        const L = fe.utils.book_new();
        t.workbookOptions && (L.Props = {
          Title: R,
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
        const O = fe.utils.json_to_sheet(C);
        O["!cols"] = m(C), n("export-progress", 70), fe.utils.book_append_sheet(L, O, E), n("export-progress", 85);
        const S = fe.write(L, {
          bookType: "xlsx",
          type: "array",
          compression: !0
        }), I = new Blob([S], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        });
        n("export-progress", 95);
        const w = (/* @__PURE__ */ new Date()).toISOString().replace(/[:.]/g, "-"), H = `${R}_${w}.xlsx`;
        return Ro.saveAs(I, H), n("export-progress", 100), await pt(), Promise.resolve();
      } catch (C) {
        throw new c(`Excel 导出失败: ${C.message}`, "EXPORT_FAILED", C);
      }
    }, k = _o(async () => {
      if (!p.value) {
        p.value = !0;
        try {
          u(t.data), n("before-export", t.data), await g(t.data, t.filename, t.sheetName), n("export-success", t.filename, t.data.length), t.showSuccessMessage && Ye.success({
            message: `成功导出 ${t.data.length} 条数据`,
            duration: 3e3
          });
        } catch (d) {
          const R = d instanceof c ? d : new c(`导出失败: ${d.message}`, "UNKNOWN_ERROR", d);
          n("export-error", R), t.showErrorMessage && Ye.error({
            message: R.message,
            duration: 5e3
          }), console.error("Excel 导出错误:", R);
        } finally {
          p.value = !1, n("export-progress", 0);
        }
      }
    }, 1e3);
    return o({
      exportData: k,
      isExporting: xo(p),
      hasData: i
    }), (d, R) => (s(), v(a(pe), {
      type: e.type,
      size: e.size,
      loading: p.value,
      disabled: e.disabled || !i.value,
      onClick: a(k)
    }, {
      loading: h(() => [
        z(a(nt), { class: "is-loading" }, {
          default: h(() => [
            z(a(To))
          ]),
          _: 1
        }),
        X(" " + U(e.loadingText), 1)
      ]),
      default: h(() => [
        N(d.$slots, "default", {}, () => [
          X(U(e.buttonText), 1)
        ], !0)
      ]),
      _: 3
    }, 8, ["type", "size", "loading", "disabled", "onClick"]));
  }
}), qa = /* @__PURE__ */ Q(Ta, [["__scopeId", "data-v-eae0b991"]]), Oa = { class: "excel-import" }, Ia = /* @__PURE__ */ Y({
  name: "AoExcelImport",
  __name: "AoExcelImport",
  emits: ["import-success", "import-error"],
  setup(e, { emit: o }) {
    async function l(c) {
      return new Promise((p, i) => {
        const u = new FileReader();
        u.onload = (r) => {
          try {
            const f = r.target?.result, m = fe.read(f, { type: "array" }), g = m.SheetNames[0], k = m.Sheets[g], d = fe.utils.sheet_to_json(k);
            p(d);
          } catch (f) {
            i(f);
          }
        }, u.onerror = (r) => i(r), u.readAsArrayBuffer(c);
      });
    }
    const t = o, n = async (c) => {
      try {
        if (!c.raw) return;
        const p = await l(c.raw);
        t("import-success", p);
      } catch (p) {
        t("import-error", p);
      }
    };
    return (c, p) => (s(), B("div", Oa, [
      z(a(vo), {
        "auto-upload": !1,
        accept: ".xlsx, .xls",
        "show-file-list": !1,
        onChange: n
      }, {
        default: h(() => [
          z(a(pe), { type: "primary" }, {
            default: h(() => [
              N(c.$slots, "default", {}, () => [
                p[0] || (p[0] = X("导入 Excel", -1))
              ], !0)
            ]),
            _: 3
          })
        ]),
        _: 3
      })
    ]));
  }
}), Xa = /* @__PURE__ */ Q(Ia, [["__scopeId", "data-v-81d063bb"]]), Ra = { class: "logo-container" }, Ma = ["src"], za = /* @__PURE__ */ Y({
  name: "AoLogo",
  __name: "AoLogo",
  props: {
    size: { default: 36 },
    src: {}
  },
  setup(e) {
    const o = e, l = $e(bt, void 0), t = b(() => o.src ?? l), n = b(() => ({ width: `${o.size}px` }));
    return (c, p) => (s(), B("div", Ra, [
      t.value ? (s(), B("img", {
        key: 0,
        style: ve(n.value),
        src: t.value,
        alt: "logo",
        class: "logo-img"
      }, null, 12, Ma)) : _("", !0)
    ]));
  }
}), Ja = /* @__PURE__ */ Q(za, [["__scopeId", "data-v-79a50d9f"]]), Qa = {
  install(e, o = {}) {
    console.info(`[ao-admin-components] v${Ho}`), o.i18n && (o.i18n.global.mergeLocaleMessage("zh", Vo), o.i18n.global.mergeLocaleMessage("en", Po)), e.provide(vt, o.getAuthList ?? (() => {
    })), e.provide(gt, o.resolveLocalSvg ?? (() => {
    })), e.provide(bt, o.assets?.logo), e.directive("loading", go);
  }
};
export {
  vt as AUTH_LIST_KEY,
  Qa as AdminComponents,
  Ya as AoButtonMore,
  Za as AoButtonTable,
  qa as AoExcelExport,
  Xa as AoExcelImport,
  Ga as AoForm,
  Ca as AoIconButton,
  Ja as AoLogo,
  na as AoSearchBar,
  ge as AoSvgIcon,
  Ka as AoTable,
  ma as AoTableHeader,
  de as AoTableHeaderButton,
  gt as LOCAL_SVG_KEY,
  bt as LOGO_URL_KEY,
  me as TableSizeEnum,
  Z as getColumnKey,
  xe as getColumnVisibility,
  Fo as useAuth,
  Wa as useTableColumns,
  No as useTableHeight,
  ze as useTableStore,
  Ho as version
};
