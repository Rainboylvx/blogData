import{_ as s,j as n,g as a,I as l}from"./chunks/framework.6fa7194a.js";const m=JSON.parse('{"title":"lockcore.cpp \u89E3\u6790","description":"","frontmatter":{},"headers":[{"level":2,"title":"lockcore.cpp \u89E3\u6790","slug":"lockcore-cpp-\u89E3\u6790"},{"level":3,"title":"\u91CD\u70B9:try_lock\u7684\u8FC7\u7A0B","slug":"\u91CD\u70B9-try-lock\u7684\u8FC7\u7A0B"},{"level":3,"title":"\u91CD\u70B9:unlock\u7684\u8FC7\u7A0B","slug":"\u91CD\u70B9-unlock\u7684\u8FC7\u7A0B"},{"level":2,"title":"mutex.cpp \u89E3\u6790","slug":"mutex-cpp-\u89E3\u6790"},{"level":3,"title":"1. mutex.lock()\u7684\u4F5C\u7528","slug":"_1-mutex-lock-\u7684\u4F5C\u7528"}],"relativePath":"\u6E90\u7801\u89E3\u8BFB/tinyasync/last.md"}'),p={name:"\u6E90\u7801\u89E3\u8BFB/tinyasync/last.md"},e=l(`<p>\u591A\u4E86\u4E00\u4E2Amemory_pool</p><div class="language-plaintext line-numbers-mode"><button class="copy"></button><span class="lang">plaintext</span><pre><code><span class="line"><span style="color:#A6ACCD;">PoolNode</span></span>
<span class="line"><span style="color:#A6ACCD;">Pool</span></span>
<span class="line"><span style="color:#A6ACCD;">  m_block_size</span></span>
<span class="line"><span style="color:#A6ACCD;">  m_block_per_chunk \u4E00\u4E2Achunk\u5185\u7684block\u7684\u6570\u91CF</span></span>
<span class="line"><span style="color:#A6ACCD;">  PoolNode m_heade \u5934\u7684\u5730\u5740 PoolNode</span></span>
<span class="line"><span style="color:#A6ACCD;">  m_chunks \u5B58\u6BCF\u4E00\u4E2Achunk\u7684\u6307\u9488</span></span>
<span class="line"><span style="color:#A6ACCD;">  alloc() \u7533\u8BF7\u5185\u5B58 ,head \u975E\u7A7A\u5C31\u4ECEhead\u91CC\u53D6</span></span>
<span class="line"><span style="color:#A6ACCD;">  free() \u91CA\u653E\u5185\u5B58,\u4E0D\u662F\u771F\u7684\u91CA\u653E,\u8FD8\u662F\u5B58\u6210\u4E00\u4E2A\u94FE\u8868</span></span>
<span class="line"><span style="color:#A6ACCD;">FreeNode</span></span>
<span class="line"><span style="color:#A6ACCD;">PoolBlock ?</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">PoolImpl</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">\u5305\u542B\u5173\u7CFB </span></span>
<span class="line"><span style="color:#A6ACCD;">---&gt; PoolImpl( PoolBlock(FreeNode))</span></span>
<span class="line"><span style="color:#A6ACCD;">PoolResource(PoolImpl)</span></span>
<span class="line"><span style="color:#A6ACCD;">FixPoolResource(Pool) Fix\u662F\u56FA\u5B9A\u7684\u610F\u601D\u5417?</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">StackfulPoolArg </span></span>
<span class="line"><span style="color:#A6ACCD;">struct StackfulPool \u8FD9\u4E2A\u662F\u505A\u4EC0\u4E48\u7684????</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">class FixPoolResource : public std::pmr::memory_resource</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">class PoolResource : public std::pmr::memory_resource</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br></div></div><p>example \u4E0B\u9762\u6709\u4E00\u4E2A<code>memory_pool</code>\u7684\u6D4B\u8BD5,\u53EF\u4EE5\u5E2E\u52A9\u7406\u89E3\u4EE3\u7801</p><h2 id="lockcore-cpp-\u89E3\u6790" tabindex="-1">lockcore.cpp \u89E3\u6790 <a class="header-anchor" href="#lockcore-cpp-\u89E3\u6790" aria-hidden="true">#</a></h2><p>lockcore\u7684\u5B9A\u4E49,\u5E94\u8BE5\u662F\u9501\u7684\u62BD\u8C61,\u4E3B\u8981\u7684\u4F5C\u7528\u5E94\u8BE5\u662F\u7ED9\u961F\u5217\u52A0\u4E0A\u9501\u{1F512}</p><p>\u5B9E\u73B0\u4E00\u4E2A\u65E0\u9501(lockfree)\u961F\u5217</p><div class="language-plaintext line-numbers-mode"><button class="copy"></button><span class="lang">plaintext</span><pre><code><span class="line"><span style="color:#A6ACCD;">\u6210\u5458\u53D8\u91CF Queue-&gt; \u4E00\u4E2A\u5185\u90E8\u5B58\u50A8 ListNode\u7684\u961F\u5217</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">\u5E38\u91CF\u6807\u8BB0</span></span>
<span class="line"><span style="color:#A6ACCD;">static constexpr int k_mtx_locked = 1; \u5DF2\u9501</span></span>
<span class="line"><span style="color:#A6ACCD;">static constexpr int k_que_locked = 2; \u961F\u5217\u5DF2\u9501</span></span>
<span class="line"><span style="color:#A6ACCD;">static constexpr int k_que_notempty = 4; \u961F\u5217\u4E0D\u7A7A</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">std::atomic&lt;int&gt; m_flags = 0; \u539F\u5B50\u6807\u8BB0flag</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">is_locked \u63D0\u793A\u5F53\u524D\u662F\u5426\u83B7\u5F97\u9501</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><p>\u5206\u6790<code>try_lock</code>\u51FD\u6570,\u6CE8\u91CA\u8BF4\u5B83\u5B8C\u7684\u7684\u529F\u80FD\u5982\u4E0B:</p><ul><li>\u5982\u679C<code>mutex</code>\u5DF2\u9501,\u8FD4\u56DEtrue</li><li>\u5426\u5219,\u52A0\u5165<code>listNode *p</code>,\u8FD4\u56DEfalse</li></ul><p><code>compare_exchange_strong</code></p><h3 id="\u91CD\u70B9-try-lock\u7684\u8FC7\u7A0B" tabindex="-1">\u91CD\u70B9:<code>try_lock</code>\u7684\u8FC7\u7A0B <a class="header-anchor" href="#\u91CD\u70B9-try-lock\u7684\u8FC7\u7A0B" aria-hidden="true">#</a></h3><div class="language-plaintext line-numbers-mode"><button class="copy"></button><span class="lang">plaintext</span><pre><code><span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">lockcore\u7684\u6210\u5458\u53D8\u91CF\u8BBE\u5B9A\u4E86\u4E00\u4E2A\u72B6\u6001:m_flags,\u5B83\u662F\u4E00\u4E2A\u4E09\u5143\u72B6\u6001,[4,2,1],\u5206\u522B\u8868\u793A</span></span>
<span class="line"><span style="color:#A6ACCD;">que_notempty,que_locked,mtx_locked</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">1.\u5F97\u5230 old_flag,\u4E5F\u5C31\u662F\u6B64\u65F6,m_flags\u7684\u72B6\u6001</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">\u8FDB\u884C\u7B2C\u4E00\u8F6E\u7684\u9501</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">- \u662F\u5426\u5DF2\u7ECF \u9501 mtx_locked -- NO --&gt; CAS(old_flag,mtx_locked)</span></span>
<span class="line"><span style="color:#A6ACCD;">  -- yes--&gt; old_flag.clear(que_locked)  \u4FDD\u8BC1que_locked \u65E0\u9501</span></span>
<span class="line"><span style="color:#A6ACCD;">      ---&gt; CAS(old_flags,flag)</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">\u7B2C\u4E8C\u9636\u6BB5,</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">enque true -&gt; \u6B64\u65F6\u9501\u4E86 que_locked ,\u5426\u5219 \u9501\u4E86 mtx_locked</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">\u8981\u4E48\u9501\u4E86 mtx_locked</span></span>
<span class="line"><span style="color:#A6ACCD;">\u8981\u4E48\u9501\u4E86 que_locked</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">\u5982\u679C mtx_locked,\u5728debug\u7684\u72B6\u6001\u4E0B</span></span>
<span class="line"><span style="color:#A6ACCD;">    -&gt; mtx_thd_cnt+=1 \u8BB0\u5F55\u6709\u51E0\u4E2A\u7EBF\u7A0B \u901A\u8FC7 mtx_locked \u9501\u4F4F,\u5360\u7528\u7684\u7EBF\u7A0B</span></span>
<span class="line"><span style="color:#A6ACCD;">    -&gt; return true ,\u8868\u793A\u9501\u4F4F\u4E86?</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">\u5982\u679C que_locked,\u5728debug\u7684\u72B6\u6001\u4E0B</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">  m_que.push(p)</span></span>
<span class="line"><span style="color:#A6ACCD;">    get_old_flag</span></span>
<span class="line"><span style="color:#A6ACCD;">    flag.clear(que_locked)</span></span>
<span class="line"><span style="color:#A6ACCD;">    flag.set(que_notempty)</span></span>
<span class="line"><span style="color:#A6ACCD;">    CAS(old_flags,flag)</span></span>
<span class="line"><span style="color:#A6ACCD;">    \u786E\u5B9E\u6E05\u9664\u4E86 que_locked \u6807\u8BB0</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br></div></div><h3 id="\u91CD\u70B9-unlock\u7684\u8FC7\u7A0B" tabindex="-1">\u91CD\u70B9:<code>unlock</code>\u7684\u8FC7\u7A0B <a class="header-anchor" href="#\u91CD\u70B9-unlock\u7684\u8FC7\u7A0B" aria-hidden="true">#</a></h3><div class="language- line-numbers-mode"><button class="copy"></button><span class="lang"></span><pre><code><span class="line"><span style="color:#A6ACCD;">unlock \u53D1\u751F\u7684\u4E8B\u60C5</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">\u5F97\u5230 old_flags</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">\u7B2C\u4E00\u9636\u6BB5</span></span>
<span class="line"><span style="color:#A6ACCD;">  que_empty -&gt; yes -- &gt; flag = clear mtx_mtx_locked -&gt;[ 0|0|0]</span></span>
<span class="line"><span style="color:#A6ACCD;">  |</span></span>
<span class="line"><span style="color:#A6ACCD;">  |</span></span>
<span class="line"><span style="color:#A6ACCD;">  No</span></span>
<span class="line"><span style="color:#A6ACCD;">    flag = old_flags | que_locked</span></span>
<span class="line"><span style="color:#A6ACCD;">    old_flags -&gt; clear que_locked</span></span>
<span class="line"><span style="color:#A6ACCD;">CAS(old_flags ,flag) -&gt; \u6539\u6210\u65B0\u7684\u72B6\u6001</span></span>
<span class="line"><span style="color:#A6ACCD;">\u603B\u7ED3:unlock \u4E0B</span></span>
<span class="line"><span style="color:#A6ACCD;">  \u5982\u679C \u961F\u5217\u7A7A -&gt; m_flag \u53D8\u6210 000</span></span>
<span class="line"><span style="color:#A6ACCD;">  \u4E0D\u7A7A flag\u4E3Aold_flag\u52A0\u4E0Aque_locked,\u540C\u65F6\u4FDD\u8BC1CAS\u65F6old_flag\u65E0que_locked</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">\u5982\u679Cque_empty </span></span>
<span class="line"><span style="color:#A6ACCD;">  return nullptr</span></span>
<span class="line"><span style="color:#A6ACCD;">else head = que.pop()</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">\u7B2C\u4E8C\u9636\u6BB5</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">flag que_notempty or que_locked</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">CAS(old_flags,flag), \u6E05\u7A7A que_locked \u9501</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br></div></div><p>\u53EF\u4EE5\u628A\u6574\u4E2Alockcore\u8BA4\u4E3A\u662F\u4E00\u4E2A\u53EF\u4EE5\u4F7F\u7528\u7684\u65E0\u9501\u7684\u961F\u5217</p><h2 id="mutex-cpp-\u89E3\u6790" tabindex="-1">mutex.cpp \u89E3\u6790 <a class="header-anchor" href="#mutex-cpp-\u89E3\u6790" aria-hidden="true">#</a></h2><p>example \u76EE\u5F55\u4E0B\u7684<code>mutex.cpp</code>\u5199\u7684\u662F<code>mutex.h</code>\u7684\u6D4B\u8BD5,\u7406\u89E3\u8FD9\u4E2A\u4EE3\u7801\u53EF\u4EE5\u7406\u89E3<code>mutex.h</code>\u4EE3\u7801\u7684\u76EE\u7684.</p><h3 id="_1-mutex-lock-\u7684\u4F5C\u7528" tabindex="-1">1. <code>mutex.lock()</code>\u7684\u4F5C\u7528 <a class="header-anchor" href="#_1-mutex-lock-\u7684\u4F5C\u7528" aria-hidden="true">#</a></h3><p>!!! \u5B83\u52A0\u4E0A\u7684\u9501\u7684\u4F5C\u7528\u662F\u4EC0\u4E48?\u6216\u8005\u8BF4\u660E\u52A0\u9501\u7684\u76EE\u7684\u662F\u4EC0\u4E48?</p><p>\u51FD\u6570\u5B9A\u4E49,\u8FD4\u56DE\u4E00\u4E2A<code>MutexLockAwaiter</code>\u5BF9\u8C61</p><div class="language-plaintext line-numbers-mode"><button class="copy"></button><span class="lang">plaintext</span><pre><code><span class="line"><span style="color:#A6ACCD;">MutexLockAwaiter lock(IoContext &amp;ctx)</span></span>
<span class="line"><span style="color:#A6ACCD;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    return {*this, *ctx.get_io_ctx_base()};</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>\u4E00\u4E2A<code>awaiter</code>\u5BF9\u8C61\u8FD0\u884C\u7684\u8FC7\u7A0B\u662F</p><p><code>MutexLockAwaiter</code>\u5BF9\u8C61\u7684\u4E3B\u8981</p><div class="language-plaintext line-numbers-mode"><button class="copy"></button><span class="lang">plaintext</span><pre><code><span class="line"><span style="color:#A6ACCD;">await_ready -&gt; false \u6240\u4EE5\u76F4\u63A5\u6302\u8D77\u4E86</span></span>
<span class="line"><span style="color:#A6ACCD;">|</span></span>
<span class="line"><span style="color:#A6ACCD;">V</span></span>
<span class="line"><span style="color:#A6ACCD;">\u5F97\u5230 suspended_coroutine_base</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">-&gt; \u6838\u5FC3\u662F\u8C03\u7528\u4E86m_mutex\u7684m_lockcore-&gt;try_lock(m_node)</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">\u5982\u4F55 </span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">\u5F53\u7B2C\u4E00\u6B21\u6267\u884Cmtx.lock\u65F6,m_lockcore\u91CC\u7684\u5143\u7D20m_flag\u4E3A000,\u4E5F\u5C31\u662Fflag_mtx_locked = 0</span></span>
<span class="line"><span style="color:#A6ACCD;">\u6240\u4EE5m_lockcore.try_lock() \u8FD4\u56DEtrue</span></span>
<span class="line"><span style="color:#A6ACCD;">m_lockcore-&gt; try_lock \u8BBE\u7F6E\u4E86 mtx_locked -&gt; own_mtx = true -&gt; !own_mtx = false</span></span>
<span class="line"><span style="color:#A6ACCD;">      \u5F53\u524D\u7684\u534F\u7A0B\u6CA1\u6709\u6302\u8D77</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">\u5982\u4F55 m_lockcore-&gt; try_lock \u8BBE\u7F6E\u4E86 mtx_que_locked -&gt; own_mtx = false -&gt; !own_mtx = true</span></span>
<span class="line"><span style="color:#A6ACCD;">      q \u5165\u961F\u4E86</span></span>
<span class="line"><span style="color:#A6ACCD;">      \u5F53\u524D\u7684\u534F\u7A0B\u6CA1\u6709\u6302\u8D77,</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br></div></div><div class="language-plaintext line-numbers-mode"><button class="copy"></button><span class="lang">plaintext</span><pre><code><span class="line"><span style="color:#A6ACCD;">mtx.unlock</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">\u4ECElockcore\u91CC\u53D6\u51FA awaiter</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">\u52A0\u5165\u5230ctx\u7684task list</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div>`,25),c=[e];function o(r,t,i,b,A,C){return a(),n("div",null,c)}var d=s(p,[["render",o]]);export{m as __pageData,d as default};
