import { QuestionButtonComponent } from '../components/question-button';
import { Component } from '../helpers/component';
import './index.scss';
import template from './template.html';
import { birdsData } from '../constants/birds-data';
import { WishComponent } from '../components/wish';
import { AnswerComponent } from '../components/answer';
import { AnswerStatus } from './constants';

export class GamePage extends Component {
  constructor() {
    super({ template });
    this.state = {
      questionIndex: 0,
      questionsAll: birdsData,
      questions: birdsData[0],
      wishIndex: 0,
      wish: null,
    };
  }

  onMounted() {
    this.$questions = this.query('.questions');
    this.$wish = this.query('.wish');
    this.$answers = this.query('.answers');
    this.$next = this.query('.next');

    this.createQuestionButtons();

    this.createWish();
    this.createAnswers();

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

  createAnswers() {
    this.answers = [];
    this.state.questions.data.forEach((answer, index) => {
      const component = new AnswerComponent();
      component.state = {
        status: AnswerStatus.NOT_USED,
        name: answer.name,
        index,
      };
      component.on('click', (event) => {
        // do check if answer == wish
        component.state = {
          status: AnswerStatus.OK,
        };
      });
      component.render(this.$answers);
      this.answers.push(component);
    });
  }

  generateWish() {
    const to = this.state.questions.data.length;
    return Math.floor(Math.random() * to);
  }

  getWish(wishIndex) {
    return this.state.questions.data[wishIndex];
  }
}
