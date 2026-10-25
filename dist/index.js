import { ElTreeSelect as Yt, ElTimeSelect as qt, ElTimePicker as Xt, ElCascader as Jt, ElSlider as Qt, ElRate as eo, ElDatePicker as we, ElRadioGroup as to, ElCheckboxGroup as oo, ElCheckbox as ue, ElSwitch as ao, ElSelect as lo, ElInputNumber as no, ElInputTag as ro, ElInput as so, ElForm as tt, ElRow as ot, ElCol as Oe, ElFormItem as at, ElOption as lt, ElRadio as nt, ElButton as me, ElIcon as rt, ElTooltip as io, ElDropdown as st, ElDropdownMenu as it, ElDropdownItem as ut, ElPopover as Ye, ElScrollbar as uo, ElCard as co, ElTable as fo, ElEmpty as mo, ElTableColumn as xe, ElPagination as po, ElDialog as ho, ElMessage as qe, ElUpload as vo, ElLoadingDirective as go } from "element-plus";
import { inject as Le, ref as M, computed as g, toRaw as Ie, defineComponent as Z, useTemplateRef as Pe, watch as De, toRefs as ct, openBlock as i, createElementBlock as B, normalizeClass as Q, createVNode as z, unref as l, mergeProps as H, withCtx as p, Fragment as G, renderList as K, createBlock as v, createSlots as ae, renderSlot as F, resolveDynamicComponent as re, createCommentVNode as C, toDisplayString as U, createElementVNode as W, normalizeStyle as ge, createTextVNode as J, useAttrs as dt, useModel as he, onMounted as bo, onUnmounted as yo, isRef as Te, mergeModels as se, getCurrentInstance as wo, useSlots as ft, watchEffect as xo, resolveDirective as He, withDirectives as ve, vShow as ko, normalizeProps as Re, guardReactiveProps as Me, nextTick as mt, readonly as So } from "vue";
import { defineStore as Bo, storeToRefs as pt } from "pinia";
import Eo from "dayjs";
import { useWindowSize as ht, useResizeObserver as Xe, useThrottleFn as Co } from "@vueuse/core";
import { ArrowUpBold as Ao, ArrowDownBold as To, Loading as _o } from "@element-plus/icons-vue";
import { useI18n as Be } from "vue-i18n";
import { VueDraggable as Oo } from "vue-draggable-plus";
import { Icon as Io } from "@iconify/vue";
import * as fe from "xlsx";
import Ro from "file-saver";
const Mo = { cancel: "取消", confirm: "确定" }, zo = { form: { reset: "重置", submit: "提交" }, searchBar: { reset: "重置", search: "查询", expand: "展开", collapse: "收起" }, selection: "选择", sizeOptions: { small: "紧凑", default: "默认", large: "宽松" }, column: { selection: "勾选", expand: "展开", index: "序号", globalIndex: "全局序号" }, header: { search: "搜索", refresh: "刷新", size: "表格大小", fullscreen: "全屏", columns: "列设置", settings: "其他设置" }, zebra: "斑马纹", border: "边框", headerBackground: "表头背景" }, $o = {
  common: Mo,
  table: zo
}, Vo = { cancel: "Cancel", confirm: "Confirm" }, Lo = { form: { reset: "Reset", submit: "Submit" }, searchBar: { reset: "Reset", search: "Search", expand: "Expand", collapse: "Collapse" }, selection: "Select", sizeOptions: { small: "Compact", default: "Default", large: "Loose" }, column: { selection: "Select", expand: "Expand", index: "Index", globalIndex: "Global Index" }, header: { search: "Search", refresh: "Refresh", size: "Table Size", fullscreen: "Fullscreen", columns: "Column Settings", settings: "Settings" }, zebra: "Zebra", border: "Border", headerBackground: "Header BG" }, Po = {
  common: Vo,
  table: Lo
}, Do = "13", vt = /* @__PURE__ */ Symbol("ao-admin-auth-list"), Ho = () => {
  const e = Le(vt, () => {
  });
  return { hasAuth: (a) => a ? e()?.includes(a) ?? !1 : !1 };
}, gt = /* @__PURE__ */ Symbol("ao-admin-local-svg"), bt = /* @__PURE__ */ Symbol("ao-admin-logo-url");
var pe = /* @__PURE__ */ ((e) => (e.DEFAULT = "default", e.SMALL = "small", e.LARGE = "large", e))(pe || {});
const ze = Bo(
  "tableStore",
  () => {
    const e = M(pe.DEFAULT), o = M(!1), a = M(!1), t = M(!1), n = M(!1);
    return {
      tableSize: e,
      isZebra: o,
      isBorder: a,
      isHeaderBackground: t,
      setTableSize: (m) => e.value = m,
      setIsZebra: (m) => o.value = m,
      setIsBorder: (m) => a.value = m,
      setIsHeaderBackground: (m) => t.value = m,
      isFullScreen: n,
      setIsFullScreen: (m) => n.value = m
    };
  },
  {
    persist: {
      key: "table",
      storage: localStorage
    }
  }
), Fo = () => {
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
    const o = this.getHeaderHeight(), a = this.calculateBottomBarOffset();
    return o + a + ke.TABLE_HEADER_SPACING;
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
    const { bottomBarHeight: o, bottomBarSpacing: a } = this.options;
    return o.value === 0 ? 0 : o.value + a.value;
  }
}
function No(e) {
  return {
    /** 容器高度样式对象 */
    containerHeight: g(() => new ke(e).calculate())
  };
}
const Je = {
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
  date: we,
  // 日期选择器
  daterange: we,
  // 日期范围选择器
  datetime: we,
  // 日期时间选择器
  datetimerange: we,
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
], jo = ["select", "checkboxgroup", "radiogroup"], Wo = "title", Qe = (e) => e.type === Wo, Ko = (e, o) => Uo.includes(e) ? e === "options" ? jo.includes(o ?? "") : !0 : !1, Ee = {
  removeEmptyString: !0,
  removeEmptyArray: !0,
  removeEmptyObject: !0,
  removeEmptyRichText: !0,
  keepZero: !0,
  keepFalse: !0
}, Go = /^\d+$/, Fe = (e) => e.split(".").filter(Boolean).map((o) => Go.test(o) ? Number(o) : o), oe = (e) => {
  if (!e) return {};
  const o = (a) => {
    if (Array.isArray(a))
      return a.map((t) => o(t));
    if (a && typeof a == "object") {
      const t = Ie(a);
      return Object.keys(t).reduce((n, d) => (n[d] = o(t[d]), n), {});
    }
    return a;
  };
  return o(Ie(e));
}, yt = (e, o) => Fe(o).reduce((a, t) => {
  if (a != null)
    return a[t];
}, e), Zo = (e, o) => {
  const a = Fe(o);
  if (!a.length) return;
  const t = a.pop(), n = a.reduce((d, f) => {
    if (d != null)
      return d[f];
  }, e);
  n != null && t !== void 0 && delete n[t];
}, wt = (e, o, a) => {
  const t = a === "" ? void 0 : a;
  if (t === void 0) {
    Zo(e, o);
    return;
  }
  const n = Fe(o);
  if (!n.length) return;
  let d = e;
  n.forEach((f, r) => {
    if (r === n.length - 1) {
      d[f] = t;
      return;
    }
    const m = typeof n[r + 1] == "number" ? [] : {};
    (d[f] === null || d[f] === void 0 || typeof d[f] != "object") && (d[f] = m), d = d[f];
  });
}, Yo = (e) => /<(img|video|audio|iframe|embed|object)\b/i.test(e) ? !1 : e.replace(/&nbsp;/gi, "").replace(/<br\s*\/?>/gi, "").replace(/<[^>]*>/g, "").trim() === "", $e = (e, o = Ee) => {
  if (Array.isArray(e)) {
    const a = e.map((t) => $e(t, o)).filter((t) => t !== void 0);
    return a.length === 0 && o.removeEmptyArray ? void 0 : a;
  }
  if (e && typeof e == "object") {
    const a = Ie(e), t = Object.entries(a).reduce(
      (n, [d, f]) => {
        const r = $e(f, o);
        return r !== void 0 && (n[d] = r), n;
      },
      {}
    );
    return Object.keys(t).length === 0 && o.removeEmptyObject ? void 0 : t;
  }
  return typeof e == "string" ? o.removeEmptyString && e.trim() === "" || o.removeEmptyRichText && Yo(e) ? void 0 : e : e === 0 ? o.keepZero ? e : void 0 : e === !1 ? o.keepFalse ? e : void 0 : e ?? void 0;
}, Ve = (e, o = Ee) => $e(oe(e), o) || {}, xt = (e) => e.props ? e.props : Object.fromEntries(
  Object.entries(e).filter(([o]) => !Ko(o, e.type))
), X = (e) => {
  const o = e.props?.options ?? e.options;
  return Array.isArray(o) ? o : [];
}, kt = (e) => {
  if (!e.slots) return {};
  const o = {};
  return Object.entries(e.slots).forEach(([a, t]) => {
    t && (o[a] = t);
  }), o;
}, St = (e) => {
  if (e.render)
    return e.render;
  const o = e.type ? Je[e.type] : void 0;
  return o || Je.input;
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
function Bt(e, o) {
  const a = qo[o];
  return a ? e >= a.threshold ? e : a.fallback : e;
}
const Xo = 500, Jo = 2, Qo = (e, o) => {
  const a = o && o > 0 ? o : 24, t = (e ?? a / Jo) / a * 24;
  return Math.min(24, Math.max(1, Math.round(t)));
}, ea = (e, o, a) => e ? "flex-end" : o <= (a ?? 2) ? "flex-start" : "flex-end", ta = { key: 1 }, oa = { class: "form-buttons" }, aa = { class: "icon-wrapper" }, la = /* @__PURE__ */ Z({
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
  setup(e, { expose: o, emit: a }) {
    const t = e, n = a, { width: d } = ht(), { t: f } = Be(), r = g(() => d.value < Xo), c = Pe("formRef"), s = M(oe(t.modelValue)), m = M(oe(t.modelValue));
    let h;
    De(
      () => t.modelValue,
      (I) => {
        I !== h && (s.value = oe(I), m.value = oe(I));
      }
    );
    const b = M(t.defaultExpanded), S = g(() => ({
      ...Ee,
      ...t.sanitizeOutput
    })), u = (I) => yt(s.value, I), E = (I, ee) => {
      wt(s.value, I, ee), h = s.value, n("update:modelValue", s.value);
    }, $ = (I, ee) => Bt(I ?? T.value, ee), A = g(() => {
      const I = t.items.filter((k) => !k.hidden);
      if (!t.isExpand && !b.value) {
        const k = Math.floor(24 / t.span) - 1;
        return I.slice(0, k);
      }
      return I;
    }), O = g(() => {
      const I = t.items.filter((ee) => !ee.hidden);
      return !t.isExpand && t.showExpand && I.length > Math.floor(24 / t.span) - 1;
    }), R = g(() => b.value ? f("table.searchBar.collapse") : f("table.searchBar.expand")), x = g(() => ({
      "justify-content": ea(
        r.value,
        t.items.filter((I) => !I.hidden).length,
        t.buttonLeftLimit
      )
    })), V = () => {
      b.value = !b.value;
    }, w = () => {
      c.value?.resetFields(), Object.keys(s.value).forEach((I) => {
        delete s.value[I];
      }), Object.assign(s.value, oe(m.value)), h = s.value, n("update:modelValue", s.value), n("reset");
    }, D = () => {
      n(
        "search",
        Ve(s.value, S.value)
      );
    };
    o({
      validate: (...I) => c.value.validate(...I),
      reset: w,
      // 允许外部在手动组装请求前直接读取清洗后的参数。
      getOutput: () => Ve(s.value, S.value)
    });
    const { span: T, gutter: N, labelPosition: _, labelWidth: ie } = ct(t);
    return (I, ee) => (i(), B("section", {
      class: Q(["ao-search-bar ao-card-xs", { "is-expanded": b.value }])
    }, [
      z(l(tt), H({
        ref: "formRef",
        model: s.value,
        "label-position": l(_)
      }, { ...I.$attrs }), {
        default: p(() => [
          z(l(ot), { gutter: l(N) }, {
            default: p(() => [
              (i(!0), B(G, null, K(A.value, (k) => (i(), v(l(Oe), {
                key: k.key,
                xs: $(k.span, "xs"),
                sm: $(k.span, "sm"),
                md: $(k.span, "md"),
                lg: $(k.span, "lg"),
                xl: $(k.span, "xl")
              }, {
                default: p(() => [
                  z(l(at), {
                    prop: k.key,
                    "label-width": k.label ? k.labelWidth || l(ie) : void 0
                  }, ae({
                    default: p(() => [
                      F(I.$slots, k.key, {
                        item: k,
                        modelValue: s.value
                      }, () => [
                        (i(), v(re(l(St)(k)), H({
                          "model-value": u(k.key),
                          "onUpdate:modelValue": (j) => E(k.key, j)
                        }, { ref_for: !0 }, l(xt)(k)), ae({
                          default: p(() => [
                            k.type === "select" && l(X)(k).length ? (i(!0), B(G, { key: 0 }, K(l(X)(k), (j) => (i(), v(l(lt), H({ ref_for: !0 }, j, {
                              key: String(j.value)
                            }), null, 16))), 128)) : C("", !0),
                            k.type === "checkboxgroup" && l(X)(k).length ? (i(!0), B(G, { key: 1 }, K(l(X)(k), (j) => (i(), v(l(ue), H({ ref_for: !0 }, j, {
                              key: String(j.value)
                            }), null, 16))), 128)) : C("", !0),
                            k.type === "radiogroup" && l(X)(k).length ? (i(!0), B(G, { key: 2 }, K(l(X)(k), (j) => (i(), v(l(nt), H({ ref_for: !0 }, j, {
                              key: String(j.value)
                            }), null, 16))), 128)) : C("", !0)
                          ]),
                          _: 2
                        }, [
                          K(l(kt)(k), (j, Ce) => ({
                            name: Ce,
                            fn: p(() => [
                              (i(), v(re(j)))
                            ])
                          }))
                        ]), 1040, ["model-value", "onUpdate:modelValue"]))
                      ], !0)
                    ]),
                    _: 2
                  }, [
                    k.label ? {
                      name: "label",
                      fn: p(() => [
                        typeof k.label != "string" ? (i(), v(re(k.label), { key: 0 })) : (i(), B("span", ta, U(k.label), 1))
                      ]),
                      key: "0"
                    } : void 0
                  ]), 1032, ["prop", "label-width"])
                ]),
                _: 2
              }, 1032, ["xs", "sm", "md", "lg", "xl"]))), 128)),
              z(l(Oe), {
                xs: 24,
                sm: 24,
                md: l(T),
                lg: l(T),
                xl: l(T),
                class: "action-column"
              }, {
                default: p(() => [
                  W("div", {
                    class: "action-buttons-wrapper",
                    style: ge(x.value)
                  }, [
                    W("div", oa, [
                      e.showSearch ? (i(), v(l(me), {
                        key: 0,
                        type: "primary",
                        plain: "",
                        class: "search-button",
                        onClick: D,
                        disabled: e.disabledSearch
                      }, {
                        default: p(() => [
                          J(U(l(f)("table.searchBar.search")), 1)
                        ]),
                        _: 1
                      }, 8, ["disabled"])) : C("", !0),
                      e.showReset ? (i(), v(l(me), {
                        key: 1,
                        plain: "",
                        class: "reset-button",
                        onClick: w
                      }, {
                        default: p(() => [
                          J(U(l(f)("table.searchBar.reset")), 1)
                        ]),
                        _: 1
                      })) : C("", !0)
                    ]),
                    O.value ? (i(), B("div", {
                      key: 0,
                      class: "filter-toggle",
                      onClick: V
                    }, [
                      W("span", null, U(R.value), 1),
                      W("div", aa, [
                        z(l(rt), null, {
                          default: p(() => [
                            b.value ? (i(), v(l(Ao), { key: 0 })) : (i(), v(l(To), { key: 1 }))
                          ]),
                          _: 1
                        })
                      ])
                    ])) : C("", !0)
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
}), q = (e, o) => {
  const a = e.__vccOpts || e;
  for (const [t, n] of o)
    a[t] = n;
  return a;
}, na = /* @__PURE__ */ q(la, [["__scopeId", "data-v-6125fcb8"]]), ra = ["src"], sa = /* @__PURE__ */ Z({
  name: "AoSvgIcon",
  inheritAttrs: !1,
  __name: "AoSvgIcon",
  props: {
    icon: {},
    size: { default: "1em" }
  },
  setup(e) {
    const o = e, a = Le(gt, () => {
    });
    function t(r) {
      if (!(!r || r.includes(":")))
        return a(r);
    }
    const n = dt(), d = g(() => t(o.icon)), f = g(() => ({
      class: n.class || "",
      style: [n.style, { width: o.size, height: o.size }]
    }));
    return (r, c) => d.value ? (i(), B("img", H({
      key: 0,
      src: d.value
    }, f.value, {
      class: "ao-svg-icon",
      alt: ""
    }), null, 16, ra)) : o.icon ? (i(), v(l(Io), H({
      key: 1,
      icon: o.icon
    }, f.value, { class: "ao-svg-icon" }), null, 16, ["icon"])) : C("", !0);
  }
}), be = /* @__PURE__ */ q(sa, [["__scopeId", "data-v-e3e5bfd5"]]), ia = /* @__PURE__ */ Z({
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
    const a = e, t = o, n = M(), d = g(() => a.loading ? "is-loading-icon" : a.active ? "is-active-icon" : "is-icon"), f = (r) => {
      t("click", r);
    };
    return (r, c) => (i(), B("div", {
      ref_key: "triggerRef",
      ref: n,
      class: Q(["button", { "is-active": e.active }]),
      onClick: f
    }, [
      z(be, {
        icon: e.icon,
        size: "1rem",
        class: Q(d.value)
      }, null, 8, ["icon", "class"]),
      e.content ? (i(), v(l(io), {
        key: 0,
        "virtual-ref": n.value,
        "virtual-triggering": "",
        content: e.content,
        placement: "top",
        "show-after": 500
      }, null, 8, ["virtual-ref", "content"])) : C("", !0)
    ], 2));
  }
}), de = /* @__PURE__ */ q(ia, [["__scopeId", "data-v-8e84760f"]]), ne = {
  selection: "__selection__",
  expand: "__expand__",
  index: "__index__",
  globalIndex: "__globalIndex__"
}, Y = (e) => e.columnKey ?? ne[e.type] ?? e.prop ?? e.slotName ?? "", Se = (e) => e.visible ?? !0, ua = (e, o) => {
  const a = e.type && e.type in ne, t = Se(e);
  if (a) {
    const n = e.type;
    return {
      ...e,
      prop: ne[n],
      // 列名以用户声明为准，仅在未声明时回落到内置文案
      label: e.label || o[n],
      visible: t
    };
  }
  return { ...e, visible: t };
}, _e = (e, o) => e.map((a) => ua(a, o));
function Za(e) {
  const { t: o } = Be(), a = g(() => ({
    selection: o("table.column.selection"),
    expand: o("table.column.expand"),
    index: o("table.column.index"),
    globalIndex: o("table.column.globalIndex")
  })), t = M(e()), n = M(
    _e(t.value, a.value)
  );
  De(a, (r) => {
    const c = new Map(t.value.map((s) => [Y(s), s]));
    n.value = n.value.map((s) => {
      if (s.type && s.type in ne) {
        const m = s.type, h = c.get(Y(s));
        return {
          ...s,
          label: h?.label || r[m]
        };
      }
      return s;
    });
  });
  const d = g(() => {
    const r = new Map(t.value.map((c) => [Y(c), c]));
    return n.value.filter((c) => Se(c)).map((c) => {
      const s = Y(c), m = r.get(s);
      return m ? { ...m, visible: !0 } : c;
    });
  }), f = (r) => {
    const c = [...t.value], s = r(c);
    t.value = Array.isArray(s) ? s : c;
  };
  return {
    columns: d,
    columnChecks: n,
    /**
     * @description 新增列（支持单个或批量）
     * @param column 列配置或列配置数组
     * @param index 可选的插入位置，越界时追加到末尾
     */
    addColumn: (r, c) => {
      const s = Array.isArray(r) ? r : [r];
      if (s.length === 0) return;
      f((S) => {
        const u = [...S], E = typeof c == "number" && c >= 0 && c <= u.length ? c : u.length;
        return u.splice(E, 0, ...s), u;
      });
      const m = _e(s, a.value), h = [...n.value], b = typeof c == "number" && c >= 0 && c <= h.length ? c : h.length;
      h.splice(b, 0, ...m), n.value = h;
    },
    /**
     * @description 删除列（支持单个或批量）
     * @param prop 列的唯一标识或标识数组
     */
    removeColumn: (r) => {
      const c = Array.isArray(r) ? r : [r];
      c.length !== 0 && (f((s) => s.filter((m) => !c.includes(Y(m)))), n.value = n.value.filter(
        (s) => !c.includes(Y(s))
      ));
    },
    /**
     * @description 更新列（支持单个或批量）
     * @param prop 列的唯一标识或更新配置数组
     * @param updates 列配置更新，prop 为字符串时使用
     */
    updateColumn: (r, c) => {
      const s = Array.isArray(r) ? r : c ? [{ prop: r, updates: c }] : [];
      if (s.length === 0) return;
      const m = new Map(s.map((h) => [h.prop, h.updates]));
      f(
        (h) => h.map((b) => {
          const S = m.get(Y(b));
          return S ? { ...b, ...S } : b;
        })
      ), n.value = n.value.map((h) => {
        const b = Y(h), S = m.get(b);
        if (!S) return h;
        const u = { ...h, ...S };
        return u.type && u.type in ne && (u.prop = ne[u.type], u.label = u.label || a.value[u.type]), "visible" in S && (u.visible = S.visible), u;
      });
    },
    /**
     * @description 切换列显示状态（支持单个或批量），通过 visible 控制显隐
     * @param prop 列的唯一标识或标识数组
     * @param visible 可选的显示状态，未传时取反
     */
    toggleColumn: (r, c) => {
      const s = Array.isArray(r) ? r : [r];
      if (s.length === 0) return;
      const m = [...n.value], h = /* @__PURE__ */ new Map();
      s.forEach((b) => {
        const S = m.findIndex((E) => Y(E) === b);
        if (S < 0) return;
        const u = c ?? !Se(m[S]);
        m[S] = { ...m[S], visible: u }, h.set(b, u);
      }), n.value = m, f(
        (b) => b.map((S) => {
          const u = Y(S);
          return h.has(u) ? { ...S, visible: h.get(u) } : S;
        })
      );
    },
    /** @description 重置所有列到初始配置，恢复初始列显隐与初始列顺序 */
    resetColumns: () => {
      const r = e();
      t.value = [...r], n.value = _e(r, a.value);
    },
    /**
     * @description 批量更新列
     * @param updates 列更新配置
     * @deprecated 推荐使用 updateColumn 的数组模式
     */
    batchUpdateColumns: (r) => {
      if (!Array.isArray(r) || r.length === 0) return;
      const c = new Map(r.map((s) => [s.prop, s.updates]));
      f(
        (s) => s.map((m) => {
          const h = c.get(Y(m));
          return h ? { ...m, ...h } : m;
        })
      ), n.value = n.value.map((s) => {
        const m = Y(s), h = c.get(m);
        if (!h) return s;
        const b = { ...s, ...h };
        return b.type && b.type in ne && (b.prop = ne[b.type], b.label = b.label || a.value[b.type]), "visible" in h && (b.visible = h.visible), b;
      });
    },
    /**
     * @description 重新排序列，索引越界或原地移动时保持原顺序
     * @param fromIndex 源索引
     * @param toIndex 目标索引
     */
    reorderColumns: (r, c) => {
      const s = (m) => {
        if (r < 0 || r >= m.length || c < 0 || c >= m.length || r === c)
          return m;
        const h = [...m], [b] = h.splice(r, 1);
        return h.splice(c, 0, b), h;
      };
      f(s), n.value = s(n.value);
    },
    /**
     * @description 获取指定列的配置
     * @param prop 列的唯一标识
     * @return 列配置，未找到时返回 undefined
     */
    getColumnConfig: (r) => t.value.find((c) => Y(c) === r),
    /**
     * @description 获取所有列配置的副本
     * @return 所有列配置
     */
    getAllColumns: () => [...t.value]
  };
}
const ca = { class: "table-header-root" }, da = { class: "left-wrap" }, fa = { class: "right-wrap" }, ma = /* @__PURE__ */ Z({
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
    const { t: a } = Be(), t = e, n = he(e, "columns"), d = o, f = (T, N) => {
      T.visible = !!N;
    }, r = [
      { value: pe.SMALL, label: a("table.sizeOptions.small") },
      { value: pe.DEFAULT, label: a("table.sizeOptions.default") },
      { value: pe.LARGE, label: a("table.sizeOptions.large") }
    ], c = ze(), { tableSize: s, isZebra: m, isBorder: h, isHeaderBackground: b } = pt(c), S = g(() => t.layout.split(",").map((T) => T.trim())), u = (T) => S.value.includes(T), E = (T) => {
      const N = T.related;
      return !(N && N.classList.contains("fixed-column"));
    }, $ = () => {
      d("update:showSearchBar", !t.showSearchBar), d("search");
    }, A = () => {
      R.value = !0, d("refresh");
    }, O = (T) => {
      ze().setTableSize(T);
    }, R = M(!1), x = M(!1), V = M(""), w = () => {
      const T = document.querySelector(`.${t.fullClass}`);
      T && (x.value = !x.value, x.value ? (V.value = document.body.style.overflow, document.body.style.overflow = "hidden", T.classList.add("el-full-screen"), c.setIsFullScreen(!0)) : (document.body.style.overflow = V.value, T.classList.remove("el-full-screen"), c.setIsFullScreen(!1)));
    }, D = (T) => {
      T.key === "Escape" && x.value && w();
    };
    return bo(() => {
      document.addEventListener("keydown", D);
    }), yo(() => {
      if (document.removeEventListener("keydown", D), x.value) {
        document.body.style.overflow = V.value;
        const T = document.querySelector(`.${t.fullClass}`);
        T && T.classList.remove("el-full-screen");
      }
    }), (T, N) => (i(), B("div", ca, [
      W("div", da, [
        F(T.$slots, "left", {}, void 0, !0)
      ]),
      W("div", fa, [
        F(T.$slots, "right", {}, void 0, !0),
        e.showSearchBar != null ? (i(), v(de, {
          key: 0,
          icon: "ri:search-line",
          content: l(a)("table.header.search"),
          active: e.showSearchBar,
          onClick: $
        }, null, 8, ["content", "active"])) : C("", !0),
        u("refresh") ? (i(), v(de, {
          key: 1,
          icon: "ri:refresh-line",
          content: l(a)("table.header.refresh"),
          loading: e.loading && R.value,
          onClick: A
        }, null, 8, ["content", "loading"])) : C("", !0),
        u("size") ? (i(), v(l(st), {
          key: 2,
          onCommand: O
        }, {
          dropdown: p(() => [
            z(l(it), null, {
              default: p(() => [
                (i(), B(G, null, K(r, (_) => W("div", {
                  key: _.value,
                  class: Q(["table-size-btn-item", { "is-current-size": l(s) === _.value }])
                }, [
                  (i(), v(l(ut), {
                    key: _.value,
                    command: _.value
                  }, {
                    default: p(() => [
                      J(U(_.label), 1)
                    ]),
                    _: 2
                  }, 1032, ["command"]))
                ], 2)), 64))
              ]),
              _: 1
            })
          ]),
          default: p(() => [
            z(de, {
              icon: "ri:arrow-up-down-fill",
              content: l(a)("table.header.size")
            }, null, 8, ["content"])
          ]),
          _: 1
        })) : C("", !0),
        u("fullscreen") ? (i(), v(de, {
          key: 3,
          icon: x.value ? "ri:fullscreen-exit-line" : "ri:fullscreen-line",
          content: l(a)("table.header.fullscreen"),
          onClick: w
        }, null, 8, ["icon", "content"])) : C("", !0),
        u("columns") ? (i(), v(l(Ye), {
          key: 4,
          placement: "bottom",
          trigger: "click"
        }, {
          reference: p(() => [
            z(de, {
              icon: "ri:align-right",
              content: l(a)("table.header.columns")
            }, null, 8, ["content"])
          ]),
          default: p(() => [
            W("div", null, [
              z(l(uo), { "max-height": "380px" }, {
                default: p(() => [
                  z(l(Oo), {
                    modelValue: n.value,
                    "onUpdate:modelValue": N[0] || (N[0] = (_) => n.value = _),
                    disabled: !1,
                    filter: ".fixed-column",
                    "prevent-on-filter": !1,
                    onMove: E
                  }, {
                    default: p(() => [
                      (i(!0), B(G, null, K(n.value, (_) => (i(), B("div", {
                        key: _.columnKey || _.prop || _.type,
                        class: Q(["column-option", { "fixed-column": _.fixed }])
                      }, [
                        W("div", {
                          class: Q(["drag-icon", _.fixed ? "is-fixed" : "is-movable"])
                        }, [
                          z(be, {
                            icon: _.fixed ? "ri:unpin-line" : "ri:drag-move-2-fill",
                            class: "drag-icon-svg"
                          }, null, 8, ["icon"])
                        ], 2),
                        z(l(ue), {
                          "model-value": l(Se)(_),
                          "onUpdate:modelValue": (ie) => f(_, ie),
                          disabled: _.disabled,
                          class: "column-checkbox"
                        }, {
                          default: p(() => [
                            J(U(_.label || (_.type === "selection" ? l(a)("table.selection") : "")), 1)
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
        })) : C("", !0),
        u("settings") ? (i(), v(l(Ye), {
          key: 5,
          placement: "bottom",
          trigger: "click"
        }, {
          reference: p(() => [
            z(de, {
              icon: "ri:settings-line",
              content: l(a)("table.header.settings")
            }, null, 8, ["content"])
          ]),
          default: p(() => [
            W("div", null, [
              e.showZebra ? (i(), v(l(ue), {
                key: 0,
                modelValue: l(m),
                "onUpdate:modelValue": N[1] || (N[1] = (_) => Te(m) ? m.value = _ : null),
                value: !0
              }, {
                default: p(() => [
                  J(U(l(a)("table.zebra")), 1)
                ]),
                _: 1
              }, 8, ["modelValue"])) : C("", !0),
              e.showBorder ? (i(), v(l(ue), {
                key: 1,
                modelValue: l(h),
                "onUpdate:modelValue": N[2] || (N[2] = (_) => Te(h) ? h.value = _ : null),
                value: !0
              }, {
                default: p(() => [
                  J(U(l(a)("table.border")), 1)
                ]),
                _: 1
              }, 8, ["modelValue"])) : C("", !0),
              e.showHeaderBackground ? (i(), v(l(ue), {
                key: 2,
                modelValue: l(b),
                "onUpdate:modelValue": N[3] || (N[3] = (_) => Te(b) ? b.value = _ : null),
                value: !0
              }, {
                default: p(() => [
                  J(U(l(a)("table.headerBackground")), 1)
                ]),
                _: 1
              }, 8, ["modelValue"])) : C("", !0)
            ])
          ]),
          _: 1
        })) : C("", !0)
      ])
    ]));
  }
}), pa = /* @__PURE__ */ q(ma, [["__scopeId", "data-v-7c40a1b5"]]), ha = { key: 0 }, va = { class: "ao-table-bottom__left" }, ga = {
  key: 0,
  class: "pagination custom-pagination"
}, ba = "YYYY/MM/DD HH:mm:ss", ya = /* @__PURE__ */ Z({
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
  setup(e, { expose: o, emit: a }) {
    const t = e, n = he(e, "searchForm"), d = he(e, "columnChecks"), f = wo(), r = dt(), c = ft(), { width: s } = ht(), m = M(null), h = M(), b = M(), S = ze(), { isBorder: u, isZebra: E, tableSize: $, isFullScreen: A, isHeaderBackground: O } = pt(S), R = M(null), x = M(null), V = {
      MOBILE: "prev, pager, next, sizes, jumper, total",
      IPAD: "prev, pager, next, jumper, total",
      DESKTOP: "total, prev, pager, next, sizes, jumper"
    }, w = g(() => s.value < 768 ? V.MOBILE : s.value < 1024 ? V.IPAD : V.DESKTOP), D = g(() => ({
      background: !0,
      hideOnSinglePage: !1,
      size: "default",
      pagerCount: s.value > 1200 ? 7 : 5,
      layout: w.value,
      ...t.paginationOptions
    })), T = g(() => t.border ?? u.value), N = g(() => t.stripe ?? E.value), _ = g(() => t.size ?? $.value), ie = g(() => t.data?.length === 0), I = g(() => t.pagination?.currentPage ?? 1), ee = g(() => t.pagination?.pageSize ?? 10), k = g(() => t.pagination?.total ?? 0), j = g(() => (t.searchItems?.length ?? 0) > 0), Ce = g(() => !!(c["header-left"] || c["header-right"])), ye = g(
      () => t.integrated ?? (j.value || Ce.value)
    ), Ne = M(!0), Ue = g(() => t.showSearchBar ?? Ne.value), Et = g(
      () => j.value ? Ue.value : void 0
    ), Ct = g(() => ye.value && t.showTableHeader), At = g(() => ye.value ? "is-integrated" : "is-bare"), Tt = g(() => ye.value ? co : "div"), _t = g(() => ye.value ? "ao-table-card" : "ao-table-bare"), je = M(0), We = M(0);
    Xe(h, (y) => {
      const L = y[0];
      L && requestAnimationFrame(() => {
        je.value = L.contentRect.height;
      });
    }), Xe(b, (y) => {
      const L = y[0];
      L && requestAnimationFrame(() => {
        We.value = L.contentRect.height;
      });
    });
    const Ot = M(10), { containerHeight: It } = No({
      showTableHeader: g(() => t.showTableHeader),
      bottomBarHeight: je,
      tableHeaderHeight: We,
      bottomBarSpacing: Ot
    }), Rt = g(() => A.value ? "100%" : ie.value && !t.loading ? t.emptyHeight : t.height ? t.height : "100%"), Mt = g(() => ({
      background: O.value ? "var(--ao-table-header-bg-color)" : "var(--default-box-color)",
      ...t.headerCellStyle || {}
      // 合并用户传入的样式
    })), zt = (y) => {
      const L = f?.vnode.props || {}, te = y.replace(/[A-Z]/g, (P) => `-${P.toLowerCase()}`);
      return y in L || te in L;
    }, $t = [
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
    ], Vt = g(() => {
      const y = { ...t };
      return $t.forEach((L) => {
        delete y[L];
      }), y;
    }), Lt = g(() => ({
      ...r,
      ...Vt.value,
      height: Rt.value,
      stripe: N.value,
      border: T.value,
      size: _.value,
      headerCellStyle: Mt.value,
      // Element Plus 默认值为 true，未显式传入时不应被 AoTable 覆盖成 false。
      selectOnIndeterminate: zt("selectOnIndeterminate") ? t.selectOnIndeterminate : void 0
    })), Ke = g(() => k.value > 0 && !ie.value), Ge = (y) => y.$index === void 0 || y.$index >= 0, Pt = ["slotName", "visible", "disabled", "timestamp"], Dt = (y, L) => {
      if (y == null || y === "") return "-";
      const te = Eo(Number(y) * 1e3);
      return te.isValid() ? te.format(L) : "-";
    }, Ht = (y) => {
      const L = y.format ?? ba;
      return (te, P, le) => Dt(y.field ? te?.[y.field] : le, L);
    }, Ae = (y) => {
      const L = { ...y };
      return Pt.forEach((te) => {
        delete L[te];
      }), y.timestamp && (L.formatter = Ht(y.timestamp)), L;
    }, Ft = (y) => {
      ce("size-change", y);
    }, Nt = (y) => {
      ce("current-change", y), Ze();
    }, Ut = async (y) => {
      if (t.searchRules)
        try {
          await R.value?.validate();
        } catch {
          return;
        }
      ce("search", y);
    }, jt = () => {
      ce("reset");
    }, Wt = () => {
      ce("refresh");
    }, Kt = (y) => {
      t.showSearchBar === void 0 && (Ne.value = y), ce("update:showSearchBar", y);
    }, Gt = Fo, Ze = () => {
      mt(() => {
        m.value?.setScrollTop(0), Gt();
      });
    }, Zt = (y) => (I.value - 1) * ee.value + y + 1, ce = a;
    return xo(
      () => {
        b.value = x.value?.$el ?? void 0;
      },
      { flush: "post" }
    ), o({
      scrollToTop: Ze,
      elTableRef: m
    }), (y, L) => {
      const te = He("loading");
      return i(), B("div", {
        class: Q(["ao-table-root", At.value])
      }, [
        j.value ? ve((i(), v(na, {
          key: 0,
          ref_key: "searchBarRef",
          ref: R,
          modelValue: n.value,
          "onUpdate:modelValue": L[0] || (L[0] = (P) => n.value = P),
          items: e.searchItems,
          rules: e.searchRules,
          span: e.searchSpan,
          "show-expand": e.searchShowExpand,
          onSearch: Ut,
          onReset: jt
        }, null, 8, ["modelValue", "items", "rules", "span", "show-expand"])), [
          [ko, Ue.value]
        ]) : C("", !0),
        (i(), v(re(Tt.value), {
          class: Q(_t.value)
        }, {
          default: p(() => [
            Ct.value ? (i(), v(pa, {
              key: 0,
              ref_key: "tableHeaderCompRef",
              ref: x,
              columns: d.value,
              "onUpdate:columns": L[1] || (L[1] = (P) => d.value = P),
              "show-search-bar": Et.value,
              "show-zebra": e.headerShowZebra,
              "show-border": e.headerShowBorder,
              "show-header-background": e.headerShowHeaderBackground,
              loading: e.loading,
              "onUpdate:showSearchBar": Kt,
              onRefresh: Wt
            }, {
              left: p(() => [
                F(y.$slots, "header-left", {}, void 0, !0)
              ]),
              right: p(() => [
                F(y.$slots, "header-right", {}, void 0, !0)
              ]),
              _: 3
            }, 8, ["columns", "show-search-bar", "show-zebra", "show-border", "show-header-background", "loading"])) : C("", !0),
            W("div", {
              class: Q(["ao-table", { "is-empty": ie.value }]),
              style: ge(l(It))
            }, [
              ve((i(), v(l(fo), H({
                ref_key: "elTableRef",
                ref: m
              }, Lt.value), {
                default: p(() => [
                  (i(!0), B(G, null, K(e.columns, (P) => (i(), B(G, {
                    key: P.columnKey || P.prop || P.type
                  }, [
                    P.type === "globalIndex" ? (i(), v(l(xe), H({
                      key: 0,
                      ref_for: !0
                    }, Ae(P)), {
                      default: p(({ $index: le }) => [
                        W("span", null, U(Zt(le)), 1)
                      ]),
                      _: 1
                    }, 16)) : P.type === "expand" ? (i(), v(l(xe), H({
                      key: 1,
                      ref_for: !0
                    }, Ae(P)), ae({ _: 2 }, [
                      P.slotName ? {
                        name: "default",
                        fn: p((le) => [
                          F(y.$slots, P.slotName, H({ ref_for: !0 }, le), void 0, !0)
                        ]),
                        key: "0"
                      } : void 0
                    ]), 1040)) : (i(), v(l(xe), H({
                      key: 2,
                      ref_for: !0
                    }, Ae(P)), ae({ _: 2 }, [
                      P.slotName ? {
                        name: "default",
                        fn: p((le) => [
                          Ge(le) ? F(y.$slots, P.slotName, H({ ref_for: !0 }, le), void 0, !0, 0) : C("", !0)
                        ]),
                        key: "0"
                      } : void 0
                    ]), 1040))
                  ], 64))), 128)),
                  l(c).default ? F(y.$slots, "default", {}, void 0, !0, 0) : C("", !0),
                  l(c).operation ? (i(), v(l(xe), {
                    key: 1,
                    label: "操作",
                    width: e.operationWidth,
                    fixed: "right",
                    align: "left"
                  }, {
                    default: p((P) => [
                      Ge(P) ? F(y.$slots, "operation", Re(Me(P)), void 0, !0, 0) : C("", !0)
                    ]),
                    _: 3
                  }, 8, ["width"])) : C("", !0)
                ]),
                empty: p(() => [
                  e.loading ? (i(), B("div", ha)) : (i(), v(l(mo), {
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
              class: Q(["ao-table-bottom", { "is-bar-empty": !Ke.value && !y.$slots.footer }]),
              ref_key: "bottomBarRef",
              ref: h
            }, [
              W("div", va, [
                F(y.$slots, "footer", {}, void 0, !0)
              ]),
              Ke.value ? (i(), B("div", ga, [
                z(l(po), H(D.value, {
                  total: k.value,
                  disabled: e.loading,
                  "current-page": I.value,
                  "page-size": ee.value,
                  onSizeChange: Ft,
                  onCurrentChange: Nt
                }), null, 16, ["total", "disabled", "current-page", "page-size"])
              ])) : C("", !0)
            ], 2)
          ]),
          _: 3
        }, 8, ["class"]))
      ], 2);
    };
  }
}), Ya = /* @__PURE__ */ q(ya, [["__scopeId", "data-v-0d8a310a"]]), wa = { class: "ao-dialog__body" }, xa = /* @__PURE__ */ Z({
  name: "AoDialog",
  __name: "AoDialog",
  props: {
    visible: { type: Boolean, default: !1 },
    title: { default: "" },
    width: { default: "600px" },
    alignCenter: { type: Boolean, default: !0 },
    loading: { type: Boolean, default: !1 },
    showCancel: { type: Boolean, default: !0 },
    showConfirm: { type: Boolean, default: !0 },
    cancelText: { default: "" },
    confirmText: { default: "" },
    confirmDisabled: { type: Boolean, default: !1 }
  },
  emits: ["update:visible", "cancel", "confirm", "closed"],
  setup(e, { emit: o }) {
    const a = o, { t } = Be(), n = (f) => {
      a("update:visible", f);
    }, d = () => {
      a("cancel"), n(!1);
    };
    return (f, r) => {
      const c = He("loading");
      return i(), v(l(ho), {
        class: "ao-form-dialog ao-dialog",
        "model-value": e.visible,
        title: e.title,
        width: e.width,
        "align-center": e.alignCenter,
        draggable: "",
        overflow: !1,
        "onUpdate:modelValue": n,
        onClosed: r[1] || (r[1] = (s) => a("closed"))
      }, {
        footer: p(() => [
          F(f.$slots, "footer", {}, () => [
            e.showCancel ? (i(), v(l(me), {
              key: 0,
              onClick: d
            }, {
              default: p(() => [
                J(U(e.cancelText || l(t)("common.cancel")), 1)
              ]),
              _: 1
            })) : C("", !0),
            e.showConfirm ? (i(), v(l(me), {
              key: 1,
              type: "primary",
              disabled: e.confirmDisabled || e.loading,
              onClick: r[0] || (r[0] = (s) => a("confirm"))
            }, {
              default: p(() => [
                J(U(e.confirmText || l(t)("common.confirm")), 1)
              ]),
              _: 1
            }, 8, ["disabled"])) : C("", !0)
          ], !0)
        ]),
        default: p(() => [
          ve((i(), B("div", wa, [
            F(f.$slots, "default", {}, void 0, !0)
          ])), [
            [c, e.loading]
          ])
        ]),
        _: 3
      }, 8, ["model-value", "title", "width", "align-center"]);
    };
  }
}), ka = /* @__PURE__ */ q(xa, [["__scopeId", "data-v-5020585c"]]), Sa = { class: "form-section" }, Ba = {
  key: 0,
  class: "form-title"
}, Ea = { key: 1 }, Ca = { key: 1 }, Aa = /* @__PURE__ */ Z({
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
  setup(e, { expose: o, emit: a }) {
    const t = e, n = a, d = he(e, "modelValue"), f = Pe("formRef"), r = M({});
    r.value = oe(d.value), De(d, (x) => {
      r.value = oe(x);
    });
    const c = g(() => ({
      ...Ee,
      ...t.sanitizeOutput
    })), s = (x) => yt(d.value, x), m = (x, V) => {
      wt(d.value, x, V);
    }, h = (x, V) => Qe(x) ? 24 : Bt(Qo(x.span, $.value), V), b = g(() => t.items.filter((x) => !x.hidden)), S = () => Ve(d.value, c.value);
    o({
      validate: (...x) => f.value.validate(...x),
      /**
       * @description 清除指定字段或全部字段的校验状态，不修改表单值
       * @param args Element Plus clearValidate 的字段参数，省略时清除全部字段
       */
      clearValidate: (...x) => f.value?.clearValidate(...x),
      reset: () => {
        f.value?.resetFields(), Object.keys(d.value).forEach((x) => {
          delete d.value[x];
        }), Object.assign(d.value, oe(r.value)), n("reset");
      },
      submit: async () => {
        try {
          await f.value?.validate();
        } catch {
          console.error("[AoForm] 表单校验失败");
          return;
        }
        n("submit", S());
      },
      // 允许外部在不触发提交事件时主动获取清洗后的输出。
      getOutput: S
    });
    const { span: $, gutter: A, labelPosition: O, labelWidth: R } = ct(t);
    return (x, V) => (i(), B("section", Sa, [
      z(l(tt), H({
        ref: "formRef",
        model: d.value,
        "label-position": l(O)
      }, { ...x.$attrs }), {
        default: p(() => [
          z(l(ot), { gutter: l(A) }, {
            default: p(() => [
              (i(!0), B(G, null, K(b.value, (w) => (i(), v(l(Oe), {
                key: w.key,
                xs: h(w, "xs"),
                sm: h(w, "sm"),
                md: h(w, "md"),
                lg: h(w, "lg"),
                xl: h(w, "xl")
              }, {
                default: p(() => [
                  l(Qe)(w) ? (i(), B("div", Ba, [
                    typeof w.label != "string" ? (i(), v(re(w.label), { key: 0 })) : (i(), B("span", Ea, U(w.label), 1))
                  ])) : (i(), v(l(at), {
                    key: 1,
                    prop: w.key,
                    "label-width": w.label ? w.labelWidth || l(R) : void 0
                  }, ae({
                    default: p(() => [
                      F(x.$slots, w.key, {
                        item: w,
                        modelValue: d.value
                      }, () => [
                        (i(), v(re(l(St)(w)), H({
                          "model-value": s(w.key),
                          "onUpdate:modelValue": (D) => m(w.key, D)
                        }, { ref_for: !0 }, l(xt)(w)), ae({
                          default: p(() => [
                            w.type === "select" && l(X)(w).length ? (i(!0), B(G, { key: 0 }, K(l(X)(w), (D) => (i(), v(l(lt), H({ ref_for: !0 }, D, {
                              key: String(D.value)
                            }), null, 16))), 128)) : C("", !0),
                            w.type === "checkboxgroup" && l(X)(w).length ? (i(!0), B(G, { key: 1 }, K(l(X)(w), (D) => (i(), v(l(ue), H({ ref_for: !0 }, D, {
                              key: String(D.value)
                            }), null, 16))), 128)) : C("", !0),
                            w.type === "radiogroup" && l(X)(w).length ? (i(!0), B(G, { key: 2 }, K(l(X)(w), (D) => (i(), v(l(nt), H({ ref_for: !0 }, D, {
                              key: String(D.value)
                            }), null, 16))), 128)) : C("", !0)
                          ]),
                          _: 2
                        }, [
                          K(l(kt)(w), (D, T) => ({
                            name: T,
                            fn: p(() => [
                              (i(), v(re(D)))
                            ])
                          }))
                        ]), 1040, ["model-value", "onUpdate:modelValue"]))
                      ], !0)
                    ]),
                    _: 2
                  }, [
                    w.label ? {
                      name: "label",
                      fn: p(() => [
                        typeof w.label != "string" ? (i(), v(re(w.label), { key: 0 })) : (i(), B("span", Ca, U(w.label), 1))
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
}), et = /* @__PURE__ */ q(Aa, [["__scopeId", "data-v-e7e83958"]]), qa = /* @__PURE__ */ Z({
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
  setup(e, { expose: o, emit: a }) {
    const t = e, n = a, d = he(e, "modelValue"), f = ft(), r = Pe("formBodyRef"), c = g(() => t.dialog), s = g(() => ({
      items: t.items,
      span: t.span,
      gutter: t.gutter,
      labelPosition: t.labelPosition,
      labelWidth: t.labelWidth,
      sanitizeOutput: t.sanitizeOutput
    })), m = () => {
      n("reset");
    }, h = (u) => {
      n("submit", u);
    }, b = (u) => {
      n("update:visible", u);
    }, S = () => {
      r.value?.submit();
    };
    return o({
      /** 校验表单，透传表单主体的 validate */
      validate: (...u) => r.value.validate(...u),
      /**
       * @description 清除指定字段或全部字段的校验状态，透传表单主体的 clearValidate
       * @param args 待清除校验的字段参数，省略时清除全部字段
       */
      clearValidate: (...u) => r.value?.clearValidate(...u),
      /** 重置表单，透传表单主体的 reset */
      reset: () => r.value?.reset(),
      /** 触发提交（含校验），透传表单主体的 submit */
      submit: () => r.value?.submit(),
      /** 读取清洗后的表单输出，透传表单主体的 getOutput */
      getOutput: () => r.value?.getOutput() ?? {}
    }), (u, E) => {
      const $ = He("loading");
      return c.value ? (i(), v(ka, {
        key: 0,
        visible: e.visible,
        title: e.title,
        width: e.width,
        "align-center": e.alignCenter,
        "cancel-text": e.cancelText,
        "confirm-text": e.confirmText,
        "show-confirm": e.showSubmit,
        "confirm-disabled": e.disabledSubmit || e.loading,
        "onUpdate:visible": b,
        onCancel: E[1] || (E[1] = (A) => n("cancel")),
        onConfirm: S,
        onClosed: E[2] || (E[2] = (A) => n("closed"))
      }, ae({
        default: p(() => [
          ve((i(), v(et, H({
            ref_key: "formBodyRef",
            ref: r
          }, { ...s.value, ...u.$attrs }, {
            modelValue: d.value,
            "onUpdate:modelValue": E[0] || (E[0] = (A) => d.value = A),
            onReset: m,
            onSubmit: h
          }), ae({ _: 2 }, [
            K(l(f), (A, O) => ({
              name: O,
              fn: p((R) => [
                F(u.$slots, O, Re(Me(R ?? {})))
              ])
            }))
          ]), 1040, ["modelValue"])), [
            [$, e.loading]
          ])
        ]),
        _: 2
      }, [
        l(f).footer ? {
          name: "footer",
          fn: p(() => [
            F(u.$slots, "footer")
          ]),
          key: "0"
        } : void 0
      ]), 1032, ["visible", "title", "width", "align-center", "cancel-text", "confirm-text", "show-confirm", "confirm-disabled"])) : ve((i(), v(et, H({
        key: 1,
        ref_key: "formBodyRef",
        ref: r
      }, { ...s.value, ...u.$attrs }, {
        modelValue: d.value,
        "onUpdate:modelValue": E[3] || (E[3] = (A) => d.value = A),
        onReset: m,
        onSubmit: h
      }), ae({ _: 2 }, [
        K(l(f), (A, O) => ({
          name: O,
          fn: p((R) => [
            F(u.$slots, O, Re(Me(R ?? {})))
          ])
        }))
      ]), 1040, ["modelValue"])), [
        [$, e.loading]
      ]);
    };
  }
}), Ta = /* @__PURE__ */ Z({
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
    const a = e, t = o, n = {
      add: { icon: "ri:add-fill", class: "ao-btn-theme" },
      edit: { icon: "ri:pencil-line", class: "ao-btn-secondary" },
      delete: { icon: "ri:delete-bin-5-line", class: "ao-btn-error" },
      view: { icon: "ri:eye-line", class: "ao-btn-info" },
      more: { icon: "ri:more-2-fill", class: "" }
    }, d = g(() => a.icon || (a.type ? n[a.type]?.icon : "") || ""), f = g(() => a.iconClass || (a.type ? n[a.type]?.class : "") || ""), r = () => {
      t("click");
    };
    return (c, s) => (i(), B("div", {
      class: Q(["ao-button-table", f.value]),
      style: ge({ backgroundColor: e.buttonBgColor, color: e.iconColor }),
      onClick: r
    }, [
      z(be, { icon: d.value }, null, 8, ["icon"])
    ], 6));
  }
}), Xa = /* @__PURE__ */ q(Ta, [["__scopeId", "data-v-005b60b0"]]), _a = /* @__PURE__ */ Z({
  name: "AoIconButton",
  __name: "AoIconButton",
  props: {
    icon: {},
    circle: { type: Boolean }
  },
  setup(e) {
    return (o, a) => (i(), B("div", {
      class: Q(["icon-button", { "is-circle": e.circle }])
    }, [
      z(be, { icon: e.icon }, null, 8, ["icon"]),
      F(o.$slots, "default", {}, void 0, !0)
    ], 2));
  }
}), Oa = /* @__PURE__ */ q(_a, [["__scopeId", "data-v-a298f446"]]), Ia = /* @__PURE__ */ Z({
  name: "AoButtonMore",
  __name: "AoButtonMore",
  props: {
    list: {},
    auth: {}
  },
  emits: ["click"],
  setup(e, { emit: o }) {
    const { hasAuth: a } = Ho(), t = e, n = g(() => t.list.some((r) => !r.auth || a(r.auth))), d = o, f = (r) => {
      d("click", r);
    };
    return (r, c) => (i(), B("div", null, [
      n.value ? (i(), v(l(st), { key: 0 }, {
        dropdown: p(() => [
          z(l(it), null, {
            default: p(() => [
              (i(!0), B(G, null, K(e.list, (s) => (i(), B(G, {
                key: s.key
              }, [
                !s.auth || l(a)(s.auth) ? (i(), v(l(ut), {
                  key: 0,
                  disabled: s.disabled,
                  onClick: (m) => f(s)
                }, {
                  default: p(() => [
                    W("div", {
                      class: "dropdown-item-content",
                      style: ge({ color: s.color })
                    }, [
                      s.icon ? (i(), v(be, {
                        key: 0,
                        icon: s.icon
                      }, null, 8, ["icon"])) : C("", !0),
                      W("span", null, U(s.label), 1)
                    ], 4)
                  ]),
                  _: 2
                }, 1032, ["disabled", "onClick"])) : C("", !0)
              ], 64))), 128))
            ]),
            _: 1
          })
        ]),
        default: p(() => [
          z(Oa, {
            icon: "ri:more-2-fill",
            class: "more-button"
          })
        ]),
        _: 1
      })) : C("", !0)
    ]));
  }
}), Ja = /* @__PURE__ */ q(Ia, [["__scopeId", "data-v-e5e8e40b"]]), Ra = /* @__PURE__ */ Z({
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
  setup(e, { expose: o, emit: a }) {
    const t = e, n = a;
    class d extends Error {
      constructor(E, $, A) {
        super(E), this.code = $, this.details = A, this.name = "ExportError";
      }
      code;
      details;
    }
    const f = M(!1), r = g(() => Array.isArray(t.data) && t.data.length > 0), c = (u) => {
      if (!Array.isArray(u))
        throw new d("数据必须是数组格式", "INVALID_DATA_TYPE");
      if (u.length === 0)
        throw new d("没有可导出的数据", "NO_DATA");
      if (u.length > t.maxRows)
        throw new d(`数据行数超过限制（${t.maxRows}行）`, "EXCEED_MAX_ROWS", {
          currentRows: u.length,
          maxRows: t.maxRows
        });
    }, s = (u, E, $, A) => {
      const O = t.columns[E];
      return O?.formatter ? O.formatter(u, $, A) : u == null ? "" : u instanceof Date ? u.toLocaleDateString("zh-CN") : typeof u == "boolean" ? u ? "是" : "否" : String(u);
    }, m = (u) => u.map(($, A) => {
      const O = {};
      return t.autoIndex && (O[t.indexColumnTitle] = String(A + 1)), Object.entries($).forEach(([R, x]) => {
        let V = R;
        t.columns[R]?.title ? V = t.columns[R].title : t.headers[R] && (V = t.headers[R]), O[V] = s(x, R, $, A);
      }), O;
    }), h = (u) => {
      if (u.length === 0) return [];
      const E = Math.min(u.length, 100);
      return Object.keys(u[0]).map((A) => {
        const O = Object.values(t.columns).find((V) => V.title === A)?.width;
        if (O)
          return { wch: O };
        const R = Math.max(
          A.length,
          ...u.slice(0, E).map((V) => String(V[A] || "").length)
        );
        return { wch: Math.min(Math.max(R + 2, 8), 50) };
      });
    }, b = async (u, E, $) => {
      try {
        n("export-progress", 10);
        const A = m(u);
        n("export-progress", 30);
        const O = fe.utils.book_new();
        t.workbookOptions && (O.Props = {
          Title: E,
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
        const R = fe.utils.json_to_sheet(A);
        R["!cols"] = h(A), n("export-progress", 70), fe.utils.book_append_sheet(O, R, $), n("export-progress", 85);
        const x = fe.write(O, {
          bookType: "xlsx",
          type: "array",
          compression: !0
        }), V = new Blob([x], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        });
        n("export-progress", 95);
        const w = (/* @__PURE__ */ new Date()).toISOString().replace(/[:.]/g, "-"), D = `${E}_${w}.xlsx`;
        return Ro.saveAs(V, D), n("export-progress", 100), await mt(), Promise.resolve();
      } catch (A) {
        throw new d(`Excel 导出失败: ${A.message}`, "EXPORT_FAILED", A);
      }
    }, S = Co(async () => {
      if (!f.value) {
        f.value = !0;
        try {
          c(t.data), n("before-export", t.data), await b(t.data, t.filename, t.sheetName), n("export-success", t.filename, t.data.length), t.showSuccessMessage && qe.success({
            message: `成功导出 ${t.data.length} 条数据`,
            duration: 3e3
          });
        } catch (u) {
          const E = u instanceof d ? u : new d(`导出失败: ${u.message}`, "UNKNOWN_ERROR", u);
          n("export-error", E), t.showErrorMessage && qe.error({
            message: E.message,
            duration: 5e3
          }), console.error("Excel 导出错误:", E);
        } finally {
          f.value = !1, n("export-progress", 0);
        }
      }
    }, 1e3);
    return o({
      exportData: S,
      isExporting: So(f),
      hasData: r
    }), (u, E) => (i(), v(l(me), {
      type: e.type,
      size: e.size,
      loading: f.value,
      disabled: e.disabled || !r.value,
      onClick: l(S)
    }, {
      loading: p(() => [
        z(l(rt), { class: "is-loading" }, {
          default: p(() => [
            z(l(_o))
          ]),
          _: 1
        }),
        J(" " + U(e.loadingText), 1)
      ]),
      default: p(() => [
        F(u.$slots, "default", {}, () => [
          J(U(e.buttonText), 1)
        ], !0)
      ]),
      _: 3
    }, 8, ["type", "size", "loading", "disabled", "onClick"]));
  }
}), Qa = /* @__PURE__ */ q(Ra, [["__scopeId", "data-v-eae0b991"]]), Ma = { class: "excel-import" }, za = /* @__PURE__ */ Z({
  name: "AoExcelImport",
  __name: "AoExcelImport",
  emits: ["import-success", "import-error"],
  setup(e, { emit: o }) {
    async function a(d) {
      return new Promise((f, r) => {
        const c = new FileReader();
        c.onload = (s) => {
          try {
            const m = s.target?.result, h = fe.read(m, { type: "array" }), b = h.SheetNames[0], S = h.Sheets[b], u = fe.utils.sheet_to_json(S);
            f(u);
          } catch (m) {
            r(m);
          }
        }, c.onerror = (s) => r(s), c.readAsArrayBuffer(d);
      });
    }
    const t = o, n = async (d) => {
      try {
        if (!d.raw) return;
        const f = await a(d.raw);
        t("import-success", f);
      } catch (f) {
        t("import-error", f);
      }
    };
    return (d, f) => (i(), B("div", Ma, [
      z(l(vo), {
        "auto-upload": !1,
        accept: ".xlsx, .xls",
        "show-file-list": !1,
        onChange: n
      }, {
        default: p(() => [
          z(l(me), { type: "primary" }, {
            default: p(() => [
              F(d.$slots, "default", {}, () => [
                f[0] || (f[0] = J("导入 Excel", -1))
              ], !0)
            ]),
            _: 3
          })
        ]),
        _: 3
      })
    ]));
  }
}), el = /* @__PURE__ */ q(za, [["__scopeId", "data-v-81d063bb"]]), $a = { class: "logo-container" }, Va = ["src"], La = /* @__PURE__ */ Z({
  name: "AoLogo",
  __name: "AoLogo",
  props: {
    size: { default: 36 },
    src: {}
  },
  setup(e) {
    const o = e, a = Le(bt, void 0), t = g(() => o.src ?? a), n = g(() => ({ width: `${o.size}px` }));
    return (d, f) => (i(), B("div", $a, [
      t.value ? (i(), B("img", {
        key: 0,
        style: ge(n.value),
        src: t.value,
        alt: "logo",
        class: "logo-img"
      }, null, 12, Va)) : C("", !0)
    ]));
  }
}), tl = /* @__PURE__ */ q(La, [["__scopeId", "data-v-79a50d9f"]]), ol = {
  install(e, o = {}) {
    console.info(`[ao-admin-components] v${Do}`), o.i18n && (o.i18n.global.mergeLocaleMessage("zh", $o), o.i18n.global.mergeLocaleMessage("en", Po)), e.provide(vt, o.getAuthList ?? (() => {
    })), e.provide(gt, o.resolveLocalSvg ?? (() => {
    })), e.provide(bt, o.assets?.logo), e.directive("loading", go);
  }
};
export {
  vt as AUTH_LIST_KEY,
  ol as AdminComponents,
  Ja as AoButtonMore,
  Xa as AoButtonTable,
  ka as AoDialog,
  Qa as AoExcelExport,
  el as AoExcelImport,
  qa as AoForm,
  Oa as AoIconButton,
  tl as AoLogo,
  na as AoSearchBar,
  be as AoSvgIcon,
  Ya as AoTable,
  pa as AoTableHeader,
  de as AoTableHeaderButton,
  gt as LOCAL_SVG_KEY,
  bt as LOGO_URL_KEY,
  pe as TableSizeEnum,
  Y as getColumnKey,
  Se as getColumnVisibility,
  Ho as useAuth,
  Za as useTableColumns,
  No as useTableHeight,
  ze as useTableStore,
  Do as version
};
