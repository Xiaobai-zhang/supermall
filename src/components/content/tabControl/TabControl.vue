<template>
  <div id="tab-control">
    <div v-for="(item,index) in titles"
         class="tab-control-item" :class="{active:index === isActive}" @click="clickItem(index)">
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabControl",
  props:{
    titles:{
      type:Array,
      default(){
        return []
      }
    }
  },
  data(){
    return {
      isActive: 0
    }
  },
  methods:{
    clickItem(index){
      this.isActive = index
      this.$emit('tabClick',index)
    }
  }
}
</script>

<style scoped>
  #tab-control{
    display: flex;
    text-align: center;
  }
  .tab-control-item{
    flex: 1;
    height: 40px;
    line-height: 40px;
    font-size: 15px;
  }
  .tab-control-item span{
    padding: 5px;
  }
  .active{
    color: var(--color-high-text);
  }
  .active span{
    border-bottom: 3px solid var(--color-tint);
  }
</style>
