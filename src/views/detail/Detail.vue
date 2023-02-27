<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @title-click="titleClick" ref="detail-nav"></detail-nav-bar>
    <scroll class="detail-content" ref="scroll" @scroll="contentScroll" :probe-type="3">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
      <detail-param-info :paramInfo="paramInfo" ref="params"></detail-param-info>
      <detail-comment-info :comment-info="commentInfo" ref="comment"></detail-comment-info>
      <goods-list :goods="recommends" ref="recommend"></goods-list>
    </scroll>
    <detail-bottom-bar @addToCart="addToCart"></detail-bottom-bar>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
<!--    <toast :mesage="message" :show="show" class="toast"></toast>-->
  </div>
</template>

<script>

import DetailNavBar from "@/views/detail/childComps/DetailNavBar";
import DetailSwiper from "@/views/detail/childComps/DetailSwiper";
import DetailBaseInfo from "@/views/detail/childComps/DetailBaseInfo";
import DetailShopInfo from "@/views/detail/childComps/DetailShopInfo";
import DetailGoodsInfo from "@/views/detail/childComps/DetailGoodsInfo";
import DetailParamInfo from "@/views/detail/childComps/DetailParamInfo";
import DetailCommentInfo from "@/views/detail/childComps/DetailCommentInfo";
import DetailBottomBar from "@/views/detail/childComps/DetailBottomBar";

import Scroll from "components/common/scroll/Scroll";
import GoodsList from "components/content/goods/GoodsList";
import Toast from "@/components/common/toast/Toast";

import {getDetail,getRecommend,Goods,Shop,GoodsParam} from "@/network/detail";
import {itemListenerMinxin,backTopMinxin} from "@/common/mixin";
import {debounce} from "@/common/utilis";

import {mapActions} from 'vuex'

export default {
  name: "Detail",
  components:{
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailBottomBar,
    Scroll,
    GoodsList,
    Toast
  },
  mixins:[itemListenerMinxin,backTopMinxin],
  data(){
    return {
      iid : null,
      topImages:[],
      goods: {},
      shop:{},
      detailInfo:{},
      paramInfo:{},
      commentInfo:{},
      recommends:[],
      themeTopYs:[],
      getThemeTopY:null,
      currentIndex:0,
      message:'',
      show:false
    }
  },
  created() {
    //1.保存传入的iid
      this.iid = this.$route.params.iid
    //2.根据iid请求详情数据
      getDetail(this.iid).then(res => {
      //获取顶部图片数据
      const data = res.result
      this.topImages = data.itemInfo.topImages
      //获取商品详情信息
      this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services)
      //获取商家信息
      this.shop = new Shop(data.shopInfo)
    //  保存商品的详情数据
      this.detailInfo = data.detailInfo
      //保存商品参数信息
      this.paramInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule)
    // 取出评论的信息
      if(data.rate.cRate !== 0){
        this.commentInfo = data.rate.list[0]
      }
    }).catch(err=>{})
    //3.请求推荐数据
      getRecommend().then(res => {
        this.recommends = res.data.list
      })
  //  给getThemeTopY赋值(初始化)
      this.getThemeTopY = debounce(()=>{
      this.themeTopYs = []
      this.themeTopYs.push(0)
      this.themeTopYs.push(this.$refs.params.$el.offsetTop)
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
      this.themeTopYs.push(Number.MAX_VALUE)
    },100)
  },
  methods:{
    ...mapActions(['addCart']),
    imageLoad(){
      //刷新scroll总长度，未免图片后面加载出来，长度计算错误出现卡顿问题
      this.$refs.scroll.refresh()
      this.getThemeTopY()
    },
    titleClick(index){

      this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],200)
    },
    contentScroll(position){
      // 1.获取y值
      const  positionY = -position.y
    //  2.positionY和主题中值进行对比
      const length = this.themeTopYs.length
      for (let i = 0;i<length-1;i++) {
        if ((this.currentIndex !== i) && positionY > this.themeTopYs[i] && positionY < this.themeTopYs[i + 1]) {
          this.currentIndex = i
          this.$refs["detail-nav"].currentIndex = this.currentIndex
        }
      }
    //  3.Backtop根据Scroll滚动是否显示
      this.demo(position)
    },
    addToCart(){
      //1.获取购物车需要的信息
      console.log('------');
      const product = {}
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.realPrice;
      product.iid = this.iid;
    //  2.将商品添加到购物车里
      this.addCart(product).then(res => {
        this.show = true
        this.message = res;
        setTimeout(()=>{
          this.show = false;
          this.message = '';
        },1500)
        // this.$toast.show(res,1500)
      })
    //  3.添加到购物车成功

    }
  },
  mounted() {


  },
  unmounted() {
    this.$bus.off('itemImageLoad',this.itemImageListener)
  },
}
</script>

<style scoped>
#detail{
  position: relative;
  z-index: 999999;
  background-color: #ffffff;
  height: 100vh;
}
.detail-nav{
  position: relative;
  z-index: 999;
  background-color: #ffffff;
}
.detail-content{
  height: calc(100% - 93px);
  background-color: #fff;
  z-index: 99999;
}
</style>
