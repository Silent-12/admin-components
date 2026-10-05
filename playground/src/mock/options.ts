/**
 * 选项字典模拟数据
 *
 * playground 不依赖后端字典接口，这里集中提供 select / checkboxgroup /
 * radiogroup / cascader / treeselect 等选项类表单项所需的静态数据，
 * 供各 demo 复用，避免同一份字典在多个示例里重复维护。
 */

import type { FormOption } from '@ao/admin-components'

/** 部门选项：value 与 mock 用户数据中的 department 文本一致，保证搜索筛选可命中 */
export const DEPARTMENT_OPTIONS: FormOption[] = [
  { label: '研发部', value: '研发部' },
  { label: '产品部', value: '产品部' },
  { label: '设计部', value: '设计部' },
  { label: '运营部', value: '运营部' },
  { label: '财务部', value: '财务部' }
]

/** 账号状态选项：1 在职、0 离职 */
export const STATUS_OPTIONS: FormOption[] = [
  { label: '在职', value: 1 },
  { label: '离职', value: 0 }
]

/** 性别选项：radiogroup 用法示例 */
export const GENDER_OPTIONS: FormOption[] = [
  { label: '男', value: 1 },
  { label: '女', value: 2 },
  { label: '保密', value: 0 }
]

/** 技术栈选项：checkboxgroup 用法示例 */
export const SKILL_OPTIONS: FormOption[] = [
  { label: 'Vue', value: 'vue' },
  { label: 'React', value: 'react' },
  { label: 'Node.js', value: 'node' },
  { label: 'NestJS', value: 'nest' },
  { label: 'MySQL', value: 'mysql' }
]

/** 城市级联选项：cascader 用法示例，需要嵌套 children */
export const CITY_OPTIONS: FormOption[] = [
  {
    label: '广东省',
    value: 'guangdong',
    children: [
      { label: '广州市', value: 'guangzhou' },
      { label: '深圳市', value: 'shenzhen' },
      { label: '珠海市', value: 'zhuhai' }
    ]
  },
  {
    label: '浙江省',
    value: 'zhejiang',
    children: [
      { label: '杭州市', value: 'hangzhou' },
      { label: '宁波市', value: 'ningbo' }
    ]
  },
  {
    label: '四川省',
    value: 'sichuan',
    children: [
      { label: '成都市', value: 'chengdu' },
      { label: '绵阳市', value: 'mianyang' }
    ]
  }
]

/** 菜单树选项：treeselect 用法示例，通过 props.data 传入 */
export const MENU_TREE_OPTIONS: FormOption[] = [
  {
    label: '系统管理',
    value: 'system',
    children: [
      { label: '用户管理', value: 'system-user' },
      { label: '角色管理', value: 'system-role' },
      { label: '菜单管理', value: 'system-menu' }
    ]
  },
  {
    label: '业务中心',
    value: 'business',
    children: [
      { label: '订单列表', value: 'business-order' },
      { label: '设备档案', value: 'business-device' }
    ]
  }
]
