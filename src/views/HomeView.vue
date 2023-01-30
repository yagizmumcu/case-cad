<template>
  <div>
    <Sidebar @childEvent="handleEvent" />
    <canvas
      ref="canvas"
      class="my-canvas"
      height="800"
      width="800"
      @click="drawLine"
    ></canvas>
  </div>
</template>

<script>
import { Stage, Shape } from "@createjs/easeljs";
import Sidebar from "../components/Sidebar.vue";
export default {
  name: "animation",
  components: {
    Sidebar,
  },
  data() {
    return {
      stage: null,
      shape: null,
      currentShape: "rectangle",
      points: [],
    };
  },
  mounted() {
    let canvas = this.$refs.canvas;
    this.stage = new Stage(canvas);
    this.stage.enableMouseOver();
    this.stage.on("stagemousedown", this.createShape);
    window.addEventListener("keydown", this.handleKeyDown);
  },
  methods: {
    createShape(e) {
      if (this.currentShape === "rectangle") {
        if (!this.shape || this.shape.type !== "rectangle") {
          this.shape = new Shape();
          this.shape.type = "rectangle";
          this.shape.graphics
            .beginFill("#" + Math.floor(Math.random() * 16777215).toString(16))
            .drawRect(2, 0, 100, 200);
          this.stage.addChild(this.shape);
        }
        this.shape.x = e.stageX;
        this.shape.y = e.stageY;
        this.shape.cursor = "pointer";
        this.shape.on("mousedown", this.startDrag);
        this.shape.on("pressmove", this.drag);
        this.shape.on("pressup", this.endDrag);
        this.stage.update();
      } else if (this.currentShape === "circle") {
        if (!this.shape || this.shape.type !== "circle") {
          this.shape = new Shape();
          this.shape.type = "circle";

          this.shape.graphics
            .clear()
            .beginFill("#" + Math.floor(Math.random() * 16777215).toString(16))
            .drawCircle(0, 0, 50);
        }
        this.shape.x = e.stageX;
        this.shape.y = e.stageY;
        this.shape.cursor = "pointer";
        this.shape.on("mousedown", this.startDrag);
        this.shape.on("pressmove", this.drag);
        this.shape.on("pressup", this.endDrag);
        this.stage.addChild(this.shape);
        this.stage.update();
      }
      console.log();
    },
    drawLine(e) {
      if (this.currentShape === "line") {
        this.points.push({ x: e.offsetX, y: e.offsetY });
        this.line = new Shape();
        this.stage.addChild(this.line);
        this.line.graphics
          .setStrokeStyle(Math.floor(Math.random() * 10))
          .beginStroke("black");
        this.line.graphics.moveTo(this.points[0].x, this.points[0].y);
        for (let i = 1; i < this.points.length; i++) {
          this.line.graphics.lineTo(this.points[i].x, this.points[i].y);
        }
        this.stage.update();
      }
    },
    dragShape() {},
    handleEvent(data) {
      this.currentShape = data;
    },
    startDrag(event) {
      event.target.offset = {
        x: event.target.x - event.stageX,
        y: event.target.y - event.stageY,
      };
    },
    drag(event) {
      event.target.x = event.stageX + event.target.offset.x;
      event.target.y = event.stageY + event.target.offset.y;
      this.stage.update();
    },
    endDrag() {},
    handleKeyDown(event) {
      if (event.keyCode === 8 && this.shape) {
        this.stage.removeAllChildren();
        this.shape = null;
        this.stage.update();
      }
    },
  },
};
</script>
<style scoped>
.my-canvas {
  border-radius: 10%;
  background: whitesmoke;
}
</style>