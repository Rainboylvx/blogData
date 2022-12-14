import{_ as a,j as l,k as p,z as e,x as c,I as s,t as r,g as o}from"./chunks/framework.6fa7194a.js";const g=JSON.parse('{"title":"1 \u6839\u636E\u987A\u5E8F\u5148\u8BFBbasics.h","description":"","frontmatter":{},"headers":[{"level":2,"title":"1 \u6839\u636E\u987A\u5E8F\u5148\u8BFBbasics.h","slug":"_1-\u6839\u636E\u987A\u5E8F\u5148\u8BFBbasics-h"},{"level":2,"title":"task.h","slug":"task-h"},{"level":2,"title":"io_context","slug":"io-context"},{"level":2,"title":"buffer","slug":"buffer"},{"level":2,"title":"mutex","slug":"mutex"}],"relativePath":"\u6E90\u7801\u89E3\u8BFB/tinyasync/pingpong.md"}'),i={name:"\u6E90\u7801\u89E3\u8BFB/tinyasync/pingpong.md"},t=s(`<p>\u4E00\u53E3\u6C14\u5230 <code>e49c42644cd5ce3e2aaaf35b2d67fc2c494237c5</code>\u7B2C26\u4E2A\u63D0\u4EA4,ping pong benchmark</p><p>\u8BA9\u6211\u4EEC\u5F00\u59CB\u8BFB\u4EE3\u7801\u5427</p><div class="language-plaintext line-numbers-mode"><button class="copy"></button><span class="lang">plaintext</span><pre><code><span class="line"><span style="color:#A6ACCD;">\u251C\u2500\u2500 chatroom_server</span></span>
<span class="line"><span style="color:#A6ACCD;">\u251C\u2500\u2500 condition_variable</span></span>
<span class="line"><span style="color:#A6ACCD;">\u251C\u2500\u2500 coroutine_task</span></span>
<span class="line"><span style="color:#A6ACCD;">\u251C\u2500\u2500 echo_server</span></span>
<span class="line"><span style="color:#A6ACCD;">\u251C\u2500\u2500 http_client</span></span>
<span class="line"><span style="color:#A6ACCD;">\u251C\u2500\u2500 http_helloworld_server</span></span>
<span class="line"><span style="color:#A6ACCD;">\u251C\u2500\u2500 lockcore</span></span>
<span class="line"><span style="color:#A6ACCD;">\u251C\u2500\u2500 mutex</span></span>
<span class="line"><span style="color:#A6ACCD;">\u251C\u2500\u2500 pingpong</span></span>
<span class="line"><span style="color:#A6ACCD;">\u251C\u2500\u2500 sleepsort</span></span>
<span class="line"><span style="color:#A6ACCD;">\u2514\u2500\u2500 wait</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><p>\u591A\u4E86\u5F88\u591A\u7684\u6D4B\u8BD5</p><div class="language-plaintext line-numbers-mode"><button class="copy"></button><span class="lang">plaintext</span><pre><code><span class="line"><span style="color:#A6ACCD;">#include &quot;basics.h&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">#include &quot;task.h&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">#include &quot;io_context.h&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">#include &quot;buffer.h&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">#include &quot;awaiters.h&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">#include &quot;mutex.h&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><h2 id="_1-\u6839\u636E\u987A\u5E8F\u5148\u8BFBbasics-h" tabindex="-1">1 \u6839\u636E\u987A\u5E8F\u5148\u8BFB<code>basics.h</code> <a class="header-anchor" href="#_1-\u6839\u636E\u987A\u5E8F\u5148\u8BFBbasics-h" aria-hidden="true">#</a></h2><div class="language-plaintext line-numbers-mode"><button class="copy"></button><span class="lang">plaintext</span><pre><code><span class="line"><span style="color:#A6ACCD;">\u7C7B\u4F3Cc\u7684printf\u683C\u5F0F\u5316\u6210string</span></span>
<span class="line"><span style="color:#A6ACCD;">std::string format(char const* fmt, ...)</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">chrono\u8F6Ctimespec</span></span>
<span class="line"><span style="color:#A6ACCD;">timespec to_timespec(std::chrono::nanoseconds nanoseconds)</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">sleep</span></span>
<span class="line"><span style="color:#A6ACCD;">void sync_sleep(std::chrono::nanoseconds nanoseconds)</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">typeid(int).name() -&gt; &quot;i&quot;--&gt;&quot;int&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">std::string abi_name_demangle(const char* abi_name)</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">?? \u521D\u59CB\u5316 atomic</span></span>
<span class="line"><span style="color:#A6ACCD;">TINYASYNC_VCINL T initialize_once(std::atomic&lt;T&gt;&amp; atom, T uninitialized_flag, std::mutex&amp; mtx, L func)</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">using TypeInfoRef = std::reference_wrapper&lt;const std::type_info&gt;;</span></span>
<span class="line"><span style="color:#A6ACCD;">struct TypeInfoRefHahser </span></span>
<span class="line"><span style="color:#A6ACCD;">struct TypeInfoRefEqualer </span></span>
<span class="line"><span style="color:#A6ACCD;">inline  const char * c_name() ?</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">// socket handle -&gt; c_str</span></span>
<span class="line"><span style="color:#A6ACCD;">inline char const* handle_c_str(NativeHandle handle)</span></span>
<span class="line"><span style="color:#A6ACCD;">inline char const* socket_c_str(NativeSocket handle)</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">exception ---&gt; str</span></span>
<span class="line"><span style="color:#A6ACCD;">void to_string_to(std::exception_ptr const&amp; e, std::string&amp; string_builder)</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">//? \u505A\u4EC0\u4E48\u7528\u7684waiter</span></span>
<span class="line"><span style="color:#A6ACCD;">struct ThisCoroutineAwaiter : std::suspend_always {</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">//exception_ptr -&gt; string</span></span>
<span class="line"><span style="color:#A6ACCD;">std::string to_string(std::exception_ptr const&amp; e)</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">--&gt; log\u7528</span></span>
<span class="line"><span style="color:#A6ACCD;">#ifdef TINYASYNC_TRACE</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">\u627E\u5230trivial\u6570\u636E,\u90A3\u4E48\u76EE\u7684\u662F\u4EC0\u4E48</span></span>
<span class="line"><span style="color:#A6ACCD;">constexpr bool is_trivial_parameter_in_itanium_abi_v =</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">// \u4E3A\u4EC0\u4E48\u5462?</span></span>
<span class="line"><span style="color:#A6ACCD;">// you can safely use memcpy</span></span>
<span class="line"><span style="color:#A6ACCD;">// you can&#39;t safely use memset </span></span>
<span class="line"><span style="color:#A6ACCD;">template &lt;class T&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">constexpr bool has_trivial_five_v =</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">Class Name</span></span>
<span class="line"><span style="color:#A6ACCD;">set_name_r</span></span>
<span class="line"><span style="color:#A6ACCD;">throw_error_</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">\u961F\u5217,\u65E0\u865A\u7C7B\u961F\u5217?</span></span>
<span class="line"><span style="color:#A6ACCD;">listNode</span></span>
<span class="line"><span style="color:#A6ACCD;">Queue</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">class TicketSpinLock ?</span></span>
<span class="line"><span style="color:#A6ACCD;">class SysSpinLock </span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br></div></div><h2 id="task-h" tabindex="-1">task.h <a class="header-anchor" href="#task-h" aria-hidden="true">#</a></h2><div class="language-plaintext line-numbers-mode"><button class="copy"></button><span class="lang">plaintext</span><pre><code><span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">    //resume\u4E4B\u540E\u7684\u7ED3\u679C</span></span>
<span class="line"><span style="color:#A6ACCD;">    // m_return_from</span></span>
<span class="line"><span style="color:#A6ACCD;">    struct ResumeResult;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">    template&lt;class Result&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    class Task;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">    // operator new and delete \u64CD\u4F5C</span></span>
<span class="line"><span style="color:#A6ACCD;">    class TaskPromiseBase {</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">    //\u5B58\u7ED3\u679C</span></span>
<span class="line"><span style="color:#A6ACCD;">    template&lt;class Result&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    class PromiseResultMixin  {</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">    template&lt;&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    class PromiseResultMixin&lt;void&gt;  {</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">    //promise_object</span></span>
<span class="line"><span style="color:#A6ACCD;">    template&lt;class Result&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    class TaskPromise : public TaskPromiseBase,</span></span>
<span class="line"><span style="color:#A6ACCD;">        public PromiseResultMixin&lt;Result&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">    //!\u6CE8\u610FFinal_suspend resume\u4EC0\u4E48\u4E1C\u897F</span></span>
<span class="line"><span style="color:#A6ACCD;">     continuum \u8FD9\u4E2A\u4E1C\u897F</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">    std::coroutine_handle&lt;ToPromise&gt; change_promsie(std::coroutine_handle&lt;Promise&gt; h) {</span></span>
<span class="line"><span style="color:#A6ACCD;">    A-&gt;B</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">    template&lt;class Result = void&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    class [[nodiscard]] Task</span></span>
<span class="line"><span style="color:#A6ACCD;">    !!\u6838\u5FC3\u5728\u4E8E Awaiter \u8981\u5B8C\u6210\u7684\u529F\u80FD</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">    inline void destroy_and_throw_if_necessary_impl(std::coroutine_handle&lt;TaskPromiseBase&gt; coroutine, char const* func)</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">    inline bool destroy_and_throw_if_necessary(std::coroutine_handle&lt;TaskPromiseBase&gt; coroutine, char const* func)</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">    inline void throw_impl(std::coroutine_handle&lt;TaskPromiseBase&gt; coroutine, char const* func)</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">    template&lt;class Result&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    Task&lt;Result&gt; TaskPromise&lt;Result&gt;::get_return_object()</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">    inline bool resume_coroutine(std::coroutine_handle&lt;TaskPromiseBase&gt; coroutine, char const* func = &quot;&quot;)</span></span>
<span class="line"><span style="color:#A6ACCD;">    {</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">    class YieldAwaiter {</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br></div></div><h2 id="io-context" tabindex="-1">io_context <a class="header-anchor" href="#io-context" aria-hidden="true">#</a></h2><div class="language-plaintext line-numbers-mode"><button class="copy"></button><span class="lang">plaintext</span><pre><code><span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">//\u529F\u80FD\u51FD\u6570 \u8F93\u51FA\u4E00\u4E2Aevt\u4EE3\u8868\u7684\u4E8B\u4EF6</span></span>
<span class="line"><span style="color:#A6ACCD;">std::string ioe2str(epoll_event&amp; evt)</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">//\u4E0D\u4F7F\u7528virtul table </span></span>
<span class="line"><span style="color:#A6ACCD;">Callback</span></span>
<span class="line"><span style="color:#A6ACCD;">\u539F\u7406 \u5185\u90E8\u5B58\u4E00\u4E2A\u51FD\u6570\u6307\u9488\`m_callback\`</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">struct CallbackImplBase : Callback</span></span>
<span class="line"><span style="color:#A6ACCD;">\u539F\u7406,\u5229\u7528template\u51FD\u6570\u6765\u5B58\u5B50\u7C7B\u7684\u4FE1\u606F</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">struct PostTask</span></span>
<span class="line"><span style="color:#A6ACCD;">--&gt; from_node -&gt; \u4ECE\u5185\u90E8\u7684\u6210\u5458\u53D8\u91CFm_node\u8F6C\u6210PostTask*</span></span>
<span class="line"><span style="color:#A6ACCD;">--&gt; m_callback</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">class IoCtxBase</span></span>
<span class="line"><span style="color:#A6ACCD;">interface\u7C7B</span></span>
<span class="line"><span style="color:#A6ACCD;">--&gt; run,post_task,request_abort</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">class IoContext</span></span>
<span class="line"><span style="color:#A6ACCD;">template &lt;bool multiple_thread = false&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">IoContext(std::integral_constant&lt;bool, multiple_thread&gt; = std::false_type());</span></span>
<span class="line"><span style="color:#A6ACCD;">\u5B83\u7684\u6784\u9020\u51FD\u6570\u5F88\u795E\u5947,--&gt; \u89E3\u51B3\u4E86 template constructor \u65E0\u6CD5\u6307\u5B9A(special)\u503C\u7684\u95EE\u9898</span></span>
<span class="line"><span style="color:#A6ACCD;">https://stackoverflow.com/a/3960925/5757674</span></span>
<span class="line"><span style="color:#A6ACCD;">\u4EE3\u7801\u89C1 ./code_continue/1.cpp</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">\u53EA\u662F\u5BF9ctxBase\u7684\u6211\u5305\u88C5</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">struct SingleThreadTrait</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">struct MultiThreadTrait</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">//\u771F\u6B63\u5B9E\u73B0</span></span>
<span class="line"><span style="color:#A6ACCD;">class IoCtx : public IoCtxBase</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">\u6784\u9020\u51FD\u6570</span></span>
<span class="line"><span style="color:#A6ACCD;">- \u521B\u5EFAepoll</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">eventfd ??</span></span>
<span class="line"><span style="color:#A6ACCD;">m_wakeup_handle = fd;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">post_task\u51FD\u6570</span></span>
<span class="line"><span style="color:#A6ACCD;">---- ? thread_waiting \u6709\u4EC0\u4E48\u7528?</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">require_abort</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">\u6838\u5FC3\u4E2D\u7684\u6838\u5FC3--&gt;run\u51FD\u6570</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">\u5982\u6709task, \u5C31\u505Atask</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">\u591A\u7EBF\u7A0B\u4E0B\u7684 wake_event \u6709\u4EC0\u4E48\u7528?</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br></div></div>`,11),b=s(`<p>\u6280\u5DE7,</p><h2 id="buffer" tabindex="-1">buffer <a class="header-anchor" href="#buffer" aria-hidden="true">#</a></h2><div class="language- line-numbers-mode"><button class="copy"></button><span class="lang"></span><pre><code><span class="line"><span style="color:#A6ACCD;">pool</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">\u5B9A\u5927\u5C0F\u5185\u5B58\u6C60,\u6BCF\u4E00\u6B21\u7533\u8BF7\u7684\u5185\u5B58\u5927\u5C0F\u56FA\u5B9A,</span></span>
<span class="line"><span style="color:#A6ACCD;">\u6240\u4EE5free\u65F6,\u628A\u94FE\u8868\u628A\u4ED6\u4EEC\u56FA\u5B9A\u5728\u4E00\u8D77</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><h2 id="mutex" tabindex="-1">mutex <a class="header-anchor" href="#mutex" aria-hidden="true">#</a></h2><p>\u7406\u89E3<code>mutex.h</code>\u4EE3\u7801</p><p>828\u884C,\u592A\u5927\u4E86\u{1F613}</p><p>\u6838\u5FC3\u7C7B</p><div class="language-plaintext line-numbers-mode"><button class="copy"></button><span class="lang">plaintext</span><pre><code><span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">- LockCore \u5BF9\u961F\u5217\u8FDB\u884C\u64CD\u4F5C?</span></span>
<span class="line"><span style="color:#A6ACCD;">  - try_lock</span></span>
<span class="line"><span style="color:#A6ACCD;">  - unlock \u53D6\u961F\u5217\u7684\u5934\u90E8</span></span>
<span class="line"><span style="color:#A6ACCD;">- class Mutex;</span></span>
<span class="line"><span style="color:#A6ACCD;">  - \u6210\u5458\u53D8\u91CF LockCore,IoContext</span></span>
<span class="line"><span style="color:#A6ACCD;">  - MutexLockAwaiter lock() \u8FD9\u4E2A\u5E94\u8BE5\u662F\u6838\u5FC3\u529F\u80FD</span></span>
<span class="line"><span style="color:#A6ACCD;">- class MutexLockAwaiter; Mutex \u5BF9\u5E94\u7684Awaiter</span></span>
<span class="line"><span style="color:#A6ACCD;">- class AdoptUniqueLock</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">template &lt;class Awaiter&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">class WaitAwaiter;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">template &lt;class Awaiter&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">struct WaitCallback : CallbackImplBase</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">\u4E00\u4E2A\u51FD\u6570</span></span>
<span class="line"><span style="color:#A6ACCD;">template &lt;class Awaiter&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">auto wait(Mutex &amp;mtx, Awaiter &amp;&amp;awaiter) -&gt; WaitAwaiter&lt;std::remove_reference_t&lt;Awaiter&gt; &gt;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">\u4E8B\u4EF6</span></span>
<span class="line"><span style="color:#A6ACCD;">class Event;</span></span>
<span class="line"><span style="color:#A6ACCD;">class EventAwaiter;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">template&lt;class Trait&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">class Condv;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">template&lt;class Condv&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">class CondvAwaiter;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">struct PostTaskEvent : PostTask</span></span>
<span class="line"><span style="color:#A6ACCD;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    ListNode *m_awaiters;</span></span>
<span class="line"><span style="color:#A6ACCD;">};</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">class Event</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br></div></div>`,8);function C(A,u,m,y,D,d){const n=r("toGitLink");return o(),l("div",null,[t,p("p",null,[e("Callback\u7684\u539F\u7406\u89C1 "),c(n,{file:"./code_continue/callback.cpp"})]),b])}var h=a(i,[["render",C]]);export{g as __pageData,h as default};
