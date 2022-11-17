import { QuestionButtonComponent } from '../components/question-button';
import { Component } from '../helpers/component';
import './index.scss';
import template from './template.html';
import { birdsData } from '../constants/birds-data';


export class GamePage extends Component {
  constructor() {
    super({ template });
  }

  onMounted() {
    this.$questions = this.query('.questions');

    this.createQuestions();
  }

  createQuestions() {
    this.questionButtons = birdsData.map((item) => {
      const component = new QuestionButtonComponent();
      component.state = { caption: item.caption };
      component.render(this.$questions);
      return component;
    });
  }
}
