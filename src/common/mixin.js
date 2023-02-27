import {debounce} from "@/common/utilis";
import BackTop from "@/components/content/backTop/BackTop";


export const itemListenerMinxin = {
  data(){
    return {
      itemImageListener:null
    }
  },
  mounted(){
    let newRefresh = debounce(this.$refs.scroll.refresh,100)
    this.itemImageListener = () => {
      newRefresh()
    }
    this.$bus.on('itemImageLoad',this.itemImageListener)
  }
}

export const backTopMinxin = {
  data(){
    return {
      isShowBackTop : false
    }
  },
  components:{
    BackTop
  },
  methods:{
    backClick(){
      // refs可以直接访问子组件里面的数据
      this.$refs.scroll.scrollTo(0,0,500)
    },
    demo(position){
      this.isShowBackTop = -position.y > 1000
    }
  }
}

