import { QuestionButtonComponent } from '../components/question-button';
import { Component } from '../helpers/component';
import './index.scss';
import template from './template.html';
import { birdsData } from '../constants/birds-data';
import { WishComponent } from '../components/wish';

export class GamePage extends Component {
  constructor() {
    super({ template });
    this.state = {
      questionIndex: 0,
      questionsAll: birdsData,
      wishIndex: 0,
      wish: null,
    };
  }

  onMounted() {
    this.$questions = this.query('.questions');
    this.$wish = this.query('.wish');
    this.$next = this.query('.next');

    this.createQuestionButtons();
    this.createWish();
    console.log('this.state', this.state);
  }

  createQuestionButtons() {
    this.questionButtons = [];

    this.state.questionsAll.forEach((item, index) => {
      const component = new QuestionButtonComponent();
      component.state = {
        caption: item.caption,
        isActive: this.state.questionIndex === index,
      };
      component.render(this.$questions);
      this.questionButtons.push(component);
    });
  }

  createWish() {
    const wishIndex = this.generateWish();
    const wish = this.getWish(wishIndex);

    this.state = {
      wishIndex,
      wish,
    };

    this.wish = new WishComponent();
    this.wish.state = this.state.wish;
    this.wish.render(this.$wish);
  }

  getCurrentQuestion() {
    return this.state.questionsAll[this.state.questionIndex];
  }

  generateWish() {
    const to = this.getCurrentQuestion().data.length;
    return Math.floor(Math.random() * to);
  }

  getWish(wishIndex) {
    return this.getCurrentQuestion().data[wishIndex];
  }
}
