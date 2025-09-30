# Como Obter os Binding IDs da VTEX

## ⚠️ Ação Necessária

Para finalizar a implementação do menu multi-idioma, precisamos substituir os placeholders pelos **binding IDs reais** no arquivo:
- `/store/blocks/header/header.jsonc`

---

## 📍 Métodos para Descobrir os Binding IDs

### **Método 1: Via Componente Debug (RECOMENDADO)**

1. Acesse a loja em cada binding:
   - **PT-BR**: https://finamac.myvtex.com/?workspace=dev
   - **EN-US**: https://finamac.myvtex.com/en/?workspace=dev
   - **ES-ES**: https://finamac.myvtex.com/es/?workspace=dev

2. Abra o **Console do Navegador** (F12 > Console)

3. Procure a mensagem:
   ```
   ============================================================
   🔍 VTEX BINDING DEBUG INFO
   ============================================================
   Binding ID: <UUID-AQUI>
   Locale: pt-BR
   ...
   ```

4. Você também verá um **box verde no canto inferior direito** da tela com o Binding ID

5. Copie o **Binding ID** de cada idioma

---

### **Método 2: Via Admin VTEX**

1. Acesse: https://finamac.myvtex.com/admin/account/#/bindings

2. Ou navegue em:
   - Admin VTEX > Account Settings > Bindings

3. Copie o **ID** de cada binding:
   - PT-BR (Portuguese - Brazil)
   - EN-US (English - United States)
   - ES-ES (Spanish - Spain)

---

### **Método 3: Via GraphQL IDE**

1. Acesse: https://finamac.myvtex.com/_v/graphql-ide

2. Execute a query:
```graphql
query {
  __type(name: "Runtime") {
    fields {
      name
      type {
        name
      }
    }
  }
}
```

3. Ou inspecione o objeto `window.__RUNTIME__` no console

---

## 🔧 Como Aplicar os IDs no Código

Após obter os 3 binding IDs, edite o arquivo:

**`/store/blocks/header/header.jsonc`**

Substituir:

```jsonc
// ANTES (linha ~60):
"id": "BINDING-ID-PT-BR-AQUI"

// DEPOIS:
"id": "123e4567-e89b-12d3-a456-426614174000"  // Exemplo - use o ID real
```

```jsonc
// ANTES (linha ~73):
"id": "BINDING-ID-EN-US-AQUI"

// DEPOIS:
"id": "987e6543-e21b-98d3-c654-426614174111"  // Exemplo - use o ID real
```

O binding ES-ES é usado como **fallback (Else)**, então não precisa de ID explícito.

---

## ✅ Verificação

Após aplicar os IDs:

1. Faça `vtex link`
2. Teste cada binding:
   - PT: https://finamac.myvtex.com/?workspace=dev
   - EN: https://finamac.myvtex.com/en/?workspace=dev
   - ES: https://finamac.myvtex.com/es/?workspace=dev

3. Verifique se os menus aparecem no idioma correto:
   - PT: MÁQUINAS, SERVIÇOS, ACESSÓRIOS, CURSOS...
   - EN: MACHINES, SERVICES, ACCESSORIES, COURSES...
   - ES: MÁQUINAS, SERVICIOS, ACCESORIOS, CURSOS...

---

## 🧹 Limpeza

Após obter os IDs e testar, **REMOVER** o componente de debug:

1. Editar `/store/blocks/header/header.jsonc`:
```jsonc
"header": {
  "blocks": [
    "header-layout.desktop",
    "header-layout.mobile"
    // REMOVER: "binding-debug"
  ]
}
```

2. Deletar arquivos temporários:
   - `/react/BindingDebug.tsx` (se não for útil no futuro)
   - Este arquivo de documentação pode ser mantido ou deletado

---

## 📝 Exemplo de Estrutura Final

```jsonc
"condition-layout.binding#menu-switcher": {
  "props": {
    "conditions": [{
      "subject": "bindingId",
      "arguments": {
        "id": "a1b2c3d4-1234-5678-9abc-def012345678"  // ✅ ID real PT-BR
      }
    }],
    "Then": "flex-layout.col#category-header-desk",
    "Else": "condition-layout.binding#menu-en-es"
  }
},

"condition-layout.binding#menu-en-es": {
  "props": {
    "conditions": [{
      "subject": "bindingId",
      "arguments": {
        "id": "9z8y7x6w-9876-5432-1zyxwvut-987654321098"  // ✅ ID real EN-US
      }
    }],
    "Then": "flex-layout.col#category-header-desk--en",
    "Else": "flex-layout.col#category-header-desk--es"  // ES-ES fallback
  }
}
```
