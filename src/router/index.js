import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    // 登录
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "login" */ '@/pages/login.vue')
    },
    {
      path: '/',
      redirect: '/login'
    },
    // 注册
    {
      path: '/register',
      name: 'register',
      component: () => import(/* webpackChunkName: "register" */ '@/pages/register.vue'),
      meta: {
        title: [{
          titleName: '注册',
          toPath: '/register'
        }],
        goBack: '/login',
        goBackShow: true,
        headerHide: false,
        footerShow: false
      }
    },
    {
      path: '/home',
      name: 'home',
      redirect: '/comm-home',
      component: () => import(/* webpackChunkName: "home" */ '@/pages/home.vue'),
      children: [
        // 首页
        {
          path: '/comm-home',
          name: 'comm-home',
          component: () => import(/* webpackChunkName: "comm-home" */ '@/pages/comm-home/index.vue'),
          meta: {
            title: [{
              titleName: ''
            }],
            headerHide: true,
            footerShow: true
          }
        },
        // 搜索页
        {
          path: '/search',
          name: 'search',
          component: () => import(/* webpackChunkName: "comm-home" */ '@/pages/search/search.vue'),
          meta: {
            title: [{
              titleName: ''
            }],
            headerHide: true,
            footerShow: false
          }
        },
        // 商品详情
        {
          path: '/comm-detail',
          name: 'comm-detail',
          component: () => import(/* webpackChunkName: "comm-detail" */ '@/pages/comm-detail/index.vue'),
          meta: {
            title: [
              {
                titleName: '商品',
                toPath: '/comm-detail',
                active: true
              },
              {
                titleName: '评价',
                toPath: '/comm-evaluate'
              }
            ],
            goBack: -1,
            goBackShow: true,
            headerHide: false,
            footerShow: false
          }
        },
        // 商品评价
        {
          path: '/comm-evaluate',
          name: 'comm-evaluate',
          component: () => import(/* webpackChunkName: "comm-evaluate" */ '@/pages/comm-evaluate/index.vue'),
          meta: {
            title: [
              {
                titleName: '商品评价',
                toPath: '/comm-evaluate'
              }
            ],
            goBack: -1,
            goBackShow: true,
            headerHide: false,
            footerShow: false
          }
        },
        // 商品分类
        {
          path: '/comm-classify',
          name: 'comm-classify',
          component: () => import(/* webpackChunkName: "comm-classify" */ '@/pages/comm-classify/index.vue'),
          meta: {
            title: [
              {
                titleName: '商品分类',
                toPath: '/comm-classify'
              }
            ],
            goBack: '/comm-home',
            goBackShow: false,
            headerHide: false,
            footerShow: true
          }
        },
        // 购物车
        {
          path: '/shop-car',
          name: 'shop-car',
          component: () => import(/* webpackChunkName: "shop-car" */ '@/pages/shop-car/index.vue'),
          meta: {
            title: [
              {
                titleName: '购物车',
                toPath: '/shop-car'
              }
            ],
            goBack: -1,
            goBackShow: true,
            headerHide: false,
            footerShow: true
          }
        },
        // 我的
        {
          path: '/mine',
          name: 'mine',
          component: () => import(/* webpackChunkName: "mine" */ '@/pages/mine/index.vue'),
          meta: {
            title: [
              {
                titleName: '我的',
                toPath: '/mine'
              }
            ],
            goBack: '/comm-home',
            goBackShow: false,
            headerHide: false,
            footerShow: true
          }
        },
        // 订单列表
        {
          path: '/order-list',
          name: 'order-list',
          component: () => import(/* webpackChunkName: "order-list" */ '@/pages/order-list/index.vue'),
          meta: {
            title: [
              {
                titleName: '我的订单',
                toPath: '/order-list'
              }
            ],
            goBack: '/mine',
            goBackShow: true,
            headerHide: false,
            footerShow: true
          }
        },
        // 修改密码
        {
          path: '/change-password',
          name: 'change-password',
          component: () => import(/* webpackChunkName: "change-password" */ '@/pages/change-password/index.vue'),
          meta: {
            title: [
              {
                titleName: '修改密码',
                toPath: '/change-password'
              }
            ],
            goBack: '/mine',
            goBackShow: true,
            headerHide: false,
            footerShow: false
          }
        },
        // 新增收货地址
        {
          path: '/add-adress',
          name: 'add-adress',
          component: () => import(/* webpackChunkName: "change-password" */ '@/pages/add-adress/index.vue'),
          meta: {
            title: [
              {
                titleName: '新增收货地址',
                toPath: '/add-adress'
              }
            ],
            goBack: '/change-adress',
            goBackShow: true,
            headerHide: false,
            footerShow: false
          }
        },
        // 选择收货地址
        {
          path: '/select-adress',
          name: 'select-adress',
          component: () => import(/* webpackChunkName: "change-password" */ '@/pages/select-adress/index.vue'),
          meta: {
            title: [
              {
                titleName: '选择收货地址',
                toPath: '/select-adress'
              }
            ],
            goBack: -1,
            goBackShow: true,
            headerHide: false,
            footerShow: false
          }
        },
        // 编辑收货地址
        {
          path: '/edit-adress',
          name: 'edit-adress',
          component: () => import(/* webpackChunkName: "change-password" */ '@/pages/edit-adress/index.vue'),
          meta: {
            title: [
              {
                titleName: '编辑收货地址',
                toPath: '/edit-adress'
              }
            ],
            goBack: '/change-adress',
            goBackShow: true,
            headerHide: false,
            footerShow: false
          }
        },
        // 修改店铺邀请码
        {
          path: '/change-store-code',
          name: 'change-store-code',
          component: () => import(/* webpackChunkName: "change-store-code" */ '@/pages/change-store-code/index.vue'),
          meta: {
            title: [
              {
                titleName: '修改店铺邀请码密码',
                toPath: '/change-store-code'
              }
            ],
            goBack: '/mine',
            goBackShow: true,
            headerHide: false,
            footerShow: false
          }
        },
        // 修改店铺地址
        {
          path: '/change-adress',
          name: 'change-adress',
          component: () => import(/* webpackChunkName: "change-store-code" */ '@/pages/change-adress/index.vue'),
          meta: {
            title: [
              {
                titleName: '修改收货地址',
                toPath: '/change-adress'
              }
            ],
            goBack: '/mine',
            goBackShow: true,
            headerHide: false,
            footerShow: false
          }
        },
        // 订单详情
        {
          path: '/order-detail',
          name: 'order-detail',
          component: () => import(/* webpackChunkName: "order-detail" */ '@/pages/order-detail/index.vue'),
          meta: {
            title: [
              {
                titleName: '订单详情',
                toPath: '/order-detail'
              }
            ],
            goBack: '/order-list',
            goBackShow: true,
            headerHide: false,
            footerShow: false
          }
        },
        // 确认订单
        {
          path: '/confirm-order',
          name: 'confirm-order',
          component: () => import(/* webpackChunkName: "order-detail" */ '@/pages/confirm-order/index.vue'),
          meta: {
            title: [
              {
                titleName: '确认订单',
                toPath: '/confirm-order'
              }
            ],
            goBack: -1,
            goBackShow: true,
            headerHide: false,
            footerShow: false
          }
        },
        // 订单评价
        {
          path: '/order-evaluate',
          name: 'order-evaluate',
          component: () => import(/* webpackChunkName: "order-evaluate" */ '@/pages/order-evaluate/index.vue'),
          meta: {
            title: [
              {
                titleName: '订单评价',
                toPath: '/order-evaluate'
              }
            ],
            goBack: '/order-list',
            goBackShow: true,
            headerHide: false,
            footerShow: false
          }
        },
        {
          path: '/driver-info',
          name: 'driver-info',
          component: () => import(/* webpackChunkName: "order-evaluate" */ '@/pages/driver-info/index.vue'),
          meta: {
            title: [
              {
                titleName: '司机信息',
                toPath: '/driver-info'
              }
            ],
            goBack: '/',
            goBackShow: false,
            headerHide: false,
            footerShow: true
          }
        },
        {
          path: '/driver-shop-info',
          name: 'driver-shop-info',
          component: () => import(/* webpackChunkName: "order-evaluate" */ '@/pages/driver-shop-info/index.vue'),
          meta: {
            title: [
              {
                titleName: '负责门店信息',
                toPath: '/driver-shop-info'
              }
            ],
            goBack: '/',
            goBackShow: false,
            headerHide: false,
            footerShow: true
          }
        }
      ]
    }
  ]
})
