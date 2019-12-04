import React, { Component } from 'react';
import PropTypes from 'prop-types';

import api from '../../services/api';

// import { Container } from './styles';

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
  };

  async componentDidMount() {
    /* Desestruturando as propriedades (props) */
    const { match } = this.props;

    const repoName = decodeURIComponent(match.params.repository);

    /* Executando as duas requisições de forma simutaneas por meio
    de uma promise. Os valores dessa promise são armazenados separadamente
    na variável repository e issues. */
    const [repository, issues] = await Promise.all([
      api.get(`/repos/${repoName}`),
      api.get(`/repos/${repoName}/issues`, {
        params: {
          state: 'open',
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

  render() {
    const { repository, issues, loading } = this.state;

    return <h1>Repository</h1>;
  }
}
