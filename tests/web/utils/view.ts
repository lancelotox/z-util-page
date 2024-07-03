export function createView(name: string) {
  const app = document.querySelector('#app');

  const View = document.createElement('div');
  const h1 = document.createElement('h1');
  h1.innerText = name;
  View.appendChild(h1);
  app?.appendChild(View);

  return {
    addTestBtn(text: string, func: any) {
      const btn = document.createElement('button');
      btn.innerText = text;
      View.appendChild(btn);
      btn.addEventListener('click', func);
    }
  }
}