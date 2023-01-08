<template>
  <div class="tab-bar-item" @click="itemClick">
    <div v-if="!isActive" class="item-icon"><slot name="item-icon"></slot></div>
    <div v-else class="item-active-icon"><slot name="item-active-icon"></slot></div>
    <div class="item-text" :style="activeStyle"><slot name="item-text"></slot></div>
  </div>
</template>

<script>
  export default {
    name: "TabBarItem",
    props: {
      path: {
        type: String,
        required: true
      },
      activeColor: {
        type: String,
        default: '#ff5777'
      }
    },
    methods: {
      itemClick() {
        this.$router.replace(this.path)
      }
    },
    computed: {
      isActive() {
        // -1是指this.$route.path与this.path字符不一样
        return this.$route.path.indexOf(this.path) !== -1
      },
      activeStyle() {
        return this.isActive ? {color: this.activeColor} : {}
      }
    }
  }
</script>

<style scoped>

</style>
