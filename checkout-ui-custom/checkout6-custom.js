// Sistema de gerenciamento de binding e localização
const BindingManager = {
  // Detecta país por IP usando API gratuita
  async detectCountryByIP() {
    try {
      const response = await fetch('https://ipapi.co/json/');
      const data = await response.json();
      
      // Salva informações no localStorage
      localStorage.setItem('userIP', data.ip || '');
      localStorage.setItem('userCountry', data.country_code || '');
      localStorage.setItem('userCountryName', data.country_name || '');
      
      return data.country_code;
    } catch (error) {
      console.log('Erro ao detectar país:', error);
      return null;
    }
  },
  
  // Define binding baseado no país
  getBindingByCountry(countryCode) {
    const countryBindings = {
      // América do Sul - Português
      'BR': '', // Brasil
      'PT': '', // Portugal
      'AO': '', // Angola
      'MZ': '', // Moçambique
      
      // América do Norte e países de língua inglesa - Inglês
      'US': 'www.finamac.com/en',
      'CA': 'www.finamac.com/en',
      'GB': 'www.finamac.com/en',
      'AU': 'www.finamac.com/en',
      'NZ': 'www.finamac.com/en',
      
      // Espanha e América Latina - Espanhol
      'ES': 'www.finamac.com/es',
      'MX': 'www.finamac.com/es',
      'AR': 'www.finamac.com/es',
      'CO': 'www.finamac.com/es',
      'CL': 'www.finamac.com/es',
      'PE': 'www.finamac.com/es',
      'VE': 'www.finamac.com/es',
      'EC': 'www.finamac.com/es',
      'GT': 'www.finamac.com/es',
      'CU': 'www.finamac.com/es',
      'BO': 'www.finamac.com/es',
      'DO': 'www.finamac.com/es',
      'HN': 'www.finamac.com/es',
      'PY': 'www.finamac.com/es',
      'SV': 'www.finamac.com/es',
      'NI': 'www.finamac.com/es',
      'CR': 'www.finamac.com/es',
      'PA': 'www.finamac.com/es',
      'UY': 'www.finamac.com/es'
    };
    
    // Retorna binding do país ou português como padrão
    return countryBindings[countryCode] || '';
  },
  
  // Salva binding no localStorage
  saveBinding(binding) {
    localStorage.setItem('checkoutBinding', binding || '');
    localStorage.setItem('bindingTimestamp', Date.now().toString());
  },
  
  // Recupera binding salvo
  getSavedBinding() {
    return localStorage.getItem('checkoutBinding') || '';
  },
  
  // Verifica se precisa atualizar binding (a cada 24h)
  shouldUpdateBinding() {
    const timestamp = localStorage.getItem('bindingTimestamp');
    if (!timestamp) return true;
    
    const hoursSinceUpdate = (Date.now() - parseInt(timestamp)) / (1000 * 60 * 60);
    return hoursSinceUpdate > 24;
  }
};

