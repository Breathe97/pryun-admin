<template>
  <div class="login">
    <div class="page-title">
      <span>PR云科技有限公司</span>
    </div>
    <div class="login-bg"></div>
    <div class="login-content">
      <div class="left"></div>
      <div class="right g-blur">
        <div class="right-content">
          <div style="height: 200px"></div>
          <div class="title">
            <span>欢迎登录</span>
            <span style="font-size: 12px; margin-left: 8px; cursor: pointer; color: #999999; text-decoration: underline; text-underline-offset: 0.2em" @click="useTest">使用测试账号</span>
          </div>
          <div style="height: 40px"></div>
          <div class="mode-div">
            <div v-if="inf.mode === 'login'" class="mode-div-item">
              <div class="row-item">
                <div class="row-item-name">账号</div>
                <div class="row-item-input">
                  <el-input v-model="inf.account" placeholder="请输入账号" clearable @keyup.enter.native="login" />
                </div>
                <div class="row-item-span"></div>
              </div>
              <div style="height: 20px"></div>
              <div class="row-item">
                <div class="row-item-name">密码</div>
                <div class="row-item-input">
                  <el-input v-model="inf.password" placeholder="请输入密码" show-password clearable @keyup.enter.native="login" />
                </div>
                <div class="row-item-span"></div>
              </div>
              <div class="row-item" style="justify-content: space-between">
                <div class="tip-text" @click="inf.mode = 'loginBySms'">短信登录</div>
                <div class="tip-text" @click="open">忘记密码?</div>
              </div>
            </div>
            <div v-else-if="inf.mode === 'loginBySms'" class="mode-div-item">
              <div class="row-item">
                <div class="row-item-name">手机号</div>
                <div class="row-item-input">
                  <el-input v-model="inf.mobile" placeholder="请输入手机号" clearable @keyup.enter.native="login" />
                </div>
                <div class="row-item-span"></div>
              </div>
              <div style="height: 20px"></div>
              <div class="row-item">
                <div class="row-item-name">验证码</div>
                <div class="row-item-input">
                  <el-input v-model="inf.smsCode" placeholder="请输入验证码" clearable @keyup.enter.native="login" />
                </div>
                <div class="row-item-span"></div>
              </div>
              <div class="row-item" style="justify-content: space-between">
                <div class="tip-text" @click="inf.mode = 'login'">密码登录</div>
                <div class="tip-text" @click="open">收不到验证码?</div>
              </div>
            </div>
          </div>
          <div style="height: 20px"></div>
          <range v-model="rangeState"></range>
          <div style="height: 20px"></div>
          <div class="row-item">
            <el-button type="primary" :loading="loading" size="large" style="width: 100%" :disabled="Disabled" @click="login">立即登录</el-button>
          </div>
          <div style="flex: 1; height: 0"></div>
          <div class="tip-text" style="opacity: 0.5; pointer-events: none">PR云科技提供技术支持</div>
          <div style="height: 40px"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { StoreSystem } from '@/store/system'
import { StoreUser } from '@/store/user'
import { md5 } from 'pr-tools'
import * as authApi from '@/api/modules/auth'
import { ref, computed } from 'vue'
import range from './components/range/range.vue'
import { ElMessageBox, ElInput, ElButton } from 'element-plus'
import { useRouter } from 'vue-router'

const storeUser = StoreUser()
const storeSystem = StoreSystem()
const router = useRouter()

const rangeState = ref(false)

const loading = ref(false)
const inf = ref({
  mode: 'login', // loginBySms
  account: '', // 账号（用户名/手机号/邮箱）
  password: '', // 密码
  mobile: '', // 手机号码
  smsCode: '', // 短信验证码
})

// 使用测试账号
const useTest = () => {
  inf.value.mode = 'login'
  inf.value.account = 'pryun_test'
  inf.value.password = '123456'
}

