<template>
  <div
    class="img-box"
    :class="{'able-edit-bg': mode === 'isEdit' || mode === 'isAdd'}"
    :style="{'width': options.width+'px', 'height': options.height+'px'}"
    @mousedown.self="onAddMousedown($event)"
    @mouseup.self="onAddMouseup($event)"
  >
    <img :src="options.icon"  alt="图片加载失败" />
    <a
      style="display:inline-block;position: absolute;"
      :style="{'left': item.left +'px', 'top': item.top+'px', 'width':item.width +'px', 'height': item.height + 'px'}"
      v-for="(item, index) of options.maskList"
      :class="{'editable-bg': mode === 'isEdit' || mode === 'isAdd'}"
      :key="index"
      @mousemove.self="onMoveBox($event, item)"
      @mouseup.self="onUpBox($event, item)"
      @mousedown.self="onDownBox($event, item)"
      @click.self="onClickBox( item)"
      @mouseleave="onLeaveBox"
    >
      <i class="icon-delete-item" @click.self="onItemHotpostDelete(index)" v-if="mode === 'isEdit' || mode === 'isAdd'"></i>
      <span class="text-index" v-if="mode === 'isEdit' || mode === 'isAdd'">{{item.index}}</span>
      <!-- 左上 -->
      <span
        v-if="(mode === 'isEdit' || mode === 'isAdd')"
        @mousemove.self="onImgMousemove($event, item, 'tag-left-top')"
        @mousedown.self="onImgMousedown($event, item, 'tag-left-top')"
        @mouseup.self="onImgMouseup($event, item, 'tag-left-top')"
        @mouseleave="onImgMouseLeave"
        class="tag tag-left-top"
      ></span>
      <!-- 上 -->
      <span
        v-if="(mode === 'isEdit' || mode === 'isAdd')"
        class="tag tag-top"
        @mousemove.self="onImgMousemove($event, item, 'tag-top')"
        @mousedown.self="onImgMousedown($event, item, 'tag-top')"
        @mouseup.self="onImgMouseup($event, item, 'tag-top')"
        @mouseleave="onImgMouseLeave"
      ></span>
      <!-- 右上 -->
     <!--  <span
        v-if="(mode === 'isEdit' || mode === 'isAdd')"
        class="tag tag-right-top"
        @mousemove.self="onImgMousemove($event, item, 'tag-right-top')"
        @mousedown.self="onImgMousedown($event, item, 'tag-right-top')"
        @mouseup.self="onImgMouseup($event, item, 'tag-right-top')"
        @mouseleave="onImgMouseLeave"
      ></span> -->
      <!-- 左 -->
      <span
        v-if="(mode === 'isEdit' || mode === 'isAdd')"
        class="tag tag-left"
        @mousemove.self="onImgMousemove($event, item, 'tag-left')"
        @mousedown.self="onImgMousedown($event, item, 'tag-left')"
        @mouseup.self="onImgMouseup($event, item, 'tag-left')"
        @mouseleave="onImgMouseLeave"
      ></span>
      <!-- 右 -->
      <span
        v-if="(mode === 'isEdit' || mode === 'isAdd')"
        class="tag tag-right"
        @mousemove.self="onImgMousemove($event, item, 'tag-right')"
        @mousedown.self="onImgMousedown($event, item, 'tag-right')"
        @mouseup.self="onImgMouseup($event, item, 'tag-right')"
        @mouseleave="onImgMouseLeave"
      ></span>
      <!-- 左下 -->
      <span
        v-if="(mode === 'isEdit' || mode === 'isAdd')"
        class="tag tag-left-bottom"
        @mousemove.self="onImgMousemove($event, item, 'tag-left-bottom')"
        @mousedown.self="onImgMousedown($event, item, 'tag-left-bottom')"
        @mouseup.self="onImgMouseup($event, item, 'tag-left-bottom')"
        @mouseleave="onImgMouseLeave"
      ></span>
      <!-- 下 -->
      <span
        v-if="(mode === 'isEdit' || mode === 'isAdd')"
        class="tag tag-bottom"
        @mousemove.self="onImgMousemove($event, item, 'tag-bottom')"
        @mousedown.self="onImgMousedown($event, item, 'tag-bottom')"
        @mouseup.self="onImgMouseup($event, item, 'tag-bottom')"
        @mouseleave="onImgMouseLeave"
      ></span>
      <!-- 右下 -->
      <span
        v-if="(mode === 'isEdit' || mode === 'isAdd')"
        class="tag tag-right-bottom"
        @mousemove.self="onImgMousemove($event, item, 'tag-right-bottom')"
        @mousedown.self="onImgMousedown($event, item, 'tag-right-bottom')"
        @mouseup.self="onImgMouseup($event, item, 'tag-right-bottom')"
        @mouseleave="onImgMouseLeave"
      ></span>
    </a>
  </div>
