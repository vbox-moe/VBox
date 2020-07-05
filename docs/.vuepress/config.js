module.exports = {
  title: 'VBox',
  description: '',
  theme: 'vuepress-theme-vbox',
  themeConfig: {
    oauth: {
      prod: {
        id: '310cf13f466eff204be5',
        secret: '5fdfe06de0150e3b49283ff7857e01cd5f2b8063'
      },
      dev: {
        id: '7f2011f57623382ebea6',
        secret: '36867f1788921671d595a5ab0166661ca92c98cd'
      }
    },
    repo: 'vbox-moe/VBox',
    repoLabel: '查看文档',
    docsDir: 'docs',
    editLinks: true,
    editLinkText: '编辑'
  },
  head: [['link', { rel: 'icon', href: '/logo.png' }]],
  evergreen: true
}
