import { initWs } from "@utils/init";

class BoardDom extends HTMLElement {
  private root: HTMLDivElement;
  constructor() {
    super();
    this.root = document.createElement('div');
    this.root.className = 'box';
    const shadowDom = this.attachShadow({ mode: 'closed' });
    shadowDom.appendChild(this.root);
    const style = document.createElement('style');
    style.appendChild(
      document.createTextNode(`
        .box {
          top: 100px;
          left: 100px;
          width: min-content;
        }
        .button-box {
        }
        .board {
          border: 1px solid #8bb8d6;
          position: relative;
        }
        .drawing-board {
          position: absolute;
          top: 0px;
          left: 0px;
        }
        .text-input {
          position: absolute;
        }
        .button-box {
          display: flex;
          align-items: center;
          background: #cae1f0;
          width: max-content;
          padding: 8px 16px;
          border-radius: 16px;
        }
        .shape-type-button {
          height: 24px;
          width: 38px;
          background: none;
          border: none;
          padding: 4px 8px;
          margin: 4px;
          border-radius: 8px;
        }
        .active {
          background: #8bb8d6;
        }
        .shape-type-button:hover {
          background: #8bb8d6;
        }
        .shape-style-input {
          width: 38px;
          height: 30px;
          margin: 4px;
          border: none;
          background: none;
        }
        .shape-style-input[type=number] {
          width: 58px;
        }
        .shape-style-input[type=number]:focus-visible{
          outline:none;
          border: none;
          background: none;
        }
        input[type=number]::-webkit-inner-spin-button, 
        input[type=number]::-webkit-outer-spin-button {
          opacity: 1;
        }
      `
      ));
    shadowDom.appendChild(style);
  }
  connectedCallback() {
    const id = String(this.getAttribute('boardId'));
    const key = String(this.getAttribute('boardKey'));
    const lock = Boolean(this.getAttribute('boardLock'));
    initWs(this.root, id, key, lock);
    // const urlencoded = new URLSearchParams();
    // urlencoded.append("userId", "8379bece-b547-4a0d-0825-284cfc4a5e6f");
    // urlencoded.append("userKey", "cmzcmz");
    // urlencoded.append("boardId", id);
    // fetch('http://127.0.0.1:3000/board/getBoardKey', {
    //   method: 'post',
    //   headers: {
    //     "Content-Type": "application/x-www-form-urlencoded",
    //   },
    //   body: urlencoded,
    // }).then(res => {
    //   res.json().then(({ key }) => {
    //     console.log(key);
    //     initWs(this.root, id, key);
    //   });
    // });
  }
  static get observedAttributes() {
    return ['board-id', 'board-key'];
  }
}
export default BoardDom;