</template>

<script>
// mode = 'isEdit' || 'isAdd'
export default {
  name: "imgHotpost",
  data() {
    return {
      isDrage: false,
      isMove: false,
      isAddMove: false,
      data: {},
      newItem: {},
      pageX: null,
      pageY: null
    };
  },
  props: {
    mode: {
      type: String,
      default: ""
    },
    options: {
      type: Object,
      default: () => {
        return {
          width: 750,
          height: 400,
          icon: require("./assets/timg.jpg"),
          maskList: []
        };
      }
    }
  },
  methods: {
    onAddMousedown(e) {
      if(this.mode != 'isAdd')return
      this.newItem = {
        index: this.options.maskList.length+1,
        type: null,
        width: null,
        height: null,
        color: "white",
        left: null,
        top: null
      };
      let pageX = e.pageX,
        pageY = e.pageY;
      this.pageX = pageX;
      this.pageY = pageY;
      this.isAddMove = true;
    },
    onAddMouseup(e) {
      if(this.mode != 'isAdd')return
      let pageX = e.pageX,
        pageY = e.pageY;
      if (this.pageX && this.pageY) {
        let XValue = Math.abs(pageX - this.pageX),
          YValue = Math.abs(pageY - this.pageY);
        this.newItem.width = XValue;
        this.newItem.height = YValue;
        this.newItem.left = e.layerX - XValue;
        this.newItem.top = e.layerY - YValue;
        this.newItem.index = this.options.maskList.length + 1;
      }
      this.pageX = null;
      this.pageY = null;
      this.isAddMove = false;
      this.$emit("onAddHotpost", this.newItem);
      this.$emit("onClickBox",this.newItem)
    },
    onMoveBox(e, item) {
      if (!this.isMove) return;
      let pageX = e.pageX,
        pageY = e.pageY;
      if (this.pageX && this.pageY) {
        item.left += pageX - this.pageX;
        item.top += pageY - this.pageY;
      }
      this.pageX = pageX;
      this.pageY = pageY;
    },
    onUpBox() {
      this.pageX = null;
      this.pageY = null;
      this.isMove = false;
    },
    onDownBox() {
      this.pageX = null;
      this.pageY = null;
      this.isMove = true;
    },
    onLeaveBox() {
      this.pageX = null;
      this.pageY = null;
      this.isMove = false;
    },
    onImgMouseLeave() {
      this.pageX = null;
      this.pageY = null;
      this.isDrage = false;
    },
    onImgMousedown() {
      if (!this.mode) return;
      this.pageX = null;
      this.pageY = null;
      this.isDrage = true;
    },
    onImgMouseup() {
      if (!this.mode || !this.isDrage) return;
      this.pageX = null;
      this.pageY = null;
      this.isDrage = false;
    },
    onImgMousemove(e, item, className) {
      if (!this.mode || !this.isDrage) return;
      if (this.mode === "isAdd") {
        this.setlocation(e, item, className);
        return;
      }

      if (this.mode === "isEdit") {
        this.setlocation(e, item, className);
        return;
      }
    },
    onItemHotpostDelete(i){
      this.$emit("onItemHotpostDelete", i);
    },
    onClickBox(item){
      this.$emit("onClickBox",item)
    },
    setlocation(e, item, className) {
      let pageX = e.pageX,
        pageY = e.pageY;

      switch (className) {
        case "tag-left-top":
          if (this.pageX && this.pageY) {
            item.width -= pageX - this.pageX;
            item.height -= pageY - this.pageY;
            item.left += pageX - this.pageX;
            item.top += pageY - this.pageY;
          }
          break;
        case "tag-top":
          if (this.pageX && this.pageY) {
            item.height -= pageY - this.pageY;
            item.top += pageY - this.pageY;
          }
          break;
        case "tag-right-top":
          if (this.pageX && this.pageY) {
            item.width += pageX - this.pageX;
            item.height += this.pageY - pageY;
            item.top += pageY - this.pageY;
          }
          break;
        case "tag-left":
          if (this.pageX && this.pageY) {
            item.width -= pageX - this.pageX;
            item.left += pageX - this.pageX;
          }
          break;
        case "tag-right":
          if (this.pageX && this.pageY) {
            item.width += pageX - this.pageX;
          }
          break;
        case "tag-left-bottom":
          if (this.pageX && this.pageY) {
            item.width -= pageX - this.pageX;
            item.height += pageY - this.pageY;
            item.left += pageX - this.pageX;
          }
          break;
        case "tag-bottom":
          if (this.pageX && this.pageY) {
            item.height += pageY - this.pageY;
          }
          break;
        case "tag-right-bottom":
          if (this.pageX && this.pageY) {
            item.width += pageX - this.pageX;
            item.height += pageY - this.pageY;
          }
          break;
        default:
          break;
      }

      this.pageX = pageX;
      this.pageY = pageY;
    }
  }
};
</script>

