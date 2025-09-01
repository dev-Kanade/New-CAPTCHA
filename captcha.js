export class Check {
  constructor(containerId, config = {}) {
    this.container = document.getElementById(containerId);
    this.resultInput = document.createElement('input');
    this.resultInput.type = 'hidden';
    this.resultInput.id = 'captchaResult';
    this.resultInput.name = 'captchaResult';
    this.container.appendChild(this.resultInput);
    this.config = config.captchaData || [
      { id: 1, url: 'https://via.placeholder.com/100?text=猫', label: '猫', isCorrect: true },
      { id: 2, url: 'https://via.placeholder.com/100?text=犬', label: '犬', isCorrect: false },
      { id: 3, url: 'https://via.placeholder.com/100?text=車', label: '車', isCorrect: false }
    ];
    this.messageDiv = null;
    this.processingOverlay = document.createElement('div');
    this.processingOverlay.id = 'captcha-processing';
    this.processingOverlay.innerText = '処理中...';
    document.body.appendChild(this.processingOverlay);
  }

  
  generate() {
    const randomIndex = Math.floor(Math.random() * this.config.length);
    const correctLabel = this.config[randomIndex].label;
    this.container.innerHTML = `
      <p>「${correctLabel}」の画像を選んでください</p>
      <div id="captcha-images">
        ${this.config
          .sort(() => Math.random() - 0.5)
          .map(item => `
            <img src="${item.url}" data-label="${item.label}" onclick="window.captchaInstance.selectImage(this)">
          `).join('')}
      </div>
      <div id="captcha-message"></div>
      <button type="button" onclick="window.captchaInstance.verify()">確認</button>
    `;
    this.messageDiv = document.getElementById('captcha-message');
    
    window.captchaInstance = this;
    this.applyStyles();
  }


  selectImage(img) {
    document.querySelectorAll('#captcha-images img').forEach(i => i.classList.remove('selected'));
    img.classList.add('selected');
  }


  verify() {
    this.showProcessing();
   
    setTimeout(() => {
      this.hideProcessing();
      const selectedImg = document.querySelector('#captcha-images img.selected');
      if (!selectedImg) {
        this.messageDiv.innerHTML = '<p class="error">画像を選択してください</p>';
        return;
      }
      const selectedLabel = selectedImg.getAttribute('data-label');
      const correct = this.config.find(item => item.isCorrect && item.label === selectedLabel);
      if (correct) {
        this.messageDiv.innerHTML = '<p class="success"></p>';
        this.resultInput.value = 'passed';
      } else {
        this.messageDiv.innerHTML = '<p class="error">間違っています。もう一度試してください。</p>';
        this.resultInput.value = '';
        this.generate();
      }
    }, 1000); 
  }

 
  showProcessing() {
    this.processingOverlay.style.display = 'block';
  }


  hideProcessing() {
    this.processingOverlay.style.display = 'none';
  }

  
  applyStyles() {
    const style = document.createElement('style');
    style.innerHTML = `
      #captcha-container { max-width: 300px; margin: 20px; }
      #captcha-images img { width: 100px; margin: 10px; cursor: pointer; }
      #captcha-images img.selected { border: 2px solid green; }
      #captcha-message { margin: 10px 0; }
      .error { color: red; }
      .success { color: green; }
      #captcha-processing {
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        color: white;
        font-size: 24px;
        text-align: center;
        line-height: 100vh;
        z-index: 1000;
      }
      button { padding: 8px 16px; margin: 10px 0; }
    `;
    document.head.appendChild(style);
  }
}
