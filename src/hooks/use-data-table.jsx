import { isNil, omit } from 'lodash-es'
import { NDataTable, NPagination } from 'naive-ui'
import { ref } from 'vue'
import { mergeClass } from '@/utils/merge-class'

const defaultProps = {
  // 自定义 props
  initDataSource: true,
  hasLoading: true,

  // table props
  striped: true,
  bordered: true,
  // loading: true,
  pagination: {
    pageSizes: [10, 20, 50, 100],
    showSizePicker: true,
  },
}

const customPropsNames = ['pagination', 'dataSource', 'initDataSource', 'hasLoading', 'onBeforeUpdateData', 'onAfterUpdateData', 'pagingWrapClass']

export function useDataTable(
  columns,
  props,
  slots,
) {
  const rawProps = Object.assign({}, defaultProps, props)
  const nTableProps = omit(rawProps, customPropsNames)

  const data = ref([])
  const page = ref(1)
  const pageSize = ref(10)
  const total = ref(0)
  const sorter = ref()
  const loading = ref(false)

  rawProps.initDataSource && refresh()

  async function refresh() {
    onBeforeUpdateData()
    const res = await rawProps.dataSource?.({ page: page.value, pageSize: pageSize.value }).catch((e) => {
      onAfterUpdateData()
      return e
    })
    if (isNil(res)) return
    data.value = res.data
    total.value = res.total
    onAfterUpdateData()
    return res
  }

  function startLoading() {
    loading.value = true
  }
  function stopLoading() {
    loading.value = false
  }

  function onBeforeUpdateData() {
    rawProps.hasLoading && startLoading()
  }

  function onAfterUpdateData() {
    rawProps.hasLoading && stopLoading()
  }

  function onPageChange(newPage) {
    page.value = newPage
    refresh()
  }

  function onPageSizeChange(newPageSize) {
    pageSize.value = newPageSize
    refresh()
  }

  return [
    () => (
      <div>
        <NDataTable {...nTableProps} class={rawProps.tableClass} data={data.value} columns={columns.value} loading={loading.value}>
          {slots}
        </NDataTable>
        <div class={mergeClass('mt-3 flex justify-end', rawProps.pagingWrapClass)}>
          <NPagination {...rawProps.pagination} item-count={total.value} page={page.value} pageSize={pageSize.value} onUpdate:page={onPageChange} onUpdate:pageSize={onPageSizeChange} />
        </div>
      </div>
    ),
    { data, page, pageSize, sorter, refresh },
  ]
}
