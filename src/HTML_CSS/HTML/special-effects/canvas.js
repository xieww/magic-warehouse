const dark = window.matchMedia('(prefers-color-scheme: dark)').matches,
  dpr = window.devicePixelRatio,
  width = 300, // canvas 宽度
  height = 200, // canvas 高度
  background = dark ? '#333' : '#f5f5f5', // 背景色
  max_radius = dpr * 2, // 最大半径
  min_radius = dpr * 1, // 最小半径
  drag = dpr * 120,
  mouse_init = { x: -1000, y: -1000 }, // 鼠标默认位置
  colors = [
    '#d81b60', // 红
    '#f4511e', // 橙
    '#1976d2', // 蓝
    '#ffb300', // 黄
    '#6d4c41' // 咖
  ], // 颜色列表
  font_size = dpr * 60,
  canvas_box = document.getElementsByClassName('brand')[0]

// canvas 所在的xy轴位置
let canvas_box_xy = canvas_box.getBoundingClientRect()

const can = document.createElement('canvas')
const ctx = can.getContext('2d')
ctx.scale(dpr, dpr)

canvas_box.innerHTML = '' // 可以不清空
canvas_box.appendChild(can)

let mouse = { x: mouse_init.x, y: mouse_init.y } // 初始化鼠标位置
let particles = [] // 记录所有点的集合
resize()
cfill()

function resize() {
  can.style.width = `${width}px`
  can.style.height = `${height}px`

  can.width = dpr * width
  can.height = dpr * height

  canvas_box_xy = canvas_box.getBoundingClientRect()
}
function cfill() {
  ctx.fillStyle = background
  ctx.fillRect(0, 0, can.width, can.height)
  ctx.fill()
}
window.onresize = function() {
  resize()
}
// 鼠标事件
can.onmousemove = function(e) {
  mouse.x = e.clientX - canvas_box_xy.x
  mouse.y = e.clientY - canvas_box_xy.y
}
can.ontouchmove = function(e) {
  mouse.x = e.touches[0].clientX - canvas_box_xy.x
  mouse.y = e.touches[0].clientY - canvas_box_xy.y
}
can.onmouseout = function(e) {
  mouse.x = mouse_init.x
  mouse.y = mouse_init.y
}
can.ontouchend = function(e) {
  mouse.x = mouse_init.x
  mouse.y = mouse_init.y
}

function distance(x, y, x1, y1) {
  return Math.sqrt((x1 - x) * (x1 - x) + (y1 - y) * (y1 - y))
}

// 点类
class Particle {
  constructor(pos, target, vel, color, radius) {
    this.pos = pos
    this.target = target
    this.vel = vel
    this.color = color
    this.radius = radius
    var arr = [-1, 1]
    this.direction = (arr[~~(Math.random() * 2)] * Math.random()) / 10
  }
  set(type, value) {
    this[type] = value
  }
  update() {
    this.radius += this.direction
    this.vel.x = (this.pos.x - this.target.x) / drag
    this.vel.y = (this.pos.y - this.target.y) / drag
    if (distance(this.pos.x, this.pos.y, mouse.x, mouse.y) < drag) {
      this.vel.x += this.vel.x - (this.pos.x - mouse.x) / 15
      this.vel.y += this.vel.y - (this.pos.y - mouse.y) / 15
    }
    if (this.radius >= max_radius) {
      this.direction *= -1
    }
    if (this.radius <= 1) {
      this.direction *= -1
    }
    this.pos.x -= this.vel.x
    this.pos.y -= this.vel.y
  }
  draw() {
    ctx.beginPath()
    ctx.fillStyle = this.color
    ctx.arc(this.pos.x, this.pos.y, this.radius, 0, Math.PI * 2)
    ctx.fill()
  }
}
if (FontFace) {
  // 字体加载完后再渲染
  const canvasFont = new FontFace('Inconsolata', 'url(./assets/font/Inconsolata.woff2)')
  canvasFont.load().then(font => {
    document.fonts.add(font)
  }).then(() => {
    changeText('chasen')
    setInterval(draw, 10)
  })
} else {
  changeText('chasen')
  setInterval(draw, 10)
}

// 修改文字
function changeText(text) {
  let current = 0,
    temp,
    radius,
    color,
    bool = true
  ctx.fillStyle = '#fff'
  ctx.font = `${font_size}px Inconsolata`
  ctx.fillText(text, can.width / 2 - ctx.measureText(text).width / 2, can.height / 2 + font_size / 2 - 3)
  const data = ctx.getImageData(0, 0, can.width, can.height).data

  // 清除字体
  //ctx.clearRect(0, 0, can.width, can.height)

  const color0 = data[0]
  cfill()
  for (i = 0; i < data.length; i += 4 * dpr) {
    temp = { x: (i / 4) % can.width, y: ~~(i / 4 / can.width) }
    if (data[i] !== color0 && Math.floor(Math.random()*100) <= 26 /*(temp.x % (max_radius+1) === 0 && temp.y % (max_radius+1) === 0)*/) {
      if (data[i + 4] !== 255 || data[i - 4] !== 255 || data[i + can.width * 4] !== 255 || data[i - can.width * 4] !== 255) {
        if (current < particles.length) {
          particles[current].set('target', temp)
        } else {
          radius = max_radius - Math.random() * min_radius
          temp = { x: Math.random() * can.width, y: Math.random() * can.height }
          if (bool) {
            temp = { x: (i / 4) % can.width, y: ~~(i / 4 / can.width) }
          }
          color = colors[~~(Math.random() * colors.length)]
          const p = new Particle(temp, { x: (i / 4) % can.width, y: ~~(i / 4 / can.width) }, { x: 0, y: 0 }, color, radius)
          particles.push(p)
        }
        ++current
      }
    }
  }
  bool = false
  particles.splice(current, particles.length - current)
}
// 渲染
function draw() {
  cfill()
  for (i = 0; i < particles.length; ++i) {
    particles[i].update()
    particles[i].draw()
  }
}
