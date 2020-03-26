import {
  Dashboard,
  AddArticle,
  Login,
  NotFound,
  ManageArticle
} from './pages'
import { DashboardOutlined, EditOutlined, OrderedListOutlined } from '@ant-design/icons'

export default [
  {
    path: '/login',
    title: '登录',
    exact: false,
    component: Login,
    auth: false,
    hidden: true
  },
  {
    path: '/404',
    exact: false,
    component: NotFound,
    auth: false,
    hidden: true
  },
  {
    path: '/',
    title: '首页',
    icon: DashboardOutlined,
    exact: true,
    component: Dashboard,
    auth: true,
  },
  {
    path: '/list',
    title: '博客列表管理',
    icon: OrderedListOutlined,
    exact: false,
    component: ManageArticle,
    auth: true,
  },
  {
    path: '/add',
    title: '发布文章',
    icon: EditOutlined,
    exact: true,
    component: AddArticle,
    auth: true
  },
  {
    path: '/add/:id',
    title: '编辑文章',
    icon: EditOutlined,
    exact: true,
    component: AddArticle,
    hidden: true,
    auth: true
  },
]