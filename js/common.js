/**
 * 播放音效
 * @param {string} id - audio元素的ID
 */
function playSound(id) {
    const audio = document.getElementById(id);
    if (!audio) return;

    try {
        audio.currentTime = 0;
        audio.play().catch(() => {
            // 自动播放失败时静默处理，不干扰用户
        });
    } catch (e) {
        console.warn('音效播放失败:', e);
    }
}

/**
 * 显示提示弹窗
 * @param {string} text - 提示文本
 * @param {number} duration - 显示时长（默认2000ms）
 */
function showToast(text, duration = 2000) {
    const toast = document.getElementById('toast');
    if (!toast) return;

    toast.innerText = text;
    toast.style.display = 'block';

    clearTimeout(window.toastTimer);
    window.toastTimer = setTimeout(() => {
        toast.style.display = 'none';
    }, duration);
}

/**
 * 页面跳转（带加载状态+容错）
 * @param {string} url - 目标URL
 */
function navigateTo(url) {
    const loading = document.getElementById('loadingOverlay');
    if (loading) loading.style.display = 'flex';

    fetch(url, { method: 'HEAD' })
        .then(res => {
            if (res.ok) window.location.href = url;
            else showToast('页面暂未开放～');
        })
        .catch(() => {
            window.location.href = url;
        })
        .finally(() => {
            if (loading) loading.style.display = 'none';
        });
}

/**
 * 绑定所有按钮的音效
 */
function bindSoundToAllButtons() {
    const allButtons = document.querySelectorAll('button, .option-item');
    allButtons.forEach(el => {
        if (!el.hasAttribute('data-sound-bound')) {
            el.addEventListener('click', () => playSound('clickSound'));
            el.setAttribute('data-sound-bound', 'true');
        }
    });
}

/**
 * XSS防护 - HTML转义
 * @param {string} str - 原始字符串
 * @returns {string} 转义后的字符串
 */
function escapeHtml(str) {
    if (!str) return '';
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

// 全局暴露工具函数
window.playSound = playSound;
window.showToast = showToast;
window.navigateTo = navigateTo;
window.bindSoundToAllButtons = bindSoundToAllButtons;
window.escapeHtml = escapeHtml;