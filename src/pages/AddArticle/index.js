import React, { useState, useEffect } from 'react'
import Marked from 'marked'
import { Row, Col, Input, Select, Button, DatePicker, message } from 'antd'
import servicePath from '../../api'
import axios from 'axios'
import moment from 'moment'
import hljs from 'highlight.js'

const { Option } = Select
const { TextArea } = Input

const AddArticle = (props) => {
  const [articleId, setArticleId] = useState(0)
  const [articleTitle, setArticleTitle] = useState('')
  const [articleContent, setArticleContent] = useState('')
  const [markdownContent, setMarkdownContent] = useState('Preview Markdown')
  const [introduceMarkdown, setIntroduceMarkdown] = useState('Introduce Markdown')
  const [introduceHtml, setIntroduceHtml] = useState('')
  const [publicDate, setPublicDate] = useState(moment())
  const [typeInfo, setTypeInfo] = useState([])
  const [selectedType, setSelectedType] = useState(1)

  useEffect(() => {
    getTypeInfo()
    if (props.match.params.id) {
      getArticleById(props.match.params.id)
    }
  }, [props.match.params.id])

  Marked.setOptions({
    renderer: new Marked.Renderer(),
    gfm: true,
    pedantic: false,
    sanitize: false,
    tables: true,
    breaks: false,
    smartLists: true,
    smartypants: false,
    highlight: function (code) {
      return hljs.highlightAuto(code).value;
    }
  })

  const getTypeInfo = () => {
    axios({
      method: 'post',
      url: servicePath.GET_TYPE_INFO
    }).then(res => {
      setTypeInfo(res.data.data)
    })
  }

  const getArticleById = (id) => {
    axios({
      method: 'post',
      url: servicePath.GET_ARTICLE_BY_ID + id,
    }).then(res => {
      const { Id: id, type_id, title, article_content, introduce, addTime } = res.data.data
      setArticleId(id)
      setArticleTitle(title)
      setSelectedType(type_id)
      setArticleContent(article_content)
      setMarkdownContent(Marked(article_content))
      setIntroduceHtml(introduce)
      setIntroduceMarkdown(Marked(introduce))
      setPublicDate(moment(addTime * 1000))
    })
  }

  const changeContent = e => {
    setArticleContent(e.target.value)
    let html = Marked(e.target.value)
    setMarkdownContent(html)
  }

  const changeIntroduce = e => {
    setIntroduceHtml(e.target.value)
    let html = Marked(e.target.value)
    setIntroduceMarkdown(html)
  }

  const PublicArticle = () => {
    if (!selectedType) {
      message.error('请选择文章类型')
      return false
    } else if (!articleTitle) {
      message.error('文章标题不能为空')
      return false
    } else if (!articleContent) {
      message.error('文章内容不能为空')
      return false
    } else if (!introduceHtml) {
      message.error('文章简介不能为空')
      return false
    } else if (!publicDate) {
      message.error('请选择发布日期')
      return false
    }

    const dataProps = {
      type_id: selectedType,
      title: articleTitle,
      article_content: articleContent,
      introduce: introduceHtml,
      addTime: publicDate.unix()
    }
    if (articleId == 0) {
      axios({
        method: 'post',
        url: servicePath.ADD_ARTICLE,
        data: dataProps,
      }).then(res => {
        setArticleId(res.data.insertId)
        if (res.data.isSuccess) {
          message.success('发布成功')
        } else {
          message.error('发布失败')
        }
      })
    } else {
      dataProps.id = articleId
      axios({
        method: 'post',
        url: servicePath.UPDATE_ARTICLE,
        data: dataProps,
      }).then(res => {
        if (res.data.isSuccess) {
          message.success('更新成功')
        } else {
          message.error('更新失败')
        }
      })
    }
  }

  return (
    <div className="public-article-container">
      <Row gutter={5}>
        <Col
          span={18}
        >
          <Row gutter={10} className="title-group">
            <Col span={20}>
              <Input
                value={articleTitle}
                onChange={e => setArticleTitle(e.target.value)}
                placeholder="博客标题"
                size="large"
              />
            </Col>
            <Col span="4">
              <Select onChange={(value) => setSelectedType(value)} value={selectedType} defaultValue={selectedType} size="large">
                {typeInfo.map(type => (
                  <Option key={type.Id} value={type.Id}>{type.typeName}</Option>
                ))}
              </Select>
            </Col>
          </Row>
          <Row gutter={10}>
            <Col span={12}>
              <TextArea
                className="markdown-content"
                row={35}
                placeholder="文章内容"
                value={articleContent}
                onChange={changeContent}
              />
            </Col>
            <Col span={12}>
              <div
                className="markdown-preview"
                dangerouslySetInnerHTML={{ __html: markdownContent }}
              />
            </Col>
          </Row>
        </Col>
        <Col
          span={6}
        >
          <Row>
            <Col span={24}>
              <TextArea
                row={4}
                className="introduce-content"
                placeholder="文章简介"
                value={introduceHtml}
                onChange={changeIntroduce}
              />
              <div
                className="introduce-preview"
                dangerouslySetInnerHTML={{ __html: introduceMarkdown }}
              >
              </div>
            </Col>
            <Col span={12}>
              <div className="date-select">
                <DatePicker
                  placeholder="发布日期"
                  size="large"
                  value={publicDate}
                  onChange={(date, dateString) => setPublicDate(date)}
                ></DatePicker>
              </div>
            </Col>
            <Col span={24}>
              <Button type="primary" size="large" onClick={PublicArticle}>发布文章</Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  )
}

export default AddArticle