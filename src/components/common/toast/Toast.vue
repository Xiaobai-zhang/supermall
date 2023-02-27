<template>
  <div class="toast" v-show="show">
    <div>
      {{mesage}}
    </div>
  </div>
</template>

<script>
export default {
  name: "Toast",
  data(){
    return {
      message:'',
      isShow:false
    }
  },
  methods:{
    show(message,duration){
      this.isShow = true;
      this.message = message
      setTimeout(()=>{
        this.isShow = false;
        this.message = ''
      },duration)
    }
  }
}
</script>

<style scoped>
  .toast{
    position: fixed;
    top: 50%;
    left: 50%;
    padding: 5px 10px;
    transform: translate(-50%);
    background-color: rgba(0,0,0,0.6);
    color: #ffffff;
  }
</style>
