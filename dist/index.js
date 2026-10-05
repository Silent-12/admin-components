import { ElTreeSelect as Wt, ElTimeSelect as Gt, ElTimePicker as Zt, ElCascader as Yt, ElSlider as qt, ElRate as Xt, ElDatePicker as ye, ElRadioGroup as Jt, ElCheckboxGroup as Qt, ElCheckbox as se, ElSwitch as eo, ElSelect as to, ElInputNumber as oo, ElInputTag as ao, ElInput as lo, ElForm as et, ElRow as tt, ElCol as Te, ElFormItem as ot, ElOption as at, ElRadio as lt, ElButton as fe, ElIcon as nt, ElTooltip as no, ElDropdown as rt, ElDropdownMenu as st, ElDropdownItem as ut, ElPopover as Ge, ElScrollbar as ro, ElCard as so, ElTable as uo, ElEmpty as io, ElTableColumn as we, ElPagination as co, ElDialog as fo, ElMessage as Ze, ElUpload as po, ElLoadingDirective as ho } from "element-plus";
import { inject as $e, ref as L, computed as b, toRaw as Oe, defineComponent as Y, useTemplateRef as Ve, watch as Pe, toRefs as it, openBlock as s, createElementBlock as E, normalizeClass as J, createVNode as z, unref as a, mergeProps as H, withCtx as m, Fragment as G, renderList as W, createBlock as v, createSlots as le, renderSlot as N, resolveDynamicComponent as ae, createCommentVNode as _, toDisplayString as U, createElementVNode as K, normalizeStyle as ve, createTextVNode as X, useAttrs as ct, useModel as me, onMounted as mo, onUnmounted as vo, isRef as Ce, mergeModels as ne, getCurrentInstance as go, useSlots as dt, watchEffect as bo, resolveDirective as yo, withDirectives as Ye, vShow as wo, normalizeProps as Ie, guardReactiveProps as Re, nextTick as ft, readonly as So } from "vue";
import { defineStore as ko, storeToRefs as pt } from "pinia";
import { useWindowSize as ht, useResizeObserver as qe, useThrottleFn as xo } from "@vueuse/core";
import { ArrowUpBold as Eo, ArrowDownBold as Bo, Loading as _o } from "@element-plus/icons-vue";
import { useI18n as xe } from "vue-i18n";
import { VueDraggable as Co } from "vue-draggable-plus";
import { Icon as Ao } from "@iconify/vue";
import * as de from "xlsx";
import To from "file-saver";
const Oo = { cancel: "取消", confirm: "确定" }, Io = { form: { reset: "重置", submit: "提交" }, searchBar: { reset: "重置", search: "查询", expand: "展开", collapse: "收起" }, selection: "选择", sizeOptions: { small: "紧凑", default: "默认", large: "宽松" }, column: { selection: "勾选", expand: "展开", index: "序号", globalIndex: "全局序号" }, header: { search: "搜索", refresh: "刷新", size: "表格大小", fullscreen: "全屏", columns: "列设置", settings: "其他设置" }, zebra: "斑马纹", border: "边框", headerBackground: "表头背景" }, Ro = {
  common: Oo,
  table: Io
}, zo = { cancel: "Cancel", confirm: "Confirm" }, Mo = { form: { reset: "Reset", submit: "Submit" }, searchBar: { reset: "Reset", search: "Search", expand: "Expand", collapse: "Collapse" }, selection: "Select", sizeOptions: { small: "Compact", default: "Default", large: "Loose" }, column: { selection: "Select", expand: "Expand", index: "Index", globalIndex: "Global Index" }, header: { search: "Search", refresh: "Refresh", size: "Table Size", fullscreen: "Fullscreen", columns: "Column Settings", settings: "Settings" }, zebra: "Zebra", border: "Border", headerBackground: "Header BG" }, Lo = {
  common: zo,
  table: Mo
}, $o = "2", mt = /* @__PURE__ */ Symbol("ao-admin-auth-list"), Vo = () => {
  const e = $e(mt, () => {
  });
  return { hasAuth: (l) => l ? e()?.includes(l) ?? !1 : !1 };
}, vt = /* @__PURE__ */ Symbol("ao-admin-local-svg"), gt = /* @__PURE__ */ Symbol("ao-admin-logo-url");
var he = /* @__PURE__ */ ((e) => (e.DEFAULT = "default", e.SMALL = "small", e.LARGE = "large", e))(he || {});
const ze = ko(
  "tableStore",
  () => {
    const e = L(he.DEFAULT), o = L(!1), l = L(!1), t = L(!1), n = L(!1);
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
class Se {
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
    return o + l + Se.TABLE_HEADER_SPACING;
  }
  /**
   * 获取表格头部高度
   */
  getHeaderHeight() {
    return this.options.tableHeaderHeight.value || Se.DEFAULT_TABLE_HEADER_HEIGHT;
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
    containerHeight: b(() => new Se(e).calculate())
  };
}
const Xe = {
  input: lo,
  // 输入框
  inputtag: ao,
  // 标签输入框
  number: oo,
  // 数字输入框
  select: to,
  // 选择器
  switch: eo,
  // 开关
  checkbox: se,
  // 复选框
  checkboxgroup: Qt,
  // 复选框组
  radiogroup: Jt,
  // 单选框组
  date: ye,
  // 日期选择器
  daterange: ye,
  // 日期范围选择器
  datetime: ye,
  // 日期时间选择器
  datetimerange: ye,
  // 日期时间范围选择器
  rate: Xt,
  // 评分
  slider: qt,
  // 滑块
  cascader: Yt,
  // 级联选择器
  timepicker: Zt,
  // 时间选择器
  timeselect: Gt,
  // 时间选择
  treeselect: Wt
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
}, jo = /^\d+$/, He = (e) => e.split(".").filter(Boolean).map((o) => jo.test(o) ? Number(o) : o), te = (e) => {
  if (!e) return {};
  const o = (l) => {
    if (Array.isArray(l))
      return l.map((t) => o(t));
    if (l && typeof l == "object") {
      const t = Oe(l);
      return Object.keys(t).reduce((n, c) => (n[c] = o(t[c]), n), {});
    }
    return l;
  };
  return o(Oe(e));
}, bt = (e, o) => He(o).reduce((l, t) => {
  if (l != null)
    return l[t];
}, e), Ko = (e, o) => {
  const l = He(o);
  if (!l.length) return;
  const t = l.pop(), n = l.reduce((c, p) => {
    if (c != null)
      return c[p];
  }, e);
  n != null && t !== void 0 && delete n[t];
}, yt = (e, o, l) => {
  const t = l === "" ? void 0 : l;
  if (t === void 0) {
    Ko(e, o);
    return;
  }
  const n = He(o);
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
}, Wo = (e) => /<(img|video|audio|iframe|embed|object)\b/i.test(e) ? !1 : e.replace(/&nbsp;/gi, "").replace(/<br\s*\/?>/gi, "").replace(/<[^>]*>/g, "").trim() === "", Me = (e, o = Ee) => {
  if (Array.isArray(e)) {
    const l = e.map((t) => Me(t, o)).filter((t) => t !== void 0);
    return l.length === 0 && o.removeEmptyArray ? void 0 : l;
  }
  if (e && typeof e == "object") {
    const l = Oe(e), t = Object.entries(l).reduce(
      (n, [c, p]) => {
        const u = Me(p, o);
        return u !== void 0 && (n[c] = u), n;
      },
      {}
    );
    return Object.keys(t).length === 0 && o.removeEmptyObject ? void 0 : t;
  }
  return typeof e == "string" ? o.removeEmptyString && e.trim() === "" || o.removeEmptyRichText && Wo(e) ? void 0 : e : e === 0 ? o.keepZero ? e : void 0 : e === !1 ? o.keepFalse ? e : void 0 : e ?? void 0;
}, Le = (e, o = Ee) => Me(te(e), o) || {}, wt = (e) => e.props ? e.props : Object.fromEntries(
  Object.entries(e).filter(([o]) => !Uo(o, e.type))
), q = (e) => {
  const o = e.props?.options ?? e.options;
  return Array.isArray(o) ? o : [];
}, St = (e) => {
  if (!e.slots) return {};
  const o = {};
  return Object.entries(e.slots).forEach(([l, t]) => {
    t && (o[l] = t);
  }), o;
}, kt = (e) => {
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
function xt(e, o) {
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
    const t = e, n = l, { width: c } = ht(), { t: p } = xe(), u = b(() => c.value < Zo), i = Ve("formRef"), r = L(te(t.modelValue)), f = L(te(t.modelValue));
    let h;
    Pe(
      () => t.modelValue,
      (M) => {
        M !== h && (r.value = te(M), f.value = te(M));
      }
    );
    const g = L(t.defaultExpanded), S = b(() => ({
      ...Ee,
      ...t.sanitizeOutput
    })), d = (M) => bt(r.value, M), I = (M, ee) => {
      yt(r.value, M, ee), h = r.value, n("update:modelValue", r.value);
    }, B = (M, ee) => xt(M ?? A.value, ee), C = b(() => {
      const M = t.items.filter((k) => !k.hidden);
      if (!t.isExpand && !g.value) {
        const k = Math.floor(24 / t.span) - 1;
        return M.slice(0, k);
      }
      return M;
    }), O = b(() => {
      const M = t.items.filter((ee) => !ee.hidden);
      return !t.isExpand && t.showExpand && M.length > Math.floor(24 / t.span) - 1;
    }), R = b(() => g.value ? p("table.searchBar.collapse") : p("table.searchBar.expand")), w = b(() => ({
      "justify-content": Xo(
        u.value,
        t.items.filter((M) => !M.hidden).length,
        t.buttonLeftLimit
      )
    })), $ = () => {
      g.value = !g.value;
    }, y = () => {
      i.value?.resetFields(), Object.keys(r.value).forEach((M) => {
        delete r.value[M];
      }), Object.assign(r.value, te(f.value)), h = r.value, n("update:modelValue", r.value), n("reset");
    }, V = () => {
      n(
        "search",
        Le(r.value, S.value)
      );
    };
    o({
      validate: (...M) => i.value.validate(...M),
      reset: y,
      // 允许外部在手动组装请求前直接读取清洗后的参数。
      getOutput: () => Le(r.value, S.value)
    });
    const { span: A, gutter: D, labelPosition: T, labelWidth: re } = it(t);
    return (M, ee) => (s(), E("section", {
      class: J(["ao-search-bar ao-card-xs", { "is-expanded": g.value }])
    }, [
      z(a(et), H({
        ref: "formRef",
        model: r.value,
        "label-position": a(T)
      }, { ...M.$attrs }), {
        default: m(() => [
          z(a(tt), { gutter: a(D) }, {
            default: m(() => [
              (s(!0), E(G, null, W(C.value, (k) => (s(), v(a(Te), {
                key: k.key,
                xs: B(k.span, "xs"),
                sm: B(k.span, "sm"),
                md: B(k.span, "md"),
                lg: B(k.span, "lg"),
                xl: B(k.span, "xl")
              }, {
                default: m(() => [
                  z(a(ot), {
                    prop: k.key,
                    "label-width": k.label ? k.labelWidth || a(re) : void 0
                  }, le({
                    default: m(() => [
                      N(M.$slots, k.key, {
                        item: k,
                        modelValue: r.value
                      }, () => [
                        (s(), v(ae(a(kt)(k)), H({
                          "model-value": d(k.key),
                          "onUpdate:modelValue": (j) => I(k.key, j)
                        }, { ref_for: !0 }, a(wt)(k)), le({
                          default: m(() => [
                            k.type === "select" && a(q)(k).length ? (s(!0), E(G, { key: 0 }, W(a(q)(k), (j) => (s(), v(a(at), H({ ref_for: !0 }, j, {
                              key: String(j.value)
                            }), null, 16))), 128)) : _("", !0),
                            k.type === "checkboxgroup" && a(q)(k).length ? (s(!0), E(G, { key: 1 }, W(a(q)(k), (j) => (s(), v(a(se), H({ ref_for: !0 }, j, {
                              key: String(j.value)
                            }), null, 16))), 128)) : _("", !0),
                            k.type === "radiogroup" && a(q)(k).length ? (s(!0), E(G, { key: 2 }, W(a(q)(k), (j) => (s(), v(a(lt), H({ ref_for: !0 }, j, {
                              key: String(j.value)
                            }), null, 16))), 128)) : _("", !0)
                          ]),
                          _: 2
                        }, [
                          W(a(St)(k), (j, Be) => ({
                            name: Be,
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
              z(a(Te), {
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
                      e.showReset ? (s(), v(a(fe), {
                        key: 0,
                        class: "reset-button",
                        onClick: y
                      }, {
                        default: m(() => [
                          X(U(a(p)("table.searchBar.reset")), 1)
                        ]),
                        _: 1
                      })) : _("", !0),
                      e.showSearch ? (s(), v(a(fe), {
                        key: 1,
                        type: "primary",
                        class: "search-button",
                        onClick: V,
                        disabled: e.disabledSearch
                      }, {
                        default: m(() => [
                          X(U(a(p)("table.searchBar.search")), 1)
                        ]),
                        _: 1
                      }, 8, ["disabled"])) : _("", !0)
                    ]),
                    O.value ? (s(), E("div", {
                      key: 0,
                      class: "filter-toggle",
                      onClick: $
                    }, [
                      K("span", null, U(R.value), 1),
                      K("div", ea, [
                        z(a(nt), null, {
                          default: m(() => [
                            g.value ? (s(), v(a(Eo), { key: 0 })) : (s(), v(a(Bo), { key: 1 }))
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
}, oa = /* @__PURE__ */ Q(ta, [["__scopeId", "data-v-60568442"]]), aa = ["src"], la = /* @__PURE__ */ Y({
  name: "AoSvgIcon",
  inheritAttrs: !1,
  __name: "AoSvgIcon",
  props: {
    icon: {},
    size: { default: "1em" }
  },
  setup(e) {
    const o = e, l = $e(vt, () => {
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
    }, p.value, { class: "ao-svg-icon" }), null, 16, ["icon"])) : _("", !0);
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
    const l = e, t = o, n = L(), c = b(() => l.loading ? "is-loading-icon" : l.active ? "is-active-icon" : "is-icon"), p = (u) => {
      t("click", u);
    };
    return (u, i) => (s(), E("div", {
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
      e.content ? (s(), v(a(no), {
        key: 0,
        "virtual-ref": n.value,
        "virtual-triggering": "",
        content: e.content,
        placement: "top",
        "show-after": 500
      }, null, 8, ["virtual-ref", "content"])) : _("", !0)
    ], 2));
  }
}), ce = /* @__PURE__ */ Q(na, [["__scopeId", "data-v-8e84760f"]]), oe = {
  selection: "__selection__",
  expand: "__expand__",
  index: "__index__",
  globalIndex: "__globalIndex__"
}, Z = (e) => e.columnKey ?? oe[e.type] ?? e.prop ?? e.slotName ?? "", ke = (e) => e.visible ?? !0, ra = (e, o) => {
  const l = e.type && e.type in oe, t = ke(e);
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
}, Ae = (e, o) => e.map((l) => ra(l, o));
function Fa(e) {
  const { t: o } = xe(), l = b(() => ({
    selection: o("table.column.selection"),
    expand: o("table.column.expand"),
    index: o("table.column.index"),
    globalIndex: o("table.column.globalIndex")
  })), t = L(e()), n = L(
    Ae(t.value, l.value)
  );
  Pe(l, (u) => {
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
    return n.value.filter((i) => ke(i)).map((i) => {
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
        const d = [...S], I = typeof i == "number" && i >= 0 && i <= d.length ? i : d.length;
        return d.splice(I, 0, ...r), d;
      });
      const f = Ae(r, l.value), h = [...n.value], g = typeof i == "number" && i >= 0 && i <= h.length ? i : h.length;
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
        const S = f.findIndex((I) => Z(I) === g);
        if (S < 0) return;
        const d = i ?? !ke(f[S]);
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
      t.value = [...u], n.value = Ae(u, l.value);
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
    const { t: l } = xe(), t = e, n = me(e, "columns"), c = o, p = (A, D) => {
      A.visible = !!D;
    }, u = [
      { value: he.SMALL, label: l("table.sizeOptions.small") },
      { value: he.DEFAULT, label: l("table.sizeOptions.default") },
      { value: he.LARGE, label: l("table.sizeOptions.large") }
    ], i = ze(), { tableSize: r, isZebra: f, isBorder: h, isHeaderBackground: g } = pt(i), S = b(() => t.layout.split(",").map((A) => A.trim())), d = (A) => S.value.includes(A), I = (A) => {
      const D = A.related;
      return !(D && D.classList.contains("fixed-column"));
    }, B = () => {
      c("update:showSearchBar", !t.showSearchBar), c("search");
    }, C = () => {
      R.value = !0, c("refresh");
    }, O = (A) => {
      ze().setTableSize(A);
    }, R = L(!1), w = L(!1), $ = L(""), y = () => {
      const A = document.querySelector(`.${t.fullClass}`);
      A && (w.value = !w.value, w.value ? ($.value = document.body.style.overflow, document.body.style.overflow = "hidden", A.classList.add("el-full-screen"), i.setIsFullScreen(!0)) : (document.body.style.overflow = $.value, A.classList.remove("el-full-screen"), i.setIsFullScreen(!1)));
    }, V = (A) => {
      A.key === "Escape" && w.value && y();
    };
    return mo(() => {
      document.addEventListener("keydown", V);
    }), vo(() => {
      if (document.removeEventListener("keydown", V), w.value) {
        document.body.style.overflow = $.value;
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
          onClick: B
        }, null, 8, ["content", "active"])) : _("", !0),
        d("refresh") ? (s(), v(ce, {
          key: 1,
          icon: "ri:refresh-line",
          content: a(l)("table.header.refresh"),
          loading: e.loading && R.value,
          onClick: C
        }, null, 8, ["content", "loading"])) : _("", !0),
        d("size") ? (s(), v(a(rt), {
          key: 2,
          onCommand: O
        }, {
          dropdown: m(() => [
            z(a(st), null, {
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
            z(ce, {
              icon: "ri:arrow-up-down-fill",
              content: a(l)("table.header.size")
            }, null, 8, ["content"])
          ]),
          _: 1
        })) : _("", !0),
        d("fullscreen") ? (s(), v(ce, {
          key: 3,
          icon: w.value ? "ri:fullscreen-exit-line" : "ri:fullscreen-line",
          content: a(l)("table.header.fullscreen"),
          onClick: y
        }, null, 8, ["icon", "content"])) : _("", !0),
        d("columns") ? (s(), v(a(Ge), {
          key: 4,
          placement: "bottom",
          trigger: "click"
        }, {
          reference: m(() => [
            z(ce, {
              icon: "ri:align-right",
              content: a(l)("table.header.columns")
            }, null, 8, ["content"])
          ]),
          default: m(() => [
            K("div", null, [
              z(a(ro), { "max-height": "380px" }, {
                default: m(() => [
                  z(a(Co), {
                    modelValue: n.value,
                    "onUpdate:modelValue": D[0] || (D[0] = (T) => n.value = T),
                    disabled: !1,
                    filter: ".fixed-column",
                    "prevent-on-filter": !1,
                    onMove: I
                  }, {
                    default: m(() => [
                      (s(!0), E(G, null, W(n.value, (T) => (s(), E("div", {
                        key: T.columnKey || T.prop || T.type,
                        class: J(["column-option", { "fixed-column": T.fixed }])
                      }, [
                        K("div", {
                          class: J(["drag-icon", T.fixed ? "is-fixed" : "is-movable"])
                        }, [
                          z(ge, {
                            icon: T.fixed ? "ri:unpin-line" : "ri:drag-move-2-fill",
                            class: "drag-icon-svg"
                          }, null, 8, ["icon"])
                        ], 2),
                        z(a(se), {
                          "model-value": a(ke)(T),
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
        })) : _("", !0),
        d("settings") ? (s(), v(a(Ge), {
          key: 5,
          placement: "bottom",
          trigger: "click"
        }, {
          reference: m(() => [
            z(ce, {
              icon: "ri:settings-line",
              content: a(l)("table.header.settings")
            }, null, 8, ["content"])
          ]),
          default: m(() => [
            K("div", null, [
              e.showZebra ? (s(), v(a(se), {
                key: 0,
                modelValue: a(f),
                "onUpdate:modelValue": D[1] || (D[1] = (T) => Ce(f) ? f.value = T : null),
                value: !0
              }, {
                default: m(() => [
                  X(U(a(l)("table.zebra")), 1)
                ]),
                _: 1
              }, 8, ["modelValue"])) : _("", !0),
              e.showBorder ? (s(), v(a(se), {
                key: 1,
                modelValue: a(h),
                "onUpdate:modelValue": D[2] || (D[2] = (T) => Ce(h) ? h.value = T : null),
                value: !0
              }, {
                default: m(() => [
                  X(U(a(l)("table.border")), 1)
                ]),
                _: 1
              }, 8, ["modelValue"])) : _("", !0),
              e.showHeaderBackground ? (s(), v(a(se), {
                key: 2,
                modelValue: a(g),
                "onUpdate:modelValue": D[3] || (D[3] = (T) => Ce(g) ? g.value = T : null),
                value: !0
              }, {
                default: m(() => [
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
    const t = e, n = me(e, "searchForm"), c = me(e, "columnChecks"), p = go(), u = ct(), i = dt(), { width: r } = ht(), f = L(null), h = L(), g = L(), S = ze(), { isBorder: d, isZebra: I, tableSize: B, isFullScreen: C, isHeaderBackground: O } = pt(S), R = L(null), w = L(null), $ = {
      MOBILE: "prev, pager, next, sizes, jumper, total",
      IPAD: "prev, pager, next, jumper, total",
      DESKTOP: "total, prev, pager, next, sizes, jumper"
    }, y = b(() => r.value < 768 ? $.MOBILE : r.value < 1024 ? $.IPAD : $.DESKTOP), V = b(() => ({
      background: !0,
      hideOnSinglePage: !1,
      size: "default",
      pagerCount: r.value > 1200 ? 7 : 5,
      layout: y.value,
      ...t.paginationOptions
    })), A = b(() => t.border ?? d.value), D = b(() => t.stripe ?? I.value), T = b(() => t.size ?? B.value), re = b(() => t.data?.length === 0), M = b(() => t.pagination?.currentPage ?? 1), ee = b(() => t.pagination?.pageSize ?? 10), k = b(() => t.pagination?.total ?? 0), j = b(() => (t.searchItems?.length ?? 0) > 0), Be = b(() => !!(i["header-left"] || i["header-right"])), be = b(
      () => t.integrated ?? (j.value || Be.value)
    ), Fe = L(!0), De = b(() => t.showSearchBar ?? Fe.value), Et = b(
      () => j.value ? De.value : void 0
    ), Bt = b(() => be.value && t.showTableHeader), _t = b(() => be.value ? "is-integrated" : "is-bare"), Ct = b(() => be.value ? so : "div"), At = b(() => be.value ? "ao-table-card" : "ao-table-bare"), Ne = L(0), Ue = L(0);
    qe(h, (x) => {
      const F = x[0];
      F && requestAnimationFrame(() => {
        Ne.value = F.contentRect.height;
      });
    }), qe(g, (x) => {
      const F = x[0];
      F && requestAnimationFrame(() => {
        Ue.value = F.contentRect.height;
      });
    });
    const Tt = L(10), { containerHeight: Ot } = Ho({
      showTableHeader: b(() => t.showTableHeader),
      bottomBarHeight: Ne,
      tableHeaderHeight: Ue,
      bottomBarSpacing: Tt
    }), It = b(() => C.value ? "100%" : re.value && !t.loading ? t.emptyHeight : t.height ? t.height : "100%"), Rt = b(() => ({
      background: O.value ? "var(--el-fill-color-lighter)" : "var(--default-box-color)",
      ...t.headerCellStyle || {}
      // 合并用户传入的样式
    })), zt = (x) => {
      const F = p?.vnode.props || {}, pe = x.replace(/[A-Z]/g, (P) => `-${P.toLowerCase()}`);
      return x in F || pe in F;
    }, Mt = [
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
      const x = { ...t };
      return Mt.forEach((F) => {
        delete x[F];
      }), x;
    }), $t = b(() => ({
      ...u,
      ...Lt.value,
      height: It.value,
      stripe: D.value,
      border: A.value,
      size: T.value,
      headerCellStyle: Rt.value,
      // Element Plus 默认值为 true，未显式传入时不应被 AoTable 覆盖成 false。
      selectOnIndeterminate: zt("selectOnIndeterminate") ? t.selectOnIndeterminate : void 0
    })), je = b(() => k.value > 0 && !re.value), Ke = (x) => x.$index === void 0 || x.$index >= 0, Vt = ["slotName", "visible", "disabled"], _e = (x) => {
      const F = { ...x };
      return Vt.forEach((pe) => {
        delete F[pe];
      }), F;
    }, Pt = (x) => {
      ue("size-change", x);
    }, Ht = (x) => {
      ue("current-change", x), We();
    }, Ft = async (x) => {
      if (t.searchRules)
        try {
          await R.value?.validate();
        } catch {
          return;
        }
      ue("search", x);
    }, Dt = () => {
      ue("reset");
    }, Nt = () => {
      ue("refresh");
    }, Ut = (x) => {
      t.showSearchBar === void 0 && (Fe.value = x), ue("update:showSearchBar", x);
    }, jt = Po, We = () => {
      ft(() => {
        f.value?.setScrollTop(0), jt();
      });
    }, Kt = (x) => (M.value - 1) * ee.value + x + 1, ue = l;
    return bo(
      () => {
        g.value = w.value?.$el ?? void 0;
      },
      { flush: "post" }
    ), o({
      scrollToTop: We,
      elTableRef: f
    }), (x, F) => {
      const pe = yo("loading");
      return s(), E("div", {
        class: J(["ao-table-root", _t.value])
      }, [
        j.value ? Ye((s(), v(oa, {
          key: 0,
          ref_key: "searchBarRef",
          ref: R,
          modelValue: n.value,
          "onUpdate:modelValue": F[0] || (F[0] = (P) => n.value = P),
          items: e.searchItems,
          rules: e.searchRules,
          span: e.searchSpan,
          "show-expand": e.searchShowExpand,
          onSearch: Ft,
          onReset: Dt
        }, null, 8, ["modelValue", "items", "rules", "span", "show-expand"])), [
          [wo, De.value]
        ]) : _("", !0),
        (s(), v(ae(Ct.value), {
          class: J(At.value)
        }, {
          default: m(() => [
            Bt.value ? (s(), v(da, {
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
              "onUpdate:showSearchBar": Ut,
              onRefresh: Nt
            }, {
              left: m(() => [
                N(x.$slots, "header-left", {}, void 0, !0)
              ]),
              right: m(() => [
                N(x.$slots, "header-right", {}, void 0, !0)
              ]),
              _: 3
            }, 8, ["columns", "show-search-bar", "show-zebra", "show-border", "show-header-background", "loading"])) : _("", !0),
            K("div", {
              class: J(["ao-table", { "is-empty": re.value }]),
              style: ve(a(Ot))
            }, [
              Ye((s(), v(a(uo), H({
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
                        K("span", null, U(Kt(ie)), 1)
                      ]),
                      _: 1
                    }, 16)) : P.type === "expand" ? (s(), v(a(we), H({
                      key: 1,
                      ref_for: !0
                    }, _e(P)), le({ _: 2 }, [
                      P.slotName ? {
                        name: "default",
                        fn: m((ie) => [
                          N(x.$slots, P.slotName, H({ ref_for: !0 }, ie), void 0, !0)
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
                          Ke(ie) ? N(x.$slots, P.slotName, H({ ref_for: !0 }, ie), void 0, !0, 0) : _("", !0)
                        ]),
                        key: "0"
                      } : void 0
                    ]), 1040))
                  ], 64))), 128)),
                  a(i).default ? N(x.$slots, "default", {}, void 0, !0, 0) : _("", !0),
                  a(i).operation ? (s(), v(a(we), {
                    key: 1,
                    label: "操作",
                    width: 170,
                    fixed: "right",
                    align: "right"
                  }, {
                    default: m((P) => [
                      Ke(P) ? N(x.$slots, "operation", Ie(Re(P)), void 0, !0, 0) : _("", !0)
                    ]),
                    _: 3
                  })) : _("", !0)
                ]),
                empty: m(() => [
                  e.loading ? (s(), E("div", fa)) : (s(), v(a(io), {
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
              class: J(["ao-table-bottom", { "is-bar-empty": !je.value && !x.$slots.footer }]),
              ref_key: "bottomBarRef",
              ref: h
            }, [
              K("div", pa, [
                N(x.$slots, "footer", {}, void 0, !0)
              ]),
              je.value ? (s(), E("div", ha, [
                z(a(co), H(V.value, {
                  total: k.value,
                  disabled: e.loading,
                  "current-page": M.value,
                  "page-size": ee.value,
                  onSizeChange: Pt,
                  onCurrentChange: Ht
                }), null, 16, ["total", "disabled", "current-page", "page-size"])
              ])) : _("", !0)
            ], 2)
          ]),
          _: 3
        }, 8, ["class"]))
      ], 2);
    };
  }
}), Da = /* @__PURE__ */ Q(ma, [["__scopeId", "data-v-559c1dcf"]]), va = { class: "form-section" }, ga = {
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
    const t = e, n = l, c = me(e, "modelValue"), p = Ve("formRef"), u = L({});
    u.value = te(c.value), Pe(c, (w) => {
      u.value = te(w);
    });
    const i = b(() => ({
      ...Ee,
      ...t.sanitizeOutput
    })), r = (w) => bt(c.value, w), f = (w, $) => {
      yt(c.value, w, $);
    }, h = (w, $) => Je(w) ? 24 : xt(qo(w.span, B.value), $), g = b(() => t.items.filter((w) => !w.hidden)), S = () => Le(c.value, i.value);
    o({
      validate: (...w) => p.value.validate(...w),
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
    const { span: B, gutter: C, labelPosition: O, labelWidth: R } = it(t);
    return (w, $) => (s(), E("section", va, [
      z(a(et), H({
        ref: "formRef",
        model: c.value,
        "label-position": a(O)
      }, { ...w.$attrs }), {
        default: m(() => [
          z(a(tt), { gutter: a(C) }, {
            default: m(() => [
              (s(!0), E(G, null, W(g.value, (y) => (s(), v(a(Te), {
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
                    "label-width": y.label ? y.labelWidth || a(R) : void 0
                  }, le({
                    default: m(() => [
                      N(w.$slots, y.key, {
                        item: y,
                        modelValue: c.value
                      }, () => [
                        (s(), v(ae(a(kt)(y)), H({
                          "model-value": r(y.key),
                          "onUpdate:modelValue": (V) => f(y.key, V)
                        }, { ref_for: !0 }, a(wt)(y)), le({
                          default: m(() => [
                            y.type === "select" && a(q)(y).length ? (s(!0), E(G, { key: 0 }, W(a(q)(y), (V) => (s(), v(a(at), H({ ref_for: !0 }, V, {
                              key: String(V.value)
                            }), null, 16))), 128)) : _("", !0),
                            y.type === "checkboxgroup" && a(q)(y).length ? (s(!0), E(G, { key: 1 }, W(a(q)(y), (V) => (s(), v(a(se), H({ ref_for: !0 }, V, {
                              key: String(V.value)
                            }), null, 16))), 128)) : _("", !0),
                            y.type === "radiogroup" && a(q)(y).length ? (s(!0), E(G, { key: 2 }, W(a(q)(y), (V) => (s(), v(a(lt), H({ ref_for: !0 }, V, {
                              key: String(V.value)
                            }), null, 16))), 128)) : _("", !0)
                          ]),
                          _: 2
                        }, [
                          W(a(St)(y), (V, A) => ({
                            name: A,
                            fn: m(() => [
                              (s(), v(ae(V)))
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
}), Qe = /* @__PURE__ */ Q(wa, [["__scopeId", "data-v-701ee2e8"]]), Na = /* @__PURE__ */ Y({
  name: "AoForm",
  inheritAttrs: !1,
  __name: "index",
  props: /* @__PURE__ */ ne({
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
    const t = e, n = l, c = me(e, "modelValue"), { t: p } = xe(), u = dt(), i = Ve("formBodyRef"), r = b(() => t.dialog), f = b(() => ({
      items: t.items,
      span: t.span,
      gutter: t.gutter,
      labelPosition: t.labelPosition,
      labelWidth: t.labelWidth,
      sanitizeOutput: t.sanitizeOutput
    })), h = () => {
      n("reset");
    }, g = (B) => {
      n("submit", B);
    }, S = (B) => {
      n("update:visible", B);
    }, d = () => {
      n("cancel"), S(!1);
    }, I = () => {
      i.value?.submit();
    };
    return o({
      /** 校验表单，透传表单主体的 validate */
      validate: (...B) => i.value.validate(...B),
      /** 重置表单，透传表单主体的 reset */
      reset: () => i.value?.reset(),
      /** 触发提交（含校验），透传表单主体的 submit */
      submit: () => i.value?.submit(),
      /** 读取清洗后的表单输出，透传表单主体的 getOutput */
      getOutput: () => i.value?.getOutput() ?? {}
    }), (B, C) => r.value ? (s(), v(a(fo), {
      key: 0,
      class: "ao-form-dialog",
      "model-value": e.visible,
      title: e.title,
      width: e.width,
      "align-center": e.alignCenter,
      draggable: "",
      overflow: !1,
      "onUpdate:modelValue": S,
      onClosed: C[1] || (C[1] = (O) => n("closed"))
    }, {
      footer: m(() => [
        N(B.$slots, "footer", {}, () => [
          z(a(fe), { onClick: d }, {
            default: m(() => [
              X(U(e.cancelText || a(p)("common.cancel")), 1)
            ]),
            _: 1
          }),
          e.showSubmit ? (s(), v(a(fe), {
            key: 0,
            type: "primary",
            disabled: e.disabledSubmit,
            onClick: I
          }, {
            default: m(() => [
              X(U(e.confirmText || a(p)("common.confirm")), 1)
            ]),
            _: 1
          }, 8, ["disabled"])) : _("", !0)
        ])
      ]),
      default: m(() => [
        z(Qe, H({
          ref_key: "formBodyRef",
          ref: i
        }, { ...f.value, ...B.$attrs }, {
          modelValue: c.value,
          "onUpdate:modelValue": C[0] || (C[0] = (O) => c.value = O),
          onReset: h,
          onSubmit: g
        }), le({ _: 2 }, [
          W(a(u), (O, R) => ({
            name: R,
            fn: m((w) => [
              N(B.$slots, R, Ie(Re(w ?? {})))
            ])
          }))
        ]), 1040, ["modelValue"])
      ]),
      _: 3
    }, 8, ["model-value", "title", "width", "align-center"])) : (s(), v(Qe, H({
      key: 1,
      ref_key: "formBodyRef",
      ref: i
    }, { ...f.value, ...B.$attrs }, {
      modelValue: c.value,
      "onUpdate:modelValue": C[2] || (C[2] = (O) => c.value = O),
      onReset: h,
      onSubmit: g
    }), le({ _: 2 }, [
      W(a(u), (O, R) => ({
        name: R,
        fn: m((w) => [
          N(B.$slots, R, Ie(Re(w ?? {})))
        ])
      }))
    ]), 1040, ["modelValue"]));
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
      z(ge, { icon: c.value }, null, 8, ["icon"])
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
      z(ge, { icon: e.icon }, null, 8, ["icon"]),
      N(o.$slots, "default", {}, void 0, !0)
    ], 2));
  }
}), xa = /* @__PURE__ */ Q(ka, [["__scopeId", "data-v-a298f446"]]), Ea = /* @__PURE__ */ Y({
  name: "AoButtonMore",
  __name: "AoButtonMore",
  props: {
    list: {},
    auth: {}
  },
  emits: ["click"],
  setup(e, { emit: o }) {
    const { hasAuth: l } = Vo(), t = e, n = b(() => t.list.some((u) => !u.auth || l(u.auth))), c = o, p = (u) => {
      c("click", u);
    };
    return (u, i) => (s(), E("div", null, [
      n.value ? (s(), v(a(rt), { key: 0 }, {
        dropdown: m(() => [
          z(a(st), null, {
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
                      }, null, 8, ["icon"])) : _("", !0),
                      K("span", null, U(r.label), 1)
                    ], 4)
                  ]),
                  _: 2
                }, 1032, ["disabled", "onClick"])) : _("", !0)
              ], 64))), 128))
            ]),
            _: 1
          })
        ]),
        default: m(() => [
          z(xa, {
            icon: "ri:more-2-fill",
            class: "more-button"
          })
        ]),
        _: 1
      })) : _("", !0)
    ]));
  }
}), ja = /* @__PURE__ */ Q(Ea, [["__scopeId", "data-v-e5e8e40b"]]), Ba = /* @__PURE__ */ Y({
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
      constructor(I, B, C) {
        super(I), this.code = B, this.details = C, this.name = "ExportError";
      }
      code;
      details;
    }
    const p = L(!1), u = b(() => Array.isArray(t.data) && t.data.length > 0), i = (d) => {
      if (!Array.isArray(d))
        throw new c("数据必须是数组格式", "INVALID_DATA_TYPE");
      if (d.length === 0)
        throw new c("没有可导出的数据", "NO_DATA");
      if (d.length > t.maxRows)
        throw new c(`数据行数超过限制（${t.maxRows}行）`, "EXCEED_MAX_ROWS", {
          currentRows: d.length,
          maxRows: t.maxRows
        });
    }, r = (d, I, B, C) => {
      const O = t.columns[I];
      return O?.formatter ? O.formatter(d, B, C) : d == null ? "" : d instanceof Date ? d.toLocaleDateString("zh-CN") : typeof d == "boolean" ? d ? "是" : "否" : String(d);
    }, f = (d) => d.map((B, C) => {
      const O = {};
      return t.autoIndex && (O[t.indexColumnTitle] = String(C + 1)), Object.entries(B).forEach(([R, w]) => {
        let $ = R;
        t.columns[R]?.title ? $ = t.columns[R].title : t.headers[R] && ($ = t.headers[R]), O[$] = r(w, R, B, C);
      }), O;
    }), h = (d) => {
      if (d.length === 0) return [];
      const I = Math.min(d.length, 100);
      return Object.keys(d[0]).map((C) => {
        const O = Object.values(t.columns).find(($) => $.title === C)?.width;
        if (O)
          return { wch: O };
        const R = Math.max(
          C.length,
          ...d.slice(0, I).map(($) => String($[C] || "").length)
        );
        return { wch: Math.min(Math.max(R + 2, 8), 50) };
      });
    }, g = async (d, I, B) => {
      try {
        n("export-progress", 10);
        const C = f(d);
        n("export-progress", 30);
        const O = de.utils.book_new();
        t.workbookOptions && (O.Props = {
          Title: I,
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
        const R = de.utils.json_to_sheet(C);
        R["!cols"] = h(C), n("export-progress", 70), de.utils.book_append_sheet(O, R, B), n("export-progress", 85);
        const w = de.write(O, {
          bookType: "xlsx",
          type: "array",
          compression: !0
        }), $ = new Blob([w], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        });
        n("export-progress", 95);
        const y = (/* @__PURE__ */ new Date()).toISOString().replace(/[:.]/g, "-"), V = `${I}_${y}.xlsx`;
        return To.saveAs($, V), n("export-progress", 100), await ft(), Promise.resolve();
      } catch (C) {
        throw new c(`Excel 导出失败: ${C.message}`, "EXPORT_FAILED", C);
      }
    }, S = xo(async () => {
      if (!p.value) {
        p.value = !0;
        try {
          i(t.data), n("before-export", t.data), await g(t.data, t.filename, t.sheetName), n("export-success", t.filename, t.data.length), t.showSuccessMessage && Ze.success({
            message: `成功导出 ${t.data.length} 条数据`,
            duration: 3e3
          });
        } catch (d) {
          const I = d instanceof c ? d : new c(`导出失败: ${d.message}`, "UNKNOWN_ERROR", d);
          n("export-error", I), t.showErrorMessage && Ze.error({
            message: I.message,
            duration: 5e3
          }), console.error("Excel 导出错误:", I);
        } finally {
          p.value = !1, n("export-progress", 0);
        }
      }
    }, 1e3);
    return o({
      exportData: S,
      isExporting: So(p),
      hasData: u
    }), (d, I) => (s(), v(a(fe), {
      type: e.type,
      size: e.size,
      loading: p.value,
      disabled: e.disabled || !u.value,
      onClick: a(S)
    }, {
      loading: m(() => [
        z(a(nt), { class: "is-loading" }, {
          default: m(() => [
            z(a(_o))
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
}), Ka = /* @__PURE__ */ Q(Ba, [["__scopeId", "data-v-eae0b991"]]), _a = { class: "excel-import" }, Ca = /* @__PURE__ */ Y({
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
    return (c, p) => (s(), E("div", _a, [
      z(a(po), {
        "auto-upload": !1,
        accept: ".xlsx, .xls",
        "show-file-list": !1,
        onChange: n
      }, {
        default: m(() => [
          z(a(fe), { type: "primary" }, {
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
}), Wa = /* @__PURE__ */ Q(Ca, [["__scopeId", "data-v-81d063bb"]]), Aa = { class: "logo-container" }, Ta = ["src"], Oa = /* @__PURE__ */ Y({
  name: "AoLogo",
  __name: "AoLogo",
  props: {
    size: { default: 36 },
    src: {}
  },
  setup(e) {
    const o = e, l = $e(gt, void 0), t = b(() => o.src ?? l), n = b(() => ({ width: `${o.size}px` }));
    return (c, p) => (s(), E("div", Aa, [
      t.value ? (s(), E("img", {
        key: 0,
        style: ve(n.value),
        src: t.value,
        alt: "logo",
        class: "logo-img"
      }, null, 12, Ta)) : _("", !0)
    ]));
  }
}), Ga = /* @__PURE__ */ Q(Oa, [["__scopeId", "data-v-79a50d9f"]]), Za = {
  install(e, o = {}) {
    console.info(`[ao-admin-components] v${$o}`), o.i18n && (o.i18n.global.mergeLocaleMessage("zh", Ro), o.i18n.global.mergeLocaleMessage("en", Lo)), e.provide(mt, o.getAuthList ?? (() => {
    })), e.provide(vt, o.resolveLocalSvg ?? (() => {
    })), e.provide(gt, o.assets?.logo), e.directive("loading", ho);
  }
};
export {
  mt as AUTH_LIST_KEY,
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
  vt as LOCAL_SVG_KEY,
  gt as LOGO_URL_KEY,
  he as TableSizeEnum,
  Z as getColumnKey,
  ke as getColumnVisibility,
  Vo as useAuth,
  Fa as useTableColumns,
  Ho as useTableHeight,
  ze as useTableStore,
  $o as version
};
