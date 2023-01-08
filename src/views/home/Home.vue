<template>
  <div id="home">
    <nav-bar class="home-nav">
      <template v-slot:center>
        <div>购物街</div>
      </template>
    </nav-bar>
    <home-swiper class="home-banner" :banners="banners"></home-swiper>
    <recommend-view :recommends="recommends"></recommend-view>
  </div>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar";
import HomeSwiper from "@/views/home/childComps/HomeSwiper";
import RecommendView from "@/views/home/childComps/RecommendView";
import {getHomeMultidata} from "@/network/home";
export default {
  name: "Home",
  components:{
    NavBar,
    HomeSwiper,
    RecommendView
  },
  data(){
    return {
      banners:[],
      recommends:[]
    }
  },
  created() {
    getHomeMultidata().then(res => {
      this.banners = res.data.banner.list;
      this.recommends = res.data.recommend.list;
    })
  }
}
</script>

<style scoped>
.home-nav{
  background-color: var(--color-tint);
  color: white;
}
.home-banner{
  width: 100%;
  height: 170px;
}
</style>
