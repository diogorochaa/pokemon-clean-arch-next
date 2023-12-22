# Projeto Pokémon - Frontend Next.js com Clean Architecture e Arquitetura Hexagonal

Bem-vindo ao Projeto Pokémon! Este é um projeto de frontend desenvolvido em Next.js, que utiliza Clean Architecture e segue os princípios da Arquitetura Hexagonal para garantir uma estrutura modular, escalável e de fácil manutenção.

## Requisitos

- Node.js (v14.0.0 ou superior)
- pnpm (v6.0.0 ou superior)
  Certifique-se de ter o Node.js e o pnpm instalados em sua máquina antes de prosseguir.

## Instalação

1. Clone o repositório para a sua máquina:

```bash
git clone https://github.com/seu-usuario/pokemon-next-clean-arch.git
```

2. Acesse o diretório do projeto:

```bash
cd pokemon-next-clean-arch
```

3. Instale as dependências utilizando o pnpm:

```bash
pnpm install
```

### Executando o Projeto

Para iniciar o servidor de desenvolvimento, execute o seguinte comando:

```bash
pnpm dev
```

O projeto estará disponível em http://localhost:3000.

### Estrutura do Projeto

O projeto segue a estrutura de Clean Architecture e Arquitetura Hexagonal, dividindo-se em camadas bem definidas:

- src/domain: Contém as regras de negócio do domínio, como entidades e casos de uso.
- src/application: Responsável por implementar os casos de uso da aplicação.
- src/infra: Camada de infraestrutura, responsável por lidar com detalhes externos como APIs e banco de dados.
- src/interfaces: Camada de interfaces, contendo a implementação específica para o framework Next.js.

### Comandos Disponíveis

- pnpm dev: Inicia o servidor de desenvolvimento.
- pnpm build: Gera a versão de produção do projeto.
- pnpm start: Inicia o projeto em modo de produção.

### Contribuindo

Fique à vontade para contribuir com melhorias ou correções de bugs. Sinta-se livre para abrir uma issue ou enviar um pull request.

Agradecemos por contribuir para o Projeto Pokémon!

Licença
Este projeto está licenciado sob a Licença MIT.
