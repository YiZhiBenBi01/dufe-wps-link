# DUFE 课件真实链接提取器

把东北财经大学 `ginkgostu.dufe.edu.cn/course/detail` 课程详情页里「仅可在线预览、不可下载」的 WPS 课件，还原成可直接下载 / 打开的**真实源站链接**。

## 原理

WPS 在线预览页（`weboffice`）只是个壳，真实文件地址被编码在预览链接的参数 `_w_third_business` 中。本项目把它 URL 解码，即可得到源站直链（通常形如 `https://...?attname=国情教育.pptx`）。

## 两种使用形式

本项目提供两种安装方式，按需选用其一即可。

| 形式 | 目录 | 适合 | 依赖 |
| --- | --- | --- | --- |
| 油猴脚本（Tampermonkey） | [`userscript/`](./userscript) | 不想装扩展、只想在课程页加个按钮 | 需装 Tampermonkey |
| 浏览器扩展（Manifest V3） | [`extension/`](./extension) | 不想装 Tampermonkey，浏览器原生加载 | 支持 WebExtensions 的浏览器 |

两者核心逻辑完全一致：扫描页面 → 解码 `_w_third_business` → 在**当前页面悬浮窗**列出真实链接（不自动跳转，需手动点「新标签打开 / 下载」）。

## 安装

### 方式一：油猴脚本（Tampermonkey）

适合不想装浏览器扩展、只想在课程页加一个按钮的情况。

1. 给浏览器装上 [Tampermonkey](https://www.tampermonkey.net/) 扩展。
2. 在本仓库打开 [`userscript/dufe_wps_real_link.user.js`](./userscript/dufe_wps_real_link.user.js)，点击 **Raw**。
3. 当地址栏变为 `raw.githubusercontent.com/...` 时，Tampermonkey 会弹出「是否安装此脚本」→ 点 **安装**。
4. （手动导入备选）管理面板 → 新建脚本 → 把 `.user.js` 内容整段粘贴保存；或直接把文件拖进 Tampermonkey。

> 从本仓库 Raw 安装后可**自动更新**：作者发新版时，油猴会自动提示升级。详细见 [`userscript/README.md`](./userscript/README.md)。

### 方式二(推荐)：浏览器扩展（Manifest V3）

适合不想装 Tampermonkey、希望浏览器原生加载的情况。同一套文件兼容 Chrome / Edge / Brave / Opera / Vivaldi / Firefox(109+)。

1. 下载本仓库（绿色 **Code → Download ZIP** 或 `git clone`），解压得到 `extension/` 文件夹。
2. 打开扩展管理页：
   - Chrome / Brave / Vivaldi / Opera / Edge：`chrome://extensions`（Edge 为 `edge://extensions`），打开右上角 **开发者模式**。
   - Firefox(109+)：`about:debugging` → 此 Firefox。
3. 点 **加载已解压的扩展程序 / 临时载入附加组件**，选择 `extension/` 文件夹（内含 `manifest.json` 的那一层）。
4. 加载成功后在扩展列表里能看到「DUFE 课件真实链接提取器」。

> Firefox 的「临时载入」每次重启浏览器需重新载入，属正常现象；正式上架 AMO 后可常驻。详细见 [`extension/README.md`](./extension/README.md)。

## 使用方法

1. 打开 `https://ginkgostu.dufe.edu.cn/course/detail`（需登录能看到课件的账号）。
2. 页面右下角出现红色 **「显示真实链接」** 按钮，角标显示找到的数量。
3. 点一下：自动扫描 → 在当前页面浮出悬浮窗，列出全部真实课件链接。
4. 悬浮窗内逐条可「新标签打开 / 下载」，底部「复制全部链接」。
5. 若在课件页面未找到悬浮窗，可刷新页面重试。

## 发布说明

- 作者 GitHub：[@YiZhiBenBi01](https://github.com/YiZhiBenBi01)
- 油猴脚本已配置 `@updateURL` / `@downloadURL`，作者发新版后用户端会自动提示升级（需从本仓库 Raw 安装）。
- 扩展为 Manifest V3，同一套文件兼容 Chrome / Edge / Brave / Opera / Vivaldi / Firefox(109+)。

## License

[MIT](./LICENSE)
