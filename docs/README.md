<!-- VOLTAR DE bindingAddress=www.finamac.com -->
<!-- VOLTAR PARA bindingAddress=www.finamac.com -->

Componentes sincronizados com o seletor de idiomas:

1. ✅ SimpleBanner - Banner rotativo multilíngue
2. ✅ InfoCardHome - Card da home
3. ✅ SimpleFooter - Footer principal
4. ✅ FooterInfo - Informações do footer
5. ✅ ServicesSlider - Slider de serviços
6. ✅ PaymentConditions - Condições de pagamento
7. ✅ ProductsSlider - Slider de produtos
8. ✅ ContactButtonPDP - Botão de contato PDP
9. ✅ TechnicalSupport - Suporte técnico
10. ✅ ContactButton - Botão de contato
11. ✅ ProductApiInfo - Informações da API de produtos

O que mudou:

1. Apenas bandeiras - sem texto

- Botão principal: só mostra a bandeira atual
- Menu dropdown: só mostra as 3 bandeiras
- Visual minimalista e compacto (32x32px)

2. URLs diretas com locale:

- 🇧🇷 /?\_\_bindingAddress=www.finamac.com/&locale=pt-BR
- 🇪🇸 /?\_\_bindingAddress=www.finamac.com/es&locale=es-ES
- 🇺🇸 /?\_\_bindingAddress=www.finamac.com/en&locale=en-US

3. Detecção simples:

- Verifica o parâmetro locale na URL
- Ou detecta pelo pathname (/en, /es)
- Default: pt-BR

4. Visual limpo:

- Botão quadrado pequeno
- Dropdown compacto com as 3 bandeiras
- Bandeira atual com borda verde
- Desabilita clique na bandeira atual

5. Log simples:

- 🔍 Locale atual: pt-BR
- 🔄 Redirecionando para: [url]
