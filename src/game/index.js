import { QuestionButtonComponent } from '../components/question-button';
import { Component } from '../helpers/component';
import './index.scss';
import template from './template.html';
import { birdsData } from '../constants/birds-data';
import { WishComponent } from '../components/wish';
import { AnswerComponent } from '../components/answer';
import { AnswerStatus } from './constants';
import { SelectedAnswerComponent } from '../components/selected-answer';
import birdPlaceholder from '../assets/bird-placeholder.jpg';

export class GamePage extends Component {
  constructor() {
    super({ template });
    this.state = {
      questionIndex: 0,
      questionsAll: birdsData,
      questions: birdsData[0],
      wishIndex: 0,
      wish: null,
      selectedIndex: null,
      isGuessed: false,
    };
  }

  onMounted() {
    this.$questions = this.query('.questions');
    this.$wish = this.query('.wish');
    this.$answers = this.query('.answers');
    this.$selectedAnswer = this.query('.selected-answer');
    this.$next = this.query('.next');

    this.createQuestionButtons();
    this.createWish();
    this.createAnswers();
    this.createSelectedAnswerStub();

    console.log('this.state', this.state);
  }

  onUpdated() {
    console.log('onUpdated game');
    this.$next.toggleAttribute('disabled', !this.state.isGuessed);
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
    this.wish.state = {
      audio: this.state.wish.audio,
      image: birdPlaceholder,
      name: '******',
    };
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
        this.onAnswerClick(event);
      });
      component.render(this.$answers);
      this.answers.push(component);
    });
  }

  createSelectedAnswerStub() {
    this.$selectedAnswer.innerHTML = `
      <div>Послушайте плеер.</div>
      <div>Выберите птицу из списка.</div>
    `;
  }

  resetSelectedAnswerStub() {
    this.$selectedAnswer.innerHTML = '';
  }

  createSelectedAnswer() {
    this.selectedAnswer = new SelectedAnswerComponent();
    this.selectedAnswer.state = {
      answer: this.state.questions.data[this.state.selectedIndex],
    };
    this.selectedAnswer.render(this.$selectedAnswer);
  }

  generateWish() {
    const to = this.state.questions.data.length;
    return Math.floor(Math.random() * to);
  }

  getWish(wishIndex) {
    return this.state.questions.data[wishIndex];
  }

  onAnswerClick(event) {
    this.state.selectedIndex = event.index;
    const answerComponent  = this.answers[this.state.selectedIndex];
    const isGuessed = this.getIsGuessed();

    this.resetSelectedAnswerStub();
    this.createSelectedAnswer();

    if (!this.state.isGuessed) {
      this.state = {
        isGuessed,
      };

      answerComponent.state = {
        status: isGuessed ? AnswerStatus.OK : AnswerStatus.FAILED,
      };
    }
  }

  getIsGuessed() {
    return this.state.selectedIndex === this.state.wishIndex;
  }
}
