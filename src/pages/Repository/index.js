import React, { Component } from 'react';
import { FaGithubAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import api from '../../services/api';

import Container from '../../components/Container';
import { Loading, Owner, IssueList, IssueFilter, PageActions } from './styles';

export default class Repository extends Component {
  /* Como se trata de um componente de classe, podemos utilizar
  as propriedades no propTypes como estatica. */
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        repository: PropTypes.string,
      }),
    }).isRequired,
  };

  state = {
    repository: {},
    issues: [],
    loading: true,
    filters: [
      /* Estados de filtros que podem ser encontrados na issues. */
      { state: 'all', label: 'Todas', active: true },
      { state: 'open', label: 'Abertas', active: false },
      { state: 'closed', label: 'Fechadas', active: false },
    ],
    filterIndex: 0,
  };

  async componentDidMount() {
    /* Desestruturando as propriedades (props). Lembrando que match
    são propriedades presentes apenas no props. */
    const { match } = this.props;
    const { filters } = this.state;

    const repoName = decodeURIComponent(match.params.repository);

    /* Executando as duas requisições de forma simutaneas por meio
    de uma promise. Os valores dessa promise são armazenados separadamente
    na variável repository e issues. */
    const [repository, issues] = await Promise.all([
      api.get(`/repos/${repoName}`),
      api.get(`/repos/${repoName}/issues`, {
        params: {
          /* Filtrando os filters e pegando apenas os ativos. */
          state: filters.find(f => f.active).state,
          /* Numero de issues por pagina. */
          per_page: 5,
        },
      }),
    ]);

    this.setState({
      repository: repository.data,
      issues: issues.data,
      loading: false,
    });
  }

  /* Carregando e load da issues. */
  loadIssues = async () => {
    const { match } = this.props;
    const { filters, filterIndex, page } = this.state;

    const repoName = decodeURIComponent(match.params.repository);

    const response = await api.get(`/repos/${repoName}/issues`, {
      /* Propriedades e Parametros */
      params: {
        state: filters[filterIndex].state,
        per_page: 5,
        page,
      },
    });

    this.setState({ issues: response.data });

    /* Recuperar o nome do repositorio através do propriedade match
    params, recuperando o nome do repositorio.
    const repoName = decodeURIComponent(match.params.repository); */
  };

  render() {
    const {
      repository,
      issues,
      loading,
      /* Filtro */
      filters,
      /* Posição do filtro */
      filterIndex,
      /* Paginação */
      page,
    } = this.state;

    if (loading) {
      return (
        <Loading>
          <FaGithubAlt />
        </Loading>
      );
    }

    return (
      <Container>
        <h1>
          <FaGithubAlt />
          Detalhes
        </h1>

        <Owner>
          <Link to="/">Voltar</Link>
          <img src={repository.owner.avatar_url} alt={repository.owner.login} />
          <h1>{repository.name}</h1>
          <p>{repository.description}</p>
        </Owner>
        {/* Listagem de todas as issues. Recuperando o valor do usuário com suas
        informações, avatar do usuário, usuário id e login do usuário. Assim como
        outras informações. */}
        <IssueList>
          {/* O IssueFilter vai trazer todos os filtros referentes ao issues listadas.
          Por meio dessas issues é possivel retornar as issues abertas, fechadas, ou
          retornar todas da mesma forma. */}
          <IssueFilter active={filterIndex}>
            {filters.map((filter, index) => (
              <button
                type="button"
                key={filter.label}
                onClick={() => this.handleFilterClick(index)}
              >
                {filter.label}
              </button>
            ))}
          </IssueFilter>
          {issues.map(issue => (
            <li kye={String(issue.id)}>
              <img src={issue.user.avatar_url} alt={issue.user.login} />
              <div>
                <strong>
                  <a href={issue.html_url}>{issue.title}</a>
                  {issue.labels.map(label => (
                    <span key={String(label.id)}>{label.name}</span>
                  ))}
                </strong>
                <p>{issue.user.login}</p>
              </div>
            </li>
          ))}
        </IssueList>
        {/* Controle e configuração de paginação. O Botão anterior caso tenha pagina inferior a 2
        o botão fica desabilitado e so passa a ficar habilitado da pagina 2 em diante. */}
        <PageActions>
          <button
            type="button"
            disabled={page < 2}
            onClick={() => this.handlePage('back')}
          >
            Anterior
          </button>
          <span> Página {page} </span>
          <button type="button" onClick={() => this.handlePage('next')}>
            Próximo
          </button>
        </PageActions>
      </Container>
    );
  }
}
