import { useState, useEffect } from 'react'
import { Table } from 'antd'
import { User, UserService } from './user.service'

const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: '用户名',
    dataIndex: 'username',
    key: 'username',
  },
]

export const AdminUser = () => {
  const [page, setPage] = useState(1)
  const [dataSource, setDataSource] = useState<User[]>([])

  useEffect(() => {
    UserService.getUserList().then(res => {
      setDataSource(res.data.results)
      setPage(res.data.page)
    })
  }, [page])

  return (
    <Table
      columns={columns}
      dataSource={dataSource}
      rowKey={(record: User) => record.id}
    />
  )
}
