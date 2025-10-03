# Exemplos de Queries GraphQL - VTEX Catalog

## 1. Ver Todas as Categorias

### Query Simples (vtex.catalog-graphql)
```graphql
query {
  categories(treeLevel: 3) {
    id
    name
    title
    description
    keywords
    linkId
    hasChildren
    children {
      id
      name
      hasChildren
    }
  }
}
```

### Query com Detalhes (vtex.catalog-graphql)
```graphql
query GetCategoryById {
  category(id: "3") {
    id
    name
    title
    description
    keywords
    linkId
    isActive
    hasChildren
    children {
      id
      name
    }
  }
}
```

## 2. Traduzir Categoria (Exemplo Correto)

**IMPORTANTE**: Use `translateCategory` SOMENTE para traduzir de um idioma para OUTRO.

### Exemplo: Traduzir de pt-BR para en-US
```graphql
mutation translate($args:CategoryInputTranslation, $locale:Locale){
  translateCategory(category:$args, locale:$locale)
}
```

**Query Variables:**
```json
{
  "args":{
    "id": "3",
    "name": "Electronics",
    "title": "Home - Electronics",
    "description": "This is the Electronics category description",
    "keywords": [
      "electronics",
      "appliances"
    ],
    "linkId": "electronics"
  },
  "locale": "en-US"
}
```

## 3. Atualizar Categoria (NO IDIOMA PADRÃO)

Se você quer ATUALIZAR a categoria no idioma pt-BR, use a API REST do Catalog:

### Endpoint
```
PUT https://{accountName}.vtexcommercestable.com.br/api/catalog/pvt/category/{categoryId}
```

### Headers
```
Content-Type: application/json
Accept: application/json
X-VTEX-API-AppKey: {AppKey}
X-VTEX-API-AppToken: {AppToken}
```

### Body Example
```json
{
  "Name": "Eletrônicos",
  "Title": "Casa - Eletrônicos",
  "Description": "Esta é a descrição da categoria Eletrônicos",
  "Keywords": "eletronicos,utensílios",
  "IsActive": true,
  "LinkId": "eletronicos"
}
```

## 4. Listar Todas as Categorias da Árvore

```graphql
query {
  categories {
    id
    name
    hasChildren
    children {
      id
      name
      hasChildren
      children {
        id
        name
      }
    }
  }
}
```

## Resumo

- **VER categorias**: Use `query { category(id: "X") }` ou `query { categories }`
- **TRADUZIR**: Use `translateCategory` de pt-BR → en-US (idioma diferente)
- **ATUALIZAR no idioma padrão**: Use a API REST do Catalog (PUT)
