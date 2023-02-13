<script setup lang="ts">

import { ref, computed, getCurrentScope, Ref ,onMounted} from "vue"
import treeViewVue from './components/treeView.vue';
import tabBarVue from './components/tabBar.vue';
//import { createMarkdownRenderer, fetch_md } from '../tools/markdown'
import { tabItem } from './interface'
import {get_md} from './myAxios'

type tabBarVueType = InstanceType<typeof tabBarVue>;

defineProps({
    links: []
})

//InstanceType<typeof ElForm>
const tabs:Ref<tabItem[]>  = ref([])

// 组件ref如何声明类型?
const TabBarRef = ref<null | tabBarVueType>(null)
const markdown = ref("")
const markdownToHtml = ref("**no content**")

function tab_change(item: tabItem): void {
    changeArtile(item.path || item.title)
    //console.log('fetch_md')
    //fetch_md(item.path).then((md: string) => {
    //    markdownToHtml.value = md
    //})

    get_md(item.path).then( (data )=>{
        console.log(data)
        markdownToHtml.value = data.__content
    })
}

var article = ref("")
// >> 事件处理
const changeArtile = (_article: string) => {
    article.value = _article
}
const deal_clickArticle = (item: tabItem) => {
    changeArtile(item.path || item.title)
    //tabs.value.push(item)
    TabBarRef.value.push_item(item);
}

//// ======> Global API
// API: 得到当前的ActiveTaB的信息
// { path, title,outputPath}
const getCurrentTabInfo = () => {
    return TabBarRef.value!.getCurrentTabInfo()
}

// API: 得到当前的版本号
const version = () => {
    return 'alpha 0.1';
}

// API 关闭 slide_Menu
// API 如果打开,就关闭 slide_Menu

//暴露的事件
defineExpose({ getCurrentTabInfo, version })


//加载完成后,渲染readme的内容
onMounted(()=>{
    deal_clickArticle({path:'readme.md',title:'首页'})
})

</script>

<template>
  <div class="main">
    <div class="sidebar">
        <treeViewVue :links="links" @clickArticle="deal_clickArticle" />
    </div>
    <div class="container" id="container">
        <div class="tabBar">
            <tab-bar-vue :tabs="tabs" @change="tab_change" ref="TabBarRef"/>
        </div>
        <div class="article-container">
            <span class="article-path"> {{ article }} </span>
            <div class="markdown-body" v-html="markdownToHtml"></div>
        </div>
    </div>
  </div>
</template>

<style scoped>

</style>
