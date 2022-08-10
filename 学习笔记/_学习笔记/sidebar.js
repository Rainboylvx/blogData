const {abs_path} = require('myutils')

module.exports = {
  text: '学习笔记',
  collapsible: true,
  //collapsed: true,
  items : [
    { text: 'Learn Vim Script The Hard Way', link: abs_path(import.meta.url, 'learn_vimscript_the_hard_way.md') },
  ]
}
