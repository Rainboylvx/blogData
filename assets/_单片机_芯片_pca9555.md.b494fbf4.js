import{_ as s,j as n,g as a,I as p}from"./chunks/framework.6fa7194a.js";const _=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"_\u5355\u7247\u673A/\u82AF\u7247/pca9555.md"}'),l={name:"_\u5355\u7247\u673A/\u82AF\u7247/pca9555.md"},e=p(`<p>\u67098\u4E2A\u5BC4\u5B58\u5668</p><div class="language-plaintext line-numbers-mode"><button class="copy"></button><span class="lang">plaintext</span><pre><code><span class="line"><span style="color:#A6ACCD;">+----+----------------------------+</span></span>
<span class="line"><span style="color:#A6ACCD;">| 0  |  input port 0              |</span></span>
<span class="line"><span style="color:#A6ACCD;">+----+----------------------------+</span></span>
<span class="line"><span style="color:#A6ACCD;">| 1  |  input port 1              |</span></span>
<span class="line"><span style="color:#A6ACCD;">+----+----------------------------+</span></span>
<span class="line"><span style="color:#A6ACCD;">| 2  |  output port 0             |</span></span>
<span class="line"><span style="color:#A6ACCD;">+----+----------------------------+</span></span>
<span class="line"><span style="color:#A6ACCD;">| 3  |  output port 1             |</span></span>
<span class="line"><span style="color:#A6ACCD;">+----+----------------------------+</span></span>
<span class="line"><span style="color:#A6ACCD;">| 4  |  Polarity inversion port 0 |</span></span>
<span class="line"><span style="color:#A6ACCD;">+----+----------------------------+</span></span>
<span class="line"><span style="color:#A6ACCD;">| 5  |  Polarity inversion port 1 |</span></span>
<span class="line"><span style="color:#A6ACCD;">+----+----------------------------+</span></span>
<span class="line"><span style="color:#A6ACCD;">| 6  |  configuration port 0      |</span></span>
<span class="line"><span style="color:#A6ACCD;">+----+----------------------------+</span></span>
<span class="line"><span style="color:#A6ACCD;">| 7  |  configuration port 1      |</span></span>
<span class="line"><span style="color:#A6ACCD;">+----+----------------------------+</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br></div></div><p>0/1\u8F93\u5165\u5BC4\u5B58\u5668 \u53EA\u8BFB \u7528\u6765\u8BFB\u53D6pin\u7684\u503C 2/3\u8F93\u51FA\u5BC4\u5B58\u5668 \u914D\u7F6Eouput pin\u7684\u8F93\u51FA\u503C 4/5\u6781\u6027\u53CD\u8F6C\u5BC4\u5B58\u5668 \u57FA\u672C\u65E0\u7528 6/7\u914D\u7F6E\u5BC4\u5B58\u5668 1 ==&gt; \u9AD8\u963B\u6297\u8F93\u5165 0 ==&gt; \u8F93\u51FA</p><p>i2cset -f -y 1 0x20 0x06 0x00 i2cset -f -y 1 0x20 0x02 0x00</p>`,4),r=[e];function c(o,t,i,A,b,C){return a(),n("div",null,r)}var m=s(l,[["render",c]]);export{_ as __pageData,m as default};
