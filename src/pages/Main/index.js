import React, { Component } from 'react';

import { FaGithubAlt, FaPlus, FaSpinner } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import api from '../../services/api';

import { Container, Form, SubmitButton, List } from './styles';

export default class Main extends Component {
  state = {
    newRepo: '',
    repositories: [],
    /* Disabling button during loading. */
    loading: false,
  };

  /* Carregamento dos dados no localStorage. */
  componentDidMount() {
    /* localStorage -> Recuperar o dado que foi salvo pelo localStorage
      passando a chave que armazena as informações do localStorage. */
    const repositories = localStorage.getItem('repositories');

    /* Se existir algo no localStorage. Preenchendo o repositório
    com as informações passadas. */
    if (repositories) {
      /*
        Seta as informações para os repositories, preenchendo as informações do state.
        JSON.parse(repositories) -> Convertendo novamente, as estruturas que estão
        armazenadas em JSON para um valor em objeto no JS.
      */
      this.setState({ repositories: JSON.parse(repositories) });
    }
  }

  /*
    Salvar os dados do localStorage. É possivel acessar
    as atualizações que acontecem no nosso estado. Como
    ela acontece no estado e não nas propriedades, não
    utilizamos e definimos os _.

    prevState -> Pego o estado anterior antes dele ser atualizado.
  */
  componentDidUpdate(_, prevState) {
    const { repositories } = this.state;

    if (prevState.repositories !== repositories) {
      /* localStorage.setItem -> Responsavel por armazenar um novo valor. */
      localStorage.setItem('repositories', JSON.stringify(repositories));
    }
  }

  /* Função do Input */
  handleInputChange = e => {
    this.setState({ newRepo: e.target.value });
  };

  handleSubmit = async e => {
    e.preventDefault();

    /* Antes dele fazer a chamada a API */
    this.setState({ loading: true });

    const { newRepo, repositories } = this.state;

    const response = await api.get(`repos/${newRepo}`);

    /* Retornando apenas algumas informações especificas. */
    const data = {
      name: response.data.full_name,
    };

    /* Toda vez que o usuário adicionar um novo repositório, ele vai manter
    a listagem atual de repositorios, passando todas as informações que existem
    dentro de repositories e adicionando um novo elemento, criando um novo array. */
    this.setState({
      repositories: [...repositories, data],
      /* Depois de adicionar o novo repositorio passado, eu limpo a variavel newRepo. */
      newRepo: '',
      loading: false,
    });
  };

  render() {
    const { newRepo, loading, repositories } = this.state;

    return (
      <Container>
        <h1>
          <FaGithubAlt />
          Repositorios
        </h1>

        <Form onSubmit={this.handleSubmit}>
          <input
            type="text"
            placeholder="Adicionar repositório"
            value={newRepo}
            onChange={this.handleInputChange}
          />

          <SubmitButton loading={loading}>
            {loading ? (
              <FaSpinner color="#fff" size={14} />
            ) : (
              <FaPlus color="#fff" size={14} />
            )}
          </SubmitButton>
        </Form>

        <List>
          {repositories.map(repository => (
            /* O primeiro elemento que vai após a propriedade map é a propriedade
            key, que recebe uma informação unica que existe dentro da variável
            percorrida e passada dentro do map. */
            <li key={repository.name}>
              <span>{repository.name}</span>
              <Link to={`/repository/${encodeURIComponent(repository.name)}`}>
                Detalhes
              </Link>
            </li>
          ))}
        </List>
      </Container>
    );
  }
}
