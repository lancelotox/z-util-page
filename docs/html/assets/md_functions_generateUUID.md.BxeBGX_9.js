import{_ as a,c as s,o as e,a2 as i}from"./chunks/framework.CbHMctiC.js";const g=JSON.parse('{"title":"Function: generateUUID()","description":"","frontmatter":{},"headers":[],"relativePath":"md/functions/generateUUID.md","filePath":"md/functions/generateUUID.md"}'),t={name:"md/functions/generateUUID.md"},n=i(`<h1 id="function-generateuuid" tabindex="-1">Function: generateUUID() <a class="header-anchor" href="#function-generateuuid" aria-label="Permalink to &quot;Function: generateUUID()&quot;">​</a></h1><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">function</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> generateUUID</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">length</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">?:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> number</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">radix</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">?:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> number</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> string</span></span></code></pre></div><p>生成UUID4</p><h2 id="example" tabindex="-1">Example <a class="header-anchor" href="#example" aria-label="Permalink to &quot;Example&quot;">​</a></h2><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">generateUUID</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">();</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">generateUUID</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">12</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">32</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span></code></pre></div><h2 id="parameters" tabindex="-1">Parameters <a class="header-anchor" href="#parameters" aria-label="Permalink to &quot;Parameters&quot;">​</a></h2><table><tr><th>Parameter</th><th>Type</th><th>Description</th></tr><tr><td><p><code>length</code>?</p></td><td><p><code>number</code></p></td><td><p>生成uuid的总长度，不传递则按照rfc4122标准生成uuid</p></td></tr><tr><td><p><code>radix</code>?</p></td><td><p><code>number</code></p></td><td><p>uuid每个字符的基数 1-62</p></td></tr></table><h2 id="returns" tabindex="-1">Returns <a class="header-anchor" href="#returns" aria-label="Permalink to &quot;Returns&quot;">​</a></h2><p><code>string</code></p><p>uuid字符串</p>`,10),h=[n];function r(p,d,l,k,o,c){return e(),s("div",null,h)}const E=a(t,[["render",r]]);export{g as __pageData,E as default};
