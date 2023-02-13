<script setup>
import { defineComponent, ref } from 'vue'

const emit = defineEmits(["clickArticle"])
defineProps({
  items: {type:Array,default:[]},
})
defineComponent({
    name:'tree-view-item'
})


function click_link(item,event){
    try {
        console.log(event.target)
            console.log(event.target.nextElementSibling)
            let __input = event.target.nextElementSibling
            console.log(__input)
            __input.checked = !__input.checked;
    } catch(e) {}
    emit('clickArticle',item)
}

</script>

<template>
<ul class="treeViteItem">
    <li v-for="(item ,idx) of items" :key="idx">
            <span class="icon">
            <svg data-v-5c7d44f3="" class="svg-inline--fa fa-caret-down fa-w-10" aria-hidden="true" data-prefix="fas" data-icon="caret-down" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" data-fa-i2svg=""><path fill="currentColor" d="M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z"></path></svg>
            </span>
            <a href="javascript:;" :class="{article:item.path}" @click="click_link(item,$event)">
                {{item.title}}
            </a>
            <input type="checkbox">
        <tree-view-item v-if="item.children" :items="item.children" @clickArticle="click_link">
        </tree-view-item>
    </li>
</ul>
</template>

<style lang="scss" scoped>
@import '../style/treeViteItem.scss'
</style>