const login = async () => {
  loading.value = true
  await new Promise((a) => setTimeout(() => a(true), 300))
  let _inf = { ...inf.value }
  _inf.password = md5(_inf.password)
  await authApi
    .login({ data: _inf })
    .then(async (res) => {
      // console.log('\x1b[38;2;0;151;255m%c%s\x1b[0m', 'color:#0097ff;padding:16px 0;', `------->Breathe:res`, res)
      const { code = 0, msg, data } = res
      if (code !== 200) {
        rangeState.value = false
        ElMessageBox.alert(msg, '提示', { confirmButtonText: '好的' })
      }
      storeUser.setToken(data.token || '')
      await storeSystem.init() // 初始化系统参数
      // 登录成功
      router.push('/')
    })
    .finally(() => {
      loading.value = false
      rangeState.value = false
    })
}

const open = () => {
  ElMessageBox.alert('该功能正在努力开发中~', '提示', { confirmButtonText: '好的' })
}

const Disabled = computed(() => {
  let active = true
  const { account, password } = inf.value
  if (account && password && rangeState.value) {
    active = false
  }
  return active
})
</script>
<style lang="scss" scoped>
.login {
  position: relative;
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  .login-bg {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: 0;
    background-image: url('./static/bg.jpg');
    background-repeat: no-repeat;
    background-size: auto auto;
    background-position: 0 0;
  }
  .login-content {
    position: relative;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: stretch;
    z-index: 1;
    .left {
      position: relative;
      width: 0;
      flex: 1;
      height: 100%;
    }
    .right {
      height: 100%;
      flex-shrink: 0;
      width: 26%;
      min-width: 440px;
      background-color: rgba(255, 255, 255, 0.8);
      // :deep(.el-button--primary) {
      //   background-color: rgba(65, 125, 255, 1);
      // }
      &::before {
        content: '';
        position: absolute;
        left: -200px;
        width: 200px;
        height: 100%;
        background: linear-gradient(to left, rgba(128, 128, 128, 0.1), rgba(128, 128, 128, 0));
      }
      .right-content {
        height: 100%;
        padding: 0 80px;
        display: flex;
        flex-direction: column;
        justify-content: center;
      }
    }
    @media (width <= 420px) {
      .right {
        min-width: 100vw;
      }
    }
  }
}
.page-title {
  position: absolute;
  left: 60px;
  top: 30px;
  height: 40px;
  z-index: 1;
  font-size: 32px;
  font-weight: bold;
  letter-spacing: 0.1em;
  &::after {
    content: 'PR YUN KE JI YOU XIAN GON GSI';
    white-space: nowrap;
    font-size: 18px;
    font-style: oblique;
    position: absolute;
    left: 0;
    bottom: -24px;
    letter-spacing: normal;
  }
}
.title {
  font-size: 24px;
}

.row-item {
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  min-height: 50px;
  line-height: 50px;
  :deep(.el-button) {
    --el-color-primary: rgba(65, 125, 255, 1);
    --el-button-hover-bg-color: rgba(65, 125, 255, 0.5);
  }
  .row-item-name {
    margin-right: 20px;
    min-width: 40px;
    transition: all 230ms ease-out;
  }

  .row-item-input {
    width: 0;
    flex: 1;
    :deep(.el-input) {
      .el-input__wrapper {
        box-shadow: none;
        background-color: transparent;
      }
      .el-input__wrapper:hover {
        box-shadow: none;
      }
      input:-webkit-autofill,
      textarea:-webkit-autofill,
      select:-webkit-autofill {
        -webkit-text-fill-color: #999999 !important;
        -webkit-box-shadow: 0 0 0px 1000px transparent inset !important;
        background-color: transparent;
        background-image: none;
        transition: background-color 50000s ease-in-out 0s; /*背景色透明  生效时长  过渡效果  启用时延迟的时间*/
      }
      input {
        background-color: transparent;
      }
    }
  }

  .row-item-span {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 1px;
    background-color: rgba(128, 128, 128, 1);
    pointer-events: none;
    transition: all 230ms ease-out;
  }
}
.tip-text {
  cursor: pointer;
  text-align: center;
  &:hover {
    color: rgba(65, 125, 255, 1);
  }
}
.row-item:focus-within {
  .row-item-span {
    background-color: rgba(65, 125, 255, 1);
  }
  .row-item-name {
    color: rgba(65, 125, 255, 1);
  }
}
</style>
