# 发布到 GreasyFork 指南

GreasyFork 是油猴脚本最主流的公开 registry，权重高、被搜索引擎良好收录。把脚本发到这里，既方便用户安装，也会给本仓库带来一条**高质量外链**，加速 GitHub 页面被收录。

> 说明：GreasyFork 没有开放的上传 API，发布必须通过其网站的「新建脚本」网页表单完成，且需要你本人的 GreasyFork 账号（含登录态）。因此以下步骤需要你在浏览器里操作最后一步的"粘贴+提交"；我无法代你登录。若你开启浏览器控制（左下角设置 → Agent → 浏览器控制，或装好 WorkBuddy 浏览器扩展并登录 GreasyFork），我也可以直接在你的浏览器里代你点完。

## 一、准备工作（脚本已就绪）

待发布的脚本就是本目录的 `dufe_wps_real_link.user.js`，元数据已满足 GreasyFork 要求：

- `@name`：有（中文名）
- `@version`：有（当前 1.1）
- `@namespace`：有（指向 GitHub 仓库 URL）
- `@license`：MIT
- `@description`：已包含关键词（东北财经大学 / 白果云 / WPS / 课件 / 真实下载链接），利于搜索

脚本内容本身已用 `@grant none`，无外部依赖、无广告/恶意行为，可直接过审。

## 二、发布步骤

1. 注册 / 登录 GreasyFork：https://greasyfork.org/ （推荐用 GitHub 账号授权登录，省事）。
2. 打开「新建脚本」页面：https://greasyfork.org/scripts/new
3. 在文本区**粘贴** `dufe_wps_real_link.user.js` 的全部内容。
4. 页面会自动从脚本头部读取 `@name` / `@description` / `@version` 等字段，通常无需手填。
5. 在 **Additional info（附加说明）** 框里粘贴下面「附加说明文案」一节的内容（这会出现在脚本主页，利于 SEO 与用户理解）。
6. （可选）上传一张脚本运行截图：打开 `ginkgostu.dufe.edu.cn/course/detail` → 点「显示真实链接」按钮 → 截悬浮窗。
7. 点 **Submit（提交）**，等待审核通过（一般几分钟到几小时，纯文本脚本通常秒过）。

## 三、发布后：开启自动同步（关键）

GreasyFork 支持「从外部 URL 同步」：你以后只管往 GitHub 推新版本，GreasyFork 会自动拉取更新，不必每次手动重传。

- 在脚本管理页找到 **Sync（同步）** 设置；
- 填入源地址（即本仓库的 Raw 直链）：
  `https://raw.githubusercontent.com/YiZhiBenBi01/dufe-wps-link/main/userscript/dufe_wps_real_link.user.js`
- 保存。此后你 `git push` 新版本，GreasyFork 会自动同步。

> 当前脚本的 `@updateURL` / `@downloadURL` 指向 GitHub Raw，也就是说：从 GreasyFork 安装的用户，其油猴也会直接向 GitHub 拉更新——与上面的同步机制一致，无需改动脚本。
> 若你更希望以 GreasyFork 为唯一更新源，可在拿到脚本 ID 后把这两个值改成 GreasyFork 自己的 URL，但那样从 GitHub Raw 直接安装的用户就失去自动更新了，故**建议保持现状**。

## 四、附加说明文案（复制到 Additional info）

```
## 这是什么
东北财经大学（白果云 ginkgostu）课程详情页里，很多课件是 WPS 在线预览、只能看不能下载。
本脚本把预览链接（weboffice）里的真实源站地址解码出来，让你能直接下载 / 打开原文件。

## 功能
- 自动扫描课程详情页里的 WPS 预览链接（覆盖 a / iframe / 各 data-* 属性，并兜底扫描整页 HTML）。
- 解码出真实源站直链，在**当前页面右下角悬浮窗**里列出（不会自动跳转、不自动开新标签）。
- 悬浮窗内逐条可「新标签打开 / 下载」，底部「复制全部链接」。
- 仅在你点击按钮时手动打开 / 下载，绝不自动跳转。

## 使用方法
1. 安装 Tampermonkey / Violentmonkey 等油猴扩展。
2. 打开 https://ginkgostu.dufe.edu.cn/course/detail （需登录能看到课件的账号）。
3. 页面右下角出现红色「显示真实链接」按钮，点一下即可在悬浮窗看到真实链接。

## 源码 / 反馈
- GitHub 仓库：https://github.com/YiZhiBenBi01/dufe-wps-link
- 问题反馈：https://github.com/YiZhiBenBi01/dufe-wps-link/issues

## 使用须知
本脚本仅用于获取你自己账号下、用于个人学习的课件。请遵守学校与 WPS 的共享设置，勿将下载内容二次传播。
```

## 五、SEO 收益说明

- GreasyFork 脚本主页会展示上面的 GitHub 仓库链接（`homepageURL` + 附加说明里的地址），形成一条指向你仓库的**权威外链**，能明显加快 `github.com/YiZhiBenBi01/dufe-wps-link` 被搜索引擎收录。
- 发布后，可在搜索引擎用 `site:greasyfork.org dufe-wps-link` 验证是否已收录。
