<template>
  <div id="app">
      <div class="app-content">
        <!-- <Spin size="large" fix v-if="appLoading"></Spin> -->
        <transition name="fade" mode="out-in" appear>
          <router-view />
        </transition>
      </div>
    </Layout>
  </div>
</template>
<script>
// import { mapState } from 'vuex';
export default {
  // computed: {
  //   ...mapState(['appLoading'])
  // },
};
</script>

<style lang="less">
#app {
  .app-content {
    position: relative;
    background: #fff;
    min-height: 800px;
    z-index: 4;
  }
}
</style>
