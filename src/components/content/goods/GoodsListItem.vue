<template>
  <div id="goodsListItem" @click="goodsItemClick">
    <img :src="showImage" alt="" @load="imageLoad" :key="showImage">
    <div class="info">
      <p>{{goodsItem.title}}</p>
      <span class="price">{{goodsItem.price}}</span>
      <span class="collect">{{goodsItem.cfav}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "GoodsListItem",
  props:{
    goodsItem:{
      type: Object,
      default(){
        return {}
      }
    }
  },
  computed:{
    showImage(){
      return this.goodsItem.image || this.goodsItem.show.img;
    }
  },
  methods:{
    imageLoad(){
      this.$bus.emit('itemImageLoad')
    },
    goodsItemClick(){
      this.$router.push('/detail/'+this.goodsItem.iid)
    }
  }
}
</script>

<style scoped>
#goodsListItem{
  padding-bottom: 10px;
}
#goodsListItem img {
  width: 100%;
  height: 85%;
  border-radius: 5px;
}
.info{
  text-align: center;
  font-size: 10px;
}
.info p{
  margin-bottom: 5px;
  font-size: 10px;
  color: var(--color-text);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.price{
  font-size: 10px;
  color: var(--color-high-text);
  margin-right: 20px;
}
.collect{
  position: relative;
}
.info .collect::before{
  content: '';
  position: absolute;
  left: -15px;
  top: -1px;
  width: 14px;
  height: 14px;
  background: url("~assets/img/common/collect.svg") 0 0/14px 14px;

}
</style>
