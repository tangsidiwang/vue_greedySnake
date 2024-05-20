import {defineStore} from 'pinia'
import { reactive } from 'vue'


export const userWebStore =defineStore('wbe', ()=>{//wbe是命名空间
    const web = reactive({
        score_max: 0,
    })



    return {
        web,
  
    }
},
{
    persist:true//持久化
})