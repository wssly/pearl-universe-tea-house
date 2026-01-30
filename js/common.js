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
// 页面跳转函数（确保兼容性）
function navigateTo(url) {
    try {
        // 先尝试使用现有的navigateTo函数
        if (typeof window.navigateTo === 'function') {
            return window.navigateTo(url);
        }
        
        // 检查URL是否包含协议
        if (url.indexOf('http') === 0) {
            window.location.href = url;
        } else {
            // 相对路径处理
            const currentPath = window.location.pathname;
            const currentDir = currentPath.substring(0, currentPath.lastIndexOf('/') + 1);
            window.location.href = currentDir + url;
        }
    } catch (error) {
        console.error('导航失败:', error);
        window.location.href = url;
    }
}

// 绑定音效到所有按钮
function bindSoundToAllButtons() {
    try {
        const clickSound = document.getElementById('clickSound');
        if (!clickSound) return;
        
        const buttons = document.querySelectorAll('button, .btn, .option-item');
        buttons.forEach(btn => {
            // 移除已存在的事件监听器
            const oldOnClick = btn.onclick;
            btn.onclick = function(e) {
                // 播放音效
                if (clickSound) {
                    clickSound.currentTime = 0;
                    clickSound.play().catch(err => {
                        console.log('按钮音效播放失败:', err);
                    });
                }
                
                // 执行原有的点击事件
                if (oldOnClick) {
                    oldOnClick.call(this, e);
                }
            };
        });
        
        console.log('音效绑定完成，绑定按钮数:', buttons.length);
    } catch (error) {
        console.error('绑定音效失败:', error);
    }
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