/**
 * 渲染头部导航
 * @param {string} title - 导航标题
 * @param {boolean} showBack - 是否显示返回按钮
 * @returns {string} 导航HTML字符串
 */
function renderHeader(title, showBack = true) {
    return `
    <div class="header">
      ${showBack ? '<button class="back-btn" onclick="navigateTo(\'index.html\')">←</button>' : '<div class="empty"></div>'}
      <h1>${title}</h1>
      <div class="empty"></div>
    </div>
  `;
}

/**
 * 渲染流程进度指示器
 * @param {number} currentStep - 当前步骤（1-4）
 * @returns {string} 进度指示器HTML字符串
 */
function renderProgressIndicator(currentStep) {
    const steps = [1, 2, 3, 4];
    let html = '<div class="progress-indicator">';

    steps.forEach(step => {
        html += `<span class="progress-item ${step === currentStep ? 'active' : ''}">${step}</span>`;
    });

    html += '</div>';
    return html;
}

// 全局暴露组件渲染函数
window.renderHeader = renderHeader;
window.renderProgressIndicator = renderProgressIndicator;