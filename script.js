/* ============================
   1. 系统全局逻辑
   ============================ */

// 1. 时钟
function updateClock() {
    const now = new Date();
    const timeStr = now.getHours().toString().padStart(2, '0') + ":" + 
                    now.getMinutes().toString().padStart(2, '0');
    document.getElementById('current-time').innerText = timeStr;
    document.getElementById('lock-time').innerText = timeStr;
}
setInterval(updateClock, 1000);
updateClock();

// 2. 锁屏控制
const lockScreen = document.getElementById('lock-screen');
lockScreen.onclick = () => lockScreen.classList.add('unlocked');

function backToLock() {
    lockScreen.classList.remove('unlocked');
}

// 3. App 启动与关闭 (带返回键联动)
const backBtn = document.getElementById('global-back-btn');

function launchApp(url) {
    const overlay = document.getElementById('app-overlay');
    const frame = document.getElementById('app-frame');
    const backBtn = document.getElementById('global-back-btn');
    
    if (frame.src !== url) frame.src = url; 
    
    overlay.classList.add('open');
    backBtn.style.display = 'flex'; // 关键：显示按钮
}

function closeApp() {
    // 只需要让整个遮罩层滑下去即可
    document.getElementById('app-overlay').classList.remove('open');
}
/* ============================
   4. iOS 滑动反馈优化
   ============================ */
// 禁止桌面整体被无意义滑动
document.addEventListener('touchmove', (e) => {
    // 允许 iframe 内部滚动，允许解锁滑动，禁止桌面整体滚动
    if (e.target.id === 'desktop' || e.target.id === 'lock-screen') {
        e.preventDefault();
    }
}, { passive: false });


function applySystemSettings() {
    // 1. 应用字体和桌面文字样式
    const fontCfg = localStorage.getItem('k_font_config');
    if (fontCfg) {
        const cfg = JSON.parse(fontCfg);
        
        // 锁屏时间 (强制应用样式)
        const timeEl = document.getElementById('lock-time');
        if (timeEl) {
            timeEl.style.setProperty('color', cfg.color, 'important');
            timeEl.style.setProperty('font-size', cfg.size, 'important');
            timeEl.style.setProperty('letter-spacing', cfg.space, 'important');
        }

        // 桌面图标文字 (新增逻辑)
        const labels = document.querySelectorAll('.app-label');
        labels.forEach(label => {
            label.style.setProperty('color', cfg.deskColor, 'important');
        });
    }

    // 2. 应用锁屏背景
    const lockBg = localStorage.getItem('k_lock_bg');
    if (lockBg) {
        const lockScreen = document.getElementById('lock-screen');
        if (lockScreen) {
            lockScreen.style.backgroundImage = `url(${lockBg})`;
            lockScreen.style.backgroundSize = "cover";
            lockScreen.style.backgroundPosition = "center";
        }
    }

    // 3. 应用桌面背景
    const deskBg = localStorage.getItem('k_desk_bg');
    if (deskBg) {
        const deskScreen = document.querySelector('.iphone-screen');
        if (deskScreen) {
            deskScreen.style.backgroundImage = `url(${deskBg})`;
            deskScreen.style.backgroundSize = "cover";
            deskScreen.style.backgroundPosition = "center";
        }
    }
}

// 核心修复：不但加载时运行，保存后切换回来也要能触发
window.onload = applySystemSettings;
window.addEventListener('pageshow', applySystemSettings); // 解决部分浏览器后退不刷新的问题