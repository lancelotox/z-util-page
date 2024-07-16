import{_ as s,c as i,o as a,a2 as t}from"./chunks/framework.CbHMctiC.js";const g=JSON.parse('{"title":"Function: save()","description":"","frontmatter":{},"headers":[],"relativePath":"md/namespaces/FileHelper/functions/save.md","filePath":"md/namespaces/FileHelper/functions/save.md"}'),e={name:"md/namespaces/FileHelper/functions/save.md"},n=t(`<h1 id="function-save" tabindex="-1">Function: save() <a class="header-anchor" href="#function-save" aria-label="Permalink to &quot;Function: save()&quot;">​</a></h1><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">function</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> save</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">file</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> string</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> |</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> Blob</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">saveFileName</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> string</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> void</span></span></code></pre></div><p>H5文件下载方法</p><h2 id="example" tabindex="-1">Example <a class="header-anchor" href="#example" aria-label="Permalink to &quot;Example&quot;">​</a></h2><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">save</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">new</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> Blob</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">([</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;你好世界&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">], { type: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;text/plain&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> }), </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;test.txt&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">save</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;https://www.baidu.com/img/flexible/logo/pc/result@2.png&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;baidu.png&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span></code></pre></div><h2 id="parameters" tabindex="-1">Parameters <a class="header-anchor" href="#parameters" aria-label="Permalink to &quot;Parameters&quot;">​</a></h2><table><tr><th>Parameter</th><th>Type</th><th>Default value</th><th>Description</th></tr><tr><td><p><code>file</code></p></td><td><p><code>string</code> | <code>Blob</code></p></td><td><p><code>undefined</code></p></td><td><p>资源链接或者blob对象</p></td></tr><tr><td><p><code>saveFileName</code></p></td><td><p><code>string</code></p></td><td><p><code>&#39;&#39;</code></p></td><td><p>保存文件名</p></td></tr></table><h2 id="returns" tabindex="-1">Returns <a class="header-anchor" href="#returns" aria-label="Permalink to &quot;Returns&quot;">​</a></h2><p><code>void</code></p>`,9),h=[n];function p(l,d,k,r,o,c){return a(),i("div",null,h)}const F=s(e,[["render",p]]);export{g as __pageData,F as default};
