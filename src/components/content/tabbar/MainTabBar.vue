<template>
  <tab-bar id="tab-bar">
    <tab-bar-item path="/home" activeColor="blue">
      <template v-slot:item-icon>
        <img  src="~assets/img/tabbar/home.svg" alt="">
      </template>
      <template v-slot:item-active-icon>
        <img  src="~assets/img/tabbar/home_active.svg" alt="">
      </template>
      <template v-slot:item-text>
        <div>首页</div>
      </template>
    </tab-bar-item>
    <tab-bar-item path="/category" activeColor="pink">
      <template #item-icon>
        <img  src="~assets/img/tabbar/category.svg" alt="">
      </template>
      <template v-slot:item-active-icon>
        <img  src="~assets/img/tabbar/category_active.svg" alt="">
      </template>
      <template v-slot:item-text>
        <div>分类</div>
      </template>
    </tab-bar-item>
    <tab-bar-item path="/cart" activeColor="blue">
      <template #item-icon>
        <img  src="~assets/img/tabbar/shopcart.svg" alt="">
      </template>
      <template v-slot:item-active-icon>
        <img  src="~assets/img/tabbar/shopcart_active.svg" alt="">
      </template>
      <template v-slot:item-text>
        <div>购物车</div>
      </template>
    </tab-bar-item>
    <tab-bar-item path="/profile" activeColor="blue">
      <template #item-icon>
        <img  src="~assets/img/tabbar/profile.svg" alt="">
      </template>
      <template v-slot:item-active-icon>
        <img  src="~assets/img/tabbar/profile_active.svg" alt="">
      </template>
      <template v-slot:item-text>
        <div>我的</div>
      </template>
    </tab-bar-item>
  </tab-bar>
</template>
<script>
  import TabBar from 'components/common/tabbar/TabBar'
  import TabBarItem from "@/components/common/tabbar/TabBarItem";

  export default {
    name: "MainTabBar",
    components: {
      TabBar,
      TabBarItem
    }
  }
</script>

<style scoped>
#tab-bar{
  position: fixed;
  bottom: 0px;
  left: 0px;
  z-index: 11111;
}
.tab-bar-item {
  flex: 1;
  text-align: center;
  height: 49px;
  font-size: 14px;
}

.tab-bar-item .item-icon img, .item-active-icon img {
  margin-top: 3px;
  width: 24px;
  height: 24px;
  vertical-align: middle;
  margin-bottom: 2px;
}
</style>