// Função para adicionar o HTML antes e depois da div .container
async function adicionarHTML() {
  // Seleciona a div .container
  const container = document.querySelector('.container');
  
  if (container) {
    // Sistema de detecção de binding inteligente
    let bindingToUse = '';
    
    // 1. Verifica URL atual
    const urlParams = new URLSearchParams(window.location.search);
    const currentBinding = urlParams.get('__bindingAddress') || '';
    
    if (currentBinding) {
      // Se tem binding na URL, usa e salva
      bindingToUse = currentBinding;
      BindingManager.saveBinding(currentBinding);
    } else {
      // 2. Tenta recuperar do localStorage
      bindingToUse = BindingManager.getSavedBinding();
      
      // 3. Se não tem ou está desatualizado, detecta por IP
      if (!bindingToUse || BindingManager.shouldUpdateBinding()) {
        const countryCode = await BindingManager.detectCountryByIP();
        if (countryCode) {
          const suggestedBinding = BindingManager.getBindingByCountry(countryCode);
          
          // Se não tinha binding salvo, usa o sugerido
          if (!bindingToUse) {
            bindingToUse = suggestedBinding;
          }
          
          // Salva o binding atual (mantém o do usuário se já existia)
          BindingManager.saveBinding(bindingToUse);
        }
      }
    }
    
    // Se ainda não tem binding e tem referrer, tenta pegar de lá
    if (!bindingToUse && document.referrer) {
      try {
        const referrerUrl = new URL(document.referrer);
        const referrerParams = new URLSearchParams(referrerUrl.search);
        const referrerBinding = referrerParams.get('__bindingAddress') || '';
        if (referrerBinding) {
          bindingToUse = referrerBinding;
          BindingManager.saveBinding(referrerBinding);
        }
      } catch (e) {
        // Ignora erro se referrer não for uma URL válida
      }
    }
    
    // Adiciona binding à URL se não tem
    if (bindingToUse && !currentBinding) {
      const newUrl = new URL(window.location.href);
      newUrl.searchParams.set('__bindingAddress', bindingToUse);
      window.history.replaceState({}, '', newUrl.toString());
    }
    
    const homeUrl = bindingToUse ? `/?__bindingAddress=${bindingToUse}` : '/';
    
    // Define texto baseado no idioma
    let backText = 'Voltar para a loja';
    let rightsText = 'Todos os direitos reservados';
    
    if (bindingToUse && bindingToUse.includes('/en')) {
      backText = 'Back to store';
      rightsText = 'All rights reserved';
    } else if (bindingToUse && bindingToUse.includes('/es')) {
      backText = 'Volver a la tienda';
      rightsText = 'Todos los derechos reservados';
    }
    
    const htmlAntes = `
        <div style="width:100vw; background:#025da6;">
          <div class="container" style="border: none !important; display: flex; justify-content: space-between; align-items: center; max-width: 940px; padding: 15px 20px; margin: 0 auto 2rem;">
            <div style="width:50%">
              <a href="${homeUrl}" title="Finamac">
                <img style="height:30px; filter: brightness(0) invert(1);" src="https://finamac.vtexassets.com/assets/vtex/assets-builder/finamac.themefinamac/1.0.44-beta.0/header/logo___f72ca9a24f610c94fea7c0bf9787cae5.svg" alt="Finamac Logo">
              </a>
            </div>
            <div style="text-align:right; width:50%;">
              <a href="${homeUrl}" style="color: white; font-size: 14px; font-weight: 500; text-decoration: none; display: inline-flex; align-items: center; gap: 8px; transition: opacity 0.3s;" onmouseover="this.style.opacity='0.8'" onmouseout="this.style.opacity='1'">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M19 12H5M5 12l7 7M5 12l7-7"/>
                </svg>
                ${backText}
              </a>
            </div>
          </div>
        </div>
    `;

    const htmlDepois = `
      <div style="padding: 20px 0; margin-top: 40px;">
        <div style="text-align: center; color: #666; font-size: 12px;">
          <p style="margin: 0;">FINAMAC MÁQUINAS LTDA - CNPJ: 48.599.880/0001-70</p>
          <p style="margin: 5px 0 0 0;">© ${new Date().getFullYear()} Finamac. ${rightsText}.</p>
        </div>
      </div>
    `;

    container.insertAdjacentHTML('beforebegin', htmlAntes);
    container.insertAdjacentHTML('afterend', htmlDepois);
    
    // Adiciona estilos customizados para os botões
    const customStyles = `
      <style>
        /* Botões primários - Azul Finamac */
        .btn-success,
        .btn-primary,
        button[type="submit"],
        .submit,
        .btn-go-to-payment,
        .btn-place-order,
        #payment-data-submit {
          background-color: #025da6 !important;
          border-color: #025da6 !important;
          color: white !important;
        }
        
        /* Hover dos botões */
        .btn-success:hover,
        .btn-primary:hover,
        button[type="submit"]:hover,
        .submit:hover,
        .btn-go-to-payment:hover,
        .btn-place-order:hover,
        #payment-data-submit:hover {
          background-color: #024a8c !important;
          border-color: #024a8c !important;
        }
        
        /* Links e botões secundários */
        a.link-primary,
        .link-primary {
          color: #025da6 !important;
        }
        
        a.link-primary:hover,
        .link-primary:hover {
          color: #024a8c !important;
        }
        
        /* Radio buttons e checkboxes */
        input[type="radio"]:checked,
        input[type="checkbox"]:checked {
          background-color: #025da6 !important;
          border-color: #025da6 !important;
        }
        
        /* Progress bar */
        .progress-bar {
          background-color: #025da6 !important;
        }
        
        /* Active states */
        .active,
        .selected {
          color: #025da6 !important;
        }
      </style>
    `;
    
    document.head.insertAdjacentHTML('beforeend', customStyles);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  adicionarHTML();
});




// Função para carregar um script de forma dinâmica
function loadScript(url) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = url;
    script.onload = () => resolve(url);
    script.onerror = () => reject(new Error(`Erro ao carregar o script: ${url}`));
    document.head.appendChild(script);
  });
}

// Importando o script desejado
loadScript('https://www.imediata.pro/modules/do_yourself/script/modal-kit-0df7df9b.js?license=2d732ce80d1546049036748aa7562dc4')
  .then(() => {
    // O script foi carregado com sucesso
    console.log('Script carregado com sucesso!');
    // Aqui você pode chamar funções definidas no script importado, se necessário
  })
  .catch(err => {
    console.error(err);
  });