# DUFEE 课件真实链接提取器

把东北财经大学 `ginkgostu.dufe.edu.cn/course/detail` 课程详情页里「仅可在线预览、不可下载」的 WPS 课件，还原成可直接下载 / 打开的**真实源站链接**。

## 原理

WPS 在线预览页（`weboffice`）只是个壳，真实文件地址被编码在预览链接的参数 `_w_third_business` 中。本项目把它 URL 解码，即可得到源站直链（通常形如 `https://...?attname=国情教育.pptx`）。

## 两种使用形式

本项目提供**同一种能力**的两种形态，按需选用其一即可：

| 形式 | 目录 | 适合 | 依赖 |
| --- | --- | --- | --- |
| 油猴脚本（Tampermonkey） | [`userscript/`](./userscript) | 不想装扩展、只想在课程页加个按钮 | 需装 Tampermonkey |
| 浏览器扩展（Manifest V3） | [`extension/`](./extension) | 不想装 Tampermonkey，浏览器原生加载 | 支持 WebExtensions 的浏览器 |

两者核心逻辑完全一致：扫描页面 → 解码 `_w_third_business` → 在**当前页面悬浮窗**列出真实链接（不自动跳转，需手动点「新标签打开 / 下载」）。

## 共通使用步骤

1. 打开 `https://ginkgostu.dufe.edu.cn/course/detail`（需登录能看到课件的账号）。
2. 页面右下角出现红色 **「显示真实链接」** 按钮，角标显示找到的数量。
3. 点一下：自动扫描 → 在当前页面浮出悬浮窗，列出全部真实链接（**不自动跳转**）。
4. 悬浮窗内逐条可「新标签打开 / 下载」，底部「复制全部链接」。

## 发布说明

- 作者 GitHub：[@YiZhiBenBi01](https://github.com/YiZhiBenBi01)
- 油猴脚本已配置 `@updateURL` / `@downloadURL`，作者发新版后用户端会自动提示升级（需从本仓库 Raw 安装）。
- 扩展为 Manifest V3，同一套文件兼容 Chrome / Edge / Brave / Opera / Vivaldi / Firefox(109+)。

## License

[MIT](./LICENSE)
