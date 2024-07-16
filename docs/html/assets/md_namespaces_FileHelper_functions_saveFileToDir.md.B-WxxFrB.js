import{_ as s,c as i,o as a,a2 as t}from"./chunks/framework.CbHMctiC.js";const g=JSON.parse('{"title":"Function: saveFileToDir()","description":"","frontmatter":{},"headers":[],"relativePath":"md/namespaces/FileHelper/functions/saveFileToDir.md","filePath":"md/namespaces/FileHelper/functions/saveFileToDir.md"}'),e={name:"md/namespaces/FileHelper/functions/saveFileToDir.md"},n=t(`<h1 id="function-savefiletodir" tabindex="-1">Function: saveFileToDir() <a class="header-anchor" href="#function-savefiletodir" aria-label="Permalink to &quot;Function: saveFileToDir()&quot;">​</a></h1><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">function</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> saveFileToDir</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">   dirKey</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> string</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">   fileName</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> string</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">   fileContent</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">FileContent</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> |</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> Promise</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">FileContent</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;)[], </span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">   overwrite</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> boolean</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> Promise</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;{</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">  message</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> string</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">  success</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> boolean</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}&gt;</span></span></code></pre></div><p>将文件写入目标文件夹</p><h2 id="example" tabindex="-1">Example <a class="header-anchor" href="#example" aria-label="Permalink to &quot;Example&quot;">​</a></h2><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">//需要先调用pickDir选择文件夹</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">saveFileToDir</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;key&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;file.txt&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, [</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;string&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">new</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> Blob</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">([</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;你好世界&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">], { type: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;text/plain&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> })]);</span></span></code></pre></div><h2 id="parameters" tabindex="-1">Parameters <a class="header-anchor" href="#parameters" aria-label="Permalink to &quot;Parameters&quot;">​</a></h2><table><tr><th>Parameter</th><th>Type</th><th>Default value</th><th>Description</th></tr><tr><td><p><code>dirKey</code></p></td><td><p><code>string</code></p></td><td><p><code>undefined</code></p></td><td><p>文件夹唯一标识，自行定义string，用于后续向同一文件夹写入文件</p></td></tr><tr><td><p><code>fileName</code></p></td><td><p><code>string</code></p></td><td><p><code>undefined</code></p></td><td><p>文件名</p></td></tr><tr><td><p><code>fileContent</code></p></td><td><p>(<code>FileContent</code> | <code>Promise</code>&lt;<code>FileContent</code>&gt;)[]</p></td><td><p><code>undefined</code></p></td><td><p>二进制文件流或字符串数组</p></td></tr><tr><td><p><code>overwrite</code></p></td><td><p><code>boolean</code></p></td><td><p><code>true</code></p></td><td><p>是否覆盖同名文件</p></td></tr></table><h2 id="returns" tabindex="-1">Returns <a class="header-anchor" href="#returns" aria-label="Permalink to &quot;Returns&quot;">​</a></h2><p><code>Promise</code>&lt;{ <code>message</code>: <code>string</code>; <code>success</code>: <code>boolean</code>; }&gt;</p><table tabindex="0"><thead><tr><th>Name</th><th>Type</th></tr></thead><tbody><tr><td><code>message</code></td><td><code>string</code></td></tr><tr><td><code>success</code></td><td><code>boolean</code></td></tr></tbody></table>`,10),l=[n];function h(p,d,k,r,o,c){return a(),i("div",null,l)}const F=s(e,[["render",h]]);export{g as __pageData,F as default};
