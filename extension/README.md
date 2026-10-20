# DUFEE 课件真实链接提取器（浏览器扩展版）

把原来的 Tampermonkey 油猴脚本升级为 **Manifest V3 浏览器扩展**，在支持 WebExtensions 的浏览器中**无需安装 Tampermonkey** 即可原生使用。

## 支持的浏览器

| 浏览器 | 加载方式 |
| --- | --- |
| Chrome / Brave / Vivaldi / Opera | `chrome://extensions` → 开发者模式 → 加载已解压的扩展程序 |
| Edge | `edge://extensions` → 开发者模式 → 加载已解压的扩展程序 |
| Firefox（109+） | `about:debugging` → 此 Firefox → 临时载入附加组件 |

> 本扩展仅用到 content script，未使用任何 Firefox 不支持的 MV3 API，因此**同一套文件跨浏览器通用**。

## 文件结构

```
dufe-wps-link/
├── manifest.json   # 扩展清单（MV3），声明匹配站点与注入脚本
├── content.js      # 核心逻辑：扫描页面 → 解码 _w_third_business → 在当前页悬浮窗显示真实链接
└── README.md
```

## 安装试用（开发者模式）

1. 下载本仓库：GitHub 页面点绿色 **Code → Download ZIP**，解压后进入其中的 `extension/` 子文件夹（也可 `git clone`）。
2. 打开浏览器的扩展管理页（见上表地址）。
3. 开启「开发者模式」（Chrome/Edge 右上角；Firefox 在 `about:debugging` 无需此步）。
4. 点「加载已解压的扩展程序 / 临时载入附加组件」，选择 **`extension/` 文件夹**（即内含 `manifest.json` 的那一层）。
5. 加载成功后，打开 `https://ginkgostu.dufe.edu.cn/course/detail`，右下角出现红色 **「显示真实链接」** 按钮即可使用。

> Firefox 的「临时载入」每次浏览器重启需重新载入，属正常现象；正式上架 AMO 后可常驻。

## 使用

同油猴版：打开课程详情页（需已登录）→ 点右下角按钮 → 自动扫描并在**当前页面悬浮窗**列出全部真实链接（**不自动跳转**；需手动点「新标签打开 / 下载 / 复制全部链接」）。

## 与油猴版的区别

- 不再依赖 Tampermonkey，浏览器原生支持。
- 触发范围由脚本 `@match` 变为 `manifest.json` 的 `content_scripts.matches`。
- 核心解码逻辑完全一致。

## 发布到应用商店（可选，下一步）

- **Chrome Web Store / Edge Add-ons**：注册开发者并支付一次性费用，把本文件夹打包成 zip 提交审核。
- **Firefox AMO**：打包成 `.xpi` 提交。
- 需要自动更新时，商店会托管更新，无需像油猴那样自管 `@updateURL`。

如需我帮你打包成 `zip` / `.xpi`，或补一个扩展图标（`icons/icon128.png`），告诉我即可。

## License

MIT
