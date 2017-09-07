import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const Articles = (resolve) => {
  import('components/articles/articles').then((module) => {
    resolve(module)
  })
}
const Listitem = (resolve) => {
  import('components/listitem/listitem').then((module) => {
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
      component: Articles
    },
    {
      path: '/articles/listitem/:id',
      name: 'articleitem',
      component: Listitem
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
    }
    // {
    //   path: '/singer',
    //   component: Singer,
    //   children: [
    //     {
    //       path: ':id',
    //       component: SingerDetail
    //     }
    //   ]
    // },
  ]
})
