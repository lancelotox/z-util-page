const { MarkdownTheme } = require('./theme');

class MyMarkdownTheme extends MarkdownTheme {
  getUrls(project) {
    return [{
      url: 'README.md',
      model: project,
      template: (page) => {
        return this.getRenderContext(page).templates.project(page);
      }
    }]
  }
}

/** 
 * @param {import('typedoc-plugin-markdown').MarkdownApplication} app
 */
module.exports = {
  load(app) {
    app.renderer.defineTheme('oneTheme', MyMarkdownTheme);
  }
}

