<template>
  <div id="goods">
    <goods-list-item class="goodsItem" v-for="item in goods" :goods-item ="item"></goods-list-item>
  </div>
</template>

<script>
import GoodsListItem from "@/components/content/goods/GoodsListItem";
export default {
  name: "GoodsList",
  props:{
    goods:{
      type:Array,
      default(){
        return []
      }
    }
  },
  components:{
    GoodsListItem
  }
}
</script>

<style scoped>
  #goods{
    display: flex;
    flex-wrap: wrap;
    padding: 5px;
    justify-content: space-around;
    background-color: #fff;
  }
  .goodsItem{
    width: 48%;
  }
</style>
