import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

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

const Posts = (resolve) => {
  import('components/posts/posts').then((module) => {
    resolve(module)
  })
}

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/articles'
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
      component: resolve => require(['components/user/userinfo.vue'], resolve)
    }
  ]
})
