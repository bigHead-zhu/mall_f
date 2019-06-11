<template>
  <div
    id="main"
    class="main">
    <!-- 导航菜单 start -->
   <!-- <navbar 
      :title="'账户设置'"
      :beforeback="true"
      :isbtn="true">
      <div slot="navimg">
        <img src="/go_back_left.png">
      </div>
    </navbar>  -->
    <!-- 导航菜单 end -->
    <!-- 主体内容 start -->
    <div
      ref="setting"
      class="center">
      <p class="title_one">个人资料</p>
      <ul>
        <li
          class="clearfloat"
          @click="imgmarkState = true">
          <span style="line-height:1rem">修改头像</span>
          <i style="margin-top:0.36rem"/>
          <p>
            <!-- <img :src="[userInfo.headimgurl?userInfo.headimgurl:'/icon_wodel.png']"> -->
          </p>
        </li>
       <!-- <li class="clearfloat">
          <span>昵称</span>
          <nuxt-link to="/set_nickname">
            <i/>
            <p>{{ userInfo.nickname }}</p>
          </nuxt-link>
        </li>
        <li class="clearfloat">
          <span>性别</span>
          <i/>
          <div
            class="sex">
            <div
              :class="isBoy?'':'active'"
              class="sex_woman"
              @click="_setSex(2)">
              <span/>
              <span>女</span>
            </div>
            <div
              :class="isBoy?'active':''"
              class="sex_man"
              @click="_setSex(1)">
              <span/>
              <span>男</span>
            </div>
          </div>
        </li>
        <li
          class="clearfloat"
          @click = "showpicker">
          <span>生日</span>
          <i/>
          <p>{{ userInfo.birthday || 'we' }}</p>
        </li>
        <li class="clearfloat">
          <span>地址管理</span>
          <nuxt-link to="address_list">
            <i/>
            <p>{{ userInfo.address_num }}个地址</p>
          </nuxt-link>
        </li> -->
      </ul>
      <p class="title_two">账号管理</p>
      <ul class="ul_two">
        <li
          class="clearfloat"
          @click="_setMobile"
        >
          <span>手机号</span>
          <i/>
          <p>{{ _getmobile(userInfo.mobile) }}</p>
        </li>
        <<!-- li class="clearfloat">
          <span>密码</span>
          <nuxt-link to="/reset_password">
            <i/>
            <p style="margin-top: 0.04rem">*******</p>
          </nuxt-link>
        </li> -->
      </ul>
    </div>
    <!-- 主体内容 end -->
    <!-- 弹出选择选 -->
    <div
      v-show="imgmarkState"
      ref="chooseImg"
      class="chooseImg"
      @click.stop="imgmarkState = false">
      <form
        enctype="multipart/form-data"
        method="post"
        name="fileinfo">
        <ul class="chooseImg_ul">
          <li class="album" >
            <input
              type="file"
              accept="image/*"
              class="flieimg1"
              name="img"
              @click.stop=""
              @change.stop="_upDataImg('.flieimg1')">
            我的相册
          </li>
          <li
            class="camera"
            @click.stop="">
            <input
              type="file"
              accept="image/*"
              class="flieimg2"
              name="img"
              @click.stop=""
              @change.stop="_upDataImg('.flieimg2')">
            拍照
          </li>
          <li
            class="rest"
            @click.stop="imgmarkState = false">取消</li>
        </ul>
      </form>
    </div>
    <!-- 弹窗 -->
    <!-- <message
      v-model="sendVal"
      :content="msgContent"
      type="message"
      timer="2000"/> -->
    <!-- 选择 -->
    <!-- <picker
      ref="picker"
      :data="dateList"
      :selected-index="selectedIndex"
      :cancel-txt="'取消'"
      :confirm-txt="'确定'"
      title="日期时间"
      @select="handleSelect(arguments)"
      @change="handleChange"/> -->
  </div>  
</template>
<script>
// import { base_service as Base } from '~/server/base.js'
// import navbar from '~/components/navbar.vue'
// import message from '~/components/message.vue'
// import picker from '~/components/picker.vue'
// import login from '~/server/login.js'
// import user from '~/server/user.js'

