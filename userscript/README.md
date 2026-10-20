# DUFEE 课件真实链接提取器（Tampermonkey 油猴脚本）

在东北财经大学 `ginkgostu.dufe.edu.cn/course/detail` 课程详情页，一键把「仅可在线预览、不可下载」的 WPS 课件，还原成可直接下载 / 新标签打开的**真实源站链接**。

## 原理

WPS 在线预览页（`weboffice`）只是个壳，真实文件地址被编码在预览链接的参数 `_w_third_business` 中。本脚本把它 URL 解码，即可得到源站直链（通常形如 `https://...?attname=国情教育.pptx`）。

## 功能

- 自动扫描课程详情页里的 WPS 预览链接（覆盖 `<a>`、`<iframe>`、各 `data-*` 属性，并兜底扫描整页 HTML）。
- 解码出真实源站地址，在**当前页面的悬浮窗**里列出文件名与链接（不会自动跳转、不自动开新标签）。
- 悬浮窗内逐条提供「新标签打开 / 下载」，底部「复制全部链接」。
- 「下载」走 `fetch + blob`（源站 CORS 为 `*`），可直接存盘，绕开 Referer 限制。
- 通过 GitHub 的 `@updateURL` 实现**自动更新**：作者发新版后，用户端油猴会自动提示升级。

## 安装

方式一（推荐，可自动更新）：

1. 浏览器安装 [Tampermonkey](https://www.tampermonkey.net/) 扩展。
2. 打开本仓库的 `dufe_wps_real_link.user.js` → 点击 **Raw** → 地址栏变为 `raw.githubusercontent.com/...` 时，Tampermonkey 会提示「是否安装」→ 确认。
3. 之后作者更新脚本，油猴会自动检测升级。

方式二（手动导入）：

1. Tampermonkey 管理面板 → 新建脚本 → 把 `dufe_wps_real_link.user.js` 内容整段粘贴 → 保存。
2. 或直接把 `.user.js` 文件拖进 Tampermonkey 导入。

> 也可以在本仓库 GitHub 页面点绿色 **Code → Download ZIP** 下载整个仓库，解压后在 `userscript/` 子文件夹里找到本脚本。

## 使用

1. 打开 `https://ginkgostu.dufe.edu.cn/course/detail`（需已登录能看到课件的账号）。
2. 页面右下角出现红色 **「显示真实链接」** 按钮，角标显示找到的数量。
3. 点一下：自动扫描 → 在当前页面浮出悬浮窗，列出全部真实链接（**不自动跳转**，需手动点「新标签打开 / 下载」）。
4. 若课件列表是点开后才加载的，等列表出现再点按钮即可（每次点击都会重新扫描）。

## 说明与限制

- 脚本仅在 `ginkgostu.dufe.edu.cn/course/detail*` 生效，不会在其他网站运行。
- 若课程页 DOM 形态不同导致抓取不到，按 F12 看课件链接长什么样，把形态反馈给作者即可微调选择器。
- 本脚本不会自动打开新标签或弹窗，所有「新标签打开 / 下载」都需要你手动点击悬浮窗里的按钮。
- 脚本头部的 GitHub 用户名（`YiZhiBenBi01`）、`@updateURL` / `@downloadURL` 等已配置好，无需再改即可自动更新。

## 使用须知

本脚本仅用于获取**你自己账号下、用于个人学习**的课件。请遵守学校与 WPS 的共享设置，勿将下载内容二次传播。

## License

[MIT](./LICENSE)
