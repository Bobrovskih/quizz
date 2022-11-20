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
import errorMp3 from '../assets/error.mp3';
import winMp3 from '../assets/win.mp3';

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
      totalScore: 0,
      score: 5,
    };
  }

  onMounted() {
    this.$questions = this.query('.questions');
    this.$wish = this.query('.wish');
    this.$answers = this.query('.answers');
    this.$selectedAnswer = this.query('.selected-answer');
    this.$next = this.query('.next');
    this.$totalScore = this.query('.total-score');

    this.createQuestionButtons();
    this.createWish();
    this.createAnswers();
    this.createSelectedAnswerStub();
  }

  onUpdated() {
    this.$next.toggleAttribute('disabled', !this.state.isGuessed);
    this.$totalScore.innerText = 'Score: ' + this.state.totalScore;
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

    if (isGuessed && !this.state.isGuessed) {
      this.wish.state = {
        name: this.state.wish.name,
        image: this.state.wish.image,
      };
      this.addTotalScore();
    }

    if (answerComponent.state.status === AnswerStatus.NOT_USED && !this.state.isGuessed) {
      this.minusScore();
    }

    if (!this.state.isGuessed) {
      this.state = {
        isGuessed,
      };
      
      const status = isGuessed ? AnswerStatus.OK : AnswerStatus.FAILED;

      answerComponent.state = {
        status,
      };

      this.playSound(status);

    }
  }

  minusScore() {
    let { score } = this.state;

    if (score > 0) {
      score -= 1;

      this.state = {
        score,
      };
    }
  }

  addTotalScore() {
    this.state = {
      totalScore: this.state.totalScore + this.state.score,
    };
  }

  getIsGuessed() {
    return this.state.selectedIndex === this.state.wishIndex;
  }

  playSound(status) {
    const src = status === AnswerStatus.FAILED ? errorMp3 : winMp3;
    const audio = document.createElement('audio');
    audio.src = src;
    audio.play();
    audio.volume = 0.5;
  }
}
