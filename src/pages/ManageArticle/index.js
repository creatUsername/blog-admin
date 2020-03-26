import React, { useState, useEffect } from 'react'
import { Table, Tag, Button, Popconfirm, message } from 'antd'
import axios from 'axios'
import servicePath from '../../api'
import { SwitchTagColor, SwitchTagName } from '../../libs/tag'
import moment from 'moment'

const ManageArticle = ({ history }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [articleList, setArticleList] = useState([])

  useEffect(() => {
    getArticleList()
  }, [])

  const getArticleList = () => {
    setIsLoading(true)
    axios({
      method: 'post',
      url: servicePath.GET_ARTICLE_LIST,
    }).then(res => {
      setArticleList(res.data.data)
      setIsLoading(false)
    }).finally(() => {
      setIsLoading(false)
    })
  }

  const handleEditor = id => {
    history.push('/add/' + id)
  }

  const handleRemove = id => {
    axios({
      method: 'post',
      url: servicePath.REMOVE_ARTICLE + id,
    }).then(res => {
      if (res.data.isSuccess) {
        message.success('文章删除成功!')
      } else {
        message.error('文章删除失败')
      }
    }).finally(() => {
      getArticleList()
    })
  }

  const columns = [
    {
      title: 'id',
      dataIndex: 'id',
      key: 'id',
      width: '5%',
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: '标题',
      dataIndex: 'title',
      key: 'title',
      width: '20%',
    },
    {
      title: '分类',
      dataIndex: 'type_id',
      key: 'type_id',
      width: '10%',
      filters: [
        {
          text: 'React',
          value: 1
        },
        {
          text: 'Vue',
          value: 2
        },
        {
          text: 'Javascript',
          value: 3
        },
        {
          text: 'Css',
          value: 4
        },
        {
          text: '其他',
          value: 5
        }
      ],
      onFilter: (value, record) => record.type_id === value,
      render: type_id => {
        return <Tag color={SwitchTagColor(type_id)}>{SwitchTagName(type_id)}</Tag>
      }
    },
    {
      title: '简介',
      dataIndex: 'introduce',
      key: 'introduce',
      width: '30%',
    },
    {
      title: '发布日期',
      dataIndex: 'addTime',
      key: 'addTime',
      render: addTime => <p>{moment(addTime).format('YYYY-MM-DD')}</p>,
      sorter: (a, b) => new Date(a.addTime).getTime() - new Date(b.addTime).getTime(),
    },
    {
      title: '浏览量',
      dataIndex: 'view_count',
      key: 'view_count',
      sorter: (a, b) => a.view_count - b.view_count,
    },
    {
      title: '获赞',
      dataIndex: 'liked',
      key: 'liked',
      sorter: (a, b) => a.liked - b.liked,
    },
    {
      title: '操作',
      dataIndex: 'id',
      width: '10%',
      render: (text, record) => (
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          <Button size="small" type="primary" onClick={() => handleEditor(record.id)}>编辑</Button>
          <Popconfirm
            title="警告: 一经删除,此条博客将无法恢复,你确定要删除这条博客吗?"
            okText="确定"
            
            cancelText="取消"
            onConfirm={() => handleRemove(record.id)}
            onCancel={() => message.info('已取消删除')}
          >
            <Button size="small" type="primary" danger>删除</Button>
          </Popconfirm>
        </div>
      )
    }
  ]

  return (
    <div>
      <Table
        bordered
        dataSource={articleList}
        columns={columns}
        title={() => <div>博客列表</div>}
        loading={isLoading}
        rowKey={(record, index) => `complete${record.id}${index}`}
      />
    </div>
  )
}

export default ManageArticle