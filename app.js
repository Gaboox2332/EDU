// ======== REGISTRO DEL SERVICE WORKER =========
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./service-worker.js')
      .then(() => console.log('✅ Service Worker registrado correctamente'))
      .catch(err => console.error('❌ Error al registrar Service Worker:', err));
  });
}

// ======== BOTÓN Y TOAST DE INSTALACIÓN =========
let deferredPrompt;
const installBtn = document.getElementById('instalarBtn');

if (installBtn) installBtn.style.display = 'none';

const toast = document.createElement('div');
toast.id = 'install-toast';
toast.innerHTML = `
  <div class="toast-container">
    <p>💡 ¡Puedes instalar esta app!</p>
    <button id="toastInstallBtn">Instalar</button>
  </div>
`;
document.body.appendChild(toast);

// Estilos del toast
const style = document.createElement('style');
style.textContent = `
  #install-toast {
    position: fixed;
    bottom: -100px;
    left: 50%;
    transform: translateX(-50%);
    background: #0d6efd;
    color: white;
    padding: 15px 25px;
    border-radius: 8px;
    box-shadow: 0 4px 10px rgba(0,0,0,0.2);
    display: flex;
    align-items: center;
    gap: 15px;
    transition: bottom 0.4s ease-in-out;
    font-family: 'Segoe UI', sans-serif;
    z-index: 9999;
  }
  #install-toast.show {
    bottom: 30px;
  }
  #toastInstallBtn {
    background: white;
    color: #0d6efd;
    border: none;
    padding: 6px 14px;
    border-radius: 6px;
    font-weight: 600;
    cursor: pointer;
  }
  #toastInstallBtn:hover {
    background: #f8f9fa;
  }
`;
document.head.appendChild(style);


window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;

  installBtn.style.display = 'inline-block';
  toast.classList.add('show');
  console.log('📲 PWA instalable detectada.');

  const toastInstallBtn = document.getElementById('toastInstallBtn');
  toastInstallBtn.addEventListener('click', async () => {
    toast.classList.remove('show');
    installBtn.style.display = 'none';
    deferredPrompt.prompt();

    const { outcome } = await deferredPrompt.userChoice;
    console.log(`🟢 Resultado de instalación: ${outcome}`);

    deferredPrompt = null;
  });
});

window.addEventListener('appinstalled', () => {
  console.log('✅ Aplicación instalada correctamente');
  toast.classList.remove('show');
  installBtn.style.display = 'none';
});
