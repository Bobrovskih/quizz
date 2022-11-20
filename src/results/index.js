import { Component } from '../helpers/component';
import { resultsService } from '../helpers/results';
import './index.scss';
import template from './template.html';
import resultsImage1 from '../assets/results-img-1.jpeg';
import { router, ROUTER_PATHS } from '../helpers/router';

export class ResultsPage extends Component {
  constructor() {
    super({ template });
    this.state = resultsService.data;
  }

  onMounted() {
    console.log('on mounted');
    this.$score = this.query('.score');
    this.$text = this.query('.text');
    this.$repeat = this.query('.repeat');
    this.$image = this.query('.image');

    const isMax = this.state.maxScore === this.state.score;

    this.$image.src = resultsImage1;
    this.$score.innerText = `${this.state.totalScore || 0} из ${this.state.maxScore} очков`;
    this.$text.innerText = isMax ? 'Отличная игра! Вы победили!!!' : 'Игра завершена';
    if (!isMax) {
      this.$repeat.classList.add('show');
    }

    this.$repeat.addEventListener('click', () => {
      router.setPage(ROUTER_PATHS.GAME);
    });
  }
}
