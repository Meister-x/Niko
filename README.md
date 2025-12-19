# 🎄 个人作品集网站

一个充满圣诞氛围的个人作品集网站，使用HTML、CSS和JavaScript构建。

## 🚀 在Cursor中可视化编辑

### 方法一：使用Live Server（推荐）

1. **安装推荐扩展**：
   - 打开命令面板（`Ctrl+Shift+P`）
   - 输入 "Extensions: Show Recommended Extensions"
   - 安装所有推荐的扩展

2. **启动Live Server**：
   - 右键点击 `index.html` 文件
   - 选择 "Open with Live Server"
   - 或者使用快捷键 `Ctrl+Shift+L`

3. **实时预览**：
   - 浏览器会自动打开 `http://localhost:5500`
   - 修改代码后会自动刷新页面

### 方法二：使用调试器

1. 按 `F5` 或点击调试面板
2. 选择 "Launch Chrome against localhost"
3. 浏览器会打开并连接到Live Server

### 方法三：使用任务

1. 打开命令面板（`Ctrl+Shift+P`）
2. 输入 "Tasks: Run Task"
3. 选择 "Start Live Server"

## 🎯 开发技巧

### 实时预览
- 保存文件后自动刷新浏览器
- 支持热重载CSS和JavaScript

### 代码提示
- HTML标签自动补全
- CSS属性智能提示
- JavaScript代码补全

### 格式化
- 保存时自动格式化代码
- 统一的代码风格

## 📁 项目结构

```
portfolio/
├── index.html              # 首页
├── about.html              # 关于页面
├── portfolio.html          # 作品集页面
├── contact.html            # 联系页面
├── assets/
│   ├── css/
│   │   ├── styles.css      # 主样式文件
│   │   └── swiper-bundle.min.css
│   ├── js/
│   │   ├── main.js         # 主脚本文件
│   │   ├── script.js       # 轮播脚本
│   │   └── ...
│   └── img/                # 图片资源
└── .vscode/                # Cursor配置
    ├── extensions.json     # 推荐扩展
    ├── settings.json       # 工作区设置
    ├── launch.json         # 调试配置
    ├── tasks.json          # 任务配置
    └── keybindings.json    # 快捷键
```

## 🎨 圣诞主题

当前网站已添加丰富的圣诞元素：
- ❄️ 雪花飘落效果
- 🎄 圣诞树装饰
- 🎁 礼物盒动画
- 🔔 铃铛特效
- 🍬 糖果元素

## 🔧 自定义配置

### 修改端口
编辑 `.vscode/settings.json`：
```json
{
    "liveServer.settings.port": 8080
}
```

### 添加更多页面
1. 创建新的HTML文件
2. 在导航中添加链接
3. 更新样式和脚本

## 🎉 祝开发愉快！

有任何问题随时询问Cursor AI助手。


