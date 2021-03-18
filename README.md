# Desafio: Criando um hook de carrinho de compras

## :computer: Sobre o desafio

O desafio consiste em criar um hook para gerenciar um carrinho de compras, seguindo as seguintes funções:

- Adicionar um novo produto no carrinho.
- Remover um produto do carrinho.
- Alterar a quantidade de um produto no carrinho.
- Calcular o total e sub-total dos preços dos produtos no carrinho.
- Validar estoque.
- Exibir mensagem de erro.
- Entre outros.

### Especificação dos testes

#### Teste Home.spec.tsx

- **should be able to render each product quantity added to cart** <br />
Para que esse teste passe, deve ser redenrizado corretamente a quantidade adicionada de cada produto adicionado ao carrinho dentro da tag `<div data-testid="cart-product-quantity">`.

- **should be able to add a product to cart** <br />
Para que esse teste passe, deve ser permitido que, ao clicar no botão `Adicionar ao Carrinho`, o produto escolhido deve ser adicionado com sucesso no carrinho. Além disso, a quantidade do produto no carrinho mostrada no botão deve representar o novo valor (incrementado de 1 unidade).

#### Teste Cart.spec.tsx

- **should be able to increase/decrease a product amount** <br />

Para que esse teste passe, deve ser redenrizado corretamente o valor da quantidade de cada produto adicionado ao carrinho e ser capaz de incrementar e decrementar os valores ao clicar no botões `<button data-testid="increment-product">` e `<button data-testid="decrement-product">` respectivamente.

- **should not be able to decrease a product amount when value is 1** <br />

Para que esse teste passe, o botão `<buttondata-testid="decrement-product">` deve ser desabilitado quando a quantidade do produto for igual a 1.

- **shoud be able to remove a product** <br />

Para que esse teste passe, o produto do carrinho deve ser removido ao clicar no botão `<buttondata-testid="remove-product">`.

#### Teste useCart.spec.tsx

- **should be able to initialize cart with localStorage value** <br />

Para que esse teste passe, deve ser inicializado o estado `cart` com o valor da key `@RocketShoes:cart` do localStorage caso ele exista.

- **should be able to add a new product** <br />

Para que esse teste passe, deve ser utilizado a função `addProduct` para adicionar um novo produto ao carrinho e preservar o valor atualizado do carrinho no localStorage utilizando o `setItem`.

- **should not be able add a product that does not exist** <br />

Para que esse teste passe, deve ser utilizado a função `addProduct` para verificar que o produto não existe, mostrar um `toast.error` com a mensagem `Erro na adição do produto` e sair da função sem alterar o `cart` e o valor no localStorage.

- **should be able to increase a product amount when adding a product that already exists on cart** <br />

Para que esse teste passe, deve ser utilizado a função `addProduct` para incrementar em 1 unidade a quantidade de um produto no carrinho em vez de adicionar um novo produto. Deve também preservar o valor atualizado do carrinho no localStorage utilizando o `setItem`.

- **should not be able to increase a product amount when running out of stock** <br />

Para que esse teste passe, deve ser utilizado a função `addProduct` para verificar que a quantidade desejada do produto não possui em estoque (rota `stock/id` da Fake API). Deve também mostrar um `toast.error` com a mensagem `Quantidade solicitada fora de estoque` e sair da função sem alterar o `cart` e o valor no localStorage.

- **should be able to remove a product** <br />

Para que esse teste passe, deve ser utilizado a função `removeProduct` para remover um produto do carrinho. Deve também preservar o valor atualizado do carrinho no localStorage utilizando o `setItem`.

- **should not be able to remove a product that does not exist** <br />

Para que esse teste passe, deve ser utilizado a função `removeProduct` para verificar que o produto não existe no carrinho e mostrar um `toast.error` com a mensagem `Erro na remoção do produto`. Deve também sair da função sem alterar o `cart` e o valor no localStorage.

- **should be able to update a product amount** <br />

Para que esse teste passe, deve ser utilizado a função `updateProductAmount` para incrementar e decrementar o valor de um produto no carrinho. Deve também preservar o valor atualizado do carrinho no localStorage utilizando o `setItem`.

- **should not be able to update a product that does not exist** <br />

Para que esse teste passe você deve utilizar a função `updateProductAmount` para verificar que o produto não existe e mostrar um `toast.error` com a mensagem `Erro na alteração de quantidade do produto`. Deve também sair da função sem alterar o `cart` e o valor no localStorage.

- **should not be able to update a product amount when running out of stock** <br />`

Para que esse teste passe você deve utilizar a função `updateProductAmount` para verificar que a quantidade desejada do produto não possui em estoque (rota `stock/id` da Fake API). Deve também mostrar um `toast.error` com a mensagem `Quantidade solicitada fora de estoque` e sair da função sem alterar o `cart` e o valor no localStorage.

- **should not be able to update a product amount to a value smaller than 1** <br />

Para que esse teste passe você deve utilizar a função `updateProductAmount` para verificar que a quantidade desejada do produto é menor que 1 e sair imediatamente da função sem alterar o `cart` e o valor no localStorage.

#### Teste Header.spec.tsx

- **should be able to render the amount of products added to cart** <br />

Para que esse teste passe, deve ser possível mostrar em tela a quantidade de produtos **distintos** adicionados ao carrinho. Ou seja, se o carrinho possuir 4 unidades do item A e 1 unidade do item B, o valor a ser mostrado é `2 itens`.

## :clapper: Execução
- Clone o repositório
- Instale as bibliotecas utilizando `npm install` ou qualquer outro gerenciador de pacotes.
- Execute o server utilizando `npm run server`. 
- Execute o projeto utilizando `npm start`. 
- Para realizar os testes, execute `npm run test`.
