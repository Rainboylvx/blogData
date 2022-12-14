import{_ as s,j as n,g as a,I as l}from"./chunks/framework.6fa7194a.js";const A=JSON.parse('{"title":"tokenize","description":"","frontmatter":{},"headers":[{"level":2,"title":"tokenize","slug":"tokenize"},{"level":3,"title":"1. table\u89E3\u6790\u7684\u89C4\u5219","slug":"_1-table\u89E3\u6790\u7684\u89C4\u5219"},{"level":3,"title":"2. code\u89E3\u6790\u7684\u89C4\u5219","slug":"_2-code\u89E3\u6790\u7684\u89C4\u5219"},{"level":3,"title":"3. fence\u89E3\u6790\u7684\u89C4\u5219","slug":"_3-fence\u89E3\u6790\u7684\u89C4\u5219"},{"level":3,"title":"4. blockquote\u89E3\u6790\u7684\u89C4\u5219","slug":"_4-blockquote\u89E3\u6790\u7684\u89C4\u5219"}],"relativePath":"\u6E90\u7801\u89E3\u8BFB/markdown-it/block-table.md"}'),e={name:"\u6E90\u7801\u89E3\u8BFB/markdown-it/block-table.md"},p=l(`<p>block_state</p><p>\u5C5E\u6027</p><div class="language-plaintext line-numbers-mode"><button class="copy"></button><span class="lang">plaintext</span><pre><code><span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">  this.tokens = tokens</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">  this.bMarks = [] //\u6BCF\u4E00\u884C\u7684\u8D77\u59CB\u4F4D\u7F6E</span></span>
<span class="line"><span style="color:#A6ACCD;">  this.eMarks = [] //\u6BCF\u4E00\u884C\u7684\u7ED3\u675F\u4F4D\u7F6E</span></span>
<span class="line"><span style="color:#A6ACCD;">  this.tShift = [] //\u8FD9\u4E00\u884C\u7684,\u7B2C\u4E00\u4E2A\u975E\u7A7A\u5B57\u7B26\u7684\u504F\u79FB\u4F4D\u7F6E</span></span>
<span class="line"><span style="color:#A6ACCD;">  this.sCount = [] //\u5BF9\u5E94\u884C space count (tab expanded)</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">  //\u884C\u5F00\u5934\u865A\u62DF\u7684\u7A7A\u683C</span></span>
<span class="line"><span style="color:#A6ACCD;">  //\u4F5C\u4E3Ahack\u5B58\u5728,blockquotes\u4F1A\u91CD\u5199 bMarks,\u5728\u6267\u884C\u7684\u65F6\u5019\u4E22\u5931\u5BF9\u5E94\u7684\u4FE1\u606F</span></span>
<span class="line"><span style="color:#A6ACCD;">  // \u53EA\u6709\u5728expand tab \u65F6\u5019\u6709\u7528</span></span>
<span class="line"><span style="color:#A6ACCD;">  this.bsCount = [] //\u901A\u5E38\u4E3A0</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">  this.blkIndent  = 0 // block indent</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">  this.line       = 0 // \u7B2C\u51E0\u884C</span></span>
<span class="line"><span style="color:#A6ACCD;">  this.lineMax    = 0 // \u4E00\u5171\u6709\u591A\u5C11\u884C</span></span>
<span class="line"><span style="color:#A6ACCD;">  this.tight      = false // list mod 1. loose 2 tight</span></span>
<span class="line"><span style="color:#A6ACCD;">  this.ddIndent   = -1 // for dd block</span></span>
<span class="line"><span style="color:#A6ACCD;">  this.listIndext = -1 // for list block</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">  // \u53EF\u80FD blockquote list root paragraph reference</span></span>
<span class="line"><span style="color:#A6ACCD;">  // \u5728list\u4E2D\u4F7F\u7528\u65F6,\u53EF\u4EE5\u5224\u65AD\u662F\u5426\u6253\u65AD paragraph</span></span>
<span class="line"><span style="color:#A6ACCD;">  this.parentType = &#39;root&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">  this.level  ?</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br></div></div><h2 id="tokenize" tabindex="-1">tokenize <a class="header-anchor" href="#tokenize" aria-hidden="true">#</a></h2><h3 id="_1-table\u89E3\u6790\u7684\u89C4\u5219" tabindex="-1">1. table\u89E3\u6790\u7684\u89C4\u5219 <a class="header-anchor" href="#_1-table\u89E3\u6790\u7684\u89C4\u5219" aria-hidden="true">#</a></h3><p>\u53C2\u6570</p><ul><li>state \u72B6\u6001</li><li>startLine \u8D77\u59CB\u884C</li><li>endLine \u7EC8\u6B62\u884C</li><li>silent ,\u6C89\u9ED8? \u8868\u793A\u89E3\u6790\u540E\u52A0\u5165token</li></ul><p>\u8FD4\u56DE\u503C,true \u8868\u793A\u662F\u5426\u89E3\u6790\u6210\u529F</p><p><a href="https://www.markdownguide.org/extended-syntax/#tables" target="_blank" rel="noreferrer">table\u8BED\u6CD5</a></p><ol><li>\u521B\u5EFA\u4E00\u4E2Atable,\u7531hyphens and pips \u7EC4\u6210</li><li>alignment, <code>:---, :---:,---:</code></li><li>format cell text</li><li>escape pipe char <code>&amp;#124;</code></li></ol><p>\u4EE3\u7801\u5B9E\u73B0\u7684\u5177\u4F53\u89C4\u5219,\u6309\u987A\u5E8F</p><ol start="0"><li>\u8D77\u59CB\u884C\u7B2C0\u884C\u662Fheader,\u6240\u4EE5nextLine\u5C31\u662F column \u884C</li><li>\u5230\u5C11\u8981\u6709\u4E24\u884C,\u56E0\u4E3A header + columns \u8981\u6709\u4E24\u884C</li><li>\u5E38\u89C4\u67E5\u68C0: \u5728\u8981\u6C42\u7684blkIndent\u5185</li><li><blockquote><p>=4\u4E2A\u7A7A\u683C\u5C31\u662Fcode block</p></blockquote></li><li>\u7B2C\u4E8C\u884C\u4E0D\u80FD\u662F\u7A7A\u884C</li><li>\u68C0\u67E5table\u7684\u7B2C\u4E8C\u884C</li><li>\u8D77\u59CB\u5B57\u7B26\u662F<code>- | :</code>\u4E4B\u4E00</li><li>\u4E0D\u80FD\u53EA\u6709\u4E00\u4E2A\u5B57\u7B26</li><li>\u7B2C\u4E8C\u5B57\u7B26\u53EA\u80FD\u662F<code>- | :,\u7A7A\u767D\u5B57\u7B26</code>\u4E4B\u4E00</li><li>\u7B2C\u4E00\u4E2A\u5B57\u7B26\u662F<code>-</code>,\u90A3\u7B2C\u4E8C\u4E2A\u5B57\u7B26\u5C31\u5FC5\u987B\u4E0D\u662F\u7A7A\u767D</li><li>\u540E\u9762\u7684\u5B57\u7B26\u53EA\u80FD\u662F<code>- | : \u7A7A\u767D</code>\u4E4B\u4E00</li></ol><div class="language- line-numbers-mode"><button class="copy"></button><span class="lang"></span><pre><code><span class="line"><span style="color:#A6ACCD;">/ ^[-:|][-:|\\s]*$ /</span></span>
<span class="line"><span style="color:#A6ACCD;">|||| ok</span></span>
<span class="line"><span style="color:#A6ACCD;">-|--|--| ok</span></span>
<span class="line"><span style="color:#A6ACCD;">-||||| ok</span></span>
<span class="line"><span style="color:#A6ACCD;">:||||| ok</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><ol start="6"><li>\u68C0\u67E5<code>|</code>\u4E2D\u95F4\u7684\u4E32,\u5E76\u786E\u5B9Aalign</li><li>\u68C0\u67E5\u9996\u884C</li><li>\u5E38\u89C4\u67E5\u68C0: \u5728\u8981\u6C42\u7684blkIndent\u5185</li><li>\u5FC5\u987B\u542B\u6709<code>|</code></li><li>\u548C\u7B2C\u4E8C\u884C\u5339\u914D</li><li>\u8FDB\u884Ctokenize</li></ol><ul><li>7.1 parentType= &#39;table&#39;</li></ul><div class="language- line-numbers-mode"><button class="copy"></button><span class="lang"></span><pre><code><span class="line"><span style="color:#A6ACCD;">table_oepn </span></span>
<span class="line"><span style="color:#A6ACCD;">thead_open</span></span>
<span class="line"><span style="color:#A6ACCD;">tr_open</span></span>
<span class="line"><span style="color:#A6ACCD;">for:</span></span>
<span class="line"><span style="color:#A6ACCD;">  th_open</span></span>
<span class="line"><span style="color:#A6ACCD;">  inline(columns)</span></span>
<span class="line"><span style="color:#A6ACCD;">  th_close</span></span>
<span class="line"><span style="color:#A6ACCD;">tr_close</span></span>
<span class="line"><span style="color:#A6ACCD;">thead_close</span></span>
<span class="line"><span style="color:#A6ACCD;">table_close </span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><ul><li>7.2 \u4E00\u884C\u4E00\u884C\u68C0\u67E5tbody</li></ul><div class="language- line-numbers-mode"><button class="copy"></button><span class="lang"></span><pre><code><span class="line"><span style="color:#A6ACCD;">tbody_open</span></span>
<span class="line"><span style="color:#A6ACCD;">tr_open</span></span>
<span class="line"><span style="color:#A6ACCD;">for:</span></span>
<span class="line"><span style="color:#A6ACCD;">  td_open</span></span>
<span class="line"><span style="color:#A6ACCD;">  columns[i]</span></span>
<span class="line"><span style="color:#A6ACCD;">  td_close</span></span>
<span class="line"><span style="color:#A6ACCD;">tr_close</span></span>
<span class="line"><span style="color:#A6ACCD;">if tbodyLines \u5982\u679Ctbody \u5B58\u5728,\u5B58\u7684tbody \u5BF9\u5C31\u7684\u884C,\u5BF9\u5E94tbody_open token.map</span></span>
<span class="line"><span style="color:#A6ACCD;">  tbody_close</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><ul><li>7.3 ? terminatorRules -&gt; blockquote: fence,blockquote,hr,list,html_block,heading</li></ul><h3 id="_2-code\u89E3\u6790\u7684\u89C4\u5219" tabindex="-1">2. code\u89E3\u6790\u7684\u89C4\u5219 <a class="header-anchor" href="#_2-code\u89E3\u6790\u7684\u89C4\u5219" aria-hidden="true">#</a></h3><p>\u5F88\u7B80\u5355</p><p>\u8FDE\u7EED\u7684\u591A\u4E2A&gt;=4\u4E2A\u7A7A\u683C\u7684(\u5305\u542B\u7A84)\u884C\u5C31\u662Fcode</p><p>\u7279\u70B9,\u6CA1\u6709silent</p><h3 id="_3-fence\u89E3\u6790\u7684\u89C4\u5219" tabindex="-1">3. fence\u89E3\u6790\u7684\u89C4\u5219 <a class="header-anchor" href="#_3-fence\u89E3\u6790\u7684\u89C4\u5219" aria-hidden="true">#</a></h3><ol><li>\u4E0D\u80FD\u591A\u4E8E4\u4E2A\u7A7A\u683C</li><li>\u9996\u884C\u81F3\u5C11\u67093\u4E2A\u5B57\u7B26</li><li>\u9996\u4E2A\u5B57\u7B26\u662F\`~ \`\`\u4E4B\u4E00</li><li>\u8FDE\u7EED\u7684mark\u5927\u4E8E3</li><li>params\u91CC\u4E0D\u80FD\`\`\`</li><li>\u521B\u5EFAtoken</li></ol><ul><li>6.1 \u7ED3\u675F\u7684\u53EF\u80FD\u60C5\u51B5</li><li>\u6574\u4E2Amd\u6587\u4EF6\u7ED3\u675F</li><li>\u5F53\u524D\u884C\u975E\u7A7A,\u4E14 \u4E0D\u5728 blkIndent \u5185,\u5E94\u8BE5\u662F\u7279\u6B8A\u7684\u4E00\u79CDlist,list\u5185\u7684fence</li><li>\u5BF9\u5E94\u7684fence endMark</li></ul><h3 id="_4-blockquote\u89E3\u6790\u7684\u89C4\u5219" tabindex="-1">4. blockquote\u89E3\u6790\u7684\u89C4\u5219 <a class="header-anchor" href="#_4-blockquote\u89E3\u6790\u7684\u89C4\u5219" aria-hidden="true">#</a></h3><ol><li>\u5E38\u89C4\u67E5\u68C0 \u5728blkIndent\u5185</li><li>\u9996\u4E2A\u5B57\u7B26\u662F<code>&gt;</code></li></ol>`,28),i=[p];function o(c,r,t,b,d,u){return a(),n("div",null,i)}var m=s(e,[["render",o]]);export{A as __pageData,m as default};
