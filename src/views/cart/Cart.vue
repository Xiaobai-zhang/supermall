<template>
  <div class="cart">
<!--    导航-->
    <nav-bar class="cart-nav">
      <template v-slot:center>
        <div class="cart-nav-center">购物车({{cartLength}})</div>
      </template>
    </nav-bar>
<!--    商品的列表-->
    <cart-list></cart-list>
<!--    底部汇总-->
    <cart-bottom-bar></cart-bottom-bar>
  </div>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar";

import CartList from "@/views/cart/childComps/CartList";
import CartBottomBar from "@/views/cart/childComps/CartBottomBar";

import {mapGetters} from "vuex"

export default {
  name: "Cart",
  components:{
    NavBar,
    CartList,
    CartBottomBar
  },
  computed:{
    ...mapGetters(['cartLength'])
  }
}
</script>

<style scoped>
  .cart-nav{
    background-color: var(--color-high-text);
    color: white;
    font-weight: 700;
    position: relative;
    top: 0;
    left: 0;
    z-index: 999;
  }
</style>