export default {
//   components: {
//     navbar,
//     message,
//     picker
//   },
  data() {
    return {
      sendVal: false,
      msgContent: '',
      userInfo: {}, //用户信息
      isBoy: true, //判断性别
      imgmarkState: false, //选择图片是否显示
      yearDate: [],
      monthDate: [],
      dayDate: [],
      selectedIndex: [10, 0, 0],
      selectyear: 0 //选中的年
    }
  },
  computed: {
    dateList() {
      return [this.yearDate, this.monthDate, this.dayDate]
    }
  },
  watch: {
    dateList() {
      this.$refs.picker.refresh()
    }
  },
  mounted() {
    let that = this
    that._getLoginUserInfo() //获取用户信息
    that._getClientHeight()
  },
  methods: {
    //获取用户信息
    _getLoginUserInfo() {
      let that = this
//       login.getLoginUserInfo().then(res => {
//         let code = res.data.retCode
//         if (code == 0) {
//           let data = res.data.data
//           that.userInfo = data
//           /* 性别 */
//           if (data.sex == '男' || data.sex == 1) {
//             that.isBoy = true
//           }
//           if (data.sex == '女' || data.sex == 2) {
//             that.isBoy = false
//           }
//         } else {
//           that._setMsgBox(res.data.message)
//         }
//       })
    },
    //切换性别
    _setSex(num) {
      this._userInfoUpdate({ sex: num })
    },
    //设置手机号
    _setMobile() {
      this._setMsgBox('请前往手机app修改')
    },
    //用户信息修改
    _userInfoUpdate(obj) {
      let that = this
      user.userInfoUpdate(obj).then(res => {
        let code = res.data.retCode
        if (code == 0) {
          that._getLoginUserInfo()
          that._setMsgBox('修改成功')
          that.imgmarkState = false
        } else {
          that._setMsgBox(res.data.message)
        }
      })
    },
    // 初始化
    _getTimeInit() {
      let that = this
      this._setDatePicker()
    },
    // 填充时间
    _setDatePicker(year = undefined, months = undefined) {
      let that = this
      let nowDate = that._getDates(year, months)
      that.yearDate.length = 0
      that.monthDate.length = 0
      that.dayDate.length = 0
      for (let i = nowDate.year - 5; i < nowDate.year + 5; i++) {
        that.yearDate.push({ text: i + '年', value: i })
      }
      for (let j = 1; j < 13; j++) {
        that.monthDate.push({
          text: j + '月',
          value: j,
          year: nowDate.year + '年'
        })
      }
      let mounthMax = that._getMonthCount(
        (year = nowDate.year),
        (months = nowDate.month)
      ).mounthMax
      for (let k = 1; k <= mounthMax; k++) {
        that.dayDate.push({
          text: k + '日',
          value: k,
          month: nowDate.month || 1 + '月'
        })
      }
      that.selectyear = that.yearDate[that.selectedIndex[0]]
    },
    // 获取时间 //year,month  不传值默认为当前的时间
    _getDates(year, month) {
      let that = this
      let dateO = new Date()
      if (year && month) {
        dateO = new Date(year, month)
      }
      return {
        year: dateO.getFullYear(),
        month: dateO.getMonth(),
        day: dateO.getDate(),
        date: dateO
      }
    },
    // 获取一个月有几天
    /*
    *obj.year 年
    *obj.month 月
    */
    _getMonthCount(year = 2018, month = 6, day = 0) {
      return {
        mounthMax: new Date(year, month, day).getDate(),
        firstDay: new Date(year, month - 1, '01').getDay()
      }
    },
    // 滑动选择
    handleChange(index, value) {
      let that = this
      switch (index) {
        case 0:
          that.$refs.picker.scrollTo(0, 5)
          that.$refs.picker.scrollTo(1, 0)
          that.$refs.picker.scrollTo(2, 0)
          that.selectedIndex[0] = 5
          that._setDatePicker(that.yearDate[value].value, value + 1)
          break
        case 1:
          that.$refs.picker.scrollTo(2, 0)
          that._setDatePicker(that.selectyear.value, value + 1)
          break
        case 2:
          break
        default:
          break
      }
    },
    // picker 弹出
    showpicker() {
      this.$refs.picker.show()
      this._getTimeInit()
    },
    // 修改时间
    handleSelect(index) {
      let data = index[2]
      let dataString = ''
      for (let i = 0; i < data.length; i++) {
        if (dataString == '') {
          dataString = parseInt(data[i])
        } else {
          dataString = dataString + '-' + parseInt(data[i])
        }
      }
      this._userInfoUpdate({ birthday: dataString })
    },
    // 上传图片
    _upDataImg(o) {
      let that = this
      let file = document.querySelector(o).files[0]
      // oMyForm.append("img", "Groucho");
      // let form = document.forms.namedItem("fileinfo");
      // let oMyForm = new FormData(form);
      if (file.size > 5242880) {
        that._setMsgBox('上传图片大小不超过5M ')
        return false
      }
      // that._changeUserInfo(oMyForm)
      that.canvasDataURL(file, 200, function(base64) {
        that._userInfoUpdate({ headimgurl: base64 })
      })
    },
    // 图片处理
    canvasDataURL(path, obj, callback) {
      let ready = new FileReader()
      let that = this
      /*开始读取指定的Blob对象或File对象中的内容. 当读取操作完成时,readyState属性的值会成为DONE,如果设置了onloadend事件处理程序,则调用之.同时,result属性中将包含一个data: URL格式的字符串以表示所读取文件的内容.*/
      ready.readAsDataURL(path)
      ready.onload = function() {
        let re = this.result
        let img = new Image()
        img.src = re
        img.onload = function() {
          let that = this
          // 默认按比例压缩
          let w = that.width,
            h = that.height,
            scale = w / h
          w = obj.width || w
          h = obj.height || w / scale
          let quality = 0.7 // 默认图片质量为0.7
          //生成canvas
          let canvas = document.createElement('canvas')
          let ctx = canvas.getContext('2d')
          // 创建属性节点
          let anw = document.createAttribute('width')
          anw.nodeValue = w
          let anh = document.createAttribute('height')
          anh.nodeValue = h
          canvas.setAttributeNode(anw)
          canvas.setAttributeNode(anh)
          ctx.drawImage(that, 0, 0, w, h)
          // 图像质量
          if (obj.quality && obj.quality <= 1 && obj.quality > 0) {
            quality = obj.quality
          }
          // quality值越小，所绘制出的图像越模糊
          let base64 = canvas.toDataURL('image/jpeg', quality)
          // 回调函数返回base64的值
          // base64 = that.dataURLtoBlob(base64)
          // console.log(base64)
          callback(base64)
        }
      }
    },
    dataURLtoBlob(dataurl) {
      let arr = dataurl.split(',')
      let mime = arr[0].match(/:(.*?);/)[1]
      let bstr = atob(arr[1])
      let n = bstr.length
      letu8arr = new Uint8Array(n)
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
      }
      return new Blob([u8arr], {
        type: mime
      })
    },
    // 电话号码模糊
    _getmobile(mobile) {
      if (mobile) {
        mobile = mobile.substr(0, 3) + '****' + mobile.substr(7, 11)
      }
      return mobile
    },
    // 获取高度
    _getClientHeight() {
      let cilentH =
        document.documentElement.clientHeight || document.body.clientHeight
      let nav = document.querySelector('.nav').getBoundingClientRect().height
      this.$refs.setting.style.height = cilentH - nav + 'px'
      this.$refs.chooseImg.style.height = cilentH + 'px'
    },
    // 弹窗
    _setMsgBox(content = '', timer = 2000, callback) {
      let that = this
      that.sendVal = true
      that.msgContent = content
      setTimeout(function() {
        that.sendVal = false
        if (callback) {
          callback()
        }
      }, timer)
    }
  }
}
</script>
<style lang="scss" scoped>
.main {
  padding-top: 0.98rem;
  padding-bottom: 0 !important;
  height: 100%;
  .center {
    margin-top: 0.1rem;
    .title_one {
      padding: 0.3rem;
      margin-bottom: 0.1rem;
      background: #fff;
      color: #999;
      font-size: 0.34rem;
    }
    ul {
      padding: 0 0.3rem;
      background: #fff;
      li {
        width: 100%;
        padding: 0.3rem 0;
        border-bottom: 1px solid #e3e3e3;
        &:last-child {
          border-bottom: none;
        }
        span {
          color: #999;
          font-size: 0.3rem;
          float: left;
        }
        p {
          float: right;
          color: #666;
          margin-right: 0.2rem;
          width: 70%;
          text-align: right;
          position: relative;
          img {
            width: 1rem;
            height: 1rem;
            display: block;
            border-radius: 50%;
            float: right;
          }
          input {
            width: 1rem;
            height: 1rem;
            position: absolute;
            opacity: 0;
          }
        }
        i {
          display: inline-block;
          float: right;
          width: 0.18rem;
          height: 0.3rem;
          // background: url('../../static/icon_next.png');
          background-size: 100% 100%;
        }
        /* 设置性别样式*/
        .sex {
          float: right;
          color: #666;
          margin-right: 0.2rem;
          width: 70%;
          div {
            float: right;
            span {
              &:first-child {
                width: 0.26rem;
                height: 0.26rem;
                // background: url('../../static/icon-sex_false.png');
                background-size: 100% 100%;
                margin-right: 0.1rem;
                margin-top: 0.04rem;
              }
            }
          }
          div.active {
            span {
              color: #333;
              &:first-child {
                // background: url('../../static/icon-sex_true.png');
                background-size: 100% 100%;
              }
            }
          }
          .sex_man {
            margin-right: 0.3rem;
          }
        }
      }
    }
    .title_two {
      padding: 0.3rem;
      margin-top: 0.1rem;
      margin-bottom: 0.1rem;
      background: #fff;
      color: #999;
      font-size: 0.34rem;
    }
  }
  // 选择上传图片方式
  .chooseImg {
    position: fixed;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.6);
    z-index: 66666;
    width: 100%;
    .chooseImg_ul {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      li {
        height: 0.98rem;
        line-height: 0.98rem;
        text-align: center;
        font-size: 0.36rem;
        position: relative;
        color: #333;
        background-color: #fff;
        input {
          position: absolute;
          top: 0;
          left: 0;
          z-index: 55;
          width: 100%;
          height: 100%;
          opacity: 0;
          background-color: transparent;
        }
      }
      .album {
        border-bottom: 0.01rem solid #eee;
      }
      .camera {
        border-bottom: 0.14rem solid #f5f5f5;
      }
    }
  }
}
</style>
