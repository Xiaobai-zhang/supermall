<template>
  <div class="recommend">
    <div v-for="item in recommends" class="recommend-item">
      <a :href="item.link">
        <img :src="item.image" alt="">
        <div class="text">{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
  export default {
    name: "RecommendView",
    props:{
      recommends:{
        type:Array,
        default(){
          return []
        }
      }
    }
  }
</script>

<style scoped>
.recommend{
  padding: 10px 0px 20px;
  width: 100%;
  display: flex;
  border-bottom: 1px solid #eeeeee;
}
.recommend-item{
  text-align: center;
  flex: 1;
}
.recommend-item img{
  width: 90%;
}
.recommend-item .text{
  margin: 5px 0px;
  font-size: 12px;
}
</style>
