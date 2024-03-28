import Footer from '@/components/Footer/Footer.vue'
import ContentTable from '@/components/ContentTable/ContentTable.vue'
import EchartView from '@/components/EchartView/EchartView.vue'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'

import * as ElementPlusIconsVue from '@element-plus/icons-vue'

export default {
  install: (app: any) => {
    app.component('Footer', Footer)
    app.component('ContentTable', ContentTable)
    app.component('EchartView', EchartView)
    app.use(ElementPlus)
    // 注册全局的el-icon图标
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component(key, component)
    }
  },
}
