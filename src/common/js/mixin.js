import {mapGetters} from 'vuex'
export const isLogin = {
  mounted() {
    this.checkLogin()
  },
  computed: {
    ...mapGetters([
      'author'
    ])
  },
  methods: {
    checkLogin() {
      if (!Object.keys(this.author).length) {
        this.$router.push('signin')
      }
    }
  }
}
