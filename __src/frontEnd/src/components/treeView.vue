<script setup>
import { ref } from 'vue'
import treeViewItem from './treeViewItem.vue'

import bars from '../assets/bars.svg'

defineProps({
  links: {type:Array,default:[]},
  prefixId:""
})

// 二级菜单Dom Ref
const secondMenuRef = ref(null)


// >> method
function toggle_radio(self){
    //if( self.target.nextElementSibling.checked == true)
     //   self.target.nextElementSibling.checked = false;
    let id = self.target.getAttribute('data')
    let radio_dom = self.target.parentNode.parentNode.querySelectorAll('#'+id)[0]
    radio_dom.checked = !radio_dom.checked
    if( self.target.classList.contains('active')){
        self.target.classList.remove('active')
        return;
    }

    self.target.parentNode.querySelectorAll('.active').forEach( e => e.classList.remove('active'))
    self.target.classList.add('active')
}

const emit = defineEmits(["clickArticle"])

// >> method event
function deal_clickArticle(item) {
    emit("clickArticle",item)
}

function fake_mask_click() {
    let radioCheckeds = secondMenuRef.value.querySelectorAll('input[type="radio"]:checked')
    radioCheckeds.forEach( e => {e.checked = false})
    
}


</script>

<template>
<div class="treeview-container">

    <div style="z-index:301;" ref="secondMenuRef">
        <div class="fake-mask" @click="fake_mask_click"></div>
        <template v-for="(link,idx) of links" :key="'prefixId' + '-'+idx">
                <!-- 每一个一级文件对应的radio, radio的作用通过css控制二级menu的显示-->
                <input type="radio" :id="'vTree'+idx" name="treeView-name">
                <div class="vTree-menu">
                    <tree-view-item :items="link.children"  @clickArticle="deal_clickArticle"/>
                </div>
        </template>
    </div>

    <!-- 透明的fake-mask 层,作用:点击这一层就会让展开的二级目录关闭 -->

    <!-- mask 覆盖在一级目录上层, z-index最高 -->
    <div class="mask">
        <label for="treeview-show" class="toggle-bar"> 
            <bars/>
        </label>
        <input type="checkbox" id="treeview-show"/>

        <!-- label显示一级目录的名字,点击切换上面对应radio的值 -->
        <label v-for="(link,idx) of links" :data="'vTree'+idx" @click="toggle_radio($event)"> {{link.title}} </label>
    </div>
</div>
</template>

<style lang="scss" scoped>
@import "../style/treeView.scss"
</style>
