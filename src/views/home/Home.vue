<template>
  <div id="home">
    <nav-bar class="home-nav">
      <template v-slot:center>
        <div>购物街</div>
      </template>
    </nav-bar>
    <tab-control class="tab-control"
                 ref="tabControl2"
                 :titles="['流行','新款','精选']"
                 @tabClick="tabClick" :class="{aaa:isTabFixed}"></tab-control>
    <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll" :pull-up-load="true" @pullingUp="loadMoreGoods">
      <home-swiper class="home-banner" :banners="banners" @swiperLoaded="swiperLoaded"></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view></feature-view>
      <tab-control ref="tabControl"
                   :titles="['流行','新款','精选']"
                   @tabClick="tabClick"></tab-control>
      <goods-list :goods="showGoods"></goods-list>
    </scroll>
    <back-top class="back-top" @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
import HomeSwiper from "@/views/home/childComps/HomeSwiper";
import RecommendView from "@/views/home/childComps/RecommendView";
import FeatureView from "@/views/home/childComps/FeatureView";

import NavBar from "@/components/common/navbar/NavBar";
import TabControl from "@/components/content/tabControl/TabControl";
import GoodsList from "@/components/content/goods/GoodsList";
import Scroll from "@/components/common/scroll/Scroll";

import {
  getHomeMultidata,
  getHomeGoods} from "@/network/home";
import {debounce} from "common/utilis";
import {backTopMinxin, itemListenerMinxin} from "@/common/mixin";

export default {
  name: "Home",
  components:{
    HomeSwiper,
    RecommendView,
    FeatureView,
    NavBar,
    TabControl,
    GoodsList,
    Scroll
  },
  mixins:[itemListenerMinxin,backTopMinxin],
  data(){
    return {
      banners:[],
      recommends:[],
      goods:{
        'pop':{page:0,list:[]},
        'new':{page:0,list: []},
        'sell':{page:0,list: []},
      },
      currentType:'pop',
      tabOffsetTop:0,
      isTabFixed:false,
      saveY:0,
      homeItemListener: null
    }
  },
  created() {
    //1.请求多个数据
    this.getHomeMultidata()
    //2.请求商品数据
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')
  },
  mounted() {
    // //1.图片加载完成的事件监听
    // const home = ref(0)
    // home.value = this
    // //item组件的事件总线事情
    // this.$bus.on('itemImageLoad',function (){
    //   debounce(home.value.$refs.scroll.refresh(),200)
    // })
  },
  activated() {
    this.$refs.scroll.scrollTo(0,this.saveY,0)
    this.$refs.scroll.refresh()
  },
  deactivated() {
    // this.saveY = -1000
    this.saveY = this.$refs.scroll.getScrollY()
    //取消图像监听函数
    this.homeItemListener = () => {
      debounce(home.value.$refs.scroll.refresh(),200)
    }
    this.$bus.off('itemImageLoad',this.homeItemListener)
  },
  computed:{
    showGoods(){
      return this.goods[this.currentType].list;
    }
  },
  methods:{
    //事件监听相关方法
    tabClick(index){
      switch (index){
        case 0 :
          this.currentType = 'pop'
          break;
        case 1 :
          this.currentType = 'new'
          break
        case 2 :
          this.currentType = 'sell'
      }
      this.$refs.tabControl2.isActive = index
      this.$refs.tabControl.isActive = index
    },
    contentScroll(position){
      //判断BackTop是否显示
      this.demo(position)
      //决定tabControl是否吸顶
      this.isTabFixed = -(position.y) > this.tabOffsetTop
    },
    loadMoreGoods(){
      this.getHomeGoods(this.currentType)

    },
    swiperLoaded(){
      this.tabOffsetTop = this.$refs.tabControl.$el.offsetTop;
    },
    //网络请求相关方法
    getHomeMultidata(){
      getHomeMultidata().then(res => {
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    getHomeGoods(type){
      const page = this.goods[type].page + 1;
      getHomeGoods(type,page).then(res => {
        //数组直接赋值会导致只有一页
        this.goods[type].list.push(...res.data.list)
        this.goods[type].page += 1
        this.$refs.scroll.finishPullUp()
      })
    }
  }
}
</script>

<style scoped>
/*scoped是作用域*/
  #home{
    height: 100vh;
    position: relative;
  /*  100vh是百分之百的视口 */
  }
  .home-nav{
    background-color: var(--color-tint);
    color: white;
    /*position: fixed;*/
    /*top: 0;*/
    /*left: 0;*/
    /*z-index: 999;*/
  }
  .home-banner{
    width: 100%;
    height: 170px;
  }
  /*当用scroll组件时该样式不起作用*/
  .tab-control{
    position: sticky;
    top: 44px;
    background-color: #fff;
    z-index: 9999;
    opacity: 0;
  }

/*  滚动 */
  .content{
    position: absolute;

    top: 44px;
    width: 100%;
    height: calc(100% - 93px);
    overflow: hidden;
  }

  .aaa{
    opacity: 1;
  }
</style>
