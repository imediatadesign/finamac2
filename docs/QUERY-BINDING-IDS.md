# Query para Obter Binding IDs

## Opção 1: Via Console do Browser (MAIS FÁCIL)

1. Acesse qualquer página da loja em cada binding:
   - PT-BR: https://finamac.myvtex.com/?workspace=dev
   - EN-US: https://finamac.myvtex.com/en/?workspace=dev
   - ES-ES: https://finamac.myvtex.com/es/?workspace=dev

2. Abra o Console (F12 → Console)

3. Digite e execute:
```javascript
console.log('Binding ID:', window.__RUNTIME__.binding.id)
console.log('Locale:', window.__RUNTIME__.culture.locale)
```

4. Copie o **Binding ID** de cada um

---

## Opção 2: Via Site Editor

1. Acesse: https://finamac.myvtex.com/admin/cms/site-editor

2. No canto superior, você verá um seletor de **Binding**

3. Selecione cada binding e inspecione a URL ou network requests para ver o ID

---

## Opção 3: Via curl (se tiver autenticação)

```bash
# Você precisaria de um token de autenticação
curl -H "VtexIdclientAutCookie: SEU_TOKEN" \
     https://finamac.myvtex.com/api/tenant/bindings
```

---

## ⚡ Forma Mais Rápida

**Acesse a loja agora** com o workspace `dev` e veja o **box verde** no canto inferior direito da tela que mostra o Binding ID automaticamente!

O componente `binding-debug` já está ativo na home! 🎯
