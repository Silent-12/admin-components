import { ElTreeSelect as Wt, ElTimeSelect as Zt, ElTimePicker as Gt, ElCascader as Yt, ElSlider as qt, ElRate as Xt, ElDatePicker as ye, ElRadioGroup as Jt, ElCheckboxGroup as Qt, ElCheckbox as re, ElSwitch as eo, ElSelect as to, ElInputNumber as oo, ElInputTag as ao, ElInput as lo, ElForm as Qe, ElRow as et, ElCol as Ce, ElFormItem as tt, ElOption as ot, ElRadio as at, ElButton as fe, ElIcon as lt, ElTooltip as no, ElDropdown as nt, ElDropdownMenu as rt, ElDropdownItem as st, ElPopover as Ke, ElScrollbar as ro, ElCard as so, ElTable as uo, ElEmpty as io, ElTableColumn as we, ElPagination as co, ElDialog as fo, ElMessage as We, ElUpload as po, ElLoadingDirective as ho } from "element-plus";
import { inject as Me, ref as z, computed as v, toRaw as Ae, defineComponent as G, useTemplateRef as Ve, watch as $e, toRefs as ut, openBlock as n, createElementBlock as S, normalizeClass as X, createVNode as R, unref as a, mergeProps as P, withCtx as p, Fragment as Z, renderList as W, createBlock as h, createSlots as ae, renderSlot as N, resolveDynamicComponent as oe, createCommentVNode as _, toDisplayString as U, createElementVNode as K, normalizeStyle as ve, createTextVNode as q, useAttrs as it, useModel as me, onMounted as mo, onUnmounted as vo, isRef as _e, mergeModels as le, getCurrentInstance as go, useSlots as ct, watchEffect as bo, resolveDirective as yo, withDirectives as Ze, vShow as wo, normalizeProps as Te, guardReactiveProps as Oe, nextTick as dt, readonly as ko } from "vue";
import { defineStore as So, storeToRefs as ft } from "pinia";
import { useWindowSize as pt, useResizeObserver as Ge, useThrottleFn as xo } from "@vueuse/core";
import { ArrowUpBold as Bo, ArrowDownBold as Eo, Loading as _o } from "@element-plus/icons-vue";
import { useI18n as Se } from "vue-i18n";
import { VueDraggable as Co } from "vue-draggable-plus";
import { Icon as Ao } from "@iconify/vue";
import * as ce from "xlsx";
import To from "file-saver";
const Oo = { cancel: "取消", confirm: "确定" }, Ro = { form: { reset: "重置", submit: "提交" }, searchBar: { reset: "重置", search: "查询", expand: "展开", collapse: "收起" }, selection: "选择", sizeOptions: { small: "紧凑", default: "默认", large: "宽松" }, column: { selection: "勾选", expand: "展开", index: "序号" }, header: { search: "搜索", refresh: "刷新", size: "表格大小", fullscreen: "全屏", columns: "列设置", settings: "其他设置" }, zebra: "斑马纹", border: "边框", headerBackground: "表头背景" }, Io = {
  common: Oo,
  table: Ro
}, zo = { cancel: "Cancel", confirm: "Confirm" }, Mo = { form: { reset: "Reset", submit: "Submit" }, searchBar: { reset: "Reset", search: "Search", expand: "Expand", collapse: "Collapse" }, selection: "Select", sizeOptions: { small: "Compact", default: "Default", large: "Loose" }, column: { selection: "Select", expand: "Expand", index: "Index" }, header: { search: "Search", refresh: "Refresh", size: "Table Size", fullscreen: "Fullscreen", columns: "Column Settings", settings: "Settings" }, zebra: "Zebra", border: "Border", headerBackground: "Header BG" }, Vo = {
  common: zo,
  table: Mo
}, $o = "2", ht = /* @__PURE__ */ Symbol("ao-admin-auth-list"), Lo = () => {
  const e = Me(ht, () => {
  });
  return { hasAuth: (l) => l ? e()?.includes(l) ?? !1 : !1 };
}, mt = /* @__PURE__ */ Symbol("ao-admin-local-svg"), vt = /* @__PURE__ */ Symbol("ao-admin-logo-url");
var he = /* @__PURE__ */ ((e) => (e.DEFAULT = "default", e.SMALL = "small", e.LARGE = "large", e))(he || {});
const Re = So(
  "tableStore",
  () => {
    const e = z(he.DEFAULT), o = z(!1), l = z(!1), t = z(!1), r = z(!1);
    return {
      tableSize: e,
      isZebra: o,
      isBorder: l,
      isHeaderBackground: t,
      setTableSize: (d) => e.value = d,
      setIsZebra: (d) => o.value = d,
      setIsBorder: (d) => l.value = d,
      setIsHeaderBackground: (d) => t.value = d,
      isFullScreen: r,
      setIsFullScreen: (d) => r.value = d
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
    containerHeight: v(() => new ke(e).calculate())
  };
}
const Ye = {
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
  checkbox: re,
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
  timepicker: Gt,
  // 时间选择器
  timeselect: Zt,
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
], Do = ["select", "checkboxgroup", "radiogroup"], No = "title", qe = (e) => e.type === No, Uo = (e, o) => Fo.includes(e) ? e === "options" ? Do.includes(o ?? "") : !0 : !1, xe = {
  removeEmptyString: !0,
  removeEmptyArray: !0,
  removeEmptyObject: !0,
  removeEmptyRichText: !0,
  keepZero: !0,
  keepFalse: !0
}, jo = /^\d+$/, Le = (e) => e.split(".").filter(Boolean).map((o) => jo.test(o) ? Number(o) : o), te = (e) => {
  if (!e) return {};
  const o = (l) => {
    if (Array.isArray(l))
      return l.map((t) => o(t));
    if (l && typeof l == "object") {
      const t = Ae(l);
      return Object.keys(t).reduce((r, i) => (r[i] = o(t[i]), r), {});
    }
    return l;
  };
  return o(Ae(e));
}, gt = (e, o) => Le(o).reduce((l, t) => {
  if (l != null)
    return l[t];
}, e), Ko = (e, o) => {
  const l = Le(o);
  if (!l.length) return;
  const t = l.pop(), r = l.reduce((i, f) => {
    if (i != null)
      return i[f];
  }, e);
  r != null && t !== void 0 && delete r[t];
}, bt = (e, o, l) => {
  const t = l === "" ? void 0 : l;
  if (t === void 0) {
    Ko(e, o);
    return;
  }
  const r = Le(o);
  if (!r.length) return;
  let i = e;
  r.forEach((f, s) => {
    if (s === r.length - 1) {
      i[f] = t;
      return;
    }
    const d = typeof r[s + 1] == "number" ? [] : {};
    (i[f] === null || i[f] === void 0 || typeof i[f] != "object") && (i[f] = d), i = i[f];
  });
}, Wo = (e) => /<(img|video|audio|iframe|embed|object)\b/i.test(e) ? !1 : e.replace(/&nbsp;/gi, "").replace(/<br\s*\/?>/gi, "").replace(/<[^>]*>/g, "").trim() === "", Ie = (e, o = xe) => {
  if (Array.isArray(e)) {
    const l = e.map((t) => Ie(t, o)).filter((t) => t !== void 0);
    return l.length === 0 && o.removeEmptyArray ? void 0 : l;
  }
  if (e && typeof e == "object") {
    const l = Ae(e), t = Object.entries(l).reduce(
      (r, [i, f]) => {
        const s = Ie(f, o);
        return s !== void 0 && (r[i] = s), r;
      },
      {}
    );
    return Object.keys(t).length === 0 && o.removeEmptyObject ? void 0 : t;
  }
  return typeof e == "string" ? o.removeEmptyString && e.trim() === "" || o.removeEmptyRichText && Wo(e) ? void 0 : e : e === 0 ? o.keepZero ? e : void 0 : e === !1 ? o.keepFalse ? e : void 0 : e ?? void 0;
}, ze = (e, o = xe) => Ie(te(e), o) || {}, yt = (e) => e.props ? e.props : Object.fromEntries(
  Object.entries(e).filter(([o]) => !Uo(o, e.type))
), Y = (e) => {
  const o = e.props?.options ?? e.options;
  return Array.isArray(o) ? o : [];
}, wt = (e) => {
  if (!e.slots) return {};
  const o = {};
  return Object.entries(e.slots).forEach(([l, t]) => {
    t && (o[l] = t);
  }), o;
}, kt = (e) => {
  if (e.render)
    return e.render;
  const o = e.type ? Ye[e.type] : void 0;
  return o || Ye.input;
}, Zo = {
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
function St(e, o) {
  const l = Zo[o];
  return l ? e >= l.threshold ? e : l.fallback : e;
}
const Go = 500, Yo = 2, qo = (e, o) => {
  const l = o && o > 0 ? o : 24, t = (e ?? l / Yo) / l * 24;
  return Math.min(24, Math.max(1, Math.round(t)));
}, Xo = (e, o, l) => e ? "flex-end" : o <= (l ?? 2) ? "flex-start" : "flex-end", Jo = { key: 1 }, Qo = { class: "form-buttons" }, ea = { class: "icon-wrapper" }, ta = /* @__PURE__ */ G({
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
    const t = e, r = l, { width: i } = pt(), { t: f } = Se(), s = v(() => i.value < Go), c = Ve("formRef"), u = z(te(t.modelValue)), d = z(te(t.modelValue));
    let g;
    $e(
      () => t.modelValue,
      (I) => {
        I !== g && (u.value = te(I), d.value = te(I));
      }
    );
    const B = z(t.defaultExpanded), H = v(() => ({
      ...xe,
      ...t.sanitizeOutput
    })), m = (I) => gt(u.value, I), V = (I, Q) => {
      bt(u.value, I, Q), g = u.value, r("update:modelValue", u.value);
    }, x = (I, Q) => St(I ?? A.value, Q), C = v(() => {
      const I = t.items.filter((w) => !w.hidden);
      if (!t.isExpand && !B.value) {
        const w = Math.floor(24 / t.span) - 1;
        return I.slice(0, w);
      }
      return I;
    }), T = v(() => {
      const I = t.items.filter((Q) => !Q.hidden);
      return !t.isExpand && t.showExpand && I.length > Math.floor(24 / t.span) - 1;
    }), O = v(() => B.value ? f("table.searchBar.collapse") : f("table.searchBar.expand")), y = v(() => ({
      "justify-content": Xo(
        s.value,
        t.items.filter((I) => !I.hidden).length,
        t.buttonLeftLimit
      )
    })), M = () => {
      B.value = !B.value;
    }, b = () => {
      c.value?.resetFields(), Object.keys(u.value).forEach((I) => {
        delete u.value[I];
      }), Object.assign(u.value, te(d.value)), g = u.value, r("update:modelValue", u.value), r("reset");
    }, $ = () => {
      r(
        "search",
        ze(u.value, H.value)
      );
    };
    o({
      validate: (...I) => c.value.validate(...I),
      reset: b,
      // 允许外部在手动组装请求前直接读取清洗后的参数。
      getOutput: () => ze(u.value, H.value)
    });
    const { span: A, gutter: D, labelPosition: E, labelWidth: ne } = ut(t);
    return (I, Q) => (n(), S("section", {
      class: X(["ao-search-bar ao-card-xs", { "is-expanded": B.value }])
    }, [
      R(a(Qe), P({
        ref: "formRef",
        model: u.value,
        "label-position": a(E)
      }, { ...I.$attrs }), {
        default: p(() => [
          R(a(et), { gutter: a(D) }, {
            default: p(() => [
              (n(!0), S(Z, null, W(C.value, (w) => (n(), h(a(Ce), {
                key: w.key,
                xs: x(w.span, "xs"),
                sm: x(w.span, "sm"),
                md: x(w.span, "md"),
                lg: x(w.span, "lg"),
                xl: x(w.span, "xl")
              }, {
                default: p(() => [
                  R(a(tt), {
                    prop: w.key,
                    "label-width": w.label ? w.labelWidth || a(ne) : void 0
                  }, ae({
                    default: p(() => [
                      N(I.$slots, w.key, {
                        item: w,
                        modelValue: u.value
                      }, () => [
                        (n(), h(oe(a(kt)(w)), P({
                          "model-value": m(w.key),
                          "onUpdate:modelValue": (j) => V(w.key, j)
                        }, { ref_for: !0 }, a(yt)(w)), ae({
                          default: p(() => [
                            w.type === "select" && a(Y)(w).length ? (n(!0), S(Z, { key: 0 }, W(a(Y)(w), (j) => (n(), h(a(ot), P({ ref_for: !0 }, j, {
                              key: String(j.value)
                            }), null, 16))), 128)) : _("", !0),
                            w.type === "checkboxgroup" && a(Y)(w).length ? (n(!0), S(Z, { key: 1 }, W(a(Y)(w), (j) => (n(), h(a(re), P({ ref_for: !0 }, j, {
                              key: String(j.value)
                            }), null, 16))), 128)) : _("", !0),
                            w.type === "radiogroup" && a(Y)(w).length ? (n(!0), S(Z, { key: 2 }, W(a(Y)(w), (j) => (n(), h(a(at), P({ ref_for: !0 }, j, {
                              key: String(j.value)
                            }), null, 16))), 128)) : _("", !0)
                          ]),
                          _: 2
                        }, [
                          W(a(wt)(w), (j, Be) => ({
                            name: Be,
                            fn: p(() => [
                              (n(), h(oe(j)))
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
                        typeof w.label != "string" ? (n(), h(oe(w.label), { key: 0 })) : (n(), S("span", Jo, U(w.label), 1))
                      ]),
                      key: "0"
                    } : void 0
                  ]), 1032, ["prop", "label-width"])
                ]),
                _: 2
              }, 1032, ["xs", "sm", "md", "lg", "xl"]))), 128)),
              R(a(Ce), {
                xs: 24,
                sm: 24,
                md: a(A),
                lg: a(A),
                xl: a(A),
                class: "action-column"
              }, {
                default: p(() => [
                  K("div", {
                    class: "action-buttons-wrapper",
                    style: ve(y.value)
                  }, [
                    K("div", Qo, [
                      e.showReset ? (n(), h(a(fe), {
                        key: 0,
                        class: "reset-button",
                        onClick: b
                      }, {
                        default: p(() => [
                          q(U(a(f)("table.searchBar.reset")), 1)
                        ]),
                        _: 1
                      })) : _("", !0),
                      e.showSearch ? (n(), h(a(fe), {
                        key: 1,
                        type: "primary",
                        class: "search-button",
                        onClick: $,
                        disabled: e.disabledSearch
                      }, {
                        default: p(() => [
                          q(U(a(f)("table.searchBar.search")), 1)
                        ]),
                        _: 1
                      }, 8, ["disabled"])) : _("", !0)
                    ]),
                    T.value ? (n(), S("div", {
                      key: 0,
                      class: "filter-toggle",
                      onClick: M
                    }, [
                      K("span", null, U(O.value), 1),
                      K("div", ea, [
                        R(a(lt), null, {
                          default: p(() => [
                            B.value ? (n(), h(a(Bo), { key: 0 })) : (n(), h(a(Eo), { key: 1 }))
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
}), J = (e, o) => {
  const l = e.__vccOpts || e;
  for (const [t, r] of o)
    l[t] = r;
  return l;
}, oa = /* @__PURE__ */ J(ta, [["__scopeId", "data-v-7d216e4e"]]), aa = ["src"], la = /* @__PURE__ */ G({
  name: "AoSvgIcon",
  inheritAttrs: !1,
  __name: "AoSvgIcon",
  props: {
    icon: {},
    size: { default: "1em" }
  },
  setup(e) {
    const o = e, l = Me(mt, () => {
    });
    function t(s) {
      if (!(!s || s.includes(":")))
        return l(s);
    }
    const r = it(), i = v(() => t(o.icon)), f = v(() => ({
      class: r.class || "",
      style: [r.style, { width: o.size, height: o.size }]
    }));
    return (s, c) => i.value ? (n(), S("img", P({
      key: 0,
      src: i.value
    }, f.value, {
      class: "ao-svg-icon",
      alt: ""
    }), null, 16, aa)) : o.icon ? (n(), h(a(Ao), P({
      key: 1,
      icon: o.icon
    }, f.value, { class: "ao-svg-icon" }), null, 16, ["icon"])) : _("", !0);
  }
}), ge = /* @__PURE__ */ J(la, [["__scopeId", "data-v-7d6b14ad"]]), na = /* @__PURE__ */ G({
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
    const l = e, t = o, r = z(), i = v(() => l.loading ? "is-loading-icon" : l.active ? "is-active-icon" : "is-icon"), f = (s) => {
      t("click", s);
    };
    return (s, c) => (n(), S("div", {
      ref_key: "triggerRef",
      ref: r,
      class: X(["button", { "is-active": e.active }]),
      onClick: f
    }, [
      R(ge, {
        icon: e.icon,
        size: "1rem",
        class: X(i.value)
      }, null, 8, ["icon", "class"]),
      e.content ? (n(), h(a(no), {
        key: 0,
        "virtual-ref": r.value,
        "virtual-triggering": "",
        content: e.content,
        placement: "top",
        "show-after": 500
      }, null, 8, ["virtual-ref", "content"])) : _("", !0)
    ], 2));
  }
}), ie = /* @__PURE__ */ J(na, [["__scopeId", "data-v-8e84760f"]]), xt = {
  selection: "__selection__",
  expand: "__expand__",
  index: "__index__"
}, ee = (e) => e.columnKey ?? xt[e.type] ?? e.prop, de = (e) => e.visible !== void 0 ? e.visible : e.checked ?? !0, Xe = (e, o) => e.map((l) => {
  const t = l.type ? xt[l.type] : void 0, r = de(l);
  return t ? {
    ...l,
    prop: t,
    label: o[l.type],
    checked: !0,
    visible: !0
  } : { ...l, checked: r, visible: r };
});
function Ha(e) {
  const { t: o } = Se(), l = v(() => ({
    selection: o("table.column.selection"),
    expand: o("table.column.expand"),
    index: o("table.column.index")
  })), t = z(e()), r = z(
    Xe(t.value, l.value)
  );
  $e(
    t,
    (s) => {
      const c = new Map(
        r.value.map((u) => [ee(u), de(u)])
      );
      r.value = Xe(s, l.value).map((u) => {
        const d = ee(u), g = c.has(d) ? c.get(d) : de(u);
        return { ...u, checked: g, visible: g };
      });
    },
    { deep: !0 }
  );
  const i = v(() => {
    const s = new Map(t.value.map((c) => [ee(c), c]));
    return r.value.filter((c) => de(c)).map((c) => s.get(ee(c))).filter(Boolean);
  }), f = (s) => {
    const c = [...t.value], u = s(c);
    t.value = Array.isArray(u) ? u : c;
  };
  return {
    columns: i,
    columnChecks: r,
    /**
     * @description 新增列（支持单个或批量）
     * @param column 列配置或列配置数组
     * @param index 可选的插入位置，越界时追加到末尾
     */
    addColumn: (s, c) => f((u) => {
      const d = [...u], g = Array.isArray(s) ? s : [s], B = typeof c == "number" && c >= 0 && c <= d.length ? c : d.length;
      return d.splice(B, 0, ...g), d;
    }),
    /**
     * @description 删除列（支持单个或批量）
     * @param prop 列的唯一标识或标识数组
     */
    removeColumn: (s) => f((c) => {
      const u = Array.isArray(s) ? s : [s];
      return c.filter((d) => !u.includes(ee(d)));
    }),
    /**
     * @description 更新列（支持单个或批量）
     * @param prop 列的唯一标识或更新配置数组
     * @param updates 列配置更新，prop 为字符串时使用
     */
    updateColumn: (s, c) => {
      if (Array.isArray(s)) {
        f((u) => {
          const d = new Map(s.map((g) => [g.prop, g.updates]));
          return u.map((g) => {
            const B = d.get(ee(g));
            return B ? { ...g, ...B } : g;
          });
        });
        return;
      }
      c && f(
        (u) => u.map((d) => ee(d) === s ? { ...d, ...c } : d)
      );
    },
    /**
     * @description 切换列显示状态（支持单个或批量），同步 checked 与 visible 以保持兼容
     * @param prop 列的唯一标识或标识数组
     * @param visible 可选的显示状态，未传时取反
     */
    toggleColumn: (s, c) => {
      const u = Array.isArray(s) ? s : [s], d = [...r.value];
      u.forEach((g) => {
        const B = d.findIndex((m) => ee(m) === g);
        if (B < 0) return;
        const H = c ?? !de(d[B]);
        d[B] = { ...d[B], checked: H, visible: H };
      }), r.value = d;
    },
    /** @description 重置所有列到初始配置 */
    resetColumns: () => {
      t.value = e();
    },
    /**
     * @description 批量更新列
     * @param updates 列更新配置
     * @deprecated 推荐使用 updateColumn 的数组模式
     */
    batchUpdateColumns: (s) => f((c) => {
      const u = new Map(s.map((d) => [d.prop, d.updates]));
      return c.map((d) => {
        const g = u.get(ee(d));
        return g ? { ...d, ...g } : d;
      });
    }),
    /**
     * @description 重新排序列，索引越界或原地移动时保持原顺序
     * @param fromIndex 源索引
     * @param toIndex 目标索引
     */
    reorderColumns: (s, c) => f((u) => {
      if (s < 0 || s >= u.length || c < 0 || c >= u.length || s === c)
        return u;
      const d = [...u], [g] = d.splice(s, 1);
      return d.splice(c, 0, g), d;
    }),
    /**
     * @description 获取指定列的配置
     * @param prop 列的唯一标识
     * @return 列配置，未找到时返回 undefined
     */
    getColumnConfig: (s) => t.value.find((c) => ee(c) === s),
    /**
     * @description 获取所有列配置的副本
     * @return 所有列配置
     */
    getAllColumns: () => [...t.value]
  };
}
const ra = { class: "table-header-root" }, sa = { class: "left-wrap" }, ua = { class: "right-wrap" }, ia = /* @__PURE__ */ G({
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
    const { t: l } = Se(), t = e, r = me(e, "columns"), i = o, f = (A, D) => {
      const E = !!D;
      A.checked = E, A.visible = E;
    }, s = [
      { value: he.SMALL, label: l("table.sizeOptions.small") },
      { value: he.DEFAULT, label: l("table.sizeOptions.default") },
      { value: he.LARGE, label: l("table.sizeOptions.large") }
    ], c = Re(), { tableSize: u, isZebra: d, isBorder: g, isHeaderBackground: B } = ft(c), H = v(() => t.layout.split(",").map((A) => A.trim())), m = (A) => H.value.includes(A), V = (A) => {
      const D = A.related;
      return !(D && D.classList.contains("fixed-column"));
    }, x = () => {
      i("update:showSearchBar", !t.showSearchBar), i("search");
    }, C = () => {
      O.value = !0, i("refresh");
    }, T = (A) => {
      Re().setTableSize(A);
    }, O = z(!1), y = z(!1), M = z(""), b = () => {
      const A = document.querySelector(`.${t.fullClass}`);
      A && (y.value = !y.value, y.value ? (M.value = document.body.style.overflow, document.body.style.overflow = "hidden", A.classList.add("el-full-screen"), c.setIsFullScreen(!0)) : (document.body.style.overflow = M.value, A.classList.remove("el-full-screen"), c.setIsFullScreen(!1)));
    }, $ = (A) => {
      A.key === "Escape" && y.value && b();
    };
    return mo(() => {
      document.addEventListener("keydown", $);
    }), vo(() => {
      if (document.removeEventListener("keydown", $), y.value) {
        document.body.style.overflow = M.value;
        const A = document.querySelector(`.${t.fullClass}`);
        A && A.classList.remove("el-full-screen");
      }
    }), (A, D) => (n(), S("div", ra, [
      K("div", sa, [
        N(A.$slots, "left", {}, void 0, !0)
      ]),
      K("div", ua, [
        N(A.$slots, "right", {}, void 0, !0),
        e.showSearchBar != null ? (n(), h(ie, {
          key: 0,
          icon: "ri:search-line",
          content: a(l)("table.header.search"),
          active: e.showSearchBar,
          onClick: x
        }, null, 8, ["content", "active"])) : _("", !0),
        m("refresh") ? (n(), h(ie, {
          key: 1,
          icon: "ri:refresh-line",
          content: a(l)("table.header.refresh"),
          loading: e.loading && O.value,
          onClick: C
        }, null, 8, ["content", "loading"])) : _("", !0),
        m("size") ? (n(), h(a(nt), {
          key: 2,
          onCommand: T
        }, {
          dropdown: p(() => [
            R(a(rt), null, {
              default: p(() => [
                (n(), S(Z, null, W(s, (E) => K("div", {
                  key: E.value,
                  class: X(["table-size-btn-item", { "is-current-size": a(u) === E.value }])
                }, [
                  (n(), h(a(st), {
                    key: E.value,
                    command: E.value
                  }, {
                    default: p(() => [
                      q(U(E.label), 1)
                    ]),
                    _: 2
                  }, 1032, ["command"]))
                ], 2)), 64))
              ]),
              _: 1
            })
          ]),
          default: p(() => [
            R(ie, {
              icon: "ri:arrow-up-down-fill",
              content: a(l)("table.header.size")
            }, null, 8, ["content"])
          ]),
          _: 1
        })) : _("", !0),
        m("fullscreen") ? (n(), h(ie, {
          key: 3,
          icon: y.value ? "ri:fullscreen-exit-line" : "ri:fullscreen-line",
          content: a(l)("table.header.fullscreen"),
          onClick: b
        }, null, 8, ["icon", "content"])) : _("", !0),
        m("columns") ? (n(), h(a(Ke), {
          key: 4,
          placement: "bottom",
          trigger: "click"
        }, {
          reference: p(() => [
            R(ie, {
              icon: "ri:align-right",
              content: a(l)("table.header.columns")
            }, null, 8, ["content"])
          ]),
          default: p(() => [
            K("div", null, [
              R(a(ro), { "max-height": "380px" }, {
                default: p(() => [
                  R(a(Co), {
                    modelValue: r.value,
                    "onUpdate:modelValue": D[0] || (D[0] = (E) => r.value = E),
                    disabled: !1,
                    filter: ".fixed-column",
                    "prevent-on-filter": !1,
                    onMove: V
                  }, {
                    default: p(() => [
                      (n(!0), S(Z, null, W(r.value, (E) => (n(), S("div", {
                        key: E.columnKey || E.prop || E.type,
                        class: X(["column-option", { "fixed-column": E.fixed }])
                      }, [
                        K("div", {
                          class: X(["drag-icon", E.fixed ? "is-fixed" : "is-movable"])
                        }, [
                          R(ge, {
                            icon: E.fixed ? "ri:unpin-line" : "ri:drag-move-2-fill",
                            class: "drag-icon-svg"
                          }, null, 8, ["icon"])
                        ], 2),
                        R(a(re), {
                          "model-value": a(de)(E),
                          "onUpdate:modelValue": (ne) => f(E, ne),
                          disabled: E.disabled,
                          class: "column-checkbox"
                        }, {
                          default: p(() => [
                            q(U(E.label || (E.type === "selection" ? a(l)("table.selection") : "")), 1)
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
        m("settings") ? (n(), h(a(Ke), {
          key: 5,
          placement: "bottom",
          trigger: "click"
        }, {
          reference: p(() => [
            R(ie, {
              icon: "ri:settings-line",
              content: a(l)("table.header.settings")
            }, null, 8, ["content"])
          ]),
          default: p(() => [
            K("div", null, [
              e.showZebra ? (n(), h(a(re), {
                key: 0,
                modelValue: a(d),
                "onUpdate:modelValue": D[1] || (D[1] = (E) => _e(d) ? d.value = E : null),
                value: !0
              }, {
                default: p(() => [
                  q(U(a(l)("table.zebra")), 1)
                ]),
                _: 1
              }, 8, ["modelValue"])) : _("", !0),
              e.showBorder ? (n(), h(a(re), {
                key: 1,
                modelValue: a(g),
                "onUpdate:modelValue": D[2] || (D[2] = (E) => _e(g) ? g.value = E : null),
                value: !0
              }, {
                default: p(() => [
                  q(U(a(l)("table.border")), 1)
                ]),
                _: 1
              }, 8, ["modelValue"])) : _("", !0),
              e.showHeaderBackground ? (n(), h(a(re), {
                key: 2,
                modelValue: a(B),
                "onUpdate:modelValue": D[3] || (D[3] = (E) => _e(B) ? B.value = E : null),
                value: !0
              }, {
                default: p(() => [
                  q(U(a(l)("table.headerBackground")), 1)
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
}), ca = /* @__PURE__ */ J(ia, [["__scopeId", "data-v-4eee94ac"]]), da = { key: 0 }, fa = { class: "ao-table-bottom__left" }, pa = {
  key: 0,
  class: "pagination custom-pagination"
}, ha = /* @__PURE__ */ G({
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
    const t = e, r = me(e, "searchForm"), i = me(e, "columnChecks"), f = go(), s = it(), c = ct(), { width: u } = pt(), d = z(null), g = z(), B = z(), H = Re(), { isBorder: m, isZebra: V, tableSize: x, isFullScreen: C, isHeaderBackground: T } = ft(H), O = z(null), y = z(null), M = {
      MOBILE: "prev, pager, next, sizes, jumper, total",
      IPAD: "prev, pager, next, jumper, total",
      DESKTOP: "total, prev, pager, next, sizes, jumper"
    }, b = v(() => u.value < 768 ? M.MOBILE : u.value < 1024 ? M.IPAD : M.DESKTOP), $ = v(() => ({
      background: !0,
      hideOnSinglePage: !1,
      size: "default",
      pagerCount: u.value > 1200 ? 7 : 5,
      layout: b.value,
      ...t.paginationOptions
    })), A = v(() => t.border ?? m.value), D = v(() => t.stripe ?? V.value), E = v(() => t.size ?? x.value), ne = v(() => t.data?.length === 0), I = v(() => t.pagination?.currentPage ?? 1), Q = v(() => t.pagination?.pageSize ?? 10), w = v(() => t.pagination?.total ?? 0), j = v(() => (t.searchItems?.length ?? 0) > 0), Be = v(() => !!(c["header-left"] || c["header-right"])), be = v(
      () => t.integrated ?? (j.value || Be.value)
    ), Pe = z(!0), He = v(() => t.showSearchBar ?? Pe.value), Bt = v(
      () => j.value ? He.value : void 0
    ), Et = v(() => be.value && t.showTableHeader), _t = v(() => be.value ? "is-integrated" : "is-bare"), Ct = v(() => be.value ? so : "div"), At = v(() => be.value ? "ao-table-card" : "ao-table-bare"), Fe = z(0), De = z(0);
    Ge(g, (k) => {
      const F = k[0];
      F && requestAnimationFrame(() => {
        Fe.value = F.contentRect.height;
      });
    }), Ge(B, (k) => {
      const F = k[0];
      F && requestAnimationFrame(() => {
        De.value = F.contentRect.height;
      });
    });
    const Tt = z(10), { containerHeight: Ot } = Ho({
      showTableHeader: v(() => t.showTableHeader),
      bottomBarHeight: Fe,
      tableHeaderHeight: De,
      bottomBarSpacing: Tt
    }), Rt = v(() => C.value ? "100%" : ne.value && !t.loading ? t.emptyHeight : t.height ? t.height : "100%"), It = v(() => ({
      background: T.value ? "var(--el-fill-color-lighter)" : "var(--default-box-color)",
      ...t.headerCellStyle || {}
      // 合并用户传入的样式
    })), zt = (k) => {
      const F = f?.vnode.props || {}, pe = k.replace(/[A-Z]/g, (L) => `-${L.toLowerCase()}`);
      return k in F || pe in F;
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
    ], Vt = v(() => {
      const k = { ...t };
      return Mt.forEach((F) => {
        delete k[F];
      }), k;
    }), $t = v(() => ({
      ...s,
      ...Vt.value,
      height: Rt.value,
      stripe: D.value,
      border: A.value,
      size: E.value,
      headerCellStyle: It.value,
      // Element Plus 默认值为 true，未显式传入时不应被 AoTable 覆盖成 false。
      selectOnIndeterminate: zt("selectOnIndeterminate") ? t.selectOnIndeterminate : void 0
    })), Ne = v(() => w.value > 0 && !ne.value), Ue = (k) => k.$index === void 0 || k.$index >= 0, Lt = ["slotName", "checked", "visible", "disabled"], Ee = (k) => {
      const F = { ...k };
      return Lt.forEach((pe) => {
        delete F[pe];
      }), F;
    }, Pt = (k) => {
      se("size-change", k);
    }, Ht = (k) => {
      se("current-change", k), je();
    }, Ft = async (k) => {
      if (t.searchRules)
        try {
          await O.value?.validate();
        } catch {
          return;
        }
      se("search", k);
    }, Dt = () => {
      se("reset");
    }, Nt = () => {
      se("refresh");
    }, Ut = (k) => {
      t.showSearchBar === void 0 && (Pe.value = k), se("update:showSearchBar", k);
    }, jt = Po, je = () => {
      dt(() => {
        d.value?.setScrollTop(0), jt();
      });
    }, Kt = (k) => (I.value - 1) * Q.value + k + 1, se = l;
    return bo(
      () => {
        B.value = y.value?.$el ?? void 0;
      },
      { flush: "post" }
    ), o({
      scrollToTop: je,
      elTableRef: d
    }), (k, F) => {
      const pe = yo("loading");
      return n(), S("div", {
        class: X(["ao-table-root", _t.value])
      }, [
        j.value ? Ze((n(), h(oa, {
          key: 0,
          ref_key: "searchBarRef",
          ref: O,
          modelValue: r.value,
          "onUpdate:modelValue": F[0] || (F[0] = (L) => r.value = L),
          items: e.searchItems,
          rules: e.searchRules,
          span: e.searchSpan,
          "show-expand": e.searchShowExpand,
          onSearch: Ft,
          onReset: Dt
        }, null, 8, ["modelValue", "items", "rules", "span", "show-expand"])), [
          [wo, He.value]
        ]) : _("", !0),
        (n(), h(oe(Ct.value), {
          class: X(At.value)
        }, {
          default: p(() => [
            Et.value ? (n(), h(ca, {
              key: 0,
              ref_key: "tableHeaderCompRef",
              ref: y,
              columns: i.value,
              "onUpdate:columns": F[1] || (F[1] = (L) => i.value = L),
              "show-search-bar": Bt.value,
              "show-zebra": e.headerShowZebra,
              "show-border": e.headerShowBorder,
              "show-header-background": e.headerShowHeaderBackground,
              loading: e.loading,
              "onUpdate:showSearchBar": Ut,
              onRefresh: Nt
            }, {
              left: p(() => [
                N(k.$slots, "header-left", {}, void 0, !0)
              ]),
              right: p(() => [
                N(k.$slots, "header-right", {}, void 0, !0)
              ]),
              _: 3
            }, 8, ["columns", "show-search-bar", "show-zebra", "show-border", "show-header-background", "loading"])) : _("", !0),
            K("div", {
              class: X(["ao-table", { "is-empty": ne.value }]),
              style: ve(a(Ot))
            }, [
              Ze((n(), h(a(uo), P({
                ref_key: "elTableRef",
                ref: d
              }, $t.value), {
                default: p(() => [
                  (n(!0), S(Z, null, W(e.columns, (L) => (n(), S(Z, {
                    key: L.columnKey || L.prop || L.type
                  }, [
                    L.type === "globalIndex" ? (n(), h(a(we), P({
                      key: 0,
                      ref_for: !0
                    }, Ee(L)), {
                      default: p(({ $index: ue }) => [
                        K("span", null, U(Kt(ue)), 1)
                      ]),
                      _: 1
                    }, 16)) : L.type === "expand" ? (n(), h(a(we), P({
                      key: 1,
                      ref_for: !0
                    }, Ee(L)), ae({ _: 2 }, [
                      L.slotName ? {
                        name: "default",
                        fn: p((ue) => [
                          N(k.$slots, L.slotName, P({ ref_for: !0 }, ue), void 0, !0)
                        ]),
                        key: "0"
                      } : void 0
                    ]), 1040)) : (n(), h(a(we), P({
                      key: 2,
                      ref_for: !0
                    }, Ee(L)), ae({ _: 2 }, [
                      L.slotName ? {
                        name: "default",
                        fn: p((ue) => [
                          Ue(ue) ? N(k.$slots, L.slotName, P({ ref_for: !0 }, ue), void 0, !0, 0) : _("", !0)
                        ]),
                        key: "0"
                      } : void 0
                    ]), 1040))
                  ], 64))), 128)),
                  a(c).default ? N(k.$slots, "default", {}, void 0, !0, 0) : _("", !0),
                  a(c).operation ? (n(), h(a(we), {
                    key: 1,
                    label: "操作",
                    width: 170,
                    fixed: "right",
                    align: "right"
                  }, {
                    default: p((L) => [
                      Ue(L) ? N(k.$slots, "operation", Te(Oe(L)), void 0, !0, 0) : _("", !0)
                    ]),
                    _: 3
                  })) : _("", !0)
                ]),
                empty: p(() => [
                  e.loading ? (n(), S("div", da)) : (n(), h(a(io), {
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
              class: X(["ao-table-bottom", { "is-bar-empty": !Ne.value && !k.$slots.footer }]),
              ref_key: "bottomBarRef",
              ref: g
            }, [
              K("div", fa, [
                N(k.$slots, "footer", {}, void 0, !0)
              ]),
              Ne.value ? (n(), S("div", pa, [
                R(a(co), P($.value, {
                  total: w.value,
                  disabled: e.loading,
                  "current-page": I.value,
                  "page-size": Q.value,
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
}), Fa = /* @__PURE__ */ J(ha, [["__scopeId", "data-v-cab940e7"]]), ma = { class: "form-section" }, va = {
  key: 0,
  class: "form-title"
}, ga = { key: 1 }, ba = { key: 1 }, ya = /* @__PURE__ */ G({
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
    const t = e, r = l, i = me(e, "modelValue"), f = Ve("formRef"), s = z({});
    s.value = te(i.value), $e(i, (y) => {
      s.value = te(y);
    });
    const c = v(() => ({
      ...xe,
      ...t.sanitizeOutput
    })), u = (y) => gt(i.value, y), d = (y, M) => {
      bt(i.value, y, M);
    }, g = (y, M) => qe(y) ? 24 : St(qo(y.span, x.value), M), B = v(() => t.items.filter((y) => !y.hidden)), H = () => ze(i.value, c.value);
    o({
      validate: (...y) => f.value.validate(...y),
      reset: () => {
        f.value?.resetFields(), Object.keys(i.value).forEach((y) => {
          delete i.value[y];
        }), Object.assign(i.value, te(s.value)), r("reset");
      },
      submit: async () => {
        try {
          await f.value?.validate();
        } catch {
          console.error("[AoForm] 表单校验失败");
          return;
        }
        r("submit", H());
      },
      // 允许外部在不触发提交事件时主动获取清洗后的输出。
      getOutput: H
    });
    const { span: x, gutter: C, labelPosition: T, labelWidth: O } = ut(t);
    return (y, M) => (n(), S("section", ma, [
      R(a(Qe), P({
        ref: "formRef",
        model: i.value,
        "label-position": a(T)
      }, { ...y.$attrs }), {
        default: p(() => [
          R(a(et), { gutter: a(C) }, {
            default: p(() => [
              (n(!0), S(Z, null, W(B.value, (b) => (n(), h(a(Ce), {
                key: b.key,
                xs: g(b, "xs"),
                sm: g(b, "sm"),
                md: g(b, "md"),
                lg: g(b, "lg"),
                xl: g(b, "xl")
              }, {
                default: p(() => [
                  a(qe)(b) ? (n(), S("div", va, [
                    typeof b.label != "string" ? (n(), h(oe(b.label), { key: 0 })) : (n(), S("span", ga, U(b.label), 1))
                  ])) : (n(), h(a(tt), {
                    key: 1,
                    prop: b.key,
                    "label-width": b.label ? b.labelWidth || a(O) : void 0
                  }, ae({
                    default: p(() => [
                      N(y.$slots, b.key, {
                        item: b,
                        modelValue: i.value
                      }, () => [
                        (n(), h(oe(a(kt)(b)), P({
                          "model-value": u(b.key),
                          "onUpdate:modelValue": ($) => d(b.key, $)
                        }, { ref_for: !0 }, a(yt)(b)), ae({
                          default: p(() => [
                            b.type === "select" && a(Y)(b).length ? (n(!0), S(Z, { key: 0 }, W(a(Y)(b), ($) => (n(), h(a(ot), P({ ref_for: !0 }, $, {
                              key: String($.value)
                            }), null, 16))), 128)) : _("", !0),
                            b.type === "checkboxgroup" && a(Y)(b).length ? (n(!0), S(Z, { key: 1 }, W(a(Y)(b), ($) => (n(), h(a(re), P({ ref_for: !0 }, $, {
                              key: String($.value)
                            }), null, 16))), 128)) : _("", !0),
                            b.type === "radiogroup" && a(Y)(b).length ? (n(!0), S(Z, { key: 2 }, W(a(Y)(b), ($) => (n(), h(a(at), P({ ref_for: !0 }, $, {
                              key: String($.value)
                            }), null, 16))), 128)) : _("", !0)
                          ]),
                          _: 2
                        }, [
                          W(a(wt)(b), ($, A) => ({
                            name: A,
                            fn: p(() => [
                              (n(), h(oe($)))
                            ])
                          }))
                        ]), 1040, ["model-value", "onUpdate:modelValue"]))
                      ], !0)
                    ]),
                    _: 2
                  }, [
                    b.label ? {
                      name: "label",
                      fn: p(() => [
                        typeof b.label != "string" ? (n(), h(oe(b.label), { key: 0 })) : (n(), S("span", ba, U(b.label), 1))
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
}), Je = /* @__PURE__ */ J(ya, [["__scopeId", "data-v-701ee2e8"]]), Da = /* @__PURE__ */ G({
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
    const t = e, r = l, i = me(e, "modelValue"), { t: f } = Se(), s = ct(), c = Ve("formBodyRef"), u = v(() => t.dialog), d = v(() => ({
      items: t.items,
      span: t.span,
      gutter: t.gutter,
      labelPosition: t.labelPosition,
      labelWidth: t.labelWidth,
      sanitizeOutput: t.sanitizeOutput
    })), g = () => {
      r("reset");
    }, B = (x) => {
      r("submit", x);
    }, H = (x) => {
      r("update:visible", x);
    }, m = () => {
      r("cancel"), H(!1);
    }, V = () => {
      c.value?.submit();
    };
    return o({
      /** 校验表单，透传表单主体的 validate */
      validate: (...x) => c.value.validate(...x),
      /** 重置表单，透传表单主体的 reset */
      reset: () => c.value?.reset(),
      /** 触发提交（含校验），透传表单主体的 submit */
      submit: () => c.value?.submit(),
      /** 读取清洗后的表单输出，透传表单主体的 getOutput */
      getOutput: () => c.value?.getOutput() ?? {}
    }), (x, C) => u.value ? (n(), h(a(fo), {
      key: 0,
      class: "ao-form-dialog",
      "model-value": e.visible,
      title: e.title,
      width: e.width,
      "align-center": e.alignCenter,
      draggable: "",
      overflow: !1,
      "onUpdate:modelValue": H,
      onClosed: C[1] || (C[1] = (T) => r("closed"))
    }, {
      footer: p(() => [
        N(x.$slots, "footer", {}, () => [
          R(a(fe), { onClick: m }, {
            default: p(() => [
              q(U(e.cancelText || a(f)("common.cancel")), 1)
            ]),
            _: 1
          }),
          e.showSubmit ? (n(), h(a(fe), {
            key: 0,
            type: "primary",
            disabled: e.disabledSubmit,
            onClick: V
          }, {
            default: p(() => [
              q(U(e.confirmText || a(f)("common.confirm")), 1)
            ]),
            _: 1
          }, 8, ["disabled"])) : _("", !0)
        ])
      ]),
      default: p(() => [
        R(Je, P({
          ref_key: "formBodyRef",
          ref: c
        }, { ...d.value, ...x.$attrs }, {
          modelValue: i.value,
          "onUpdate:modelValue": C[0] || (C[0] = (T) => i.value = T),
          onReset: g,
          onSubmit: B
        }), ae({ _: 2 }, [
          W(a(s), (T, O) => ({
            name: O,
            fn: p((y) => [
              N(x.$slots, O, Te(Oe(y ?? {})))
            ])
          }))
        ]), 1040, ["modelValue"])
      ]),
      _: 3
    }, 8, ["model-value", "title", "width", "align-center"])) : (n(), h(Je, P({
      key: 1,
      ref_key: "formBodyRef",
      ref: c
    }, { ...d.value, ...x.$attrs }, {
      modelValue: i.value,
      "onUpdate:modelValue": C[2] || (C[2] = (T) => i.value = T),
      onReset: g,
      onSubmit: B
    }), ae({ _: 2 }, [
      W(a(s), (T, O) => ({
        name: O,
        fn: p((y) => [
          N(x.$slots, O, Te(Oe(y ?? {})))
        ])
      }))
    ]), 1040, ["modelValue"]));
  }
}), wa = /* @__PURE__ */ G({
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
    const l = e, t = o, r = {
      add: { icon: "ri:add-fill", class: "ao-btn-theme" },
      edit: { icon: "ri:pencil-line", class: "ao-btn-secondary" },
      delete: { icon: "ri:delete-bin-5-line", class: "ao-btn-error" },
      view: { icon: "ri:eye-line", class: "ao-btn-info" },
      more: { icon: "ri:more-2-fill", class: "" }
    }, i = v(() => l.icon || (l.type ? r[l.type]?.icon : "") || ""), f = v(() => l.iconClass || (l.type ? r[l.type]?.class : "") || ""), s = () => {
      t("click");
    };
    return (c, u) => (n(), S("div", {
      class: X(["ao-button-table", f.value]),
      style: ve({ backgroundColor: e.buttonBgColor, color: e.iconColor }),
      onClick: s
    }, [
      R(ge, { icon: i.value }, null, 8, ["icon"])
    ], 6));
  }
}), Na = /* @__PURE__ */ J(wa, [["__scopeId", "data-v-005b60b0"]]), ka = /* @__PURE__ */ G({
  name: "AoIconButton",
  __name: "AoIconButton",
  props: {
    icon: {},
    circle: { type: Boolean }
  },
  setup(e) {
    return (o, l) => (n(), S("div", {
      class: X(["icon-button", { "is-circle": e.circle }])
    }, [
      R(ge, { icon: e.icon }, null, 8, ["icon"]),
      N(o.$slots, "default", {}, void 0, !0)
    ], 2));
  }
}), Sa = /* @__PURE__ */ J(ka, [["__scopeId", "data-v-a298f446"]]), xa = /* @__PURE__ */ G({
  name: "AoButtonMore",
  __name: "AoButtonMore",
  props: {
    list: {},
    auth: {}
  },
  emits: ["click"],
  setup(e, { emit: o }) {
    const { hasAuth: l } = Lo(), t = e, r = v(() => t.list.some((s) => !s.auth || l(s.auth))), i = o, f = (s) => {
      i("click", s);
    };
    return (s, c) => (n(), S("div", null, [
      r.value ? (n(), h(a(nt), { key: 0 }, {
        dropdown: p(() => [
          R(a(rt), null, {
            default: p(() => [
              (n(!0), S(Z, null, W(e.list, (u) => (n(), S(Z, {
                key: u.key
              }, [
                !u.auth || a(l)(u.auth) ? (n(), h(a(st), {
                  key: 0,
                  disabled: u.disabled,
                  onClick: (d) => f(u)
                }, {
                  default: p(() => [
                    K("div", {
                      class: "dropdown-item-content",
                      style: ve({ color: u.color })
                    }, [
                      u.icon ? (n(), h(ge, {
                        key: 0,
                        icon: u.icon
                      }, null, 8, ["icon"])) : _("", !0),
                      K("span", null, U(u.label), 1)
                    ], 4)
                  ]),
                  _: 2
                }, 1032, ["disabled", "onClick"])) : _("", !0)
              ], 64))), 128))
            ]),
            _: 1
          })
        ]),
        default: p(() => [
          R(Sa, {
            icon: "ri:more-2-fill",
            class: "more-button"
          })
        ]),
        _: 1
      })) : _("", !0)
    ]));
  }
}), Ua = /* @__PURE__ */ J(xa, [["__scopeId", "data-v-e5e8e40b"]]), Ba = /* @__PURE__ */ G({
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
    const t = e, r = l;
    class i extends Error {
      constructor(V, x, C) {
        super(V), this.code = x, this.details = C, this.name = "ExportError";
      }
      code;
      details;
    }
    const f = z(!1), s = v(() => Array.isArray(t.data) && t.data.length > 0), c = (m) => {
      if (!Array.isArray(m))
        throw new i("数据必须是数组格式", "INVALID_DATA_TYPE");
      if (m.length === 0)
        throw new i("没有可导出的数据", "NO_DATA");
      if (m.length > t.maxRows)
        throw new i(`数据行数超过限制（${t.maxRows}行）`, "EXCEED_MAX_ROWS", {
          currentRows: m.length,
          maxRows: t.maxRows
        });
    }, u = (m, V, x, C) => {
      const T = t.columns[V];
      return T?.formatter ? T.formatter(m, x, C) : m == null ? "" : m instanceof Date ? m.toLocaleDateString("zh-CN") : typeof m == "boolean" ? m ? "是" : "否" : String(m);
    }, d = (m) => m.map((x, C) => {
      const T = {};
      return t.autoIndex && (T[t.indexColumnTitle] = String(C + 1)), Object.entries(x).forEach(([O, y]) => {
        let M = O;
        t.columns[O]?.title ? M = t.columns[O].title : t.headers[O] && (M = t.headers[O]), T[M] = u(y, O, x, C);
      }), T;
    }), g = (m) => {
      if (m.length === 0) return [];
      const V = Math.min(m.length, 100);
      return Object.keys(m[0]).map((C) => {
        const T = Object.values(t.columns).find((M) => M.title === C)?.width;
        if (T)
          return { wch: T };
        const O = Math.max(
          C.length,
          ...m.slice(0, V).map((M) => String(M[C] || "").length)
        );
        return { wch: Math.min(Math.max(O + 2, 8), 50) };
      });
    }, B = async (m, V, x) => {
      try {
        r("export-progress", 10);
        const C = d(m);
        r("export-progress", 30);
        const T = ce.utils.book_new();
        t.workbookOptions && (T.Props = {
          Title: V,
          Subject: "数据导出",
          Author: t.workbookOptions.creator || "Ao Design Pro",
          Manager: t.workbookOptions.lastModifiedBy || "",
          Company: "系统导出",
          Category: "数据",
          Keywords: "excel,export,data",
          Comments: "由系统自动生成",
          CreatedDate: t.workbookOptions.created || /* @__PURE__ */ new Date(),
          ModifiedDate: t.workbookOptions.modified || /* @__PURE__ */ new Date()
        }), r("export-progress", 50);
        const O = ce.utils.json_to_sheet(C);
        O["!cols"] = g(C), r("export-progress", 70), ce.utils.book_append_sheet(T, O, x), r("export-progress", 85);
        const y = ce.write(T, {
          bookType: "xlsx",
          type: "array",
          compression: !0
        }), M = new Blob([y], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        });
        r("export-progress", 95);
        const b = (/* @__PURE__ */ new Date()).toISOString().replace(/[:.]/g, "-"), $ = `${V}_${b}.xlsx`;
        return To.saveAs(M, $), r("export-progress", 100), await dt(), Promise.resolve();
      } catch (C) {
        throw new i(`Excel 导出失败: ${C.message}`, "EXPORT_FAILED", C);
      }
    }, H = xo(async () => {
      if (!f.value) {
        f.value = !0;
        try {
          c(t.data), r("before-export", t.data), await B(t.data, t.filename, t.sheetName), r("export-success", t.filename, t.data.length), t.showSuccessMessage && We.success({
            message: `成功导出 ${t.data.length} 条数据`,
            duration: 3e3
          });
        } catch (m) {
          const V = m instanceof i ? m : new i(`导出失败: ${m.message}`, "UNKNOWN_ERROR", m);
          r("export-error", V), t.showErrorMessage && We.error({
            message: V.message,
            duration: 5e3
          }), console.error("Excel 导出错误:", V);
        } finally {
          f.value = !1, r("export-progress", 0);
        }
      }
    }, 1e3);
    return o({
      exportData: H,
      isExporting: ko(f),
      hasData: s
    }), (m, V) => (n(), h(a(fe), {
      type: e.type,
      size: e.size,
      loading: f.value,
      disabled: e.disabled || !s.value,
      onClick: a(H)
    }, {
      loading: p(() => [
        R(a(lt), { class: "is-loading" }, {
          default: p(() => [
            R(a(_o))
          ]),
          _: 1
        }),
        q(" " + U(e.loadingText), 1)
      ]),
      default: p(() => [
        N(m.$slots, "default", {}, () => [
          q(U(e.buttonText), 1)
        ], !0)
      ]),
      _: 3
    }, 8, ["type", "size", "loading", "disabled", "onClick"]));
  }
}), ja = /* @__PURE__ */ J(Ba, [["__scopeId", "data-v-eae0b991"]]), Ea = { class: "excel-import" }, _a = /* @__PURE__ */ G({
  name: "AoExcelImport",
  __name: "AoExcelImport",
  emits: ["import-success", "import-error"],
  setup(e, { emit: o }) {
    async function l(i) {
      return new Promise((f, s) => {
        const c = new FileReader();
        c.onload = (u) => {
          try {
            const d = u.target?.result, g = ce.read(d, { type: "array" }), B = g.SheetNames[0], H = g.Sheets[B], m = ce.utils.sheet_to_json(H);
            f(m);
          } catch (d) {
            s(d);
          }
        }, c.onerror = (u) => s(u), c.readAsArrayBuffer(i);
      });
    }
    const t = o, r = async (i) => {
      try {
        if (!i.raw) return;
        const f = await l(i.raw);
        t("import-success", f);
      } catch (f) {
        t("import-error", f);
      }
    };
    return (i, f) => (n(), S("div", Ea, [
      R(a(po), {
        "auto-upload": !1,
        accept: ".xlsx, .xls",
        "show-file-list": !1,
        onChange: r
      }, {
        default: p(() => [
          R(a(fe), { type: "primary" }, {
            default: p(() => [
              N(i.$slots, "default", {}, () => [
                f[0] || (f[0] = q("导入 Excel", -1))
              ], !0)
            ]),
            _: 3
          })
        ]),
        _: 3
      })
    ]));
  }
}), Ka = /* @__PURE__ */ J(_a, [["__scopeId", "data-v-81d063bb"]]), Ca = { class: "logo-container" }, Aa = ["src"], Ta = /* @__PURE__ */ G({
  name: "AoLogo",
  __name: "AoLogo",
  props: {
    size: { default: 36 },
    src: {}
  },
  setup(e) {
    const o = e, l = Me(vt, void 0), t = v(() => o.src ?? l), r = v(() => ({ width: `${o.size}px` }));
    return (i, f) => (n(), S("div", Ca, [
      t.value ? (n(), S("img", {
        key: 0,
        style: ve(r.value),
        src: t.value,
        alt: "logo",
        class: "logo-img"
      }, null, 12, Aa)) : _("", !0)
    ]));
  }
}), Wa = /* @__PURE__ */ J(Ta, [["__scopeId", "data-v-a45d0db4"]]), Za = {
  install(e, o = {}) {
    console.info(`[ao-admin-components] v${$o}`), o.i18n && (o.i18n.global.mergeLocaleMessage("zh", Io), o.i18n.global.mergeLocaleMessage("en", Vo)), e.provide(ht, o.getAuthList ?? (() => {
    })), e.provide(mt, o.resolveLocalSvg ?? (() => {
    })), e.provide(vt, o.assets?.logo), e.directive("loading", ho);
  }
};
export {
  ht as AUTH_LIST_KEY,
  Za as AdminComponents,
  Ua as AoButtonMore,
  Na as AoButtonTable,
  ja as AoExcelExport,
  Ka as AoExcelImport,
  Da as AoForm,
  Sa as AoIconButton,
  Wa as AoLogo,
  oa as AoSearchBar,
  ge as AoSvgIcon,
  Fa as AoTable,
  ca as AoTableHeader,
  ie as AoTableHeaderButton,
  mt as LOCAL_SVG_KEY,
  vt as LOGO_URL_KEY,
  he as TableSizeEnum,
  ee as getColumnKey,
  de as getColumnVisibility,
  Lo as useAuth,
  Ha as useTableColumns,
  Ho as useTableHeight,
  Re as useTableStore,
  $o as version
};