<style  >
.img-box {
  border: 1px solid silver;
  overflow: hidden;
}
.img-box > img{
   width: 100%;
    height: 100%;
}
.text-index{
  font-weight: 700;
  font-size: 22px;
  color: rgb(187, 186, 186);
  pointer-events: none;
}
.editable-bg {
  z-index: 11;
  cursor: move;
  display: flex !important;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.479);
}
.able-edit-bg {
  position: relative;
}
.able-edit-bg::after{
  content: "";
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 10;
    background-color: rgba(192, 192, 192, 0.363);
}
.tag {
  position: absolute;
  display: inline-block;
  width: 5px;
  height: 5px;
  background-color: rgba(255, 255, 255, 0.541);
  border: 1px solid rgb(179, 255, 182);
}
.tag::after{
    content: "";
    position: absolute;
    left: -300%;
    top: -300%;
    width: 30px;
    height: 30px;
}
.tag-left-top {
  left: -2.5px;
  top: -2.5px;
  cursor: nwse-resize;
}

.tag-top {
  left: 45%;
  top: -2.5px;
  cursor: n-resize;
}

.tag-right-top {
  right: -2.5px;
  top: -2.5px;
  cursor: sw-resize;
}

.icon-delete-item{
  position: absolute;
  cursor: pointer;
  right: -8px;
  top: -12px;
}

.icon-delete-item::after{
  content: '-';
  display: inline-block;
  color: white;
  background-color: rgb(73, 3, 3);
  text-align: center;
  width: 15px;
  height: 15px;
  line-height: 10px;
  border-radius: 50%;
}

.tag-left {
  left: -2.5px;
  top: 45%;
  cursor: w-resize;
}

.tag-right {
  right: -2.5px;
  top: 45%;
  cursor: w-resize;
}

.tag-left-bottom {
  bottom: -2.5px;
  left: -2.5px;
  cursor: sw-resize;
}

.tag-bottom {
  left: 45%;
  bottom: -2.5px;
  cursor: n-resize;
}

.tag-right-bottom {
  right: -2.5px;
  bottom: -2.5px;
  cursor: nwse-resize;
}
</style>