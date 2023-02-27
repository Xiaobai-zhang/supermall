<template>
  <div class="bottom-menu">
    <div class="check-content">
      <check-button
        class="check-button"
        :is-checked="isSelectAll"
        @click.native = "checkClick"
      ></check-button>
      <span>全选</span>
    </div>
    <div class="price">
      合计:{{totalPrice}}
    </div>
    <div class="calculate" @click="calcClick">
      去计算:{{checkLength}}
    </div>
  </div>
</template>

<script>
  import CheckButton from "@/components/content/checkButton/CheckButton";
  import { mapGetters } from 'vuex'

	export default {
		name: "BottomBar",
    components: {
		  CheckButton
    },
    computed: {
      ...mapGetters(['cartList']),
      totalPrice(){
        return this.$store.state.cartList.filter(item => {
          return item.checked
        }).reduce((preValue,item) => {
          return preValue + item.price * item.count
        },0).toFixed(2)
      },
      checkLength(){
        return this.cartList
          .filter( item => item.checked)
          .reduce((preValue,item) => {
            return preValue + item.count
          },0)
      },
      isSelectAll(){
        return this.cartList.length!=0 && this.cartList.length == this.cartList.filter(item => item.checked).length
      }
    },
    methods: {
      checkClick(){
        if(this.isSelectAll){
          this.cartList.filter(item => item.checked = false)
        }else {
          this.cartList.filter(item => item.checked = true)
        }
      },
      calcClick(){
        if(!this.isSelectAll){

        }
      }
    }
	}
</script>

<style scoped>
  .bottom-menu {
    height: 40px;
    width: 100%;
    background-color: #eeeeee;
    position: fixed;
    left: 0;
    bottom: 49px;
    line-height: 40px;
    display: flex;
    font-size: 14px;
  }
  .check-content{
    margin-left: 10px;
    display: flex;
    width: 60px;
  }
  .check-button{
    margin-top: 10px;
    margin-right: 5px;
    width: 20px;
    height: 20px;
    line-height: 20px;
  }

  .price{
    margin-left: 20px;
    flex: 1;
  }

  .calculate{
    width: 90px;
    background-color: red;
    color: #ffffff;
    text-align: center;
  }
</style>
