/**
 * 模拟数据源
 *
 * playground 不依赖后端与 request 实例，直接提供与模板 mock 同形状的
 * 分页列表数据，验证 AoTable 的搜索、分页、权限按钮等交互。
 */

export interface UserRecord {
  id: string
  userName: string
  userPhone: string
  userEmail: string
  department: string
  status: number
  remark: string
  createdAt: string
}

export interface UserSearchParams {
  userName?: string
  userEmail?: string
  department?: string
  current?: number
  size?: number
}

export interface PageResult<T> {
  records: T[]
  current: number
  size: number
  total: number
}

const DEPARTMENTS = ['研发部', '产品部', '设计部', '运营部', '财务部']
const STATUSES = [0, 1]

/**
 * @description 生成创建时间文本，按序号向后递推，保证排序示例有稳定顺序。
 * @param index 记录序号，从 0 开始。
 * @return 形如 `2026-01-01 09:00` 的时间文本。
 */
const createTime = (index: number): string => {
  const date = new Date(2026, 0, 1 + index)
  const pad = (value: number): string => String(value).padStart(2, '0')
  const hour = pad(9 + (index % 8))
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${hour}:00`
}

const ACCOUNT_DATA: UserRecord[] = Array.from({ length: 58 }, (_, i) => ({
  id: `${i + 1}`,
  userName: `用户${String(i + 1).padStart(3, '0')}`,
  userPhone: `138${String(10000000 + i * 37).slice(0, 8)}`,
  userEmail: `user${i + 1}@example.com`,
  department: DEPARTMENTS[i % DEPARTMENTS.length],
  status: STATUSES[i % STATUSES.length],
  remark: i % 7 === 0 ? '这是一条超长备注：用于验证表格列在内容溢出时的省略与提示表现，内容越长越容易暴露样式问题。' : '',
  createdAt: createTime(i)
}))

/**
 * @description 取指定条数的用户记录副本，供不分页的基础表格示例使用。
 * @param count 需要的记录条数，超出总量时按总量返回。
 * @return 用户记录数组，返回新对象以避免示例之间相互影响。
 */
export function createUserRecords(count = 8): UserRecord[] {
  return ACCOUNT_DATA.slice(0, count).map((item) => ({ ...item }))
}

/**
 * @description 模拟用户分页列表查询。
 * @param params 搜索与分页参数。
 * @return 分页结果。
 */
export function fetchUserList(params: UserSearchParams): Promise<PageResult<UserRecord>> {
  const records = ACCOUNT_DATA.filter((item) => {
    if (params.userName && !item.userName.includes(params.userName)) return false
    if (params.userEmail && !item.userEmail.includes(params.userEmail)) return false
    if (params.department && item.department !== params.department) return false
    return true
  })
  const current = params.current || 1
  const size = params.size || 10
  const start = (current - 1) * size
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        records: records.slice(start, start + size),
        current,
        size,
        total: records.length
      })
    }, 300)
  })
}
