import{_ as e,j as a,g as s,I as n}from"./chunks/framework.6fa7194a.js";const b=JSON.parse('{"title":"0. IoContext\u7684\u6574\u4F53\u6846\u67B6\u662F\u4EC0\u4E48?","description":"","frontmatter":{},"headers":[{"level":2,"title":"0. IoContext\u7684\u6574\u4F53\u6846\u67B6\u662F\u4EC0\u4E48?","slug":"_0-iocontext\u7684\u6574\u4F53\u6846\u67B6\u662F\u4EC0\u4E48"},{"level":2,"title":"1. \u7C7BAcceptor\u505A\u4E86\u4EC0\u4E48\u4E8B?","slug":"_1-\u7C7Bacceptor\u505A\u4E86\u4EC0\u4E48\u4E8B"},{"level":2,"title":"2. acceptor.async_accept\u505A\u4E86\u4EC0\u4E48\u4E8B?","slug":"_2-acceptor-async-accept\u505A\u4E86\u4EC0\u4E48\u4E8B"},{"level":2,"title":"3. co_spawn\u8FD0\u884C\u7684\u89C4\u5219,","slug":"_3-co-spawn\u8FD0\u884C\u7684\u89C4\u5219"},{"level":2,"title":"\u603B\u7ED3","slug":"\u603B\u7ED3"}],"relativePath":"\u6E90\u7801\u89E3\u8BFB/tinyasync/example/echo_server.md"}'),c={name:"\u6E90\u7801\u89E3\u8BFB/tinyasync/example/echo_server.md"},l=n(`<p><code>example/echo_server</code>\u8FD0\u884C\u5206\u6790</p><div class="language-plaintext line-numbers-mode"><button class="copy"></button><span class="lang">plaintext</span><pre><code><span class="line"><span style="color:#A6ACCD;">\u5B9A\u4E49ctx</span></span>
<span class="line"><span style="color:#A6ACCD;">listen(ctx)</span></span>
<span class="line"><span style="color:#A6ACCD;">ctx.run()</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><ol start="0"><li>IoContext\u7684\u6574\u4F53\u6846\u67B6\u662F\u4EC0\u4E48?</li><li>\u7C7BAcceptor\u505A\u4E86\u4EC0\u4E48\u4E8B?</li><li>acceptor.async_accept\u505A\u4E86\u4EC0\u4E48\u4E8B?</li><li><code>co_spawn</code>\u8FD0\u884C\u7684\u89C4\u5219,</li></ol><h2 id="_0-iocontext\u7684\u6574\u4F53\u6846\u67B6\u662F\u4EC0\u4E48" tabindex="-1">0. IoContext\u7684\u6574\u4F53\u6846\u67B6\u662F\u4EC0\u4E48? <a class="header-anchor" href="#_0-iocontext\u7684\u6574\u4F53\u6846\u67B6\u662F\u4EC0\u4E48" aria-hidden="true">#</a></h2><p>\u5148\u770B\u4E00\u4E0B<code>epoll_event</code>\u7684\u5B9A\u4E49</p><div class="language-plaintext line-numbers-mode"><button class="copy"></button><span class="lang">plaintext</span><pre><code><span class="line"><span style="color:#A6ACCD;">epoll_event</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">struct ioEvent : public epoll_event ; </span></span>
<span class="line"><span style="color:#A6ACCD;">ioEvent \u5C31\u662F epoll_event</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><h2 id="_1-\u7C7Bacceptor\u505A\u4E86\u4EC0\u4E48\u4E8B" tabindex="-1">1. \u7C7BAcceptor\u505A\u4E86\u4EC0\u4E48\u4E8B? <a class="header-anchor" href="#_1-\u7C7Bacceptor\u505A\u4E86\u4EC0\u4E48\u4E8B" aria-hidden="true">#</a></h2><h2 id="_2-acceptor-async-accept\u505A\u4E86\u4EC0\u4E48\u4E8B" tabindex="-1">2. acceptor.async_accept\u505A\u4E86\u4EC0\u4E48\u4E8B? <a class="header-anchor" href="#_2-acceptor-async-accept\u505A\u4E86\u4EC0\u4E48\u4E8B" aria-hidden="true">#</a></h2><h2 id="_3-co-spawn\u8FD0\u884C\u7684\u89C4\u5219" tabindex="-1">3. <code>co_spawn</code>\u8FD0\u884C\u7684\u89C4\u5219, <a class="header-anchor" href="#_3-co-spawn\u8FD0\u884C\u7684\u89C4\u5219" aria-hidden="true">#</a></h2><h2 id="\u603B\u7ED3" tabindex="-1">\u603B\u7ED3 <a class="header-anchor" href="#\u603B\u7ED3" aria-hidden="true">#</a></h2><p>\u4E00\u4E2A\u5355\u7EBF\u7A0B\u7684echo\u670D\u52A1\u5668</p>`,11),t=[l];function p(o,r,i,d,_,h){return s(),a("div",null,t)}var v=e(c,[["render",p]]);export{b as __pageData,v as default};
