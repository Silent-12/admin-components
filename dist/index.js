import { ElTreeSelect as Gt, ElTimeSelect as Zt, ElTimePicker as Yt, ElCascader as qt, ElSlider as Xt, ElRate as Jt, ElDatePicker as ye, ElRadioGroup as Qt, ElCheckboxGroup as eo, ElCheckbox as se, ElSwitch as to, ElSelect as oo, ElInputNumber as ao, ElInputTag as lo, ElInput as no, ElForm as et, ElRow as tt, ElCol as Oe, ElFormItem as ot, ElOption as at, ElRadio as lt, ElButton as fe, ElIcon as nt, ElTooltip as ro, ElDropdown as rt, ElDropdownMenu as st, ElDropdownItem as ut, ElPopover as Ze, ElScrollbar as so, ElCard as uo, ElTable as io, ElEmpty as co, ElTableColumn as we, ElPagination as fo, ElDialog as po, ElMessage as Ye, ElUpload as ho, ElLoadingDirective as mo } from "element-plus";
import { inject as $e, ref as V, computed as b, toRaw as Ie, defineComponent as Y, useTemplateRef as Pe, watch as He, toRefs as it, openBlock as s, createElementBlock as E, normalizeClass as J, createVNode as M, unref as a, mergeProps as H, withCtx as m, Fragment as G, renderList as W, createBlock as v, createSlots as le, renderSlot as N, resolveDynamicComponent as ae, createCommentVNode as C, toDisplayString as U, createElementVNode as K, normalizeStyle as ve, createTextVNode as X, useAttrs as ct, useModel as me, onMounted as vo, onUnmounted as go, isRef as Ae, mergeModels as ne, getCurrentInstance as bo, useSlots as dt, watchEffect as yo, resolveDirective as ft, withDirectives as Se, vShow as wo, normalizeProps as Re, guardReactiveProps as ze, nextTick as pt, readonly as So } from "vue";
import { defineStore as ko, storeToRefs as ht } from "pinia";
import { useWindowSize as mt, useResizeObserver as qe, useThrottleFn as xo } from "@vueuse/core";
import { ArrowUpBold as Bo, ArrowDownBold as Eo, Loading as Co } from "@element-plus/icons-vue";
import { useI18n as Be } from "vue-i18n";
import { VueDraggable as _o } from "vue-draggable-plus";
import { Icon as Ao } from "@iconify/vue";
import * as de from "xlsx";
import To from "file-saver";
const Oo = { cancel: "取消", confirm: "确定" }, Io = { form: { reset: "重置", submit: "提交" }, searchBar: { reset: "重置", search: "查询", expand: "展开", collapse: "收起" }, selection: "选择", sizeOptions: { small: "紧凑", default: "默认", large: "宽松" }, column: { selection: "勾选", expand: "展开", index: "序号", globalIndex: "全局序号" }, header: { search: "搜索", refresh: "刷新", size: "表格大小", fullscreen: "全屏", columns: "列设置", settings: "其他设置" }, zebra: "斑马纹", border: "边框", headerBackground: "表头背景" }, Ro = {
  common: Oo,
  table: Io
}, zo = { cancel: "Cancel", confirm: "Confirm" }, Mo = { form: { reset: "Reset", submit: "Submit" }, searchBar: { reset: "Reset", search: "Search", expand: "Expand", collapse: "Collapse" }, selection: "Select", sizeOptions: { small: "Compact", default: "Default", large: "Loose" }, column: { selection: "Select", expand: "Expand", index: "Index", globalIndex: "Global Index" }, header: { search: "Search", refresh: "Refresh", size: "Table Size", fullscreen: "Fullscreen", columns: "Column Settings", settings: "Settings" }, zebra: "Zebra", border: "Border", headerBackground: "Header BG" }, Vo = {
  common: zo,
  table: Mo
}, Lo = "10", vt = /* @__PURE__ */ Symbol("ao-admin-auth-list"), $o = () => {
  const e = $e(vt, () => {
  });
  return { hasAuth: (l) => l ? e()?.includes(l) ?? !1 : !1 };
}, gt = /* @__PURE__ */ Symbol("ao-admin-local-svg"), bt = /* @__PURE__ */ Symbol("ao-admin-logo-url");
var he = /* @__PURE__ */ ((e) => (e.DEFAULT = "default", e.SMALL = "small", e.LARGE = "large", e))(he || {});
const Me = ko(
  "tableStore",
  () => {
    const e = V(he.DEFAULT), o = V(!1), l = V(!1), t = V(!1), n = V(!1);
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
), Po = () => {
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
function Ho(e) {
  return {
    /** 容器高度样式对象 */
    containerHeight: b(() => new ke(e).calculate())
  };
}
const Xe = {
  input: no,
  // 输入框
  inputtag: lo,
  // 标签输入框
  number: ao,
  // 数字输入框
  select: oo,
  // 选择器
  switch: to,
  // 开关
  checkbox: se,
  // 复选框
  checkboxgroup: eo,
  // 复选框组
  radiogroup: Qt,
  // 单选框组
  date: ye,
  // 日期选择器
  daterange: ye,
  // 日期范围选择器
  datetime: ye,
  // 日期时间选择器
  datetimerange: ye,
  // 日期时间范围选择器
  rate: Jt,
  // 评分
  slider: Xt,
  // 滑块
  cascader: qt,
  // 级联选择器
  timepicker: Yt,
  // 时间选择器
  timeselect: Zt,
  // 时间选择
  treeselect: Gt
  // 树选择器
}, Fo = [
  "label",
  "labelWidth",
  "key",
  "type",
  "hidden",
  "span",
  "slots",
  "render",
  "options"
], Do = ["select", "checkboxgroup", "radiogroup"], No = "title", Je = (e) => e.type === No, Uo = (e, o) => Fo.includes(e) ? e === "options" ? Do.includes(o ?? "") : !0 : !1, Ee = {
  removeEmptyString: !0,
  removeEmptyArray: !0,
  removeEmptyObject: !0,
  removeEmptyRichText: !0,
  keepZero: !0,
  keepFalse: !0
}, jo = /^\d+$/, Fe = (e) => e.split(".").filter(Boolean).map((o) => jo.test(o) ? Number(o) : o), te = (e) => {
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
}, e), Ko = (e, o) => {
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
    Ko(e, o);
    return;
  }
  const n = Fe(o);
  if (!n.length) return;
  let c = e;
  n.forEach((p, u) => {
    if (u === n.length - 1) {
      c[p] = t;
      return;
    }
    const f = typeof n[u + 1] == "number" ? [] : {};
    (c[p] === null || c[p] === void 0 || typeof c[p] != "object") && (c[p] = f), c = c[p];
  });
}, Wo = (e) => /<(img|video|audio|iframe|embed|object)\b/i.test(e) ? !1 : e.replace(/&nbsp;/gi, "").replace(/<br\s*\/?>/gi, "").replace(/<[^>]*>/g, "").trim() === "", Ve = (e, o = Ee) => {
  if (Array.isArray(e)) {
    const l = e.map((t) => Ve(t, o)).filter((t) => t !== void 0);
    return l.length === 0 && o.removeEmptyArray ? void 0 : l;
  }
  if (e && typeof e == "object") {
    const l = Ie(e), t = Object.entries(l).reduce(
      (n, [c, p]) => {
        const u = Ve(p, o);
        return u !== void 0 && (n[c] = u), n;
      },
      {}
    );
    return Object.keys(t).length === 0 && o.removeEmptyObject ? void 0 : t;
  }
  return typeof e == "string" ? o.removeEmptyString && e.trim() === "" || o.removeEmptyRichText && Wo(e) ? void 0 : e : e === 0 ? o.keepZero ? e : void 0 : e === !1 ? o.keepFalse ? e : void 0 : e ?? void 0;
}, Le = (e, o = Ee) => Ve(te(e), o) || {}, St = (e) => e.props ? e.props : Object.fromEntries(
  Object.entries(e).filter(([o]) => !Uo(o, e.type))
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
}, Go = {
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
  const l = Go[o];
  return l ? e >= l.threshold ? e : l.fallback : e;
}
const Zo = 500, Yo = 2, qo = (e, o) => {
  const l = o && o > 0 ? o : 24, t = (e ?? l / Yo) / l * 24;
  return Math.min(24, Math.max(1, Math.round(t)));
}, Xo = (e, o, l) => e ? "flex-end" : o <= (l ?? 2) ? "flex-start" : "flex-end", Jo = { key: 1 }, Qo = { class: "form-buttons" }, ea = { class: "icon-wrapper" }, ta = /* @__PURE__ */ Y({
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
    const t = e, n = l, { width: c } = mt(), { t: p } = Be(), u = b(() => c.value < Zo), i = Pe("formRef"), r = V(te(t.modelValue)), f = V(te(t.modelValue));
    let h;
    He(
      () => t.modelValue,
      (z) => {
        z !== h && (r.value = te(z), f.value = te(z));
      }
    );
    const g = V(t.defaultExpanded), S = b(() => ({
      ...Ee,
      ...t.sanitizeOutput
    })), d = (z) => yt(r.value, z), R = (z, ee) => {
      wt(r.value, z, ee), h = r.value, n("update:modelValue", r.value);
    }, x = (z, ee) => Bt(z ?? A.value, ee), _ = b(() => {
      const z = t.items.filter((k) => !k.hidden);
      if (!t.isExpand && !g.value) {
        const k = Math.floor(24 / t.span) - 1;
        return z.slice(0, k);
      }
      return z;
    }), L = b(() => {
      const z = t.items.filter((ee) => !ee.hidden);
      return !t.isExpand && t.showExpand && z.length > Math.floor(24 / t.span) - 1;
    }), O = b(() => g.value ? p("table.searchBar.collapse") : p("table.searchBar.expand")), w = b(() => ({
      "justify-content": Xo(
        u.value,
        t.items.filter((z) => !z.hidden).length,
        t.buttonLeftLimit
      )
    })), I = () => {
      g.value = !g.value;
    }, y = () => {
      i.value?.resetFields(), Object.keys(r.value).forEach((z) => {
        delete r.value[z];
      }), Object.assign(r.value, te(f.value)), h = r.value, n("update:modelValue", r.value), n("reset");
    }, $ = () => {
      n(
        "search",
        Le(r.value, S.value)
      );
    };
    o({
      validate: (...z) => i.value.validate(...z),
      reset: y,
      // 允许外部在手动组装请求前直接读取清洗后的参数。
      getOutput: () => Le(r.value, S.value)
    });
    const { span: A, gutter: D, labelPosition: T, labelWidth: re } = it(t);
    return (z, ee) => (s(), E("section", {
      class: J(["ao-search-bar ao-card-xs", { "is-expanded": g.value }])
    }, [
      M(a(et), H({
        ref: "formRef",
        model: r.value,
        "label-position": a(T)
      }, { ...z.$attrs }), {
        default: m(() => [
          M(a(tt), { gutter: a(D) }, {
            default: m(() => [
              (s(!0), E(G, null, W(_.value, (k) => (s(), v(a(Oe), {
                key: k.key,
                xs: x(k.span, "xs"),
                sm: x(k.span, "sm"),
                md: x(k.span, "md"),
                lg: x(k.span, "lg"),
                xl: x(k.span, "xl")
              }, {
                default: m(() => [
                  M(a(ot), {
                    prop: k.key,
                    "label-width": k.label ? k.labelWidth || a(re) : void 0
                  }, le({
                    default: m(() => [
                      N(z.$slots, k.key, {
                        item: k,
                        modelValue: r.value
                      }, () => [
                        (s(), v(ae(a(xt)(k)), H({
                          "model-value": d(k.key),
                          "onUpdate:modelValue": (j) => R(k.key, j)
                        }, { ref_for: !0 }, a(St)(k)), le({
                          default: m(() => [
                            k.type === "select" && a(q)(k).length ? (s(!0), E(G, { key: 0 }, W(a(q)(k), (j) => (s(), v(a(at), H({ ref_for: !0 }, j, {
                              key: String(j.value)
                            }), null, 16))), 128)) : C("", !0),
                            k.type === "checkboxgroup" && a(q)(k).length ? (s(!0), E(G, { key: 1 }, W(a(q)(k), (j) => (s(), v(a(se), H({ ref_for: !0 }, j, {
                              key: String(j.value)
                            }), null, 16))), 128)) : C("", !0),
                            k.type === "radiogroup" && a(q)(k).length ? (s(!0), E(G, { key: 2 }, W(a(q)(k), (j) => (s(), v(a(lt), H({ ref_for: !0 }, j, {
                              key: String(j.value)
                            }), null, 16))), 128)) : C("", !0)
                          ]),
                          _: 2
                        }, [
                          W(a(kt)(k), (j, Ce) => ({
                            name: Ce,
                            fn: m(() => [
                              (s(), v(ae(j)))
                            ])
                          }))
                        ]), 1040, ["model-value", "onUpdate:modelValue"]))
                      ], !0)
                    ]),
                    _: 2
                  }, [
                    k.label ? {
                      name: "label",
                      fn: m(() => [
                        typeof k.label != "string" ? (s(), v(ae(k.label), { key: 0 })) : (s(), E("span", Jo, U(k.label), 1))
                      ]),
                      key: "0"
                    } : void 0
                  ]), 1032, ["prop", "label-width"])
                ]),
                _: 2
              }, 1032, ["xs", "sm", "md", "lg", "xl"]))), 128)),
              M(a(Oe), {
                xs: 24,
                sm: 24,
                md: a(A),
                lg: a(A),
                xl: a(A),
                class: "action-column"
              }, {
                default: m(() => [
                  K("div", {
                    class: "action-buttons-wrapper",
                    style: ve(w.value)
                  }, [
                    K("div", Qo, [
                      e.showSearch ? (s(), v(a(fe), {
                        key: 0,
                        type: "primary",
                        plain: "",
                        class: "search-button",
                        onClick: $,
                        disabled: e.disabledSearch
                      }, {
                        default: m(() => [
                          X(U(a(p)("table.searchBar.search")), 1)
                        ]),
                        _: 1
                      }, 8, ["disabled"])) : C("", !0),
                      e.showReset ? (s(), v(a(fe), {
                        key: 1,
                        plain: "",
                        class: "reset-button",
                        onClick: y
                      }, {
                        default: m(() => [
                          X(U(a(p)("table.searchBar.reset")), 1)
                        ]),
                        _: 1
                      })) : C("", !0)
                    ]),
                    L.value ? (s(), E("div", {
                      key: 0,
                      class: "filter-toggle",
                      onClick: I
                    }, [
                      K("span", null, U(O.value), 1),
                      K("div", ea, [
                        M(a(nt), null, {
                          default: m(() => [
                            g.value ? (s(), v(a(Bo), { key: 0 })) : (s(), v(a(Eo), { key: 1 }))
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
}), Q = (e, o) => {
  const l = e.__vccOpts || e;
  for (const [t, n] of o)
    l[t] = n;
  return l;
}, oa = /* @__PURE__ */ Q(ta, [["__scopeId", "data-v-6125fcb8"]]), aa = ["src"], la = /* @__PURE__ */ Y({
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
    function t(u) {
      if (!(!u || u.includes(":")))
        return l(u);
    }
    const n = ct(), c = b(() => t(o.icon)), p = b(() => ({
      class: n.class || "",
      style: [n.style, { width: o.size, height: o.size }]
    }));
    return (u, i) => c.value ? (s(), E("img", H({
      key: 0,
      src: c.value
    }, p.value, {
      class: "ao-svg-icon",
      alt: ""
    }), null, 16, aa)) : o.icon ? (s(), v(a(Ao), H({
      key: 1,
      icon: o.icon
    }, p.value, { class: "ao-svg-icon" }), null, 16, ["icon"])) : C("", !0);
  }
}), ge = /* @__PURE__ */ Q(la, [["__scopeId", "data-v-e3e5bfd5"]]), na = /* @__PURE__ */ Y({
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
    const l = e, t = o, n = V(), c = b(() => l.loading ? "is-loading-icon" : l.active ? "is-active-icon" : "is-icon"), p = (u) => {
      t("click", u);
    };
    return (u, i) => (s(), E("div", {
      ref_key: "triggerRef",
      ref: n,
      class: J(["button", { "is-active": e.active }]),
      onClick: p
    }, [
      M(ge, {
        icon: e.icon,
        size: "1rem",
        class: J(c.value)
      }, null, 8, ["icon", "class"]),
      e.content ? (s(), v(a(ro), {
        key: 0,
        "virtual-ref": n.value,
        "virtual-triggering": "",
        content: e.content,
        placement: "top",
        "show-after": 500
      }, null, 8, ["virtual-ref", "content"])) : C("", !0)
    ], 2));
  }
}), ce = /* @__PURE__ */ Q(na, [["__scopeId", "data-v-8e84760f"]]), oe = {
  selection: "__selection__",
  expand: "__expand__",
  index: "__index__",
  globalIndex: "__globalIndex__"
}, Z = (e) => e.columnKey ?? oe[e.type] ?? e.prop ?? e.slotName ?? "", xe = (e) => e.visible ?? !0, ra = (e, o) => {
  const l = e.type && e.type in oe, t = xe(e);
  if (l) {
    const n = e.type;
    return {
      ...e,
      prop: oe[n],
      // 列名以用户声明为准，仅在未声明时回落到内置文案
      label: e.label || o[n],
      visible: t
    };
  }
  return { ...e, visible: t };
}, Te = (e, o) => e.map((l) => ra(l, o));
function Fa(e) {
  const { t: o } = Be(), l = b(() => ({
    selection: o("table.column.selection"),
    expand: o("table.column.expand"),
    index: o("table.column.index"),
    globalIndex: o("table.column.globalIndex")
  })), t = V(e()), n = V(
    Te(t.value, l.value)
  );
  He(l, (u) => {
    const i = new Map(t.value.map((r) => [Z(r), r]));
    n.value = n.value.map((r) => {
      if (r.type && r.type in oe) {
        const f = r.type, h = i.get(Z(r));
        return {
          ...r,
          label: h?.label || u[f]
        };
      }
      return r;
    });
  });
  const c = b(() => {
    const u = new Map(t.value.map((i) => [Z(i), i]));
    return n.value.filter((i) => xe(i)).map((i) => {
      const r = Z(i), f = u.get(r);
      return f ? { ...f, visible: !0 } : i;
    });
  }), p = (u) => {
    const i = [...t.value], r = u(i);
    t.value = Array.isArray(r) ? r : i;
  };
  return {
    columns: c,
    columnChecks: n,
    /**
     * @description 新增列（支持单个或批量）
     * @param column 列配置或列配置数组
     * @param index 可选的插入位置，越界时追加到末尾
     */
    addColumn: (u, i) => {
      const r = Array.isArray(u) ? u : [u];
      if (r.length === 0) return;
      p((S) => {
        const d = [...S], R = typeof i == "number" && i >= 0 && i <= d.length ? i : d.length;
        return d.splice(R, 0, ...r), d;
      });
      const f = Te(r, l.value), h = [...n.value], g = typeof i == "number" && i >= 0 && i <= h.length ? i : h.length;
      h.splice(g, 0, ...f), n.value = h;
    },
    /**
     * @description 删除列（支持单个或批量）
     * @param prop 列的唯一标识或标识数组
     */
    removeColumn: (u) => {
      const i = Array.isArray(u) ? u : [u];
      i.length !== 0 && (p((r) => r.filter((f) => !i.includes(Z(f)))), n.value = n.value.filter(
        (r) => !i.includes(Z(r))
      ));
    },
    /**
     * @description 更新列（支持单个或批量）
     * @param prop 列的唯一标识或更新配置数组
     * @param updates 列配置更新，prop 为字符串时使用
     */
    updateColumn: (u, i) => {
      const r = Array.isArray(u) ? u : i ? [{ prop: u, updates: i }] : [];
      if (r.length === 0) return;
      const f = new Map(r.map((h) => [h.prop, h.updates]));
      p(
        (h) => h.map((g) => {
          const S = f.get(Z(g));
          return S ? { ...g, ...S } : g;
        })
      ), n.value = n.value.map((h) => {
        const g = Z(h), S = f.get(g);
        if (!S) return h;
        const d = { ...h, ...S };
        return d.type && d.type in oe && (d.prop = oe[d.type], d.label = d.label || l.value[d.type]), "visible" in S && (d.visible = S.visible), d;
      });
    },
    /**
     * @description 切换列显示状态（支持单个或批量），通过 visible 控制显隐
     * @param prop 列的唯一标识或标识数组
     * @param visible 可选的显示状态，未传时取反
     */
    toggleColumn: (u, i) => {
      const r = Array.isArray(u) ? u : [u];
      if (r.length === 0) return;
      const f = [...n.value], h = /* @__PURE__ */ new Map();
      r.forEach((g) => {
        const S = f.findIndex((R) => Z(R) === g);
        if (S < 0) return;
        const d = i ?? !xe(f[S]);
        f[S] = { ...f[S], visible: d }, h.set(g, d);
      }), n.value = f, p(
        (g) => g.map((S) => {
          const d = Z(S);
          return h.has(d) ? { ...S, visible: h.get(d) } : S;
        })
      );
    },
    /** @description 重置所有列到初始配置，恢复初始列显隐与初始列顺序 */
    resetColumns: () => {
      const u = e();
      t.value = [...u], n.value = Te(u, l.value);
    },
    /**
     * @description 批量更新列
     * @param updates 列更新配置
     * @deprecated 推荐使用 updateColumn 的数组模式
     */
    batchUpdateColumns: (u) => {
      if (!Array.isArray(u) || u.length === 0) return;
      const i = new Map(u.map((r) => [r.prop, r.updates]));
      p(
        (r) => r.map((f) => {
          const h = i.get(Z(f));
          return h ? { ...f, ...h } : f;
        })
      ), n.value = n.value.map((r) => {
        const f = Z(r), h = i.get(f);
        if (!h) return r;
        const g = { ...r, ...h };
        return g.type && g.type in oe && (g.prop = oe[g.type], g.label = g.label || l.value[g.type]), "visible" in h && (g.visible = h.visible), g;
      });
    },
    /**
     * @description 重新排序列，索引越界或原地移动时保持原顺序
     * @param fromIndex 源索引
     * @param toIndex 目标索引
     */
    reorderColumns: (u, i) => {
      const r = (f) => {
        if (u < 0 || u >= f.length || i < 0 || i >= f.length || u === i)
          return f;
        const h = [...f], [g] = h.splice(u, 1);
        return h.splice(i, 0, g), h;
      };
      p(r), n.value = r(n.value);
    },
    /**
     * @description 获取指定列的配置
     * @param prop 列的唯一标识
     * @return 列配置，未找到时返回 undefined
     */
    getColumnConfig: (u) => t.value.find((i) => Z(i) === u),
    /**
     * @description 获取所有列配置的副本
     * @return 所有列配置
     */
    getAllColumns: () => [...t.value]
  };
}
const sa = { class: "table-header-root" }, ua = { class: "left-wrap" }, ia = { class: "right-wrap" }, ca = /* @__PURE__ */ Y({
  name: "AoTableHeader",
  __name: "AoTableHeader",
  props: /* @__PURE__ */ ne({
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
  emits: /* @__PURE__ */ ne(["refresh", "search", "update:showSearchBar"], ["update:columns"]),
  setup(e, { emit: o }) {
    const { t: l } = Be(), t = e, n = me(e, "columns"), c = o, p = (A, D) => {
      A.visible = !!D;
    }, u = [
      { value: he.SMALL, label: l("table.sizeOptions.small") },
      { value: he.DEFAULT, label: l("table.sizeOptions.default") },
      { value: he.LARGE, label: l("table.sizeOptions.large") }
    ], i = Me(), { tableSize: r, isZebra: f, isBorder: h, isHeaderBackground: g } = ht(i), S = b(() => t.layout.split(",").map((A) => A.trim())), d = (A) => S.value.includes(A), R = (A) => {
      const D = A.related;
      return !(D && D.classList.contains("fixed-column"));
    }, x = () => {
      c("update:showSearchBar", !t.showSearchBar), c("search");
    }, _ = () => {
      O.value = !0, c("refresh");
    }, L = (A) => {
      Me().setTableSize(A);
    }, O = V(!1), w = V(!1), I = V(""), y = () => {
      const A = document.querySelector(`.${t.fullClass}`);
      A && (w.value = !w.value, w.value ? (I.value = document.body.style.overflow, document.body.style.overflow = "hidden", A.classList.add("el-full-screen"), i.setIsFullScreen(!0)) : (document.body.style.overflow = I.value, A.classList.remove("el-full-screen"), i.setIsFullScreen(!1)));
    }, $ = (A) => {
      A.key === "Escape" && w.value && y();
    };
    return vo(() => {
      document.addEventListener("keydown", $);
    }), go(() => {
      if (document.removeEventListener("keydown", $), w.value) {
        document.body.style.overflow = I.value;
        const A = document.querySelector(`.${t.fullClass}`);
        A && A.classList.remove("el-full-screen");
      }
    }), (A, D) => (s(), E("div", sa, [
      K("div", ua, [
        N(A.$slots, "left", {}, void 0, !0)
      ]),
      K("div", ia, [
        N(A.$slots, "right", {}, void 0, !0),
        e.showSearchBar != null ? (s(), v(ce, {
          key: 0,
          icon: "ri:search-line",
          content: a(l)("table.header.search"),
          active: e.showSearchBar,
          onClick: x
        }, null, 8, ["content", "active"])) : C("", !0),
        d("refresh") ? (s(), v(ce, {
          key: 1,
          icon: "ri:refresh-line",
          content: a(l)("table.header.refresh"),
          loading: e.loading && O.value,
          onClick: _
        }, null, 8, ["content", "loading"])) : C("", !0),
        d("size") ? (s(), v(a(rt), {
          key: 2,
          onCommand: L
        }, {
          dropdown: m(() => [
            M(a(st), null, {
              default: m(() => [
                (s(), E(G, null, W(u, (T) => K("div", {
                  key: T.value,
                  class: J(["table-size-btn-item", { "is-current-size": a(r) === T.value }])
                }, [
                  (s(), v(a(ut), {
                    key: T.value,
                    command: T.value
                  }, {
                    default: m(() => [
                      X(U(T.label), 1)
                    ]),
                    _: 2
                  }, 1032, ["command"]))
                ], 2)), 64))
              ]),
              _: 1
            })
          ]),
          default: m(() => [
            M(ce, {
              icon: "ri:arrow-up-down-fill",
              content: a(l)("table.header.size")
            }, null, 8, ["content"])
          ]),
          _: 1
        })) : C("", !0),
        d("fullscreen") ? (s(), v(ce, {
          key: 3,
          icon: w.value ? "ri:fullscreen-exit-line" : "ri:fullscreen-line",
          content: a(l)("table.header.fullscreen"),
          onClick: y
        }, null, 8, ["icon", "content"])) : C("", !0),
        d("columns") ? (s(), v(a(Ze), {
          key: 4,
          placement: "bottom",
          trigger: "click"
        }, {
          reference: m(() => [
            M(ce, {
              icon: "ri:align-right",
              content: a(l)("table.header.columns")
            }, null, 8, ["content"])
          ]),
          default: m(() => [
            K("div", null, [
              M(a(so), { "max-height": "380px" }, {
                default: m(() => [
                  M(a(_o), {
                    modelValue: n.value,
                    "onUpdate:modelValue": D[0] || (D[0] = (T) => n.value = T),
                    disabled: !1,
                    filter: ".fixed-column",
                    "prevent-on-filter": !1,
                    onMove: R
                  }, {
                    default: m(() => [
                      (s(!0), E(G, null, W(n.value, (T) => (s(), E("div", {
                        key: T.columnKey || T.prop || T.type,
                        class: J(["column-option", { "fixed-column": T.fixed }])
                      }, [
                        K("div", {
                          class: J(["drag-icon", T.fixed ? "is-fixed" : "is-movable"])
                        }, [
                          M(ge, {
                            icon: T.fixed ? "ri:unpin-line" : "ri:drag-move-2-fill",
                            class: "drag-icon-svg"
                          }, null, 8, ["icon"])
                        ], 2),
                        M(a(se), {
                          "model-value": a(xe)(T),
                          "onUpdate:modelValue": (re) => p(T, re),
                          disabled: T.disabled,
                          class: "column-checkbox"
                        }, {
                          default: m(() => [
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
        })) : C("", !0),
        d("settings") ? (s(), v(a(Ze), {
          key: 5,
          placement: "bottom",
          trigger: "click"
        }, {
          reference: m(() => [
            M(ce, {
              icon: "ri:settings-line",
              content: a(l)("table.header.settings")
            }, null, 8, ["content"])
          ]),
          default: m(() => [
            K("div", null, [
              e.showZebra ? (s(), v(a(se), {
                key: 0,
                modelValue: a(f),
                "onUpdate:modelValue": D[1] || (D[1] = (T) => Ae(f) ? f.value = T : null),
                value: !0
              }, {
                default: m(() => [
                  X(U(a(l)("table.zebra")), 1)
                ]),
                _: 1
              }, 8, ["modelValue"])) : C("", !0),
              e.showBorder ? (s(), v(a(se), {
                key: 1,
                modelValue: a(h),
                "onUpdate:modelValue": D[2] || (D[2] = (T) => Ae(h) ? h.value = T : null),
                value: !0
              }, {
                default: m(() => [
                  X(U(a(l)("table.border")), 1)
                ]),
                _: 1
              }, 8, ["modelValue"])) : C("", !0),
              e.showHeaderBackground ? (s(), v(a(se), {
                key: 2,
                modelValue: a(g),
                "onUpdate:modelValue": D[3] || (D[3] = (T) => Ae(g) ? g.value = T : null),
                value: !0
              }, {
                default: m(() => [
                  X(U(a(l)("table.headerBackground")), 1)
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
}), da = /* @__PURE__ */ Q(ca, [["__scopeId", "data-v-7c40a1b5"]]), fa = { key: 0 }, pa = { class: "ao-table-bottom__left" }, ha = {
  key: 0,
  class: "pagination custom-pagination"
}, ma = /* @__PURE__ */ Y({
  name: "AoTable",
  __name: "index",
  props: /* @__PURE__ */ ne({
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
  emits: /* @__PURE__ */ ne(["size-change", "current-change", "refresh", "search", "reset", "update:showSearchBar"], ["update:searchForm", "update:columnChecks"]),
  setup(e, { expose: o, emit: l }) {
    const t = e, n = me(e, "searchForm"), c = me(e, "columnChecks"), p = bo(), u = ct(), i = dt(), { width: r } = mt(), f = V(null), h = V(), g = V(), S = Me(), { isBorder: d, isZebra: R, tableSize: x, isFullScreen: _, isHeaderBackground: L } = ht(S), O = V(null), w = V(null), I = {
      MOBILE: "prev, pager, next, sizes, jumper, total",
      IPAD: "prev, pager, next, jumper, total",
      DESKTOP: "total, prev, pager, next, sizes, jumper"
    }, y = b(() => r.value < 768 ? I.MOBILE : r.value < 1024 ? I.IPAD : I.DESKTOP), $ = b(() => ({
      background: !0,
      hideOnSinglePage: !1,
      size: "default",
      pagerCount: r.value > 1200 ? 7 : 5,
      layout: y.value,
      ...t.paginationOptions
    })), A = b(() => t.border ?? d.value), D = b(() => t.stripe ?? R.value), T = b(() => t.size ?? x.value), re = b(() => t.data?.length === 0), z = b(() => t.pagination?.currentPage ?? 1), ee = b(() => t.pagination?.pageSize ?? 10), k = b(() => t.pagination?.total ?? 0), j = b(() => (t.searchItems?.length ?? 0) > 0), Ce = b(() => !!(i["header-left"] || i["header-right"])), be = b(
      () => t.integrated ?? (j.value || Ce.value)
    ), De = V(!0), Ne = b(() => t.showSearchBar ?? De.value), Et = b(
      () => j.value ? Ne.value : void 0
    ), Ct = b(() => be.value && t.showTableHeader), _t = b(() => be.value ? "is-integrated" : "is-bare"), At = b(() => be.value ? uo : "div"), Tt = b(() => be.value ? "ao-table-card" : "ao-table-bare"), Ue = V(0), je = V(0);
    qe(h, (B) => {
      const F = B[0];
      F && requestAnimationFrame(() => {
        Ue.value = F.contentRect.height;
      });
    }), qe(g, (B) => {
      const F = B[0];
      F && requestAnimationFrame(() => {
        je.value = F.contentRect.height;
      });
    });
    const Ot = V(10), { containerHeight: It } = Ho({
      showTableHeader: b(() => t.showTableHeader),
      bottomBarHeight: Ue,
      tableHeaderHeight: je,
      bottomBarSpacing: Ot
    }), Rt = b(() => _.value ? "100%" : re.value && !t.loading ? t.emptyHeight : t.height ? t.height : "100%"), zt = b(() => ({
      background: L.value ? "var(--ao-table-header-bg-color)" : "var(--default-box-color)",
      ...t.headerCellStyle || {}
      // 合并用户传入的样式
    })), Mt = (B) => {
      const F = p?.vnode.props || {}, pe = B.replace(/[A-Z]/g, (P) => `-${P.toLowerCase()}`);
      return B in F || pe in F;
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
      const B = { ...t };
      return Vt.forEach((F) => {
        delete B[F];
      }), B;
    }), $t = b(() => ({
      ...u,
      ...Lt.value,
      height: Rt.value,
      stripe: D.value,
      border: A.value,
      size: T.value,
      headerCellStyle: zt.value,
      // Element Plus 默认值为 true，未显式传入时不应被 AoTable 覆盖成 false。
      selectOnIndeterminate: Mt("selectOnIndeterminate") ? t.selectOnIndeterminate : void 0
    })), Ke = b(() => k.value > 0 && !re.value), We = (B) => B.$index === void 0 || B.$index >= 0, Pt = ["slotName", "visible", "disabled"], _e = (B) => {
      const F = { ...B };
      return Pt.forEach((pe) => {
        delete F[pe];
      }), F;
    }, Ht = (B) => {
      ue("size-change", B);
    }, Ft = (B) => {
      ue("current-change", B), Ge();
    }, Dt = async (B) => {
      if (t.searchRules)
        try {
          await O.value?.validate();
        } catch {
          return;
        }
      ue("search", B);
    }, Nt = () => {
      ue("reset");
    }, Ut = () => {
      ue("refresh");
    }, jt = (B) => {
      t.showSearchBar === void 0 && (De.value = B), ue("update:showSearchBar", B);
    }, Kt = Po, Ge = () => {
      pt(() => {
        f.value?.setScrollTop(0), Kt();
      });
    }, Wt = (B) => (z.value - 1) * ee.value + B + 1, ue = l;
    return yo(
      () => {
        g.value = w.value?.$el ?? void 0;
      },
      { flush: "post" }
    ), o({
      scrollToTop: Ge,
      elTableRef: f
    }), (B, F) => {
      const pe = ft("loading");
      return s(), E("div", {
        class: J(["ao-table-root", _t.value])
      }, [
        j.value ? Se((s(), v(oa, {
          key: 0,
          ref_key: "searchBarRef",
          ref: O,
          modelValue: n.value,
          "onUpdate:modelValue": F[0] || (F[0] = (P) => n.value = P),
          items: e.searchItems,
          rules: e.searchRules,
          span: e.searchSpan,
          "show-expand": e.searchShowExpand,
          onSearch: Dt,
          onReset: Nt
        }, null, 8, ["modelValue", "items", "rules", "span", "show-expand"])), [
          [wo, Ne.value]
        ]) : C("", !0),
        (s(), v(ae(At.value), {
          class: J(Tt.value)
        }, {
          default: m(() => [
            Ct.value ? (s(), v(da, {
              key: 0,
              ref_key: "tableHeaderCompRef",
              ref: w,
              columns: c.value,
              "onUpdate:columns": F[1] || (F[1] = (P) => c.value = P),
              "show-search-bar": Et.value,
              "show-zebra": e.headerShowZebra,
              "show-border": e.headerShowBorder,
              "show-header-background": e.headerShowHeaderBackground,
              loading: e.loading,
              "onUpdate:showSearchBar": jt,
              onRefresh: Ut
            }, {
              left: m(() => [
                N(B.$slots, "header-left", {}, void 0, !0)
              ]),
              right: m(() => [
                N(B.$slots, "header-right", {}, void 0, !0)
              ]),
              _: 3
            }, 8, ["columns", "show-search-bar", "show-zebra", "show-border", "show-header-background", "loading"])) : C("", !0),
            K("div", {
              class: J(["ao-table", { "is-empty": re.value }]),
              style: ve(a(It))
            }, [
              Se((s(), v(a(io), H({
                ref_key: "elTableRef",
                ref: f
              }, $t.value), {
                default: m(() => [
                  (s(!0), E(G, null, W(e.columns, (P) => (s(), E(G, {
                    key: P.columnKey || P.prop || P.type
                  }, [
                    P.type === "globalIndex" ? (s(), v(a(we), H({
                      key: 0,
                      ref_for: !0
                    }, _e(P)), {
                      default: m(({ $index: ie }) => [
                        K("span", null, U(Wt(ie)), 1)
                      ]),
                      _: 1
                    }, 16)) : P.type === "expand" ? (s(), v(a(we), H({
                      key: 1,
                      ref_for: !0
                    }, _e(P)), le({ _: 2 }, [
                      P.slotName ? {
                        name: "default",
                        fn: m((ie) => [
                          N(B.$slots, P.slotName, H({ ref_for: !0 }, ie), void 0, !0)
                        ]),
                        key: "0"
                      } : void 0
                    ]), 1040)) : (s(), v(a(we), H({
                      key: 2,
                      ref_for: !0
                    }, _e(P)), le({ _: 2 }, [
                      P.slotName ? {
                        name: "default",
                        fn: m((ie) => [
                          We(ie) ? N(B.$slots, P.slotName, H({ ref_for: !0 }, ie), void 0, !0, 0) : C("", !0)
                        ]),
                        key: "0"
                      } : void 0
                    ]), 1040))
                  ], 64))), 128)),
                  a(i).default ? N(B.$slots, "default", {}, void 0, !0, 0) : C("", !0),
                  a(i).operation ? (s(), v(a(we), {
                    key: 1,
                    label: "操作",
                    width: 210,
                    fixed: "right",
                    align: "left"
                  }, {
                    default: m((P) => [
                      We(P) ? N(B.$slots, "operation", Re(ze(P)), void 0, !0, 0) : C("", !0)
                    ]),
                    _: 3
                  })) : C("", !0)
                ]),
                empty: m(() => [
                  e.loading ? (s(), E("div", fa)) : (s(), v(a(co), {
                    key: 1,
                    description: e.emptyText,
                    "image-size": 120
                  }, null, 8, ["description"]))
                ]),
                _: 3
              }, 16)), [
                [pe, !!e.loading]
              ])
            ], 6),
            K("div", {
              class: J(["ao-table-bottom", { "is-bar-empty": !Ke.value && !B.$slots.footer }]),
              ref_key: "bottomBarRef",
              ref: h
            }, [
              K("div", pa, [
                N(B.$slots, "footer", {}, void 0, !0)
              ]),
              Ke.value ? (s(), E("div", ha, [
                M(a(fo), H($.value, {
                  total: k.value,
                  disabled: e.loading,
                  "current-page": z.value,
                  "page-size": ee.value,
                  onSizeChange: Ht,
                  onCurrentChange: Ft
                }), null, 16, ["total", "disabled", "current-page", "page-size"])
              ])) : C("", !0)
            ], 2)
          ]),
          _: 3
        }, 8, ["class"]))
      ], 2);
    };
  }
}), Da = /* @__PURE__ */ Q(ma, [["__scopeId", "data-v-7e2f709a"]]), va = { class: "form-section" }, ga = {
  key: 0,
  class: "form-title"
}, ba = { key: 1 }, ya = { key: 1 }, wa = /* @__PURE__ */ Y({
  __name: "FormBody",
  props: /* @__PURE__ */ ne({
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
  emits: /* @__PURE__ */ ne(["reset", "submit"], ["update:modelValue"]),
  setup(e, { expose: o, emit: l }) {
    const t = e, n = l, c = me(e, "modelValue"), p = Pe("formRef"), u = V({});
    u.value = te(c.value), He(c, (w) => {
      u.value = te(w);
    });
    const i = b(() => ({
      ...Ee,
      ...t.sanitizeOutput
    })), r = (w) => yt(c.value, w), f = (w, I) => {
      wt(c.value, w, I);
    }, h = (w, I) => Je(w) ? 24 : Bt(qo(w.span, x.value), I), g = b(() => t.items.filter((w) => !w.hidden)), S = () => Le(c.value, i.value);
    o({
      validate: (...w) => p.value.validate(...w),
      /**
       * @description 清除指定字段或全部字段的校验状态，不修改表单值
       * @param args Element Plus clearValidate 的字段参数，省略时清除全部字段
       */
      clearValidate: (...w) => p.value?.clearValidate(...w),
      reset: () => {
        p.value?.resetFields(), Object.keys(c.value).forEach((w) => {
          delete c.value[w];
        }), Object.assign(c.value, te(u.value)), n("reset");
      },
      submit: async () => {
        try {
          await p.value?.validate();
        } catch {
          console.error("[AoForm] 表单校验失败");
          return;
        }
        n("submit", S());
      },
      // 允许外部在不触发提交事件时主动获取清洗后的输出。
      getOutput: S
    });
    const { span: x, gutter: _, labelPosition: L, labelWidth: O } = it(t);
    return (w, I) => (s(), E("section", va, [
      M(a(et), H({
        ref: "formRef",
        model: c.value,
        "label-position": a(L)
      }, { ...w.$attrs }), {
        default: m(() => [
          M(a(tt), { gutter: a(_) }, {
            default: m(() => [
              (s(!0), E(G, null, W(g.value, (y) => (s(), v(a(Oe), {
                key: y.key,
                xs: h(y, "xs"),
                sm: h(y, "sm"),
                md: h(y, "md"),
                lg: h(y, "lg"),
                xl: h(y, "xl")
              }, {
                default: m(() => [
                  a(Je)(y) ? (s(), E("div", ga, [
                    typeof y.label != "string" ? (s(), v(ae(y.label), { key: 0 })) : (s(), E("span", ba, U(y.label), 1))
                  ])) : (s(), v(a(ot), {
                    key: 1,
                    prop: y.key,
                    "label-width": y.label ? y.labelWidth || a(O) : void 0
                  }, le({
                    default: m(() => [
                      N(w.$slots, y.key, {
                        item: y,
                        modelValue: c.value
                      }, () => [
                        (s(), v(ae(a(xt)(y)), H({
                          "model-value": r(y.key),
                          "onUpdate:modelValue": ($) => f(y.key, $)
                        }, { ref_for: !0 }, a(St)(y)), le({
                          default: m(() => [
                            y.type === "select" && a(q)(y).length ? (s(!0), E(G, { key: 0 }, W(a(q)(y), ($) => (s(), v(a(at), H({ ref_for: !0 }, $, {
                              key: String($.value)
                            }), null, 16))), 128)) : C("", !0),
                            y.type === "checkboxgroup" && a(q)(y).length ? (s(!0), E(G, { key: 1 }, W(a(q)(y), ($) => (s(), v(a(se), H({ ref_for: !0 }, $, {
                              key: String($.value)
                            }), null, 16))), 128)) : C("", !0),
                            y.type === "radiogroup" && a(q)(y).length ? (s(!0), E(G, { key: 2 }, W(a(q)(y), ($) => (s(), v(a(lt), H({ ref_for: !0 }, $, {
                              key: String($.value)
                            }), null, 16))), 128)) : C("", !0)
                          ]),
                          _: 2
                        }, [
                          W(a(kt)(y), ($, A) => ({
                            name: A,
                            fn: m(() => [
                              (s(), v(ae($)))
                            ])
                          }))
                        ]), 1040, ["model-value", "onUpdate:modelValue"]))
                      ], !0)
                    ]),
                    _: 2
                  }, [
                    y.label ? {
                      name: "label",
                      fn: m(() => [
                        typeof y.label != "string" ? (s(), v(ae(y.label), { key: 0 })) : (s(), E("span", ya, U(y.label), 1))
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
}), Qe = /* @__PURE__ */ Q(wa, [["__scopeId", "data-v-e7e83958"]]), Na = /* @__PURE__ */ Y({
  name: "AoForm",
  inheritAttrs: !1,
  __name: "index",
  props: /* @__PURE__ */ ne({
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
  emits: /* @__PURE__ */ ne(["update:visible", "cancel", "closed", "reset", "submit"], ["update:modelValue"]),
  setup(e, { expose: o, emit: l }) {
    const t = e, n = l, c = me(e, "modelValue"), { t: p } = Be(), u = dt(), i = Pe("formBodyRef"), r = b(() => t.dialog), f = b(() => ({
      items: t.items,
      span: t.span,
      gutter: t.gutter,
      labelPosition: t.labelPosition,
      labelWidth: t.labelWidth,
      sanitizeOutput: t.sanitizeOutput
    })), h = () => {
      n("reset");
    }, g = (x) => {
      n("submit", x);
    }, S = (x) => {
      n("update:visible", x);
    }, d = () => {
      n("cancel"), S(!1);
    }, R = () => {
      i.value?.submit();
    };
    return o({
      /** 校验表单，透传表单主体的 validate */
      validate: (...x) => i.value.validate(...x),
      /**
       * @description 清除指定字段或全部字段的校验状态，透传表单主体的 clearValidate
       * @param args 待清除校验的字段参数，省略时清除全部字段
       */
      clearValidate: (...x) => i.value?.clearValidate(...x),
      /** 重置表单，透传表单主体的 reset */
      reset: () => i.value?.reset(),
      /** 触发提交（含校验），透传表单主体的 submit */
      submit: () => i.value?.submit(),
      /** 读取清洗后的表单输出，透传表单主体的 getOutput */
      getOutput: () => i.value?.getOutput() ?? {}
    }), (x, _) => {
      const L = ft("loading");
      return r.value ? (s(), v(a(po), {
        key: 0,
        class: "ao-form-dialog",
        "model-value": e.visible,
        title: e.title,
        width: e.width,
        "align-center": e.alignCenter,
        draggable: "",
        overflow: !1,
        "onUpdate:modelValue": S,
        onClosed: _[1] || (_[1] = (O) => n("closed"))
      }, {
        footer: m(() => [
          N(x.$slots, "footer", {}, () => [
            M(a(fe), { onClick: d }, {
              default: m(() => [
                X(U(e.cancelText || a(p)("common.cancel")), 1)
              ]),
              _: 1
            }),
            e.showSubmit ? (s(), v(a(fe), {
              key: 0,
              type: "primary",
              disabled: e.disabledSubmit || e.loading,
              onClick: R
            }, {
              default: m(() => [
                X(U(e.confirmText || a(p)("common.confirm")), 1)
              ]),
              _: 1
            }, 8, ["disabled"])) : C("", !0)
          ])
        ]),
        default: m(() => [
          Se((s(), v(Qe, H({
            ref_key: "formBodyRef",
            ref: i
          }, { ...f.value, ...x.$attrs }, {
            modelValue: c.value,
            "onUpdate:modelValue": _[0] || (_[0] = (O) => c.value = O),
            onReset: h,
            onSubmit: g
          }), le({ _: 2 }, [
            W(a(u), (O, w) => ({
              name: w,
              fn: m((I) => [
                N(x.$slots, w, Re(ze(I ?? {})))
              ])
            }))
          ]), 1040, ["modelValue"])), [
            [L, e.loading]
          ])
        ]),
        _: 3
      }, 8, ["model-value", "title", "width", "align-center"])) : Se((s(), v(Qe, H({
        key: 1,
        ref_key: "formBodyRef",
        ref: i
      }, { ...f.value, ...x.$attrs }, {
        modelValue: c.value,
        "onUpdate:modelValue": _[2] || (_[2] = (O) => c.value = O),
        onReset: h,
        onSubmit: g
      }), le({ _: 2 }, [
        W(a(u), (O, w) => ({
          name: w,
          fn: m((I) => [
            N(x.$slots, w, Re(ze(I ?? {})))
          ])
        }))
      ]), 1040, ["modelValue"])), [
        [L, e.loading]
      ]);
    };
  }
}), Sa = /* @__PURE__ */ Y({
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
    }, c = b(() => l.icon || (l.type ? n[l.type]?.icon : "") || ""), p = b(() => l.iconClass || (l.type ? n[l.type]?.class : "") || ""), u = () => {
      t("click");
    };
    return (i, r) => (s(), E("div", {
      class: J(["ao-button-table", p.value]),
      style: ve({ backgroundColor: e.buttonBgColor, color: e.iconColor }),
      onClick: u
    }, [
      M(ge, { icon: c.value }, null, 8, ["icon"])
    ], 6));
  }
}), Ua = /* @__PURE__ */ Q(Sa, [["__scopeId", "data-v-005b60b0"]]), ka = /* @__PURE__ */ Y({
  name: "AoIconButton",
  __name: "AoIconButton",
  props: {
    icon: {},
    circle: { type: Boolean }
  },
  setup(e) {
    return (o, l) => (s(), E("div", {
      class: J(["icon-button", { "is-circle": e.circle }])
    }, [
      M(ge, { icon: e.icon }, null, 8, ["icon"]),
      N(o.$slots, "default", {}, void 0, !0)
    ], 2));
  }
}), xa = /* @__PURE__ */ Q(ka, [["__scopeId", "data-v-a298f446"]]), Ba = /* @__PURE__ */ Y({
  name: "AoButtonMore",
  __name: "AoButtonMore",
  props: {
    list: {},
    auth: {}
  },
  emits: ["click"],
  setup(e, { emit: o }) {
    const { hasAuth: l } = $o(), t = e, n = b(() => t.list.some((u) => !u.auth || l(u.auth))), c = o, p = (u) => {
      c("click", u);
    };
    return (u, i) => (s(), E("div", null, [
      n.value ? (s(), v(a(rt), { key: 0 }, {
        dropdown: m(() => [
          M(a(st), null, {
            default: m(() => [
              (s(!0), E(G, null, W(e.list, (r) => (s(), E(G, {
                key: r.key
              }, [
                !r.auth || a(l)(r.auth) ? (s(), v(a(ut), {
                  key: 0,
                  disabled: r.disabled,
                  onClick: (f) => p(r)
                }, {
                  default: m(() => [
                    K("div", {
                      class: "dropdown-item-content",
                      style: ve({ color: r.color })
                    }, [
                      r.icon ? (s(), v(ge, {
                        key: 0,
                        icon: r.icon
                      }, null, 8, ["icon"])) : C("", !0),
                      K("span", null, U(r.label), 1)
                    ], 4)
                  ]),
                  _: 2
                }, 1032, ["disabled", "onClick"])) : C("", !0)
              ], 64))), 128))
            ]),
            _: 1
          })
        ]),
        default: m(() => [
          M(xa, {
            icon: "ri:more-2-fill",
            class: "more-button"
          })
        ]),
        _: 1
      })) : C("", !0)
    ]));
  }
}), ja = /* @__PURE__ */ Q(Ba, [["__scopeId", "data-v-e5e8e40b"]]), Ea = /* @__PURE__ */ Y({
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
      constructor(R, x, _) {
        super(R), this.code = x, this.details = _, this.name = "ExportError";
      }
      code;
      details;
    }
    const p = V(!1), u = b(() => Array.isArray(t.data) && t.data.length > 0), i = (d) => {
      if (!Array.isArray(d))
        throw new c("数据必须是数组格式", "INVALID_DATA_TYPE");
      if (d.length === 0)
        throw new c("没有可导出的数据", "NO_DATA");
      if (d.length > t.maxRows)
        throw new c(`数据行数超过限制（${t.maxRows}行）`, "EXCEED_MAX_ROWS", {
          currentRows: d.length,
          maxRows: t.maxRows
        });
    }, r = (d, R, x, _) => {
      const L = t.columns[R];
      return L?.formatter ? L.formatter(d, x, _) : d == null ? "" : d instanceof Date ? d.toLocaleDateString("zh-CN") : typeof d == "boolean" ? d ? "是" : "否" : String(d);
    }, f = (d) => d.map((x, _) => {
      const L = {};
      return t.autoIndex && (L[t.indexColumnTitle] = String(_ + 1)), Object.entries(x).forEach(([O, w]) => {
        let I = O;
        t.columns[O]?.title ? I = t.columns[O].title : t.headers[O] && (I = t.headers[O]), L[I] = r(w, O, x, _);
      }), L;
    }), h = (d) => {
      if (d.length === 0) return [];
      const R = Math.min(d.length, 100);
      return Object.keys(d[0]).map((_) => {
        const L = Object.values(t.columns).find((I) => I.title === _)?.width;
        if (L)
          return { wch: L };
        const O = Math.max(
          _.length,
          ...d.slice(0, R).map((I) => String(I[_] || "").length)
        );
        return { wch: Math.min(Math.max(O + 2, 8), 50) };
      });
    }, g = async (d, R, x) => {
      try {
        n("export-progress", 10);
        const _ = f(d);
        n("export-progress", 30);
        const L = de.utils.book_new();
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
        const O = de.utils.json_to_sheet(_);
        O["!cols"] = h(_), n("export-progress", 70), de.utils.book_append_sheet(L, O, x), n("export-progress", 85);
        const w = de.write(L, {
          bookType: "xlsx",
          type: "array",
          compression: !0
        }), I = new Blob([w], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        });
        n("export-progress", 95);
        const y = (/* @__PURE__ */ new Date()).toISOString().replace(/[:.]/g, "-"), $ = `${R}_${y}.xlsx`;
        return To.saveAs(I, $), n("export-progress", 100), await pt(), Promise.resolve();
      } catch (_) {
        throw new c(`Excel 导出失败: ${_.message}`, "EXPORT_FAILED", _);
      }
    }, S = xo(async () => {
      if (!p.value) {
        p.value = !0;
        try {
          i(t.data), n("before-export", t.data), await g(t.data, t.filename, t.sheetName), n("export-success", t.filename, t.data.length), t.showSuccessMessage && Ye.success({
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
      exportData: S,
      isExporting: So(p),
      hasData: u
    }), (d, R) => (s(), v(a(fe), {
      type: e.type,
      size: e.size,
      loading: p.value,
      disabled: e.disabled || !u.value,
      onClick: a(S)
    }, {
      loading: m(() => [
        M(a(nt), { class: "is-loading" }, {
          default: m(() => [
            M(a(Co))
          ]),
          _: 1
        }),
        X(" " + U(e.loadingText), 1)
      ]),
      default: m(() => [
        N(d.$slots, "default", {}, () => [
          X(U(e.buttonText), 1)
        ], !0)
      ]),
      _: 3
    }, 8, ["type", "size", "loading", "disabled", "onClick"]));
  }
}), Ka = /* @__PURE__ */ Q(Ea, [["__scopeId", "data-v-eae0b991"]]), Ca = { class: "excel-import" }, _a = /* @__PURE__ */ Y({
  name: "AoExcelImport",
  __name: "AoExcelImport",
  emits: ["import-success", "import-error"],
  setup(e, { emit: o }) {
    async function l(c) {
      return new Promise((p, u) => {
        const i = new FileReader();
        i.onload = (r) => {
          try {
            const f = r.target?.result, h = de.read(f, { type: "array" }), g = h.SheetNames[0], S = h.Sheets[g], d = de.utils.sheet_to_json(S);
            p(d);
          } catch (f) {
            u(f);
          }
        }, i.onerror = (r) => u(r), i.readAsArrayBuffer(c);
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
    return (c, p) => (s(), E("div", Ca, [
      M(a(ho), {
        "auto-upload": !1,
        accept: ".xlsx, .xls",
        "show-file-list": !1,
        onChange: n
      }, {
        default: m(() => [
          M(a(fe), { type: "primary" }, {
            default: m(() => [
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
}), Wa = /* @__PURE__ */ Q(_a, [["__scopeId", "data-v-81d063bb"]]), Aa = { class: "logo-container" }, Ta = ["src"], Oa = /* @__PURE__ */ Y({
  name: "AoLogo",
  __name: "AoLogo",
  props: {
    size: { default: 36 },
    src: {}
  },
  setup(e) {
    const o = e, l = $e(bt, void 0), t = b(() => o.src ?? l), n = b(() => ({ width: `${o.size}px` }));
    return (c, p) => (s(), E("div", Aa, [
      t.value ? (s(), E("img", {
        key: 0,
        style: ve(n.value),
        src: t.value,
        alt: "logo",
        class: "logo-img"
      }, null, 12, Ta)) : C("", !0)
    ]));
  }
}), Ga = /* @__PURE__ */ Q(Oa, [["__scopeId", "data-v-79a50d9f"]]), Za = {
  install(e, o = {}) {
    console.info(`[ao-admin-components] v${Lo}`), o.i18n && (o.i18n.global.mergeLocaleMessage("zh", Ro), o.i18n.global.mergeLocaleMessage("en", Vo)), e.provide(vt, o.getAuthList ?? (() => {
    })), e.provide(gt, o.resolveLocalSvg ?? (() => {
    })), e.provide(bt, o.assets?.logo), e.directive("loading", mo);
  }
};
export {
  vt as AUTH_LIST_KEY,
  Za as AdminComponents,
  ja as AoButtonMore,
  Ua as AoButtonTable,
  Ka as AoExcelExport,
  Wa as AoExcelImport,
  Na as AoForm,
  xa as AoIconButton,
  Ga as AoLogo,
  oa as AoSearchBar,
  ge as AoSvgIcon,
  Da as AoTable,
  da as AoTableHeader,
  ce as AoTableHeaderButton,
  gt as LOCAL_SVG_KEY,
  bt as LOGO_URL_KEY,
  he as TableSizeEnum,
  Z as getColumnKey,
  xe as getColumnVisibility,
  $o as useAuth,
  Fa as useTableColumns,
  Ho as useTableHeight,
  Me as useTableStore,
  Lo as version
};
