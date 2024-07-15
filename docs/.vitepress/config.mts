import { defineConfig } from 'vitepress';
import sidebar from '../md/typedoc-sidebar.json';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "z-util-page",
  description: "一个基于TS的WEB工具库",
  outDir: "html",
  base: "/html/",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' },
      { text: '快速开始', link: '/start' },
      { text: 'API文档', link: '/md/index' }
    ],
    sidebar: resolveLink(sidebar),
    socialLinks: [
      { icon: 'github', link: 'https://github.com/lancelotox/z-util-page' }
    ]
  }
})


function resolveLink(tree: any[]) {
  tree.forEach(item => {
    item.link && (item.link = item.link.replace(/\/+/, '/'));
    if (Array.isArray(item.items)) {
      resolveLink(item.items)
    }
  })
  return tree;
}