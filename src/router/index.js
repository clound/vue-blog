import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const Welcome = (resolve) => {
  import('components/Welcome/welcome').then((module) => {
    resolve(module)
  })
}
const Articles = (resolve) => {
  import('components/articles/articles').then((module) => {
    resolve(module)
  })
}
const ArticleDetail = (resolve) => {
  import('components/article-detail/article-detail').then((module) => {
    resolve(module)
  })
}
const Product = (resolve) => {
  import('components/product/product').then((module) => {
    resolve(module)
  })
}
const ProductDetail = (resolve) => {
  import('components/product-detail/product-detail').then((module) => {
    resolve(module)
  })
}
const selfArticles = (resolve) => {
  import('components/selfArticles/selfArticles').then((module) => {
    resolve(module)
  })
}
const selfcomments = (resolve) => {
  import('components/selfcomments/selfcomments').then((module) => {
    resolve(module)
  })
}

const Posts = (resolve) => {
  import('components/posts/posts').then((module) => {
    resolve(module)
  })
}

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/welcome',
      component: Welcome
    },
    {
      path: '/',
      name: 'articles',
      redirect: '/articles'
    },
    {
      path: '/selfs',
      name: 'selfs',
      component: resolve => require(['components/selfs'], resolve)
    },
    {
      path: '/product',
      component: Product,
      children: [
        {
          path: ':id',
          name: 'product-detail',
          component: ProductDetail
        }
      ]
    },
    {
      path: '/articles',
      component: Articles,
      children: [
        {
          path: ':id',
          name: 'article-detail',
          component: ArticleDetail
        }
      ]
    },
    {
      path: '/posts',
      component: Posts
    },
    {
      path: '/signin',
      component: resolve => require(['components/user/signin.vue'], resolve)
    },
    {
      path: '/signup',
      component: resolve => require(['components/user/signup.vue'], resolve)
    },
    {
      path: '/my',
      component: resolve => require(['components/user/userinfo.vue'], resolve),
      children: [
        {
          path: 'selfarticles',
          name: 'selfarticles',
          component: selfArticles
        }, {
          path: 'selfcomments',
          name: 'selfcomments',
          component: selfcomments
        }
      ]
    },
    {
      path: '/chatrooms',
      component: resolve => require(['components/chatroom/chatroom.vue'], resolve)
    }
  ]
})
