<script setup>
import { ref ,watch,defineProps,defineEmits,computed,defineExpose} from 'vue'

const checked = ref(-1)
const emit = defineEmits(['change','close'])


watch(
    ()=>checked.value,
    (val,old) => {
        emit("change",tabs.value[val])
        //emit("update:modelValue",val) //当 选中的index改变时,
    }
)
const tabs = ref([])
defineProps({
  //tabs: [],
})

function tab_click() {
    console.log(tab_click)
}

function ulWheel(e) {
    console.log(e)
}

//关闭的事件
function event_close(){
}

//添加子方法
const push_item = (item)=>{
    for( let [idx,{path}] of tabs.value.entries()) {
        if( path == item.path){
            checked.value = idx
            return;
        }
    }
    tabs.value.push(item)
    checked.value = tabs.value.length-1
}

// API
const getCurrentTabInfo = () => {
    //console.log(checked.value)
    //console.log(tabs.value[checked.value])
    return tabs.value[checked.value]
}

//删除一个元素的方法
const slice_item = (idx,e) =>{
    e.stopPropagation()
    console.log(idx)
    tabs.value.splice(idx,1)
    if( idx - 1 >= 0)
        checked.value = idx-1
    else if(tabs.value.length > 0)
        checked.value = 0
}

const set_last_active = () =>{}

defineExpose({push_item,set_last_active,getCurrentTabInfo})

</script>/

<template>
<ul class="tabBar-ul" @wheel.prevent="ulWheel">
    <li v-for="(item,index) of tabs" :key="index">
        <input type="radio" :id="'tab-'+index" name="tab" :value="index" v-model="checked">
        <label class="tab" :for="'tab-'+index"> {{`${index+1}: ` + item.title}} 
        <span class="close_icon" @click.stop="slice_item(index,$event)">x</span>
        </label>
    </li>
</ul>
<div class="treeViteItem-bottom-bar"></div>
</template>

<style scoped lang="scss">
@import '../style/tabBar.scss';
</style>
